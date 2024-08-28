let chat_username;
let client_name 
(async function () {
  chat_username = window.localStorage.getItem
  ("chat_username");
  client_name = window.localStorage.getItem("user_name")

  if (!chat_username) {
    window.location.href = "./main.html";
  } else {
    const res = await fetch("http://localhost:8000/api/users");
    const data = await res.json();
  }
})();


// let is_current_user_moving_mouse = false

// let text_editor = document.getElementById("text_editor")

// const button_click_event = () => {
//     socket.emit("user_pressed_button", { user: chat_username });
//     alert(chat_username)
// };

// const socket = io("http://localhost:8000",{
//   query : {
//     token : chat_username
//   }
// });

// socket.on("connect", () => {
//   // ;
//   const chat_username = window.localStorage.getItem("chat_username");
//   socket.emit("user_joined", { name: chat_username });
// });

// const create_new_user_cursor = (data) => {
//   // ;
//   let { user , user_name } = JSON.parse(data);
//   if (
//     document.getElementById(user) == null ||
//     document.getElementById(user) == undefined
//   ) {
//       let div = document.createElement("div");
//       const sup = document.createElement("span")
//       const span = document.createElement("span")

//       span.innerHTML = `&#129053;`
//       span.setAttribute("class" , "rotate")

//     sup.innerText = user_name
//     sup.setAttribute("class", "sup")
//     ;
//     div.setAttribute("class", "cursor");
//     div.setAttribute("id", user);
//     div.appendChild(span)
//     div.appendChild(sup)
//     document.body.appendChild(div);
//   }
// };

// let is_alert_pending = false;

// window.onmousemove = (e) => {
//   let x = e.clientX;
//   let y = e.clientY;
//   // ;

//   is_current_user_moving_mouse = true
//   // 

//   socket.emit("mouse_moved_by_user", {
//     x_pos: x,
//     y_pos: y,
//     user: chat_username,
//     user_name : localStorage.getItem("user_name")
//   });
// };

// const mouse_moved_by_other_user = (data) => {
//   create_new_user_cursor(data);
//   let { x_pos, y_pos, user } = JSON.parse(data);
//   let cursor = document.getElementById(user);
//   // ;

//   cursor.style.left = `${x_pos-5}px`;
//   cursor.style.top = `${y_pos - 10}px`;
// };

// const mouse_pressed = (data) => {
//   is_alert_pending = true;
//   alert(data.user);
// };
// window.addEventListener("unload", function (event) {
//   // document.body.removeChild(document.getElementById(chat_username))  
//   socket.emit("user_reloaded_page", { user: chat_username });
// });

// // text_editor.oninput = (e) => {
// //     const input_data = e.target.value
// //     const input_id = e.target.id
// //     
// //     socket.emit("typing_on_input_box",{typed_data : input_data , id : input_id})
// // }

// // text_editor.onresize = (e) => {
// //     alert("rrr")
// // }

// // run function when user type in the input box

// const other_user_typing = (data) => {
//     const {typed_data , id} = data
//     if(document.getElementById(id) != null){
//         document.getElementById(id).value = typed_data
//     }
// }

// // run function when the user is away from document
// const user_is_away = (user_id) => {
//     const {user} = user_id
//     const child_to_remove = document.getElementById(user)
//     if(child_to_remove != null){
//         document.body.removeChild(child_to_remove)
//     }
// }

// socket.on("mouse_moved_by_other_user", mouse_moved_by_other_user);
// socket.on("mouse_pressed", mouse_pressed);
// socket.on("other_user_typing", other_user_typing)
// socket.on("user_is_away", user_is_away)
// socket.on("load_initial_document", (data) => {
//   // 
// })







// document.onmouseleave = (e) => {
//     is_current_user_moving_mouse = false
//     setTimeout(() => {
//         if(is_current_user_moving_mouse == false){
//             socket.emit("user_left_document", {user : chat_username})
//         }
//     } , 5000)
// }

// document.onmouseenter = (e) => {
//     is_current_user_moving_mouse = true
// }




//     // Function to handle text selection
//     function handleTextSelection() {
//       var selectedText = window.getSelection().toString().trim();
//       if (selectedText !== '') {
//         // ;
//         // Run your desired function here with the selected text
//       }
//     }

//     // Event listener for mouseup event
//     document.addEventListener('mouseup', handleTextSelection);