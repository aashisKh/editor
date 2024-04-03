// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const path = require("path");
// const { fchownSync } = require('fs');
// const { Session } = require('inspector');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const {sessionMiddleware , wrap} = require('./middleware')
// app.use(express.static('public'));

// let connectedUSers = {}
// let current = ''
// let counter = 0
// const setSession = (req , res , next)=> {
//   counter++
//   req.session.user = {
//     name : `ram${counter}`,
//     age : "2022"
//   }
//   console.log("this is midleware")
//   next()
// }
// app.use(sessionMiddleware)

// app.get("/" ,setSession, (req , res) => {
  
//   // io.use(wrap(sessionMiddleware))
// io.use((socket , next) => {
//   socket.user = {id: 'ABCDEFGH'}
//   next()
// })  
//   io.on('connection' , (socket) => {
//     console.log('connected' , socket.user)

//       io.to(socket.user.id).emit("message" , "message from another user")
    
//   })
//   res.sendFile(__dirname + '/public/index1.html');

// })

// // io.use(wrap(sessionMiddleware))



// server.listen(5001, () => {
//   console.log('Server is runnings');
// });

const UserModel = require("./model/User")
const express = require('express');
const cors = require("cors")
const app = express()
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server , {
  transport : ['Websocket'],
  cors: {
    origin: "*"
  },
});

app.use(express.json())
app.use(cors({
  origin : "*"
}))

app.get( "/api/users", async(req ,res) => {
  const get_all_users = await UserModel.find({} , {username : 0})
  res.json(get_all_users)
})
app.post("/api/save_users" , async(req , res) => {
  const user = req.body.name
  const check_user_exists = await UserModel.find({username : user})
  console.log("the user is " , check_user_exists.length)
  if(check_user_exists.length > 0){
    res.json({error : "user already exists"})
  }else{
  const saved_user = await UserModel.create({username : user})
  res.json({message : "you are successfully registered" , id : saved_user._id})
  }
  // console.log("body" , user)

}) 
const mongoose = require("mongoose")
const connect_to_db = ()=>{
  mongoose.connect("mongodb://localhost:27017/ChatApp")
  .then(d => {
    console.log("connected to db")
  })
  .catch(err => {
    console.log("the error is" , err)
  })
}
connect_to_db()

const connected_user_lists = new Map()
const all_user_mouse_event_movement = new Map()


const get_key = (v) => {
  for (let [key, value] of connected_user_lists) {
    console.log(key , value);
    if(value == v){
        return key
    }
  }
  }


io.on("connection" , socket =>{
  // console.log("user connected " , socket.id)

  socket.on("user_joined" , (data) => {
    console.log(data , socket.id)
    connected_user_lists.set(data.name , socket.id)
    // console.log("users list is as " , connected_user_lists)
    // if( !connected_user_lists.get(data.name)) {
    //   socket.broadcast.emit("create_new_user_cursor" , data)
    // } 
      socket.broadcast.emit("create_new_user_cursor" , data)

  })





  socket.on("mouse_moved_by_user" , (data) => {
    // console.log(data)
    all_user_mouse_event_movement.set(data.user , JSON.stringify(data))

    socket.broadcast.emit("mouse_moved_by_other_user" , all_user_mouse_event_movement.get(data.user))
  })

  socket.on("user_pressed_button", (data) => {
    socket.broadcast.emit("mouse_pressed", data)
  })


  socket.on("user_reloaded_page", (data) => {
    console.log(data.user + "reloaded the page")
    console.log("map after page reload" , connected_user_lists)
  })

  socket.on("typing_on_input_box", (typed_data) => {
    socket.broadcast.emit("other_user_typing", typed_data)
  })

  socket.on("user_left_document", (user_left_id) => {
    socket.broadcast.emit("user_is_away", user_left_id)
  })

  socket.on("disconnect" , () => {
   const user = get_key(socket.id)
   console.log("map userbefore disconnect" , connected_user_lists)
   console.log("disconnected user is " , user)
   connected_user_lists.delete(user)
 
   console.log("map userdisconnect" , connected_user_lists)
    
  })

 

})

server.listen(8000)

