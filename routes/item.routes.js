const router = require("express").Router();
const {Item, operatorMap} = require("../models/index");
const {authenticate} = require("../middleware/auth_middleware");