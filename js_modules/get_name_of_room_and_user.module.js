

const get_username = () => {
    return localStorage.getItem("user_name")
}
const get_roomname = () => {
    return localStorage.getItem("room_name")
}

const get_userid = () => {
    return localStorage.getItem("chat_username")
}

export {get_username, get_roomname,get_userid}

