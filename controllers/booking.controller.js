import pool from '../config/db.config.js';

export const bookSeat = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    // Start a transaction
    await connection.beginTransaction();

    const { train_id, source_station, destination_station } = req.body;
    const user_id = req.user.userId;

    // Lock the row to prevent other transactions from accessing it simultaneously
    const [trains] = await connection.execute(
      'SELECT available_seats FROM trains WHERE id = ? FOR UPDATE',
      [train_id]
    );

    if (!trains.length) {
      await connection.rollback();
      return res.status(404).json({ message: 'Train not found' });
    }

    const availableSeats = trains[0].available_seats;

    // Check if seats are available
    if (availableSeats === 0) {
      await connection.rollback();
      return res.status(400).json({ message: 'No seats available' });
    }

    // Deduct one seat
    await connection.execute(
      'UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?',
      [train_id]
    );

    // Create booking record
    const [booking] = await connection.execute(
      'INSERT INTO bookings (user_id, train_id, source_station, destination_station, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, train_id, source_station, destination_station, 'confirmed']
    );

    // Commit transaction
    await connection.commit();
    res.status(201).json({ message: 'Booking confirmed', booking_id: booking.insertId });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of an error
    res.status(500).json({ message: error.message });
  } finally {
    connection.release(); // Release the database connection
  }
};


export const getBooking = async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      'SELECT * FROM bookings WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(bookings[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
