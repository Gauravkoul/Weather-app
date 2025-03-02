const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('dotenv').config()
const forecastData = require('./utils/forecastData')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gaurav Koul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        aboutText: 'Web developer',
        title: 'About Me',
        name: 'Gaurav Koul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This app can give you the Information of Current Weather of any Location',
        title: 'Help',
        name: 'Gaurav Koul'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    forecastData(req.query.address, (error, data ='') => {
        if (error) {
            return res.send({ error })
        }
            res.send({
                forecast: data,
                address: req.query.address
            })
        })
    })

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gaurav Koul',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gaurav Koul',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})