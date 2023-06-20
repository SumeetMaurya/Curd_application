const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: String, required: true },
	salary: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	countr: { type: String,  default:"---" },
	stat: { type: String,  default: "---"},
	cit: { type: String,  default: "----"},
	role: { type: String , default: "normal"},
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, "helo", {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("First Name"),
		age: Joi.string().required().label("age"),
		salary: Joi.string().required().label("salar"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		countr: Joi.string().label("countr"),
		stat: Joi.string().label("stat"),
		cit: Joi.string().label("cit"),
		role: Joi.string().label("role"),

	});
	return schema.validate(data);
};

module.exports = { User, validate };
