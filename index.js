require('dotenv').config();
const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./DB/config');
//Creating expressApp server:
const app = express();
// CORS settings (middleware)
app.use(cors());
//dataBase
dbConnection();

// Rutas
app.get('/', (req, res)=>{

    res.json({

        ok: true,
        msg: 'Fuck'
    });
});
//Run/listenning app on port 3000:
app.listen(process.env.PORT, () => { 
console.log('Backend server running on port: ' + process.env.PORT) 
});
