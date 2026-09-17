import { InfoIcon } from "./InfoIcon";
import { InputPatch } from "src/types/types";
import { InputType } from "@stocks-forecast/shared";

interface PropsType {
  input: InputType;
  callback: (input: InputPatch) => void;
}

const rowClass =
  "flex items-start gap-3 rounded-lg border border-slate-200/80 bg-slate-50/50 px-3 py-2.5 transition hover:border-teal-300/60 hover:bg-white has-[:checked]:border-teal-400/50 has-[:checked]:bg-teal-50/40";

const checkboxClass =
  "mt-0.5 size-4 shrink-0 rounded border-slate-300 text-teal-600 focus:ring-2 focus:ring-teal-500/30 focus:ring-offset-0";

export function ScenariosBox({ input, callback }: Readonly<PropsType>) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200/90 bg-white/90 p-5 shadow-sm shadow-slate-200/50 backdrop-blur-sm">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-teal-700/90">
          Compare
        </h2>
        <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
          Scenarios
        </p>
        <p className="mt-0.5 text-sm text-slate-500">
          Select one or more projections to plot together.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className={rowClass}>
          <input
            type="checkbox"
            name="fixed_deposit"
            checked={input.types.fixed_deposit}
            onChange={(e) =>
              callback({
                types: { fixed_deposit: Boolean(e.target.checked) },
              })
            }
            className={checkboxClass}
          />
          <span className="flex flex-1 flex-wrap items-center gap-1.5 text-sm font-medium leading-snug text-slate-800">
            Lump sum (no new contributions)
            <InfoIcon tooltip="If I stop adding money but keep my current portfolio, how much will it be worth in 10, 15, or 20 years?" />
          </span>
        </label>

        <label className={rowClass}>
          <input
            type="checkbox"
            name="fixed_contributions"
            checked={input.types.fixed_contributions}
            onChange={(e) =>
              callback({
                types: { fixed_contributions: Boolean(e.target.checked) },
              })
            }
            className={checkboxClass}
          />
          <span className="flex flex-1 flex-wrap items-center gap-1.5 text-sm font-medium leading-snug text-slate-800">
            Fixed annual contributions
            <InfoIcon tooltip="If I keep investing the same amount every year for 10, 15, or 20 years, how much will I have?" />
          </span>
        </label>

        <label className={rowClass}>
          <input
            type="checkbox"
            name="growing_contributions"
            checked={input.types.growing_contributions}
            onChange={(e) =>
              callback({
                types: { growing_contributions: Boolean(e.target.checked) },
              })
            }
            className={checkboxClass}
          />
          <span className="flex flex-1 flex-wrap items-center gap-1.5 text-sm font-medium leading-snug text-slate-800">
            Growing contributions (salary raises)
            <InfoIcon tooltip="If I keep investing and factor in future salary increases, how much will I have?" />
          </span>
        </label>
      </div>
    </section>
  );
}
