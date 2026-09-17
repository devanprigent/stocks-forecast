import { Suspense } from "react";
import { Chart } from "./chart/Chart";
import { InputType } from "@stocks-forecast/shared";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { Loading } from "../core/Loading";

interface PropsType {
  input: InputType;
  fireGoal: number;
  showGoal: boolean;
}

export function OutputBox({ input, fireGoal, showGoal }: Readonly<PropsType>) {
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
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div>
              <p>Something went wrong:</p>
              <pre>{getErrorMessage(error)}</pre>
            </div>
          )}
          resetKeys={[input]}
        >
          <Suspense fallback={<Loading width={100} height={100} />}>
            <Chart input={input} line={fireGoal} showGoal={showGoal} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}
