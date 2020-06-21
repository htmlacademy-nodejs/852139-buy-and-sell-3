"use strict";

const DEFAULT_COUNT = 1;
const MAX_DESCRIPTION_LENGTH = 5;
const MAX_OFFER_AMOUNT = 1000;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const FILE_NAME = `./mocks.json`;
const PUBLIC_DIR = `public`;

const DefaultPort = {
  FRONT: 8080,
  SERVICE: 3000,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  MAX_DESCRIPTION_LENGTH,
  MAX_OFFER_AMOUNT,
  FILE_NAME,
  PUBLIC_DIR,
  SumRestrict,
  PictureRestrict,
  OfferType,
  ExitCode,
  HttpCode,
  DefaultPort,
};
