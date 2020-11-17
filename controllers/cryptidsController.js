const fs = require('fs')
const cryptoRouter = require('express').Router()

cryptoRouter.get('/', (req, res) => {
    const rawCrypto = fs.readFileSync('./cryptids.json')
    const cryptos = JSON.parse(rawCrypto)
    res.render('cryptids/index', {cryptos})
})

// New route has to be on top or it wi
cryptoRouter.get('/new', (req, res) => {
    res.render('cryptids/new')
})

cryptoRouter.get('/:id', (req, res) => {
    const rawCrypto = fs.readFileSync('./cryptids.json')
    const cryptos = JSON.parse(rawCrypto)
    const id = parseInt(req.params.id) - 1
    const crypto = cryptos[id]
    const cryptoImg = crypto.img_url
    res.render('cryptids/show', {crypto, cryptoImg})
})

cryptoRouter.post('/', (req, res)=> {
    const newCrypto = req.body
    const rawCrypto = fs.readFileSync('./cryptids.json')
    const cryptos = JSON.parse(rawCrypto)
    cryptos.push(newCrypto)

    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptos))
    res.redirect('/cryptids')
})







module.exports = cryptoRouter