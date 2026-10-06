import { NextRequest, NextResponse } from 'next/server';
import { PaymentCheckResponse } from '@/types/UPI';

export async function GET(request: NextRequest): Promise<NextResponse<PaymentCheckResponse | { error: string }>> {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
  }

  try {
    // 🛠️ TODO: Query your Database or Payment Gateway API here to check true status
    // const order = await db.order.findUnique({ where: { id: orderId } });
    
    // Simulating a temporary backend status for this example
    const mockStatus: 'PENDING' | 'SUCCESS' | 'FAILED' = Math.random() > 0.20 ? 'SUCCESS' : 'PENDING';

    return NextResponse.json({
      status: mockStatus,
      orderId: orderId,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
