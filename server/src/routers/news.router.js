const newsRouter = require('express').Router();
const axios = require('axios')
const xml2js = require('xml2js');
const { KeyWord } = require('../../db/models')
const { verifyAccessToken } = require('../middleware/verifyToken');


newsRouter.get('/getnews', verifyAccessToken, async (req, res) => {
    try {
        const userId = req.user.id; // временно заданный userId для проверки

        // Получение ключевых слов пользователя
        const keywords = await KeyWord.findAll({ where: { userId } });
        const positiveKeywords = keywords.filter(k => k.isGood).map(k => k.name);
        const negativeKeywords = keywords.filter(k => !k.isGood).map(k => k.name);

        // Запрос к RSS и преобразование XML в JSON
        const rssUrl = 'https://ria.ru/export/rss2/archive/index.xml';
        const { data: rssData } = await axios.get(rssUrl);
        const json = await xml2js.parseStringPromise(rssData, { mergeAttrs: true });
        const newsItems = json.rss.channel[0]?.item || [];

        // Фильтрация новостей
        const filteredNews = newsItems.filter(item => {
            const title = item.title?.[0] || '';
            const description = item.description?.[0] || '';
            const content = `${title} ${description}`;

            // Проверка на положительные и отрицательные ключевые слова
            const containsPositive = positiveKeywords.some(word => content.includes(word));
            const containsNegative = negativeKeywords.some(word => content.includes(word));

            return containsPositive && !containsNegative;
        });

        // Вывод в консоль для проверки
        console.log("Отфильтрованные новости:", filteredNews);

        res.json({ news: filteredNews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении новостей' });
    }
});

module.exports = newsRouter