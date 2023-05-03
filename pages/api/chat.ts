import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'langchain/llms/openai';
// import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import {
  introQATool, offerQATool, midasQATool, precallQATool,
  settingQATool, trafficQATool, scalingQATool, managingQATool,
  arbQATool, faqQATool
} from '@/utils/vectorChainTools'
// import * as fs from "fs";
// import { VectorDBQAChain } from "langchain/chains";
// import { HNSWLib } from "langchain/vectorstores/hnswlib";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, history } = req.body;

  console.log('question', question);
  
  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');
  
  try {

    // const model = new OpenAI({ temperature: 0 });
    // /* Load in the file we want to do question answering over */
    // const text = fs.readFileSync("state_of_the_union.txt", "utf8");
    // /* Split the text into chunks */
    // const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    // const docs = await textSplitter.createDocuments([text]);
    // /* Create the vectorstore */
    // const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    // /* Create the chain */
    // const chain = VectorDBQAChain.fromLLM(model, vectorStore);

    const model = new OpenAI({ temperature: 0, modelName: "gpt-4" });
    const tools = [
      introQATool, 
      offerQATool,
      midasQATool, 
      precallQATool,
      settingQATool, 
      trafficQATool, 
      scalingQATool, 
      managingQATool,
      arbQATool, 
      faqQATool
    ];

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "zero-shot-react-description",
      verbose: true
    });
    console.log("Loaded agent.");

    const response = await executor.call({ 
      input: sanitizedQuestion,
    });
    console.log(response);
    console.log(`Got output ${response.output}`);
    console.log(response.output);

    res.status(200).json(response.output);

  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
