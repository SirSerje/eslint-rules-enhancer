const fs = require('fs');
const path = require('path');

// Define ANSI color codes
const COLORS = {
  green: '\x1b[32m',
  reset: '\x1b[0m',
};

// Helper function to wrap text with green color (for success)
const colorSuccess = (text) => `${COLORS.green}${text}${COLORS.reset}`;

// Optional: Function to log success messages
const logSuccess = (message) => console.log(colorSuccess(message));

// Main script
const testDir = path.resolve(__dirname, 'tests');

fs.readdirSync(testDir).forEach((file) => {
  if (file.endsWith('.js')) {
    logSuccess(`Running: ${file}`); // Success message in green
    try {
      require(path.join(testDir, file));
    } catch (error) {
      console.error(`Error while running ${file}: ${error.message}`); // Error message in default color
      process.exit(1); // Exit if any test file fails
    }
  }
});

logSuccess('All tests completed!'); // Final success message in green