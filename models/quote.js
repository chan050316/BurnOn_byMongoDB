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

// quoteSchema.statics.getQuoteData = async () => {
//   try {
//     const quotes = await Quote.find();
//     console.log(quotes);
//     return quotes;
//   } catch (e) {
//     console.log(e);
//   }
// };

// Create Model & Export
const Quote = mongoose.model("quote", quoteSchema);

module.exports = Quote;
