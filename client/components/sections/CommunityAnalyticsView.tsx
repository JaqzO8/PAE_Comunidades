import { useState } from "react";
import {
  Users,
  FileText,
  MessageSquare,
  UserX,
  Bell,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  career: string;
  avatar?: string;
  isActive: boolean;
  documentsUploaded: number;
  questionsAnswered: number;
}

interface CommunityAnalyticsViewProps {
  communityId?: string;
  communityName?: string;
  userRole?: "teacher" | "student";
  members?: Member[];
}

export function CommunityAnalyticsView({
  communityId = "1",
  communityName = "Algebra Avanzado II",
  userRole = "student",
  members = [
    {
      id: "1",
      name: "Ana Torres",
      career: "Ingeniería Informática",
      isActive: true,
      documentsUploaded: 5,
      questionsAnswered: 15,
    },
    {
      id: "2",
      name: "Luis Ramos",
      career: "Medicina",
      isActive: false,
      documentsUploaded: 2,
      questionsAnswered: 8,
    },
    {
      id: "3",
      name: "María García",
      career: "Ingeniería Civil",
      isActive: true,
      documentsUploaded: 7,
      questionsAnswered: 22,
    },
    {
      id: "4",
      name: "Carlos Mendez",
      career: "Física",
      isActive: true,
      documentsUploaded: 4,
      questionsAnswered: 18,
    },
    {
      id: "5",
      name: "Elena Rodríguez",
      career: "Química",
      isActive: false,
      documentsUploaded: 1,
      questionsAnswered: 5,
    },
    {
      id: "6",
      name: "Diego López",
      career: "Ingeniería Informática",
      isActive: true,
      documentsUploaded: 6,
      questionsAnswered: 19,
    },
    {
      id: "7",
      name: "Sofía Martínez",
      career: "Administración",
      isActive: true,
      documentsUploaded: 3,
      questionsAnswered: 12,
    },
    {
      id: "8",
      name: "Juan Pérez",
      career: "Ingeniería Eléctrica",
      isActive: false,
      documentsUploaded: 0,
      questionsAnswered: 3,
    },
  ],
}: CommunityAnalyticsViewProps) {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [notificationOpen, setNotificationOpen] = useState<string | null>(null);

  // Calculate community totals
  const totalStudents = members.length;
  const activeStudents = members.filter((m) => m.isActive).length;
  const totalDocuments = members.reduce((sum, m) => sum + m.documentsUploaded, 0);
  const totalQuestions = members.reduce((sum, m) => sum + m.questionsAnswered, 0);

  const handleExpelMember = (memberId: string) => {
    console.log(`Expelling member ${memberId}`);
    alert("Miembro expulsado de la comunidad");
  };

  const handleNotifyStudent = (memberId: string) => {
    setNotificationOpen(memberId);
    setTimeout(() => setNotificationOpen(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Analíticas: {communityName}
        </h2>
        <p className="text-muted-foreground">
          {userRole === "teacher"
            ? "Gestiona estudiantes y visualiza el rendimiento de tu comunidad"
            : "Visualiza el desempeño y participación de tu comunidad"}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Estudiantes Total
            </span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground">
            {totalStudents}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Activos Ahora
            </span>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-foreground">
            {activeStudents}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {((activeStudents / totalStudents) * 100).toFixed(0)}% de participación
          </p>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Documentos
            </span>
            <FileText className="w-4 h-4 text-accent" />
          </div>
          <div className="text-3xl font-bold text-foreground">
            {totalDocuments}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Preguntas
            </span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-foreground">
            {totalQuestions}
          </div>
        </div>
      </div>

      {/* Members List */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">
          Miembros de la Comunidad
        </h3>

        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() =>
                  setExpandedMember(
                    expandedMember === member.id ? null : member.id
                  )
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Member Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {member.name.charAt(0)}
                    </div>

                    {/* Member Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground truncate">
                          {member.name}
                        </h4>
                        {member.isActive && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex-shrink-0">
                            <span className="w-2 h-2 bg-green-600 rounded-full" />
                            Activo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {member.career}
                      </p>
                    </div>

                    {/* Member Metrics */}
                    <div className="hidden md:flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">
                          {member.documentsUploaded}
                        </div>
                        <p className="text-xs text-muted-foreground">Docs</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">
                          {member.questionsAnswered}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Preguntas
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expand Indicator */}
                  <div className="text-muted-foreground ml-4">
                    {expandedMember === member.id ? "−" : "+"}
                  </div>
                </div>
              </div>

              {/* Expanded Details for Teachers */}
              {expandedMember === member.id && userRole === "teacher" && (
                <div className="px-4 pb-4 border-t border-border bg-muted/30 space-y-3">
                  {/* Metrics Details */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Documentos
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {member.documentsUploaded}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Preguntas
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {member.questionsAnswered}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Estado
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        {member.isActive ? "Activo" : "Inactivo"}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleNotifyStudent(member.id)}
                      className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Notificar
                    </button>
                    <button
                      onClick={() => handleExpelMember(member.id)}
                      className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <UserX className="w-4 h-4" />
                      Expulsar
                    </button>
                  </div>

                  {/* Notification Feedback */}
                  {notificationOpen === member.id && (
                    <div className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Notificación enviada a {member.name}
                    </div>
                  )}
                </div>
              )}

              {/* Expanded Details for Students - View Only */}
              {expandedMember === member.id && userRole === "student" && (
                <div className="px-4 pb-4 border-t border-border bg-muted/30">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Documentos
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {member.documentsUploaded}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Preguntas
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {member.questionsAnswered}
                      </p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Estado
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        {member.isActive ? "Activo" : "Inactivo"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {members.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-muted rounded-lg">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground mb-1">
            Sin datos de analíticas
          </h3>
          <p className="text-muted-foreground">
            Los datos aparecerán cuando los estudiantes se unan a la comunidad
          </p>
        </div>
      )}
    </div>
  );
}
