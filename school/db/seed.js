/**
 * 任務 5：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require('./data-source')

/** 清空：被 FK 指著的表最後刪（先刪 Grade，再 Student，最後 Class / Subject）。 */
async function clearAll() {
  const ORDER = ['Grade', 'Student', 'Class', 'Subject']
  for (const name of ORDER) {
    if (dataSource.hasMetadata(name)) {
      await dataSource.createQueryBuilder().delete().from(name).execute()
    }
  }
}

async function main() {
  await dataSource.initialize()
  await clearAll()

  const classRepo = dataSource.getRepository('Class')
  const subjectRepo = dataSource.getRepository('Subject')
  const studentRepo = dataSource.getRepository('Student')
  const gradeRepo = dataSource.getRepository('Grade')

  // 1. 先種 CLASS / SUBJECT
  const [classA, classB] = await classRepo.save([
    { name: '一年一班' },
    { name: '一年二班' },
  ])
  const [math, english] = await subjectRepo.save([
    { name: '數學' },
    { name: '英文' },
  ])

  // 2. 再種 STUDENT（接上 class）
  const [amy, ben, cindy] = await studentRepo.save([
    { name: '小美', class: classA },
    { name: '阿賢', class: classA },
    { name: '婷婷', class: classB },
  ])

  // 3. 最後種 GRADE（接上 student + subject）
  await gradeRepo.save([
    { score: 95, student: amy,   subject: math },
    { score: 88, student: amy,   subject: english },
    { score: 76, student: ben,   subject: math },
    { score: 90, student: cindy, subject: english },
  ])

  console.log('🌱 seed 完成')
  await dataSource.destroy()
}

main().catch((e) => { console.error('seed 失敗：', e.message); process.exit(1) })
