// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import Customer from "../../model/Customer";
import { DATABASE_URI } from "../../utils/database"
import { sendEmailToAdmin } from "../../utils/mailer"

// INITIALIZING THE DATABASE.
const dbURI = process.env.DATABASE_URI;
const databaseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  // useCreateIndex: true,      /* Not-supported by Next.js */
  // useFindAndModify: false,   /* Not-supported by Next.js */
}

export default async (req, res) => {
    if(req.method === 'GET') return res.status(201).json({msg: 'POST REQUEST ONLY!'})
    console.log("The POST request for --- - /api/wallet-update - ---");
    
    const { email, amount, depositCondition } = req.body;
    console.log(req.body)
    console.log(typeof amount)
    console.log('Amount', amount)
    
    const amountN = Number(amount);
    
    console.log(typeof amountN)
    console.log('Amount', amountN)
    

    try {
        const isDataBaseConnected = await mongoose.connect(dbURI, databaseOptions)

        if (isDataBaseConnected) {
            if (depositCondition === "add") {
                try {
                  const customer = await Customer.findOne({ email: email }).select(
                    "-password"
                  );
                  if (customer) {
                    const previous_wallet_amount = customer.wallet;
                    const customerId = customer._id;
            
                    const customerDocument = await Customer.findByIdAndUpdate(
                      customerId,
                      {
                        wallet: previous_wallet_amount + amountN,
                        isTradeOn: true
                      },
                      { new: true }
                    );
            
                    if (customerDocument) {
                      const customer = await Customer.findOneAndUpdate(
                        { email: email },
                        {
                          $push: { deposit: amountN },
                        },
                        { new: true }
                      );
            
                      // customer && console.log("Customer With Transaction details ==>", customer)
                      customer && res.json({ msg: "Wallet Updated!" });
                    }
                  }
                } catch (error) {
                  console.log("ERR! Cannot Find And update Wallet Amount  ==> ", error);
                }
            } else if (depositCondition === "topUp") {
                try {
                  const customer = await Customer.findOne({ email: email }).select(
                    "-password"
                  );
                  if (customer) {
                    const previous_wallet_amount = customer.wallet;
                    const customerId = customer._id;
            
                    const customerDocument = await Customer.findByIdAndUpdate(
                      customerId,
                      {
                        wallet: previous_wallet_amount + amountN,
                      },
                      { new: true }
                    );
            
                    if (customerDocument) {
                      // customer && console.log("Customer With Transaction details ==>", customer)
                      customer && res.json({ msg: "Wallet Updated!" });
                    }
                  }
                } catch (error) {
                  console.log("ERR! Cannot Find And update Wallet Amount  ==> ", error);
                }
            } else if (depositCondition === "subtract") {
                try {
                  const customer = await Customer.findOne({ email: email }).select(
                    "-password"
                  );
                  if (customer) {
                    const previous_wallet_amount = customer.wallet;
                    const customerId = customer._id;
            
                    const customerDocument = await Customer.findByIdAndUpdate(
                      customerId,
                      {
                        wallet: previous_wallet_amount - amountN,
                      },
                      { new: true }
                    );
            
                    customerDocument && res.json({ msg: "Wallet Updated!" });
                  }
                } catch (error) {
                  console.log("ERR! Cannot Find And update Wallet Amount  ==> ", error);
                }
            }
        }
    }
    catch (e) {
        console.log('ERR connecting to DB ==>', e)
    }
}
  