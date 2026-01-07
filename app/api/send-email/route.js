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
  console.log("\n📧 ═══════════════════════════════════");
  console.log("📧 EMAIL SEND REQUEST RECEIVED");
  console.log("📧 ═══════════════════════════════════");
  
  try {
    // Check session
    const session = await getServerSession(authOptions);
    console.log("👤 Session check:", session ? "✅ Authenticated" : "❌ Not authenticated");
    
    if (!session) {
      console.log("❌ Unauthorized - no session");
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }
    
    console.log("👤 User:", session.user?.name || session.user?.email);

    // Parse and validate request
    const body = await request.json();
    console.log("📝 Request body received");
    console.log("   Recipients:", body.recipients);
    console.log("   Subject:", body.subject);
    
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      console.log("❌ Validation failed:", validation.error.errors[0].message);
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.log("✅ Validation passed");

    const { recipients, subject, message } = validation.data;
    const recipientList = recipients.split(",").map((email) => email.trim());
    console.log("📬 Sending to:", recipientList.length, "recipient(s)");

    // Log email configuration (without showing full password)
    console.log("\n🔧 Email Configuration:");
    console.log("   Host:", process.env.EMAIL_SERVER_HOST || "❌ MISSING");
    console.log("   Port:", process.env.EMAIL_SERVER_PORT || "❌ MISSING");
    console.log("   User:", process.env.EMAIL_SERVER_USER || "❌ MISSING");
    console.log("   Password:", process.env.EMAIL_SERVER_PASSWORD ? "✅ Set (length: " + process.env.EMAIL_SERVER_PASSWORD.length + ")" : "❌ MISSING");
    console.log("   From:", process.env.EMAIL_FROM || "❌ MISSING");

    // Check for missing credentials
    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
      console.log("❌ Missing email credentials!");
      return NextResponse.json(
        { error: "Email server not configured. Please contact administrator." },
        { status: 500 }
      );
    }

    console.log("\n📤 Creating transporter...");
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      debug: true, // Enable debug output
      logger: true, // Log to console
    });

    console.log("✅ Transporter created");

    // Verify connection
    console.log("\n🔍 Verifying SMTP connection...");
    try {
      await transporter.verify();
      console.log("✅ SMTP connection verified");
    } catch (verifyError) {
      console.error("❌ SMTP verification failed:", verifyError.message);
      return NextResponse.json(
        { 
          error: "Failed to connect to email server",
          details: verifyError.message
        },
        { status: 500 }
      );
    }

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

    console.log("\n📨 Sending email...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email sent successfully!");
    console.log("   Message ID:", info.messageId);
    console.log("   Response:", info.response);
    console.log("📧 ═══════════════════════════════════\n");

    return NextResponse.json({
      success: true,
      message: `Email sent successfully to ${recipientList.length} recipient(s)`,
      recipients: recipientList,
    });
  } catch (error) {
    console.error("\n❌ ═══════════════════════════════════");
    console.error("❌ EMAIL SENDING ERROR");
    console.error("❌ ═══════════════════════════════════");
    console.error("Error type:", error.constructor.name);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    if (error.response) {
      console.error("Server response:", error.response);
    }
    
    if (error.responseCode) {
      console.error("Response code:", error.responseCode);
    }
    
    console.error("Full error:", error);
    console.error("❌ ═══════════════════════════════════\n");
    
    return NextResponse.json(
      { 
        error: "Failed to send email. Please check your configuration and try again.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}



//     import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import nodemailer from "nodemailer";
// import { z } from "zod";
// import { authOptions } from "../auth/[...nextauth]/route.js";

// const emailSchema = z.object({
//   recipients: z
//     .string()
//     .min(1, "At least one recipient is required")
//     .refine(
//       (val) => {
//         const emails = val.split(",").map((e) => e.trim());
//         return emails.every((email) => z.string().email().safeParse(email).success);
//       },
//       { message: "All recipients must be valid email addresses" }
//     ),
//   subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
//   message: z.string().min(1, "Message is required").max(5000, "Message too long"),
// });

// export async function POST(request) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session) {
//       return NextResponse.json(
//         { error: "Unauthorized. Please log in." },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const validation = emailSchema.safeParse(body);

//     if (!validation.success) {
//       return NextResponse.json(
//         { error: validation.error.errors[0].message },
//         { status: 400 }
//       );
//     }

//     const { recipients, subject, message } = validation.data;
//     const recipientList = recipients.split(",").map((email) => email.trim());

//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_SERVER_HOST,
//       port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_FROM,
//       to: recipientList,
//       subject: subject,
//       text: message,
//       html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
//         <p style="white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
//         <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
//         <p style="color: #666; font-size: 12px;">Sent via Email Notification App by ${session.user?.name || session.user?.email || "User"}</p>
//       </div>`,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({
//       success: true,
//       message: `Email sent successfully to ${recipientList.length} recipient(s)`,
//       recipients: recipientList,
//     });
//   } catch (error) {
//     console.error("Email sending error:", error);
//     return NextResponse.json(
//       { 
//         error: "Failed to send email. Please check your configuration and try again.",
//         details: error instanceof Error ? error.message : "Unknown error"
//       },
//       { status: 500 }
//     );
//   }
// }
