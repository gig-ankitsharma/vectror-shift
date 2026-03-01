// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const MIN_WIDTH = 200;
const MIN_HEIGHT = 80;
// Extra space added to measured text dimensions to account for node chrome/padding
const NODE_PADDING = 32;

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [width, setWidth] = useState(MIN_WIDTH);
  const [height, setHeight] = useState(MIN_HEIGHT);
  const textareaRef = useRef(null);
  // Hidden span used to measure actual rendered text width (avoids font-size guessing)
  const measureRef = useRef(null);

  const variables = [...new Set([...currText.matchAll(VAR_REGEX)].map(m => m[1]))];

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((v, i) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${v}`,
      style: { top: `${((i + 1) / (variables.length + 1)) * 100}%` },
    })),
  ];

  const resize = (val) => {
    // Width: find the longest explicit line and measure it with a hidden <span>
    const longestLine = val
      .split('\n')
      .reduce((a, b) => (b.length > a.length ? b : a), '');
    if (measureRef.current) {
      measureRef.current.textContent = longestLine || ' ';
      setWidth(Math.max(MIN_WIDTH, measureRef.current.offsetWidth + NODE_PADDING));
    }

    // Height: reset textarea height so scrollHeight reflects true content height,
    // then apply it back to the textarea before reading and storing the value.
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollH}px`;
      setHeight(Math.max(MIN_HEIGHT, scrollH + NODE_PADDING*2));
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setCurrText(val);
    resize(val);
  };

  // Measure initial size on mount
  useEffect(() => {
    resize(currText);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BaseNode title="Text" handles={handles} style={{ width, height }}>
      {variables.length > 0 && (
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, pointerEvents: 'none' }}>
          {variables.map((v, i) => (
            <span
              key={v}
              style={{
                position: 'absolute',
                left: 10,
                top: `${((i + 1) / (variables.length + 1)) * 100}%`,
                transform: 'translateY(-50%)',
                fontSize: 10,
                color: '#555',
                whiteSpace: 'nowrap',
              }}
            >
              {v}
            </span>
          ))}
        </div>
      )}
      {/* Hidden span to accurately measure rendered text width */}
      <span
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre',
          pointerEvents: 'none',
          font: 'inherit',
        }}
      />
      <label>
        Text:
        <textarea
          ref={textareaRef}
          id={`textarea-${id}`}
          data-node-id={id}
          value={currText}
          onChange={handleChange}
          wrap="off"
          style={{
            display: 'block',
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box',
            font: 'inherit',
          }}
          rows={1}
        />
      </label>
    </BaseNode>
  );
};
