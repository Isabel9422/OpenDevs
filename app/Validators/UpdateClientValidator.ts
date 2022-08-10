import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}),
    description: schema.string.optional({}),
    founded: schema.number.optional(),
    url: schema.string.optional({}),
  })

  public messages: CustomMessages = {}
}
