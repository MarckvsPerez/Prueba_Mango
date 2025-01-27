"use client";

import React, { useState } from "react";

interface RangeProps {
  mode: "normal" | "fixed";
  min?: number;
  max?: number;
  rangeValues?: number[];
}

const Range: React.FC<RangeProps> = ({ mode, min, max, rangeValues }) => {
  const [values, setValues] = useState<[number, number]>([min || 0, max || 0]);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <p className="text-lg font-semibold mb-4 text-gray-700">
        Custom Range Component
      </p>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{
            left: `${(values[0] / (max || 100)) * 100}%`,
            right: `${100 - (values[1] / (max || 100)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Range;
