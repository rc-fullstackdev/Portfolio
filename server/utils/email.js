const nodemailer = require("nodemailer")

exports.sendEmail = ({ email = "rc.fullstackdev@gmail.com", subject, message }) => new Promise((resolve, reject) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })

        transport.sendMail({
            to: email,
            subject,
            html: message
        })

        resolve("email send success")

    } catch (error) {
        console.log(error)
        reject("unable to send email")
    }
})