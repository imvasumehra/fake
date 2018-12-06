var express = require('express');
var app = express();
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/node-blog")
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(__dirname+'/public'));

const port = process.env.PORT;

var postSchema = new mongoose.Schema({ body: String });
var Post = mongoose.model('Post', postSchema);


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('index', { posts: posts})
   });
});

app.get("/addpost", (req, res) => {
   res.redirect('/');
});

app.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

app.listen(port, () => {
  console.log('Server up and running on port 3000');
})
