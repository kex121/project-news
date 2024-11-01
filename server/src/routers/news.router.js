const newsRouter = require('express').Router();
const axios = require('axios');
const { KeyWord } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');


newsRouter.get('/getnews', async (req, res) => {
    try {
        const userId = res.locals.user?.id;

        const keywords = await KeyWord.findAll({ where: { userId } });
        const positiveKeywords = keywords.filter(k => k.isGood).map(k => k.name);
        const negativeKeywords = keywords.filter(k => !k.isGood).map(k => k.name);

        const apiKey = '23e9accf640748b9bd8941eacd47f686';
        const url = `https://newsapi.org/v2/everything?language=ru&q=${positiveKeywords.join(' OR ')}&apiKey=${apiKey}`;

        const { data } = await axios.get(url);

        const filteredNews = data.articles.filter(article => {
            const content = `${article.title} ${article.description || ''}`;
            const containsNegative = negativeKeywords.some(word => content.includes(word));
            return !containsNegative;
        }).map(article => ({
            title: article.title || 'Без заголовка',
            description: article.description || 'Без описания',
            link: article.url,
            imageUrl: article.urlToImage || '',
            publishedAt: article.publishedAt || 'Дата неизвестна'  // Adding the published date
        }));

        res.json({ news: filteredNews });
    } catch (error) {
        console.error(error);
        console.log(error)
        res.status(500).json({ error: 'Ошибка при получении новостей' });
    }
});

module.exports = newsRouter;
