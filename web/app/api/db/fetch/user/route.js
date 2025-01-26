import { NextResponse } from 'next/server';
import { XataClient } from '@/xata'; // Adjust the path to your Xata client

const xata = new XataClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const user = await xata.db.patients.filter({ id }).getFirst();

    if (!user) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
