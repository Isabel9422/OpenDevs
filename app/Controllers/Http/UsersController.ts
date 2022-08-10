import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      return { token: token, data: auth.user }
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const user = await User.all()
    return response.json(user)
  }

  public async show({ params: { id }, response }: HttpContextContract) {
    try {
      const user = await User.findBy('id', id)
      return response.json(user)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateUserValidator)
    const user = await User.create(validateData)
    return response.created({ data: user })
  }

  public async update({ request, response }: HttpContextContract) {
    const user = await User.findByOrFail('id', request.params().id)
    const validateData = await request.validate(UpdateUserValidator)
    const isEmpty = Object.entries(validateData).length === 0
    if (isEmpty) {
      return response.badRequest()
    }
    await user.merge(validateData).save()
    return response.ok({ data: user })
  }

  public async destroy({ params: { id }, response }: HttpContextContract) {
    const user = await User.findByOrFail('id', id)
    await user.delete()
    return response.ok('User deleted')
  }
}
