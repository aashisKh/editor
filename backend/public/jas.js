let join = document.getElementById("submit")
let u_name = document.getElementById('name')
let socket = io()
socket.on('connect' , (sockets) => {
   console.log("fine")
   socket.on("message" , (message) => {
      console.log(`${message}`)
   })
   socket.on("new_message" , (message) => {
      console.log(`${message}`)
   })
})
let user = 'current_user'

alert("rrr")



join.onclick = (e) => {
   e.preventDefault()
   localStorage.setItem(user , u_name.value)
   
   window.location= './login.html'
}