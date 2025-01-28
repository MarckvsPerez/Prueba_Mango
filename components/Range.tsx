"use client";

import React, { useState, useEffect, useRef } from "react";

interface RangeProps {
  mode: "normal" | "fixed";
  min?: number;
  max?: number;
  rangeValues?: number[];
  onChange?: (values: [number, number]) => void;
}

const Range: React.FC<RangeProps> = ({
  mode,
  min: propMin = 0,
  max: propMax = 100,
  rangeValues = [],
  onChange,
}) => {
  const min =
    mode === "fixed" && rangeValues.length > 0
      ? Math.min(...rangeValues)
      : propMin;
  const max =
    mode === "fixed" && rangeValues.length > 0
      ? Math.max(...rangeValues)
      : propMax;

  const [values, setValues] = useState<[number, number]>(() => {
    if (mode === "fixed" && rangeValues.length >= 2) {
      return [rangeValues[0], rangeValues[rangeValues.length - 1]];
    }
    return [min, max];
  });
  const [isDragging, setIsDragging] = useState<null | "min" | "max">(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getClosestValue = (value: number): number => {
    if (mode !== "fixed" || !rangeValues.length) return value;

    return rangeValues.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
  };

  const handleMouseDown = (handle: "min" | "max") => (_e: React.MouseEvent) => {
    setIsDragging(handle);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !rangeRef.current) return;

    const rect = rangeRef.current.getBoundingClientRect();
    const percentage = Math.min(
      Math.max(0, (e.clientX - rect.left) / rect.width),
      1
    );

    const rawValue = percentage * (max - min) + min;
    const newValue =
      mode === "fixed" ? getClosestValue(rawValue) : Math.round(rawValue);

    setValues((prev) => {
      if (mode === "fixed") {
        if (isDragging === "min") {
          const validValue = rangeValues.reduce((closest, current) => {
            if (
              current < prev[1] &&
              Math.abs(current - rawValue) < Math.abs(closest - rawValue)
            ) {
              return current;
            }
            return closest;
          }, rangeValues[0]);
          return [validValue, prev[1]];
        } else {
          const validValue = rangeValues.reduce((closest, current) => {
            if (
              current > prev[0] &&
              Math.abs(current - rawValue) < Math.abs(closest - rawValue)
            ) {
              return current;
            }
            return closest;
          }, rangeValues[rangeValues.length - 1]);
          return [prev[0], validValue];
        }
      } else {
        if (isDragging === "min") {
          return [Math.min(newValue, prev[1] - 1), prev[1]];
        } else {
          return [prev[0], Math.max(newValue, prev[0] + 1)];
        }
      }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    onChange?.(values);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-center">{values[0].toFixed(2)}€</span>
        <div
          ref={rangeRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer flex-1"
        >
          {mode === "fixed" &&
            rangeValues.map((value, index) => (
              <div
                key={value}
                className="absolute w-4 h-4 bg-gray-300 -top-1 rounded-full"
                style={{
                  left: `${((value - min) / (max - min)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />
            ))}
          <div
            className="absolute h-full bg-purple-600 rounded-full"
            style={{
              left: `${((values[0] - min) / (max - min)) * 100}%`,
              right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
              cursor: "default",
            }}
          />
          <button
            className={`absolute w-4 h-4 bg-white border-2 border-purple-600 rounded-full -mt-1 transform -translate-x-1/2 transition-transform hover:scale-125 ${
              isDragging === "min" ? "cursor-grabbing scale-125" : "cursor-grab"
            }`}
            style={{ left: `${((values[0] - min) / (max - min)) * 100}%` }}
            onMouseDown={handleMouseDown("min")}
          />
          <button
            className={`absolute w-4 h-4 bg-white border-2 border-purple-600 rounded-full -mt-1 transform -translate-x-1/2 transition-transform hover:scale-125 ${
              isDragging === "max" ? "cursor-grabbing scale-125" : "cursor-grab"
            }`}
            style={{ left: `${((values[1] - min) / (max - min)) * 100}%` }}
            onMouseDown={handleMouseDown("max")}
          />
        </div>
        <span className="w-16 text-center">{values[1].toFixed(2)}€</span>
      </div>
    </div>
  );
};

export default Range;
