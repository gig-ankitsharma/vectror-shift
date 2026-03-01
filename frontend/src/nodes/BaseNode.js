// BaseNode.js

import { Handle } from 'reactflow';
import { motion } from 'framer-motion';

export const BaseNode = ({ title, handles = [], children }) => {
  return (
    <motion.div
      className="bg-white border border-indigo-100 rounded-xl min-w-[200px] overflow-hidden"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow:  '0 4px 16px rgba(99,102,241,0.10)',
      }}
      whileHover={{
        scale: 1.025,
        boxShadow: '0 8px 28px rgba(99,102,241,0.25)',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style || {}}
        />
      ))}
      <motion.div
        className="bg-indigo-50 px-3.5 py-2.5"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.08, duration: 0.2 }}
      >
        <span className="font-bold text-indigo-950 text-sm">{title}</span>
      </motion.div>
      <div className="px-3.5 py-2.5">
        {children}
      </div>
    </motion.div>
  );
};
