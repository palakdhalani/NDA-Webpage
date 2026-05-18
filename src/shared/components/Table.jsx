import React from 'react';
import { twMerge } from 'tailwind-merge';

const Table = ({ headers, children, className }) => (
  <div className={twMerge("w-full overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm", className)}>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-gray-100 bg-gray-50/50">
          {headers.map((header, index) => (
            <th key={index} className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50 text-sm text-gray-600 font-medium">
        {children}
      </tbody>
    </table>
  </div>
);

export default Table;
