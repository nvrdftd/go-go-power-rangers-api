module.exports = {
  dbUrl: process.env.MONGODB_URI || 'mongodb://gogoranger:gogoranger@ds129020-a0.mlab.com:29020,ds129020-a1.mlab.com:29020/heroku_z7d69h3g?replicaSet=rs-ds129020',
  numWorkers: process.env.WEB_CONCURRENCY || 2,
  port: process.env.PORT || 3000
}
