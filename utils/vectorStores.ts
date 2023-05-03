import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';

/*create and store the embeddings in the vectorStore*/
const embeddings = new OpenAIEmbeddings();
const index = pinecone.Index("airu-agent-sections")

//embed the PDF documents
export const introVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-welcome-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const offerVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-offer-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const midasVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-midas-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const precallVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-precall-video-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const settingVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-appoint-booking-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const trafficVectorStore = await PineconeStore.fromExistingIndex( 
    embeddings,
    {
    namespace: "airu-traffic-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const scalingVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-scaling-sales-teams-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const managingVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-managing-sales-teams-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const arbVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-arbitrage-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);

export const faqVectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
    namespace: "airu-faq-section-qa", pineconeIndex: index,
    textKey: 'text',
    },
);