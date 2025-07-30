
require("dotenv").config(); 

const app = require("./src/app");

const PORT = process.env.server_port;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
