import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config';

const app = express();

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// Resend Configuration
// ===============================

const resend = new Resend(process.env.RESEND_API_KEY);


// ===============================
// Health Check
// ===============================

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'portfolio-api'
  });
});


// ===============================
// Contact Form
// ===============================

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {};

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and message are required.'
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `New Portfolio Enquiry — ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Enquiry</h2>

          <p>
            You have received a new message through your portfolio website.
          </p>

          <hr />

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p style="white-space: pre-line;">
            ${message}
          </p>

          <hr />

          <p>
            You can reply directly to this email to contact ${name}.
          </p>
        </div>
      `,

      text: `
New Portfolio Enquiry

Name: ${name}
Email: ${email}

Message:
${message}

Reply directly to this email to contact ${name}.
      `
    });

    if (error) {
      console.error('Resend error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to send your message right now.'
      });
    }

    console.log(`Portfolio enquiry sent successfully. Email ID: ${data?.id}`);

    return res.status(201).json({
      success: true,
      message: 'Thanks. Your message has been sent successfully.'
    });

  } catch (error) {
    console.error('Server error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your message.'
    });
  }
});


// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Portfolio API running on port ${PORT}`);
});