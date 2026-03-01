// BaseNode.js

import { Handle } from 'reactflow';

export const BaseNode = ({ title, handles = [], style = {}, children }) => {
  return (
    <div style={{ width: 200, height: 80, border: '1px solid black', ...style }}>
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style || {}}
        />
      ))}
      <div>
        <span>{title}</span>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};
