const express =  require("express");
const bodyPaser = require("body-parser");
const mysql = require("mysql");
const env =  require("dotenv")
require('dotenv').config()
const app = express();


app.use(bodyPaser.json())

const connectDB = mysql.createConnection({
    host:process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    multipleStatements:true
})

connectDB.connect((err)=>{
    if(!err){
        console.log("database connected successfully");
    }
    else{
        console.log(err);
    }
})



app.get("/" , (req,res)=>{
    res.send("home api");
})


app.post("/create" , (req,res)=>{
    const {name ,age ,country}= req.body;
    connectDB.query("INSERT INTO employees (name,age,country) VALUES (?,?,?)" , [name ,age,country] , (err,result)=>{
     if(!err) res.send("values insered");
     else console.log(err);
    })
})

app.get("/employees" , (req,res)=>{
    connectDB.query("SELECT * from  employees" , (result,err)=>{
        if(!err){
            res.send(row)
        }
        else{
            console.log(err);
        }
    })
    
})
app.delete("/delete/:name"  , (req,res)=>{
    const name =  req.params.name;
    const mysqldelete =  "DELETE  FROM  employees WHERE name = ? "
    connectDB.query(mysqldelete, name,(err,result)=>{
        if(!err){
            console.log("your data deleted ");
        }
        else{
            console.log(err);
        }

    })
})


app.put("/update" , (req,res)=>{
    const namename = req.body.name;
    const cntry = req.body.country
    const mysqlUpdate =  " UPDATE  employees SET name = ? WHERE country = ? "
    connectDB.query(mysqlUpdate,[namename,cntry] ,(err,result)=>{
        if(!err) console.log("data updated" );
        console.log(err);
    })
   
})

app.listen(5000,()=>{
    console.log("sever has been started");
})