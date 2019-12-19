const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv/config');

const app = express();
 
connectDB();

app.use(express.json({ extended: false }));

//Defines Routes 
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes')); 
app.use('/api/contact', require('./routes/contact'));

//Server static assets in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))