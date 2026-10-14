'use client';

export default function AuthModal() {
  const appId = process.env.NEXT_PUBLIC_META_APP_ID;
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_META_REDIRECT_URI || '');
  const encodedReturnUrl = encodeURIComponent(window.location.pathname + window.location.search);       
  const metaLoginUrl = `https://facebook.com/v22.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${encodedReturnUrl}&scope=email,public_profile`;
  const openMetaModal = () => {
    // 2. Open a cleanly sized browser popup window right in the center of the viewport
    const width = 600;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      metaLoginUrl,
      "Meta Login Authentication",
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=no`
    );
  };
}