import { tool } from "@langchain/core/tools";
import * as z from "zod";

import { ChatOpenAI } from "@langchain/openai";
import {
    StateGraph,
    StateSchema,
    MessagesValue,
    ReducedValue,
    START,
    END,
} from "@langchain/langgraph";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { AIMessage, ToolMessage } from "@langchain/core/messages";


import dotenv from "dotenv";
dotenv.config();

// Define tools

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o",
});



const multiply = tool(async (a, b) => a * b, {
    name: "multiply",
    description: "Multiply two numbers",
    schema: z.object({
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
    }),
});


const add = tool(({ a, b }) => a + b, {
    name: "add",
    description: "Add two numbers",
    schema: z.object({
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
    }),
});

const divide = tool(({ a, b }) => a / b, {
    name: "divide",
    description: "Divide two numbers",
    schema: z.object({
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
    }),
});

const toolsByName = {
    [add.name]: add,
    [multiply.name]: multiply,
    [divide.name]: divide,
};

const MessagesState = new StateSchema({
    messages: MessagesValue,
    llmCalls: new ReducedValue(
        z.number().default(0),
        { reducer: (x, y) => x + y }
    ),
});



const tools = Object.values(toolsByName);
const modelWithTools = model.bindTools(tools);

const llmCall = async (state) => {
    const response = await modelWithTools.invoke([
        new SystemMessage(
            "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
        ),
        ...state.messages,
    ]);
    return {
        messages: [response],
        llmCalls: 1,
    };
};



const toolNode = async (state) => {
    const lastMessage = state.messages.at(-1);

    if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
        return { messages: [] };
    }

    const result = [];
    for (const toolCall of lastMessage.tool_calls ?? []) {
        const tool = toolsByName[toolCall.name];
        const observation = await tool.invoke(toolCall);
        result.push(observation);
    }

    return { messages: result };
};

const shouldContinue = (state) => {
    const lastMessage = state.messages.at(-1);

    // Check if it's an AIMessage before accessing tool_calls
    if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
        return END;
    }

    // If the LLM makes a tool call, then perform an action
    if (lastMessage.tool_calls?.length) {
        return "toolNode";
    }

    // Otherwise, we stop (reply to the user)
    return END;
};


const agent = new StateGraph(MessagesState)
    .addNode("llmCall", llmCall)
    .addNode("toolNode", toolNode)
    .addEdge(START, "llmCall")
    .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
    .addEdge("toolNode", "llmCall")
    .compile();

// Invoke
const result = await agent.invoke({
    messages: [new HumanMessage("add 4 and 5, then multiply the result by 10, then divide by 2")],
});

for (const message of result.messages) {
    console.log(`[${message.type}]: ${message.text}`);
}