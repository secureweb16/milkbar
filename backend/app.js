const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
const projectRouter = require('./routes/project');
const bookingRouter = require('./routes/booking');
const servicesRouter = require('./routes/services');
const BrandData = require('./routes/branddata');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000; 
const allowedOrigins = ['http://localhost:3000'];

// CORS options
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow request if origin is in the list or it's undefined (for same-origin requests)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and credentials
};

// Use CORS middleware
app.use(cors(corsOptions));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/milkbarDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/admin', projectRouter);
app.use('/api/admin', bookingRouter);
app.use('/api/admin', BrandData);
app.use('/api/admin', servicesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
