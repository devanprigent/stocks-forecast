import {
  PerformanceType,
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
  private params: PerformanceType;
  private result: ProjectionResult[] = [];
  private status: STATUSES = STATUSES.CREATED;
  private yearAxis: number[] = [];

  public constructor(params: PerformanceType) {
    this.params = params;
    this.yearAxis = Array.from({ length: params.years + 1 }, (_, i) => i);
  }

  public compute() {
    this.computeNoInvestment();
    if (this.params.types.fixed_deposit) {
      this.computeUniqueDeposit();
    }
    if (this.params.types.fixed_contributions) {
      this.computeFixedDeposit();
    }
    if (this.params.types.growing_contributions) {
      this.computeGrowingDeposit();
    }
    this.status = STATUSES.DONE;
  }

  private computeNoInvestment() {
    const contributions = [];
    const gains = [];
    for (let i = 0; i < this.params.years; i++) {
      contributions.push(this.params.capital);
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
    for (let i = 0; i < this.params.years; i++) {
      contributions.push(this.params.capital);
    }

    const gains = Utils.getGains(
      this.params.capital,
      this.params.roi,
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

  private applyInflation() {}

  private applyTax() {}

  public getResult() {
    if (this.status !== STATUSES.DONE) {
      throw Error("Cannot retrieve results before execution");
    }
    return this.result;
  }
}
