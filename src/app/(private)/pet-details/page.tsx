"use client";

import TopSearch from "../../../components/dashboard/topsearch";
import ProfileSidebar from "../../../components/dashboard/ProfileSidebar";
import PetDetails from "@/components/dashboard/PetDetails"; 

export default function Page() {
  return (
    <div className="min-h-screen">
      <TopSearch />

      <div className="mx-auto max-w-[1280px] w-full py-8 flex flex-col md:flex-row gap-6">
        
        <aside className="md:sticky md:top-24 self-start md:w-[360px] md:flex-shrink-0">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Profile</h1>
          <ProfileSidebar />
        </aside>

        <main className="flex-1">
          <PetDetails />
        </main>
      </div>
    </div>
  );
}
