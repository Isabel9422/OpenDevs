import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import CreateClientValidator from 'App/Validators/CreateClientValidator'
import SortClientValidator from 'App/Validators/SortClientValidator'
import UpdateClientValidator from 'App/Validators/UpdateClientValidator'

export default class ClientsController {
  public async index({ response, request }: HttpContextContract) {
    const names = request.input('name') ?? null
    const descriptions = request.input('description') ?? null
    const founded = request.input('founded') ?? null
    const url = request.input('url') ?? null
    const datosvalidados = await request.validate(SortClientValidator)
    const sort = datosvalidados.sort || 'id'
    const order = datosvalidados.order || 'asc'

    const clients = await Client.query()
      .if(names, (query) => query.where('name', 'like', `%${names}%`))
      .if(descriptions, (query) => query.where('description', 'like', `%${descriptions}%`))
      .if(founded, (query) => query.where('founded', 'like', `%${founded}%`))
      .if(url, (query) => query.where('url', 'like', `%${url}%`))
      .orderBy(sort, order)
    response.ok({ data: clients })
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
    const validateData = await request.validate(UpdateClientValidator)
    const isEmpty = Object.entries(validateData).length === 0
    if (isEmpty) {
      return response.badRequest()
    }
    await client.merge(validateData).save()
    return response.ok({ data: client })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const client = await Client.findByOrFail('id', request.params().id)
    await client.delete()
    return response.ok('Client deleted')
  }
}
