require('dotenv').config()
const { DataSource } = require('typeorm')

// ============================================================
// 註冊 entity：require 進來並加入 entities 陣列
//（沒註冊的 entity，migration:generate 看不到它，資料表就不會被建出來）
// ============================================================
const User = require('../entities/User')
const Skill = require('../entities/Skill')
const Course = require('../entities/Course')

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'student',
  password: process.env.DB_PASSWORD || 'student666',
  database: process.env.DB_DATABASE || 'livefit',

  // ⚠️ 鐵律：synchronize 固定為 false，結構一律走 Migration
  synchronize: false,

  entities: [User, Skill, Course],
  migrations: ['db/migrations/*.js'],
})

module.exports = { dataSource }
