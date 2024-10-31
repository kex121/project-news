const keyWordsRouter = require('express').Router();
const { KeyWord } = require('../../db/models')

keyWordsRouter.get('/:userId', async (req, res) => {
    const userId = res.locals.user.id;
  try {
    const keyWords = await KeyWord.findAll({where: {userId}});
    res.status(200).json(keyWords);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = keyWordsRouter;
