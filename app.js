const express=require("express")
const app = express();
const path=require("path");
const sum=require("./converter");
const file_val=require("./try");
app.use(express.urlencoded());
const upload = require('express-fileupload');
app.use(upload());
// let url=req.url;
// const converter=require('./converter');

const port=80;

//set the template engine
app.set('view engine','pug');

//set the directory
app.set('views',path.join(__dirname,'views'))

app.use('/static',express.static('static'))


app.get("/",(req,res)=>{
    res.status(200).render('index.pug')
});
app.get("/file",(req,res)=>{
    res.status(200).render("home.pug")
});
app.get("/about",(req,res)=>{
    res.send("This is my about page")
});

app.get("/this",(req,res)=>{
    res.status(404).send("Error")
});

// app.post("/" ,(req,res)=>{
//     const file="document.docx";
//     sum.converter(`./files/${file}`,'anik.pdf');
//     res.status(200).send("success");
// })

app.post('/',(req,res) =>{
    if (req.files){
        console.log(req.files)
        var file =req.files.myFile
        var filename=file.name
        console.log(filename);
        console.log(filename)
        file.mv('./files/'+filename, function(err){
            if(err){
                res.send(err)
            }else{
                sum.converter(`./files/${filename}`,`${filename}.pdf`);
                // res.send("File uploaded")
            }
        })
        
        setTimeout(() => {
            res.status(200).redirect(`/static/${filename}.pdf`);
            }, 5000);
            
    }
})


app.listen(port,()=>{
    console.log(`The application started on ${port}`);
})
