// components/ui/progress.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => {
    const isIndeterminate = value === undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-1 w-full overflow-hidden  bg-secondary",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "absolute h-full bg-primary transition-all",
            isIndeterminate ? "animate-spill" : "rounded"
          )}
          style={
            isIndeterminate
              ? { width: "40%" }
              : { width: `${value}%`, minWidth: 4 }
          }
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
