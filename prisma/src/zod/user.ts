import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../../null"

export const UserModel = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string(),
})

export class UserDto extends createZodDto(UserModel) {
}
