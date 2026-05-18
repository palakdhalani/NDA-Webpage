import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({ className, children, hover = true, ...props }) => (
  <motion.div
    whileHover={hover ? { y: -2 } : {}}
    className={twMerge('bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4', className)}
    {...props}
  >
    {children}
  </motion.div>
);

export default Card;
