const keyWordsRouter = require('express').Router();
const { KeyWord } = require('../../db/models');

keyWordsRouter.get('/:userId', async (req, res) => {
    // const userId = 4;

  const userId = res.locals.user?.id;
  try {
    const keyWords = await KeyWord.findAll({ where: { userId } });
    res.status(200).json(keyWords);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

keyWordsRouter.post('/', async (req, res) => {
  const userId = res.locals.user.id;
  try {
    const { name, isGood } = req.body;
    const newKeyWord = await KeyWord.create({
      name,
      isGood,
      userId: userId
    })
    res.status(201).json(newKeyWord);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

keyWordsRouter.delete('/:id', async (req, res) => {
  try {
    const keyWord = await KeyWord.findByPk(req.params.id)
    await keyWord.destroy();
    res.status(200).json({ message: 'Слово успешно удалено'});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = keyWordsRouter;
