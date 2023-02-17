const authServices = require('../services/auth.services');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.loginAuth = async (req, res) => {
  try {
    const token = await authServices.login(req.body, req.environment);
    req.session = { token: token }; // set cookie session
    return res.status(200).json({
      message: 'User logged in successfully!',
      token: token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// logout is handled by frontend

exports.activeAuth = async (req, res) => {
  try {
    const token = req.session.token;
    const user = await authServices.active(token, req.environment);
    return res.status(200).json({
      message: 'User retrieved successfully!',
      user: user,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.forgotPasswordAuth = async (req, res) => {
  try {
    const token = await authServices.forgotPassword(req.body, req.environment);
    const url = `${process.env.FRONTEND_DOMAIN}/reset-password/?token=${token}`;

    const msg = {
      to: req.body.email,
      from: process.env.FROM_EMAIL, // Use the email address or domain you verified with sendgrid
      subject: 'Reset Password Request',
      text: 'Reset Password Request',
      html: `
        <h3>Reset Password</h3>
        <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>

        <a href="${url}">${url}</a>

        <p>Thanks,</p>
        <p>Dev Team</p>

        <p>NOTE: This is an automated email, please do not reply to this email.</p>
      `,
    };

    sgMail.send(msg);

    return res.status(200).json({
      message: 'Email sent successfully!',
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.resetPasswordAuth = async (req, res) => {
  try {
    const token = req.params.token;
    await authServices.resetPassword(token, req.body, req.environment);
    return res.status(200).json({
      message: 'Password reset successfully!',
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
