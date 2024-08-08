// Define the URL of the backend server
const backendUrl = 'https://zynk.onrender.com/calculate';

// Update the displayed math expression based on user input
function updateMath() {
    const input = document.getElementById('mathInput').value;
    const formattedInput = formatInputForLaTeX(input);

    // Make a POST request to the backend server
    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expression: formattedInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mathOutput').innerHTML = `$$${data.result}$$`;
        MathJax.typesetPromise(); // Trigger MathJax to re-render the output
    })
    .catch(error => {
        console.error('Error fetching from the backend:', error);
        document.getElementById('mathOutput').textContent = 'Failed to calculate';
    });
}

// Convert user input into a LaTeX formatted string
function formatInputForLaTeX(input) {
    // Basic replacements to convert to LaTeX compatible format
    let formattedInput = input;

    // Handling exponentiation
    formattedInput = formattedInput.replace(/\^([^\^]+)/g, '^{ $1 }');

    // Handling fractions (simple cases)
    formattedInput = formattedInput.replace(/\\frac{([^}]+)}{([^}]+)}/g, '\\frac{$1}{$2}');

    return formattedInput;
}

// Initialize the event listeners for the input field
function initEventListeners() {
    const inputField = document.getElementById('mathInput');
    inputField.addEventListener('input', updateMath);
}

// Run initial setup functions when the window loads
window.onload = function() {
    initEventListeners();
    updateMath();  // Initial render to show placeholder or default example
}
