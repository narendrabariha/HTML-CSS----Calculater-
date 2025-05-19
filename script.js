const display = document.getElementById('display');

// Insert value at cursor
function insertAtCursor(value) {
  const start = display.selectionStart;
  const end = display.selectionEnd;
  const current = display.value;

  // Insert value
  display.value = current.slice(0, start) + value + current.slice(end);

  // Move cursor after inserted value
  const newPos = start + value.length;
  display.setSelectionRange(newPos, newPos);
  display.focus();
}

// Clear entire display
function clearDisplay() {
  display.value = '';
  display.focus();
}

// Evaluate and show result
function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
  display.focus();
}

// Handle keyboard inputs
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Number or operator input
  if (!isNaN(key) || "+-*/.".includes(key)) {
    insertAtCursor(key);
    event.preventDefault();
  }

  // Enter = evaluate
  if (key === 'Enter') {
    calculate();
    event.preventDefault();
  }

  // Spacebar = clear
  if (key === ' ') {
    clearDisplay();
    event.preventDefault();
  }

  // 'C' = clear
  if (key.toLowerCase() === 'c') {
    clearDisplay();
    event.preventDefault();
  }

  // Backspace = delete before cursor
  if (key === 'Backspace') {
    const start = display.selectionStart;
    const end = display.selectionEnd;

    if (start === end && start > 0) {
      display.value = display.value.slice(0, start - 1) + display.value.slice(end);
      display.setSelectionRange(start - 1, start - 1);
    } else {
      display.value = display.value.slice(0, start) + display.value.slice(end);
      display.setSelectionRange(start, start);
    }
    event.preventDefault();
  }

  // Allow arrow keys (←, →) to move cursor
});

// Handle button clicks
function buttonClick(value) {
  if (value === '=') {
    calculate();
  } else if (value === 'C') {
    clearDisplay();
  } else {
    insertAtCursor(value);
  }
}
