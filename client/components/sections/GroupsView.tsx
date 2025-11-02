import { GroupCard } from '../GroupCard';

interface Group {
  id: string;
  title: string;
  description: string;
  subject: string;
  memberCount: number;
  messageCount: number;
  fileCount: number;
  visibility: 'public' | 'private';
  isOwner?: boolean;
  coverColor?: string;
  progress?: number;
}

interface GroupsViewProps {
  groups?: Group[];
  userRole: 'teacher' | 'student';
  onGroupSelect?: (groupId: string) => void;
}

export function GroupsView({
  groups = [
    {
      id: '1',
      title: 'Algebra Avanzado II',
      description: 'Espacios vectoriales, transformaciones lineales y matrices.',
      subject: 'Matemáticas',
      memberCount: 24,
      messageCount: 156,
      fileCount: 18,
      visibility: 'private',
      isOwner: true,
      coverColor: 'primary',
      progress: 85,
    },
    {
      id: '2',
      title: 'Cálculo Diferencial',
      description: 'Límites, derivadas y aplicaciones de la derivada.',
      subject: 'Matemáticas',
      memberCount: 31,
      messageCount: 89,
      fileCount: 12,
      visibility: 'public',
      coverColor: 'accent',
      progress: 62,
    },
    {
      id: '3',
      title: 'Física Cuántica I',
      description: 'Fundamentos de mecánica cuántica y principios de superposición.',
      subject: 'Física',
      memberCount: 18,
      messageCount: 45,
      fileCount: 9,
      visibility: 'private',
      coverColor: 'blue',
      progress: 45,
    },
  ],
  userRole = 'student',
  onGroupSelect,
}: GroupsViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mis Comunidades</h1>
        <p className="text-muted-foreground">
          Gestiona tus comunidades de estudio colaborativo
        </p>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            {...group}
            showProgress={userRole === 'student'}
            onClick={() => onGroupSelect?.(group.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {groups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Sin comunidades aún
          </h2>
          <p className="text-muted-foreground mb-4">
            {userRole === 'teacher'
              ? 'Crea tu primer comunidad de estudio para comenzar'
              : 'Únete a una comunidad pública o espera una invitación'}
          </p>
        </div>
      )}
    </div>
  );
}
