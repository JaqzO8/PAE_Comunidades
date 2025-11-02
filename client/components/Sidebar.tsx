import { useState } from "react";
import {
  BookOpen,
  Users,
  Plus,
  Mail,
  FileText,
  BarChart3,
  Menu,
  X,
  MessageSquare,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole: "teacher" | "student";
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  roles: ("teacher" | "student")[];
  badge?: number;
}

export function Sidebar({
  userRole,
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: "groups",
      label: "Mis Comunidades",
      icon: Users,
      roles: ["teacher", "student"],
      badge: 3,
    },
    {
      id: "public-groups",
      label: "Comunidades Públicas",
      icon: Globe,
      roles: ["teacher", "student"],
      badge: 8,
    },
    {
      id: "forums-public",
      label: "Foros Públicos",
      icon: MessageSquare,
      roles: ["teacher", "student"],
      badge: 5,
    },
    {
      id: "create-group",
      label: "Crear Comunidad",
      icon: Plus,
      roles: ["teacher"],
    },
    {
      id: "resources",
      label: "Recursos",
      icon: FileText,
      roles: ["teacher", "student"],
    },
    {
      id: "analytics",
      label: "Analíticas",
      icon: BarChart3,
      roles: ["teacher"],
    },
  ];

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(userRole),
  );

  const SidebarContent = () => (
    <>
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                setMobileOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "ml-auto text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center",
                    isActive
                      ? "bg-primary-foreground text-primary"
                      : "bg-accent text-accent-foreground",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-4 right-4 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-secondary transition-colors"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-white md:hidden flex flex-col overflow-y-auto">
          <SidebarContent />
        </div>
      )}
    </>
  );
}
