"use strict";

// Где-то в лекция говорилось, что в index.js должны быть только импорты и никакой логики, поэтому вынес отдельно.
const chalk = require(`chalk`);
const express = require(`express`);

const {
  FILE_NAME,
  HttpCode,
} = require(`../constants`);

const {
  readContent,
} = require(`../utils`);

const app = express();
app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await readContent(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (error) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(error);
  }
});

const initServer = (port) => {
  app.listen(port, (err) => {
    if (err) {
      return console.error(`Ошибка при создании сервера`, err);
    }
    return console.info(chalk.green(`Ожидаю соединений на ${port}`));
  });
};

module.exports = {
  initServer,
};
