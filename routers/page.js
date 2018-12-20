const express = require('express');
const router = express.Router();
const Page = require('../lib/models').Page;
const {check, validationResult} = require('express-validator/check');


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

router.post('/:id', [
        check('name').not().isEmpty().withMessage('Name cannot be empty.'),
        check('name').isLength({min: 5, max: 255}).withMessage('Page name must be more than 5 characters long'),
        check('description').isLength({max: 500}).withMessage('Description cannot be more than 500 characters long.')
    ]
    , (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }

        let pageId = req.params.id;
        Page.findByPk(pageId)
            .then(page => {
                let updatedPage = {
                    name: req.body.name,
                    description: req.body.description
                };
                page.update(updatedPage)
                    .then(() => {
                        res.send(updatedPage);
                    })
            });
        return {
            'update_error': 'Failed to update the page.'
        }
    });

module.exports = router;