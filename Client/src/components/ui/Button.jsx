const variants = {
  primary:
    "bg-[#000000] text-white hover:bg-[#1a1a1a] focus-visible:outline-[#000000]",
  secondary:
    "bg-white text-[#000000] ring-1 ring-black/10 hover:bg-[#F5F5F2] focus-visible:outline-[#000000]",
  soft: "bg-[#F5F5F2] text-[#000000] hover:bg-[#ECECE7] focus-visible:outline-[#000000]",
  warning:
    "bg-[#000000] text-white hover:bg-[#1a1a1a] focus-visible:outline-[#000000]",
  ghost:
    "bg-transparent text-[#000000] hover:bg-[#F5F5F2] focus-visible:outline-[#000000]",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  children,
  className = "",
  size = "md",
  variant = "primary",
  type = "button",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
