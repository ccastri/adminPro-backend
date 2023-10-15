const mongoose = require('mongoose');
// nocaller__id
// Bio2160cc

// mongodb + srv://nocaller__id:<password>@cluster0.czruq.mongodb.net/
const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,

        });
        console.log('DB online')
    } catch (err) {
        throw new Error('Error a la hora de iniciar. ver logs', err);

    }
}

module.exports = {
    dbConnection
}