import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
}

export default function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="glass rounded-2xl p-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-5">
        <Icon className="w-8 h-8 text-violet-400" />
      </div>
      <div className="font-display font-semibold text-white text-lg mb-2">{title}</div>
      <p className="text-white/40 text-sm max-w-xs mx-auto mb-6 leading-relaxed">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="btn-glow inline-flex items-center gap-2 text-sm px-5 py-2.5"
        >
          {action.icon && <action.icon className="w-4 h-4" />}
          {action.label}
        </Link>
      )}
    </div>
  );
}
