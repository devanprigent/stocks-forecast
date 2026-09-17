function getAnnualSpending(salary: number, investingRate: number) {
  return salary * (1 - investingRate / 100) * 12;
}

export function getFIREGoal(
  salary: number | undefined,
  investingRate: number | undefined,
) {
  if (!salary || !investingRate) {
    return 0;
  }
  return 25 * getAnnualSpending(salary, investingRate);
}
