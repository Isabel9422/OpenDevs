import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Offer from './Offer'
import User from './User'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public offer: Offer

  @column()
  public founded: number

  @column()
  public url: String

  @belongsTo(() => User)
  public client: BelongsTo<typeof User>

  @hasMany(() => Offer, { foreignKey: 'clientId' })
  public offers: HasMany<typeof Offer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
