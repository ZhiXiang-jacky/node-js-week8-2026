const { EntitySchema } = require('typeorm')

// SUBJECT（科目）：無關聯
module.exports = new EntitySchema({
  name: 'Subject',
  tableName: 'SUBJECT',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    name: { type: 'varchar', length: 50, nullable: false },
  },
})
