const Pool = require('pg').Pool
require ('dotenv').config();


const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionString: process.env.DB_CONNECTION_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const createUser = (request, response) => {
  const { first_name,
          last_name,
          email,
          address1,
          address2,
          city,
          state,
          zip,
          country,
          phone_no 
        } = request.body

  pool.query('INSERT INTO users (first_name, last_name, email, address1, address2, city, state, zip, country, phone_no) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', [first_name, last_name, email, address1, address2, city, state, zip, country, phone_no], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.rows[0].id}`)
  });
}


const addUserAppointment = (request, response) => {
  const user_id = request.params.id;
  const { appointment_time } = request.body;
  pool.query('INSERT INTO users (appointment_time, user_id) VALUES ($1, $2) RETURNING id', [appointment_time, user_id], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Appointment added with ID: ${result.rows[0].id}`)
  });
}

const addUserIdentification = (request, response) => {
  const user_id = request.params.id;
  const { imageData } = request.body;
  pool.query('INSERT INTO users (image, user_id) VALUES ($1, $2) RETURNING id', [imageData, user_id], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Identification added with ID: ${result.rows[0].id}`)
  });
}

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

module.exports = {
  createUser,
  addUserIdentification,
  addUserAppointment,
  getUsers
}


