require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.connect(process.env.DB_CONNECT);
// const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
// const morgan = require("morgan");


// app.use(myMiddleware); // use the myMiddleware for every request to the app
// app.use(express.json());
// app.use(cors);

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
  constructor(name, yearReleased, [...genre], console, picUrl) {
    super(name, yearReleased, [...genre]);
    this.console = console;
    this.picUrl = picUrl;
  }
}

class Movie extends DataStructure {
  constructor(name, yearReleased, [...genre], distributor, picUrl) {
    super(name, yearReleased, [...genre]);
    this.distributor = distributor;
    this.picUrl = picUrl;
  }
}
class Book extends DataStructure {
  constructor(name, yearReleased, [...genre], author, picUrl) {
    super(name, yearReleased, [...genre], author);
    this.picUrl = picUrl;
  }
}
const game1 = new Game("Mass Effect", 2007, ["Action", "RPG", "Adventure"], "Multi", "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/MassEffect.jpg/220px-MassEffect.jpg");
const game2 = new Game("Mass Effect 2", 2010, ["Action", "RPG", "Adventure"], "Multi", "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/MassEffect2_cover.PNG/220px-MassEffect2_cover.PNG");
const game3 = new Game("Mass Effect 3", 2012,  ["Action", "RPG", "Adventure"], "Multi", "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Mass_Effect_3_Game_Cover.jpg/220px-Mass_Effect_3_Game_Cover.jpg");
const game4 = new Game("Super Mario Galaxy 2", 2010,["Platform", "Action"],  "Wii", "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Super_Mario_Galaxy_2_Box_Art.jpg/220px-Super_Mario_Galaxy_2_Box_Art.jpg");
const game5 = new Game("The Legend of Zelda: Breath of the Wild", 2017, ["Action", "Adventure", "Open World"], "Switch", "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/220px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg");

const movie1 = new Movie("Endgame", 2019, ["Action", "Superhero", "Adventure"], "Disney", "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg");
const movie2 = new Movie("Star Wars: The Force Awakens", 2015, ["Science Fiction", "Action", "Adventure"], "Disney", "https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg");
const movie3 = new Movie("Avengers: Infinity War", 2018, ["Action", "Superhero", "Adventure"], "Disney", "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg");
const movie4 = new Movie("Jurasic World", 2015, ["Science Fiction", "Action"], "Universal", "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Jurassic_World_poster.jpg/220px-Jurassic_World_poster.jpg");
const movie5 = new Movie("Furious 7", 2015, ["Action", "Thriller", "Cars"], "Universal", "https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Furious_7_poster.jpg/220px-Furious_7_poster.jpg");

const book1 = new Book("The Last Samurai", 2000, ["Fiction"], "Helen DeWitt", "https://upload.wikimedia.org/wikipedia/en/thumb/8/89/HelenDeWitt_TheLastSamurai.jpg/220px-HelenDeWitt_TheLastSamurai.jpg");
const book2 = new Book("The Sellout", 2015, ["Fiction"], "Paul Beatty", "https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Sellout_by_Paul_Beatty.jpg/220px-Sellout_by_Paul_Beatty.jpg");
const book3 = new Book("The Argonauts", 2015, ["Fiction"], "Maggie Nelson", "https://images-na.ssl-images-amazon.com/images/I/71ZlOEHnHqL.jpg");

let gameList = [game1, game2, game3, game4, game5];
let movieList = [movie1, movie2, movie3, movie4, movie5];
let bookList = [book1, book2, book3];

let mediaList = {
  "Games": gameList,
  "Movies": movieList,
  "Books": bookList
};

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
