interface MetaModalOptions {
  appId: string;
  redirectUri: string;
  scope?: string;
  state?: string;
}


export const openMetaModal = ({
  appId,
  redirectUri,
  scope = "email,public_profile",
  state = ""
}: MetaModalOptions) => {
  if (typeof window === "undefined") return;

  // 1. Construct the secure login URL
  const encodedRedirect = encodeURIComponent(redirectUri);
//   let metaLoginUrl = `https://facebook.com{appId}&redirect_uri=${encodedRedirect}&scope=${scope}&display=popup`;
  let metaLoginUrl = `https://m.facebook.com/v22.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=email,public_profile&display=page`;
{/* <a  href={metaLoginUrl} rel="noopener noreferrer" className="hidden sm:inline-flex"> */}

  // 2. Append state parameter if passed
  if (state) {
    metaLoginUrl += `&state=${encodeURIComponent(state)}`;
  }

  // 3. Configure centered window dimensions
  const width = 600;
  const height = 650;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  // 4. Open the modal window
//   window.open(
//     metaLoginUrl,
//     "Meta Login Authentication",
//     `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=no`
//   );

metaLoginUrl += "&fb_app_bypass=true#weblink";
window.location.href = metaLoginUrl;
//  const form = document.createElement("form");
//   form.method = "GET";
  
//   // 2. Target Meta's dedicated dialogue endpoint directly
//   form.action = "https://m.facebook.com/v22.0/dialog/oauth"; // Forces mobile-friendly full-page layout
  
  
//   // Explicitly command the form to submit within the CURRENT window context
//   form.target = "_self"; 

//   // 2. Define the key value parameters as hidden input fields
//   const params: Record<string, string> = {
//     client_id: appId,
//     redirect_uri: redirectUri,
//     scope: "email,public_profile",
//     display: "page" // Forces standard full-page presentation layout
//   };

//   if (state) {
//     params.state = state;
//   }

//   // 3. Map parameters to the hidden form
//   Object.entries(params).forEach(([key, value]) => {
//     const input = document.createElement("input");
//     input.type = "hidden";
//     input.name = key;
//     input.value = value;
//     form.appendChild(input);
//   });

//   // 4. DELETE form.append("#weblink") entirely. You don't need it anymore!
  
//   // 5. Inject form into document body and fire it off instantly
//   document.body.appendChild(form);
//   form.submit();
//   document.body.removeChild(form);
};
