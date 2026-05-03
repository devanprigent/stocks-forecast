import { Parameters } from "../types";

interface PropsType {
  callback: (params: Parameters) => void;
  years: number;
  roi: number;
  capital: number;
  inflationRate: number;
  salary: number;
  investingRate: number;
  salaryIncreaseRate: number;
  showIncreaseRate: boolean;
  showSalary: boolean;
  showGoal: boolean;
}

const fieldStyle =
  "min-w-[5.5rem] rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-center text-sm font-medium text-slate-800 shadow-inner shadow-slate-100/80 transition placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/25";

const labelClass = "text-sm font-medium text-slate-600";

const rowClass = "flex items-center justify-between gap-4 py-1";

export function ParametersBox({
  callback,
  years,
  roi,
  capital,
  inflationRate,
  salary,
  investingRate,
  salaryIncreaseRate,
  showIncreaseRate,
  showSalary,
  showGoal,
}: PropsType) {
  function onChange(params: Parameters) {
    callback(params);
  }

  return (
    <section className="flex flex-col gap-1 rounded-xl border border-slate-200/90 bg-white/90 p-5 shadow-sm shadow-slate-200/50 backdrop-blur-sm">
      <div className="mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-teal-700/90">
          Model
        </h2>
        <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
          Parameters
        </p>
      </div>

      <div className="flex flex-col gap-0.5 border-b border-slate-100 pb-3">
        <label className={rowClass}>
          <span className={labelClass}>Time horizon (years)</span>
          <input
            type="number"
            min="0"
            value={years}
            onChange={(e) => {
              const value = Number(e.target.value);
              onChange({
                years: value,
                roi,
                capital,
                inflationRate,
                showGoal,
                salary,
                investingRate,
                salaryIncreaseRate,
              });
            }}
            className={fieldStyle}
          />
        </label>

        <label className={rowClass}>
          <span className={labelClass}>ROI (%)</span>
          <input
            type="number"
            value={roi}
            onChange={(e) => {
              const value = Number(e.target.value);
              onChange({
                years,
                roi: value,
                capital,
                inflationRate,
                showGoal,
                salary,
                investingRate,
                salaryIncreaseRate,
              });
            }}
            className={fieldStyle}
          />
        </label>

        <label className={rowClass}>
          <span className={labelClass}>Initial capital (€)</span>
          <input
            type="number"
            step="100"
            min="0"
            value={capital}
            onChange={(e) => {
              const value = Number(e.target.value);
              onChange({
                years,
                roi,
                capital: value,
                inflationRate,
                showGoal,
                salary,
                investingRate,
                salaryIncreaseRate,
              });
            }}
            className={fieldStyle}
          />
        </label>

        <label className={rowClass}>
          <span className={labelClass}>Inflation (%)</span>
          <input
            type="number"
            step="0.1"
            value={inflationRate}
            onChange={(e) => {
              const value = Number(e.target.value);
              onChange({
                years,
                roi,
                capital,
                inflationRate: value,
                showGoal,
                salary,
                investingRate,
                salaryIncreaseRate,
              });
            }}
            className={fieldStyle}
          />
        </label>

        <label className={`${rowClass} pt-1`}>
          <span className={labelClass}>Show FIRE target line</span>
          <input
            type="checkbox"
            checked={showGoal}
            onChange={(e) => {
              const checked = e.target.checked;
              onChange({
                years,
                roi,
                capital,
                inflationRate,
                showGoal: checked,
                salary,
                investingRate,
                salaryIncreaseRate,
              });
            }}
            className="size-4 rounded border-slate-300 text-teal-600 focus:ring-2 focus:ring-teal-500/30 focus:ring-offset-0"
          />
        </label>
      </div>

      {showSalary && (
        <div className="flex flex-col gap-0.5 pt-2">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
            Income & contributions
          </p>
          <label className={rowClass}>
            <span className={labelClass}>Monthly net salary</span>
            <input
              type="number"
              min="0"
              step="100"
              value={salary}
              onChange={(e) => {
                const value = Number(e.target.value);
                onChange({
                  years,
                  roi,
                  capital,
                  inflationRate,
                  showGoal,
                  salary: value,
                  investingRate,
                  salaryIncreaseRate,
                });
              }}
              className={fieldStyle}
            />
          </label>

          <label className={rowClass}>
            <span className={labelClass}>Investing rate (%)</span>
            <input
              type="number"
              value={investingRate}
              onChange={(e) => {
                const value = Number(e.target.value);
                onChange({
                  years,
                  roi,
                  capital,
                  inflationRate,
                  showGoal,
                  salary,
                  investingRate: value,
                  salaryIncreaseRate,
                });
              }}
              className={fieldStyle}
            />
          </label>

          {showIncreaseRate && (
            <label className={`${rowClass} mt-1 border-t border-slate-100 pt-3`}>
              <span className={labelClass}>Salary increase (% / year)</span>
              <input
                type="number"
                value={salaryIncreaseRate}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  onChange({
                    years,
                    roi,
                    capital,
                    inflationRate,
                    showGoal,
                    salary,
                    investingRate,
                    salaryIncreaseRate: value,
                  });
                }}
                className={fieldStyle}
              />
            </label>
          )}
        </div>
      )}
    </section>
  );
}
