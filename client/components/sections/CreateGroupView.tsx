import { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';

interface CreateGroupViewProps {
  onGroupCreated?: (group: any) => void;
}

export function CreateGroupView({ onGroupCreated }: CreateGroupViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: '',
    institution: '',
    visibility: 'private' as 'private' | 'public',
    invitationIds: [] as string[],
    inviteMessage: '',
    image: null as string | null,
  });

  const [currentInviteId, setCurrentInviteId] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddInvitation = () => {
    if (currentInviteId.trim()) {
      setFormData((prev) => ({
        ...prev,
        invitationIds: [...prev.invitationIds, currentInviteId],
      }));
      setCurrentInviteId('');
    }
  };

  const handleRemoveInvitation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      invitationIds: prev.invitationIds.filter((invId) => invId !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.subject) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }
    onGroupCreated?.(formData);
    alert('✓ Grupo creado exitosamente!');
    setFormData({
      name: '',
      description: '',
      subject: '',
      visibility: 'private',
      invitationIds: [],
      inviteMessage: '',
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Crear Nuevo Grupo
        </h1>
        <p className="text-muted-foreground">
          Configura tu grupo de estudio colaborativo
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-6 space-y-6">
        {/* Group Name */}
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Nombre del Grupo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ej: Algebra Avanzado II"
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Descripción *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe el propósito y contenido del grupo..."
            rows={4}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Materia *
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Selecciona una materia</option>
            <option value="Matemáticas">Matemáticas</option>
            <option value="Física">Física</option>
            <option value="Química">Química</option>
            <option value="Biología">Biología</option>
            <option value="Programación">Programación</option>
            <option value="Historia">Historia</option>
            <option value="Idiomas">Idiomas</option>
            <option value="Otra">Otra</option>
          </select>
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Visibilidad
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={formData.visibility === 'private'}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary"
              />
              <div>
                <div className="font-medium text-foreground">Privado</div>
                <div className="text-sm text-muted-foreground">
                  Solo miembros invitados
                </div>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={formData.visibility === 'public'}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary"
              />
              <div>
                <div className="font-medium text-foreground">Público</div>
                <div className="text-sm text-muted-foreground">
                  Visible para todos, unirse abierto
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Invitations Section */}
        <div className="border-t border-border pt-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-accent" />
            Enviar Invitaciones
          </h3>

          <div className="space-y-4">
            {/* Invite Form Toggle */}
            {!showInviteForm ? (
              <button
                type="button"
                onClick={() => setShowInviteForm(true)}
                className="w-full px-4 py-3 border border-dashed border-accent text-accent rounded-lg hover:bg-orange-50 transition-colors font-medium text-sm"
              >
                + Agregar estudiantes
              </button>
            ) : (
              <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-foreground">
                  ID de Estudiante
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentInviteId}
                    onChange={(e) => setCurrentInviteId(e.target.value)}
                    placeholder="Ej: A12345"
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddInvitation}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
                  >
                    Agregar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowInviteForm(false);
                      setCurrentInviteId('');
                    }}
                    className="px-4 py-2 bg-border text-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Invitation Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensaje (Opcional)
                  </label>
                  <textarea
                    name="inviteMessage"
                    value={formData.inviteMessage}
                    onChange={handleInputChange}
                    placeholder="Escribe un mensaje personal para los invitados..."
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>
            )}

            {/* Added Invitations List */}
            {formData.invitationIds.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Estudiantes a invitar ({formData.invitationIds.length})
                </label>
                <div className="space-y-2">
                  {formData.invitationIds.map((id) => (
                    <div
                      key={id}
                      className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {id}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Invitación pendiente
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveInvitation(id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4 border-t border-border">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition-colors font-bold"
          >
            Crear Grupo
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Info Section */}
      <div className="bg-blue-50 rounded-lg border border-primary/20 p-6">
        <h4 className="font-bold text-foreground mb-3">💡 Consejos</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            • Elige un nombre descriptivo para que los estudiantes identifiquen
            fácilmente el grupo
          </li>
          <li>
            • Los grupos privados requieren invitación; los públicos son
            accesibles para todos
          </li>
          <li>
            • Puedes enviar invitaciones iniciales ahora o más tarde desde la
            gestión del grupo
          </li>
        </ul>
      </div>
    </div>
  );
}
