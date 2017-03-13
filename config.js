module.exports = {
  dbUrl: process.env.MONGODB_URI,
  numWorkers: process.env.WEB_CONCURRENCY || 2,
  port: process.env.PORT || 3000
}
