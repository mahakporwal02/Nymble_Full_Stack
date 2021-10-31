
import express from "express"
import { genres, movies as mvs } from "./db"

let movies = mvs;

var allowCrossDomain = function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

const app = express()
app.use(allowCrossDomain);
const PORT = 5000

/**
 * Return movies that match the 'search term' with movie 'title'.
 * If search term is not provided, return all movies.
 */
app.get('/movies', (req, resp) => {
    const search: any = req.query.search;
    let mv = movies.map((movie: any) => {
        return {
            "id": movie.id,
            "title": movie.title,
            "src": movie.src 
        }
    });
    if (search) {
        mv = mv.filter((movie: any) => {
            return movie.title.toLowerCase().includes(search.toLowerCase());
        });
    }
    resp.send(mv);
})

/**
 * Return all genres.
 */
app.get('/genres', (req, resp) => {
    resp.send(genres)
})

/**
 * Return movies that match the provided ID.
 */
app.get('/movies/:id', (req, resp) => {
    const id = Number(req.params.id)
    const mv = movies.filter((movie:any) => {
        return movie.id == id;
    });
    resp.send(mv);
})

/**
 * Return genre that match the provided ID.
 */
app.get('/genres/:id', (req, resp) => {
    const id = Number(req.params.id);
    const genre = genres.filter((gen:any) => {return gen.id == id});
    resp.send(genre);
})

/**
 * Add rating to a movie.
 * For simplicity of the task, the array acts as a DB in runtime.
 */
app.post('/movies/:id/ratings', (req, resp) => {
    // TODO
    const id = Number(req.params.id);
    let ratingVal = req.body.ratingVal;
    let mv = movies.filter((movie:any) => {
        return movie.id == id;
    });
    let totalRating = mv[0].vote_average * mv[0].vote_count;
    totalRating += ratingVal;
    let newRatting = totalRating / (mv[0].vote_count + 1);
    movies = movies.map(movie => {
        if(movie.id == id) {

        }
        return movie;
    });

    resp.send(movies.filter((movie:any) => {return movie.id == id}));
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})