const { EntitySchema } = require('typeorm')

// USER（教練）：無關聯
module.exports = new EntitySchema({
  name: 'User',        // entity name（關聯 target、seed 都用這個）
  tableName: 'USER',   // 資料表名一律大寫
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    name: { type: 'varchar', length: 50, nullable: false },
    email: { type: 'varchar', length: 320, nullable: false, unique: true },
    role: { type: 'varchar', length: 20, nullable: false },
    created_at: { type: 'timestamp', createDate: true },
    updated_at: { type: 'timestamp', updateDate: true },
  },
})
