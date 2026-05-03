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

export function ScenariosBox({ callback }: Readonly<PropsType>) {
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newCheckboxes = { ...checkboxes, [name]: checked };
    setCheckboxes(newCheckboxes);
    callback(newCheckboxes);
  };

  return (
    <div className="flex flex-col p-4 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="text-center text-3xl">Scenarios</div>
      <br />
      <label className="mb-2">
        <span className="flex items-center">
          <input
            type="checkbox"
            name="option1"
            checked={checkboxes.option1}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Lump sum (no new contributions)
          <InfoIcon
            tooltip={
              "If I stop adding money but keep my current portfolio, how much will it be worth in 10, 15, or 20 years?"
            }
          />
        </span>
      </label>
      <label className="mb-2">
        <span className="flex items-center">
          <input
            type="checkbox"
            name="option2"
            checked={checkboxes.option2}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Fixed annual contributions
          <InfoIcon
            tooltip={
              "If I keep investing the same amount every year for 10, 15, or 20 years, how much will I have?"
            }
          />
        </span>
      </label>
      <label className="mb-2">
        <span className="flex items-center">
          <input
            type="checkbox"
            name="option3"
            checked={checkboxes.option3}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Growing contributions (salary raises)
          <InfoIcon
            tooltip={
              "If I keep investing and factor in future salary increases, how much will I have?"
            }
          />
        </span>
      </label>
    </div>
  );
}
