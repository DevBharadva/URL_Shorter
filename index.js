const express = require("express")
const path = require('path')
// const { connecttoMongoDB } = require('./connect')
const urlroute = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const URL = require('./models/url')
const  mongoose  = require("mongoose")
const app = express();
require('dotenv').config()

const url = process.env.URL;
const port = process.env.PORT;

mongoose
.connect(url)
.then(() => console.log('mongoDb Connected'))
.catch((err)=>console.log(err));

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/url', urlroute)
app.use('/',staticRouter)

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { 
            shortId 
        },
        {
            $push: {
                visitHistory: new Date(),
            },
        })
        // res.render('index', { id: generatedId, urls: urlList });
    res.redirect(entry.redirectURL)
})

app.listen(port, () => console.log(`server Started at PORT:${port}`))
