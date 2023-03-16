const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors({
  // origin: `http://13.51.36.139/`
  origin: true,
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'PATCH'],
  credentials: true
}))


const port = 3001

app.get('/', (req, res) => {
  res.send('This application is under development');
})

app.get('/:lat/:lon', (req, res) => {
  res.send(`Your latitude is: ${req.params.lat}, and your longitude is: ${req.params.lon}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})