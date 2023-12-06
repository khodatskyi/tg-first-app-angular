import {Telegraf, Markup} from 'telegraf'
import {message} from 'telegraf/filters'

const token = '6801956273:AAFUe8uw-_iwp6Lp0StayYYYEFczF7LUrCk'
const webAppUrl = 'https://first-tg-app.web.app'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    ctx.reply('Здравствуйте, нажмите на кнопку ниже чтобы начать работу в нашем боте!',
    Markup.keyboard([
        Markup.button.webApp(
            'Відправити повідомлення',
            `${webAppUrl}/feedback`
        )
    ])
    )
})

bot.on(message('web_app_data'), async ctx => {
    const data = ctx.webAppData.data.json()
    ctx.reply(`Ваше повідомлення: ${data?.feedback}` ?? 'empty message')
})

bot.launch()