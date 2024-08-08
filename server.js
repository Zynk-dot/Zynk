const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/calculate', (req, res) => {
    const { expression } = req.body;
    try {
        const result = eval(expression);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid calculation' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
