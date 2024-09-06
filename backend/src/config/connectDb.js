import mongoose from 'mongoose';

async function connect() {
  try {
   await mongoose
      .connect(
        "mongodb+srv://binhminh19112003:coqZxFJI4bdafhu8@wtfchat.8qpy7.mongodb.net/?retryWrites=true&w=majority&appName=WTFChat"
      )
      .then(() => console.log("Connected!"));
  } catch (error) {
      console.log("Failed to connect")
  }
}
export default {connect}
