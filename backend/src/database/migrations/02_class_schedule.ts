import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary();
    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
    
    table.integer('classes_id')
      .notNullable()
      .references('id').inTable('classes')
      .onUpdate('CASCADE') // se id do usuario for alterado, todos seus dados são alterados
      .onDelete('CASCADE') // Se usuario for deletado, todos seus dados são deletados
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule')
}