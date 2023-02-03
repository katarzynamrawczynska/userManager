const express = require("express");
const fs = require("fs");
const dataRoute = "./users.json";
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const userRouter = require("./users");

app.get("/", (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`));  
  });

app.get("/script.js", (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/script.js`));  
});
  
app.use("/users", userRouter);

app.listen(3000, () => console.log(`http://127.0.0.1:${3000}`)); // 
