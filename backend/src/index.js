require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const transactionsRoutes = require('./routes/transactions');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// connect to MongoDB
connectDB(process.env.MONGO_URI);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionsRoutes);

app.get('/', (req, res) => res.send('TrackNsave API running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
