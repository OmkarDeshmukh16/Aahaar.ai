import { NextResponse } from 'next/server'

/**
 * Mock waitlist endpoint.
 * Logs the email, waits 500ms (simulated processing), returns success.
 * In production, this would write to a database or email service.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log(`[Waitlist] New signup: ${email}`)

    return NextResponse.json({
      success: true,
      message: 'Added to waitlist',
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    )
  }
}
