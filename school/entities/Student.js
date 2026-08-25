const { EntitySchema } = require('typeorm')

// STUDENT（學生）：class_id → CLASS（必填）
module.exports = new EntitySchema({
  name: 'Student',
  tableName: 'STUDENT',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    name: { type: 'varchar', length: 50, nullable: false },
  },
  relations: {
    class: {
      type: 'many-to-one',
      target: 'Class',
      joinColumn: { name: 'class_id' },
      nullable: false,
    },
  },
})
