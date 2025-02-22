import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../../null"
import { CompleteeconomicGroupDB, RelatedeconomicGroupDBModel } from "./index"

export const companyDBModel = z.object({
  id: z.number().int(),
  economicGroupId: z.number().int(),
  tradeName: z.string(),
  cnpj: z.string(),
  startValidity: z.date().nullish(),
  cutoffDate: z.number().int().nullish(),
  issuanceDate: z.number().int().nullish(),
  endValidity: z.date().nullish(),
  companyStatus: z.string(),
  name: z.string().nullish(),
  numberOfEmployees: z.number().int().nullish(),
  classification: z.string().nullish(),
  economicGroupDBId: z.number().int().nullish(),
})

export class companyDBDto extends createZodDto(companyDBModel) {
}

export interface CompletecompanyDB extends z.infer<typeof companyDBModel> {
  economicGroupDB?: CompleteeconomicGroupDB | null
}

/**
 * RelatedcompanyDBModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedcompanyDBModel: z.ZodSchema<CompletecompanyDB> = z.lazy(() => companyDBModel.extend({
  economicGroupDB: RelatedeconomicGroupDBModel.nullish(),
}))
