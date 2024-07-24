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
            reconstructPath(parentMap, endNode, updateGrid);
            return;
        }

        const neighbors = getNeighbors(grid, row, col); 
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor) && !neighbor.isWall) {
                queue.push(neighbor); 
                visited.add(neighbor); 
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

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    while (parentMap.has(currentNode)) {
        currentNode = parentMap.get(currentNode); 

        updateGrid(grid => {
            const newGrid = grid.slice(); 
            newGrid[currentNode.row][currentNode.col] = {
                ...currentNode, 
                isPath: true,
            }; 
            return newGrid;
        });
    }
};