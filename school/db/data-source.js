require('dotenv').config()
const { DataSource } = require('typeorm')

// ============================================================
// 註冊 entity：require 進來並加入 entities 陣列
// ============================================================
const Class = require('../entities/Class')
const Subject = require('../entities/Subject')
const Student = require('../entities/Student')
const Grade = require('../entities/Grade')

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5433),
  username: process.env.DB_USERNAME || 'student',
  password: process.env.DB_PASSWORD || 'student666',
  database: process.env.DB_DATABASE || 'school',

  // ⚠️ 鐵律：synchronize 固定為 false，結構一律走 Migration
  synchronize: false,

  entities: [Class, Subject, Student, Grade],
  migrations: ['db/migrations/*.js'],
})

module.exports = { dataSource }
