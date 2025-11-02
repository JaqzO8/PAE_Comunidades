import { GroupCard } from '../GroupCard';
import { UserPlus, Search } from 'lucide-react';
import { useState } from 'react';

interface PublicGroup {
  id: string;
  title: string;
  description: string;
  subject: string;
  memberCount: number;
  messageCount: number;
  fileCount: number;
  visibility: 'public';
  coverColor?: string;
}

interface PublicGroupsViewProps {
  groups?: PublicGroup[];
  onGroupSelect?: (groupId: string) => void;
  onJoinGroup?: (groupId: string) => void;
}

export function PublicGroupsView({
  groups = [
    {
      id: 'pub1',
      title: 'Introducción a Cálculo',
      description: 'Fundamentos de cálculo diferencial e integral para principiantes.',
      subject: 'Matemáticas',
      memberCount: 145,
      messageCount: 234,
      fileCount: 28,
      visibility: 'public',
      coverColor: 'primary',
    },
    {
      id: 'pub2',
      title: 'Biología Celular',
      description: 'Estudio de las células, sus estructuras y funciones biológicas.',
      subject: 'Biología',
      memberCount: 87,
      messageCount: 156,
      fileCount: 15,
      visibility: 'public',
      coverColor: 'accent',
    },
    {
      id: 'pub3',
      title: 'Historia Moderna',
      description: 'Análisis de eventos y movimientos históricos desde 1500 hasta hoy.',
      subject: 'Historia',
      memberCount: 92,
      messageCount: 203,
      fileCount: 32,
      visibility: 'public',
      coverColor: 'blue',
    },
    {
      id: 'pub4',
      title: 'Programación en Python',
      description: 'Aprende Python desde cero: conceptos, sintaxis y proyectos reales.',
      subject: 'Programación',
      memberCount: 234,
      messageCount: 512,
      fileCount: 45,
      visibility: 'public',
      coverColor: 'primary',
    },
    {
      id: 'pub5',
      title: 'Química General',
      description: 'Principios fundamentales de química: átomos, moléculas y reacciones.',
      subject: 'Química',
      memberCount: 118,
      messageCount: 267,
      fileCount: 21,
      visibility: 'public',
      coverColor: 'accent',
    },
    {
      id: 'pub6',
      title: 'Estadística y Probabilidad',
      description: 'Métodos estadísticos y análisis de datos para estudiantes.',
      subject: 'Matemáticas',
      memberCount: 103,
      messageCount: 189,
      fileCount: 18,
      visibility: 'public',
      coverColor: 'blue',
    },
  ],
  onGroupSelect,
  onJoinGroup,
}: PublicGroupsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());

  const filteredGroups = groups.filter(
    (group) =>
      group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJoinedGroups((prev) => new Set([...prev, groupId]));
    onJoinGroup?.(groupId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Comunidades Públicas
        </h1>
        <p className="text-muted-foreground">
          Descubre y únete a comunidades de estudio disponibles para todos
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar comunidades por nombre, materia o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="text-sm text-muted-foreground">
          {filteredGroups.length} comunidad{filteredGroups.length !== 1 ? 'es' : ''} encontrada{filteredGroups.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Communities Grid with Join Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="relative"
            onClick={() => onGroupSelect?.(group.id)}
          >
            <GroupCard
              {...group}
              showProgress={false}
            />
            {/* Join Button Overlay */}
            <div className="absolute inset-0 rounded-lg bg-black/0 hover:bg-black/40 transition-all duration-200 flex items-end p-4 opacity-0 hover:opacity-100">
              <button
                onClick={(e) => handleJoinGroup(group.id, e)}
                disabled={joinedGroups.has(group.id)}
                className={`w-full py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  joinedGroups.has(group.id)
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-accent text-accent-foreground hover:bg-orange-600'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                {joinedGroups.has(group.id) ? 'Unido' : 'Unirse'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results State */}
      {filteredGroups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {searchTerm ? 'No se encontraron comunidades' : 'Sin comunidades públicas'}
          </h2>
          <p className="text-muted-foreground mb-4">
            {searchTerm
              ? 'Intenta con otros términos de búsqueda'
              : 'No hay comunidades públicas disponibles en este momento'}
          </p>
        </div>
      )}
    </div>
  );
}
