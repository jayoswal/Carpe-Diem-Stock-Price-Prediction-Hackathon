const express = require('express')
const api = require('stock-market-india/index')
const path = require('path')

var nse = api.NSE;
console.log(express)
const app =  express()
 console.log(api)
 console.log(__dirname)
 app.use("/styles",express.static(__dirname + "/styles"));
 
 app.use("/assets",express.static(__dirname + "/assets"))
 app.use("/images",express.static(__dirname + "/images"))
 app.set('view engine','ejs');

 app.get("/",(req,res,next)=>
 {
   res.sendFile(path.join(__dirname,'/index.html'))
 })

 app.get("/get_market_status", (req, res, next) => {
    nse.getMarketStatus()
      .then(function (response) {
        res.json(response.data);
      });
  });

  app.get("/get_gainers", (req, res, next) => {
    nse.getGainers()
      .then(function (response) {

        
       var data  = response.data.data
       console.log(data)
       res.render('home',{data : data})
        
      });
  });

  app.get("/nse/get_index_stocks", (req, res, next) => {
    nse.getIndexStocks(req.query.symbol)
      .then(function (response) {
          var data = response.data.data
          console.log(data)
        res.render('home',{data:data});
      });
  });


app.listen(5000,()=>
{
    console.log("Server is started ")
})