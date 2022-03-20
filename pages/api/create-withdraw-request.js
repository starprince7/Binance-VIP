// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import Customer from "../../model/customer"
import WithdrawalRequest from "../../model/withdrawalRequest";
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
    console.log("The POST request for --- - /api/create-withdraw-request - ---");
    console.log(req.body)
    
    const { email, amount, wallet_address, crypto } = req.body;

    try {
        // WAIT FOR DATABASE CONNECTION.
        const isDataBaseConnected = await mongoose.connect(dbURI, databaseOptions)

        if (isDataBaseConnected) {          
            try {
                const result = await WithdrawalRequest.create(req.body);
            
                  if (result) {
                      const statusCreated = await Customer.findOneAndUpdate(
                      { email: email },
                      {
                          status: `Your withdrawal request of $${amount} has been logged into the system and is being processed at the moment!`,
                          isTradeOn: false
                      }
                    );
                    
                    res.json({ msg: `Your withdrawal request of $${amount} has been logged into the system and is being processed at the moment!` })
                }
              }
              catch (error) {
                console.log("ERR! Posting WITHDRAW REQUEST!!! ==> ", error);
                error && res.json({ error });
            }
        }
    } catch (e) {
        console.log('ERR connecting to DB ==>', e)
    }
}
  