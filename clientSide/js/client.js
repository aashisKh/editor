

const ws = new WebSocket("ws://localhost:3000/ws")
ws.onopen = function() {
    console.log("running")
    ws.send("Message to send");
    alert("Message is sent...");
 };
 ws.onmessage = function (evt) { 
    var received_msg = evt.data;
    alert("Message is received...");
 };