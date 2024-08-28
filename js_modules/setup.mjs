import socket from "./socket.mjs";

import {key_down_function,mouse_click,mouse_up,mouse_move,mouse_down,key_input,joined_user_list,mouse_movement,get_user_media} from './events.module.js'
import {initialize} from "./initialize.module.js"


key_down_function()
mouse_click()
mouse_down()
mouse_move()
mouse_up()
key_input()
joined_user_list()
mouse_movement()
// get_user_media()
socket.on("connect", () => {
  const user_id = window.localStorage.getItem("chat_username")
  const user_name = window.localStorage.getItem("user_name")
  socket.emit("join_room", {user_name,user_id})
});


socket.on("initialize", initialize);

socket.on("new_user_joined",(msg) => {
})


socket.on("new_user_logged", (new_user) => {
})

socket.on("collaborative_request", (data) => {

})
