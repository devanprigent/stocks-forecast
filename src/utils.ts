import { Projection } from "./types";

// Compute the tax on the gain of an investment:
export function getTaxOnGain(gain: number, taxRate: number): number {
  return gain * taxRate;
}

// Adjust a future value for inflation (real terms at horizon).
export function adjustForInflation(
  futureValue: number,
  inflationRate: number,
  nbYears: number
): number {
  return futureValue / Math.pow(1 + inflationRate, nbYears);
}

// Compute the future value of an investment with a unique initial deposit.
export function futureValue(
  capital: number,
  roi: number,
  nbYears: number
): number {
  return capital * Math.pow(1 + roi, nbYears);
}

// Compute the future values of an investment with a unique initial deposit.
export function futureValues(
  capital: number,
  roi: number,
  nbYears: number
): Projection[] {
  const timeHorizons = Array.from({ length: nbYears + 1 }, (_, i) => i);
  return timeHorizons.map((year) => ({
    year,
    value: futureValue(capital, roi, year),
  }));
}

// Compute the future value of an investment with a unique initial deposit and considering taxes.
export function investUniqueDeposit(
  capital: number,
  roi: number,
  nbYears: number,
  taxRate: number,
  inflationRate: number
) {
  const values_before_taxes = futureValues(capital, roi, nbYears);
  const gains = values_before_taxes.map((v) => v.value - capital);
  const taxes = gains.map((gain) => getTaxOnGain(gain, taxRate));
  const values_after_taxes = values_before_taxes.map((projection, idx) => {
    return {
      year: projection.year,
      value: projection.value - taxes[idx],
    };
  });
  const values_after_inflation = values_after_taxes.map((projection) => {
    return {
      year: projection.year,
      value: adjustForInflation(projection.value, inflationRate, nbYears),
    };
  });
  return values_after_inflation;
}

// Compute the future value of an investment with an annual deposit.
export function futureValueFixedCompounding(
  capital: number,
  roi: number,
  nbYears: number,
  annualDeposit: number
): number {
  const initialSumFutureValue = capital * Math.pow(1 + roi, nbYears);
  const depositsFutureValue =
    (annualDeposit * (Math.pow(1 + roi, nbYears) - 1)) / roi;
  return initialSumFutureValue + depositsFutureValue;
}

// Compute the future values of an investment with a fixed annual deposit.
export function futureValuesFixedCompounding(
  capital: number,
  roi: number,
  nbYears: number,
  annualDeposit: number
): Projection[] {
  const timeHorizons = Array.from({ length: nbYears + 1 }, (_, i) => i);
  return timeHorizons.map((year) => ({
    year,
    value: futureValueFixedCompounding(capital, roi, year, annualDeposit),
  }));
}

// Compute the future values of an investment with a fixed annual deposit and taxes.
export function investFixedDeposit(
  capital: number,
  roi: number,
  nbYears: number,
  taxRate: number,
  inflationRate: number,
  annualDeposit: number
): Projection[] {
  const values_before_taxes = futureValuesFixedCompounding(
    capital,
    roi,
    nbYears,
    annualDeposit
  );
  const timeHorizons = Array.from({ length: nbYears + 1 }, (_, i) => i);
  const deposits = timeHorizons.map((year) => capital + year * annualDeposit);
  const gains = values_before_taxes.map(
    (v, idx) => v.value - deposits[idx]
  );
  const taxes = gains.map((gain) => getTaxOnGain(gain, taxRate));
  const values_after_taxes = values_before_taxes.map((projection, idx) => {
    return {
      year: projection.year,
      value: projection.value - taxes[idx],
    };
  });
  const values_after_inflation = values_after_taxes.map((projection) => {
    return {
      year: projection.year,
      value: adjustForInflation(projection.value, inflationRate, nbYears),
    };
  });
  return values_after_inflation;
}

// Compute the future values of an investment with growing annual deposits.
export function futureValuesGrowingCompounding(
  capital: number,
  roi: number,
  nbYears: number,
  annualDeposits: number[]
): Projection[] {
  const timeHorizons = Array.from({ length: nbYears + 1 }, (_, i) => i);
  return timeHorizons.map((year) => ({
    year,
    value: futureValueFixedCompounding(
      capital,
      roi,
      year,
      annualDeposits[year]
    ),
  }));
}

// Compute the future values of an investment with growing annual deposits and taxes.
export function investGrowingDeposit(
  capital: number,
  roi: number,
  nbYears: number,
  taxRate: number,
  inflationRate: number,
  initialSalary: number,
  salaryIncreaseRate: number,
  investingRate: number
) {
  const timeHorizons = Array.from({ length: nbYears + 1 }, (_, i) => i);
  const yearlySalaries = timeHorizons.map(
    (year) => initialSalary * 12 * Math.pow(1 + salaryIncreaseRate, year)
  );
  const annualDeposits = timeHorizons.map((year) =>
    Math.floor(yearlySalaries[year] * investingRate)
  );
  const values_before_taxes = futureValuesGrowingCompounding(
    capital,
    roi,
    nbYears,
    annualDeposits
  );
  const deposits = [capital + annualDeposits[0]];
  for (let y = 1; y <= nbYears; y++) {
    deposits.push(deposits[y - 1] + annualDeposits[y]);
  }
  const gains = values_before_taxes.map(
    (v, idx) => v.value - deposits[idx]
  );
  const taxes = gains.map((gain) => getTaxOnGain(gain, taxRate));
  const values_after_taxes = values_before_taxes.map((projection, idx) => {
    return {
      year: projection.year,
      value: projection.value - taxes[idx],
    };
  });
  const values_after_inflation = values_after_taxes.map((projection) => {
    return {
      year: projection.year,
      value: adjustForInflation(projection.value, inflationRate, nbYears),
    };
  });
  return values_after_inflation;
}

export function goal(spendingPerMonth: number): number {
  return 25 * 12 * spendingPerMonth;
}
