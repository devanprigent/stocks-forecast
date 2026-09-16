import {
  InputType,
  ProjectionResult,
} from "../../schemas/performanceSchema.js";
import { STATUSES } from "../../utils/constants.js";

class Utils {
  static getGain(capital: number, roi: number, nbYears: number): number {
    return capital * (Math.pow(1 + roi, nbYears) - 1);
  }

  static getGains(capital: number, roi: number, yearAxis: number[]): number[] {
    return yearAxis.map((year) => this.getGain(capital, roi, year));
  }

  // Compute the future value of an investment with an annual deposit
  static getGainWithDeposit(
    capital: number,
    roi: number,
    nbYears: number,
    annualDeposit: number,
  ): number {
    if (roi === 0) {
      return capital + annualDeposit * nbYears;
    }

    const gainInitial = this.getGain(capital, roi, nbYears);
    const gainDeposit =
      this.getGain(annualDeposit, roi, nbYears) / roi - annualDeposit * nbYears;
    return gainInitial + gainDeposit;
  }

  static getGainsWithDeposit(
    capital: number,
    roi: number,
    yearAxis: number[],
    annualDeposit: number,
  ): number[] {
    return yearAxis.map((year, i) =>
      this.getGainWithDeposit(capital, roi, year, annualDeposit),
    );
  }

  // Compute the tax on the gain of an investment:
  static getTax(gain: number, taxRate: number): number {
    return gain * taxRate;
  }

  // Express a nominal future value in today's money: discount by elapsed years.
  static adjustForInflation(
    value: number,
    inflationRate: number,
    nbYears: number,
  ): number {
    return value / Math.pow(1 + inflationRate, nbYears);
  }
}

export class ComputePerformance {
  private input: InputType;
  private result: ProjectionResult[] = [];
  private status: STATUSES = STATUSES.CREATED;
  private yearAxis: number[] = [];

  public constructor(input: InputType) {
    this.input = input;
    this.yearAxis = Array.from({ length: input.years + 1 }, (_, i) => i);
  }

  public compute() {
    console.log("[ComputePerformance] start", this.input);

    this.computeNoInvestment();

    if (this.input.types.fixed_deposit) {
      console.log("[ComputePerformance] running fixed_deposit");
      this.computeFixedDeposit();
    }
    if (this.input.types.fixed_contributions) {
      console.log("[ComputePerformance] running fixed_contributions");
      this.computeFixedContributions();
    }

    if (this.input.types.growing_contributions) {
      console.log("[ComputePerformance] running growing_contributions");
      this.computeGrowingContributions();
    }

    if (this.input.options?.tax_rate != null) {
      console.log("[ComputePerformance] running tax", {
        tax_rate: this.input.options.tax_rate,
      });
      this.computeTax();
    }

    if (this.input.options?.inflation_rate != null) {
      console.log("[ComputePerformance] running inflation", {
        inflation_rate: this.input.options.inflation_rate,
      });
      this.computeInflation();
    }

    this.status = STATUSES.DONE;
    console.log("[ComputePerformance] done", {
      scenarios: this.result.length,
      types: this.result.map((r) => r.type),
    });
  }

  private computeNoInvestment() {
    const contributions = [];
    const gains = [];
    for (let i = 0; i <= this.input.years; i++) {
      contributions.push(this.input.capital);
      gains.push(0);
    }

    const newResult: ProjectionResult = {
      type: "no_investment",
      yearAxis: this.yearAxis,
      contributions: contributions,
      gains: gains,
      total: contributions,
    };

    this.result.push(newResult);
  }

  private computeFixedDeposit() {
    const contributions = [];
    for (let i = 0; i <= this.input.years; i++) {
      contributions.push(this.input.capital);
    }

    const gains = Utils.getGains(
      this.input.capital,
      this.input.roi,
      this.yearAxis,
    );

    const total = contributions.map(
      (contribution, index) => contribution + gains[index],
    );

    const newResult: ProjectionResult = {
      type: "fixed_deposit",
      yearAxis: this.yearAxis,
      contributions,
      gains,
      total,
    };
    this.result.push(newResult);
  }

  private computeFixedContributions() {
    const monthlySalary = this.input.params?.monthly_net_salary as number;
    const investingRate = this.input.params?.investing_rate as number;
    const annualDeposit = monthlySalary * investingRate * 12;

    const contributions = [];
    for (let i = 0; i <= this.input.years; i++) {
      contributions.push(this.input.capital + annualDeposit * this.yearAxis[i]);
    }

    const gains = Utils.getGainsWithDeposit(
      this.input.capital,
      this.input.roi,
      this.yearAxis,
      annualDeposit,
    );

    const total = contributions.map(
      (contribution, index) => contribution + gains[index],
    );

    const newResult: ProjectionResult = {
      type: "fixed_contributions",
      yearAxis: this.yearAxis,
      contributions,
      gains,
      total,
    };
    this.result.push(newResult);
  }

  private computeGrowingContributions() {
    const monthlySalary = this.input.params?.monthly_net_salary as number;
    const annualSalary = monthlySalary * 12;
    const salaryIncreaseRate = this.input.params
      ?.yearly_salary_increase as number;
    const annualSalaryIncreases = Utils.getGains(
      annualSalary,
      salaryIncreaseRate,
      this.yearAxis,
    );

    const investingRate = this.input.params?.investing_rate as number;
    const annualDeposits = annualSalaryIncreases.map(
      (increase) => (annualSalary + increase) * investingRate,
    );

    const contributions = [this.input.capital];
    for (let i = 1; i <= this.input.years; i++) {
      contributions.push(contributions[i - 1] + annualDeposits[i - 1]);
    }

    const gains: number[] = [0];
    let wealth = this.input.capital;
    for (let y = 1; y <= this.input.years; y++) {
      wealth = wealth * (1 + this.input.roi) + annualDeposits[y - 1];
      gains.push(wealth - contributions[y]);
    }

    const total = contributions.map(
      (contribution, index) => contribution + gains[index],
    );

    const newResult: ProjectionResult = {
      type: "growing_contributions",
      yearAxis: this.yearAxis,
      contributions,
      gains,
      total,
    };
    this.result.push(newResult);
  }

  private computeTax() {
    const taxRate = this.input.options?.tax_rate as number;

    this.result.forEach((scenario) => {
      const gains = scenario.gains;
      const taxes = gains.map((gain) => Utils.getTax(gain, taxRate));
      scenario.taxes = taxes;
      scenario.total = scenario.total.map((value, i) => value - taxes[i]);
    });
  }

  private computeInflation() {
    const inflationRate = this.input.options?.inflation_rate as number;

    this.result.forEach((scenario) => {
      scenario.total_inflation_adjusted = scenario.total.map((value, i) =>
        Utils.adjustForInflation(value, inflationRate, this.yearAxis[i]),
      );
    });
  }

  public getResult() {
    if (this.status !== STATUSES.DONE) {
      throw Error("Cannot retrieve results before execution");
    }
    return this.result;
  }
}
