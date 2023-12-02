import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000 ;

connectToDatabase()
  .then(() => {
    // app.get('/', (req, res) => {
    //   res.send('Hello, World!');
    // });

    app.listen(PORT, () => console.log(`server listening to the port ${PORT} & connected to db`));
  })
  .catch((error) => console.log(error));
