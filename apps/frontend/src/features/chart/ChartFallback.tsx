export function ChartFallback() {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
        <svg
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C4.125 11.625 6.75 8.25 9.375 8.25C12.75 8.25 12.75 15.75 16.125 15.75C18.75 15.75 20.25 13.125 21 11.25M21 11.25V15.75M21 11.25H16.5"
          />
        </svg>
      </div>
      <div>
        <p className="font-medium text-slate-800">No scenario selected</p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Choose at least one scenario on the left to plot your projection.
        </p>
      </div>
    </div>
  );
}
