const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Text = require('./models/Text')

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/clean-blog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology:true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWEARS
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
   const textes = await Text.find({})
   res.render('index', {
     textes,
   })
app.get('/about', (req,res) => {
  res.render('about');
})
  
});
app.get('/textes/:id', async (req, res) => {
  //res.render('about');
  const text = await Text.findById(req.params.id)
  res.render('text', {
    text
  })
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/textes', async (req, res) => {
  //form aksiyonunda yazdığım yönlendirmeyi yakalıyorum.
  await Text.create(req.body)
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
