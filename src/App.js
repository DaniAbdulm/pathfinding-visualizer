import { useState } from 'react';
import Node from './components/node';
import './App.css';
import { bfs } from './bfs'; //bfs function
import { dfs } from './dfs'; //dfs function


const App = () => { 
  // creating the initial grid
  const createInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 35; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  // creating each box
  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === 10 && col === 5, // this box is the start if it's at (10, 5)
      isEnd: row === 10 && col === 29,  // this box is the end if it's at (10, 45)
      isWall: false, // initially no boxes are walls
      isVisited: false, 
      isPath: false,
    };
  }; 

  //bfs function trigger
  const handleBFS = async () => {
    console.log('BFS Started');
    const startNode = grid[10][5]; 
    const endNode = grid[10][29]; 
    await bfs(grid, startNode, endNode, setGrid, 20); //adding delay of 20ms
  };

  //dfs function trigger 
  const handleDFS = async () => {
    console.log('DFS Started'); 
    const startNode = grid[10][5]; 
    const endNode = grid[10][29]; 
    await dfs(grid, startNode, endNode, setGrid, 20) //adding delay of 20ms
  }

  const [grid, setGrid] = useState(createInitialGrid()); // setting up grid using react's useState

  //function that handles clicking on a node
  const handleNodeClick = (row, col) => {
    const newGrid = grid.slice(); 
    const node = newGrid[row][col]; 
    const newNode = {
      ...node, 
      isWall: !node.isWall, //toggles the wall state
    };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  };

  //function that handles resetting the grid
  const handleReset = () => {
    setGrid(createInitialGrid());
  }

  return (
    <div className="container">
      <div className='btn-container'>
        <button onClick={handleBFS}>Breadth-First Search</button>
        <button onClick={handleDFS}>Depth-First Search</button>
        <button className='reset-btn' onClick={handleReset}>Reset</button>
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, nodeIdx) => (
              <Node 
                key={nodeIdx} 
                {...node}
                onClick={handleNodeClick} //triggers node click function 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;