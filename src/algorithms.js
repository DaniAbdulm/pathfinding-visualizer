export const bfs = (grid, startNode, endNode, updateGrid) => {
    const queue = []; 
    const visited = new Set(); 
    const parentMap = new Map(); 

    queue.push(startNode); 
    visited.add(startNode); 

    while (queue.length > 0) {
        const currentNode = queue.shift(); 
        const {row, col} = currentNode; 

        if (currentNode === endNode) {
            reconstructPath(parentMap, endNode, updateGrid);
            return;
        }

        const neighbors = getNeighbors(grid, row, col); 
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor) && !neighbor.isWall) {
                queue.push(neighbor); 
                visited.add(neighbor); 
                parentMap.set(neighbor, currentNode); 

                //update the grid to visualize the visiting node
                updateGrid(grid => {
                    const newGrid = grid.slice(); 
                    newGrid[neighbor.row][neighbor.col] = {
                        ...neighbor, 
                        isVisited: true,
                    };
                    return newGrid;
                });
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

const reconstructPath = (parent, endNode, updateGrid) => {
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