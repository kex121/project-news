const newsRouter = require('express').Router();
const axios = require('axios');
const { KeyWord } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');


newsRouter.get('/getnews', verifyAccessToken, async (req, res) => {
    try {
        const userId = res.locals.user.id;

        const keywords = await KeyWord.findAll({ where: { userId } });
        const positiveKeywords = keywords.filter(k => k.isGood).map(k => k.name);
        const negativeKeywords = keywords.filter(k => !k.isGood).map(k => k.name);

        const apiKey = '6c5faca79b434d42b987b39ddc99050c'
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
            publishedAt: article.publishedAt || 'Дата неизвестна'
        }));

        const sortedNews = filteredNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        res.json({ news: sortedNews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении новостей' });
    }
});

module.exports = newsRouter;