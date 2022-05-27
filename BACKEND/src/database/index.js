const {Client} = require('pg');

const client = new Client({
  host: '',
  port: ,
  user: '',
  password:'',
  database: '',
})

client.connect((error) => {
  if(error) {
    console.error('connection fail 💥', error.stack)
  } else {
    console.log('DB connection online 🐻')
  }
})

exports.query = async (query, values) => {
  const {rows} = await client.query(query, values);

  return rows;
}
