const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';
console.log("ENV ==== ", app.get('env'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

if (!dev) {
    app.use(morgan('common'));    
    app.use(express.static(path.resolve(__dirname, '../build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
    })

}

if (dev) {
    app.use(morgan('dev'));
}
app.listen(PORT, err => {
    if (err) {
        throw err
    }
    console.log("Server is running")
})