const { Schema, model } = require('mongoose');


const DoctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    // !Pendiente implementar rol de doctores
    // role: {
    //     type: String,
    //     required: true,
    //     default: 'USER_ROLE'
    // },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital', //Esquema de referencia el doctor está asociado con un hospital
        required: true
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User' //Esquema de referencia el doctor está asociado con un paciente
    }
},);//{collection: 'hospitalES' }

DoctorSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Doctor', DoctorSchema);