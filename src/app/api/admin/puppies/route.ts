import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'puppies.json');

// GET - Get all puppies
export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    const puppies = JSON.parse(fileContents);
    return NextResponse.json(puppies);
  } catch (error) {
    // If file doesn't exist, return empty array
    return NextResponse.json([]);
  }
}

// POST - Create new puppy
export async function POST(request: NextRequest) {
  try {
    const newPuppy = await request.json();
    
    // Read existing puppies
    let puppies = [];
    try {
      const fileContents = await fs.readFile(DATA_FILE, 'utf8');
      puppies = JSON.parse(fileContents);
    } catch {
      // File doesn't exist yet, start with empty array
    }
    
    // Add new puppy with generated ID
    const puppyWithId = {
      ...newPuppy,
      id: newPuppy.id || `puppy-${Date.now()}`,
    };
    
    puppies.push(puppyWithId);
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(puppies, null, 2));
    
    return NextResponse.json(puppyWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create puppy' },
      { status: 500 }
    );
  }
}

// PUT - Update puppy
export async function PUT(request: NextRequest) {
  try {
    const updatedPuppy = await request.json();
    
    // Read existing puppies
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    let puppies = JSON.parse(fileContents);
    
    // Find and update puppy
    const index = puppies.findIndex((p: any) => p.id === updatedPuppy.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Puppy not found' },
        { status: 404 }
      );
    }
    
    puppies[index] = updatedPuppy;
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(puppies, null, 2));
    
    return NextResponse.json(updatedPuppy);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update puppy' },
      { status: 500 }
    );
  }
}

// DELETE - Delete puppy
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Puppy ID required' },
        { status: 400 }
      );
    }
    
    // Read existing puppies
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    let puppies = JSON.parse(fileContents);
    
    // Filter out the puppy to delete
    puppies = puppies.filter((p: any) => p.id !== id);
    
    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(puppies, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete puppy' },
      { status: 500 }
    );
  }
}

