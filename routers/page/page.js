const express = require('express');
const router = express.Router();
const Page = require('../../lib/models').Page;
const {check, validationResult} = require('express-validator/check');

const pageValidationChecks = [
    check('name').not().isEmpty().withMessage('Name cannot be empty.'),
    check('name').isLength({min: 5, max: 255}).withMessage('Page name must be more than 5 characters long'),
    check('description').isLength({min:0, max: 500}).withMessage('Description cannot be more than 500 characters long.')
];

/*
 * TODO:
 *  - re create db tables as description was spelt incorrectly
 *  - create the rest of the CRUD routes for bands and pages.
 *
 *  So far:
 *      - Pages
 *          -C- -R- -U- D
*           - Bands
*               C R U D
 */

router.use(function showingPages(req, res, next) {
    // This middleware function will only be ran once the pages router is entered regardless of
    // which HTTP method is used.
    console.log('Entered the pages middleware');
    next();
});

/**
 * Show all pages.
 */
router.get('/', (req, res) => {
    res.send(
        {
            data: 'Pages home page'
        }
    )
});

/**
 * Show page with specified id
 */
router.get('/:id', (req, res) => {
    let pageId = req.params.id;
    return Page.findByPk(pageId)
        .then(page => {
            if (page) {
                res.send(page);
            } else {
                res.send({
                    'not_found': 'The page you requested doesn\'t exist.'
                })
            }
        });
});

/**
 * Update page with specified id
 */
router.post('/:id', pageValidationChecks, (req, res) => {
        checkValidation(req, res);

        let pageId = req.params.id;
        Page.findByPk(pageId)
            .then(page => {
                // Could maybe use the req body directly but just in case we have some rogue values,
                // we should be specific.
                if (page) {
                    let updatedPage = {
                        name: req.body.name,
                        description: req.body.description
                    };
                    page.update(updatedPage)
                        .then(() => {
                            res.send({updatedPage:updatedPage});
                        })
                } else {
                    res.send({
                        'not_found': 'The page you tried to edit doesn\'t exist.'
                    })
                }
            });
        return {
            'update_error': 'Failed to update the page.'
        }
});

/**
 * Create page
 */
router.post('/', pageValidationChecks, (req, res) => {
        checkValidation(req, res);

        let newPage = {
            name: req.body.name,
            description: req.body.description
        };

        Page.create(newPage)
            .then((page) => {
                res.send({createdPage:page});
            });

        return {
            'create_error': 'Failed to create the page.'
        }
});


router.delete('/:id', (req, res) => {

    res.send({
        'deleting-page': req.params.id
    })
});

/**
 * This function will check if the validation process has passed or failed.
 * If failed, then will return the response with the error messages.
 * @param req
 */
function checkValidation(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
}

module.exports = router;