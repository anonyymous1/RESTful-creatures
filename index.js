// REQUIRE EXPRESS
const app = require('express')()
const layouts = require('express-ejs-layouts')

// REQUIRE ROUTERS
const dinoRouter = require('./controllers/dinoController')

//ADDITIONAL SETUP
app.set('view engine', 'ejs')
app.use(layouts)

// SEND
app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use('/dinosaurs', dinoRouter)

// LISTEN
app.listen(7000, () => {
    console.log('Server is up!');
})