import { useState } from 'react';
import Node from './components/node';
import './App.css';
import { bfs } from './algorithms'; //bfs function


const App = () => {
  // creating the initial grid
  const createInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
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
      isEnd: row === 10 && col === 45,  // this box is the end if it's at (10, 45)
      isWall: false, // initially no boxes are walls
      isVisited: false, 
      isPath: false,
    };
  };

  //bfs function trigger
  const handleBFS = async () => {
    console.log('BFS Started');
    const startNode = grid[10][5]; 
    const endNode = grid[10][45]; 
    await bfs(grid, startNode, endNode, setGrid, 0); //adding delay of 100ms
  };

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

  return (
    <div className="container">
      <div className='btn-container'>
        <button onClick={handleBFS}>Start Breadth-First Search</button>
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