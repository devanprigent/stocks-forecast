export interface Projection {
  year: number;
  value: number;
}

export interface Dataset {
  id: number;
  label: string;
  data: Projection[];
}

export interface Parameters {
  years: number;
  roi: number;
  capital: number;
  inflationRate: number;
  showGoal: boolean;
  salary: number;
  investingRate: number;
  salaryIncreaseRate: number;
}
