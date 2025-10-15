import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'breeds.json');

// Helper function to create URL-safe slugs
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .trim();
}

// GET - Get all breeds
export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    const breeds = JSON.parse(fileContents);
    return NextResponse.json(breeds);
  } catch (error) {
    // If file doesn't exist, return empty array
    return NextResponse.json([]);
  }
}

// POST - Create new breed
export async function POST(request: NextRequest) {
  try {
    const newBreed = await request.json();
    
    // Read existing breeds
    let breeds = [];
    try {
      const fileContents = await fs.readFile(DATA_FILE, 'utf8');
      breeds = JSON.parse(fileContents);
    } catch {
      // File doesn't exist yet, start with empty array
    }
    
    // Add new breed with generated ID and slug
    const slug = createSlug(newBreed.name);
    const breedWithId = {
      ...newBreed,
      id: newBreed.id || `breed-${Date.now()}`,
      slug,
    };
    
    breeds.push(breedWithId);
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(breeds, null, 2));
    
    return NextResponse.json(breedWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create breed' },
      { status: 500 }
    );
  }
}

// PUT - Update breed
export async function PUT(request: NextRequest) {
  try {
    const updatedBreed = await request.json();
    
    // Read existing breeds
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    let breeds = JSON.parse(fileContents);
    
    // Find and update breed
    const index = breeds.findIndex((b: any) => b.id === updatedBreed.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Breed not found' },
        { status: 404 }
      );
    }
    
    // Update slug if name changed
    const slug = createSlug(updatedBreed.name);
    breeds[index] = { ...updatedBreed, slug };
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(breeds, null, 2));
    
    return NextResponse.json(breeds[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update breed' },
      { status: 500 }
    );
  }
}

// DELETE - Delete breed
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Breed ID required' },
        { status: 400 }
      );
    }
    
    // Read existing breeds
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    let breeds = JSON.parse(fileContents);
    
    // Filter out the breed to delete
    breeds = breeds.filter((b: any) => b.id !== id);
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(breeds, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete breed' },
      { status: 500 }
    );
  }
}

