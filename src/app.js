const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const exphbs  = require('express-handlebars')
const flatpickr = require('flatpickr')




var xx = ' '


const getstats = require('./utils/getstats')
const getiso = require('./utils/getiso')
//const forecast = require('./utils/forecast')


const app = express()
//app.engine('handlebars', exphbs())

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.localsAsTemplateData(app)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Covid-19 Tracker',
        name: 'Roberto Brunetti'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Roberto Brunetti'
    })
})

app.get('/help', (req, res) => {

    getiso( (error, {body} ={}) => {
        if (error) {
            return res.send({error})
        }

    res.render('help', {
        helpText: 'List of valid location codes',
        title: 'Help',
        name: 'Roberto Brunetti',
        body: body
    })
})
})

app.get('/tracker', (req, res) => {
    if (!req.query.iso) {
       return res.send({
           error: 'You must enter an address'
        })
    }
    if (!req.query.date){
        return res.send({
            error: "You must enter a date"
        })
    }

    getstats(req.query.iso, req.query.date , (error, { body } ={}) => {
        if (error) {
            return res.send({error})
        }
         res.send({body})  

    //      console.log('roboooooooooo')    
    //      body.data.forEach(element => {
    //      console.log(element)
    //      console.log(body.data[0].date)
    // } 
    //)

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roberto Brunetti',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roberto Bruntti',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port .' + port)
})

