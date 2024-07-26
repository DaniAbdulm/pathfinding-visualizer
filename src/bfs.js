export const bfs = async (grid, startNode, endNode, updateGrid, delay) => {
    console.log('BFS function called')

    const queue = []; 
    const visited = new Set(); 
    const parentMap = new Map(); 

    queue.push(startNode); 
    visited.add(startNode); 

    let i = 0; //initialize a counter for delays

    while (queue.length > 0) {
        const currentNode = queue.shift(); 
        const {row, col} = currentNode; 

        if (currentNode === endNode) {
            console.log('End node reached')
            setTimeout(() => {
                reconstructPath(parentMap, endNode, updateGrid);
            }, delay * i);
            return;
        }

        const neighbors = getNeighbors(grid, row, col); 
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor) && !neighbor.isWall) {
                queue.push(neighbor); //if neighbor hasn't been visited and is not a wall, then add it to queue
                visited.add(neighbor); //adding visited neighbor to queue
                parentMap.set(neighbor, currentNode); 

                setTimeout(() => {
                    //update the grid to visualize the visiting node
                    updateGrid(grid => {
                        const newGrid = grid.slice(); 
                        newGrid[neighbor.row][neighbor.col] = {
                            ...neighbor, 
                            isVisited: true,
                        };
                        console.log(`Visiting node at (${neighbor.row}, ${neighbor.col})`)
                        return newGrid;
                    });
                }, delay * i);
                i++; //increment the counter for the next delay                
            }
        }
    }
};

const getNeighbors = (grid, row, col) => {
    const neighbors = []; 
    if (row > 0) neighbors.push(grid[row - 1][col]); 
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); 
    if (col > 0) neighbors.push(grid[row][col - 1]); 
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); 
    return neighbors;
}; 

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