import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../../null"
import { CompletecompanyDB, RelatedcompanyDBModel } from "./index"

export const economicGroupDBModel = z.object({
  id: z.number().int(),
  cnpj: z.string(),
  name: z.string(),
  isUnifiedBoleto: z.string(),
  feeFix: z.number().int().nullish(),
})

export class economicGroupDBDto extends createZodDto(economicGroupDBModel) {
}

export interface CompleteeconomicGroupDB extends z.infer<typeof economicGroupDBModel> {
  companies: CompletecompanyDB[]
}

/**
 * RelatedeconomicGroupDBModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedeconomicGroupDBModel: z.ZodSchema<CompleteeconomicGroupDB> = z.lazy(() => economicGroupDBModel.extend({
  companies: RelatedcompanyDBModel.array(),
}))
