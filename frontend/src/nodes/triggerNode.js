// triggerNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const TRIGGER_TYPES = ['Manual', 'Webhook', 'Schedule', 'Event'];

export const TriggerNode = ({ id, data }) => {
  const [triggerType, setTriggerType] = useState(data?.triggerType || 'Manual');
  const [schedule, setSchedule] = useState(data?.schedule || '0 * * * *');

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode title="Trigger" handles={handles}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-semibold text-[13px] text-indigo-950">Type</span>
        <span className="bg-indigo-500 text-white rounded-xl px-2.5 py-0.5 text-xs font-medium">
          Dropdown
        </span>
      </div>
      <select
        value={triggerType}
        onChange={(e) => setTriggerType(e.target.value)}
        className="w-full rounded-lg border border-indigo-100 px-2.5 py-1.5 bg-white text-[13px] text-indigo-950 box-border mb-2.5"
      >
        {TRIGGER_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {triggerType === 'Schedule' && (
        <div>
          <label className="block text-[11px] font-semibold text-indigo-500 mb-1">
            Cron Expression
          </label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="0 * * * *"
            className="w-full bg-indigo-50 border-0 rounded-lg px-2.5 py-1.5 text-[13px] text-indigo-950 outline-none box-border font-mono"
          />
        </div>
      )}

      {triggerType === 'Webhook' && (
        <p className="text-[11px] text-indigo-400 text-center">
          Listens for incoming HTTP requests
        </p>
      )}

      {triggerType === 'Event' && (
        <input
          type="text"
          defaultValue={data?.eventName || ''}
          placeholder="event.name"
          className="w-full bg-indigo-50 border-0 rounded-lg px-2.5 py-1.5 text-[13px] text-indigo-950 outline-none box-border"
        />
      )}
    </BaseNode>
  );
};
