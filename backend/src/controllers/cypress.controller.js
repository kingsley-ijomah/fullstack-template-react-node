// Used for Cypress testing in frontend to reset the test database
exports.resets = async (req, res) => {
  // call the reset script
  const { exec } = require('child_process');
  
  exec('npm run reset:test:db', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
    return res.status(200).send(stdout);
  });
};