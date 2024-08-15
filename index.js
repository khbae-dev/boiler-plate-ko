const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require('./config/key');
const cookieParser = require('cookie-parser');


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.post('/register', (req, res) => {
    const user = new User(req.body)

    const result = user.save().then(() => {
        res.status(200).json({
        success: true
        })
    }).catch((err) => res.json({sucess: false, err}))
})

app.post('/api/users/login', (req, res) => {
  //요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email })
  .then(target => {
    if(!target){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."          
      })
    }

    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
    target.comparePassword(req.body.password , (err, isMatch) => {
      if(!isMatch){
        return res.json({ 
          loginSuccess: false, 
          message: "비밀번호가 틀렸습니다."
        })
      }

      //비밀번호가 맞다면 토큰을 생성한다.
      target.generateToken((err, user) => {
        if(err) {
          return res.status(400).send(err);
        }
        //토큰을 저장한다. 쿠키, 로컬
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id})
      })
    })
  })
  .catch((err) => {
    return res.status(400).send(err);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})