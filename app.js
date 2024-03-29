
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post("/", function(req, res){
    const fName = req.body.fname;
    const lName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/3a1eb37689";

    const options = {
        method: "POST",
        auth: "abzaidi11:c4bbb02f3f840096b46c56e13f223cfd-us18"
    }
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure.html", function(req, res){
    res.redirect("/");
});

app.post("/success.html", function(req, res){
    res.redirect("/");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Running");
});

