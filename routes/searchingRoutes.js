/*
route: api/all/:search
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { getAll, getDocsCollection } = require("../controllers/searchsController");

const { fieldValid } = require('../middlewares/field-validation')

const { JWTvalid } = require("../middlewares/jwt-validation");



const router = Router();

router.get('/:search', JWTvalid, getAll);

router.get('/collection/:tabla/:search', JWTvalid, getDocsCollection);

module.exports= router;