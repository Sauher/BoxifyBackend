const router = require("express").Router();
const {Box, operatorMap} = require("../models/index");
const {authenticate} = require("../middleware/auth_middleware");