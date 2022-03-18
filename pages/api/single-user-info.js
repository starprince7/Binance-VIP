// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import Customer from "../../model/customer";
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
    console.log("The POST request for --- - /api/single-user-info - ---");
    
    

    try {
        // WAIT FOR DATABASE CONNECTION.
        const isDataBaseConnected = await mongoose.connect(dbURI, databaseOptions)

        if (isDataBaseConnected) {          
            try {
                let customer = await Customer.findOne({ email: req.body.email });
                customer && res.json({ customer });
            } catch (error) {
                console.log("Cant Find User!! ---", error)
            }
        }
    } catch (e) {
        console.log('ERR connecting to DB ==>', e)
    }
}
  