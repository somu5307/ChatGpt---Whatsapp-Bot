const {Client} = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const { OpenAI } = require("openai");
require("dotenv").config()
const client = new Client();
client.on('qr',(qr) => {
  qrcode.generate(qr,{small:true})
})
client.on('ready',()=>{
  console.log("Client is ready");
})
client.initialize();

const openai = new OpenAI({ apiKey: "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" }); // Provide API key directly

async function runCompletion(message) {
  const completion = await openai.createCompletion({
    model : "text-davinci-003",
    prompt : message,
    max_tokens : 400,
  })
  return completion.data.choices[0].text;
}

client.on('message',message => {
  console.log(message.body);
  runCompletion(message.body).then(result => message.reply(result));
})

