import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import CreateClientValidator from 'App/Validators/CreateClientValidator'

export default class ClientsController {
  public async index({ response }: HttpContextContract) {
    const clients = await Client.all()
    return response.json(clients)
  }

  public async show({ params: { id }, response }: HttpContextContract) {
    try {
      const client = await Client.query().where('id', id).preload('offers').firstOrFail()
      return response.json(client)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateClientValidator)
    const client = await Client.create(validateData)
    return response.created({ data: client })
  }

  public async update({ request, response }: HttpContextContract) {
    const client = await Client.findByOrFail('id', request.params().id)
    await client.merge(request.all()).save()
    return response.ok({ data: client })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const client = await Client.findByOrFail('id', request.params().id)
    await client.delete()
    return response.ok('Client deleted')
  }
}
