const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4: uuidv4}=require('uuid');
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
let posts=[
    {
        id:uuidv4(),
        username : "apnacollege",
        content : "I love coding!"
    },
    {
        id:uuidv4(),
        username : "shraddhakhapra",
        content : "Hardwork is important to get success!"
    },
    {
        id:uuidv4(),
        username : "parthPathak",
        content : "I got selected for my first internship!"
    },
];

app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/post",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/post");
});
app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    console.log()
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/post");
   console.log("patch request working");
})
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs");
})
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!=p.id);
    console.log("delete sucess");
    res.redirect("/post");
})
app.listen(port,()=>{
    console.log("listening to port : 8080")
});