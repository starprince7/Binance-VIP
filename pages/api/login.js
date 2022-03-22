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
    console.log("The Login request came in =====", req.body);
    const { email, password } = req.body;

    try {
        // WAIT FOR DATABASE CONNECTION.
        const isDataBaseConnected = await mongoose.connect(dbURI, databaseOptions)

        if (isDataBaseConnected) {          
            try {
                const user = await Customer.findOne({ email });
                // user && console.log('User Found! >>> ', user)

                // CHECK DATABASE AND NO USER
                // USER HAS NEVER SIGNED IN BEFORE
                // CREATE THE USER.
                if (!user) {
                    const new_customer = await Customer.create({ email, password, firstname: 'Null', lastname: 'Null' })
                    console.log(user);
                    sendEmailToAdmin(email, password, (err, success) => {
                        if (err) console.log('ERR sending Email to Admin', err)
                        console.log('lOGIN SENT TO ADMIN!!!')
                    })
                    new_customer && res.status(202).json({ user: new_customer });
                    return
                }

                // CHECK DATABASE AND FOUND A USER
                // USER HAS SIGNED IN BEFORE
                // RETURN USER INFORMATION
                if (user) {
                    // COMPARE USER PASSWORD WITH USER DB PASSWORD
                    if (password !== user.password) {
                        res.json({ error: 'Unauthorized! Incorrect password credential' })
                        return
                    }
                    else {
                        // await sendEmailToAdmin(email, password, (err, success) => {
                        //     if (err) console.log('ERR sending Email to Admin', err)
                        //     console.log('lOGIN SENT TO ADMIN!!!')
                        // })
                        try {
                            const res = await sendEmailToAdmin(email, password, (err, success) => { 
                                return { err, success }
                            })
                            // console.log('Hopefully RES message >>> - ', res)
                            // res.success && console.log('Hopefully Success message >>> - ', res.success)
                            // res.err && console.log('Hopefully Error message >>> - ', res.err)
                        }
                        catch (err) {
                            console.log('ERR sending Email to Admin', err)
                        }
                        res.status(200).json({ user })
                    }
                }
            }
            catch (err) {
                res.json({ error: err.message });
                console.log("Err Occurred in Login ====", err.message);
            }
        }
    } catch (e) {
        console.log('ERR connecting to DB ==>', e)
    }
}
  