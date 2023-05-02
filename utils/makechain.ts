import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
In your response, include your own question followed by the answer to the question at the end.

Here are some examples of user questions and just the first sentence of the AI response:
  User: How do I create a great offer?
  AI: Can you recall any great offers you've seen recently?

  User: How do I scale a sales team?
  AI: Are you currently in the process of scaling your own sales team?

  User: How do I scale my lead flow?
  AI: What kinds of traffic strategies have you tried so far?

  User: I'm confused with how Max works...
  AI: It's a new tool so that's understandble - What confuses you specifically?

If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new OpenAI({
    temperature: 0, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
    // streaming: true
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
  {
      questionGeneratorTemplate: CONDENSE_PROMPT,
      qaTemplate: QA_PROMPT,
      // returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
