const { Scenes } = require("telegraf");
const { getMessage, editMessage } = require("./functions");

module.exports = new Scenes.WizardScene("editMessageScene", 
    async ctx => {
        ctx.scene.session.state.messageNumber = ""
        var messages = getMessage()
        var i = 1
        await ctx.reply("Вот список всех сообщений:").catch(err => console.log(err))
        for (var message of messages) {
            await ctx.reply(`Сообщение номер ${i++}:`).catch(err => console.log(err))
            await ctx.reply(message).catch(err => console.log(err))
        }
        await ctx.reply("Выберите какое сообщение хотите редактировать", {reply_markup: {inline_keyboard: genNumberKeyboard(messages.length)}}).catch(err => console.log(err))
        return ctx.wizard.next()
    },
    ctx => {
        if(ctx?.callbackQuery?.data == "cancelEditting") {
            ctx.reply("Редактирование вопросов отменено").catch(err => console.log(err))
            return ctx.scene.leave()
        }
        if(!ctx?.callbackQuery?.data.includes("messageNumber")) return ctx.reply("Выберите одну из кнопок").catch(err => console.log(err))
        ctx.scene.session.state.messageNumber = ctx.callbackQuery.data.replace("messageNumber", "")
        ctx.reply("Введите текст нового сообщения", {reply_markup: {inline_keyboard: [[{text: "Назад", callback_data: "toPreviousStep"}]]}}).catch(err => console.log(err))
        return ctx.wizard.next()
    },
    ctx => {
        if(ctx?.callbackQuery?.data == "toPreviousStep") return ctx.wizard.back()
        if(ctx?.callbackQuery?.data == "toFirstStep") return ctx.scene.reenter()
        if(!ctx?.message?.text) return ctx.reply("Дайте ответ текстом", {reply_markup: {inline_keyboard: [[{text: "Назад", callback_data: "toPreviousStep"}]]}}).catch(err => console.log(err))
        ctx.reply(`Текст сообщения успешно изменен на "${ctx.message.text}"`, {reply_markup: {inline_keyboard: [[{text: "Назад", callback_data: "toFirstStep"}]]}}).catch(err => console.log(err))
        editMessage(ctx.scene.session.state.messageNumber, ctx.message.text)
    }
)

function genNumberKeyboard(amountOfMessages) {
    const keyboard = []
    var currentArray = [];

    for (var i = 1; i <= amountOfMessages; i++) {
        currentArray.push({text: i, callback_data: `messageNumber${i}`});

        if (currentArray.length == 2 || i === amountOfMessages) {
            keyboard.push([...currentArray]);
            currentArray = [];
        }

    }
    keyboard.push([{text: "Отмена", callback_data: "cancelEditting"}])
    return keyboard
}