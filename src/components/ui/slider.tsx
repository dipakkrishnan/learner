"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
  > {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

function Slider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled,
  ...props
}: SliderProps) {
  const isControlled = value !== undefined;
  const initialValue = defaultValue?.[0] ?? min;
  const [internalValue, setInternalValue] = React.useState(initialValue);

  const currentValue = isControlled ? (value?.[0] ?? min) : internalValue;
  const percentage =
    max === min ? 0 : ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={cn("relative flex w-full items-center", className)}>
      <div className="pointer-events-none absolute left-0 right-0 h-1 rounded-full bg-muted" />
      <div
        className="pointer-events-none absolute left-0 h-1 rounded-full bg-primary"
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        disabled={disabled}
        onChange={(event) => {
          const nextValue = Number(event.target.value);

          if (!isControlled) {
            setInternalValue(nextValue);
          }

          onValueChange?.([nextValue]);
        }}
        className={cn(
          "relative z-10 h-5 w-full cursor-pointer appearance-none bg-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent",
          "[&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-ring [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm",
          "[&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent",
          "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-ring [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm"
        )}
        {...props}
      />
    </div>
  );
}

export { Slider };
