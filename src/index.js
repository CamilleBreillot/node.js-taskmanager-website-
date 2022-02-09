const app = require('./app')
const port = process.env.PORT // we remove || 3000 thanks to setup env var with npm emv cmd & integration in script

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
