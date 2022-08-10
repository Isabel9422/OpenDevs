import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModalityJob } from 'App/Models/Contracts/Enums/ModalityJob'

export default class UpdateOfferValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional({}),
    type: schema.enum.optional(Object.values(ModalityJob)),
    price: schema.number.optional(),
    experienceYears: schema.number.optional(),
    description: schema.string.optional({}),
    clientId: schema.number.optional(),
    location: schema.string.optional({}),
    technologies: schema.array.optional().members(schema.number()),
    languages: schema.array.optional().members(schema.number()),
  })

  public messages: CustomMessages = {}
}
