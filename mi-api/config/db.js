const mysql = require('mysql2')

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'bibliotecafull',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0    
})

async function testConnection() {
    try {
      const connection = await pool.promise().getConnection();
      console.log('✅ Conexión exitosa a MySQL')
      connection.release()
      return true
    } catch (error) {
      console.error('❌ Error al conectar a MySQL:', error.message);
      return false
    }
  }
  

module.exports = {pool:pool.promise(), testConnection};