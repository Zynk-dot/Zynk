const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Helps in parsing JSON data from requests

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to port 3000

// Middleware
app.use(cors({
    origin: ['https://zynk-dot.github.io'], // Update this if your frontend URL is different
    optionsSuccessStatus: 200 // For legacy browser support (e.g., IE11)
}));
app.use(bodyParser.json());

// Route for performing calculations
app.post('/calculate', (req, res) => {
    try {
        const { expression } = req.body;
        if (!expression) {
            return res.status(400).json({ error: 'No expression provided.' });
        }
        
        // Evaluating the expression can be dangerous and is generally not recommended without proper validation
        // For now, we use eval as an example. In a real-world application, consider using a math library!
        const result = eval(expression);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to evaluate expression', details: error.message });
    }
});

// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Math Calculator API is running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
