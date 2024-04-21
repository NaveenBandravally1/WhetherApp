const { log } = require('console');
const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));



app.listen(8080,()=>{
    console.log(`Server is running.........`)
});

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/',(req,res)=>{
    const query = req.body.cityName;
    const apikey = 'd1845658f92b31c64bd94f06f7188c9c';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apikey+'&units=metric'
    https.get(url,(response)=>{
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const name = weatherData.name;
            res.write("<h1>Whether in "+ name +" is " +temp+ " with " +description+"</h1>");
        })
        
    })   
})

