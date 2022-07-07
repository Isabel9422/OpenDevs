import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModalityJob } from 'App/Models/Contracts/Enums/ModalityJob'

export default class CreateOfferValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}),
    type: schema.enum(Object.values(ModalityJob)),
    price: schema.number(),
    experienceYears: schema.number(),
    description: schema.string({}),
    clientId: schema.number(),
    location: schema.string({}),
    technologies: schema.array.optional().members(schema.number()),
    languages: schema.array.optional().members(schema.number()),
  })

  public messages: CustomMessages = {}
}
