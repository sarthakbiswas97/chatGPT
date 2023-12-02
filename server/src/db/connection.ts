import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    throw new error("db connection error");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    throw new error("could not disconnect from db");
  }
}


export { connectToDatabase, disconnectFromDatabase };
