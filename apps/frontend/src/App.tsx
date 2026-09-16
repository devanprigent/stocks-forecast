import { useState, useEffect } from "react";
import { ScenariosBox } from "./features/ScenariosBox";
import { ParametersBox } from "./features/ParametersBox";

import {
  investUniqueDeposit as scenario1,
  investFixedDeposit as scenario2,
  investGrowingDeposit as scenario3,
} from "./utils/utils";
import { Parameters, Dataset } from "./types/types";
import { OutputBox } from "./features/OutputBox";

import { Header } from "./core/Header";

const initial = {
  label: "",
  years: 20,
  roi: 10,
  capital: 10000,
  inflationRate: 2,
  taxRate: 20,
  investingRate: 40,
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
        <Header />

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

          <OutputBox
            datasets={datasets}
            fireGoal={fireGoal}
            showGoal={showGoal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
