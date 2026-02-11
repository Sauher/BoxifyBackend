const router = require("express").Router();
const {Boxitem, operatorMap} = require("../models/index");
const {authenticate} = require("../middleware/auth_middleware");