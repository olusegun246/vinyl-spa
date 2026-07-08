import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const email = (formData.get("email") as string) || "";
    const occasion = (formData.get("occasion") as string) || "Personal";
    const projectTitle = (formData.get("projectTitle") as string) || "Unknown Project";
    const description = (formData.get("description") as string) || "";

    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json({ error: "Contact fields are required." }, { status: 400 });
    }

    // Make sure the credentials exist before trying to send
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.");
      return NextResponse.json(
        { error: "Email is not configured on the server." },
        { status: 500 }
      );
    }

    // Set up the Gmail transporter (sends through vinylsubmissions@gmail.com)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    // Send the email to the submissions inbox
    await transporter.sendMail({
      from: `"Vinyl Supply & More Site" <${user}>`,
      to: "vinylsubmissions@gmail.com",
      subject: `New Project Inquiry: ${firstName} ${lastName} - ${projectTitle}`,
      text: `A customer has sent an inquiry regarding a previous project from the Our Work gallery.

Customer Contact Details:
-------------------------
Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}
Occasion: ${occasion}

Inquired Project:
-----------------
Project Style: ${projectTitle}

Custom Tweaks / Description:
----------------------------
${description || "(No modifications specified. Customer wants the project style as shown.)"}`,
    });

    return NextResponse.json({
      success: true,
      message: `Inquiry for "${projectTitle}" sent to vinylsubmissions@gmail.com.`,
    });
  } catch (err) {
    console.error("Error sending gallery inquiry:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
