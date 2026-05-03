import { useState, useEffect } from "react";
import { ScenariosBox } from "./ScenariosBox";
import { ParametersBox } from "./ParametersBox";
import { Chart } from "./Chart";
import {
  investUniqueDeposit as scenario1,
  investFixedDeposit as scenario2,
  investGrowingDeposit as scenario3,
} from "./utils";
import { Parameters, Dataset } from "./types";

const initial = {
  label: "",
  years: 20,
  roi: 11,
  capital: 15000,
  inflationRate: 4,
  taxRate: 17.2,
  investingRate: 30,
  salary: 2400,
  salaryIncreaseRate: 3,
  datasets: Array.from({ length: 20 }, (_, i) => ({
    year: i + 1,
    value: 0,
  })),
};

function App() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [years, setYears] = useState<number>(initial.years);
  const [roi, setRoi] = useState<number>(initial.roi);
  const [capital, setCapital] = useState<number>(initial.capital);
  const [inflationRate, setInflation] = useState<number>(initial.inflationRate);
  const [salary, setSalary] = useState<number>(initial.salary);
  const [investingRate, setInvestingRate] = useState<number>(
    initial.investingRate,
  );
  const [salaryIncreaseRate, setSalaryIncreaseRate] = useState<number>(
    initial.salaryIncreaseRate,
  );
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const [showGoal, setShowGoal] = useState<boolean>(false);
  const annualDeposit = salary * (1 - investingRate / 100) * 12;
  const fireGoal = 25 * annualDeposit;

  useEffect(() => {
    function displayChart() {
      setDatasets([]);
      if (checkboxes.option1) {
        const res = scenario1(
          capital,
          roi / 100,
          years,
          initial.taxRate / 100,
          inflationRate / 100,
        );
        const newDataset: Dataset = {
          id: 1,
          label: "Lump sum (no new contributions)",
          data: res,
        };
        setDatasets((prev) => [...prev, newDataset]);
      } else if (!checkboxes.option1) {
        setDatasets((prev) => [...prev.filter((dataset) => dataset.id !== 1)]);
      }
      if (checkboxes.option2) {
        const annualDeposit = salary * (investingRate / 100) * 12;
        const res = scenario2(
          capital,
          roi / 100,
          years,
          initial.taxRate / 100,
          inflationRate / 100,
          annualDeposit,
        );
        const newDataset: Dataset = {
          id: 2,
          label: "Fixed annual contributions",
          data: res,
        };
        setDatasets((prev) => [...prev, newDataset]);
      } else if (!checkboxes.option2) {
        setDatasets((prev) => [...prev.filter((dataset) => dataset.id !== 2)]);
      }
      if (checkboxes.option3) {
        const res = scenario3(
          capital,
          roi / 100,
          years,
          initial.taxRate / 100,
          inflationRate / 100,
          salary,
          salaryIncreaseRate / 100,
          investingRate / 100,
        );
        const newDataset: Dataset = {
          id: 3,
          label: "Growing contributions (salary raises)",
          data: res,
        };
        setDatasets((prev) => [...prev, newDataset]);
      } else if (!checkboxes.option3) {
        setDatasets((prev) => [...prev.filter((dataset) => dataset.id !== 3)]);
      }
    }

    displayChart();
  }, [
    years,
    capital,
    roi,
    checkboxes,
    inflationRate,
    salary,
    investingRate,
    salaryIncreaseRate,
  ]);

  function setParameters({
    years,
    roi,
    capital,
    inflationRate,
    showGoal,
    salary,
    investingRate,
    salaryIncreaseRate,
  }: Parameters) {
    setYears(years);
    setRoi(roi);
    setCapital(capital);
    setInflation(inflationRate);
    setShowGoal(showGoal);
    setSalary(salary);
    setInvestingRate(investingRate);
    setSalaryIncreaseRate(salaryIncreaseRate);
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-8 flex flex-col gap-2 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Stocks forecast
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              After-tax, inflation-adjusted projections. Toggle scenarios and
              tune assumptions.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <aside className="flex w-full shrink-0 flex-col gap-5 lg:sticky lg:top-6 lg:w-[min(100%,380px)]">
            <ScenariosBox
              callback={(newCheckboxes: { [key: string]: boolean }) => {
                setCheckboxes(newCheckboxes);
              }}
            />
            <ParametersBox
              callback={setParameters}
              years={years}
              roi={roi}
              capital={capital}
              inflationRate={inflationRate}
              salary={salary}
              investingRate={investingRate}
              salaryIncreaseRate={salaryIncreaseRate}
              showSalary={checkboxes.option2 || checkboxes.option3}
              showIncreaseRate={checkboxes.option3}
              showGoal={showGoal}
            />
          </aside>

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
        </div>
      </div>
    </div>
  );
}

export default App;
