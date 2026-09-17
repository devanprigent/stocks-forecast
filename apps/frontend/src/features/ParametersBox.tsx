import { InputType } from "@stocks-forecast/shared";
import { InputPatch } from "src/types/types";

interface PropsType {
  callback: (input: InputPatch) => void;
  input: InputType;
  showIncreaseRate: boolean;
  showSalary: boolean;
  showGoal: boolean;
  setShowGoal: (value: boolean) => void;
}

const fieldStyle =
  "min-w-[5.5rem] rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-center text-sm font-medium text-slate-800 shadow-inner shadow-slate-100/80 transition placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/25";

const labelClass = "text-sm font-medium text-slate-600";

const rowClass = "flex items-center justify-between gap-4 py-1";

export function ParametersBox({
  callback,
  input,
  showIncreaseRate,
  showSalary,
  showGoal,
  setShowGoal,
}: PropsType) {
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
            value={input.years}
            onChange={(e) => callback({ years: Number(e.target.value) })}
            className={fieldStyle}
          />
        </label>

        <label className={rowClass}>
          <span className={labelClass}>ROI (%)</span>
          <input
            type="number"
            value={input.roi}
            onChange={(e) => callback({ roi: Number(e.target.value) })}
            className={fieldStyle}
          />
        </label>

        <label className={rowClass}>
          <span className={labelClass}>Initial capital (€)</span>
          <input
            type="number"
            step="100"
            min="0"
            value={input.capital}
            onChange={(e) => callback({ capital: Number(e.target.value) })}
            className={fieldStyle}
          />
        </label>

        <label className={rowClass}>
          <span className={labelClass}>Inflation (%)</span>
          <input
            type="number"
            step="0.1"
            value={input.options?.inflation_rate}
            onChange={(e) =>
              callback({ options: { inflation_rate: Number(e.target.value) } })
            }
            className={fieldStyle}
          />
        </label>

        <label className={`${rowClass} pt-1`}>
          <span className={labelClass}>Show FIRE target line</span>
          <input
            type="checkbox"
            checked={showGoal}
            onChange={(e) => setShowGoal(e.target.checked)}
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
              value={input.params?.monthly_net_salary}
              onChange={(e) =>
                callback({
                  params: { monthly_net_salary: Number(e.target.value) },
                })
              }
              className={fieldStyle}
            />
          </label>

          <label className={rowClass}>
            <span className={labelClass}>Investing rate (%)</span>
            <input
              type="number"
              value={input.params?.investing_rate}
              onChange={(e) =>
                callback({
                  params: { investing_rate: Number(e.target.value) },
                })
              }
              className={fieldStyle}
            />
          </label>

          {showIncreaseRate && (
            <label
              className={`${rowClass} mt-1 border-t border-slate-100 pt-3`}
            >
              <span className={labelClass}>Salary increase (% / year)</span>
              <input
                type="number"
                value={input.params?.yearly_salary_increase}
                onChange={(e) =>
                  callback({
                    params: { yearly_salary_increase: Number(e.target.value) },
                  })
                }
                className={fieldStyle}
              />
            </label>
          )}
        </div>
      )}
    </section>
  );
}
