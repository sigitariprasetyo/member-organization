const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routers/comment')
const PORT = process.env.PORT || 3000
const sequelize = require('./utils/database')
const Comment = require('./models/comment')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/orgs', router);

(async () => {
  try {
    await sequelize.sync({
      force: false
    })
    if (!module.parent) {
      app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
      })
    }
  } catch (error) {
    console.log(error);
  }
})();

module.exports = app