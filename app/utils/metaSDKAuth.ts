// utils/metaSDKAuth.ts

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

// Track initialization states globally outside the component cycle
let isInitialized = false;
let initPromise: Promise<void> | null = null;

/**
 * Safely injects and initializes the Meta JavaScript SDK framework.
 */
export const initMetaSDK = (appId: string): Promise<void> => {
  if (typeof window === "undefined") return Promise.resolve();
  if (isInitialized || window.FB) {
    isInitialized = true;
    return Promise.resolve();
  }

  // If initialization is already in progress, reuse the existing promise queue
  if (initPromise) return initPromise;

  initPromise = new Promise((resolve) => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true, // Enables standard cross-site cookie session handling
        xfbml: true,
        version: "v22.0",
      });
      isInitialized = true;
      resolve();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s);
      if (d.getElementById(id)) {
        resolve();
        return;
      }
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      // js.src = "https://m.facebook.com/v22.0/dialog/oauth/";
      js.src = "https://connect.facebook.net/en_US/sdk/debug.js";
      
      // Error handling hook if network connections or ad-blockers fail the request
      js.onerror = function() {
        // reject("Network connection blocked. Please check your ad-blocker configurations.");
        console.error("Network connection blocked. Please check your ad-blocker configurations.");
      };
      // js.src = "https://facebook.net";
      fjs[0]?.parentNode?.insertBefore(js, fjs[0]);
    })(document, "script", "facebook-jssdk");
  });

  return initPromise;
};

/**
 * Triggers the Meta native iframe login flow (Safely waits for initialization if missing).
 */
export const loginWithMetaSDK = async (
  appId: string, // 1. Pass App ID down here to resolve race conditions
  scope: string = "public_profile,email"
): Promise<string> => {
  if (typeof window === "undefined") throw new Error("Window structure unavailable.");

  // 2. FIXED: If the button is clicked too fast, force wait until init complete
  if (!isInitialized || !window.FB) {
    console.log("SDK not ready yet. Pausing login trigger until initialization concludes...",appId);
    await initMetaSDK(appId);
  }

  return new Promise((resolve, reject) => {
    window.FB.login(
      function (response: any) {
        if (response.authResponse) {
          resolve(response.authResponse.accessToken);
        } else {
          reject("User cancelled login or did not fully authorize the app.");
        }
      },
      { scope: scope }
    );
  });
};
