// Server Component
import { auth } from "@/lib/auth";
import HomeView from "@/modules/Home/UI/Views/home-views";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return <HomeView />;
};

export default page;
