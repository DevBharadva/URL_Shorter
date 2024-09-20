const express = require("express")
const path = require('path')
const { connecttoMongoDB } = require('./connect')
const urlroute = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const URL = require('./models/url')
const app = express();
const PORT = 2222;

connecttoMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('mongoDb Connected'));

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
        res.render('index', { id: generatedId, urls: urlList });
    // res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`server Started at PORT:${PORT}`))
