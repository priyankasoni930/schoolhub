import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import { schoolSchema } from '@/lib/validations';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const schoolData = {
      name: formData.get('name'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      contact: formData.get('contact'),
      email_id: formData.get('email_id'),
    };

    // Validate the data
    const validatedData = schoolSchema.parse(schoolData);
    
    let imagePath = null;
    const imageFile = formData.get('image');
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create unique filename
      const fileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(process.cwd(), 'public', 'schoolImages', fileName);
      
      // Ensure directory exists
      await mkdir(path.dirname(filePath), { recursive: true });
      
      // Write file
      await writeFile(filePath, buffer);
      imagePath = `/schoolImages/${fileName}`;
    }

    // Save to database
    const connection = await getConnection();
    
    try {
      const [result] = await connection.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          validatedData.name,
          validatedData.address,
          validatedData.city,
          validatedData.state,
          parseInt(validatedData.contact),
          imagePath,
          validatedData.email_id
        ]
      );

      return NextResponse.json({ 
        success: true, 
        message: 'School added successfully',
        id: result.insertId 
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add school' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const connection = await getConnection();
    
    try {
      const [rows] = await connection.execute(
        'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY created_at DESC'
      );

      return NextResponse.json({ 
        success: true, 
        schools: rows 
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}