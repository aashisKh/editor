import {main_editor, lines_container, text_container } from "./global.module.js"
import socket from "./socket.mjs";
import {handle_collaborative_editing_request} from  "./socket_events.module.js"
import {get_username, get_roomname,get_userid} from "./get_name_of_room_and_user.module.js"

let  selection = window.getSelection()
let is_mouse_down = false
let reserved_element_list = []
const room_name = get_roomname();
let is_current_user_moving_mouse = false
let check_still_user_typing
let selected_div = []
let currently_active_element
let previous_active_element

const handle_focus = (index,indicator) => {
  text_container.children[index + indicator].focus()
  text_container.children[index].classList.remove("focus_div")
  text_container.children[index + indicator].classList.add("focus_div")
  lines_container.children[index].classList.remove("focus_numbers")
  lines_container.children[index + indicator].classList.add("focus_numbers")
}

const update_indexes = (index) => {
  previous_active_element = index
  currently_active_element = index + 1
}

const focus_next_sibling = (e) => {
    if(e.target.nextSibling){
        const index = get_current_element_index(e)
        previous_active_element = index
        currently_active_element = index + 1
      if((e.target.parentElement.children.length - 1) != index){

        socket.emit("ArrowDown",{index,room_name:get_roomname()})
        handle_focus_element_click(previous_active_element, currently_active_element)
        handle_focus(index,1)
        // previous_active_element = index 
      }
     }
     main_editor.scrollTop = main_editor.scrollHeight;
  }
  
  const focus_before_sibling = (e) => {
    const index = get_current_element_index(e)
    if(index > 0){
      socket.emit("ArrowUp",{index,room_name:get_roomname()})
      previous_active_element = index
      currently_active_element = index - 1
      handle_focus_element_click(previous_active_element, currently_active_element)
      handle_focus(index,-1)
    }
  }
  
  const get_current_element_index = (e) =>{
    return Array.from(e.target.parentElement.children).indexOf(e.target)
  }

  const get_current_element_index_from_parent_element = (target) => {
    return Array.from(text_container.children).indexOf(target)
  }

  const handle_backspace = (e) => {
  
    if(selection.anchorOffset == 0 ){
        const index = get_current_element_index(e)
        if(index != 0){
            e.target.parentElement.removeChild(e.target)
            lines_container.removeChild(lines_container.children[index])
            reserved_element_list.splice(reserved_element_list.indexOf(index), 1)
            socket.emit("Backspace",{room_name,index})
            lines_container.children[index - 1].classList.add("focus_numbers")
            let text = e.target.textContent
            text_container.children[index - 1].focus()
            const text_length =  text_container.children[index - 1].textContent.length
            text_container.children[index - 1].textContent += text
            if(text_length > 0){
              let range = document.createRange()
              range.setStart(text_container.children[index - 1].childNodes[0], text_length);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
            }

          }
          update_line_numbers(index)
    }
  }

  const update_line_numbers = (index) => {
    for(let i = index; i < lines_container.children.length; i++){
      lines_container.children[i].textContent = (i + 1)
    }
  }

  const make_new_numbers = (current_line) => {
    const line = lines_container.children.length
    const span = document.createElement("span");
    span.setAttribute("class", "lines");
    span.innerText = text_container.children.length;
    
    if(current_line != 0){
      span.textContent = current_line + 1
      lines_container.insertBefore(span,lines_container.children[current_line]);
    }else{
      span.textContent = line+1
      lines_container.appendChild(span)
    }
    update_line_numbers(current_line + 1)
  };

  const append_new_line_in_end = (index,text) => {
    console.log('apped', index)
    document.scrollTop = document.scrollHeight
    const element_count = text_container.children.length - 1

    const div = document.createElement("div")
    div.setAttribute("contenteditable", "true");
    div.setAttribute("class", "editor_div");
    div.textContent = text
  
    if(index != text_container.children.length - 1){
      text_container.insertBefore(div,text_container.children[index + 1])
      make_new_numbers(index)
    }else{
      text_container.appendChild(div)
      make_new_numbers(0)
    }
    handle_focus(index,1)
    document.scrollTop = document.scrollHeight
  }

  const handle_enter_keydown = (e) => {
    e.preventDefault()
    const anchor_offset = selection.anchorOffset
    const text = selection.anchorNode.textContent.substring(anchor_offset)
    e.target.innerText = (selection.anchorNode.textContent.substring(0,anchor_offset))
    let index = get_current_element_index(e)
    if(get_roomname()){

      const enter_data_list = {
        index,text,room_name,anchor_offset
      }
  
      socket.emit("Enter",enter_data_list)
    }
    append_new_line_in_end(index,text)

  }

  const handle_document_keydown = (e) => {
    
    if(e.target.dataset.reserved === "true"){
      alert("this is reserved your cannot edit")
      e.preventDefault()
      return
    }

    if(e.key == 'Enter'){
      handle_enter_keydown(e)
    }
    if(e.key == 'ArrowDown'){
        focus_next_sibling(e)
    }
    if(e.key == 'ArrowUp'){
        focus_before_sibling(e)
    }
    if(e.key == 'Backspace'){
        handle_backspace(e)
    }
  
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();


    const outer_html = text_container.outerHTML;
    socket.emit("save_document", { outer_html, user:get_userid() });
  }

  }

  const handle_focus_element_click = (previous,current) => {
    // lines_container.children[current].classList.add('focus_numbers')
    if(previous != undefined){
      text_container.children[previous].classList.remove('focus_div')
      lines_container.children[previous].classList.remove('focus_numbers')
    }
    
    previous_active_element = current
  }

  const handle_document_click = (e) => {

    if(e.target.getAttribute("class") === 'editor_div'){
      currently_active_element = get_current_element_index(e)
      
      lines_container.children[currently_active_element].classList.add('focus_numbers')
      handle_focus_element_click(previous_active_element,currently_active_element)
    }
    
  }

  const handle_mouse_down = () => {
    is_mouse_down = true;
  }

  const handle_mouse_move = (e) => {
    if (is_mouse_down == true) {

      let selected_div_index = get_current_element_index(e)
      if(is_mouse_down == true && !selected_div.includes(selected_div_index)){
        selected_div.push(e.target)
      }

      let child = text_container.children;
      for (let i = 0; i < child.length; i++) {
        child[i].blur();
        child[i].contentEditable = false;
      }



    }
  }

  const handle_mouse_up = () => {
    is_mouse_down = false;
    let child = text_container.children;
    for (let i = 0; i < child.length; i++) {
      child[i].contentEditable = true;
    }
  }

  const handle_key_input = (e) => {
    const room_name = localStorage.getItem("room_name")
    clearInterval(check_still_user_typing)
    let index = get_current_element_index(e)
    const data = e.target.innerText
    // e.target.setAttribute("data-reserved", "true")
    if(!reserved_element_list.includes(index)){
      
      reserved_element_list.push(index)
      let obj = {
        index : index,
        element : e.target.outerHTML,
        room_name:room_name
      }
      socket.emit("reserve", obj)
    }

    socket.emit("typing",{data,room_name,index,user_name:get_username()})


    check_still_user_typing = setTimeout(() => {
      
      reserved_element_list.splice(reserved_element_list.indexOf(index), 1)
      socket.emit("release_reserve", {room_name,index,user_name : get_username()})
    },1000)

  }

  socket.on("user_typing",(data) => {
    console.log('user typing', data)
    document.getElementById("cursor_pointer").innerHTML = data.user_name + ' is typing'
    
    text_container.children[data.index].textContent = data.data

  })

  const handle_joined_user_list = (e) => {
    if(e.target.tagName == "LI"){
      const user_id = e.target.getAttribute("data-id")
      e.target.children[0].classList.add("move_arrow")
      handle_collaborative_editing_request(user_id)
  }



  }

  const handle_mouse_movement = (e) => {
   if(localStorage.getItem('room_name') != null){
     let x = e.clientX;
     let y = e.clientY;
     is_current_user_moving_mouse = true
     socket.emit("mousemove", {
       x_pos: x,
       y_pos: y,
       user:get_userid(),
       user_name: get_username(),
       room_name : get_roomname(),
     });
   }
  

  }

  export {
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
    handle_mouse_movement,
    update_indexes
  }






