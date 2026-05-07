const asyncHandler = require("express-async-handler")
const Skills = require("../models/Skills")
const Experiences = require("../models/Experiences")
const Projects = require("../models/Projects")
const About = require("../models/About")
const Education = require("../models/Education")
const Contact = require("../models/Contact")
const { sendEmail } = require("../utils/email")
const { contactTemplate } = require("../email-template/contactTemplate")

exports.getPublicSkills = asyncHandler(async (req, res) => {
    const frontend = await Skills.find({ category: "frontend" }).sort({ order: 1 })
    const backend = await Skills.find({ category: "backend" }).sort({ order: 1 })
    res.json({ message: "Skills Fetched Successfully", frontend, backend })
})

exports.getPublicExperience = asyncHandler(async (req, res) => {
    const result = await Experiences.find().sort({ order: 1 })
    res.json({ message: "Experience Fetched Successfully", result })
})

exports.getPublicProjects = asyncHandler(async (req, res) => {
    const result = await Projects.find().sort({ createdAt: -1 })
    res.json({ message: "Project Fetch Successfully", result })
})

exports.ReadPublicAboutInfo = asyncHandler(async (req, res) => {
    const result = await About.findOne()
    res.json({ message: "About Information Fetch Successfully", result })
})

exports.getPublicEducationInfo = asyncHandler(async (req, res) => {
    const result = await Education.find()
    res.status(201).json({ message: "Education Information Fetch Successfully", result })
})

exports.addContactInfo = asyncHandler(async (req, res) => {

    const { name, email, phone, subject, message } = req.body;

    const result = await Contact.create({ name, email, phone, subject, message });

    try {
        await sendEmail({
            email: process.env.ADMIN_EMAIL,
            subject: `New Contact: ${subject}`,
            message: contactTemplate({
                name,
                email,
                phone,
                subject,
                message,
                createdAt: result.createdAt
            })
        });


        return res.status(201).json({
            message: "Message sent and saved successfully"
        });

    } catch (error) {
        console.error("EMAIL_ERROR:", error);
        return res.status(500).json({
            message: "Message saved, but email notification failed",
            error: error.message
        });
    }
});