const express = require('express'); 
const app = express(); 
const bcryptjs = require('bcryptjs');

app.use(express.static('public'));
const isLoggedIn = require('./middlewares/isLoggedin')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Import Sequelize models
const sequelize = require('./config/database');
const User = require('./models/user');
const Folder = require('./models/folder');
const Book = require('./models/book');
const Slide = require('./models/slide');
const LectureVideo = require('./models/lectureVideo');
const LectureNotes = require('./models/lectureNotes');
const PersonalNotes = require('./models/personalNotes');

//Controllers Import 
const AuthenticationC = require('./controllers/Authentication');
const FolderC = require('./controllers/FolderC');


//Routes Import
const FolderRoutes = require('./routes/folderRoutes');
const BookRoutes = require('./routes/bookRoutes');
const lectureNotesRoutes = require('./routes/lectureNotesRoutes');  
const lectureVideosRoutes = require('./routes/lectureVideosRoutes');
const slidesRoutes = require('./routes/slidesRoutes');


const session = require('express-session');
app.use(session({   
    secret: 'secret',     
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.currentUser = req.session.Username;
    next();
});


// Authentication 
app.post('/register', AuthenticationC.register);

app.get("/login", AuthenticationC.renderLoginForm);

app.post('/login', AuthenticationC.login);

app.post('/logout', AuthenticationC.logout);


// Testing isloggedIn
app.get('/', isLoggedIn, async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('home', { result: users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Error fetching users' });
    }
});


app.use("/Folder",FolderRoutes);


app.use("/Books", BookRoutes)

app.use("/lectureNotes", lectureNotesRoutes)


app.use("/lectureVideos", lectureVideosRoutes)


app.use("/slides", slidesRoutes)


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
