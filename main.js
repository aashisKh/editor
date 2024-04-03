let join = document.getElementById("join")


join.onclick = async (e) => {
    e.preventDefault()
    let username = document.getElementById("username").value
    if(username.length == 0 || username == " "){
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
            }, 5000);
         }

       
    }
}