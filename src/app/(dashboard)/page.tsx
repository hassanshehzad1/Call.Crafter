// app/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
// import Layout from "./layout"; // Adjust path if needed
import HomeView from "@/modules/Home/UI/Views/home-views";
import Layout from "./Layout";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <Layout>
      <HomeView />
    </Layout>
  );
};

export default page;