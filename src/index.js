//Placeholder script
const CronJob = require('cron').CronJob;
require('dotenv').config();

//Twitter Bot
const Twit = require('twit');
const client = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

async function postTweet() {
  let message = await scrapeMenu();
  // return new Promise((resolve, reject) => {
  //   client.post("statuses/update", {
  //     status: message
  //   }, (error, data, response) => {
  //     if (error) {
  //       console.log(error);
  //       reject(error);
  //     } else {
  //       console.log(data);
  //       resolve(data);
  //     }
  //   });
  // });
  console.log(message);
};

// Cron Scheduler 
new CronJob(
  '20 16 * * *', //test at 4:20PM
  // '*/1 * * * *', //test every minute
  function () {
    postTweet();
  },
  null,
  true,
  'America/Los_Angeles'
);

//Fetch
async function scrapeMenu() {
  const res = await fetch(`https://www.mcdonalds.com/us/en-us/full-menu.html`);
  const body = await res.text();
  return printResult(body);
};

//UI Logic
function printResult(webScrape) {
  const mcRibCode = 'data-product-id="200446"';
  // const mcRibCode = 'data-product-id="200449"'; //passing
  if (webScrape.includes(mcRibCode)) {
    return ('The McRib is Back!');
  } else {
    return ('The McRib is not back');
  }
}