import { useState } from 'react';
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
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userRole: 'teacher' | 'student';
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  roles: ('teacher' | 'student')[];
  badge?: number;
}

export function Sidebar({ userRole, activeSection, onSectionChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'groups',
      label: 'Mis Grupos',
      icon: Users,
      roles: ['teacher', 'student'],
      badge: 3,
    },
    {
      id: 'forums-public',
      label: 'Foros Públicos',
      icon: MessageSquare,
      roles: ['teacher', 'student'],
      badge: 5,
    },
    {
      id: 'create-group',
      label: 'Crear Grupo',
      icon: Plus,
      roles: ['teacher'],
    },
    {
      id: 'invitations',
      label: 'Invitaciones',
      icon: Mail,
      roles: ['student'],
      badge: 2,
    },
    {
      id: 'resources',
      label: 'Recursos',
      icon: FileText,
      roles: ['teacher', 'student'],
    },
    {
      id: 'analytics',
      label: 'Analíticas',
      icon: BarChart3,
      roles: ['teacher'],
    },
  ];

  const filteredItems = navItems.filter((item) =>
    item.roles.includes(userRole)
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
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative',
                isActive
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    'ml-auto text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center',
                    isActive
                      ? 'bg-primary-foreground text-primary'
                      : 'bg-accent text-accent-foreground'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Stats Section */}
      <div className="px-4 py-6 border-t border-border">
        <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-4 text-white">
          <h3 className="font-bold text-sm mb-3">Tu Progreso</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Completado</span>
                <span className="font-bold text-sm">75%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-accent rounded-full" />
              </div>
            </div>
            <div className="text-xs space-y-1">
              <div>📚 Grupos: 3</div>
              <div>💬 Preguntas: 12</div>
              <div>⭐ Puntos: 850</div>
            </div>
          </div>
        </div>
      </div>
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
