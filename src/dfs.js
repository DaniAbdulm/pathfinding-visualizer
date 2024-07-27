export const dfs = async (grid, startNode, endNode, updateGrid, delay) => {
    console.log('DFS function called');

    const stack = [startNode]; // holds nodes to be processed in order of discovery
    const visited = new Set(); 
    const parentMap = new Map();  

    let i = 0; // initialize a counter for delays
    let endNodeFound = false; //flag to indicate if end node is reached

    while (stack.length > 0) {
        const currentNode = stack.pop();
        const { row, col } = currentNode;

        if (!visited.has(currentNode)) {
            visited.add(currentNode);

            setTimeout(() => {
                updateGrid(grid => {
                    const newGrid = grid.slice();
                    newGrid[currentNode.row][currentNode.col] = {
                        ...currentNode,
                        isVisited: true,
                    };
                    console.log(`Visiting node at (${currentNode.row}, ${currentNode.col})`);
                    return newGrid;
                });

                // checking if end node is reached
                if (currentNode === endNode && !endNodeFound) {
                    console.log('End node reached');
                    endNodeFound = true;
                    reconstructPath(parentMap, endNode, updateGrid);
                    return;
                }
            }, delay * i);

            i++;

            // adding neighbors to stack and set parent map
            const neighbors = getNeighbors(grid, row, col);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor) && !neighbor.isWall) {
                    stack.push(neighbor);
                    parentMap.set(neighbor, currentNode);
                }
            }

            //breaking the loop if end node is found
            if (endNodeFound) {
                break;
            }
        }
    }

    // ensuring path reconstruction happens after all nodes have been visited
    if (!endNodeFound) {
        setTimeout(() => {
            reconstructPath(parentMap, endNode, updateGrid);
        }, delay * i);
    }
};

//getting neighbors 
const getNeighbors = (grid, row, col) => {
    const neighbors = []; 
    if (row > 0) neighbors.push(grid[row - 1][col]); 
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); 
    if (col > 0) neighbors.push(grid[row][col - 1]); 
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); 
    return neighbors; 
}

//path reconstruction
const reconstructPath = (parentMap, endNode, updateGrid) => {
    let currentNode = endNode; 
    const pathNodes = []; 
    while (parentMap.has(currentNode)) {
        pathNodes.push(currentNode); 
        currentNode = parentMap.get(currentNode); 
    }; 

    for (let i = 0; i < pathNodes.length; i++) {
        setTimeout(() => {
            const node = pathNodes[i]; 
            updateGrid(grid => {
                const newGrid = grid.slice(); 
                newGrid[node.row][node.col] = {
                    ...node, 
                    isPath: true,
                };
                console.log(`Path node at (${node.row}, ${node.col})`)
                return newGrid;
            });
        }, 40 * i);
    };
};