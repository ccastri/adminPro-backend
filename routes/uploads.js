/*
routes: api/uploads/
*/

const { Router } = require('express');
const fileUpload = require('express-fileupload'); //middleware de express
const { uploadFile, returnImg } = require('../controllers/uploadsController');
const { JWTvalid } = require('../middlewares/jwt-validation');

const router = Router();
router.use(fileUpload()); //era app.use pero como no esta importado y el router funciona igual, usamos router para llamar el middleware

router.put('/:type/:id', JWTvalid, uploadFile);
router.get('/:type/:photo', returnImg);

module.exports = router;