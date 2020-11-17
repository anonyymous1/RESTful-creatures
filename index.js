// REQUIRE EXPRESS
// const app = require('express)() //Used when you wont need the express function
const express = require('express')
const app = express()
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override');

const cryptoRouter = require('./controllers/cryptidsController')

// REQUIRE ROUTERS
const dinoRouter = require('./controllers/dinoController')

//ADDITIONAL SETUP
app.set('view engine', 'ejs')
app.use(layouts)
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// SEND
app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use('/dinosaurs', dinoRouter)
app.use('/cryptids', cryptoRouter)

// LISTEN
app.listen(7000, () => {
    console.log('Server is up!');
})