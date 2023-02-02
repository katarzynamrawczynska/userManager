const express = require("express");
const router = express.Router();
const fs = require("fs");
const dataRoute = "./users.json";
const fileReaderAsync = require("./fileReader");

router.get("/example", async (req, res) => {
	const fileData = await fileReaderAsync(dataRoute);
	console.log(JSON.parse(fileData));
	  res.send(fileData.toString())
  });

const getNextId = async () => {
	const fileData = await fileReaderAsync(dataRoute)
	const users = JSON.parse(fileData)
	console.log(users)
	const ids = users.users.map(user => user.id)
	return Math.max(...ids)+1
}

//get all users data
router.get("/", (req, res) => {
	console.log("get")
	fs.readFile(dataRoute, (err, data) => {
		if (err) throw err;
		res.json(JSON.parse(data))
	});
});

router.post("/", async (req, res) => {
	const name = req.body.name;
	const active = req.body.active;
	const id = getNextId();
	console.log(name, active, id)
	const fileData = await fileReaderAsync(dataRoute)
	const data = JSON.parse(fileData)
	const users = data.users
	const newUser = {id:id, name:name, active:active}
	let result = {
		users: [...users, newUser]
	};
	result = JSON.stringify(result);
  
	fs.writeFile(dataRoute, result, (err) => {
		if (err) throw err;
	});
  
	res.send("Done");
});


router.route("/:id").get((req, res) => {
		const id = req.params.id;
		console.log('get user with id '+ id)
		fs.readFile(dataRoute, (err, data) => {
			if (err) throw err;
			const users = (JSON.parse(data))
			const currentUser = users.users.find(user => user.id === parseInt(id))
			res.json(currentUser)
		});
	})

.put((req, res) => {
		const id = req.params.id;
		res.render("userID", { id: id });
	})
	.delete((req, res) => {
		const id = req.params.id;
		res.render("userID", { id: id });
	});

module.exports = router;
