
let indicator = document.getElementById("indicator")

const create_new_user_cursor = (data) => {
  // 
  let { user , user_name } = data;
  if (
    document.getElementById(user) == null ||
    document.getElementById(user) == undefined
  ) {
      let div = document.createElement("div");
      const sup = document.createElement("span")
      const span = document.createElement("span")

    span.innerHTML = `&#129053;`
    span.setAttribute("class" , "rotate")
    sup.setAttribute("id", "cursor_pointer")

    sup.appendChild(indicator)
    sup.innerText = user_name 
    sup.setAttribute("class", "sup")
    div.setAttribute("class", "cursor");
    div.setAttribute("id", user);
    div.appendChild(span)
    div.appendChild(sup)
    document.body.appendChild(div);
  }
};


export {create_new_user_cursor}