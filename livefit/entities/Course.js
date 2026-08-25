const { EntitySchema } = require('typeorm')

// COURSE（課程）：user_id → USER、skill_id → SKILL
module.exports = new EntitySchema({
  name: 'Course',
  tableName: 'COURSE',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    name: { type: 'varchar', length: 100, nullable: false },
    description: { type: 'text', nullable: false },
    start_at: { type: 'timestamp', nullable: false },
    end_at: { type: 'timestamp', nullable: false },
    max_participants: { type: 'integer', nullable: false },
    created_at: { type: 'timestamp', createDate: true },
    updated_at: { type: 'timestamp', updateDate: true },
  },
  relations: {
    // target 用「entity name」（User / Skill），不是 tableName
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      nullable: false,
    },
    skill: {
      type: 'many-to-one',
      target: 'Skill',
      joinColumn: { name: 'skill_id' },
      nullable: false,
    },
  },
})
