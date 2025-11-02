import { MessageSquare, Users, Zap } from 'lucide-react';

interface Forum {
  id: string;
  title: string;
  description: string;
  threadCount: number;
  memberCount: number;
  activityLevel: 'high' | 'medium' | 'low';
  icon: string;
}

interface PublicForumsViewProps {
  forums?: Forum[];
  onForumSelect?: (forumId: string) => void;
}

export function PublicForumsView({
  forums = [
    {
      id: '1',
      title: 'Matemáticas General',
      description: 'Preguntas y discusiones sobre matemática general',
      threadCount: 234,
      memberCount: 1250,
      activityLevel: 'high',
      icon: '🔢',
    },
    {
      id: '2',
      title: 'Física e Ingeniería',
      description: 'Temas de física clásica, cuántica y aplicaciones en ingeniería',
      threadCount: 189,
      memberCount: 892,
      activityLevel: 'high',
      icon: '⚙️',
    },
    {
      id: '3',
      title: 'Programación',
      description: 'Algoritmos, estructuras de datos y lenguajes de programación',
      threadCount: 412,
      memberCount: 2150,
      activityLevel: 'high',
      icon: '💻',
    },
    {
      id: '4',
      title: 'Química Orgánica',
      description: 'Reacciones, mecanismos y síntesis en química orgánica',
      threadCount: 98,
      memberCount: 456,
      activityLevel: 'medium',
      icon: '🧪',
    },
    {
      id: '5',
      title: 'Biología Molecular',
      description: 'ADN, ARN, proteínas y procesos celulares',
      threadCount: 145,
      memberCount: 678,
      activityLevel: 'medium',
      icon: '🧬',
    },
    {
      id: '6',
      title: 'Historia y Sociología',
      description: 'Discusiones sobre eventos históricos y movimientos sociales',
      threadCount: 201,
      memberCount: 543,
      activityLevel: 'medium',
      icon: '📚',
    },
  ],
  onForumSelect,
}: PublicForumsViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Foros Públicos
        </h1>
        <p className="text-muted-foreground">
          Intercambia conocimientos con la comunidad de estudiantes
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar foros..."
            className="w-full px-4 py-2 border border-border rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select className="px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="all">Todos</option>
          <option value="high">Alta actividad</option>
          <option value="medium">Actividad media</option>
          <option value="low">Baja actividad</option>
        </select>
      </div>

      {/* Forums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forums.map((forum) => (
          <div
            key={forum.id}
            onClick={() => onForumSelect?.(forum.id)}
            className="bg-white rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-200 cursor-pointer group"
          >
            {/* Icon and Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{forum.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {forum.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {forum.description}
            </p>

            {/* Stats */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {forum.threadCount}
                  </span>{' '}
                  hilos
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {forum.memberCount}
                  </span>{' '}
                  miembros
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap
                  className={`w-4 h-4 ${
                    forum.activityLevel === 'high'
                      ? 'text-orange-500'
                      : forum.activityLevel === 'medium'
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                  }`}
                />
                <span className="text-muted-foreground">
                  {forum.activityLevel === 'high'
                    ? 'Alta actividad'
                    : forum.activityLevel === 'medium'
                      ? 'Actividad media'
                      : 'Baja actividad'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
