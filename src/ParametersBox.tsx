import { Parameters } from "./types";

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
  const fieldStyle =
    "w-20 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center";

  function onChange(params: Parameters) {
    callback(params);
  }

  return (
    <div className="flex flex-col p-6 border-2 border-gray-300 rounded-lg shadow-lg space-y-2 bg-white">
      <label className="flex justify-between items-center space-x-5">
        <span className="font-semibold">Horizon (années)</span>
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

      <label className="flex justify-between items-center">
        <span className="font-semibold">ROI (%)</span>
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

      <label className="flex justify-between items-center">
        <span className="font-semibold">Initial Capital (€)</span>
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

      <label className="flex justify-between items-center">
        <span className="font-semibold">Inflation (%)</span>
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

      <label className="flex justify-between items-center">
        <span className="font-semibold">Show Goal</span>
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
          className={fieldStyle}
        />
      </label>

      {showSalary && (
        <label className="flex justify-between items-center space-x-12">
          <span className="font-semibold">Monthly Net Salary</span>
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
      )}

      {showSalary && (
        <label className="flex justify-between items-center">
          <span className="font-semibold">Investing Rate (%)</span>
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
      )}

      {showIncreaseRate && (
        <label className="flex justify-between items-center">
          <span className="font-semibold">Salary Increase Rate (%)</span>
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
  );
}
