export default function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </section>
  );
}
