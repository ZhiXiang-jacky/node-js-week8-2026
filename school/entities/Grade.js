const { EntitySchema } = require('typeorm')

// GRADE（成績）：student_id → STUDENT、subject_id → SUBJECT（皆必填）
module.exports = new EntitySchema({
  name: 'Grade',
  tableName: 'GRADE',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    score: { type: 'integer', nullable: false },
  },
  relations: {
    student: {
      type: 'many-to-one',
      target: 'Student',
      joinColumn: { name: 'student_id' },
      nullable: false,
    },
    subject: {
      type: 'many-to-one',
      target: 'Subject',
      joinColumn: { name: 'subject_id' },
      nullable: false,
    },
  },
})
