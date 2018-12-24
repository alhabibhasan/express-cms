function getAll(req, res, config) {
    let model = config.model;

    model.findAll()
        .then(allElementsForModel => {
            res.send({
                allStoredElements: allElementsForModel
            });
        })
}

function updateModel(req, res, config) {
    let model = config.model;
    let updatedFields = config.updatedFields;
    let id = config.id;

    model.findByPk(id)
        .then(elementToUpdate => {
            // Could maybe use the req body directly but just in case we have some rogue values,
            // we should be specific.
            if (elementToUpdate) {
                elementToUpdate.update(updatedFields)
                    .then(() => {
                        res.send({
                            updatedModel:updatedFields
                        });
                    })
            } else {
                res.send({
                    'not_found': 'The element you tried to edit doesn\'t exist.'
                })
            }
        });
}

function createModel(req, res, config) {
    let model = config.model;
    let fields = config.fields;

    model.create(fields)
        .then((createdModel) => {
            res.send({createdModel:createdModel});
        });
}

function deleteModel(req, res, config) {
    let model = config.model;
    let id = config.id;

    model.findByPk(id)
        .then(elementToDelete => {
            if (elementToDelete) {
                elementToDelete.destroy();
                res.send({
                    'deleted': elementToDelete
                });
            } else {
                res.send({
                    'delete_error' : 'The element you tried to delete doesn\'t exist.'
                });
            }
        });
}

module.exports = {
    createModel,
    updateModel,
    deleteModel,
    getAll,
};