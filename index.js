require('dotenv').config();
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./DB/config');
//Creating expressApp server:
const app = express();
// CORS settings (middleware)
app.use(cors());

// Reading and parsing body
// (siempre va antes de las rutas)
app.use (express.json() );

//dataBase
dbConnection();

// Rutas
app.use( '/api/users', require ('./routes/userRoutes') );
app.use( '/api/login', require ('./routes/auth') );

//Run/listenning app on port 3000:
app.listen(process.env.PORT, () => { 
console.log('Backend server running on port: ' + process.env.PORT) 
});
