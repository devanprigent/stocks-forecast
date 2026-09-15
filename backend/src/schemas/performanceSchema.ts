import { z } from "zod";

export const performanceSchema = z
  .object({
    roi: z.number(),
    years: z.number(),
    capital: z.number(),

    types: z.object({
      fixed_deposit: z.boolean(),
      fixed_contributions: z.boolean(),
      growing_contributions: z.boolean(),
    }),

    params: z
      .object({
        monthly_net_salary: z.number().optional(),
        investing_rate: z.number().optional(),
        salary_increase: z.number().optional(),
      })
      .optional(),

    options: z
      .object({
        inflation: z.number().optional(),
        tax: z.number().optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.types.fixed_contributions || data.types.growing_contributions) &&
      data.params?.monthly_net_salary == null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["params", "monthly_net_salary"],
        message:
          "Required when fixed_contributions or growing_contributions are true",
      });
    }
    if (
      (data.types.fixed_contributions || data.types.growing_contributions) &&
      data.params?.investing_rate == null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["params", "investing_rate"],
        message:
          "Required when fixed_contributions or growing_contributions are true",
      });
    }
    if (
      data.types.growing_contributions &&
      data.params?.salary_increase == null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["params", "salary_increase"],
        message: "Required when growing_contributions is true",
      });
    }
  });

export type PerformanceType = z.infer<typeof performanceSchema>;

export type Projection = {
  year: number;
  value: number;
};

export type ProjectionType =
  | "fixed_deposit"
  | "fixed_contributions"
  | "growing_contributions";

export type ProjectionResult = {
  type: ProjectionType;
  raw: Projection[];
  after_taxes?: Projection[];
  after_inflation?: Projection[];
};
