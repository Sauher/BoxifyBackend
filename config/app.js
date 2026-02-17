require('dotenv').config();

const express = require('express')
const cors = require('cors')

const userRoutes =  require('../routes/users.routes')
const mailRoutes = require('../routes/mail.routes')
const uploadRoutes = require('../routes/upload.routes')
const BoxRoutes = require('../routes/box.routes')
const ItemRoutes = require('../routes/item.routes')
const BoxItemRoutes = require('../routes/boxitem.routes')

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/users', userRoutes)
app.use('/mail', mailRoutes)
app.use('/upload',uploadRoutes)
app.use('/boxes', BoxRoutes)
app.use('/items', ItemRoutes)
app.use('/box-items', BoxItemRoutes)

app.use('/uploads', express.static('uploads'))

module.exports = app;