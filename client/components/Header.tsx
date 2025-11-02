import { useState } from 'react';
import { Search, Plus, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userRole: 'teacher' | 'student';
  onRoleChange: (role: 'teacher' | 'student') => void;
  onCreateGroup?: () => void;
  onSearch?: (query: string) => void;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'user' | 'group';
  avatar?: string;
}

export function Header({
  userRole,
  onRoleChange,
  onCreateGroup,
  onSearch,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      // Simulate search results
      const mockResults: SearchResult[] = [
        { id: 'A12345', name: 'Juan García', type: 'user' },
        { id: 'A12346', name: 'María López', type: 'user' },
        { id: 'G001', name: 'Algebra Avanzado', type: 'group' },
      ].filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.id.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(mockResults);
      onSearch?.(query);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFriend = (userId: string) => {
    alert(`Invitación enviada a ${userId}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            C
          </div>
          <span className="hidden sm:inline font-bold text-lg text-primary">
            Comunidades
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 md:mx-8">
          <div className="relative max-w-md">
            <div
              className={cn(
                'relative transition-all duration-200',
                searchOpen ? 'ring-2 ring-primary' : ''
              )}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre o ID (ej. A12345)…"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                className="w-full pl-10 pr-4 py-2 bg-muted text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {/* Search Results */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="px-4 py-3 hover:bg-muted flex items-center justify-between border-b last:border-b-0 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {result.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.type === 'user' ? 'Usuario' : 'Grupo'}
                      </div>
                    </div>
                    {result.type === 'user' && (
                      <button
                        onClick={() => handleAddFriend(result.id)}
                        className="text-xs px-3 py-1.5 bg-accent text-accent-foreground rounded hover:bg-orange-600 transition-colors font-medium"
                      >
                        Agregar amigo
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {userRole === 'teacher' && (
            <button
              onClick={onCreateGroup}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Crear Grupo</span>
            </button>
          )}

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors">
              <User className="w-5 h-5 text-primary" />
              <span className="hidden sm:inline text-sm font-medium text-foreground">
                {userRole === 'teacher' ? 'Profesor' : 'Estudiante'}
              </span>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-0 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-4 border-b border-border">
                <div className="text-sm font-medium text-foreground">
                  Cambiar rol
                </div>
              </div>
              <button
                onClick={() => onRoleChange(userRole === 'teacher' ? 'student' : 'teacher')}
                className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2 text-sm"
              >
                <User className="w-4 h-4" />
                {userRole === 'teacher' ? 'Ver como Estudiante' : 'Ver como Profesor'}
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border">
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
