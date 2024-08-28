import {main_editor,text_container,lines_container,users_list,user_name_logo,user_name,joined} from './global.module.js'
import {make_new_line} from "./make_new_line.module.js"
import { handle_select } from './events.module.js'


const list_all_joined_users = (user_list) => {

    for(let user in user_list){
        const li = document.createElement("li")
        const span = document.createElement("span")
        span.setAttribute("class","right_arrow")
        span.innerHTML = '&#129050';
        li.setAttribute("data-id",user)
        li.textContent = user_list[user]
        li.appendChild(span)
        joined.appendChild(li)

    }
}

const initialize = (data) => {
    list_all_joined_users(data.user_list)
    text_container.innerHTML = ""
    lines_container.innerHTML = ""
  
    const current_user = localStorage.getItem("user_name")
    user_name_logo.textContent = current_user[0].toUpperCase()
    user_name.textContent = current_user
    
    const element = document.createElement("div");
    element.innerHTML = data.old_data;
    const ele_children = element.children[0].children;
  
    for (let i = 0; i < ele_children.length; i++) {
      const text = ele_children[i].innerText;
      
      make_new_line(1, text);
    }
    handle_select()
};

  export {initialize}