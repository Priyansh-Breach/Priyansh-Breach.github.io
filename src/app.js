const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./db/conn");
 
const {MongoClient} = require('mongodb');
  const uri = "mongodb+srv://priyansh:priyansh@cluster0.3g3qs.mongodb.net/test?authSource=admin&replicaSet=atlas-vv5c4y-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(uri);

const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "/public" );
app.use(express.static(staticPath));
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", async (req, res) => {
	//console.log(req.body);
    try{
        const password = req.body.password;
        const registerUser = {
            username: req.body.username,
            email: req.body.email,
            password: password
        };
		await client.connect();
			 try {
				await client.connect();
					const result = await client.db("sampleDB").collection("registers").insertOne(registerUser);
					if(result){
                        res.sendFile("./index.html");
					}
			} catch (e) {
				console.error(e);
			} finally {
				await client.close();
			}
    }
    catch{
        res.status(400).send("registration failed");
    }
})

app.get("/login", (req, res) => {
    try{
        const password = req.body.password;
        const username = req.body.username;
        if (password === 'admin' & username === 'admin')
        {
            res.render("/");
        }
        else{
            res.send("Invalid Credentials");
        }
    }catch{
        res.status(400).send("registration failed");
    }
});


app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})