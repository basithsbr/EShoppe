// app/api/auth/meta/callback/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const url = searchParams.get('state'); 

  const targetRedirectPath = url ? decodeURIComponent(url) : `${process.env.NEXT_PUBLIC_BASE_PATH}/shoppe`;
  if (error || !code) {
    return NextResponse.json({ error: `Authentication failed: ${error}` }, { status: 400 });
  }

  try {
    // 1. Exchange the temporary authorization code for a secure Access Token
    const tokenUrl = `https://graph.facebook.com/v22.0/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_META_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_META_REDIRECT_URI}&client_secret=${process.env.META_APP_SECRET}&code=${code}`;
    
    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();
    // Log the token data for debugging
    if (!tokenResponse.ok) {
      return NextResponse.json({ error: 'Failed to retrieve access token from Meta' }, { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // 2. Immediately call Meta's Graph API using the token to grab user details
    const graphUrl = `https://graph.facebook.com/v22.0/me?access_token=${accessToken}&fields=name,email,picture`;
    const profileResponse = await fetch(graphUrl);
    const profileData = await profileResponse.json();
    console.log("profileData:", profileData); 
    if (!profileResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch profile details from Meta' }, { status: 400 });
    }

    // 3. Extract user info
    const name = profileData.name || '';
    const email = profileData.email || '';
    const avatar = profileData.picture?.data?.url || '';

    // 4. Safely redirect the browser back to your Next.js frontend UI dashboard route
    console.log("Redirecting to:", targetRedirectPath, "with user info:", { name, email, avatar });
    const redirectUrl = new URL(targetRedirectPath, request.url);
    redirectUrl.searchParams.set('name', name);
    redirectUrl.searchParams.set('email', email);
    redirectUrl.searchParams.set('avatar', avatar);

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error during authentication' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 1. Extract the raw client token passed from your custom login button script
    const { access_token } = await request.json();

    if (!access_token) {
      return NextResponse.json({ error: "Missing required token payload" }, { status: 400 });
    }

    // 2. Call Meta's Graph API directly from your server to securely fetch user details
    const graphUrl = `https://graph.facebook.com/v22.0/me?access_token=${access_token}&fields=name,email,picture`;
    const profileResponse = await fetch(graphUrl);
    const profileData = await profileResponse.json();

    if (!profileResponse.ok) {
      return NextResponse.json({ error: "Failed to verify token with Meta servers" }, { status: 400 });
    }

    // 3. Extract user profile details
    const name = profileData.name || '';
    const email = profileData.email || '';
    const avatar = profileData.picture?.data?.url || '';

    const sessionData = JSON.stringify({ name, email, avatar });
    const cookieStore = await cookies();
    
    cookieStore.set({
      name: 'user_session',
      value: sessionData,
      httpOnly: true, // Prevents cross-site scripting (XSS) attacks from stealing user data
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 // Session lasts for 24 hours
    });

    // Return a clean success status response back to your client-side button handler
    return NextResponse.json({ status: "success", name , email, avatar });

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error during token processing" }, { status: 500 });
  }
}
