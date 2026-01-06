    import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route.js";

const emailSchema = z.object({
  recipients: z
    .string()
    .min(1, "At least one recipient is required")
    .refine(
      (val) => {
        const emails = val.split(",").map((e) => e.trim());
        return emails.every((email) => z.string().email().safeParse(email).success);
      },
      { message: "All recipients must be valid email addresses" }
    ),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().min(1, "Message is required").max(5000, "Message too long"),
});

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { recipients, subject, message } = validation.data;
    const recipientList = recipients.split(",").map((email) => email.trim());

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipientList,
      subject: subject,
      text: message,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <p style="white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">Sent via Email Notification App by ${session.user?.name || session.user?.email || "User"}</p>
      </div>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: `Email sent successfully to ${recipientList.length} recipient(s)`,
      recipients: recipientList,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { 
        error: "Failed to send email. Please check your configuration and try again.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}