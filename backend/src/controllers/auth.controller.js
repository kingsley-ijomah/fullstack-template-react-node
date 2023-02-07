const authServices = require('../services/auth.services');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.loginAuth = async (req, res) => {
  try {
    const token = await authServices.login(req.body);
    req.session = { token: token }; // set cookie session
    return res.status(200).json({
      message: 'User logged in successfully!',
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.logoutAuth = async (req, res) => {
  req.session = null;
  return res.status(200).send({ message: 'User logged out successfully!' });
};

exports.activeAuth = async (req, res) => {
  try {
    const token = req.session.token;
    const user = await authServices.active(token);
    return res.status(200).json({
      message: 'User retrieved successfully!',
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.forgotPasswordAuth = async (req, res) => {
  try {
    const token = await authServices.forgotPassword(req.body);

    const msg = {
      to: req.body.email,
      from: process.env.SENDGRID_API_KEY, // Use the email address or domain you verified with sendgrid
      subject: 'Reset Password',
      text: 'Reset Password',
      html: `
        <h1>Reset Password</h1>
        <p>Click the link below to reset your password</p>
        <a href="${process.env.SENDGRID_DOMAIN}/reset-password/${token}">Reset Password</a>
      `,
    };

    sgMail.send(msg);

    return res.status(200).json({
      message: 'Email sent successfully!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.resetPasswordAuth = async (req, res) => {
  try {
    const token = req.params.token;
    await authServices.resetPassword(token, req.body);
    return res.status(200).json({
      message: 'Password reset successfully!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};