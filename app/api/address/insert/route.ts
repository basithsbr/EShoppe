import { NextRequest, NextResponse } from 'next/server';

interface AddressPayload {

  address1: string
  address2: string
  district: string
  zip: string
  city: string
  state: string
  landMark: string
  mobile1: string
  mobile2: string
  landline: string
  email: string
  // Add or modify fields to match your database/form
}

export async function POST(request: Request) {
  try {
    
    const body: AddressPayload = await request.json();
    
    const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';
    const pythonEndpoint = `${PYTHON_BACKEND_URL}/addAddress`;
    console.log('Forwarding address to Python backend:', body);
    const pythonResponse = await fetch(pythonEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional: Include an API key or Token here if Python requires authentication
        // 'Authorization': `Bearer ${process.env.PYTHON_API_KEY}`,
      },
      body: JSON.stringify(body),
    }); 

    // 5. Parse the response coming back from Python
    const responseData = await pythonResponse.json();

    // 6. Return the exact status and data back to your React frontend
    return NextResponse.json(responseData, { status: pythonResponse.status });

  } catch (error) {
    console.error('Error forwarding address to Python backend:', error);

    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


// export async function GET(request: Request) {
//   try {
//     // 1. Extract the URL parameters from the request
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');

//     // 2. Validate that the userId was provided by the frontend
//     if (!userId) {
//       return NextResponse.json({ error: 'userId parameter is required' }, { status: 400 });
//     }

//     const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';

//     // 3. Forward the userId as a query parameter to Python
//     const pythonEndpoint = `${PYTHON_BACKEND_URL}/api/address?userId=${userId}`;

//     const pythonResponse = await fetch(pythonEndpoint, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const responseData = await pythonResponse.json();
//     return NextResponse.json(responseData, { status: pythonResponse.status });

//   } catch (error) {
//     console.error('Error fetching addresses from Python backend:', error);
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }
