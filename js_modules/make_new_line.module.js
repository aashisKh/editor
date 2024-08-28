
import {main_editor,text_container,lines_container,users_list} from './global.module.js'




const make_new_numbers = (total_lines) => {
    const line = lines_container.children.length
    const span = document.createElement("span");
    span.setAttribute("class", "lines");
    span.innerText = (line + 1);
    lines_container.appendChild(span);
  
  };

const make_new_line = (number_to_make_lines, data) => {
    const div = document.createElement("div");
    if (data) {
      div.textContent = data;
    }
    div.setAttribute("contenteditable", "true");
    div.setAttribute("class", "editor_div");
    text_container.appendChild(div);
    make_new_numbers()
  };

const logged_user = () => {
  
}
  export {make_new_line}