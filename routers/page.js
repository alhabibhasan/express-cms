const express = require('express');
const router = express.Router();
const {Page, Band} = require('../lib/models');
const bandRouter = require('./band');
const {check, validationResult} = require('express-validator/check');
const crudHelper = require('../lib/helpers/crud');

const pageValidationChecks = [
    check('name').not().isEmpty().withMessage('Name cannot be empty.'),
    check('name').isLength({min: 5, max: 255}).withMessage('Page name must be more than 5 characters long'),
    check('description').isLength({min:0, max: 500}).withMessage('Description cannot be more than 500 characters long.')
];

router.use('/:pageId/bands', (req, res, next) => {
    // pass the page id into the body of the request as we cannot access it inside the
    // band router otherwise.
    req.body.pageId = req.params.pageId;
    next();
} ,bandRouter );

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
router.get('/:pageId', (req, res) => {
    let pageId = req.params.pageId;
    return Page.findByPk(pageId)
        .then(page => {
            if (page) {
                Band.findAll({
                    where: {
                        PageId: pageId
                    }
                })
                    .then(bands => {
                        res.send({
                            page: page,
                            bands: bands
                        });
                    })
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
router.patch('/:pageId', pageValidationChecks, (req, res) => {
        checkValidation(req, res);

        let pageUpdateConfig = {
            model: Page,
            updatedFields: req.body,
            id: req.params.pageId
        };

        crudHelper.updateModel(req, res, pageUpdateConfig);

        return {
            'update_error': 'Failed to update the page.'
        }
});

/**
 * Create page
 */
router.post('/', pageValidationChecks, (req, res) => {
        checkValidation(req, res);

        let pageCreationConfig = {
            model: Page,
            fields: req.body
        };

        crudHelper.createModel(req, res, pageCreationConfig);

        return {
            'create_error': 'Failed to create the page.'
        }
});


router.delete('/:pageId', (req, res) => {
    let deleteConfig = {
        model: Page,
        id: req.params.pageId
    };

    crudHelper.deleteModel(req, res, deleteConfig);

    return {
        'delete_error': 'Failed to delete the page.'
    }
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

module.exports = {
    router
};