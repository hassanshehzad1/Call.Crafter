// app/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
// import Layout from "./layout"; // Adjust path if needed
import HomeView from "@/modules/Home/UI/Views/home-views";
import Layout from "./layout";

// http/Localhost:3000
const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return (
   
      <HomeView />
   
  );
};

export default page;