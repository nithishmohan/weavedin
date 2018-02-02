const db = require('./base.js')
const knex = db.knex
return knex.migrate.make(process.argv[2],  {
  directory: __dirname + '/migrations',
  tableName: 'schema_versions'
}).catch(function(err) {
  console.log(err);
}).finally(function(){
  process.exit();
});

// return knex.migrate.rollback({
//   directory: __dirname + '/migrations',
//   tableName: 'schema_versions'
// });


