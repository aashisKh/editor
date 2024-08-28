let register = document.getElementById("register")
let login = document.getElementById("login")

let pattern = /^\d/

register.onclick = async (e) => {
    e.preventDefault()
    let username = document.getElementById("r_username").value
    if(username.length == 0 || username == " " || pattern.test(username)){
        alert("enter username!!")
    }else{
///api/save_users
        const save_user = await fetch("http://localhost:8000/api/save_users" , 
         {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name : username})
         })
         const saved_data = await save_user.json()
         if(saved_data.error){
            alert("Username already exists")
         }else{
            alert(saved_data.message)
            window.localStorage.setItem("chat_username" , saved_data.id)
            window.localStorage.setItem("user_name", username)
            setTimeout(() => {
               window.location.href = "./client.html"
            }, 1000);
         }

       
    }
}

login.onclick = async (e) => {
   e.preventDefault()
   let username = document.getElementById("l_username").value
   if(username.length == 0 || username == " " || pattern.test(username)){
       alert("enter username!!")
   }else{
///api/login
       const save_user = await fetch(`http://localhost:8000/api/login?user=${username}`)
        const saved_data = await save_user.json()
        if(saved_data.error){
           alert(saved_data.error)
        }else{
           alert(saved_data.message)
           window.localStorage.setItem("chat_username" , saved_data.id)
           window.localStorage.setItem("user_name", username)
         //   window.localStorage.setItem("room_name", username)
           setTimeout(() => {
              window.location.href = "./client.html"
           }, 1000);
        }

      
   }
}