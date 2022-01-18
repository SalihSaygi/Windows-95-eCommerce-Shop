import React from 'react';
import { boxSets } from '../data';

const Desktop = () => {
  return (
    <div>
      {boxSets.map((boxes, index) => (
        <div className="boxSet" key={index}>
          {boxes.map((box, i) => (
            <div className="box" key={i} label={box}>
              1
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Desktop;
