const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors({
  origin: `http://13.51.36.139/`
}))


const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})