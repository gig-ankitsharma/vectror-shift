// pipelineNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const DEFAULT_INPUTS = ['input_1', 'input_2'];
const DEFAULT_OUTPUTS = ['output_1'];

export const PipelineNode = ({ id, data }) => {
  const [pipelineName, setPipelineName] = useState(data?.pipelineName || 'Sub-Pipeline');
  const [inputs] = useState(data?.inputs || DEFAULT_INPUTS);
  const [outputs] = useState(data?.outputs || DEFAULT_OUTPUTS);

  const handles = [
    ...inputs.map((inp, i) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${inp}`,
      style: { top: `${((i + 1) / (inputs.length + 1)) * 100}%` },
    })),
    ...outputs.map((out, i) => ({
      type: 'source',
      position: Position.Right,
      id: `${id}-${out}`,
      style: { top: `${((i + 1) / (outputs.length + 1)) * 100}%` },
    })),
  ];

  return (
    <BaseNode title="Pipeline" handles={handles}>
      <div className="mb-2.5">
        <label className="block text-[11px] font-semibold text-indigo-500 mb-1">
          Pipeline Name
        </label>
        <input
          type="text"
          value={pipelineName}
          onChange={(e) => setPipelineName(e.target.value)}
          className="w-full bg-indigo-50 border-0 rounded-lg px-2.5 py-1.5 text-center text-[13px] text-indigo-950 outline-none box-border"
        />
      </div>

      <div className="flex justify-between text-[11px] text-indigo-400 mt-1">
        <div>
          <p className="font-semibold text-indigo-600 mb-0.5">Inputs</p>
          {inputs.map((inp) => (
            <p key={inp}>{inp}</p>
          ))}
        </div>
        <div className="text-right">
          <p className="font-semibold text-indigo-600 mb-0.5">Outputs</p>
          {outputs.map((out) => (
            <p key={out}>{out}</p>
          ))}
        </div>
      </div>
    </BaseNode>
  );
};
