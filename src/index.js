//Placeholder script
const CronJob = require('cron').CronJob;
require('dotenv').config();

//Twitter Bot
// const Twit = require('twit');
const { TwitterApi } = require('twitter-api-v2');
// const client = new Twit({
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});
const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

module.exports = { twitterClient, twitterBearer };


async function postTweet() {
  let message = await scrapeMenu();
  try {
    await twitterClient.v2.tweet(message);
  } catch (e) {
    console.log(e)
  }
};

// Cron Scheduler
new CronJob(
  '20 16 * * *', //Executes at 4:20PM PST
  // '07 17 * * *', //Executes at 4:20PM PST
  function () {
    postTweet();
  },
  null,
  true,
  'America/Los_Angeles'
);

//List of McDonalds Menus
const storeList = ['https://www.ubereats.com/store/mcdonalds-2212-madison-ave/1W0OhQsQT-K8KsXo78Hmcw',
  'https://www.ubereats.com/store/mcdonalds-1st-st-%26-pierce/QEEHKX74QZK28dooLfwmHw',
  'https://www.ubereats.com/store/mcdonalds-2535-e-lincolnway/sQjHbDRpQCGPjBRQKE2JpQ'];

//Fetch
async function scrapeMenu() {
  // const res = await fetch(`https://www.mcdonalds.com/us/en-us/full-menu.html`);
  // const body = await res.text();
  const menus = await (storeList.map(fetchWebsiteText));
  console.log(menus);
  return printResult(menus);
};

async function fetchWebsiteText(url) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    return body;
  } catch (error) {
    console.error(`Error fetching or parsing ${url}:`, error);
    return "error";
  }
};

//UI Logic
function printResult(webScrape) {
  // const mcRibCode = 'data-product-id="200446"';
  const mcRibWord = 'McRib';
  if (webScrape.some((element) => element.includes(mcRibWord))) {
    return ('The McRib is Back!!!');
  } else if (webScrape.some((element) => element.includes("error"))) {
    return ('ERROR');
  } else {
    let notBackArray = ['The McRib is not back', 'Unfortunately the McRib is not back', 'The McRib is still not back', 'Nope, the McRib is not back', 'Bad News, the McRib is still not back'];
    let item = notBackArray[Math.floor(Math.random() * notBackArray.length)];
    let date = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    return (item + ' (' + date + ')');
  }
}