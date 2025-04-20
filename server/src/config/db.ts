  
  import mysql from 'mysql2';

  export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'justnew03',
    database: 'doctor_appointment_db'
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
  });