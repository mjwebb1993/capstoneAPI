require("dotenv").config();
const { response } = require("express");
const express = require("express");
const { request } = require("http");

class DataStructure {
  constructor(name, yearReleased, author, [genre]) {
    this.name = name;
    this.yearReleased = yearReleased;
    this.author = author;
    this.genre = genre;
  }
}

class Game extends DataStructure {
  constructor(name, yearReleased, console, [genre]) {
    super(name, yearReleased, [genre]);
    this.console = console;
  }
}

class Movie extends DataStructure {
  constructor(name, yearReleased, distributor, [genre]) {
    super(name, yearReleased, [genre]);
    this.distributor = distributor;
  }
}
class Book extends DataStructure {
  constructor(name, yearReleased, author, [genre]) {
    super(name, yearReleased, author, [genre]);
  }
}
const game1 = new Game("Mass Effect", 2007, "Multi", [
  "Action",
  "RPG",
  "Adventure"
]);
const game2 = new Game("Mass Effect 2", 2010, "Multi", [
  "Action",
  "RPG",
  "Adventure"
]);
const game3 = new Game("Mass Effect 3", 2012, "Multi", [
  "Action",
  "RPG",
  "Adventure"
]);
const game4 = new Game("Super Mario Galaxy 2", 2010, "Wii", [
  "Platform",
  "Action"
]);
const game5 = new Game(
  "The Legend of Zelda: Breath of the Wild",
  2017,
  "Switch",
  ["Action", "Adventure", "Open World"]
);

const movie1 = new Movie("Endgame", 2019, "Disney", [
  "Action",
  "Superhero",
  "Adventure"
]);
const movie2 = new Movie("Star Wars: The Force Awakens", 2015, "Disey", [
  "Science Fiction",
  "Action",
  "Adventure"
]);
const movie3 = new Movie("Avengers: Infinity War", 2018, "Disney", [
  "Action",
  "Superhero",
  "Adventure"
]);
const movie4 = new Movie("Jurasic World", 2015, "Universal", [
  "Science Fiction",
  "Action"
]);
const movie5 = new Movie("Furious 7", 2015, "Universal", [
  "Action",
  "Thriller",
  "Cars"
]);

const book1 = new Book("The Last Samurai", 2000, "Helen DeWitt", ["Fiction"]);
const book2 = new Book("The Sellout", 2015, "Paul Beatty", ["Fiction"]);
const book3 = new Book("The Argonauts", 2015, "Maggie Nelson", ["Fiction"]);

let gameList = [game1, game2, game3, game4, game5];
let movieList = [movie1, movie2, movie3, movie4, movie5];
let bookList = [book1, book2, book3];

let mediaList = [gameList, movieList, bookList];

const app = express();

const myMiddleware = (request, response, next) => {
  // do something with request and/or response
  console.log(request.method, request.path);
  next(); // tell express to move to the next middleware function
};

// CORS Middleware
const cors = (request, response, next) => {
  response.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  response.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(myMiddleware); // use the myMiddleware for every request to the app
app.use(express.json());
app.use(cors);

app.route("/listGames").get((request, response) => {
  let listGames = gameList;

  response.status(200).json(listGames);
});

app.route("/listMovies").get((request, response) => {
  let listMovies = movieList;

  response.status(200).json(listMovies);
});

app.route("/listBooks").get((request, response) => {
  let listBooks = bookList;

  response.status(200).json(listBooks);
});

app.route("/listMedia").get((request, response) => {
  let listMedia = mediaList;

  response.status(200).json(listMedia);
});

app.route("/**").get((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
