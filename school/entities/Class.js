const { EntitySchema } = require('typeorm')

// CLASS（班級）：無關聯
module.exports = new EntitySchema({
  name: 'Class',
  tableName: 'CLASS',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    name: { type: 'varchar', length: 50, nullable: false },
  },
})
