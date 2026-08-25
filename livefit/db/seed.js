/**
 * 任務 4：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require('./data-source')

/** 清空：被 FK 指著的表最後刪（先刪 COURSE，再 USER / SKILL）。 */
async function clearAll() {
  for (const name of ['Course', 'User', 'Skill']) {
    if (dataSource.hasMetadata(name)) {
      await dataSource.createQueryBuilder().delete().from(name).execute()
    }
  }
}

async function main() {
  await dataSource.initialize()
  await clearAll()

  const skillRepo = dataSource.getRepository('Skill')
  const userRepo = dataSource.getRepository('User')
  const courseRepo = dataSource.getRepository('Course')

  // 1. SKILL 三筆
  const [weightTraining, yoga, spinning] = await skillRepo.save([
    { name: '重訓' },
    { name: '瑜珈' },
    { name: '飛輪' },
  ])

  // 2. USER 兩位教練（role 都是 COACH）
  const [haggrid, meimei] = await userRepo.save([
    { name: '海格教練', email: 'coach1@livefit.tw', role: 'COACH' },
    { name: '小美教練', email: 'coach2@livefit.tw', role: 'COACH' },
  ])

  // 3. COURSE 四堂課（每堂接上教練 user 與技能 skill；TypeORM 會自動填外鍵 id）
  const now = new Date()
  const later = new Date(now.getTime() + 90 * 60 * 1000) // +90 分鐘
  await courseRepo.save([
    { name: '肌力入門班', description: '從零開始的肌力訓練', start_at: now, end_at: later, max_participants: 10, user: haggrid, skill: weightTraining },
    { name: '週末飛輪',   description: '高強度飛輪燃脂',     start_at: now, end_at: later, max_participants: 20, user: meimei,  skill: spinning },
    { name: '晨間瑜珈',   description: '喚醒身體的伸展',     start_at: now, end_at: later, max_participants: 15, user: meimei,  skill: yoga },
    { name: '核心特訓',   description: '強化核心肌群',       start_at: now, end_at: later, max_participants: 12, user: haggrid, skill: weightTraining },
  ])

  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
