import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Offer from 'App/Models/Offer'
import CreateOfferValidator from 'App/Validators/CreateOfferValidator'
import SortOfferValidator from 'App/Validators/SortOfferValidator'

export default class OffersController {
  public async index({ response, request, auth }: HttpContextContract) {
    const title = request.input('title') ?? null
    const experienceYears = request.input('experience_years') ?? null
    const type = request.input('type') ?? null
    const price = request.input('price') ?? null
    const client = request.input('clientId') ?? null
    const location = request.input('location') ?? null
    const datosvalidados = await request.validate(SortOfferValidator)
    const sort = datosvalidados.sort || 'id'
    const order = datosvalidados.order || 'asc'

    const offers = await Offer.query()
      .withScopes((scopes) => {
        if (auth.user) scopes.visibleTo(auth.user)
      })
      .if(title, (query) => query.where('title', 'like', `%${title}%`))
      .if(experienceYears, (query) => query.where('experience_years', '<=', experienceYears))
      .if(type, (query) => query.where('type', type))
      .if(price, (query) => query.where('price', '>=', price))
      .if(client, (query) => query.where('client_id', client))
      .if(location, (query) => query.where('location', 'like', `%${location}%`))
      .orderBy(sort, order)
    response.ok({ data: offers })
  }

  public async show({ params: { id }, response }: HttpContextContract) {
    try {
      const offers = await Offer.query()
        .where('id', id)
        .preload('technologies')
        .preload('client')
        .preload('languages')
        .firstOrFail()
      return response.json(offers)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateOfferValidator)
    const offer = await Offer.create(validateData)

    if (validateData.technologies) {
      console.log('Hey !')
      await offer.related('technologies').sync(validateData.technologies)
      if (validateData.languages) {
        await offer.related('languages').sync(validateData.languages)
      }
    }
    await offer.save()
    return response.created({ data: offer })
  }

  public async update({ params: { id }, response, request }: HttpContextContract) {
    const offer = await Offer.findByOrFail('id', id)
    await offer.merge(request.all()).save()
    return response.ok({ data: offer })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const offer = await Offer.findByOrFail('id', request.params().id)
    await offer.delete()
    return response.ok('Offer deleted')
  }
}
