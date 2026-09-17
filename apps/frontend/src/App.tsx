import { useState } from "react";
import { ScenariosBox } from "./features/ScenariosBox";
import { ParametersBox } from "./features/ParametersBox";

import { OutputBox } from "./features/OutputBox";
import { InputType } from "@stocks-forecast/shared";
import { Header } from "./core/Header";
import { getFIREGoal } from "./utils/utils";
import { InputPatch } from "./types/types";

const initial: InputType = {
  roi: 0.1,
  years: 20,
  capital: 10000,

  types: {
    no_investment: true,
    fixed_deposit: false,
    fixed_contributions: false,
    growing_contributions: false,
  },

  params: {
    monthly_net_salary: 2400,
    investing_rate: 0.4,
    yearly_salary_increase: 0.03,
  },

  options: {
    inflation_rate: 0.02,
    tax_rate: 0.2,
  },
};

function App() {
  const [input, setInput] = useState<InputType>(initial);
  const [showGoal, setShowGoal] = useState<boolean>(false);
  const fireGoal = getFIREGoal(
    input.params?.monthly_net_salary,
    input.params?.investing_rate,
  );

  function onChange(patch: InputPatch) {
    setInput({
      ...input,
      ...patch,
      types: patch.types ? { ...input.types, ...patch.types } : input.types,
      params: patch.params
        ? { ...input.params, ...patch.params }
        : input.params,
      options: patch.options
        ? { ...input.options, ...patch.options }
        : input.options,
    });
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <Header />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <aside className="flex w-full shrink-0 flex-col gap-5 lg:sticky lg:top-6 lg:w-[min(100%,380px)]">
            <ScenariosBox input={input} callback={onChange} />
            <ParametersBox
              input={input}
              callback={onChange}
              showSalary={
                input.types.fixed_contributions ||
                input.types.growing_contributions
              }
              showIncreaseRate={input.types.growing_contributions}
              showGoal={showGoal}
              setShowGoal={setShowGoal}
            />
          </aside>

          <OutputBox input={input} fireGoal={fireGoal} showGoal={showGoal} />
        </div>
      </div>
    </div>
  );
}

export default App;
