import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import { ModalityJob } from './Contracts/Enums/ModalityJob'
import Technology from './Technology'
import Client from './Client'
import Language from './Language'
import User from './User'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @manyToMany(() => Technology, {
    pivotTable: 'offers_technologies',
    pivotTimestamps: true,
  })
  public technologies: ManyToMany<typeof Technology>

  @manyToMany(() => Language, {
    pivotTable: 'offers_languages',
    pivotTimestamps: true,
  })
  public languages: ManyToMany<typeof Language>

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column()
  public type: ModalityJob // Enum remote, on-site, hybrid

  @column()
  public experienceYears: number

  @column()
  public price: number

  @column()
  public clientId: number

  @column()
  public location: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static visibleTo = scope((query, user: User, client: Client) => {
    if (user.admin === true) {
      return
    }
    return query.where('client_id', client.id).where('client.id', user.clientId)
  })
}
