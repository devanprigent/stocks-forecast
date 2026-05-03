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
    initial.investingRate
  );
  const [salaryIncreaseRate, setSalaryIncreaseRate] = useState<number>(
    initial.salaryIncreaseRate
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
      // Reset the chart
      setDatasets([]);
      // Display the chart for the first scenario
      if (checkboxes.option1) {
        const res = scenario1(
          capital,
          roi / 100,
          years,
          initial.taxRate / 100,
          inflationRate / 100
        );
        const newDataset: Dataset = {
          id: 1,
          label: "Investissement gelé",
          data: res,
        };
        setDatasets((prev) => [...prev, newDataset]);
      } else if (!checkboxes.option1) {
        setDatasets((prev) => [...prev.filter((dataset) => dataset.id !== 1)]);
      }
      // Display the chart for the second scenario
      if (checkboxes.option2) {
        const annualDeposit = salary * (investingRate / 100) * 12;
        const res = scenario2(
          capital,
          roi / 100,
          years,
          initial.taxRate / 100,
          inflationRate / 100,
          annualDeposit
        );
        const newDataset: Dataset = {
          id: 2,
          label: "Investissement fixe",
          data: res,
        };
        setDatasets((prev) => [...prev, newDataset]);
      } else if (!checkboxes.option2) {
        setDatasets((prev) => [...prev.filter((dataset) => dataset.id !== 2)]);
      }
      // Display the chart for the third scenario
      if (checkboxes.option3) {
        const res = scenario3(
          capital,
          roi / 100,
          years,
          initial.taxRate / 100,
          inflationRate / 100,
          salary,
          salaryIncreaseRate / 100,
          investingRate / 100
        );
        const newDataset: Dataset = {
          id: 3,
          label: "Investissement croissant",
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
    <div className="h-screen flex flex-row space-x-4 justify-center items-center mx-2">
      <div className="w-1/4 flex flex-col space-y-4 justify-center items-center">
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
      </div>
      <div className="w-3/4 justify-items-center border-2 border-gray-300 rounded-lg shadow-lg space-y-2 bg-white">
        <Chart datasets={datasets} line={fireGoal} showGoal={showGoal} />
      </div>
    </div>
  );
}

export default App;
