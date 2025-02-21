import { z } from 'zod';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
const CreateUserSchema = extendApi(
  z.object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório')
      .max(100, 'O nome é muito longo'),
    email: z.string().email('E-mail inválido'),
  }),
  {
    description: 'Criação de um novo usuário',
    examples: [{ name: 'John Doe', email: 'john@example.com' }],
  },
);

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
