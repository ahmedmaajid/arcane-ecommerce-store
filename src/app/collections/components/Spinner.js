// ── SPINNER ──────────────────────────────────────────────────
export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 border border-stone-300 border-t-stone-700 rounded-full animate-spin" />
        <p className="font-manrope text-[12px] font-medium uppercase text-stone-600">
          Loading
        </p>
      </div>
    </div>
  );
}
