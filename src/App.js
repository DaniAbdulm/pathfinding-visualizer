import { useState } from 'react';
import Node from './components/node';
import './App.css';

const App = () => {
  const [grid, setGrid] = useState(createInitialGrid()); //setting up grid using react's useState

  //creating the initial grid
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
  }

  return (
    <div className="container">
      <div className='grid'>
        
      </div>
    </div>
  );
}

export default App;
