import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.group(() => {
  Route.resource('/users', 'UsersController').apiOnly()
  Route.post('/log', 'UsersController.login')
  Route.resource('/offers', 'OffersController').apiOnly()
  Route.resource('/technologies', 'TechnologiesController').apiOnly()
  Route.resource('/clients', 'ClientsController').apiOnly()
  Route.resource('/languages', 'LanguagesController').apiOnly()
}).prefix('/api')

Route.get('offers/', 'OffersController.index').middleware('auth')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
