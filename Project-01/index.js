import OpenAI from "openai";
import readlineSync from "readline-sync"
const OPEN_AI_KEY = "Your API KEY"

const client = new OpenAI({
    apiKey: OPEN_AI_KEY
})

// Tools

function getWeaterhData(city = "") {
    switch (city.toLowerCase()) {
        case "delhi":
            return "20 dgree "
        case "mohali":
            return "60 dgree "
        default:
            return "everything is good"
    }


}

const SYSTEM_PROMPT = ` You are ai assistent with START , PLAN,  ACTION , OBSERVATION and OUTPUT state. Plan with available tools after plan take the action with appropreate tool and wait for observation with action once you get the observation return the AI responce based on START promt and observation,  `



const msg = [
    { role: "system", content: SYSTEM_PROMPT },
]

async function chat() {

    while (true) {

        const query = readlineSync.question("USER >>")

        const q = { role: "user", content: query }

        msg.push({ role: "user", content: JSON.stringify(q) })

        while (true) {
            const res = await client.chat.completions.create(
                {
                    model: "gpt-4",
                    messages: msg,
                    response_format: { type: "json_object" }

                }
            )

            const result = res.choices[0].message.content

            msg.push({ role: "assistent", content: result })

            const call = JSON.parse(result)

            if (call.type === "output") {
                console.log("BOT RES: >> " + call.output)
                break
            }
        }
    }

}

chat()



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// const userInput = "What is the weather of delhi?"

// async function clientChat() {
//     const result = await client.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//             { role: "system", content: SYSTEM_PROMPT },
//             { role: "user", content: userInput }
//         ]
//     })

//     console.log(result.choices[0].message.content)

// }

// clientChat()

// const data = getWeaterhData("delhi")

// console.log(data)

// const userInput = "What is the weather of delhi?"

// client.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "user", content: userInput }]
// }).then((msg) => {
//     console.log(msg.choices[0].message.content)
// })



