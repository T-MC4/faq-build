import {
  introVectorStore, offerVectorStore, midasVectorStore, precallVectorStore,
  settingVectorStore, trafficVectorStore, scalingVectorStore, managingVectorStore,
  arbVectorStore, faqVectorStore
} from './vectorStores'
import { ChainTool } from "langchain/tools";
// import { makeChain } from './makechain';
import { VectorDBQAChain } from "langchain/chains";
import { OpenAI } from 'langchain/llms/openai';

const model = new OpenAI({
  modelName: "gpt-4",
  temperature: 0,
  maxTokens: 600,
});

//create chain with an associated VectorStore
export const introQATool = new ChainTool({
  name: "airu-welcome-section-qa",
  description:
    "AirU Welcome Section QA - useful for when you need to ask questions about Air or getting started with Air",
  chain: VectorDBQAChain.fromLLM(model, introVectorStore),
  returnDirect: true,
});

export const offerQATool = new ChainTool({
  name: "airu-offer-section-qa",
  description:
    "AirU Offer Section QA - useful for when you need to ask questions about creating irresistible offers and scalable fulfillment.",
  chain: VectorDBQAChain.fromLLM(model, offerVectorStore),
  returnDirect: true,
});

export const midasQATool = new ChainTool({
  name: "airu-midas-section-qa",
  description:
    "AirU Midas Section QA - useful for when you need to ask questions about Air's Midas fintech product and the funding process",
  chain: VectorDBQAChain.fromLLM(model, midasVectorStore),
  returnDirect: true,
});

export const precallQATool = new ChainTool({
  name: "airu-precall-video-section-qa",
  description:
    "AirU Precall Video Section QA - useful for when you need to ask questions about creating appointment pre-call videos.",
  chain: VectorDBQAChain.fromLLM(model, precallVectorStore),
  returnDirect: true,
});

export const settingQATool = new ChainTool({
  name: "airu-appoint-booking-section-qa",
  description:
    "AirU Appointment Booking Section QA - useful for when you need to ask questions about appointment booking, setting, outbound dialing, sales scripts, sms/email automations, and the set team in general.",
  chain: VectorDBQAChain.fromLLM(model, settingVectorStore),
  returnDirect: true,
});

export const trafficQATool = new ChainTool({
  name: "airu-traffic-section-qa",
  description:
    "AirU Traffic Section QA - useful for when you need to ask questions about traffic and leads, whether it be paid ads, organic methods, affiliates, or referrals",
  chain: VectorDBQAChain.fromLLM(model, trafficVectorStore),
  returnDirect: true,
});

export const scalingQATool = new ChainTool({
  name: "airu-scaling-sales-teams-section-qa",
  description:
    "AirU Scaling Sales Teams Section QA - useful for when you need to ask questions about recruiting, hiring, and retaining sales rep talent.",
  chain: VectorDBQAChain.fromLLM(model, scalingVectorStore),
  returnDirect: true,
});

export const managingQATool = new ChainTool({
  name: "airu-managing-sales-teams-section-qa",
  description:
    "AirU Managing Sales Teams Section QA - useful for when you need to ask questions about managing sales teams, meetings, setter and closer projections, amd setter, closer, leadership daily SOPs.",
  chain: VectorDBQAChain.fromLLM(model, managingVectorStore),
  returnDirect: true,
});

export const arbQATool = new ChainTool({
  name: "airu-arbitrage-section-qa",
  description:
    "AirU Arbitrage Section QA - useful for when you need to ask questions about arbitraging fulfillment and creating a back-end for your business even if you are starting from scratch by using other people's products and services.",
  chain: VectorDBQAChain.fromLLM(model, arbVectorStore),
  returnDirect: true,
});

export const faqQATool = new ChainTool({
  name: "airu-faq-section-qa",
  description:
    "AirU FAQ Section QA - useful for when you need to ask questions about the Max dialer, the GoHighLevel (GHL) CRM, how Max and GHL integrate, and answers to common troubleshooting questions and bugs",
  chain: VectorDBQAChain.fromLLM(model, faqVectorStore),
  returnDirect: true,
});

