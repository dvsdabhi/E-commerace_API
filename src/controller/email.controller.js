require("dotenv").config();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const Otp = require("../models/otp.model");
const User = require("../models/user.model");


// Your nodemailer configuration
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user : process.env.ADMIN_EMAIL,
        pass : process.env.EMAIL_PASS
    },
});

const send_pwd_otp_email = async (req,res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

      // Email configuration
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: 'Password Change OTP',
        text: `Your OTP for password change is: ${otp}`,
    };
    const newOtp = new Otp({
        email,
        otp
    });
    await newOtp.save();
    transporter.sendMail(mailOptions,(error)=>{
        if(error){
            res.status(500).send({message:error.message});
        } else {
            res.status(200).send({status:200,message:'Email sent successfully'});
        }
    });
};

const verify_otp = async (req,res) => {
    const { otp, email, newPassword } = req.body;
    try {
        const otpRecord  = await Otp.findOne({email});
        if(!otpRecord){
            return res.status(400).send({status:400,message:"otp is expires"})
        }else{
            if(otpRecord.otp === otp ){
                const hashPassword = await bcrypt.hash(newPassword, 10);
                const findUser = await User.findOneAndUpdate({email:email},
                    {$set:{password:hashPassword}},
                    {new:true}
                );
                return res.status(200).send({status:200,message:"Password change successfully"});
            }else{
                return res.status(400),send({status:400,message:"Enter a valid otp"});
            }
        }
    } catch (error) {
        res.status(404).send({status:404,message:error.message});
    }
}

module.exports = { send_pwd_otp_email, verify_otp };