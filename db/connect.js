const { Pool } = require('pg')

const config = {user: 'paulo', password: 'password', host: 'localhost', database: 'repertorio', port: 5432}

const pool = new Pool(config)

const insertSong = async(data) => {
  const qryObject = {
    text: 'INSERT INTO repertorio (cancion, artista, tono) VALUES ($1, $2, $3) RETURNING *',
    values: data
  }
  try {
    const result = await pool.query(qryObject)
    return result.rows[0]
  } catch(error) {
    console.log(error)
  }
}
const getSongs = async() => {
  try {
    const result = await pool.query('SELECT * FROM repertorio')
    return result.rows
  } catch(error) {
    console.log(error)
  }
}
const editSong = async(data) => {
  const qryObject = {
    text: "UPDATE repertorio SET cancion = $1, artista = $2, tono = $3 WHERE cancion = $1 RETURNING *",
    values: data
  }
  try {
    const result = await pool.query(qryObject)
    return result.rows
  } catch(error) {
    console.log(error)
  }
}
const deleteSong = async(id) => {
  try {
    const result = await pool.query(`DELETE FROM repertorio WHERE id = ${id}`)
    return result.rows
  } catch(error) {
    console.log(error)
  }
}
module.exports = { insertSong, getSongs, editSong, deleteSong }