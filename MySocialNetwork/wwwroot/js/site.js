var connection = new signalR.HubConnectionBuilder().withUrl("/HomeMessander").build();
var usersentmsg = 0;

connection.on("ReceiveMessage", function (user, message) {
    const messageContainer = document.getElementById("message-container");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    const usernameDiv = document.createElement("a");
    usernameDiv.href = "/";
    usernameDiv.classList.add("username");
    usernameDiv.textContent = user;

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
    textDiv.textContent = message;

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time");
    const now = new Date();
    const timeString = now.toLocaleTimeString(); // Получение текущего времени
    timeDiv.textContent = timeString;

    messageDiv.appendChild(usernameDiv);
    messageDiv.appendChild(textDiv);
    messageDiv.appendChild(timeDiv);
    messageContainer.appendChild(messageDiv);

    connection.invoke("AllMsg").then(function (msgCount) {
        document.getElementById("allsentMsg").textContent = "All sent msgs: " + msgCount.toString();
    });
});

connection.on("NewUserInChat", function (user) {
    const messageContainer = document.getElementById("message-container");

    if (user != "" && user != null) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("newUser");

        messageDiv.textContent = user + " - Joined the Chat";

        messageContainer.appendChild(messageDiv);
    }
});

connection.start();

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").className;
    var message = document.getElementById("messageInput").value;

    if (message.trim() != "" && user.trim() != "") {
        usersentmsg++;
        document.getElementById("userSentMsg").textContent = "You sent msgs: " + usersentmsg.toString();
        connection.invoke("SendMessage", user, message);
        document.getElementById("messageInput").value = "";
        event.preventDefault();
    }
    else
        alert("Enter text in message");
});

const paragraph = document.querySelector(".hover-paragraph");

paragraph.addEventListener("mouseenter", () => {
    const randomColor = getRandomColor();
    paragraph.style.color = randomColor;
});

// Функция для генерации случайного цвета в формате "#RRGGBB"
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
