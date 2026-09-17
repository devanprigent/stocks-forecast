import { z } from "zod";
import { PROJECTION_TYPES } from "./constants";

export const inputSchema = z
  .object({
    roi: z.number(),
    years: z.number(),
    capital: z.number(),

    types: z.object({
      no_investment: z.boolean(),
      fixed_deposit: z.boolean(),
      fixed_contributions: z.boolean(),
      growing_contributions: z.boolean(),
    }),

    params: z
      .object({
        monthly_net_salary: z.number().optional(),
        investing_rate: z.number().optional(),
        yearly_salary_increase: z.number().optional(),
      })
      .optional(),

    options: z
      .object({
        inflation_rate: z.number().optional(),
        tax_rate: z.number().optional(),
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
      data.params?.yearly_salary_increase == null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["params", "yearly_salary_increase"],
        message: "Required when growing_contributions is true",
      });
    }
  });

export type InputType = z.infer<typeof inputSchema>;

const ProjectionTypeSchema = z.enum([
  PROJECTION_TYPES.NO_INVESTMENT,
  PROJECTION_TYPES.FIXED_DEPOSIT,
  PROJECTION_TYPES.FIXED_CONTRIBUTION,
  PROJECTION_TYPES.GROWING_CONTRIBUTION,
]);

export type ProjectionType = z.infer<typeof ProjectionTypeSchema>;

export const ProjectionUnitSchema = z.object({
  type: ProjectionTypeSchema,
  label: z.string(),
  year_axis: z.array(z.number()),
  contributions: z.array(z.number()),
  gains: z.array(z.number()),
  taxes: z.array(z.number()).optional(),
  total: z.array(z.number()),
  total_inflation_adjusted: z.array(z.number()).optional(),
});

export const ProjectionResultSchema = z.array(ProjectionUnitSchema);

export type ProjectionUnit = z.infer<typeof ProjectionUnitSchema>;
export type ProjectionResult = z.infer<typeof ProjectionResultSchema>;
