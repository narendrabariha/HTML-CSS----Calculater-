const display = document.getElementById('display');

// Function to insert value at cursor
function insertAtCursor(value) {
  const start = display.selectionStart;
  const end = display.selectionEnd;
  const text = display.value;

  // Add the value at the cursor
  display.value = text.slice(0, start) + value + text.slice(end);
  
  // Move cursor after inserted value
  const newPos = start + value.length;
  display.setSelectionRange(newPos, newPos);
  display.focus();
}

// Function to clear all
function clearDisplay() {
  display.value = '';
  display.focus();
}

// Function to calculate the result
function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
  display.focus();
}

// Handle keyboard inputs
document.addEventListener('keydown', function(event) {
  const key = event.key;

  // If number or operator is pressed
  if (!isNaN(key) || "+-*/.".includes(key)) {
    insertAtCursor(key);
    event.preventDefault();
  }

  // Enter = Calculate
  if (key === 'Enter') {
    calculate();
    event.preventDefault();
  }

  // Space = Clear all
  if (key === ' ') {
    clearDisplay();
    event.preventDefault();
  }

  // C key = Clear all
  if (key.toLowerCase() === 'c') {
    clearDisplay();
    event.preventDefault();
  }

  // Allow Backspace and Arrow keys to work normally
});

// When buttons are clicked  If = → do the calculation & If C → clear all
function buttonClick(value) {
  if (value === '=') {
    calculate();
  } else if (value === 'C') {
    clearDisplay();
  } else {
    insertAtCursor(value);
  }
}
