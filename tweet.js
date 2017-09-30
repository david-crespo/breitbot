const fs = require('fs');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const tweetWithMedia = mediaIds => client.post(
  'statuses/update',
  {
    status: 'breitbart.com at 3PM ET on Sunday, June 1, 2017.',
    media_ids: mediaIds
  }
);

const printTweetUrl = tweet => {
  console.log(`https://twitter.com/breitshots/status/${tweet.id_str}`)
};

const image1 = fs.readFileSync('breitbart1.png');
const image2 = fs.readFileSync('breitbart2.png');
const images = [image1, image2];

const uploadImage = image => client.post('media/upload', {media: image});

// Make post request on media endpoint. Pass file data as media parameter
Promise.all(images.map(uploadImage))
  .then(values => values.map(media => media.media_id_string).join(','))
  .then(tweetWithMedia)
  .then(printTweetUrl)
  .catch(error => console.error(error));
