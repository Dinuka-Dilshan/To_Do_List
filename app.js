
const express = require("express");
const ejs = require("ejs");


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


let tasks = [];
let works = [];

app.get("/",(req,res)=>{

    let options = {
         weekday: 'long',
         day: 'numeric',
         month: 'long',
         year: 'numeric'
    }
    let day = new Date().toLocaleDateString("en-US", options);
    res.render(`index`,{
        date:day,
        tasks:tasks,
        title:`To Do List`,
        button:`toDoList`
    });
})

app.post("/",(req,res)=>{

    if(req.body.button === "toDoList"){
        tasks.push(req.body.newItem);
        res.redirect("/");
    }else if(req.body.button === "work"){
        works.push(req.body.newItem);
        res.redirect("/work");
    }
    
    console.log(req.body);
})

app.post("/work",(req,res)=>{
    console.log(req);
})



app.get("/work",(req,res)=>{
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
   }
    let day = new Date().toLocaleDateString("en-US", options);
    res.render("index",{
        date:day,
        tasks:works,
        title:`Work List`,
        button:`work`
    });
})


app.listen("3000",(res,req)=>{
    console.log("server started on port 3000");
})