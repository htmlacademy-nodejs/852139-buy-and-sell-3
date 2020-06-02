'use strict';

const fs = require(`fs`);

const {
  CATEGORIES,
  SENTENCES,
  TITLES,
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
} = require(`../../utils`);

const getPictureFileName = (number) => {
  return number < 10
    ? `item0${number}.jpg`
    : `item${number}.jpg`;
}

const generateOffers = (count) => (
  [...Array(count)].map(() => ({
    category: [getRandomItemFrom(CATEGORIES), getRandomItemFrom(CATEGORIES)],
    description: shuffleArray(SENTENCES).slice(0, MAX_DESCRIPTION_LENGTH).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: getRandomItemFrom(TITLES),
    type: getRandomItemFrom(Object.keys(OfferType)),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  run(count) {
    if (count > MAX_OFFER_AMOUNT) {
      return console.log(`Не больше 1000 объявлений`);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
}
