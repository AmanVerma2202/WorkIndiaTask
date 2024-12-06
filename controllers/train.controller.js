import pool from '../config/db.config.js';

export const addTrain = async (req, res) => {
  try {
    const { train_name, source_station, destination_station, total_seats } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO trains (train_name, source_station, destination_station, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
      [train_name, source_station, destination_station, total_seats, total_seats]
    );

    res.status(201).json({ message: 'Train added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;
    
    const [trains] = await pool.execute(
      'SELECT * FROM trains WHERE source_station = ? AND destination_station = ? AND available_seats > 0',
      [source, destination]
    );

    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
