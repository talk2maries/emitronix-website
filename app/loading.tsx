export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-brand/[0.12] border-t-brand" />
        <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-steel">Loading Emitronix</p>
      </div>
    </div>
  );
}
