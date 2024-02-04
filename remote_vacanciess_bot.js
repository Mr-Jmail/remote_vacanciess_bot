const path = require("path")
require("dotenv").config({path: path.join(__dirname, ".env")})
const { Telegraf, Scenes, session } = require("telegraf")
const bot = new Telegraf(process.env.botToken)

const surveyScene = require("./surveyScene")
const editMessageScene = require("./editMessageScene")

const stage = new Scenes.Stage([surveyScene, editMessageScene])

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => ctx.scene.enter("surveyScene"));

bot.command("editMessage", ctx => {
    if(![1386450473, 6806895472, 6760582697].includes(ctx.from.id)) return
    ctx.scene.enter("editMessageScene")
})

bot.launch()