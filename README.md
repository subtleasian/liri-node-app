# liri-node-app

### Overview

This app is called LIRI, a Language Interpretation and Recognition Interface. LIRI is a command line interface (CLI) app that takes in user parameters and gives back data from various APIs such as Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### Functions

1. `concert-this`
    * Users can use `concert-this "<Artist/Band Name>"` to search the Bands in Town API for the next concert of their favorite band with information such as Venue Name, Venue Location, and the Date of the event.
    
    ![Example Image](images/01-concert-this.png)

2. `spotify-this-song`
    * Users can use `spotify-this-song "<song title>"` to search Spotify for information such as Artist, Song Name, Preview Link to the song, and the Album Name of the song. If a user does not input a song title, it defaults to "The Sign" by Ace of Base.

    ![Example Image](images/02-spotify-this-song.png)

3. `movie-this`
    * Users can use `movie-this "<Movie Name>"` to search the OMDB API for their favorite movie with information such as Title of the movie, Year the movie came out, IMDB/Rotten Tomatoes ratings, Country the movie was produced, language of the movie, Plot summary, and Actors. If no Movie Name is given, it defaults to "Mr. Nobody".

    ![Example Image](images/03-movie-this.png)

4. `do-what-it-says`
    * Users can use `do-what-it-says` which will take the text inside the random.txt file to call one of LIRI's commands.

    ![Example Image](images/04-do-what-it-says.png)


### Technology Used
* Axios
* Moment
* Spotify API
* OMDB API
* Bands in Town API
* fs
* node.js

