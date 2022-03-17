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
    if(req.method === 'POST') return res.status(201).json({msg: 'GET REQUEST ONLY!'})
    console.log("The GET request for /api/all-customers  =====");

    try {
        // WAIT FOR DATABASE CONNECTION.
        const isDataBaseConnected = await mongoose.connect(dbURI, databaseOptions)

        if (isDataBaseConnected) {          
            try {
                const customers = await Customer.find();    /* .select("-password") REMOVED! */
                customers && res.json({ customers });
            }
            catch (error) {
                console.log("ERR! Getting Customers from Database!", error);
                error && res.json({ error });
            }
        }
    } catch (e) {
        console.log('ERR connecting to DB ==>', e)
    }
}
  