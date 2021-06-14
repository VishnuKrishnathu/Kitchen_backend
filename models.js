const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
	kitchenImagepath:{
		type: String
	},
	ownername:{
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	kitchenname:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	fssainumber:{
		type: String,
		required: true
	},
	mobilenumber:{
		type: Number,
		required: true
	},
	preparationtime:{
		type: String
	},
	checkbox: {
		type: Boolean,
		required: true
	},
	dishtypes:{
		type: String
	},
	time:{
		from:{
			type: String
		},
		to:{
			type: String
		}
	}
}, {timestamps: true});

const Users = mongoose.model('stemjar_project', model);

module.exports = Users;
