const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require("session-file-store")(session)
const flash = require('express-flash')
const conn = require('./db/conn')
const tasksRoutes = require('./routes/tasksRoutes')

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(
    express.urlencoded({
        extended: true,
    })
)

//flash messages
app.use(flash())

//session middleware
app.use(
    session({
      name: 'session',
      secret: 'nosso_secret',
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
      }),
      cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      },
    }),
  )

// set session to res
app.use((req, res, next) => {
    // console.log(req.session)
    console.log(req.session.userid);
  
    if (req.session.userid) {
      res.locals.session = req.session;
    }
  
    next();
  });

app.use(express.static("public"))

app.use("/", tasksRoutes);

conn.sync().then(() => {
    app.listen(3000);
}).catch((err) => console.log(err))