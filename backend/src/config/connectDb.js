import mongoose from 'mongoose';

async function connect() {
  try {
   await mongoose
      .connect(
        "mongodb+srv://hungthinhh2003:1234567890@cluster0.adwf3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(() => console.log("Connected!"));
  } catch (error) {
      console.log("Failed to connect")
  }
}
export default {connect}
