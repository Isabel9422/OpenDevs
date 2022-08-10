import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ModalityJob } from '../../app/Models/Contracts/Enums/ModalityJob'

export default class extends BaseSchema {
  protected tableName = 'offers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.integer('experience_years')
      table.integer('price')
      table.enum('type', Object.values(ModalityJob))
      table.string('location')
      table.integer('client_id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
