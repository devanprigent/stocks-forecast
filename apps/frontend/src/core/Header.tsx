export function Header() {
  return (
    <header className="mb-8 flex flex-col gap-2 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Stocks forecast
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
          After-tax, inflation-adjusted projections. Toggle scenarios and tune
          assumptions.
        </p>
      </div>
    </header>
  );
}
