const path = require("path");
const fs = require("fs")

const messagesFilePath = path.join(__dirname, "messages.json")

function getMessage(messageNumber = "all") {
    var messages = JSON.parse(fs.readFileSync(messagesFilePath, "utf-8") )
    return messageNumber == "all" ? messages : messages[messageNumber - 1]
}

function editMessage(messageNumber, newText) {
    var messages = getMessage()
    messages[messageNumber - 1] = newText
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 4), "utf-8")
}

module.exports = { getMessage, editMessage }