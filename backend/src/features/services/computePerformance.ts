import {
  PerformanceType,
  Projection,
  ProjectionResult,
} from "../../schemas/performanceSchema.js";
import { STATUSES } from "../../utils/constants.js";

class Utils {
  // Compute the tax on the gain of an investment:
  static getTaxOnGain(gain: number, taxRate: number): number {
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

  // Compute the future value of an investment with a unique initial deposit.
  static futureValue(capital: number, roi: number, nbYears: number): number {
    return capital * Math.pow(1 + roi, nbYears);
  }

  // Compute the future values of an investment with a unique initial deposit.
  static futureValues(
    capital: number,
    roi: number,
    nbYears: number,
  ): Projection[] {
    const timeHorizons = Array.from({ length: nbYears + 1 }, (_, i) => i);
    return timeHorizons.map((year) => ({
      year,
      value: this.futureValue(capital, roi, year),
    }));
  }
}

export class ComputePerformance {
  private params: PerformanceType;
  private result: ProjectionResult[] = [];
  private status: STATUSES = STATUSES.CREATED;

  public constructor(params: PerformanceType) {
    this.params = params;
  }

  public compute() {
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

  private computeUniqueDeposit() {
    const projections = Utils.futureValues(
      this.params.capital,
      this.params.roi,
      this.params.years,
    );
    const newResult: ProjectionResult = {
      type: "fixed_deposit",
      raw: projections,
    };
    return newResult;
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
