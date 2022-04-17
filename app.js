const express=require("express")
const app = express();
const path=require("path");
const sum=require("./converter");
const image=require("./image");
const html=require("./html");
const merge=require("./merge");
const delete_file=require("./delete");
var fs = require('fs');
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
    res.status(200).render("file.pug")
});
app.get("/image",(req,res)=>{
    res.status(200).render("image.pug")
});
app.get("/html",(req,res)=>{
    res.status(200).render("html.pug")
});
app.get("/about",(req,res)=>{
    res.send("This is my about page")
});
app.get("/merge",(req,res)=>{
    res.status(200).render("merge.pug");
});

app.get("/this",(req,res)=>{
    res.status(404).send("Error")
});

// app.post("/" ,(req,res)=>{
//     const file="document.docx";
//     sum.converter(`./files/${file}`,'anik.pdf');
//     res.status(200).send("success");
// })

app.post('/file',(req,res) =>{
    if (req.files){
        console.log(req.files)
        var file =req.files.myFile
        var filename=file.name
        file.mv('./files/'+filename, function(err){
            if(err){
                res.send(err)
            }else{
                sum.converter(`./files/${filename}`,`${filename}.pdf`);

            }
        })
        setTimeout(() => {
            res.status(200).redirect(`/static/${filename}.pdf`);
            delete_file.delete_file(`./files/${filename}`);
            }, 4000);
    }
})
app.post('/image',(req,res) =>{
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
                image.image(`./files/${filename}`,`${filename}.pdf`);
            }
        })
        
        setTimeout(() => {
            res.status(200).redirect(`/static/${filename}.pdf`);
            delete_file.delete_file(`./files/${filename}`);
            }, 4000);
            
    }
})
app.post('/html',(req,res) =>{
    if (req.files){
        console.log(req.files)
        var file =req.files.myFile
        var filename=file.name
        file.mv('./files/'+filename, function(err){
            if(err){
                res.send(err)
            }else{
                html.html(`./files/${filename}`,`${filename}.pdf`);
                // delete_file.delete_file(`./files/${filename}`);
            }
        })
        
        setTimeout(() => {
            res.status(200).redirect(`/static/${filename}.pdf`);
            delete_file.delete_file(`./files/${filename}`);
            }, 4000);
            
    }
})
app.post('/merge',(req,res) =>{
    if (req.files){
        console.log(req.files)
        var file1 =req.files.myFile1
        var file2 =req.files.myFile2
        var filename1=file1.name
        var filename2=file2.name
        file1.mv('./files/'+filename1, function(err){
            if(err){
                res.send(err)
            }
        })
        file2.mv('./files/'+filename2, function(err){
            if(err){
                res.send(err)
            }else{
                merge.merge(`./files/${filename1}`,`./files/${filename2}`,`./static/${filename1+filename2}.pdf`)
            }
        })
        
        setTimeout(() => {
            res.status(200).redirect(`/static/${filename1+filename2}.pdf`);
            delete_file.delete_file(`./files/${filename1}`);
            delete_file.delete_file(`./files/${filename2}`);
            }, 4000);
    }
})


app.listen(port,()=>{
    console.log(`The application started on ${port}`);
})
