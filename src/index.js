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
  'https://www.ubereats.com/store/mcdonalds-mcdowell-%26-7th-st/05GIIX64Ske0Ml8p80MzPQ',
  'https://www.ubereats.com/store/mcdonalds-515-w-6th-st/_ds4VzdXSrOE2Wyp6lM8aw',
  'https://www.ubereats.com/store/mcdonalds-la-figueroa/EYDtFoJNQF2JX5hKm39UUA',
  'https://www.ubereats.com/store/mcdonalds-denver-co-colfax-%26-osage/2evpqVkbQUGOjhac3kuVnA',
  'https://www.ubereats.com/store/mcdonalds-1700-park-ave-bridgeport/wj9rEA8sR-ak7VKBihJRxQ',
  'https://www.ubereats.com/store/mcdonalds-700-west-4th-street/D9vYPnglREqMPS4BFm77Fg',
  'https://www.ubereats.com/store/mcdonalds-17th-st-corcoran/hMDrYfK1R7Wasr-2IsyWgw',
  'https://www.ubereats.com/store/mcdonalds-253-state-st-e/Hl0ONL1PRN6UA6P_IzMZyQ',
  'https://www.ubereats.com/store/mcdonalds-atlanta-ga-ponce-de-leon-ave/J-rhg0pCTbGS3Je579siig',
  'https://www.ubereats.com/store/mcdonalds-1101-fort-street-mall/B5eRoZBOTG-LxHrxY4Itqg',
  'https://www.ubereats.com/store/mcdonalds-2510-fairview-ave/2D8IbU3QRyO8zSpFqicpoQ',
  'https://www.ubereats.com/store/mcdonalds-clark-%26-monroe/___QDNBWSo2NunT9qIIMhw',
  'https://www.ubereats.com/store/mcdonalds-meridian-%26-16th-st/Kz_Zu45ITXyQpdqT5S85Gw',
  'https://www.ubereats.com/store/mcdonalds-6th-ave-%26-university/dgtCFYJEQ1qZTQ8GdAFRTQ',
  'https://www.ubereats.com/store/mcdonalds-411-s-broadway/8lFWsl1vSdyma7-Nvxzthg',
  'https://www.ubereats.com/store/mcdonalds-broadway-%26-2nd-st/q4LgE4JYQKGun0qT9xTBAg',
  'https://www.ubereats.com/store/mcdonalds-canal-%26-white/Oq8YHp56Tf6HQ_ykWLGvhw',
  'https://www.ubereats.com/store/mcdonalds-332-saint-john-st/5Dca20pvRGSLG99k8vuwRg',
  'https://www.ubereats.com/store/mcdonalds-howard-street/gnCuO9hWS5WxTEZ719cLmQ',
  'https://www.ubereats.com/store/mcdonalds-washington-st-dtx/w0kc6yw5SYiIQEIh2SdiJg',
  'https://www.ubereats.com/store/mcdonalds-jefferson-%26-crane/lOuMvvnZTo6SqoNv6WmJQA',
  'https://www.ubereats.com/store/mcdonalds-university-%26-broadway/9aykPe3QTS2P19tnvoQjqw',
  'https://www.ubereats.com/store/mcdonalds-1010-n-state-st/QG1uS5-sQE26T9L87JGG5A',
  'https://www.ubereats.com/store/mcdonalds-3255-main-st/5-4piWp4RRWjCgVYpnxlBA',
  'https://www.ubereats.com/store/mcdonalds-401-main-st/OybHmGKoTcaTJly3c5qy1g',
  'https://www.ubereats.com/store/mcdonalds-cuming-%26-24th-st/xDmrQuu0T_K3gRClra-YPw',
  'https://www.ubereats.com/store/mcdonalds-301-fremont-street/RlPlE4e6SISN0ntfyBd76Q',
  'https://www.ubereats.com/store/mcdonalds-907-hanover-st/oWXudZOcQjeu4soYJQrO5w',
  'https://www.ubereats.com/store/mcdonalds-7944-penn-station/tYoG_S_9Re21HdOiumFFEg',
  'https://www.ubereats.com/store/mcdonalds-lomas-blvd-%26-broadway-blvd/tvNVujoGTSi6eDVnjHhNQg',
  'https://www.ubereats.com/store/mcdonalds-fidi-160-broadway/Cn7rm31RTym93cHeWFUSow',
  'https://www.ubereats.com/store/mcdonalds-2625-south-blvd/dZjVbKvgTE-v0YymyGU6sQ',
  'https://www.ubereats.com/store/mcdonalds-8th-st-s-%26-3rd-ave-s/-TTIFSp3Q223U9CKV9AO0g',
  'https://www.ubereats.com/store/mcdonalds-harrisburg-%26-mound/Daw8ZkxvQ4CiOM0LULDj6g',
  'https://www.ubereats.com/store/mcdonalds-1004-w-sheridan/Fpuc1hkuRXKCBHywuPomgg',
  'https://www.ubereats.com/store/mcdonalds-portland-burnside/dHFW9cdJSAmAeeifsJJeMQ',
  'https://www.ubereats.com/store/mcdonalds-grays-ferry/rJk1AdV7SRe8Dd_KK8eOZw',
  'https://www.ubereats.com/store/mcdonalds-343-broad-st/hRSFtwHUToO2yO3PUGm1Mw',
  'https://www.ubereats.com/store/mcdonalds-230-spring-st/N-YWMDBjSUetuzr_RvyhpA',
  'https://www.ubereats.com/store/mcdonalds-917-e-10th-street/Ky3oEljmQcey5Aj5-HIMZw',
  'https://www.ubereats.com/store/mcdonalds-nash-broadway-%26-i-40/zNXPlTHXTnKZTYwbMiCUzw',
  'https://www.ubereats.com/store/mcdonalds-studemont/5iYQPjU0ScKI6Y0WQQrwXA',
  'https://www.ubereats.com/store/mcdonalds-cesar-e-chavez-blvd-%26-200-e/8IarER97To2lkSUMk9VDBQ',
  'https://www.ubereats.com/store/mcdonalds-1205-williston-rd/cZxId_ZmSFODqmpfXjnq2g',
  'https://www.ubereats.com/store/mcdonalds-404-birdneck-rd/_9z6aXN0QIGPd15HcsCAkg',
  'https://www.ubereats.com/store/mcdonalds-seattle-3rd-%26-pine-rebuild/3CcPv6PgTP2-nWq_1Z9jJg',
  'https://www.ubereats.com/store/mcdonalds-1626-e-washington-st/BMXL4UobQ1av0hC5QvJ3cw',
  'https://www.ubereats.com/store/mcdonalds-1st-st-%26-pierce/QEEHKX74QZK28dooLfwmHw',
  'https://www.ubereats.com/store/mcdonalds-2535-e-lincolnway/sQjHbDRpQCGPjBRQKE2JpQ'];

//Fetch
async function scrapeMenu() {
  // const res = await fetch(`https://www.mcdonalds.com/us/en-us/full-menu.html`);
  // const body = await res.text();
  const menus = await Promise.all(storeList.map(fetchWebsiteText));
  return printResult(menus);
};

async function fetchWebsiteText(url) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    return body;
  } catch (error) {
    console.error(`Error fetching or parsing ${url}:`, error);
    return "";
  }
};

//UI Logic
function printResult(webScrape) {
  // const mcRibCode = 'data-product-id="200446"';
  const mcRibWord = 'McRib'
  if (webScrape.some((element) => element.includes(mcRibWord))) {
    return ('The McRib is Back!!!');
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