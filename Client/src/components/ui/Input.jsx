export default function Input({ label, id, className = "", ...props }) {
  return (
    <label className="block" htmlFor={id}>
      {label && (
        <span className="mb-2 block text-sm font-medium text-black">
          {label}
        </span>
      )}
      <input
        className={`h-12 w-full rounded-full border border-black/10 bg-white px-4 text-sm text-black outline-none transition placeholder:text-[#6F6F6F] focus:border-black focus:ring-4 focus:ring-black/5 ${className}`}
        id={id}
        {...props}
      />
    </label>
  );
}
