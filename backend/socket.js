const socketIo = require("socket.io");
const UserModel = require("./model/User");


const connected_user_lists = new Map();
const all_user_mouse_event_movement = new Map();
const handle_user_browser_interaction = new Map();
const joined_users_username_list = new Map();
const set_initial_dom_loaded = new Map();
const reserved_element_list = new Map();

const get_key = (v) => {
  for (let [key, value] of connected_user_lists) {
    if (value.id == v) {
      return key;
    }
  }
};

const load_user_saved_data = async (user_id, collaboration) => {
  const user = await UserModel.findById(user_id);
  if (collaboration) {
    return user.html_data;
  } else {
    return user;
  }
};

const get_all_connected_user_list = (id) => {
  const obj = {};

  for (let [key, value] of joined_users_username_list) {
    if (key.toString() !== id.toString()) {
      obj[key] = value;
    }
  }
  return obj;
};

let data_list = {};



const handle_save_document = async (socket, data) => {
  const user = await UserModel.findById(data.user);
  if (user) {
    if (user.html_data.length > 0) {
      const update = await UserModel.findByIdAndUpdate(
        data.user,
        {
          html_data: data.outer_html,
        },
        { new: true }
      );
    } else {
      const save = await UserModel.create({ html_data: outer_html });
    }
  }
};

const handle_reserve_element = (data) => {
  if (!reserved_element_list.get(data.index)) {
    reserved_element_list.set(data.index, data.element);
  }
};

const handle_release_reserve = (index) => {
  try {
    reserved_element_list.delete(index);
  } catch (e) {
    ;
  }
};

const handle_collaborative_editing_request = (socket, user) => {
  const user_socket = connected_user_lists.get(user.to);
  if (user_socket != null) {
    // socket.to(user_socket).emit("incoming_collaborative_request",(user.from))
    user_socket.emit("incoming_collaborative_request", user.from);
  }
};

const initialize_socket = (server) => {
    const io = socketIo(server, {
        transport: ["Websocket"],
        cors: {
          origin: "*",
        },
      });


      io.use(async (socket, next) => {
        const { user_id, user_name } = JSON.parse(socket.handshake.query.token);
        connected_user_lists.set(user_id, socket);
        joined_users_username_list.set(user_id, user_name);
        const user_data = await load_user_saved_data(user_id, false);
      
        const all_user_list = get_all_connected_user_list(user_id);
        data_list.old_data = user_data.html_data;
        data_list.user_list = all_user_list;
      
        socket.user_id = user_data._id;
        socket.username = user_data.username;
      
        next();
      });

      io.on("connection", (socket) => {
        socket.broadcast.emit("new_user_logged", socket.username);
      
        socket.emit("initialize", data_list);
      
        socket.on("save_document", (data) => {
          socket.join(data.room_name)
          handle_save_document(socket, data);
        });
      
        socket.on("request_collaborative_editing", (user) => {
          handle_collaborative_editing_request(socket, user);
        });
      
        socket.on("user_accepted_collaboration", async (data) => {
          const { user_name, accepted_user, id } = data;
          const accepted_user_socket = connected_user_lists.get(accepted_user);
          if (accepted_user_socket) {
            const load_own_data = await load_user_saved_data(id, true);      
            accepted_user_socket.emit("accepted_collaboration_editing", {
              user_name,
              load_own_data,
            });
      
          }
        });
      
        socket.on("reserve", (data) => {
          handle_reserve_element(data);
      
          socket.to(data.room_name).emit("reserve_element", data);
        });
      
        socket.on("release_reserve", (data) => {
          socket.to(data.room_name).emit("release_reserved_element", data);
          handle_release_reserve(data.index);
        });
      
        socket.on("join_collaborative_room",(data) => {  
          socket.join(data.room_name)
          let soc = connected_user_lists.get(data.id)
          console.log('all users',io.sockets.adapter.rooms)
          socket.to(data.room_name).emit("new_user_joined_to_room", data.id)
        })
      
        socket.on("typing", (data) => {    
          socket.to(data.room_name).emit("user_typing",data)
        })
      
        socket.on("load_spinner",(data) => {
          const accepted_user_socket = connected_user_lists.get(data);
          accepted_user_socket.emit("show_loading_spinner",(data))
      
        })
      
        socket.on("Backspace",(data) => { 
          socket.to(data.room_name).emit("backspace_pressed",(data))
        })
      
        socket.on("Enter",(data) => {  
          console.log('enter pressed', data)
          socket.to(data.room_name).emit("enter_pressed", (data))
        })
        
        socket.on("ArrowDown",(data) => {
          console.log(data)
          socket.to(data.room_name).emit("arrow down pressed",data)
        })
        socket.on("ArrowUp",(data) => {
          socket.to(data.room_name).emit("arrow up pressed",data)
        })
      
        socket.on("mousemove", (data) => {
          socket.to(data.room_name).emit("mouse_moved",data)
        })
      
        socket.on("click", (data) => {
        })
      });
      
}





module.exports = {initialize_socket}