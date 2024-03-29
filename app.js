const express = require("express");
const request =  require("request");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=>{
    console.log(req.body.email+" "+req.body.firstName+" "+req.body.lastName );
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const mail = req.body.email;
    const data ={
        members:[
            {
                email_address: mail,
                status:"subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    var jasonData = JSON.stringify(data);
    const url = "https://us22.api.mailchimp.com/3.0/lists/38dfeb9b25";
    const options = {
        method:"POST",
        auth: "prathamesh:af37e63cb745849fd3628a31af617dd-us22"

    }
    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
            
        })

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        
    }) 
    request.write(jasonData);
    request.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Server is running at 3000");
})



//API Key
// af637e63cb745849fd3628a31af617dd-us22

// List ID
// 38dfeb9b25