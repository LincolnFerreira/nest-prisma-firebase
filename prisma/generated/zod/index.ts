import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name']);

export const EconomicGroupDBScalarFieldEnumSchema = z.enum(['id','cnpj','name','isUnifiedBoleto','feeFix']);

export const CompanyDBScalarFieldEnumSchema = z.enum(['id','economicGroupId','tradeName','cnpj','startValidity','cutoffDate','issuanceDate','endValidity','companyStatus','name','numberOfEmployees','classification','economicGroupDBId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ECONOMIC GROUP DB SCHEMA
/////////////////////////////////////////

export const economicGroupDBSchema = z.object({
  id: z.number().int(),
  cnpj: z.string(),
  name: z.string(),
  isUnifiedBoleto: z.string(),
  feeFix: z.number().int().nullable(),
})

export type economicGroupDB = z.infer<typeof economicGroupDBSchema>

/////////////////////////////////////////
// COMPANY DB SCHEMA
/////////////////////////////////////////

export const companyDBSchema = z.object({
  id: z.number().int(),
  economicGroupId: z.number().int(),
  tradeName: z.string(),
  cnpj: z.string(),
  startValidity: z.coerce.date().nullable(),
  cutoffDate: z.number().int().nullable(),
  issuanceDate: z.number().int().nullable(),
  endValidity: z.coerce.date().nullable(),
  companyStatus: z.string(),
  name: z.string().nullable(),
  numberOfEmployees: z.number().int().nullable(),
  classification: z.string().nullable(),
  economicGroupDBId: z.number().int().nullable(),
})

export type companyDB = z.infer<typeof companyDBSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

// ECONOMIC GROUP DB
//------------------------------------------------------

export const economicGroupDBIncludeSchema: z.ZodType<Prisma.economicGroupDBInclude> = z.object({
  companies: z.union([z.boolean(),z.lazy(() => companyDBFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EconomicGroupDBCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const economicGroupDBArgsSchema: z.ZodType<Prisma.economicGroupDBDefaultArgs> = z.object({
  select: z.lazy(() => economicGroupDBSelectSchema).optional(),
  include: z.lazy(() => economicGroupDBIncludeSchema).optional(),
}).strict();

export const economicGroupDBCountOutputTypeArgsSchema: z.ZodType<Prisma.economicGroupDBCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => economicGroupDBCountOutputTypeSelectSchema).nullish(),
}).strict();

export const economicGroupDBCountOutputTypeSelectSchema: z.ZodType<Prisma.economicGroupDBCountOutputTypeSelect> = z.object({
  companies: z.boolean().optional(),
}).strict();

export const economicGroupDBSelectSchema: z.ZodType<Prisma.economicGroupDBSelect> = z.object({
  id: z.boolean().optional(),
  cnpj: z.boolean().optional(),
  name: z.boolean().optional(),
  isUnifiedBoleto: z.boolean().optional(),
  feeFix: z.boolean().optional(),
  companies: z.union([z.boolean(),z.lazy(() => companyDBFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EconomicGroupDBCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMPANY DB
//------------------------------------------------------

export const companyDBIncludeSchema: z.ZodType<Prisma.companyDBInclude> = z.object({
  economicGroupDB: z.union([z.boolean(),z.lazy(() => economicGroupDBArgsSchema)]).optional(),
}).strict()

export const companyDBArgsSchema: z.ZodType<Prisma.companyDBDefaultArgs> = z.object({
  select: z.lazy(() => companyDBSelectSchema).optional(),
  include: z.lazy(() => companyDBIncludeSchema).optional(),
}).strict();

export const companyDBSelectSchema: z.ZodType<Prisma.companyDBSelect> = z.object({
  id: z.boolean().optional(),
  economicGroupId: z.boolean().optional(),
  tradeName: z.boolean().optional(),
  cnpj: z.boolean().optional(),
  startValidity: z.boolean().optional(),
  cutoffDate: z.boolean().optional(),
  issuanceDate: z.boolean().optional(),
  endValidity: z.boolean().optional(),
  companyStatus: z.boolean().optional(),
  name: z.boolean().optional(),
  numberOfEmployees: z.boolean().optional(),
  classification: z.boolean().optional(),
  economicGroupDBId: z.boolean().optional(),
  economicGroupDB: z.union([z.boolean(),z.lazy(() => economicGroupDBArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const economicGroupDBWhereInputSchema: z.ZodType<Prisma.economicGroupDBWhereInput> = z.object({
  AND: z.union([ z.lazy(() => economicGroupDBWhereInputSchema),z.lazy(() => economicGroupDBWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => economicGroupDBWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => economicGroupDBWhereInputSchema),z.lazy(() => economicGroupDBWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cnpj: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUnifiedBoleto: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feeFix: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  companies: z.lazy(() => CompanyDBListRelationFilterSchema).optional()
}).strict();

export const economicGroupDBOrderByWithRelationInputSchema: z.ZodType<Prisma.economicGroupDBOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUnifiedBoleto: z.lazy(() => SortOrderSchema).optional(),
  feeFix: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  companies: z.lazy(() => companyDBOrderByRelationAggregateInputSchema).optional()
}).strict();

export const economicGroupDBWhereUniqueInputSchema: z.ZodType<Prisma.economicGroupDBWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    cnpj: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    cnpj: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  cnpj: z.string().optional(),
  AND: z.union([ z.lazy(() => economicGroupDBWhereInputSchema),z.lazy(() => economicGroupDBWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => economicGroupDBWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => economicGroupDBWhereInputSchema),z.lazy(() => economicGroupDBWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUnifiedBoleto: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feeFix: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  companies: z.lazy(() => CompanyDBListRelationFilterSchema).optional()
}).strict());

export const economicGroupDBOrderByWithAggregationInputSchema: z.ZodType<Prisma.economicGroupDBOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUnifiedBoleto: z.lazy(() => SortOrderSchema).optional(),
  feeFix: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => economicGroupDBCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => economicGroupDBAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => economicGroupDBMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => economicGroupDBMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => economicGroupDBSumOrderByAggregateInputSchema).optional()
}).strict();

export const economicGroupDBScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.economicGroupDBScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => economicGroupDBScalarWhereWithAggregatesInputSchema),z.lazy(() => economicGroupDBScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => economicGroupDBScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => economicGroupDBScalarWhereWithAggregatesInputSchema),z.lazy(() => economicGroupDBScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cnpj: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isUnifiedBoleto: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  feeFix: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const companyDBWhereInputSchema: z.ZodType<Prisma.companyDBWhereInput> = z.object({
  AND: z.union([ z.lazy(() => companyDBWhereInputSchema),z.lazy(() => companyDBWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => companyDBWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => companyDBWhereInputSchema),z.lazy(() => companyDBWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  economicGroupId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tradeName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cnpj: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startValidity: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  cutoffDate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  issuanceDate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  endValidity: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  companyStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numberOfEmployees: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  classification: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  economicGroupDBId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  economicGroupDB: z.union([ z.lazy(() => EconomicGroupDBNullableRelationFilterSchema),z.lazy(() => economicGroupDBWhereInputSchema) ]).optional().nullable(),
}).strict();

export const companyDBOrderByWithRelationInputSchema: z.ZodType<Prisma.companyDBOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  economicGroupId: z.lazy(() => SortOrderSchema).optional(),
  tradeName: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  startValidity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cutoffDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  issuanceDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endValidity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  companyStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  numberOfEmployees: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  classification: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  economicGroupDBId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  economicGroupDB: z.lazy(() => economicGroupDBOrderByWithRelationInputSchema).optional()
}).strict();

export const companyDBWhereUniqueInputSchema: z.ZodType<Prisma.companyDBWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    cnpj: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    cnpj: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  cnpj: z.string().optional(),
  AND: z.union([ z.lazy(() => companyDBWhereInputSchema),z.lazy(() => companyDBWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => companyDBWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => companyDBWhereInputSchema),z.lazy(() => companyDBWhereInputSchema).array() ]).optional(),
  economicGroupId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  tradeName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startValidity: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  cutoffDate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  issuanceDate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  endValidity: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  companyStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numberOfEmployees: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  classification: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  economicGroupDBId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  economicGroupDB: z.union([ z.lazy(() => EconomicGroupDBNullableRelationFilterSchema),z.lazy(() => economicGroupDBWhereInputSchema) ]).optional().nullable(),
}).strict());

export const companyDBOrderByWithAggregationInputSchema: z.ZodType<Prisma.companyDBOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  economicGroupId: z.lazy(() => SortOrderSchema).optional(),
  tradeName: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  startValidity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cutoffDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  issuanceDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endValidity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  companyStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  numberOfEmployees: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  classification: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  economicGroupDBId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => companyDBCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => companyDBAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => companyDBMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => companyDBMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => companyDBSumOrderByAggregateInputSchema).optional()
}).strict();

export const companyDBScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.companyDBScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => companyDBScalarWhereWithAggregatesInputSchema),z.lazy(() => companyDBScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => companyDBScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => companyDBScalarWhereWithAggregatesInputSchema),z.lazy(() => companyDBScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  economicGroupId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  tradeName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  cnpj: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startValidity: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  cutoffDate: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  issuanceDate: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  endValidity: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  companyStatus: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  numberOfEmployees: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  classification: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  economicGroupDBId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  email: z.string(),
  name: z.string()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  name: z.string()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  email: z.string(),
  name: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const economicGroupDBCreateInputSchema: z.ZodType<Prisma.economicGroupDBCreateInput> = z.object({
  cnpj: z.string(),
  name: z.string(),
  isUnifiedBoleto: z.string(),
  feeFix: z.number().int().optional().nullable(),
  companies: z.lazy(() => companyDBCreateNestedManyWithoutEconomicGroupDBInputSchema).optional()
}).strict();

export const economicGroupDBUncheckedCreateInputSchema: z.ZodType<Prisma.economicGroupDBUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  cnpj: z.string(),
  name: z.string(),
  isUnifiedBoleto: z.string(),
  feeFix: z.number().int().optional().nullable(),
  companies: z.lazy(() => companyDBUncheckedCreateNestedManyWithoutEconomicGroupDBInputSchema).optional()
}).strict();

export const economicGroupDBUpdateInputSchema: z.ZodType<Prisma.economicGroupDBUpdateInput> = z.object({
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUnifiedBoleto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feeFix: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companies: z.lazy(() => companyDBUpdateManyWithoutEconomicGroupDBNestedInputSchema).optional()
}).strict();

export const economicGroupDBUncheckedUpdateInputSchema: z.ZodType<Prisma.economicGroupDBUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUnifiedBoleto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feeFix: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companies: z.lazy(() => companyDBUncheckedUpdateManyWithoutEconomicGroupDBNestedInputSchema).optional()
}).strict();

export const economicGroupDBCreateManyInputSchema: z.ZodType<Prisma.economicGroupDBCreateManyInput> = z.object({
  id: z.number().int().optional(),
  cnpj: z.string(),
  name: z.string(),
  isUnifiedBoleto: z.string(),
  feeFix: z.number().int().optional().nullable()
}).strict();

export const economicGroupDBUpdateManyMutationInputSchema: z.ZodType<Prisma.economicGroupDBUpdateManyMutationInput> = z.object({
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUnifiedBoleto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feeFix: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const economicGroupDBUncheckedUpdateManyInputSchema: z.ZodType<Prisma.economicGroupDBUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUnifiedBoleto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feeFix: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const companyDBCreateInputSchema: z.ZodType<Prisma.companyDBCreateInput> = z.object({
  economicGroupId: z.number().int(),
  tradeName: z.string(),
  cnpj: z.string(),
  startValidity: z.coerce.date().optional().nullable(),
  cutoffDate: z.number().int().optional().nullable(),
  issuanceDate: z.number().int().optional().nullable(),
  endValidity: z.coerce.date().optional().nullable(),
  companyStatus: z.string(),
  name: z.string().optional().nullable(),
  numberOfEmployees: z.number().int().optional().nullable(),
  classification: z.string().optional().nullable(),
  economicGroupDB: z.lazy(() => economicGroupDBCreateNestedOneWithoutCompaniesInputSchema).optional()
}).strict();

export const companyDBUncheckedCreateInputSchema: z.ZodType<Prisma.companyDBUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  economicGroupId: z.number().int(),
  tradeName: z.string(),
  cnpj: z.string(),
  startValidity: z.coerce.date().optional().nullable(),
  cutoffDate: z.number().int().optional().nullable(),
  issuanceDate: z.number().int().optional().nullable(),
  endValidity: z.coerce.date().optional().nullable(),
  companyStatus: z.string(),
  name: z.string().optional().nullable(),
  numberOfEmployees: z.number().int().optional().nullable(),
  classification: z.string().optional().nullable(),
  economicGroupDBId: z.number().int().optional().nullable()
}).strict();

export const companyDBUpdateInputSchema: z.ZodType<Prisma.companyDBUpdateInput> = z.object({
  economicGroupId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tradeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cutoffDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issuanceDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberOfEmployees: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  classification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  economicGroupDB: z.lazy(() => economicGroupDBUpdateOneWithoutCompaniesNestedInputSchema).optional()
}).strict();

export const companyDBUncheckedUpdateInputSchema: z.ZodType<Prisma.companyDBUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  economicGroupId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tradeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cutoffDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issuanceDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberOfEmployees: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  classification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  economicGroupDBId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const companyDBCreateManyInputSchema: z.ZodType<Prisma.companyDBCreateManyInput> = z.object({
  id: z.number().int().optional(),
  economicGroupId: z.number().int(),
  tradeName: z.string(),
  cnpj: z.string(),
  startValidity: z.coerce.date().optional().nullable(),
  cutoffDate: z.number().int().optional().nullable(),
  issuanceDate: z.number().int().optional().nullable(),
  endValidity: z.coerce.date().optional().nullable(),
  companyStatus: z.string(),
  name: z.string().optional().nullable(),
  numberOfEmployees: z.number().int().optional().nullable(),
  classification: z.string().optional().nullable(),
  economicGroupDBId: z.number().int().optional().nullable()
}).strict();

export const companyDBUpdateManyMutationInputSchema: z.ZodType<Prisma.companyDBUpdateManyMutationInput> = z.object({
  economicGroupId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tradeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cutoffDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issuanceDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberOfEmployees: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  classification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const companyDBUncheckedUpdateManyInputSchema: z.ZodType<Prisma.companyDBUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  economicGroupId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tradeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cutoffDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issuanceDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberOfEmployees: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  classification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  economicGroupDBId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CompanyDBListRelationFilterSchema: z.ZodType<Prisma.CompanyDBListRelationFilter> = z.object({
  every: z.lazy(() => companyDBWhereInputSchema).optional(),
  some: z.lazy(() => companyDBWhereInputSchema).optional(),
  none: z.lazy(() => companyDBWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const companyDBOrderByRelationAggregateInputSchema: z.ZodType<Prisma.companyDBOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const economicGroupDBCountOrderByAggregateInputSchema: z.ZodType<Prisma.economicGroupDBCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUnifiedBoleto: z.lazy(() => SortOrderSchema).optional(),
  feeFix: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const economicGroupDBAvgOrderByAggregateInputSchema: z.ZodType<Prisma.economicGroupDBAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feeFix: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const economicGroupDBMaxOrderByAggregateInputSchema: z.ZodType<Prisma.economicGroupDBMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUnifiedBoleto: z.lazy(() => SortOrderSchema).optional(),
  feeFix: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const economicGroupDBMinOrderByAggregateInputSchema: z.ZodType<Prisma.economicGroupDBMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isUnifiedBoleto: z.lazy(() => SortOrderSchema).optional(),
  feeFix: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const economicGroupDBSumOrderByAggregateInputSchema: z.ZodType<Prisma.economicGroupDBSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feeFix: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EconomicGroupDBNullableRelationFilterSchema: z.ZodType<Prisma.EconomicGroupDBNullableRelationFilter> = z.object({
  is: z.lazy(() => economicGroupDBWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => economicGroupDBWhereInputSchema).optional().nullable()
}).strict();

export const companyDBCountOrderByAggregateInputSchema: z.ZodType<Prisma.companyDBCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  economicGroupId: z.lazy(() => SortOrderSchema).optional(),
  tradeName: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  startValidity: z.lazy(() => SortOrderSchema).optional(),
  cutoffDate: z.lazy(() => SortOrderSchema).optional(),
  issuanceDate: z.lazy(() => SortOrderSchema).optional(),
  endValidity: z.lazy(() => SortOrderSchema).optional(),
  companyStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  numberOfEmployees: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  economicGroupDBId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const companyDBAvgOrderByAggregateInputSchema: z.ZodType<Prisma.companyDBAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  economicGroupId: z.lazy(() => SortOrderSchema).optional(),
  cutoffDate: z.lazy(() => SortOrderSchema).optional(),
  issuanceDate: z.lazy(() => SortOrderSchema).optional(),
  numberOfEmployees: z.lazy(() => SortOrderSchema).optional(),
  economicGroupDBId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const companyDBMaxOrderByAggregateInputSchema: z.ZodType<Prisma.companyDBMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  economicGroupId: z.lazy(() => SortOrderSchema).optional(),
  tradeName: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  startValidity: z.lazy(() => SortOrderSchema).optional(),
  cutoffDate: z.lazy(() => SortOrderSchema).optional(),
  issuanceDate: z.lazy(() => SortOrderSchema).optional(),
  endValidity: z.lazy(() => SortOrderSchema).optional(),
  companyStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  numberOfEmployees: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  economicGroupDBId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const companyDBMinOrderByAggregateInputSchema: z.ZodType<Prisma.companyDBMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  economicGroupId: z.lazy(() => SortOrderSchema).optional(),
  tradeName: z.lazy(() => SortOrderSchema).optional(),
  cnpj: z.lazy(() => SortOrderSchema).optional(),
  startValidity: z.lazy(() => SortOrderSchema).optional(),
  cutoffDate: z.lazy(() => SortOrderSchema).optional(),
  issuanceDate: z.lazy(() => SortOrderSchema).optional(),
  endValidity: z.lazy(() => SortOrderSchema).optional(),
  companyStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  numberOfEmployees: z.lazy(() => SortOrderSchema).optional(),
  classification: z.lazy(() => SortOrderSchema).optional(),
  economicGroupDBId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const companyDBSumOrderByAggregateInputSchema: z.ZodType<Prisma.companyDBSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  economicGroupId: z.lazy(() => SortOrderSchema).optional(),
  cutoffDate: z.lazy(() => SortOrderSchema).optional(),
  issuanceDate: z.lazy(() => SortOrderSchema).optional(),
  numberOfEmployees: z.lazy(() => SortOrderSchema).optional(),
  economicGroupDBId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const companyDBCreateNestedManyWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBCreateNestedManyWithoutEconomicGroupDBInput> = z.object({
  create: z.union([ z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema).array(),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  createMany: z.lazy(() => companyDBCreateManyEconomicGroupDBInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const companyDBUncheckedCreateNestedManyWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBUncheckedCreateNestedManyWithoutEconomicGroupDBInput> = z.object({
  create: z.union([ z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema).array(),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  createMany: z.lazy(() => companyDBCreateManyEconomicGroupDBInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const companyDBUpdateManyWithoutEconomicGroupDBNestedInputSchema: z.ZodType<Prisma.companyDBUpdateManyWithoutEconomicGroupDBNestedInput> = z.object({
  create: z.union([ z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema).array(),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => companyDBUpsertWithWhereUniqueWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUpsertWithWhereUniqueWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  createMany: z.lazy(() => companyDBCreateManyEconomicGroupDBInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => companyDBUpdateWithWhereUniqueWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUpdateWithWhereUniqueWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => companyDBUpdateManyWithWhereWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUpdateManyWithWhereWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => companyDBScalarWhereInputSchema),z.lazy(() => companyDBScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const companyDBUncheckedUpdateManyWithoutEconomicGroupDBNestedInputSchema: z.ZodType<Prisma.companyDBUncheckedUpdateManyWithoutEconomicGroupDBNestedInput> = z.object({
  create: z.union([ z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema).array(),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => companyDBUpsertWithWhereUniqueWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUpsertWithWhereUniqueWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  createMany: z.lazy(() => companyDBCreateManyEconomicGroupDBInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => companyDBWhereUniqueInputSchema),z.lazy(() => companyDBWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => companyDBUpdateWithWhereUniqueWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUpdateWithWhereUniqueWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => companyDBUpdateManyWithWhereWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUpdateManyWithWhereWithoutEconomicGroupDBInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => companyDBScalarWhereInputSchema),z.lazy(() => companyDBScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const economicGroupDBCreateNestedOneWithoutCompaniesInputSchema: z.ZodType<Prisma.economicGroupDBCreateNestedOneWithoutCompaniesInput> = z.object({
  create: z.union([ z.lazy(() => economicGroupDBCreateWithoutCompaniesInputSchema),z.lazy(() => economicGroupDBUncheckedCreateWithoutCompaniesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => economicGroupDBCreateOrConnectWithoutCompaniesInputSchema).optional(),
  connect: z.lazy(() => economicGroupDBWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const economicGroupDBUpdateOneWithoutCompaniesNestedInputSchema: z.ZodType<Prisma.economicGroupDBUpdateOneWithoutCompaniesNestedInput> = z.object({
  create: z.union([ z.lazy(() => economicGroupDBCreateWithoutCompaniesInputSchema),z.lazy(() => economicGroupDBUncheckedCreateWithoutCompaniesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => economicGroupDBCreateOrConnectWithoutCompaniesInputSchema).optional(),
  upsert: z.lazy(() => economicGroupDBUpsertWithoutCompaniesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => economicGroupDBWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => economicGroupDBWhereInputSchema) ]).optional(),
  connect: z.lazy(() => economicGroupDBWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => economicGroupDBUpdateToOneWithWhereWithoutCompaniesInputSchema),z.lazy(() => economicGroupDBUpdateWithoutCompaniesInputSchema),z.lazy(() => economicGroupDBUncheckedUpdateWithoutCompaniesInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const companyDBCreateWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBCreateWithoutEconomicGroupDBInput> = z.object({
  economicGroupId: z.number().int(),
  tradeName: z.string(),
  cnpj: z.string(),
  startValidity: z.coerce.date().optional().nullable(),
  cutoffDate: z.number().int().optional().nullable(),
  issuanceDate: z.number().int().optional().nullable(),
  endValidity: z.coerce.date().optional().nullable(),
  companyStatus: z.string(),
  name: z.string().optional().nullable(),
  numberOfEmployees: z.number().int().optional().nullable(),
  classification: z.string().optional().nullable()
}).strict();

export const companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBUncheckedCreateWithoutEconomicGroupDBInput> = z.object({
  id: z.number().int().optional(),
  economicGroupId: z.number().int(),
  tradeName: z.string(),
  cnpj: z.string(),
  startValidity: z.coerce.date().optional().nullable(),
  cutoffDate: z.number().int().optional().nullable(),
  issuanceDate: z.number().int().optional().nullable(),
  endValidity: z.coerce.date().optional().nullable(),
  companyStatus: z.string(),
  name: z.string().optional().nullable(),
  numberOfEmployees: z.number().int().optional().nullable(),
  classification: z.string().optional().nullable()
}).strict();

export const companyDBCreateOrConnectWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBCreateOrConnectWithoutEconomicGroupDBInput> = z.object({
  where: z.lazy(() => companyDBWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema) ]),
}).strict();

export const companyDBCreateManyEconomicGroupDBInputEnvelopeSchema: z.ZodType<Prisma.companyDBCreateManyEconomicGroupDBInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => companyDBCreateManyEconomicGroupDBInputSchema),z.lazy(() => companyDBCreateManyEconomicGroupDBInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const companyDBUpsertWithWhereUniqueWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBUpsertWithWhereUniqueWithoutEconomicGroupDBInput> = z.object({
  where: z.lazy(() => companyDBWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => companyDBUpdateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUncheckedUpdateWithoutEconomicGroupDBInputSchema) ]),
  create: z.union([ z.lazy(() => companyDBCreateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUncheckedCreateWithoutEconomicGroupDBInputSchema) ]),
}).strict();

export const companyDBUpdateWithWhereUniqueWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBUpdateWithWhereUniqueWithoutEconomicGroupDBInput> = z.object({
  where: z.lazy(() => companyDBWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => companyDBUpdateWithoutEconomicGroupDBInputSchema),z.lazy(() => companyDBUncheckedUpdateWithoutEconomicGroupDBInputSchema) ]),
}).strict();

export const companyDBUpdateManyWithWhereWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBUpdateManyWithWhereWithoutEconomicGroupDBInput> = z.object({
  where: z.lazy(() => companyDBScalarWhereInputSchema),
  data: z.union([ z.lazy(() => companyDBUpdateManyMutationInputSchema),z.lazy(() => companyDBUncheckedUpdateManyWithoutEconomicGroupDBInputSchema) ]),
}).strict();

export const companyDBScalarWhereInputSchema: z.ZodType<Prisma.companyDBScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => companyDBScalarWhereInputSchema),z.lazy(() => companyDBScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => companyDBScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => companyDBScalarWhereInputSchema),z.lazy(() => companyDBScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  economicGroupId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tradeName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cnpj: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startValidity: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  cutoffDate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  issuanceDate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  endValidity: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  companyStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numberOfEmployees: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  classification: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  economicGroupDBId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const economicGroupDBCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.economicGroupDBCreateWithoutCompaniesInput> = z.object({
  cnpj: z.string(),
  name: z.string(),
  isUnifiedBoleto: z.string(),
  feeFix: z.number().int().optional().nullable()
}).strict();

export const economicGroupDBUncheckedCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.economicGroupDBUncheckedCreateWithoutCompaniesInput> = z.object({
  id: z.number().int().optional(),
  cnpj: z.string(),
  name: z.string(),
  isUnifiedBoleto: z.string(),
  feeFix: z.number().int().optional().nullable()
}).strict();

export const economicGroupDBCreateOrConnectWithoutCompaniesInputSchema: z.ZodType<Prisma.economicGroupDBCreateOrConnectWithoutCompaniesInput> = z.object({
  where: z.lazy(() => economicGroupDBWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => economicGroupDBCreateWithoutCompaniesInputSchema),z.lazy(() => economicGroupDBUncheckedCreateWithoutCompaniesInputSchema) ]),
}).strict();

export const economicGroupDBUpsertWithoutCompaniesInputSchema: z.ZodType<Prisma.economicGroupDBUpsertWithoutCompaniesInput> = z.object({
  update: z.union([ z.lazy(() => economicGroupDBUpdateWithoutCompaniesInputSchema),z.lazy(() => economicGroupDBUncheckedUpdateWithoutCompaniesInputSchema) ]),
  create: z.union([ z.lazy(() => economicGroupDBCreateWithoutCompaniesInputSchema),z.lazy(() => economicGroupDBUncheckedCreateWithoutCompaniesInputSchema) ]),
  where: z.lazy(() => economicGroupDBWhereInputSchema).optional()
}).strict();

export const economicGroupDBUpdateToOneWithWhereWithoutCompaniesInputSchema: z.ZodType<Prisma.economicGroupDBUpdateToOneWithWhereWithoutCompaniesInput> = z.object({
  where: z.lazy(() => economicGroupDBWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => economicGroupDBUpdateWithoutCompaniesInputSchema),z.lazy(() => economicGroupDBUncheckedUpdateWithoutCompaniesInputSchema) ]),
}).strict();

export const economicGroupDBUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.economicGroupDBUpdateWithoutCompaniesInput> = z.object({
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUnifiedBoleto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feeFix: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const economicGroupDBUncheckedUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.economicGroupDBUncheckedUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUnifiedBoleto: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feeFix: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const companyDBCreateManyEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBCreateManyEconomicGroupDBInput> = z.object({
  id: z.number().int().optional(),
  economicGroupId: z.number().int(),
  tradeName: z.string(),
  cnpj: z.string(),
  startValidity: z.coerce.date().optional().nullable(),
  cutoffDate: z.number().int().optional().nullable(),
  issuanceDate: z.number().int().optional().nullable(),
  endValidity: z.coerce.date().optional().nullable(),
  companyStatus: z.string(),
  name: z.string().optional().nullable(),
  numberOfEmployees: z.number().int().optional().nullable(),
  classification: z.string().optional().nullable()
}).strict();

export const companyDBUpdateWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBUpdateWithoutEconomicGroupDBInput> = z.object({
  economicGroupId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tradeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cutoffDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issuanceDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberOfEmployees: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  classification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const companyDBUncheckedUpdateWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBUncheckedUpdateWithoutEconomicGroupDBInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  economicGroupId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tradeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cutoffDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issuanceDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberOfEmployees: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  classification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const companyDBUncheckedUpdateManyWithoutEconomicGroupDBInputSchema: z.ZodType<Prisma.companyDBUncheckedUpdateManyWithoutEconomicGroupDBInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  economicGroupId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tradeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cnpj: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cutoffDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issuanceDate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endValidity: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numberOfEmployees: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  classification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const economicGroupDBFindFirstArgsSchema: z.ZodType<Prisma.economicGroupDBFindFirstArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  where: economicGroupDBWhereInputSchema.optional(),
  orderBy: z.union([ economicGroupDBOrderByWithRelationInputSchema.array(),economicGroupDBOrderByWithRelationInputSchema ]).optional(),
  cursor: economicGroupDBWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EconomicGroupDBScalarFieldEnumSchema,EconomicGroupDBScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const economicGroupDBFindFirstOrThrowArgsSchema: z.ZodType<Prisma.economicGroupDBFindFirstOrThrowArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  where: economicGroupDBWhereInputSchema.optional(),
  orderBy: z.union([ economicGroupDBOrderByWithRelationInputSchema.array(),economicGroupDBOrderByWithRelationInputSchema ]).optional(),
  cursor: economicGroupDBWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EconomicGroupDBScalarFieldEnumSchema,EconomicGroupDBScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const economicGroupDBFindManyArgsSchema: z.ZodType<Prisma.economicGroupDBFindManyArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  where: economicGroupDBWhereInputSchema.optional(),
  orderBy: z.union([ economicGroupDBOrderByWithRelationInputSchema.array(),economicGroupDBOrderByWithRelationInputSchema ]).optional(),
  cursor: economicGroupDBWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EconomicGroupDBScalarFieldEnumSchema,EconomicGroupDBScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const economicGroupDBAggregateArgsSchema: z.ZodType<Prisma.economicGroupDBAggregateArgs> = z.object({
  where: economicGroupDBWhereInputSchema.optional(),
  orderBy: z.union([ economicGroupDBOrderByWithRelationInputSchema.array(),economicGroupDBOrderByWithRelationInputSchema ]).optional(),
  cursor: economicGroupDBWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const economicGroupDBGroupByArgsSchema: z.ZodType<Prisma.economicGroupDBGroupByArgs> = z.object({
  where: economicGroupDBWhereInputSchema.optional(),
  orderBy: z.union([ economicGroupDBOrderByWithAggregationInputSchema.array(),economicGroupDBOrderByWithAggregationInputSchema ]).optional(),
  by: EconomicGroupDBScalarFieldEnumSchema.array(),
  having: economicGroupDBScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const economicGroupDBFindUniqueArgsSchema: z.ZodType<Prisma.economicGroupDBFindUniqueArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  where: economicGroupDBWhereUniqueInputSchema,
}).strict() ;

export const economicGroupDBFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.economicGroupDBFindUniqueOrThrowArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  where: economicGroupDBWhereUniqueInputSchema,
}).strict() ;

export const companyDBFindFirstArgsSchema: z.ZodType<Prisma.companyDBFindFirstArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  where: companyDBWhereInputSchema.optional(),
  orderBy: z.union([ companyDBOrderByWithRelationInputSchema.array(),companyDBOrderByWithRelationInputSchema ]).optional(),
  cursor: companyDBWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyDBScalarFieldEnumSchema,CompanyDBScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const companyDBFindFirstOrThrowArgsSchema: z.ZodType<Prisma.companyDBFindFirstOrThrowArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  where: companyDBWhereInputSchema.optional(),
  orderBy: z.union([ companyDBOrderByWithRelationInputSchema.array(),companyDBOrderByWithRelationInputSchema ]).optional(),
  cursor: companyDBWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyDBScalarFieldEnumSchema,CompanyDBScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const companyDBFindManyArgsSchema: z.ZodType<Prisma.companyDBFindManyArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  where: companyDBWhereInputSchema.optional(),
  orderBy: z.union([ companyDBOrderByWithRelationInputSchema.array(),companyDBOrderByWithRelationInputSchema ]).optional(),
  cursor: companyDBWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyDBScalarFieldEnumSchema,CompanyDBScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const companyDBAggregateArgsSchema: z.ZodType<Prisma.companyDBAggregateArgs> = z.object({
  where: companyDBWhereInputSchema.optional(),
  orderBy: z.union([ companyDBOrderByWithRelationInputSchema.array(),companyDBOrderByWithRelationInputSchema ]).optional(),
  cursor: companyDBWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const companyDBGroupByArgsSchema: z.ZodType<Prisma.companyDBGroupByArgs> = z.object({
  where: companyDBWhereInputSchema.optional(),
  orderBy: z.union([ companyDBOrderByWithAggregationInputSchema.array(),companyDBOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyDBScalarFieldEnumSchema.array(),
  having: companyDBScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const companyDBFindUniqueArgsSchema: z.ZodType<Prisma.companyDBFindUniqueArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  where: companyDBWhereUniqueInputSchema,
}).strict() ;

export const companyDBFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.companyDBFindUniqueOrThrowArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  where: companyDBWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const economicGroupDBCreateArgsSchema: z.ZodType<Prisma.economicGroupDBCreateArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  data: z.union([ economicGroupDBCreateInputSchema,economicGroupDBUncheckedCreateInputSchema ]),
}).strict() ;

export const economicGroupDBUpsertArgsSchema: z.ZodType<Prisma.economicGroupDBUpsertArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  where: economicGroupDBWhereUniqueInputSchema,
  create: z.union([ economicGroupDBCreateInputSchema,economicGroupDBUncheckedCreateInputSchema ]),
  update: z.union([ economicGroupDBUpdateInputSchema,economicGroupDBUncheckedUpdateInputSchema ]),
}).strict() ;

export const economicGroupDBCreateManyArgsSchema: z.ZodType<Prisma.economicGroupDBCreateManyArgs> = z.object({
  data: z.union([ economicGroupDBCreateManyInputSchema,economicGroupDBCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const economicGroupDBCreateManyAndReturnArgsSchema: z.ZodType<Prisma.economicGroupDBCreateManyAndReturnArgs> = z.object({
  data: z.union([ economicGroupDBCreateManyInputSchema,economicGroupDBCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const economicGroupDBDeleteArgsSchema: z.ZodType<Prisma.economicGroupDBDeleteArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  where: economicGroupDBWhereUniqueInputSchema,
}).strict() ;

export const economicGroupDBUpdateArgsSchema: z.ZodType<Prisma.economicGroupDBUpdateArgs> = z.object({
  select: economicGroupDBSelectSchema.optional(),
  include: economicGroupDBIncludeSchema.optional(),
  data: z.union([ economicGroupDBUpdateInputSchema,economicGroupDBUncheckedUpdateInputSchema ]),
  where: economicGroupDBWhereUniqueInputSchema,
}).strict() ;

export const economicGroupDBUpdateManyArgsSchema: z.ZodType<Prisma.economicGroupDBUpdateManyArgs> = z.object({
  data: z.union([ economicGroupDBUpdateManyMutationInputSchema,economicGroupDBUncheckedUpdateManyInputSchema ]),
  where: economicGroupDBWhereInputSchema.optional(),
}).strict() ;

export const economicGroupDBDeleteManyArgsSchema: z.ZodType<Prisma.economicGroupDBDeleteManyArgs> = z.object({
  where: economicGroupDBWhereInputSchema.optional(),
}).strict() ;

export const companyDBCreateArgsSchema: z.ZodType<Prisma.companyDBCreateArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  data: z.union([ companyDBCreateInputSchema,companyDBUncheckedCreateInputSchema ]),
}).strict() ;

export const companyDBUpsertArgsSchema: z.ZodType<Prisma.companyDBUpsertArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  where: companyDBWhereUniqueInputSchema,
  create: z.union([ companyDBCreateInputSchema,companyDBUncheckedCreateInputSchema ]),
  update: z.union([ companyDBUpdateInputSchema,companyDBUncheckedUpdateInputSchema ]),
}).strict() ;

export const companyDBCreateManyArgsSchema: z.ZodType<Prisma.companyDBCreateManyArgs> = z.object({
  data: z.union([ companyDBCreateManyInputSchema,companyDBCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const companyDBCreateManyAndReturnArgsSchema: z.ZodType<Prisma.companyDBCreateManyAndReturnArgs> = z.object({
  data: z.union([ companyDBCreateManyInputSchema,companyDBCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const companyDBDeleteArgsSchema: z.ZodType<Prisma.companyDBDeleteArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  where: companyDBWhereUniqueInputSchema,
}).strict() ;

export const companyDBUpdateArgsSchema: z.ZodType<Prisma.companyDBUpdateArgs> = z.object({
  select: companyDBSelectSchema.optional(),
  include: companyDBIncludeSchema.optional(),
  data: z.union([ companyDBUpdateInputSchema,companyDBUncheckedUpdateInputSchema ]),
  where: companyDBWhereUniqueInputSchema,
}).strict() ;

export const companyDBUpdateManyArgsSchema: z.ZodType<Prisma.companyDBUpdateManyArgs> = z.object({
  data: z.union([ companyDBUpdateManyMutationInputSchema,companyDBUncheckedUpdateManyInputSchema ]),
  where: companyDBWhereInputSchema.optional(),
}).strict() ;

export const companyDBDeleteManyArgsSchema: z.ZodType<Prisma.companyDBDeleteManyArgs> = z.object({
  where: companyDBWhereInputSchema.optional(),
}).strict() ;