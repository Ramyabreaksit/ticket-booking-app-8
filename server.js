const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// A few preset movies with fixed seats
let movies = [
  { id: 1, title: 'Avatar: Fire and Ash', time: '6:00 PM', totalSeats: 10, bookedSeats: 0 },
  { id: 2, title: 'Spider-Man: Beyond', time: '9:00 PM', totalSeats: 10, bookedSeats: 0 },
  { id: 3, title: 'KGF: Chapter 3', time: '3:30 PM', totalSeats: 10, bookedSeats: 0 }
];

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.post('/api/movies/:id/book', (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });

  const { seats } = req.body;
  const seatCount = parseInt(seats);
  const remaining = movie.totalSeats - movie.bookedSeats;

  if (!seatCount || seatCount < 1) return res.status(400).json({ error: 'Invalid seat count' });
  if (seatCount > remaining) return res.status(400).json({ error: 'Not enough seats available' });

  movie.bookedSeats += seatCount;
  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});