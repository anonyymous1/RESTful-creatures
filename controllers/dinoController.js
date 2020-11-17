const fs = require('fs')
const dinoRouter = require('express').Router()

dinoRouter.get('/', (req, res) => {
    console.log('-----GET-----');
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)
    res.render('dinosaurs/index', {dinos})
})

// New route has to be on top or it wi
dinoRouter.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

dinoRouter.get('/:id', (req, res) => {
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)
    const id = parseInt(req.params.id) - 1
    const dino = dinos[id]
    res.render('dinosaurs/show', {dino})
})

dinoRouter.post('/', (req, res)=> {
    const newDino = req.body
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)
    dinos.push(newDino)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))
    res.redirect('/dinosaurs')
})

dinoRouter.get('/search/:searchTerm', (req, res) => {
    const newDino = req.body
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)
    const searchTerm = req.params.searchTerm
    //note taht the details in the search are up to you do partials matach type property..?
    const filteredDinos = dinos.filter((dino) => dino.name.toLowerCase() == searchTerm.toLowerCase())

    res.render('dinosaurs/index', { dinos: filteredDinos })
})

//Edit route
dinoRouter.get('/edit/:id', (req, res) => {
    console.log('-----EDIT-----');
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)
    res.render('dinosaurs/edit', { dino: dinos[req.params.id], dinoId: req.params.id })
})

dinoRouter.delete('/:id', (req, res) => {
    console.log('-----Delete-Route-----');
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos);

    //Remove dinosaurs from the array
    dinos.splice(req.params.id, 1);

    //Save the new dinos to the new dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))

    //Redirect to the GET route. Go back to Dinosaurs route
    res.redirect('/dinosaurs');
})

dinoRouter.put('/:id', (req, res) => {
    console.log('-----PUT-ROUTE-----');
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos);

    //re-assing the name and type of the dinosaurs fields to be edited
    const dinoObject = dinos[req.params.id]
    dinoObject.name = req.body.name;
    dinoObject.type = req.body.type;

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect('/dinosaurs');
})

module.exports = dinoRouter