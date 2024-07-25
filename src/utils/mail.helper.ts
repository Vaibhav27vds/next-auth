import User from "@/models/userModel"
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {

       const hashedToken =  await bcryptjs.hash(userId.toString(), 10)

        //TODO: configure mail for usage

        if(emailType === "Verify"){
            await User.findByIdAndUpdate(userId, {
                verifyToken : hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken : hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000,
            })
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "516f2f0709c7a9",
              pass: "92899f3b828808"
            }
          });

        const mailOptions = {
            from: 'vds@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password" ,
            html: `<p> Click <a href="">here.</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.
            <br>
            </p>`, 
          }

          const mailResponse = await transport.sendMail(mailOptions)

          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}

