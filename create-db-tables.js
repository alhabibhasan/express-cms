const db = require('./db');

const create_page_table_query = `create table pages (
  page_id int not null auto_increment,
  name varchar(255) not null,
  description text,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp,
  primary key(page_id)
);`

const create_band_table_query = `create table bands (
  band_id int not null auto_increment,
  name varchar(255),
  header varchar(255) not null,
  text_content text,
  image_media_url varchar(2083),
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp,
  primary key(band_id)
);`

const create_page_bands_table_query = `create table page_bands (
  page_id int,
  band_id int,
  created_at datetime default current_timestamp,
  updated_at datetime default current_timestamp,
  foreign key (page_id) references pages(page_id),
  foreign key (band_id) references bands(band_id)
);`

db.query(create_page_table_query, function (err, results, fields) {
    if (err) throw err
    console.log('Pages table created successfully.')
})

db.query(create_band_table_query, function (err, results, fields) {
    if (err) throw err
    console.log('Bands table created successfully.')
})

db.query(create_page_bands_table_query, function (err, results, fields) {
    if (err) throw err
    console.log('Page bands table created successfully.')
})

db.end()