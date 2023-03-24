const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/views'))
app.use(express.json())

app.get('/', (req, res)=>{
    res.render("index")
})

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`App is live at http://localhost:${PORT}`)
})