// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import deviceRoutes from './routes/device.routes';
import { sequelize } from './config/database';

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/api', deviceRoutes);

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
    return sequelize.sync(); // Sync all defined models to the DB
  })
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error connecting to MySQL database:', err));

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
