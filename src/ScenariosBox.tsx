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
      <div className="text-center text-3xl">Scénarios</div>
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
          Investissement gelé
          <InfoIcon
            tooltip={
              "Si j'arrête d'investir mais que je garde mes investissements actuels, combien vont-ils me rapporter en 10, 15, 20 ans ?"
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
          Investissement fixe
          <InfoIcon
            tooltip={
              "Si je continue à investir autant pendant les 10, 15, 20 ans, combien vont-ils me rapporter ?"
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
          Investissement croissant
          <InfoIcon
            tooltip={
              "Si je continue à investir mais que je prends en compte mes augmentations de salaires futurs, combien vont-ils me rapporter ?"
            }
          />
        </span>
      </label>
    </div>
  );
}
