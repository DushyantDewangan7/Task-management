const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
const { connectToDatabase } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});