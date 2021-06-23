require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.connect(process.env.DB_CONNECT);
// const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const morgan = require("morgan");


app.use(morgan("dev")); // use the myMiddleware for every request to the app
app.use(express.json());
app.use(cors);

let db;
const con = MongoClient.connect(
  `${process.env.DB_CONNECT}`,
  (err, database) => {
    if (err) return console.log(err);
    db = database.db("Cluster0");
    console.log("Connected to npm start DataBase");
  }
);

class DataStructure {
  constructor(name, yearReleased, [...genre]) {
    this.name = name;
    this.yearReleased = yearReleased;
    this.genre = genre;
  }
}

class Game extends DataStructure {
  constructor(name, yearReleased, [...genre], console) {
    super(name, yearReleased, [...genre]);
    this.console = console;
  }
}

class Movie extends DataStructure {
  constructor(name, yearReleased, [...genre], distributor) {
    super(name, yearReleased, [...genre]);
    this.distributor = distributor;
  }
}
class Book extends DataStructure {
  constructor(name, yearReleased, author, [...genre]) {
    super(name, yearReleased, author, [...genre]);
  }
}
const game1 = new Game("Mass Effect", 2007, ["Action", "RPG", "Adventure"], "Multi");
const game2 = new Game("Mass Effect 2", 2010, ["Action", "RPG", "Adventure"], "Multi");
const game3 = new Game("Mass Effect 3", 2012,  ["Action", "RPG", "Adventure"], "Multi");
const game4 = new Game("Super Mario Galaxy 2", 2010,["Platform", "Action"],  "Wii");
const game5 = new Game("The Legend of Zelda: Breath of the Wild", 2017, ["Action", "Adventure", "Open World"], "Switch");

const movie1 = new Movie("Endgame", 2019, ["Action", "Superhero", "Adventure"], "Disney");
const movie2 = new Movie("Star Wars: The Force Awakens", 2015, ["Science Fiction", "Action", "Adventure"], "Disney");
const movie3 = new Movie("Avengers: Infinity War", 2018, ["Action", "Superhero", "Adventure"], "Disney");
const movie4 = new Movie("Jurasic World", 2015, ["Science Fiction", "Action"], "Universal");
const movie5 = new Movie("Furious 7", 2015, ["Action", "Thriller", "Cars"], "Universal");

const book1 = new Book("The Last Samurai", 2000, ["Fiction"], "Helen DeWitt");
const book2 = new Book("The Sellout", 2015, ["Fiction"], "Paul Beatty");
const book3 = new Book("The Argonauts", 2015, ["Fiction"], "Maggie Nelson");

let gameList = [game1, game2, game3, game4, game5];
let movieList = [movie1, movie2, movie3, movie4, movie5];
let bookList = [book1, book2, book3];

let mediaList = [gameList, movieList, bookList];


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

app
  .route("/")
  .get((request, response) => {
    response.send("Hello World!");
  })
  .post((request, response) => {
    response.json(request.body);
  });

app.route("/**").get((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
