import { useState } from 'react';
import {
  ArrowLeft,
  MessageSquare,
  FileText,
  Users,
  Zap,
  Send,
  Paperclip,
  Award,
  Download,
  Share2,
} from 'lucide-react';
import { ForumCard } from '../ForumCard';

interface GroupDetailViewProps {
  groupId?: string;
  onBack?: () => void;
  userRole?: 'teacher' | 'student';
}

type TabType = 'chat' | 'files' | 'forums' | 'challenges';

export function GroupDetailView({
  groupId = '1',
  onBack,
  userRole = 'student',
}: GroupDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      author: 'Prof. Carlos',
      avatar: '👨‍🏫',
      content: 'Hola a todos, bienvenidos al grupo de Algebra Avanzado II',
      timestamp: 'hace 2h',
      isTeacher: true,
    },
    {
      id: '2',
      author: 'Juan García',
      avatar: '👨‍🎓',
      content: '¡Gracias Prof! Estoy emocionado de empezar',
      timestamp: 'hace 1h',
    },
    {
      id: '3',
      author: 'Prof. Carlos',
      avatar: '👨‍🏫',
      content: 'Esta semana trabajaremos con espacios vectoriales...',
      timestamp: 'hace 45m',
      isTeacher: true,
    },
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          author: userRole === 'teacher' ? 'Prof. You' : 'Your Name',
          avatar: userRole === 'teacher' ? '👨‍🏫' : '👨‍🎓',
          content: messageInput,
          timestamp: 'ahora',
        },
      ]);
      setMessageInput('');
    }
  };

  const files = [
    {
      id: '1',
      name: 'Espacios Vectoriales - Parte 1.pdf',
      size: '2.4 MB',
      uploadedBy: 'Prof. Carlos',
      uploadedAt: 'hace 2 días',
    },
    {
      id: '2',
      name: 'Ejercicios Propuestos.pdf',
      size: '1.8 MB',
      uploadedBy: 'Prof. Carlos',
      uploadedAt: 'hace 1 día',
    },
    {
      id: '3',
      name: 'Soluciones - Tarea 1.pdf',
      size: '3.2 MB',
      uploadedBy: 'Prof. Carlos',
      uploadedAt: 'hace 6h',
    },
  ];

  const forumThreads = [
    {
      id: '1',
      title: '¿Cómo calcular el espacio nulo?',
      author: 'María López',
      answerCount: 3,
      views: 24,
      votes: 7,
      tags: ['espacios-vectoriales', 'algebra-lineal'],
      isAnswered: true,
    },
    {
      id: '2',
      title: 'Duda sobre transformaciones lineales',
      author: 'Juan García',
      answerCount: 1,
      views: 15,
      votes: 2,
      tags: ['transformaciones', 'matrices'],
      isAnswered: false,
    },
    {
      id: '3',
      title: 'Recursos para entender valores propios',
      author: 'Carlos Mendez',
      answerCount: 5,
      views: 42,
      votes: 12,
      tags: ['eigenvalues', 'algebra-lineal'],
      isAnswered: true,
    },
  ];

  const challenges = [
    {
      id: '1',
      title: 'Quiz: Espacios Vectoriales',
      description: '10 preguntas sobre espacios vectoriales básicos',
      deadline: 'Vence en 3 días',
      participants: 18,
      completed: 12,
    },
    {
      id: '2',
      title: 'Problema: Transformaciones Lineales',
      description: 'Resuelve 5 problemas de transformaciones lineales',
      deadline: 'Vence en 7 días',
      participants: 24,
      completed: 8,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Algebra Avanzado II
          </h1>
          <p className="text-muted-foreground">Espacios vectoriales, transformaciones lineales y matrices</p>
        </div>
      </div>

      {/* Group Cover */}
      <div className="h-40 bg-gradient-to-r from-primary to-secondary rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-end p-6">
          <div className="flex items-center gap-4 text-white">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
              📐
            </div>
            <div>
              <h2 className="text-xl font-bold">Algebra Avanzado II</h2>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> 24 miembros
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> 156 mensajes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {(['chat', 'files', 'forums', 'challenges'] as TabType[]).map((tab) => {
          const icons = {
            chat: MessageSquare,
            files: FileText,
            forums: MessageSquare,
            challenges: Award,
          };
          const labels = {
            chat: 'Chat',
            files: 'Archivos',
            forums: 'Foros',
            challenges: 'Retos',
          };
          const Icon = icons[tab];

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-border p-4 h-96 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="text-2xl">{msg.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">
                        {msg.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-foreground mt-1">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="p-2 hover:bg-muted rounded-lg transition-colors text-primary">
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors font-medium flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar
              </button>

              {userRole === 'teacher' && (
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Recomendar Recurso
                </button>
              )}
            </div>
          </div>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="space-y-4">
            {userRole === 'teacher' && (
              <div className="border-2 border-dashed border-accent rounded-lg p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                <Paperclip className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-bold text-foreground mb-1">
                  Arrastra archivos aquí
                </p>
                <p className="text-sm text-muted-foreground">
                  o haz clic para seleccionar PDFs
                </p>
              </div>
            )}

            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <FileText className="w-8 h-8 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {file.uploadedBy} • {file.uploadedAt} • {file.size}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary opacity-0 group-hover:opacity-100">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <div className="space-y-4">
            {userRole === 'student' && (
              <button className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-orange-600 transition-colors font-bold flex items-center justify-center gap-2">
                + Nueva Pregunta
              </button>
            )}

            <div className="space-y-3">
              {forumThreads.map((thread) => (
                <ForumCard key={thread.id} {...thread} />
              ))}
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {userRole === 'teacher' && (
              <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors font-bold flex items-center justify-center gap-2">
                + Crear Reto/Quiz
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-accent" />
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {challenge.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {challenge.description}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-border">
                    <div className="text-xs font-medium text-accent">
                      {challenge.deadline}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {challenge.completed}/{challenge.participants} completados
                      </span>
                      <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{
                            width: `${(challenge.completed / challenge.participants) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
