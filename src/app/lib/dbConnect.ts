const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
