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

  // Compute the tax on the gain of an investment:
  static getTax(gain: number, taxRate: number): number {
    return gain * taxRate;
  }

  // Express a nominal future value in today's money: discount by elapsed years.
  static adjustForInflation(
    futureValue: number,
    inflationRate: number,
    elapsedYears: number,
  ): number {
    return futureValue / Math.pow(1 + inflationRate, elapsedYears);
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
    console.log("[ComputePerformance] start", {
      capital: this.input.capital,
      roi: this.input.roi,
      years: this.input.years,
      types: this.input.types,
      options: this.input.options,
    });

    this.computeNoInvestment();

    if (this.input.types.fixed_deposit) {
      console.log("[ComputePerformance] running fixed_deposit");
      this.computeUniqueDeposit();
    }
    if (this.input.types.fixed_contributions) {
      console.log("[ComputePerformance] running fixed_contributions");
      this.computeFixedDeposit();
    }

    if (this.input.types.growing_contributions) {
      console.log("[ComputePerformance] running growing_contributions");
      this.computeGrowingDeposit();
    }

    if (this.input.options?.tax_rate != null) {
      console.log("[ComputePerformance] running tax", {
        tax_rate: this.input.options.tax_rate,
      });
      this.computeTax();
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
    for (let i = 0; i < this.input.years; i++) {
      contributions.push(this.input.capital);
      gains.push(0);
    }

    const newResult: ProjectionResult = {
      type: "fixed_deposit",
      yearAxis: this.yearAxis,
      contributions: contributions,
      gains: gains,
      total: contributions,
    };

    this.result.push(newResult);
  }

  private computeUniqueDeposit() {
    const contributions = [];
    for (let i = 0; i < this.input.years; i++) {
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

  private computeFixedDeposit() {}

  private computeGrowingDeposit() {}

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
    console.log("[ComputePerformance] inflation: not implemented yet");
  }

  public getResult() {
    if (this.status !== STATUSES.DONE) {
      throw Error("Cannot retrieve results before execution");
    }
    return this.result;
  }
}
