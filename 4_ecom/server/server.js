// entry point entire application
// require indicated directly adress from node_modules
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
// core node module file sytem
const fs = require("fs")
// next apporoch to get fn on file sys is object destructuring: 
//const {readdirSync} = require("fs")

require('dotenv').config()


// import routes: filename: not require done by mapping fn
// const authRoutes = require('./routes/auth');


// APP
// understand express app as request respond handler:
// make express server availabe
const app = express()

// db connection: with mongo db connection: after connectin we get promise back
mongoose.connect(process.env.DATABASE, {
    // mongoose config
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
    // useUnifiedTopology: true
})
    .then(() => console.log('DB CONNECTED!!'))
    .catch(err => console.log(`DB CONNECTION ERROR  ${err}`))


// Middlewares: fn that executes on between! before our routes does anything acheive: 
// use method is used to apply middleweares
app.use(morgan("dev"))
// server and client communicates thorugh json data!
app.use(bodyParser.json({ limit: "2mb" }))
app.use(cors());

// Routes middleware
// prefix api on any routes
// app.use('/api', authRoutes)
// maps the files inside routes folder each of then and 
fs.readdirSync('./routes').map((r) => app.use("/api", require("./routes/" + r)))
// ROUTE finally
// whenever we get request on this adderss what do we want to send to client.
// get request send response
// app.get('/api', (req, res) => {

//     res.json({
//         data: 'hey you hit node api UPdates Again',
//         name: 'Sansrit',
//         ad dress: 'Sanipalati'

//     })
// });


// decide port where we want to run

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))