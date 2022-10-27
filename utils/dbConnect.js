import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  /**
   * @description useFindAndModify & useCreateIndex no longer supported in mongodb 6.0.0
   */
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  });


  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
