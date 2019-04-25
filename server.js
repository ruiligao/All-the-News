var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');

var axios = require('axios');
var cheerio = require('cheerio');

var app = express();
var PORT = 5000;
var exphbs = require('express-handlebars');

var db = require('./models');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.connect("mongodb://localhost/allNews", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    axios.get("https://www.washingtonpost.com/").then(function (res) {
        var $ = cheerio.load(res.data);
        var results = {};
        $('div.headline.normal-style').each(function (i, element) {
            // console.log(element)
            results.title = $(element).children('a').text();
            results.link = $(element).children('a').attr('href');
            results.summary = $(element).next('div.blurb').text();
            // if(results.summary) {
            // console.log('///////////////////////');
            // console.log(results.summary)
            // }

            if (results.summary) {

                db.Articles.create(results).then(function (dbArticle) {
                    console.log(dbArticle)
                })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        });
        // res.send("Scrape Complete");
    });
});
app.get("/", (req, res) => {
    db.Articles.find({})
        .then(dbArticle => {
            res.render("index", { articles: dbArticle });
        })
        .catch(err => console.log(err))
});
app.get("/articles/:id", (req, res) => {
    console.log(req.params.id);
    db.Articles.findOne({ _id: req.params.id })
        .then(data => {
            console.log(data);
            res.json(data);
        });
});
app.post("/articles/:id", function (req, res) {
    console.log(req.body.body);
    db.Articles.updateOne({ _id: req.params.id },
        {  note: req.body.body })
        .then(function (dbArticle) {
            console.log("dbArticle");
            console.log(dbArticle);
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.listen(PORT, () =>
    console.log('Server listens on http://localhost:' + PORT)
);