const express = require('express')
const app = express()
const port = 8080

app.get('/api/users', (req, res) => {
  res
  .set('Access-Control-Allow-Origin', '*')
  .send(
      require('./data.json')
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
