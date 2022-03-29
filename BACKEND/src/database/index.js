const {Client} = require('pg');

const client = new Client({
  host: 'qqtech-1.crqc50gxdjpu.sa-east-1.rds.amazonaws.com',
  port: 5432,
  user: 'gleal',
  password:'kjri3kj98hj2*',
  database: 'gleal',
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
