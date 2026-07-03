import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const serviceTitle = formData.get("serviceTitle") as string;
    const slug = formData.get("slug") as string;

    if (!file) {
      return NextResponse.json({ error: "No print PDF file found." }, { status: 400 });
    }

    console.log("=========================================");
    console.log(`[EMAIL SIMULATION] Forwarding PDF to Production Desk`);
    console.log(`Recipient: VinylSupplyMore@gmail.com`);
    console.log(`File Name: ${file.name}`);
    console.log(`File Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Service Line: ${serviceTitle || "Unknown"} (${slug || "general"})`);
    console.log("=========================================");

    // Simulate brief network latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({
      success: true,
      message: `Print-ready file "${file.name}" sent to VinylSupplyMore@gmail.com.`,
      transactionId: `CLV-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  } catch (err: any) {
    console.error("Error sending print PDF:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
