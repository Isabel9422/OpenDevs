import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Language from 'App/Models/Language'
import CreateLanguageValidator from 'App/Validators/CreateLanguageValidator'

export default class LanguagesController {
  public async index({ response }: HttpContextContract) {
    const languages = await Language.all()
    return response.json(languages)
  }

  public async show({ response, request }: HttpContextContract) {
    try {
      const language = await Language.findBy('id', request.params().id)
      return response.json(language)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateLanguageValidator)
    const language = await Language.create(validateData)
    return response.created({ data: language })
  }

  public async update({ request, response }: HttpContextContract) {
    const language = await Language.findByOrFail('id', request.params().id)
    await language.merge(request.all()).save()
    return response.ok({ data: language })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const language = await Language.findByOrFail('id', request.params().id)
    await language.delete()
    return response.ok('Language deleted')
  }
}
