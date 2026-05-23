import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import MobileNav from "@/components/dashboard/MobileNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-[#030303] flex">
      {/* Desktop Sidebar */}
      <DashboardSidebar user={user} profile={profile} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 xl:ml-72">
        <DashboardTopbar user={user} profile={profile} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 page-enter">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
