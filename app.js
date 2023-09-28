const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const { log } = require("console");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req ,res){
    res.sendFile(__dirname +"/index.html")
})
app.post("/" ,function(req , res){
    const query=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=4209f74de8c66cf2f6131083a582e5aa";
    https.get(url , function(response){
        console.log(response.statusCode);
        response.on("data" , function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icons=weatherData.weather[0].icon;
            const imgurl="https://openweathermap.org/img/wn/"+icons+"@2x.png";
            res.write("<p> The currently weather is  "+weatherDescription+"  <p/>");
            res.write("<h1>The temperature in "+ query+"  "+temp+ "  celcius degree</h1>");
            res.write("<img src=" +imgurl +">")
            res.send();
        });
    });
})






app.listen(3000 ,function(){
console.log("The server is runing on port 3000!!!");
});