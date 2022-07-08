import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Offer from 'App/Models/Offer'
import CreateOfferValidator from 'App/Validators/CreateOfferValidator'

export default class OffersController {
  public async index({ response }: HttpContextContract) {
    const offer = await Offer.all()
    return response.json(offer)
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

  public async OU({ response }: HttpContextContract) {
    const ofus = await Offer.query().apply((scopes) => scopes.visibleTo())
    return response.json(ofus)
  }

  public async filters({ response, params: { experienceYears } }: HttpContextContract) {
    return Offer.query().where('experience_years', experienceYears).firstOrFail()
  }
}
