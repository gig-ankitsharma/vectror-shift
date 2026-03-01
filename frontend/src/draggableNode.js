// draggableNode.js

import { motion } from 'framer-motion';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <motion.div
      className="cursor-grab min-w-[80px] h-[60px] flex items-center justify-center flex-col rounded-lg bg-[#1C2536]"
      onDragStart={(event) => onDragStart(event, type)}
      whileHover={{ scale: 1.07, backgroundColor: '#2a3650' }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.12 }}
      draggable
    >
      <span className="text-white text-sm font-medium select-none">{label}</span>
    </motion.div>
  );
};
