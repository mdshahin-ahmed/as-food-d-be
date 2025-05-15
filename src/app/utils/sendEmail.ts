/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer'
import config from '../config'
import AppError from '../errors/app.error'
import httpStatus from 'http-status'

export const sendEmail = async (to: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: config.app_email,
        pass: config.app_password,
      },
    })

    await transporter.sendMail({
      from: config.app_email, // Sender address
      to, // Receiver's email
      subject: 'Reset your ASFCS password within 10 minutes!', // Subject line
      text: '', // Plain text body (optional)
      html, // HTML body
    })
  } catch (error: any) {
    // Log the error
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to sent OTP', error)

    // return { success: false, error: error.message || 'Unknown error' };
  }
}
