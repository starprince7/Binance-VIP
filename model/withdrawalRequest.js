import mongoose from 'mongoose'


const schema = mongoose.Schema;
const withdrawalRequestSchema = new schema({
    email: String,
    amount: String,
    wallet_address: String,
    crypto: String,
    date: {
        type: String,
        default: Date,
      },
})

// const WithdrawalRequest = mongoose.model("WithdrawalRequest", withdrawalRequestSchema);

module.exports = mongoose.models.WithdrawalRequest || mongoose.model("WithdrawalRequest", withdrawalRequestSchema);