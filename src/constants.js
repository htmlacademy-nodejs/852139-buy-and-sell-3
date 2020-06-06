'use strict';

const DEFAULT_COUNT = 1;
const MAX_DESCRIPTION_LENGTH = 5;
const MAX_OFFER_AMOUNT = 1000;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const FILE_NAME = `mocks.json`;

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
}

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  MAX_DESCRIPTION_LENGTH,
  MAX_OFFER_AMOUNT,
  FILE_NAME,
  SumRestrict,
  PictureRestrict,
  OfferType,
  ExitCode,
};
