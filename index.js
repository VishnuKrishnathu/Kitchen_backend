require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const Model = require('./models.js');

const app = express();

//// Multer Image files check ////
const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads/');
	},
	filename: function(req, file, cb){
		cb(null, `${Date.now()}_${file.originalname}`);
	}
});

const MIMEtype = (req, file, cb) =>{
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
		cb(null, true);
		return;
	}
	cb(null, false);
};
const upload = multer({storage: storage, limits: {
		fileSize: 1024*1024*10
	},
	fileFilter: MIMEtype
});
////////

//// Database connection Mongoose ////
const db = mongoose.connection;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = 'stemjar_project';
const DATABASECONNECTION = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.ragko.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(DATABASECONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then( res => console.log(`Connected to the database ==> ${DATABASE_NAME}`))
.catch(err => console.log(err));
////////

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.json({success: true});
});

app.post('/add-kitchen', upload.single('kitchenImage'),(req, res) => {
	const checkbox = req.body.checkbox ? true : false;
	if (req.file){
		const kitchen = new Model({
			kitchenImagepath: req.file.path,
			ownername: req.body.ownername,
			address: req.body.address,
			kitchenname: req.body.kitchenname,
			email: req.body.email,
			fssainumber: req.body.fssainumber,
			mobilenumber: parseInt(req.body.mobilenumber),
			preparationtime: req.body.preparationtime,
			checkbox: checkbox,
			dishtypes: req.body.dishtypes,
			time:{
				from: req.body.orderfrom,
				to: req.body.orderto
			}
		});
		kitchen.save()
		.then(result => res.status(201).json({success: true}))
		.catch(error => {
			res.status(500).json({success: false});
		});
		return;
	};
	res.json({MIMEtype: false});
});

app.listen(PORT, () => {
	console.log(`listening to http://127.0.0.1/${PORT}/`);
});
