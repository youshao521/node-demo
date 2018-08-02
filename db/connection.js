
const { Client } = require('pg')
const client = new Client({
    user: 'dadf45',
    host: '10.33.40.236',
    database: 'opsmgr_db',
    password: 'Ia394wOv',
    port: 7001,
})

client.connect();
client.query('select c_username from center_user', function(err, result) {
  if(err) {
    return console.error('error running query', err);
  }
  console.log(result.rows);
});

exports.moudle = client;