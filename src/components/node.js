import React from "react";
import './node.css'; //styling file for each box

const Node = ({ row, col, isStart, isEnd, isWall, isVisited, isPath, onClick }) => {
    const extraClassName = isStart ? 'node-start' : isEnd ? 'node-end' : isWall ? 'node-wall' : isPath ? 'node-path' : isVisited ? 'node-visited' : '';

    return (
        <div 
            className={`node ${extraClassName}`} 
            id={`node-${row}-${col}`} 
            onClick={() => onClick(row, col)} //adding click hangler
        ></div>
    ) 
}; 

export default Node; 