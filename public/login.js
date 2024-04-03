let user = 'current_user'
let user_socket = 'socket'
var socket_obj = {}
let fire = document.getElementById("fire")
// let connected_users = document.querySelector(".connected_users")



// const add_new_user = (id) => {
    
//     let new_user = document.createElement("div")
//     new_user.classList.add('user')
//     new_user.setAttribute('data-id' , id)

//     let image = document.createElement("div")
//     image.classList.add('image')

//     let add_user = document.createElement("button")
//     add_user.textContent = "Add Friend"

//     new_user.appendChild(image)
//     new_user.appendChild(add_user)
//     connected_users.appendChild(new_user)
// }

// console.log(localStorage.getItem(user))

// if(localStorage.getItem(user) == null){
//     let socket = io()
// socket.on('connect' , (m) => {

//     console.log("called")
    
//         socket.emit('logged_in_user' , localStorage.getItem(user))

//         socket.on('get_old_users' , (message) =>{
//             connected_users.innerHTML = null
//             console.log("The old users are " , message)
//             JSON.parse(message).forEach((user) => {
//                 add_new_user(user)
//             })
//         })
//     })
// }


// window.onload = ()=>{
    
    
// }



// const socket = io();

// socket.on('connect', () => {
//   console.log('Connected to server');
//   const storedSocketId = localStorage.getItem(user);

//   if (storedSocketId) {
//     // Reconnect using the stored socket ID
//     const reconnectedSocket = io({
//       query: { socketId: storedSocketId },
//     });

//     reconnectedSocket.on('connect', () => {
//       console.log('Reconnected to server');
//     });

//     reconnectedSocket.on('message', (message) => {
//       console.log(`Received (Reconnected): ${message}`);
//     });

//     reconnectedSocket.on('receive' , (msg) => {
//         console.log(msg)
//     })
//   } else {
//     // Store the socket ID in local storage
//     localStorage.setItem(user, socket.id);
//   }

//   // Send a message to the server
//   socket.emit('message', 'Hello, server!');
// });

// socket.on('message', (message) => {
//   console.log(`Received: ${message}`);
// });


if(localStorage.getItem(user_socket) == null){
  
  let socket = io()
  socket_obj.socket = socket
  socket.on('connect' , () => {
    console.log(socket.id)
    localStorage.setItem(user_socket , socket.id)
  })
  let user_detail = {
    user : localStorage.getItem(user),
    user_socket : localStorage.getItem(user_socket)
  }
  socket.emit('new_user_joined' , JSON.stringify(user_detail))

  
}else{
  console.log(socket_obj)
}

fire.onclick = () => {
  alert("rrrr")
}
