
const mongoose = require("mongoose")

const User_Schema = new mongoose.Schema({
    username :  { type: String, required: true },
    html_data : { type: String,default : `
                                        <div id="text_container">
                                        <div class="editor_div" contenteditable="true" data-index="0"> abc</div>
                                        </div>
                                        `},
    new_user : {type : Boolean, default : true}
})

const UserModel = mongoose.model("User" , User_Schema)

module.exports = UserModel