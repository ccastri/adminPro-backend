const fs = require('fs');

const User = require('../models/users');
const Hospital = require('../models/hospitals');
const Doctor = require('../models/doctors');



const deleteImg = (path) => {

    if (fs.existsSync(path)) {
        //Borrar imagen anterior
        fs.unlinkSync(path);
    }

}
const updateImg = async (type, id, fileName) => {

    let oldPath = '';
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log('Doctor id does not match');
                return false;
            }
            oldPath = `./uploads/doctors/${doctor.img}`;
            deleteImg(oldPath);



            doctor.img = fileName;
            await doctor.save();
            return true;
            // var serveIndex = require('serve-index');
            // app.use(express.static(__dirname + '/'))
            // app.use('/uploads', serveIndex(__dirname + '/uploads'));
            break;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Hospital id does not match');
                return false;
            }
            oldPath = `./uploads/hospitals/${hospital.img}`;
            deleteImg(oldPath);



            hospital.img = fileName;
            await hospital.save();
            return true;
            break;
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('User id does not match');
                return false;
            }
            oldPath = `./uploads/users/${user.img}`;
            deleteImg(oldPath);



            user.img = fileName;
            await user.save();
            return true;
            break;

        default:
            break;
    }
}
module.exports = {
    updateImg
}