import socket from "./socket.mjs";
import {collaborative} from "./global.module.js"
import {make_new_line} from "./make_new_line.module.js"
import {main_editor,text_container,lines_container,loader} from './global.module.js'
import {
    handle_document_keydown, 
    handle_document_click,
    handle_mouse_down,
    handle_mouse_move,
    handle_mouse_up,
    handle_key_input,
    handle_joined_user_list,
    update_line_numbers,
    append_new_line_in_end,
    handle_focus,
    update_indexes
  } from './event_functions.module.js'
  import {create_new_user_cursor} from "./create_mouse.module.js"
  import {get_username, get_roomname,get_userid} from "./get_name_of_room_and_user.module.js"

  let  selection = window.getSelection()



const user_name = localStorage.getItem("user_name")
const id = localStorage.getItem("chat_username")

const handle_collaborative_editing_request = (user) => {
    socket.emit("request_collaborative_editing", {from:{user_name,id}, to: user})
}

const handle_accept_request = async (e) => {
    const accepted_user = e.target.parentElement.getAttribute("data-id")
    localStorage.setItem("room_name",user_name)
    const user = localStorage.getItem("chat_username");
    const outer_html = text_container.outerHTML;

     socket.emit("save_document", { outer_html, user, room_name : get_roomname() });
     socket.emit("load_spinner",accepted_user)
     setTimeout(() => {
        socket.emit("user_accepted_collaboration",{user_name,accepted_user,id})
     },2000)
     
}



const handle_incoming_collaborative_request = (user) => {

    const li = document.createElement("li")
    const accept = document.createElement("span")
    const reject = document.createElement("span")

    li.textContent = user.user_name
    li.setAttribute("data-id",user.id)

    accept.setAttribute("class","accept")
    accept.textContent = 'Accept'
    accept.addEventListener("click", handle_accept_request)

    reject.setAttribute("class","reject")
    reject.textContent = 'Reject'

    li.appendChild(accept)
    li.appendChild(reject)
    collaborative.appendChild(li)


}


const handle_accepted_collaboration_editing = (data) => {

    loader.style.display = "none"
    const room_name = data.user_name
    console.log(data)
    socket.emit("join_collaborative_room",{room_name,id})
    text_container.innerHTML = ""
    lines_container.innerHTML = ""
    const element = document.createElement("div");
    element.innerHTML = data.load_own_data;
    const ele_children = element.children[0].children;
    for (let i = 0; i < ele_children.length; i++) {
      const text = ele_children[i].innerText;
      make_new_line(1, text);
    }
    localStorage.setItem("room_name",room_name)

}
















socket.on("incoming_collaborative_request", (data) => {
    handle_incoming_collaborative_request(data)
})

socket.on("accepted_collaboration_editing", (data) => {
    console.log("accepted collab")
    handle_accepted_collaboration_editing(data)
})

socket.on("new_user_joined_to_room",(data) => {
    console.log("new user joined",data)
})

socket.on("show_loading_spinner", (data) => {
    loader.style.display = "block"
})

socket.on("backspace_pressed",(data) => {

    lines_container.removeChild(lines_container.children[data.index])
    text_container.removeChild(text_container.children[data.index])
    update_line_numbers(data.index)

})

socket.on("reserve_element", (data) => {
    console.log('reserve', data)
    text_container.children[data.index].setAttribute("data-reserved", "true")
  })

socket.on("release_reserved_element", (data) => {
    
    document.getElementById("cursor_pointer").innerHTML = data.user_name
    text_container.children[data.index].removeAttribute("data-reserved")
  })

socket.on("enter_pressed",(data) => {
    console.log('enter pressed')
const {index, text,anchor_offset} = data
const inner_text = text_container.children[index].textContent
text_container.children[index].innerText = inner_text.substring(0,anchor_offset)
append_new_line_in_end(index,text)

})

socket.on("arrow down pressed",data => {
    
    handle_focus(data.index,+1)
    update_indexes(data.index)
})
socket.on("arrow up pressed",data => {
    handle_focus(data.index,-1)
    update_indexes(data.index)
})

socket.on("mouse_moved", (data) => {
  create_new_user_cursor(data);
  
  let { x_pos, y_pos, user } = data;
  let cursor = document.getElementById(user);
  cursor.style.left = `${x_pos-5}px`;
  cursor.style.top = `${y_pos - 10}px`;
})


socket.on("i joined",(data) => {
    console.log(data)
})


export {handle_collaborative_editing_request}








