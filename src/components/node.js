import React from "react";
import './node.css'; //styling file for each box

const Node = ({ row, col, isStart, isEnd, isWall }) => {
    const extraClassName = isStart ? 'node-start' : isEnd ? 'node-end' : isWall ? 'node-wall' : '';

    return <div className={`node ${extraClassName}`} id={`node-${row}-${col}`}></div>
}; 

export default Node; 