const newsRouter = require('express').Router();
const axios = require('axios')
const xml2js = require('xml2js');

newsRouter.get('/getnews', async (req, res) => {
    try {
        const rssUrl = 'https://ria.ru/export/rss2/archive/index.xml';
        const { data: rssData } = await axios.get(rssUrl);
        const json = await xml2js.parseStringPromise(rssData, { mergeAttrs: true });
        const newsItems = json.rss.channel[0].item;
        


    } catch (error) {
        console.log(error);

    }
})

module.exports = newsRouter