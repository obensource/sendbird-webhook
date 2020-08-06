# sendbird-webhook
<img src="https://pbs.twimg.com/media/ET-2PqzU0AAekyC.jpg" width="640px" />

👉 A webhook that sends fun messages to a Sendbird client when group channels are created! 🎉

## Description
This is a webhook server that works with my fork of SendBird's [`SendBird-JavaScript/web-basic-sample`](https://github.com/obensource/sendbird-web-basic-sample) client.

## Installation
**$**`npm install`
> **Note**: You will need the proper credentials in the `.env` file in order for this to work locally. I can share these with you personally, if they haven't been shared with you already. 👍

## Run it! 🚀
**$** `node index.js`

## Using this with it's Client
You can boot up [the client](https://github.com/obensource/SendBird-JavaScript) by:
* Installing [`gnrok`](https://ngrok.com/), and exposing port `3000` by running **$**`ngrok HTTP 3000` (this will create a tunnel to what's running at `127.0.0.1:3000`, eg. this webhook server).
* Cloning the [meta repository](https://github.com/obensource/SendBird-JavaScript) to your local machine
* Navigating to the web-basic-same sub-repo
* Running **$** `npm install`
* Running **$** `npm start` or `npm run start:dev` in order to start the client.
