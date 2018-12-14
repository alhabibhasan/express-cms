const db = require('../../db');
const Page = require('../models/page')

function getPage(id, onComplete) {
  var getPageQuery = 'SELECT * FROM pages AS Page WHERE Page.page_id = ?'
  return db.query(getPageQuery, [id], function(err, results){
    if (err) throw err
    
    let page = {}

    if (results.length > 0) {
      results = results[0]

      page = new Page(results.page_id,
        results.name,
        results.description, 
        results.created_at, 
        results.updated_at
      )
    }

    onComplete(page)
  })
}

module.exports = {
  getPage
}

