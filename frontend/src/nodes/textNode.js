// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode title="Text" handles={handles} selected={selected}>
      <div className="mb-2.5">
        <input
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="w-full bg-indigo-50 border-0 rounded-lg px-2.5 py-1.5 text-center text-[13px] text-indigo-950 outline-none box-border"
        />
      </div>
    </BaseNode>
  );
};
