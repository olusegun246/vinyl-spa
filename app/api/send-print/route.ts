import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const serviceTitle = (formData.get("serviceTitle") as string) || "Unknown";
    const slug = (formData.get("slug") as string) || "general";
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const occasion = (formData.get("occasion") as string) || "Personal";

    if (!file) {
      return NextResponse.json({ error: "No print PDF file found." }, { status: 400 });
    }

    // Basic guard: only accept PDFs
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
    }

    // Convert the uploaded file into a Buffer we can attach to the email
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

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

    // Send the email with the PDF attached, to the submissions inbox
    await transporter.sendMail({
      from: `"Vinyl Supply & More Site" <${user}>`,
      to: "vinylsubmissions@gmail.com",
      subject: `New Template.io Design Submission: ${firstName} ${lastName} - ${serviceTitle}`,
      text: `A new print-ready PDF design has been submitted through the website.

Customer Contact Details:
-------------------------
Name: ${firstName} ${lastName}
Phone: ${phone}
Occasion: ${occasion}

Print Specs Selected:
---------------------
Product Type: ${serviceTitle}
Dimensions key: ${slug}
File Name: ${file.name}
File Size: ${(file.size / 1024 / 1024).toFixed(2)} MB

The PDF design file is attached to this email.`,
      attachments: [
        {
          filename: file.name,
          content: buffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: `Print-ready file "${file.name}" sent to vinylsubmissions@gmail.com.`,
    });
  } catch (err) {
    console.error("Error sending print PDF:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}