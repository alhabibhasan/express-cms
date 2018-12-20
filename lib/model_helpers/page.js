const db = require('../../db');
const Page = require('../models/page')

function getPage(id, onComplete) {
    let getPageQuery = 'SELECT * FROM pages AS Page WHERE Page.page_id = ?';
    let page = {};
    let bands = {};
    db.query(getPageQuery, [id], function (err, results) {
        if (err) throw err;

        if (results.length > 0) {
            results = results[0];

            page = new Page(results.page_id,
                results.name,
                results.description,
                results.created_at,
                results.updated_at
            )
        }
    })


}

module.exports = {
    getPage
}

