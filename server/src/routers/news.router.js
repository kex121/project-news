const newsRouter = require('express').Router();
const axios = require('axios')
const xml2js = require('xml2js');
const { KeyWord } = require('../../db/models')
const { verifyAccessToken } = require('../middleware/verifyToken');


newsRouter.get('/getnews', async (req, res) => {
    try {
        const userId = 4;

        
        const keywords = await KeyWord.findAll({ where: { userId } });
        const positiveKeywords = keywords.filter(k => k.isGood).map(k => k.name);
        const negativeKeywords = keywords.filter(k => !k.isGood).map(k => k.name);

        
        const rssUrl = 'https://ria.ru/export/rss2/archive/index.xml';

        
        const { data: rssData } = await axios.get(rssUrl);
        const json = await xml2js.parseStringPromise(rssData, { mergeAttrs: true });
        const newsItems = json.rss.channel[0]?.item || [];

        
        const filteredNews = newsItems.filter(item => {
            const title = item.title?.[0] || '';
            const description = item.description?.[0] || ''; 
            const content = `${title} ${description}`;

            
            const containsPositive = positiveKeywords.some(word => content.includes(word));
            const containsNegative = negativeKeywords.some(word => content.includes(word));

            return containsPositive && !containsNegative;
        }).map(item => {
            
            const title = item.title?.[0] || 'Без заголовка';
            const link = item.link?.[0] || '#';
            const imageUrl = item.enclosure?.[0]?.$.url || '';  

            return {
                title,
                description: item.description?.[0] || 'Без описания',
                link,
                imageUrl
            };
        });

        console.log("Отфильтрованные новости с изображениями и ссылками:", filteredNews);
        res.json({ news: filteredNews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении новостей' });
    }
});


module.exports = newsRouter