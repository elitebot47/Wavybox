// components/ui/IconButton.tsx
import clsx from "clsx";

export default function LsbButton({
  children,
  icon: Icon,
  className,
  ...props
}: {
  children: React.ReactNode | null;
  icon?: React.ElementType;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-2 bg-black h-20 text-white px-4 py-2 rounded-4xl hover:bg-gray-800 transition",
        className
      )}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
