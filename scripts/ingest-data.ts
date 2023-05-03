import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
// import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const run = async () => {
  try {
    const loader1 = new PDFLoader('docs/AirU/Section 1.pdf',
      { splitPages: false, });
    const loader2 = new PDFLoader('docs/AirU/Section 2.pdf',
      { splitPages: false, });
    const loader4 = new PDFLoader('docs/AirU/Section 4.pdf',
      { splitPages: false, });
    const loader5 = new PDFLoader('docs/AirU/Section 5.pdf',
      { splitPages: false, });
    const loader6 = new PDFLoader('docs/AirU/Section 6.pdf',
      { splitPages: false, });
    const loader7 = new PDFLoader('docs/AirU/Section 7.pdf',
      { splitPages: false, });
    const loader8 = new PDFLoader('docs/AirU/Section 8.pdf',
      { splitPages: false, });
    const loader9 = new PDFLoader('docs/AirU/Section 9.pdf',
      { splitPages: false, });
    const loaderArb = new PDFLoader('docs/AirU/Arbitrage Services - Minicourse.pdf',
      { splitPages: false, });
    const loaderFAQ = new PDFLoader('docs/Support/FAQ.pdf',
      { splitPages: false, });



    // const rawDocs = await directoryLoader.load();
    const rawDocs1 = await loader1.load();
    const rawDocs2 = await loader2.load();
    const rawDocs4 = await loader4.load();
    const rawDocs5 = await loader5.load();
    const rawDocs6 = await loader6.load();
    const rawDocs7 = await loader7.load();
    const rawDocs8 = await loader8.load();
    const rawDocs9 = await loader9.load();
    const rawDocsArb = await loaderArb.load();
    const rawDocsFAQ = await loaderFAQ.load();
    // console.log(rawDocs);

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const docs1 = await textSplitter.splitDocuments(rawDocs1);
    const docs2 = await textSplitter.splitDocuments(rawDocs2);
    const docs4 = await textSplitter.splitDocuments(rawDocs4);
    const docs5 = await textSplitter.splitDocuments(rawDocs5);
    const docs6 = await textSplitter.splitDocuments(rawDocs6);
    const docs7 = await textSplitter.splitDocuments(rawDocs7);
    const docs8 = await textSplitter.splitDocuments(rawDocs8);
    const docs9 = await textSplitter.splitDocuments(rawDocs9);
    const docsArb = await textSplitter.splitDocuments(rawDocsArb);
    const docsFAQ = await textSplitter.splitDocuments(rawDocsFAQ);
    // console.log('split docs', docs);

    /*create and store the embeddings in the vectorStore*/
    console.log('creating vector store...');
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index("airu-agent-sections")

    //embed the PDF documents

    await PineconeStore.fromDocuments(docs1, 
      embeddings,
      {
      namespace: "airu-welcome-section-qa", pineconeIndex: index,
      textKey: 'text',
      },
    );
    
    await PineconeStore.fromDocuments(docs2, 
        embeddings,
        {
        namespace: "airu-offer-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
    await PineconeStore.fromDocuments(docs4, 
        embeddings,
        {
        namespace: "airu-midas-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
    await PineconeStore.fromDocuments(docs5, 
        embeddings,
        {
        namespace: "airu-precall-video-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
    await PineconeStore.fromDocuments(docs6, 
        embeddings,
        {
        namespace: "airu-appoint-booking-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
    await PineconeStore.fromDocuments(docs7, 
        embeddings,
        {
        namespace: "airu-traffic-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
    await PineconeStore.fromDocuments(docs8, 
        embeddings,
        {
        namespace: "airu-scaling-sales-teams-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
    await PineconeStore.fromDocuments(docs9, 
        embeddings,
        {
        namespace: "airu-managing-sales-teams-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
    await PineconeStore.fromDocuments(docsArb, 
        embeddings,
        {
        namespace: "airu-arbitrage-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
    await PineconeStore.fromDocuments(docsFAQ, 
        embeddings,
        {
        namespace: "airu-faq-section-qa", pineconeIndex: index,
        textKey: 'text',
        },
    );
    
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();