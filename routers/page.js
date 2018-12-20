const express = require('express');
const router = express.Router();
const Page = require('../lib/models').Page;

router.use(function showingPages(req, res, next) {
    // This middleware function will only be ran once the pages router is entered regardless of
    // which HTTP method is used.
    console.log('Entered the pages middleware');
    next();
});

router.get('/', (req, res) => {
    res.send(
        {
            data: 'Pages home page'
        }
    )
});

router.get('/:id', (req, res) => {
    let pageId = req.params.id;
    return Page.findByPk(pageId)
        .then(page => {
            res.send(page);
        })
});

module.exports = router;