const cookieSession = require('cookie-session');
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();

app.use(bodyParser.json());
 
app.use(cookieSession({
  name: 'session',
  keys: ['session'],
 
  // Cookie Options
  maxAge: 2 * 60 * 1000 // 2 minutes
}));

app.post('/add-click', (req,res) => {
  req.session.totalClicks = req.session.totalClicks || 0;
  req.session.totalClicks += 1;
  res.sendStatus(200);
});

app.get('/get-clicks', (req, res) => {
  req.session.totalClicks = req.session && req.session.totalClicks || 0;
  const {totalClicks} = req.session;
  res.send({totalClicks});
});

app.post('/add-username', (req,res) => {
  req.session.username = req.session.username || '';
  console.log(req.body);
  req.session.username = req.body.username;
  res.sendStatus(200);
});

app.get('/get-username', (req,res) => {
  req.session.username = req.session && req.session.username || '';
  const {username} = req.session;
  res.send({username});
});

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
