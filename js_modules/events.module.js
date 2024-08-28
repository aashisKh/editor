import {
  handle_document_keydown,
  handle_document_click,
  handle_mouse_down,
  handle_mouse_move,
  handle_mouse_up,
  handle_key_input,
  handle_joined_user_list,
  handle_mouse_movement,
} from "./event_functions.module.js";
import {
  main_editor,
  lines_container,
  text_container,
} from "./global.module.js";
import { joined } from "./global.module.js";

const key_down_function = () => {
  document.addEventListener("keydown", handle_document_keydown);
};

const mouse_click = () => {
  document.addEventListener("click", handle_document_click);
};

const mouse_down = () => {
  document.addEventListener("mousedown", handle_mouse_down);
};

const mouse_move = () => {
  document.addEventListener("mousemove", handle_mouse_move);
};

const mouse_up = () => {
  document.addEventListener("mouseup", handle_mouse_up);
};

const key_input = () => {
  document.addEventListener("input", handle_key_input);
};

const joined_user_list = () => {
  joined.addEventListener("mousedown", handle_joined_user_list);
};

const mouse_movement = () => {
  window.addEventListener("mousemove", handle_mouse_movement);
};

const constraints = {
  'video' : true,
  'audio' : true
}

const get_user_media = async () => {
  async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

// Open camera with at least minWidth and minHeight capabilities
async function openCamera(cameraId, minWidth, minHeight) {
    const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
            'deviceId': cameraId,
            // 'width': minWidth,
            // 'height': minHeight
            }
        }

    return await navigator.mediaDevices.getUserMedia(constraints);
}

const cameras = await getConnectedDevices('videoinput');
if (cameras && cameras.length > 0) {
    // Open first available video camera with a resolution of 1280x720 pixels
   openCamera(cameras[0].deviceId, 300, 200)
   .then(stream => {
    const videoElement = document.querySelector('video#localVideo');
    videoElement.srcObject = stream;
   })
   .catch(err => {
   })

}
}


function handleTextSelection() {
  let selectionData;
  const selection = window.getSelection();
  // console.log(selection.toString().trim());
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    // 
    if (selection.anchorOffset > 0) {
      selectionData = {
        startOffset: range.endOffset,
        endOffset: range.startOffset,
        text: range.toString(),
      };
    } else {
      selectionData = {
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        text: range.toString(),
      };
    }
  }
}

// // Attach text selection event listener
document.addEventListener("mouseup", handleTextSelection);

document.addEventListener("mouseup", function() {
  var selection = window.getSelection();
  // console.log("Selected Text: " + selection.toString());
  for (var i = 0; i < selection.rangeCount; i++) {
      var range = selection.getRangeAt(i);
      // console.log(range)
      // console.log("Range " + i + ": " + range.toString());
      // 
      // 
  }
});

const get_current_element_index = (e) =>{
  return Array.from(text_container.children).indexOf(e.target)
}
let down = false
let all = []
let div = []
let s = []
let empty_divs = []
let is_visited =  {}
let prev = 0


text_container.addEventListener("mousedown", (e) => {
  down = true

  text_container.addEventListener("mousemove", (e) => {



    let id = get_current_element_index(e)


    if(down == true){


    }

    if(down && !all.includes(id)){
      all.push(id)
      // console.log(all)
      div.push(e.target)

    }



  })
})

text_container.addEventListener("mouseup", (e) => {
  down = false
  s = []
  all = []
  div = []

  // console.log(div)
})

// let is_left = true

const handle_select = () => {
  let divss = document.querySelectorAll(".editor_div")
// console.log(divss)

for(let i = 0; i < divss.length; i++){

  divss[i].onmouseleave = (e) => {
    let id = get_current_element_index(e)
    if(down && empty_divs.includes(id)){
      if(Object.keys(is_visited).length > 0){
        is_visited[id].left = true
      }
    }
  }

  divss[i].onmouseenter = (e) => {
    let id = get_current_element_index(e)
    if(down && empty_divs.includes(id)){
      let entered = is_visited[id].entered
      let left = is_visited[id].left
      if(entered && left) {
        e.target.style.borderLeft = "0px"
        text_container.children[id + 1].style.borderLeft = "0px"
        if(empty_divs[0] < empty_divs[1]){
          text_container.children[id + 1].style.borderLeft = "0px"
        }else{
          text_container.children[id - 1].style.borderLeft = "0px"
        }
      }
    }
    if(down && !all.includes(id)){
      if(e.target.innerText.length == 0){
        empty_divs.push(id)
        is_visited =  {...is_visited, [id]: {entered : true, left : false}}
        e.target.style.borderLeft = "5px solid green"
      }
    }
    
  }
}
}

// let over = false
// let selection_line = document.getElementById("selection_line")
// selection_line.style.left = `${text_container.offsetLeft}px`
// document.onmousedown = (e) => {
//     over = true
// }
// document.onmousemove = (e) => {
//     if(over == true){
//         let y = e.clientY
//         selection_line.style.height = `${y}px`
//     }
// }

// document.onmouseup = (e) => {
//     over = false
// }

window.onload = () => {
  localStorage.removeItem("room_name")
}

export {
  key_down_function,
  mouse_click,
  mouse_up,
  mouse_move,
  mouse_down,
  key_input,
  joined_user_list,
  mouse_movement,
  handle_select,
  get_user_media
};







