
const express = require('express');
const router = express.Router();
const Band = require('../lib/models').Band;
const {check, validationResult, body} = require('express-validator/check');
const crudHelper = require('../lib/helpers/crud');

const bandValidationChecks = [
    check('header').not().isEmpty().withMessage('Band header cannot be empty.'),
    check('text_content').isLength({min: 5, max: 500}).withMessage('Text name must be more than 5 characters long and less than 500 characters.'),
    check('pageId').exists(),
    body('image_url').custom(value => {
        if (value) {
            // Do some url validation
            return false;
        }
        return true;
    })
];

router.post('/', bandValidationChecks, (req, res) => {
    checkValidation(req, res);

    let newBand = {
        header: req.body.header,
        text_content: req.body.text_content,
        image_url: (req.body.image_url) ? req.body.image_url : '',
        PageId: req.body.pageId
    };

    let pageCreationConfig = {
        model: Band,
        fields: newBand
    };

    crudHelper.createModel(req, res, pageCreationConfig);

    return {
        'create_error': 'Failed to create a band.'
    };
});

router.patch('/:bandId', bandValidationChecks, (req, res) => {
    checkValidation(req, res);

    let bandUpdateConfig = {
        model: Band,
        updatedFields: req.body,
        id: req.params.bandId
    };

    crudHelper.updateModel(req, res, bandUpdateConfig);

    return {
        'update_error': 'Failed to update the band.'
    }

});


router.delete('/:bandId', (req, res) => {
    let deleteConfig = {
        model: Band,
        id: req.params.bandId
    };

    crudHelper.deleteModel(req, res, deleteConfig);

    return {
        'delete_error': 'Failed to delete the page.'
    }
});

function checkValidation(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
}

module.exports = router;