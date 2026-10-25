import { NextRequest, NextResponse } from 'next/server';

interface GenericPayload {
  userId: string
  userName: string
  userEmail: string
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
  action: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  console.log("action - ", action);

  const genericInputReq: GenericPayload = await request.json();
  const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';

  switch (action) {
    case "getContactDetails":
      const pythonEndpoint = `${PYTHON_BACKEND_URL}/getAddrByUserId`;
      const method = 'POST';
      return loadData({ pythonEndpoint, method, genericInputReq });
    
    default:
      return NextResponse.json({ error: "Invalid GET operation" }, { status: 400 });
  }

}


export async function POST(request: NextRequest) {

  const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';
  const genericInputReq: GenericPayload = await request.json();
  console.log("action - ", genericInputReq.action);
  const action = genericInputReq.action;
  delete (genericInputReq as any).action; 
  let pythonEndpoint;
  const method = 'POST';
  // const { password, ...cleanedPayload } = genericInputReq;
  switch (action) {
    case "contact_details":
      pythonEndpoint = `${PYTHON_BACKEND_URL}/getAddrByUserId`;
      return loadData({ pythonEndpoint, method, genericInputReq });
    case "update_contact_details":
      pythonEndpoint = `${PYTHON_BACKEND_URL}/updateAddrByUserId`;
      return loadData({ pythonEndpoint, method, genericInputReq });
    default:
      return NextResponse.json({ error: "Invalid GET operation" }, { status: 400 });
  }

}

async function loadData({ pythonEndpoint, method, genericInputReq }: { pythonEndpoint: any, method: any, genericInputReq: GenericPayload }) {

  try {
    console.log('Forwarding address to Python backend:', genericInputReq);
    const pythonResponse = await fetch(pythonEndpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // Optional: Include an API key or Token here if Python requires authentication
        // 'Authorization': `Bearer ${process.env.PYTHON_API_KEY}`,
      },
      body: JSON.stringify(genericInputReq),
    });

    // 5. Parse the response coming back from Python
    const responseData = await pythonResponse.json();
    console.log("responseData - ",responseData);
    return NextResponse.json(responseData, { status: pythonResponse.status });
  }
  catch (error) {
    console.error('Error forwarding address to Python backend:', error);

    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}