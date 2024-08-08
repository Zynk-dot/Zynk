// Initialize MathQuill
const MQ = MathQuill.getInterface(2); // MathQuill 2.0 API
const mathField = MQ.MathField(document.getElementById('mathInput'), {
    spaceBehavesLikeTab: true, // Behave like LaTeX environment
    handlers: {
        edit: function() { // Event triggered on any edit
            // Optionally process or validate input in real-time here
        }
    }
});

// Function to handle calculations
function calculate() {
    const input = mathField.latex(); // Get the LaTeX from MathQuill
    const formattedInput = formatInputForLaTeX(input);

    // Make a POST request to the backend server
    fetch('https://zynk.onrender.com/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expression: formattedInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mathOutput').innerHTML = `$$${data.result}$$`;
        MathJax.typesetPromise(); // Re-render LaTeX
    })
    .catch(error => {
        console.error('Error fetching from the backend:', error);
        document.getElementById('mathOutput').textContent = 'Failed to calculate';
    });
}

// Function to format input for LaTeX
function formatInputForLaTeX(input) {
    // Convert common functions and operators to LaTeX-friendly format
    let formattedInput = input;

    // Replace sqrt() with \sqrt{}
    formattedInput = formattedInput.replace(/sqrt/g, '\\sqrt');

    // Handle trigonometric functions
    formattedInput = formattedInput.replace(/sin/g, '\\sin');
    formattedInput = formattedInput.replace(/cos/g, '\\cos');
    formattedInput = formattedInput.replace(/tan/g, '\\tan');

    // Handle fractions
    formattedInput = formattedInput.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}');

    // Handle powers, e.g., x^2 to x^{2}
    formattedInput = formattedInput.replace(/(\w+)\^(\w+)/g, '$1^{\$2}');

    // Handle logarithms
    formattedInput = formattedInput.replace(/log/g, '\\log');

    // Additional replacements as needed
    // Add more replacements for other specific patterns

    return formattedInput;
}
