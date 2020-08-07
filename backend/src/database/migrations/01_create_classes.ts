import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();
    
    table.integer('user_id')
      .notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE') // se id do usuario for alterado, todos seus dados são alterados
      .onDelete('CASCADE') // Se usuario for deletado, todos seus dados são deletados
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('classes')
}