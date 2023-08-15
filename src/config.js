const { Configuration, OpenAIApi }  = require('openai');
const configuration = new Configuration({
    apiKey: OPENAI_API_OI
});

const openai = new OpenAIApi(configuration);


module.exports = openai;
