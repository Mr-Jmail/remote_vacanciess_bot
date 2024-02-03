const { Scenes } = require("telegraf")
const { getMessage } = require("./functions")

module.exports = new Scenes.WizardScene("surveyScene", 
    async ctx => {
        await ctx.reply(getMessage(1)).catch(err => console.log(err))
        await ctx.reply(getMessage(2)).catch(err => console.log(err))
        return ctx.wizard.next()
    },
    ctx => {
        ctx.reply(getMessage(3)).catch(err => console.log(err))
        return ctx.wizard.next()
    },
    ctx => {
        ctx.reply(getMessage(4)).catch(err => console.log(err))
        return ctx.scene.leave()
    }
)
