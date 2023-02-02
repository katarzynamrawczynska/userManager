const express = require("express");
const fs = require("fs");
const dataRoute = "./users.json";
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.set("view engine", "ejs");

const userRouter = require("./users");

// app.get("/", async (req, res) => {
// 	res.render("index");               //// tu z tutoriala
// });
app.get("/", (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`));  // czy tak to ma wyglądać?
  });
  

app.use("/users", userRouter);

//app.listen(3000); 
app.listen(3000, _ => console.log(`http://127.0.0.1:${3000}`)); // 

/*
app.get("/api/package", (req, res) => {
  fs.readFile(dataRoute, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data))
  });
});

app.post("/api/package", (req, res) => {
  fs.readFile(dataRoute, (err, data) => {
    if (err) throw err;

		let releases = req.body.releases;
		
		if(!releases.length || !releases){
			const d = new Date()
			releases = [
				{
					date: `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDay().toString().padStart(2, '0')}`,
					version: "0.1"
				}
			]
		}

    const {packages} = JSON.parse(data);

    const newPackage = {
			"id": packages.length + 1,
			"name": req.body.name,
			"description": req.body.description,
			"dependencies": [...req.body.dependencies],
			"releases": [...releases]
		};

    let result = {
			packages: [...packages, newPackage]
		};
    result = JSON.stringify(result);

    fs.writeFile(dataRoute, result, (err) => {
      if (err) throw err;
    });

    res.send("Done");
  });
});

app.get("/api/package/:id", (req, res) => {
  fs.readFile(dataRoute, (err, data) => {
    if (err) throw err;

		const {packages} = JSON.parse(data);
    const result = packages.filter(({id}) => id === parseInt(req.params.id));
		
    result.length ? res.json(result[0]) : res.send("No package found");
  });
});

app.put("/api/package/:id", (req, res, next) => {
  fs.readFile(dataRoute, (err, data) => {
    if (err) throw err;

		const {packages} = JSON.parse(data);
		//const pkg = packages[req.params.id];
		const pkg = packages.find(e => e.id === parseInt(req.params.id));
		
		pkg.name = req.body.name;
		pkg.description = req.body.description;
		pkg.dependencies = [...req.body.dependencies];

		let releases = req.body.releases;
		if(releases[0].date === pkg.releases[0].date && releases[0].version === pkg.releases[0].version){
			
			const d = new Date();
			const lastVersionArr = pkg.releases[0].version.split(".")
			//let lastVersion = lastVersionArr[lastVersionArr.length - 1]
			lastVersionArr[lastVersionArr.length - 1] = (parseInt(lastVersionArr[lastVersionArr.length - 1]) + 1);
			
			releases = [
				{
					date: `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`,
					version: lastVersionArr.join(".")
				},
				...pkg.releases
			]
			pkg.releases = releases;
		}else{
			pkg.releases = [...req.body.releases];
		}

		let result = {
			packages: packages
		};
    result = JSON.stringify(result);

		fs.writeFile(dataRoute, result, (err) => {
      if (err) throw err;
    });

    res.send("Done");
  });
});

app.delete("/api/package/:id", (req, res, next) => {
	fs.readFile(dataRoute, (err, data) => {
    if (err) throw err;
		const {packages} = JSON.parse(data);
		const pkgIndex = packages.findIndex(e => e.id === parseInt(req.params.id));
		packages.splice(pkgIndex, 1);
		let result = {
			packages: packages
		};
		result = JSON.stringify(result);
	
		fs.writeFile(dataRoute, result, (err) => {
			if (err) throw err;
		});
	
		res.send("Done");
	
	});
})
*/

