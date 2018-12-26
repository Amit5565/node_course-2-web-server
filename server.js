var express=require('express');
var app=express();
var hbs=require('hbs');

var port=process.env.PORT || 4000;
hbs.registerPartials(__dirname+"/views/partials");
var fs=require('fs');
app.set("view engine","hbs");
app.use(express.static(__dirname+"/public"));
hbs.registerHelper("getCurrentYear",()=>{
  return new Date().getFullYear();
})

hbs.registerHelper("screamer",(text)=>{
  return text.toUpperCase();
})


app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now},${req.method},${req.url}`;
  console.log(log);
  fs.appendFile("server.log",log +'\n',(err)=>{
    if(err){
      console.log("Error in appending file");
    }
  });
   next();
})

app.use((req,res,next)=>{
  console.log("Going to maintanence page");
  res.render("maintainance");
})
app.get("/",(req,res)=>{
  res.render("home",{
    title:"Home Page",
    message:"Welcome My Friend"
  })
})

app.get("/about",(req,res)=>{
  res.render("about",{title:"About Page"});
})
app.listen(port,()=>{
  console.log("App is running on "+port);
})
