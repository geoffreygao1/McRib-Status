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
// new CronJob(
//   '20 16 * * *', //Executes at 4:20PM PST
//   // '07 17 * * *', //Executes at 4:20PM PST
//   function () {
//     postTweet();
//   },
//   null,
//   true,
//   'America/Los_Angeles'
// );

postTweet();

//Fetch
async function scrapeMenu() {
  const res = await fetch(`https://www.mcdonalds.com/us/en-us/full-menu.html`);
  const body = await res.text();
  return printResult(body);
};

//UI Logic
function printResult(webScrape) {
  const mcRibCode = 'data-product-id="200446"';
  if (webScrape.includes(mcRibCode)) {
    return ('The McRib is Back!!!');
  } else {
    let notBackArray = ['The McRib is not back', 'Unfortunately the McRib is not back', 'The McRib is still not back', 'Nope, the McRib is not back', 'Bad News, the McRib is still not back'];
    let item = notBackArray[Math.floor(Math.random() * notBackArray.length)];
    let date = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles"
    });
    return (item + ' (' + date + ')');
  }
}