"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wand2, BookmarkCheck, Package, Settings } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Generate", icon: Wand2, href: "/dashboard/generate" },
  { label: "Saved", icon: BookmarkCheck, href: "/dashboard/saved" },
  { label: "Kits", icon: Package, href: "/dashboard/brand-kits" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060606]/90 backdrop-blur-xl border-t border-white/[0.06]">
      <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                active ? "text-violet-400" : "text-white/30 hover:text-white/60"
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? "scale-110" : ""} transition-transform`} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-violet-400 mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
