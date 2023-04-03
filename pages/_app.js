import "@/styles/globals.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/chat");
  };
  return (
    <Component
    // sets the user name and passes it down to all components
      handleLoginChange={(e) => setUsername(e.target.value)}
      username={username}
      handleLogin={handleLogin}
      {...pageProps}
    />
  );
}
