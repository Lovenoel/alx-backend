const express = require("express");
const redis = require("redis");
const kue = require("kue");
const { promisify } = require("util");

// Redis setup
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

// Kue queue setup
const queue = kue.createQueue();

// Express app setup
const app = express();
const PORT = 1245;

let reservationEnabled = true; // Reservation enabled initially
const initialAvailableSeats = 50; // Initially set to 50 seats

// Initialize Redis with 50 seats available
client.set("available_seats", initialAvailableSeats);

// Reserve seat function (sets available seats in Redis)
async function reserveSeat(number) {
  await client.set("available_seats", number);
}

// Get current available seats function
async function getCurrentAvailableSeats() {
  const seats = await getAsync("available_seats");
  return parseInt(seats, 10);
}


// Returns the number of available seats.
app.get("/available_seats", async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats.toString() });
});


// Reserves a seat if reservations are enabled.
// If not, it returns that reservations are blocked.
app.get("/reserve_seat", async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();

  if (!reservationEnabled) {
    return res.json({ status: "Reservations are blocked" });
  }

  // Add a job to the queue
  const job = queue
    .create("reserve_seat", {
      availableSeats,
    })
    .save((err) => {
      if (err) {
        return res.json({ status: "Reservation failed" });
      }
      res.json({ status: "Reservation in process" });
    });
});


/*
Processes the queue, decreases available seats, and checks
if the reservation should be enabled or disabled based on
seat availability.
*/
app.get("/process", async (req, res) => {
  res.json({ status: "Queue processing" });

  // Process the queue
  queue.process("reserve_seat", async (job, done) => {
    try {
      let availableSeats = job.data.availableSeats;

      // Decrease the available seats by 1
      availableSeats -= 1;
      await reserveSeat(availableSeats);

      if (availableSeats === 0) {
        reservationEnabled = false;
      }

      console.log(`Seat reservation job ${job.id} completed`);
      done();
    } catch (error) {
      console.error(`Seat reservation job ${job.id} failed: ${error.message}`);
      done(new Error("Not enough seats available"));
    }
  });
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
