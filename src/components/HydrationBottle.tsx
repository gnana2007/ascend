export function HydrationBottle() {
  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="h-5 w-12 rounded-t-lg border border-sky-200 bg-white/60 dark:bg-white/10" />
      <div className="relative h-44 w-24 overflow-hidden rounded-[2rem] border-4 border-sky-100 bg-white/50 shadow-inner dark:bg-white/10">
        <div className="absolute bottom-0 left-0 right-0 animate-fill rounded-t-[1.6rem] bg-gradient-to-t from-cyan-300 to-skyglass" />
        <div className="absolute inset-x-5 top-8 h-2 rounded-full bg-white/70" />
        <div className="absolute inset-x-7 top-16 h-2 rounded-full bg-white/60" />
      </div>
      <p className="mt-3 text-sm font-semibold text-ink/70 dark:text-white/70">2.1L of 2.6L</p>
    </div>
  );
}
