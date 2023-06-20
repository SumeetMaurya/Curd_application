const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
var theuser ;
var token ;
router.get("/", async(req, res)=>{
	res.json(req.user)
})
router.post("/", async (req, res) => {
	try {
		// const { error } = validate(req.body);
		// if (error)
		// 	return res.status(400).send({ error: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, 10);
		await new User({ ...req.body, password: hashPassword }).save();
		theuser = await User.findOne({ email: req.body.email });
		token = theuser.generateAuthToken();
		res.status(201).send(token);
	} catch (error) {
		res.status(500).send({ message: error });
	}
});

// admin gets all users
router.get("/allusers", async (req, res)=>{

	const details = await User.find({})
	  res.json(details)
  })


router.post("/verify_token", async (req, res) => {
		var new_token = req.body.api_token;
        // const decodedToken = jwt.verify(token, "helo");
		try{
		if(true) {
			res.send(theuser)
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

router.delete('/deleteuser/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the user by ID and delete
      const USER = await User.findByIdAndDelete(userId);
  
      if (!USER) {
        return res.status(404).json({ error: 'Doc not found' });
      }
  
      // Return a success message
      res.json({ message: 'Document deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  // update a user 
  router.put('/update/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const {name, email, age, salary} = (req.body)
      const updatedData = {name, email, age, salary}; // Assuming the updated data is sent in the request body
      // Update the user by ID with the provided data
      await User.updateOne({ _id: userId }, updatedData).exec();

    console.log('Update operation completed'); // Console log message
      // Find the updated user
      const USER = await User.findOne({ _id: userId });
  
      if (!USER) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return the updated user data
      res.json(USER)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
