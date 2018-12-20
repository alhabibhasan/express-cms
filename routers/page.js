const express = require('express')
const router = express.Router()
const async = require('async')

const pageHelper = require('../lib/model_helpers/page')

router.use(function showingPages(req, res, next) {
    // This middleware function will only be ran once the pages router is entered regardless of
    // which HTTP method is used.
    console.log('Entered the pages middleware')
    next()
})

router.get('/', (req, res) => {
    res.send(
        {
            data: 'Pages home page'
        }
    )
})

router.get('/:id', (req, res) => {
    let pageId = req.params.id
    pageHelper.getPage(pageId, function (page) {
        res.send(
            {
                page: page
            }
        )
    })
})

module.exports = router