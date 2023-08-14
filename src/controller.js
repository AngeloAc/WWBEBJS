const openai = require('./config');
const { OpenAIModel } = require('./openAiModel')

// =====> Gerando directamente do openAI
const generateMessage = async (content)=>{
    try {
        
        const description = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [

                {
                    role: 'user',
                    content: content
                }

            ],
            max_tokens: 500
        })
        return description.data.choices[0].message.content;
    } catch (error) {
        return null
    }
}//====> FIM Gerando directamente do openAI









module.exports = { generateMessage };

