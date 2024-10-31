const keyWordsRouter = require('express').Router();
const { KeyWord } = require('../../db/models')

keyWordsRouter.get('/:userId', async (req, res) => {
    const userId = 4;
  try {
    const keyWords = await KeyWord.findAll({where: {userId}});
    res.status(200).json(keyWords);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = keyWordsRouter;
