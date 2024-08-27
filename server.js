const inquirer = require('inquirer');
const db = require ('./connection');

const app = express();
const PORT = process.env.PORT || 5432;

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  init();
  
});

console.log(db);