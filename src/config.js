const { Configuration, OpenAIApi }  = require('openai');
const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);


module.exports = openai;
