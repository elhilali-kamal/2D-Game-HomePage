
const express = require('express')
const app = express()

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

app.use(express.static('home'))
app.use(express.json())


app.get('/download', function(req, res){
    const file = `${__dirname}/home/game/ZombieChase.rar`;
    res.download(file);
  });

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/home/index.html')
})

app.post('/',(req,res)=>{
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'email',
            pass:'pass',
            
        }

    })

    const mailOptions = {
        from:req.body.email,
        to:'email',
        subject:'Message from : ' + req.body.email,
        text:req.body.message
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
            res.send('error')
        }
        else {
            console.log('Email sent ' + info.response);
            console.log(req.body.email)
            res.send('success')
        }
    })
})

app.listen(PORT,()=>{
    console.log('Server running in port' ,PORT)
})