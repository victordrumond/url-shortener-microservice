# URL Shortener Microservice
https://victordrumond-url-shortener.herokuapp.com/

## Technologies
`HTML` `CSS` `JavaScript` `Node.js` `Express.js` `MongoDB` `Mongoose`

## About
* A [project](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice) from freeCodeCamp's Back End Development and APIs Certification.
* Make a POST request entering a valid URL address and get a unique code to use as a shortened URL.
* Make a GET request to the API endpoint: `[url]/api/shorturl/shortened-URL` to be redirected to the original URL.
* Database hosted on [MongoDB Atlas](https://www.mongodb.com/atlas).
* App running on Heroku. [Learn more](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

## Running Locally
In the project directory, you can run:

```
$ npm install
$ npm start
```

The app should now be running on [http://localhost:3000](http://localhost:3000).

**Important**: You need to create a .env file in the project directory and store the following variable:

`MONGO_URI='mongodb+srv://<username>:<password>@cluster0.uxh57.mongodb.net/<database>?retryWrites=true&w=majority'`

This will connect the project to a MongoDB database. Be sure to change `<username>`, `<password>` and `<database>` to your own MongoDB information.