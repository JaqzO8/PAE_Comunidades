import { Clock, Star, AlertCircle, Check, X } from 'lucide-react';

interface Invitation {
  id: string;
  fromName: string;
  groupName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Resource {
  id: string;
  title: string;
  category: string;
  views: number;
}

interface Activity {
  id: string;
  message: string;
  time: string;
  type: 'comment' | 'upload' | 'join';
}

interface RightSidebarProps {
  invitations?: Invitation[];
  recentResources?: Resource[];
  recentActivity?: Activity[];
}

export function RightSidebar({
  invitations = [
    {
      id: '1',
      fromName: 'Prof. Carlos',
      groupName: 'Algebra Avanzado',
      status: 'pending',
    },
    {
      id: '2',
      fromName: 'Prof. María',
      groupName: 'Cálculo II',
      status: 'pending',
    },
  ],
  recentResources = [
    { id: '1', title: 'Integrales Definidas', category: 'PDF', views: 245 },
    { id: '2', title: 'Ecuaciones Diferenciales', category: 'Video', views: 189 },
    { id: '3', title: 'Series de Fourier', category: 'PDF', views: 156 },
  ],
  recentActivity = [
    { id: '1', message: 'Nueva respuesta en Álgebra', time: 'hace 2h', type: 'comment' },
    { id: '2', message: 'Archivo subido por Prof. Juan', time: 'hace 4h', type: 'upload' },
    { id: '3', message: 'Se unieron 3 estudiantes', time: 'hace 6h', type: 'join' },
  ],
}: RightSidebarProps) {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-l border-border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      {/* Pending Invitations */}
      <div className="p-4 border-b border-border">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Invitaciones
        </h3>
        <div className="space-y-2">
          {invitations.length > 0 ? (
            invitations.map((invite) => (
              <div
                key={invite.id}
                className={`p-3 rounded-lg border transition-colors ${
                  invite.status === 'pending'
                    ? 'bg-blue-50 border-primary/20'
                    : invite.status === 'accepted'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-border'
                }`}
              >
                <div className="font-medium text-sm text-foreground mb-1">
                  {invite.groupName}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  de {invite.fromName}
                </div>
                {invite.status === 'pending' && (
                  <div className="flex gap-2">
                    <button className="flex-1 text-xs px-2 py-1.5 bg-primary text-primary-foreground rounded hover:bg-secondary transition-colors">
                      <Check className="w-3 h-3 inline mr-1" />
                      Aceptar
                    </button>
                    <button className="flex-1 text-xs px-2 py-1.5 bg-border text-foreground rounded hover:bg-muted transition-colors">
                      <X className="w-3 h-3 inline mr-1" />
                      Rechazar
                    </button>
                  </div>
                )}
                {invite.status === 'accepted' && (
                  <div className="text-xs text-green-600 font-medium">
                    ✓ Aceptada
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">
              No hay invitaciones pendientes
            </p>
          )}
        </div>
      </div>

      {/* Popular Resources */}
      <div className="p-4 border-b border-border">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Star className="w-4 h-4" />
          Recursos Populares
        </h3>
        <div className="space-y-2">
          {recentResources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer group"
            >
              <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {resource.title}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {resource.category}
                </span>
                <span className="text-xs font-medium text-primary">
                  {resource.views} vistas
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Actividad Reciente
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex gap-2 pb-3 border-b border-border last:border-b-0 last:pb-0">
              <div className="flex-shrink-0">
                {activity.type === 'comment' && (
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                )}
                {activity.type === 'upload' && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                )}
                {activity.type === 'join' && (
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-foreground line-clamp-2">
                  {activity.message}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Mail({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
