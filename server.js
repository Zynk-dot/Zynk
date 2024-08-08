const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const math = require('mathjs');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Convert basic LaTeX expressions to a math.js understandable format
function convertLatexToExpression(latex) {
    // Handling simple fractions for now
    return latex.replace(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)');
}

// Route to handle calculation
app.post('/calculate', (req, res) => {
    try {
        const { expression } = req.body;
        const convertedExpression = convertLatexToExpression(expression);
        const result = math.evaluate(convertedExpression);
        // Return the result in LaTeX format
        const latexResult = math.parse(result.toString()).toTex();
        res.json({ result: latexResult });
    } catch (error) {
        res.status(500).json({ error: 'Calculation error', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
