import { useState } from "react";
import { InfoIcon } from "./InfoIcon";

interface PropsType {
  callback: (checkboxes: { [key: string]: boolean }) => void;
}

const initialCheckboxes = {
  option1: false,
  option2: false,
  option3: false,
  option4: false,
};

const rowClass =
  "flex items-start gap-3 rounded-lg border border-slate-200/80 bg-slate-50/50 px-3 py-2.5 transition hover:border-teal-300/60 hover:bg-white has-[:checked]:border-teal-400/50 has-[:checked]:bg-teal-50/40";

const checkboxClass =
  "mt-0.5 size-4 shrink-0 rounded border-slate-300 text-teal-600 focus:ring-2 focus:ring-teal-500/30 focus:ring-offset-0";

export function ScenariosBox({ callback }: Readonly<PropsType>) {
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newCheckboxes = { ...checkboxes, [name]: checked };
    setCheckboxes(newCheckboxes);
    callback(newCheckboxes);
  };

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
            name="option1"
            checked={checkboxes.option1}
            onChange={handleCheckboxChange}
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
            name="option2"
            checked={checkboxes.option2}
            onChange={handleCheckboxChange}
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
            name="option3"
            checked={checkboxes.option3}
            onChange={handleCheckboxChange}
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
