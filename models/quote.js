const mongoose = require("mongoose");

// Define Schemes
const quoteSchema = new mongoose.Schema(
  {
    author: { type: String },
    quote: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
const Quote = mongoose.model("quote", quoteSchema);

module.exports = Quote;
