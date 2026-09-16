import { Chart } from "./Chart";
import { Dataset } from "../types/types";

interface PropsType {
  datasets: Dataset[];
  fireGoal: number;
  showGoal: boolean;
}

export function OutputBox({
  datasets,
  fireGoal,
  showGoal,
}: Readonly<PropsType>) {
  return (
    <main className="min-h-[min(70vh,560px)] min-w-0 flex-1 rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-md shadow-slate-300/30 backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-teal-700/90">
            Output
          </h2>
          <p className="text-base font-semibold text-slate-900">
            Real wealth over time
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Values in today&apos;s euros after tax & inflation
        </p>
      </div>
      <div className="h-[min(60vh,480px)] min-h-[320px] w-full">
        <Chart datasets={datasets} line={fireGoal} showGoal={showGoal} />
      </div>
    </main>
  );
}
