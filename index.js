require('dotenv').config();
const express = require('express');
const cors = require('cors')
const path = require('path');

const { dbConnection } = require('./DB/config');
//Creating expressApp server:
const app = express();
// try {


// } catch {
//     console.log(err);
// }
// CORS settings (middleware)
app.use(cors());

// Reading and parsing body
// (siempre va antes de las rutas)
app.use(express.json());

//dataBase
dbConnection();


//public Directory
app.use(express.static('public'));
// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/hospitals', require('./routes/hospitalRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/all', require('./routes/searchingRoutes'));
app.use('/api/uploads', require('./routes/uploads'));

// The last
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

//Run/listening app on port 3000:
app.listen(process.env.PORT || 5000, () => {
    console.log('Backend server running on port: ' + process.env.PORT)
});
