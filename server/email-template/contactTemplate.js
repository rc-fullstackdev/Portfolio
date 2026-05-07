exports.contactTemplate = ({ name, email, subject, message, phone, createdAt }) => {
    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
        : "Just now";

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Message</title>
</head>

<body style="margin:0;padding:30px;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<div style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;
box-shadow:0px 4px 15px rgba(0,0,0,0.15);">

    <div style="background:#38bdf8;padding:30px;text-align:center;color:white;">
        <h1 style="margin:0;font-size:26px;">New Inquiry Received</h1>
        <p style="margin-top:8px;font-size:18px;">Check what's new on your portfolio</p>
    </div>

    <div style="padding:30px;">
        <p style="font-size:18px;color:#333;">Hello <strong>Admin</strong>,</p>
        <p style="font-size:16px;color:#555;">You have a new submission. Details below:</p>

        <div style="background:#f0f9ff;border-left:6px solid #38bdf8;padding:20px;margin-top:25px;border-radius:10px;">
            <table style="width:100%; border-collapse:collapse; font-size:15px; color:#333;">
                <tr>
                    <td style="padding:8px 0; font-weight:bold; width:110px;">Name:</td>
                    <td style="padding:8px 0;">${name}</td>
                </tr>
                <tr>
                    <td style="padding:8px 0; font-weight:bold;">Email:</td>
                    <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#38bdf8; text-decoration:none;">${email}</a></td>
                </tr>
                ${phone ? `<tr>
                    <td style="padding:8px 0; font-weight:bold;">Phone:</td>
                    <td style="padding:8px 0;">${phone}</td>
                </tr>` : ''}
                <tr>
                    <td style="padding:8px 0; font-weight:bold;">Subject:</td>
                    <td style="padding:8px 0;">${subject}</td>
                </tr>
                <tr>
                    <td style="padding:8px 0; font-weight:bold;">Sent At:</td>
                    <td style="padding:8px 0; color:#666;">${formattedDate}</td>
                </tr>
            </table>

            <hr style="border:0; border-top:1px solid #d1d5db; margin:15px 0;">

            <p style="font-weight:bold; margin-bottom:10px; color:#0f172a;">Message Content:</p>
            <p style="font-size:15px; line-height:1.6; color:#475569; margin:0; font-style:italic;">
                "${message}"
            </p>
        </div>

        <div style="text-align:center; margin-top:30px;">
            <a href="mailto:${email}" style="background:#38bdf8;color:white;padding:12px 25px;text-decoration:none;font-weight:bold;border-radius:8px;display:inline-block;">
                Reply to Sender
            </a>
        </div>
    </div>

    <div style="background:#f0f9ff;padding:12px;text-align:center;font-size:13px;color:#666;">
        © ${new Date().getFullYear()} Portfolio Admin Panel <br/>
        Maharashtra, India
    </div>
</div>
</body>
</html>
`;
};