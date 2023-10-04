const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { Chroma } = require('langchain/vectorstores/chroma');
const { OpenAI } = require('langchain/llms/openai');
const { ConversationChain, ConversationalRetrievalQAChain } = require('langchain/chains');
const { TextLoader } = require('langchain/document_loaders/fs/text');
const User = require('./models/user');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv').config();
const { MemoryVectorStore } = require("langchain/vectorstores/memory");

class OpenAIModel {
    constructor(id) {

        const parent = path.resolve(__dirname, '..');
        const parent1 = path.resolve(parent, '..');
        const parent2 = path.resolve(parent1, '..');

        this.openAI_KEY = process.env.OPENAI_API_OI
        this.modelName = "gpt-3.5-turbo";
        this.language = 'pt';
        this.temperature = 1;
        this.id = id
        this.fileLoader = new TextLoader(parent2 +'/' + this.id + '/file.txt');  // Carregar o arquivo txt....
        // this.fileLoader = new TextLoader('./file.txt'); 
        this.fileContents = '';

        this.model = new OpenAI({
            modelName: this.modelName,
            openAIApiKey: this.openAI_KEY,
            temperature: this.temperature,
            language: this.language
        });

    }

    async generateMessage(message) {
        //   await this.script("64d25277bffb9fb211fcb3bb"); // pegando do banco de dados o script

        this.fileContents = await this.fileLoader.load();
        console.log(this.fileContents)
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: this.openAI_KEY,
            language: this.language
        });

        // const vectorDB = await Chroma.fromDocuments(this.fileContents, embeddings, {});
        const vectorDB = await MemoryVectorStore.fromDocuments(this.fileContents, embeddings)
        const questionchain = ConversationalRetrievalQAChain.fromLLM(this.model, vectorDB.asRetriever(), {
            language: 'pt'
        });

        const response = await questionchain.call({ question: message, chat_history: "" });
        return response.text
    }

    async generateDirectFromOpenAI(message) {

        const response = await this.model.call(message);
        return response
    }

    async script(id) {
        const user = await User.findById({ _id: id });

        fs.writeFile('src/file.txt', user.script[0].text, 'utf8', (err) => {
            if (err) {
                console.error(`Erro ao escrever o arquivo "file.txt": ${err.message}`);
                return;
            }
            console.log('Parágrafo adicionado com sucesso na linha específica!');
        });

        return;
    }

}

module.exports = { OpenAIModel } 