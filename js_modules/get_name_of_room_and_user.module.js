const get_username = () => {
  return window.localStorage.getItem("user_name");
};
const get_roomname = () => {
  const room_name = window.localStorage.getItem("room_name");
  if (room_name) return room_name;
};

const get_userid = () => {
  return window.localStorage.getItem("chat_username");
};

export { get_username, get_roomname, get_userid };
