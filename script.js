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

  // Numbers or operators
  if (!isNaN(key) || "+-*/.".includes(key)) {
    insertAtCursor(key);
    event.preventDefault();
  }

  // Enter = Calculate
  if (key === 'Enter') {
    calculate();
    event.preventDefault();
  }

  // Spacebar = Clear all
  if (key === ' ') {
    clearDisplay();
    event.preventDefault();
  }

  // C key = Clear all
  if (key.toLowerCase() === 'c') {
    clearDisplay();
    event.preventDefault();
  }

  // Backspace = Delete character before cursor
  if (key === 'Backspace') {
    const start = display.selectionStart;
    const end = display.selectionEnd;

    if (start === end && start > 0) {
      display.value = display.value.slice(0, start - 1) + display.value.slice(end);
      display.setSelectionRange(start - 1, start - 1);
    } else {
      // If text is selected, delete the selection
      display.value = display.value.slice(0, start) + display.value.slice(end);
      display.setSelectionRange(start, start);
    }

    event.preventDefault();
  }

  // Arrow keys (← →) → default behavior (do nothing here)
});

// When buttons are clicked
function buttonClick(value) {
  if (value === '=') {
    calculate();
  } else if (value === 'C') {
    clearDisplay();
  } else {
    insertAtCursor(value);
  }
}
