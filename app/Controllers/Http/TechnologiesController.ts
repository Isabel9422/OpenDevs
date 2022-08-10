import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Technology from 'App/Models/Technology'
import CreateTechnologyValidator from 'App/Validators/CreateTechnologyValidator'
import UpdateTechnologyValidator from 'App/Validators/UpdateTechnologyValidator'

export default class TechnologiesController {
  public async index({ response }: HttpContextContract) {
    const technologies = await Technology.all()
    return response.json(technologies)
  }

  public async show({ response, request }: HttpContextContract) {
    try {
      const technology = await Technology.findBy('id', request.params().id)
      return response.json(technology)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateTechnologyValidator)
    const technology = await Technology.create(validateData)
    return response.created({ data: technology })
  }

  public async update({ request, response }: HttpContextContract) {
    const technology = await Technology.findByOrFail('id', request.params().id)
    const validateData = await request.validate(UpdateTechnologyValidator)
    const isEmpty = Object.entries(validateData).length === 0
    if (isEmpty) {
      return response.badRequest()
    }
    await technology.merge(validateData).save()
    return response.ok({ data: technology })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const technology = await Technology.findByOrFail('id', request.params().id)
    await technology.delete()
    return response.ok('Technology deleted')
  }
}
