// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode title="Output" handles={handles} selected={selected}>
      <div className="mb-2.5">
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="w-full bg-indigo-50 border-0 rounded-lg px-2.5 py-1.5 text-center text-[13px] text-indigo-950 outline-none box-border"
        />
      </div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-semibold text-[13px] text-indigo-950">Type</span>
        <span className="bg-indigo-500 text-white rounded-xl px-2.5 py-0.5 text-xs font-medium">
          Dropdown
        </span>
      </div>
      <select
        value={outputType}
        onChange={(e) => setOutputType(e.target.value)}
        className="w-full rounded-lg border border-indigo-100 px-2.5 py-1.5 bg-white text-[13px] text-indigo-950 box-border"
      >
        <option value="Text">Text</option>
        <option value="File">Image</option>
      </select>
    </BaseNode>
  );
};
