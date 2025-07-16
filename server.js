const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).send('Thiếu mã');

  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const fileName = `submissions/${timestamp}.txt`;
  fs.writeFileSync(fileName, code);
  res.send('Đã nhận mã: ' + code);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});