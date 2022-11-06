// import * as dotenv from 'dotenv'
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { formatInTimeZone } from 'date-fns-tz/esm';
import got from 'got';
import { TwitterApi } from 'twitter-api-v2';


const TZ = 'Asia/Tokyo';
const AMEDAS_URL_BASE = 'https://www.jma.go.jp/bosai/amedas/data/map/';
const AMEDAS_ID_TOKYO = '44132';

const getTemperature = async () => {
  const ymdh = formatInTimeZone(new Date(), TZ, 'yyyyMMddHH0000');
  const url = `${AMEDAS_URL_BASE}${ymdh}.json`;
  console.log(`url: ${url}`);

  const data = await got.get(url).json();

  if (AMEDAS_ID_TOKYO in data) {
    return data[AMEDAS_ID_TOKYO]['temp'][0];
  }

  throw new Error('could not retreive temperature of Tokyo.');
};

const makeMessage = (temp) => {
  const dt = formatInTimeZone(new Date(), TZ, 'kaaa MMM do');
  return `${temp}℃ ${dt}`;
};

const tweet = async (message) => {
  const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
  });

  await client.v1.tweet(message);
};

http.createServer(async (req, res) => {
  console.log(`reg.url: ${req.url}`);

  try {
    const temp = await getTemperature();
    const message = await makeMessage(temp);
    console.log(`message: ${message}`);

    await tweet(message);

    res.write('done.');
    res.end();
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }
}).listen(process.env.PORT || 3000);