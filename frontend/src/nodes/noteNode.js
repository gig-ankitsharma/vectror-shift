// noteNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

const MIN_HEIGHT = 80;

export const NoteNode = ({ id, data }) => {
  const [content, setContent] = useState(data?.content || 'Add a note…');

  return (
    <BaseNode title="Note" handles={[]}>
      <textarea
        id={`note-${id}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full bg-yellow-50 border border-yellow-200 rounded-lg px-2.5 py-1.5 text-[13px] text-yellow-900 outline-none box-border resize-none font-[inherit]"
        style={{ minHeight: MIN_HEIGHT }}
        placeholder="Add a note…"
      />
      <p className="mt-1.5 text-[11px] text-indigo-300 text-right">annotation only</p>
    </BaseNode>
  );
};
