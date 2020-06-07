'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const {
  FILE_NAME,
  MAX_DESCRIPTION_LENGTH,
  MAX_OFFER_AMOUNT,
  DEFAULT_COUNT,
  PictureRestrict,
  SumRestrict,
  OfferType,
} = require(`../../constants`);

const {
  shuffleArray,
  getRandomInt,
  getRandomItemFrom,
  checkNumber,
  readContent,
  splitString,
} = require(`../../utils`);

const getPictureFileName = (number) => {
  return number < 10
    ? `item0${number}.jpg`
    : `item${number}.jpg`;
}

const generateOffers = (count, titles, categories, sentences) => (
  [...Array(count)].map(() => ({
    category: [getRandomItemFrom(categories), getRandomItemFrom(categories)],
    description: shuffleArray(sentences).slice(0, MAX_DESCRIPTION_LENGTH).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: getRandomItemFrom(titles),
    type: getRandomItemFrom(Object.keys(OfferType)),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  async run(count) {
    // Вынес проверку вверх, так как если некорректное число
    // нет смысла читать контент из файлов и что-то уже генерировать.
    const countOffer = checkNumber(count, DEFAULT_COUNT);

    if (countOffer > MAX_OFFER_AMOUNT) {
      return console.log(chalk.red(`Не больше 1000 объявлений`));
    }


    // Расширил рамки try/catch так-как ошибка может быть и во время чтения файлов
    try {
      // Создание промисов для чтения файлов
      const sentencesPromise = readContent(FILE_SENTENCES_PATH);
      const titlesPromise = readContent(FILE_TITLES_PATH);
      const categoriesPromise = readContent(FILE_CATEGORIES_PATH);

      // Ждем ресолв всех файлов и отдаем и на генерацию оферов
      const [titles, categories, sentences] = await Promise
        .all([titlesPromise, categoriesPromise, sentencesPromise]);

      const offers = generateOffers(countOffer, splitString(titles), splitString(categories), splitString(sentences));
      const content = JSON.stringify(offers);

      // Записываем контент в файл
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`))
    } catch (error) {
      console.log(error)
      console.error(chalk.red(`Can't write data to file...`))
    }
  }
}
