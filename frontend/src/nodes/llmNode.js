// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode title="LLM" handles={handles} selected={selected}>
      <div className="bg-indigo-50 rounded-lg px-2.5 py-1.5 text-center text-[13px] text-indigo-950">
        This is a LLM.
      </div>
    </BaseNode>
  );
};
