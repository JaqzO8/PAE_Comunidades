import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { GroupsView } from '@/components/sections/GroupsView';
import { PublicForumsView } from '@/components/sections/PublicForumsView';
import { CreateGroupView } from '@/components/sections/CreateGroupView';
import { GroupDetailView } from '@/components/sections/GroupDetailView';
import { Users, AlertCircle, FileText, BarChart3 } from 'lucide-react';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function Index() {
  const [userRole, setUserRole] = useState<'teacher' | 'student'>('student');
  const [activeSection, setActiveSection] = useState('groups');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const handleCreateGroup = () => {
    setActiveSection('create-group');
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleRoleChange = (newRole: 'teacher' | 'student') => {
    setUserRole(newRole);
    addToast(
      `Ahora ves la interfaz como ${newRole === 'teacher' ? 'Profesor' : 'Estudiante'}`,
      'info'
    );
  };

  const renderMainContent = () => {
    // Show group detail if a group is selected
    if (selectedGroupId) {
      return (
        <GroupDetailView
          groupId={selectedGroupId}
          onBack={() => setSelectedGroupId(null)}
          userRole={userRole}
        />
      );
    }

    switch (activeSection) {
      case 'groups':
        return <GroupsView userRole={userRole} onGroupSelect={setSelectedGroupId} />;
      case 'forums-public':
        return <PublicForumsView />;
      case 'create-group':
        return userRole === 'teacher' ? (
          <CreateGroupView
            onGroupCreated={() => {
              setActiveSection('groups');
              addToast('¡Grupo creado exitosamente!', 'success');
            }}
          />
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-bold text-lg">
              Solo los profesores pueden crear grupos
            </p>
          </div>
        );
      case 'invitations':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Invitaciones
              </h1>
              <p className="text-muted-foreground">
                Gestiona tus invitaciones a grupos
              </p>
            </div>
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-bold text-lg mb-2">
                No tienes invitaciones pendientes
              </p>
              <p className="text-muted-foreground">
                Los profesores pueden invitarte a grupos desde la sección de
                gestión
              </p>
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Recursos
              </h1>
              <p className="text-muted-foreground">
                Accede a archivos compartidos en tus grupos
              </p>
            </div>
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-bold text-lg mb-2">
                Sin recursos disponibles
              </p>
              <p className="text-muted-foreground">
                Los recursos se compartirán en tus grupos de estudio
              </p>
            </div>
          </div>
        );
      case 'analytics':
        return userRole === 'teacher' ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Analíticas
              </h1>
              <p className="text-muted-foreground">
                Visualiza el rendimiento de tus grupos
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Grupos Activos', value: '3', change: '+1' },
                { label: 'Estudiantes Total', value: '73', change: '+12' },
                { label: 'Documentos', value: '39', change: '+8' },
                { label: 'Preguntas Respondidas', value: '156', change: '+42' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-border p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-muted-foreground">
                      {stat.label}
                    </h3>
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-sm text-green-600 font-bold mb-1">
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-bold text-lg">
              Solo los profesores tienen acceso a analíticas
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        userRole={userRole}
        onRoleChange={handleRoleChange}
        onCreateGroup={handleCreateGroup}
        onSearch={handleSearch}
      />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <Sidebar
          userRole={userRole}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
            {renderMainContent()}
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg text-sm font-medium shadow-lg animate-slide-in-right ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : toast.type === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
