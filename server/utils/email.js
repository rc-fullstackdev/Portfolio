// const nodemailer = require("nodemailer")

// exports.sendEmail = ({ email = "rc.fullstackdev@gmail.com", subject, message }) => new Promise((resolve, reject) => {
//     try {
//         const transport = nodemailer.createTransport({
//             //👇 when email not send on live add this three line above services
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true,
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASS
//             }
//         })

//         transport.sendMail({
//             to: email,
//             subject,
//             html: message
//         })

//         resolve("email send success")

//     } catch (error) {
//         console.log(error)
//         reject("unable to send email")
//     }
// })


const nodemailer = require("nodemailer")

exports.sendEmail = ({ email, subject, message }) => new Promise(async (resolve, reject) => {
    try {
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // पोर्ट ४६५ सुरक्षित कनेक्शनसाठी
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
            pool: true, // कनेक्शन राखून ठेवण्यासाठी (Fast!)
            tls: { rejectUnauthorized: false } // SSL एरर्स टाळण्यासाठी
        });

        // 👇 इथे आपण 'थांबतोय' (Wait करतोय) जोपर्यंत ईमेल सक्सेस होत नाही
        const info = await transport.sendMail({
            to: email,
            subject,
            html: message
        });

        resolve("email send success");

    } catch (error) {
        console.log("Email Failed:", error);
        reject(error); // जर काही चूक झाली तर इथेच पकडली जाईल
    }
});