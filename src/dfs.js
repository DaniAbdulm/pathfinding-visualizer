export const dfs = async (grid, startNode, endNode, updateGrid, delay) => {
    console.log('DFS fucntion called'); 

    const stack = [startNode]; //holds nodes to be processed in order of discovery
    const visited = new Set(); 
    const result = []; 
    const parentMap = new Map();  

    let i = 0; //initialize a counter for delays

    visited.add(startNode); 
    result.push(startNode);

    while (stack.length > 0) {
        const currentNode = stack.pop(); 
        const {row, col} = currentNode; 

        if (currentNode === endNode) {
            console.log('End node reached'); 
            setTimeout(() => {
                reconstructPath(parentMap, endNode, updateGrid); 
            }, delay * i); 
            return;
        }

        if (!visited.has(currentNode)) { 
            setTimeout(() => {
                //update grid to visualize the visiting node
                updateGrid(grid => {
                    const newGrid = grid.slice(); 
                    newGrid[currentNode.row][currentNode.col] = {
                        ...currentNode, 
                        isVisited: true,
                    }; 
                    console.log(`Visiting node at (${currentNode.row}, ${currentNode.col})`)
                    return newGrid;
                }); 
            }, delay * i); 

            i++; //increment the counter for the next delay

            visited.add(currentNode); 

            const neighbors = getNeighbors(grid, row, col); 
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor) && !neighbor.isWall) {
                    stack.push(neighbor); 
                    parentMap.set(neighbor, currentNode);
                }
            }
        }
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