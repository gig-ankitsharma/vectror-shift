// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const OPERATIONS = ['Uppercase', 'Lowercase', 'Trim', 'Reverse', 'JSON Parse', 'JSON Stringify'];

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Uppercase');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode title="Transform" handles={handles}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-semibold text-[13px] text-indigo-950">Operation</span>
        <span className="bg-indigo-500 text-white rounded-xl px-2.5 py-0.5 text-xs font-medium">
          Dropdown
        </span>
      </div>
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        className="w-full rounded-lg border border-indigo-100 px-2.5 py-1.5 bg-white text-[13px] text-indigo-950 box-border"
      >
        {OPERATIONS.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
      <p className="mt-2 text-[11px] text-indigo-400 text-center">
        in → <span className="font-medium text-indigo-600">{operation}</span> → out
      </p>
    </BaseNode>
  );
};
