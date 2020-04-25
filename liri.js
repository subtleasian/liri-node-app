require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

switch (process.argv[2]) {
    case "concert-this":
        console.log("Searching Bands in Town for your selected Artist...");
        concertThis(process.argv[3]);
        break;

    case "spotify-this-song":
        console.log("Searching Spotify for your song...");
        spotifyThis(process.argv[3]);
        break;

    case "movie-this":
        console.log("Searching OMDB for your movie...");
        movieThis(process.argv[3]);
        break;

    case "do-what-it-says":
        console.log("Reading 'random.txt' file for instructions...");
        doThis();
        break;

    default:
        break;
}

function concertThis(artist = "Celine Dion") {
    // node liri.js concert-this <artist/band name here>
    // search Bands in Town Events API for an artist and render following info to terminal:
    let getURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // - Name of venue
    // - Venue location
    // - Date of event (using moment to format this as "MM/DD/YYYY")
    axios
        .get(getURL)
        .then(function(res){
            // console.log(res.data);
            console.log("\n-----------------------------------------------\n");
            console.log(`Venue Name: ${res.data[0].venue.name}`);
            console.log(`Location: ${res.data[0].venue.location}, ${res.data[0].venue.country}`);
            console.log(`Date: ${moment(res.data[0].datetime).format("MM-DD-YYYY")}`);
            console.log("\n-----------------------------------------------");
        })
        .catch(function(err){
            console.log(err);
        });
}

function spotifyThis(song = "The Sign") {
    spotify
        .search({
            type: "track",
            query: song,
            limit: 10
        }, 
        function(err, data) {
            if (err) {
                return console.log("Error: " + err);
            }
            
            // After searching for song name, should show:
            // - Artist(s)
            console.log("\n-----------------------------------------------\n");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            // - Song Name
            console.log("Song Name: " + data.tracks.items[0].name);
            // - Preview link of song from Spotify
            console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
            // - Album that song is from
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("\n-----------------------------------------------");

        });
}

function movieThis(movie = "Mr. Nobody") {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios
    .get(queryUrl)
    .then(function(res){
        console.log("\n-----------------------------------------------\n");
        // * Title of the movie.
        console.log("Title: " + res.data.Title);
        // * Year the movie came out.
        console.log("Year: " + res.data.Year);
        // * IMDB Rating of the movie.
        console.log("IMDB Rating: " + res.data.Ratings[0].Value);
        // * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes Rating: " + res.data.Ratings[1].Value);
        // * Country where the movie was produced.
        console.log("Country: " + res.data.Country);
        // * Language of the movie.
        console.log("Language: " + res.data.Language);
        // * Plot of the movie.
        console.log("Plot: " + res.data.Plot);
        // * Actors in the movie.
        console.log("Actors: " + res.data.Actors);
        console.log("\n-----------------------------------------------");
    })
    .catch(function(err){
        console.log(err);
    });
}

function doThis() {
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err);
        }
        var output = data.split(",");
        switch (output[0]) {
            case "concert-this":
                console.log("Searching Bands in Town for your selected Artist...");
                concertThis(output[1]);
                break;
        
            case "spotify-this-song":
                console.log("Searching Spotify for your song...");
                spotifyThis(output[1]);
                break;
        
            case "movie-this":
                console.log("Searching OMDB for your movie...");
                movieThis(output[1]);
                break;
        
            default:
                break;
        }
    })
}