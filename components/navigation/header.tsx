"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, User, Heart, Icon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCartStore, useProductStore } from "../../app/store/cartStore";
import SearchBar from "../ui/client/SearchBar";
import SearchDrawer from "../ui/client/SearchDrawer";
import { openMetaModal } from "@/app/utils/metaAuth";
import { initMetaSDK, loginWithMetaSDK } from "@/app/utils/metaSDKAuth";
import UserOverlayLogin from "./UserOverlayLogin";
import UserIconLoginOverlay from "./UserOverlayLogin";
import LoginBar from "../ui/client/loginDrawer";
import LoginDrawer from "../ui/client/loginDrawer";
import { useUserStore } from "@/app/store/userStore";



export function Header() {
  const pathname = usePathname()
  const router = useRouter();
  const count = useCartStore((state) => state.getCartCount());
  const setUserStore = useUserStore((state) => state.setUser)
  const userStore = useUserStore((state) => state.user)
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string | null>(userStore?.userAvatar || null);
  const [name, setName] = React.useState<string | null>(userStore?.userName || null);
  const appId = process.env.NEXT_PUBLIC_META_APP_ID;
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';


  const [hasHydrated, setHasHydrated] = React.useState(false);

  React.useEffect(() => {
    if (userStore) {
      setAvatar(userStore.userAvatar || null);
      setName(userStore.userName || null);
    }
  }, [userStore]);

  
  React.useEffect(() => {
    setHasHydrated(true);
    initMetaSDK(appId || "").then(() => console.log("Meta SDK successfully initialized."))
      .then(() => console.log("Meta SDK successfully initialized."))
      .catch((err) => console.error("SDK Initialization failed:", err));
  }, [appId]);

  // const handleLoginClick = async (action: string) => {
  const handleLoginClick = async (action: string) => {

    try {
      if (action === "cart") {
        router.push('/cart');
        return;
      }
      // Execute the module workflow promise
      const accessToken = await loginWithMetaSDK(appId || "", "public_profile,email");

      console.log("Success! Access token retrieved:", accessToken);

      // 3. Post the token directly to your Next.js server route handler
      const res = await fetch(`${BASE_PATH}/api/auth/meta/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (res.ok) {
        const data = await res.json();
        setAvatar(data.avatar);
        setName(data.name);

        setUserStore({ 'userName': data.name, 'userEmail': data.email, 'userAvatar': data.avatar });
        console.log("Server successfully logged you in. User info:", data);

      } else {
        alert("Server failed to log you in with the token.");
      }
    } catch (error) {
      console.log("Authentication flow stopped:", error);
    } finally {

    }
  };

  const getLinkClass = (path: string) => {

    return cn(
      "text-sm font-medium transition-colors font-bluefamily-def hover:font-redfamily-def",
      // If current path matches, apply the active text color      
      pathname === path ? "font-redfamily-def" : "text-muted-foreground"
    )
  }
  const handleNavigateHome = () => {
    // Navigates back to the clean root path and updates server state
    router.push('/', { scroll: false });
  };
  return (
    <>
      <div className="text-center p-1 h-7 text-[12px] bg-[#071b4b] text-white">
        Premium Quality • Trusted Since 1984 • Shipping Across India
      </div>
      {/* <div className=" "> */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur 
              supports-backdrop-filter:bg-background/60 border-b">

        <div className="relative px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 z-50">
          {/* <div className="h-16 bg-white/75 backdrop-blur-md px-6 flex items-center justify-between text-black"> */}
          {/* <div className="relative z-50 px-4 sm:px-6 lg:px-8 h-16  bg-white/70 backdrop-blur-md flex items-center justify-between border-b border-white/20 text-black"> */}

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/" className="font-bold text-lg tracking-tight">EliteShoppe</Link>
          </div>

          {/* Desktop Brand Logo */}
          <Link href="/" className="hidden md:block font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
            EliteShoppe
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {/* <Link href="/" className={getLinkClass("/")} onClick={handleNavigateHome}>Home</Link> */}
            <Link href="/?filter=new" className={getLinkClass("/")}>Home</Link>
            <Link href="/shoppe" className={getLinkClass("/shoppe/")}>Shop</Link>
            <Link href="/help" className="text-sm font-medium font-bluefamily-def active:font-redfamily-def hover:text-foreground transition-colors">Help</Link>
          </nav>

          {/* Search Bar & Action Buttons */}
          <div className="flex items-center gap-4 flex-1 md:flex-initial max-w-md w-full justify-end">

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)} className="cursor-pointer">
                <SearchIcon className="h-5 w-5 text-muted-foreground"></SearchIcon>
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                <Heart className="h-5 w-5 text-muted-foreground" />
              </Button>

              {/* <a  href={metaLoginUrl} rel="noopener noreferrer" className="sm:inline-flex"> */}
              {/* <Button variant="ghost" size="icon" onClick={() => openMetaModal({ appId: `${appId}`, redirectUri: `${redirectUri}`})} className="sm:inline-flex"> */}


              {!name ?
                <Button variant="outline" size="sm" className="cursor-pointer gap-2 relative"
                  onClick={() => handleLoginClick("login")}>

                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="sm:inline flex flex-row items-center gap-1">
                    <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-primary-foreground font-bold rectangle 
                  h-4 w-4 px-2 py-2.5 rounded-2xl flex items-center justify-center gap-1 shadow-sm">
                      <svg
                        className=" fill-current text-white shrink-0"
                        viewBox="0 0 24 24"
                        xmlns="http://w3.org"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>

                    </span>
                    <span>Login</span>
                  </span>
                </Button>
                :
                <Button variant="outline" size="sm" className="cursor-pointer gap-2 relative"
                >
                  <div className="w-5 h-5 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-emerald-500">
                    {/* Native img tag is easiest for third-party un-whitelisted Meta URLs */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatar}
                      className="w-full h-full object-cover animate-fade-in"
                      onError={(e) => {
                        // Image fallback in case Meta link parameters are expired or blocked
                        e.currentTarget.src = "https://w3schools.com";
                      }}
                    />
                  </div>
                  <span className="sm:inline flex flex-row items-center gap-1">
                    <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-primary-foreground font-bold rectangle 
                  h-4 w-4 px-2 py-2.5 rounded-2xl flex items-center justify-center gap-1 shadow-sm">
                      <svg
                        className=" fill-current text-white shrink-0"
                        viewBox="0 0 24 24"
                        xmlns="http://w3.org"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>

                    </span>
                    <span>{name && name.length > 10 ? `${name.substring(0, 10)}...` : name}</span>
                  </span>
                </Button>
              }

              {!name ?
                <Button variant="outline" size="sm" className="cursor-pointer gap-2 relative ml-1"
                  onClick={() => handleLoginClick("cart")}>
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Cart</span>
                  <span className="absolute -top-1.5 -right-1.5 blue-def text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {hasHydrated ? count : 0}
                  </span>
                </Button>
                :
                <Button variant="outline" size="sm" className="cursor-pointer gap-2 relative ml-1"
                  onClick={() => router.push('/cart')}>
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Cart</span>
                  <span className="absolute -top-1.5 -right-1.5 blue-def text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {hasHydrated ? count : 0}
                  </span>
                </Button>
              }
            </div>
          </div>
        </div>
        {/* <div className="w-full  bg-white/90 z-10"> */}
        <div className="fixed w-full ">
          <SearchDrawer open={searchOpen} setSearchOpen={setSearchOpen} ></SearchDrawer>
        </div>
        <div className="fixed w-full ">
          {/* <LoginDrawer open={loginOpen} setLoginOpen={setLoginOpen} ></LoginDrawer> */}
        </div>
      </header>
      {/* <div className="w-full "> */}
      {/* <SearchDrawer open={searchOpen} setSearchOpen={setSearchOpen} ></SearchDrawer> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
