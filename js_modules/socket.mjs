

const user_id = window.localStorage.getItem("chat_username")
const user_name = window.localStorage.getItem("user_name")

const socket = io("http://localhost:8000",{
  transports: ['websocket'],
  withCredentials: true,
  query : {
    token : JSON.stringify({user_id,user_name})
  }
});
export default  socket