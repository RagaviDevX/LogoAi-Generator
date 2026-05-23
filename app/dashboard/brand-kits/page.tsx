import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Package, Plus, Wand2 } from "lucide-react";

export default async function BrandKitsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: kits } = await supabase
    .from("brand_kits")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Brand Kits</h1>
          <p className="text-white/40 text-sm">Organize your brand assets into reusable kits</p>
        </div>
        <button className="btn-glow flex items-center gap-2 self-start sm:self-auto text-sm px-5 py-2.5">
          <Plus className="w-4 h-4" />
          New Brand Kit
        </button>
      </div>

      {kits && kits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kits.map((kit) => (
            <div key={kit.id} className="glass-hover rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{kit.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">
                    {new Date(kit.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {kit.primary_color && (
                <div className="flex gap-1.5">
                  {[kit.primary_color, kit.secondary_color, kit.accent_color]
                    .filter(Boolean)
                    .map((c, i) => (
                      <div key={i} className="w-8 h-8 rounded-lg" style={{ background: c }} />
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-violet-400" />
          </div>
          <div className="font-medium text-white mb-2">No brand kits yet</div>
          <p className="text-white/40 text-sm mb-5 max-w-sm mx-auto">
            Generate a brand identity first, then save it as a brand kit to keep all your assets organized.
          </p>
          <Link href="/dashboard/generate" className="btn-glow inline-flex items-center gap-2 text-sm px-5 py-2.5">
            <Wand2 className="w-4 h-4" />
            Generate Brand First
          </Link>
        </div>
      )}
    </div>
  );
}
