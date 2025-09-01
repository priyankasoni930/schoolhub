import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getConnection } from "@/lib/db";
import { schoolSchema } from "@/lib/validations";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const image = formData.get("image");

    let imageUrl = null;

    // Upload image to Vercel Blob if provided
    if (image && image.size > 0) {
      const fileName = `schoolImages/${Date.now()}-${image.name}`;

      const blob = await put(fileName, image, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      imageUrl = blob.url;
    }

    // Save to database with imageUrl instead of local file path
    const connection = await getConnection();

    try {
      const [result] = await connection.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, parseInt(contact), imageUrl, email_id]
      );

      return NextResponse.json({
        success: true,
        message: "School added successfully",
        id: result.insertId,
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("Error adding school:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add school" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const connection = await getConnection();

    try {
      const [rows] = await connection.execute(
        "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY created_at DESC"
      );

      return NextResponse.json({
        success: true,
        schools: rows,
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}
