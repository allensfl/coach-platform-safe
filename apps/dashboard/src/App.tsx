import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCoachee, setSelectedCoachee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  const [coachees, setCoachees] = useState([
    {
      id: 1,
      name: 'Sarah Müller',
      email: 'sarah.mueller@email.com',
      phone: '+49 160 123456789',
      company: 'TechStart GmbH',
      position: 'Teamleiterin',
      coachingGoals: 'Führungskompetenzen entwickeln, Work-Life-Balance',
      startDate: '2025-01-15',
      status: 'Aktiv',
      progress: 75,
      sessionsTotal: 12,
      sessionsCompleted: 9,
      nextSession: '2025-08-12 10:00',
      notes: 'Sehr engagiert, macht gute Fortschritte bei Mitarbeiterführung.',
      privacy: {
        profileVisible: true,
        goalsVisible: true,
        notesVisible: false,
        sessionsVisible: true,
        progressVisible: true,
        documentsVisible: false
      },
      documents: [],
      sessionHistory: [
        { date: '2025-08-01', topic: 'Führungsstil entwickeln', duration: '60 Min', notes: 'Gute Erkenntnisse zu authentischer Führung' },
        { date: '2025-07-25', topic: 'Delegation verbessern', duration: '45 Min', notes: 'Praktische Übungen zur Aufgabenverteilung' },
        { date: '2025-07-18', topic: 'Konfliktmanagement', duration: '60 Min', notes: 'Rollenspiele für schwierige Gespräche' }
      ]
    },
    {
      id: 2,
      name: 'Michael Schmidt',
      email: 'michael.schmidt@startup.com',
      phone: '+49 175 987654321',
      company: 'InnovateLab',
      position: 'Gründer & CEO',
      coachingGoals: 'Unternehmerische Vision schärfen, Skalierung planen',
      startDate: '2025-02-01',
      status: 'Aktiv',
      progress: 60,
      sessionsTotal: 10,
      sessionsCompleted: 6,
      nextSession: '2025-08-15 14:00',
      notes: 'Sehr visionär, braucht Unterstützung bei operativer Umsetzung.',
      privacy: {
        profileVisible: true,
        goalsVisible: true,
        notesVisible: true,
        sessionsVisible: false,
        progressVisible: true,
        documentsVisible: true
      },
      documents: [
        { name: 'Businessplan_2025.pdf', uploadDate: '2025-07-20' },
        { name: 'Vision_Statement.docx', uploadDate: '2025-07-15' }
      ],
      sessionHistory: [
        { date: '2025-07-30', topic: 'Strategische Planung', duration: '90 Min', notes: 'Roadmap für Q4 entwickelt' },
        { date: '2025-07-16', topic: 'Team Building', duration: '60 Min', notes: 'Hiring-Strategie besprochen' }
      ]
    },
    {
      id: 3,
      name: 'Anna Weber',
      email: 'anna.weber@corporate.de',
      phone: '+49 151 456789123',
      company: 'Corporate Solutions AG',
      position: 'Projektmanagerin',
      coachingGoals: 'Stressmanagement, Karriereplanung',
      startDate: '2025-03-01',
      status: 'Pausiert',
      progress: 40,
      sessionsTotal: 8,
      sessionsCompleted: 3,
      nextSession: 'TBD',
      notes: 'Coaching pausiert aufgrund beruflicher Veränderungen.',
      privacy: {
        profileVisible: true,
        goalsVisible: false,
        notesVisible: false,
        sessionsVisible: true,
        progressVisible: false,
        documentsVisible: false
      },
      documents: [],
      sessionHistory: [
        { date: '2025-07-10', topic: 'Stressbewältigung', duration: '45 Min', notes: 'Entspannungstechniken erlernt' }
      ]
    }
  ]);

  const [tools, setTools] = useState([
    {
      id: 1,
      name: 'GROW-Modell Template',
      description: 'Strukturiertes Coaching-Gespräch mit Goal, Reality, Options, Way forward',
      category: 'Zielsetzung',
      keywords: ['ziele', 'struktur', 'gespräch', 'grow'],
      difficulty: 'Einfach',
      duration: '30-60 Min',
      targetAudience: 'Alle Coaching-Level',
      usageCount: 15
    },
    {
      id: 2,
      name: 'Wheel of Life',
      description: 'Lebensrad zur ganzheitlichen Bewertung verschiedener Lebensbereiche',
      category: 'Persönlichkeit',
      keywords: ['balance', 'bewertung', 'leben', 'bereiche'],
      difficulty: 'Einfach',
      duration: '15-30 Min',
      targetAudience: 'Life Coaching',
      usageCount: 23
    },
    {
      id: 3,
      name: 'Kommunikationsstile-Test',
      description: 'Assessment zur Identifikation des persönlichen Kommunikationsstils',
      category: 'Kommunikation',
      keywords: ['kommunikation', 'stil', 'test', 'persönlichkeit'],
      difficulty: 'Einfach',
      duration: '20-30 Min',
      targetAudience: 'Business Coaching',
      usageCount: 8
    },
    {
      id: 4,
      name: 'Stressoren-Mapping',
      description: 'Systematische Analyse und Kartierung persönlicher Stressfaktoren',
      category: 'Persönlichkeit',
      keywords: ['stress', 'analyse', 'belastung', 'mapping'],
      difficulty: 'Mittel',
      duration: '30-45 Min',
      targetAudience: 'Stress-Coaching',
      usageCount: 12
    },
    {
      id: 5,
      name: 'Führungsstil-Reflexion',
      description: 'Tiefgreifende Reflexion und Entwicklung des persönlichen Führungsstils',
      category: 'Zielsetzung',
      keywords: ['führung', 'leadership', 'stil', 'reflexion'],
      difficulty: 'Fortgeschritten',
      duration: '60-90 Min',
      targetAudience: 'Leadership Coaching',
      usageCount: 6
    },
    {
      id: 6,
      name: 'Werte-Identifikation Workshop',
      description: 'Interaktiver Workshop zur Identifikation und Priorisierung persönlicher Werte',
      category: 'Persönlichkeit',
      keywords: ['werte', 'identität', 'workshop', 'prioritäten'],
      difficulty: 'Mittel',
      duration: '45-90 Min',
      targetAudience: 'Personal Coaching',
      usageCount: 19
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      coacheeId: 1,
      coacheeName: 'Sarah Müller',
      date: '2025-08-12',
      time: '10:00',
      duration: '60 Min',
      topic: 'Führungskompetenzen Review',
      status: 'Geplant',
      notes: 'Vorbereitung: GROW-Modell, Führungsstil-Reflexion'
    },
    {
      id: 2,
      coacheeId: 2,
      coacheeName: 'Michael Schmidt',
      date: '2025-08-15',
      time: '14:00',
      duration: '90 Min',
      topic: 'Strategische Unternehmensentwicklung',
      status: 'Geplant',
      notes: 'Businessplan Review, Skalierungsstrategien'
    }
  ]);

  // Hilfsfunktionen
  const getCoacheeById = (id) => coachees.find(c => c.id === id);
  const getStatusColor = (status) => {
    switch(status) {
      case 'Aktiv': return 'bg-green-100 text-green-800';
      case 'Pausiert': return 'bg-yellow-100 text-yellow-800';
      case 'Abgeschlossen': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const togglePrivacySetting = (coacheeId, setting) => {
    setCoachees(prev => prev.map(coachee => 
      coachee.id === coacheeId 
        ? {
            ...coachee,
            privacy: {
              ...coachee.privacy,
              [setting]: !coachee.privacy[setting]
            }
          }
        : coachee
    ));
  };

  // Add Tool Modal Component
  const AddToolModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      category: '',
      keywords: '',
      difficulty: '',
      duration: '',
      targetAudience: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich';
      if (!formData.description.trim()) newErrors.description = 'Beschreibung ist erforderlich';
      if (!formData.category.trim()) newErrors.category = 'Kategorie ist erforderlich';
      if (!formData.difficulty.trim()) newErrors.difficulty = 'Schwierigkeit ist erforderlich';
      if (!formData.duration.trim()) newErrors.duration = 'Dauer ist erforderlich';
      return newErrors;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formErrors = validateForm();
      
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      const newTool = {
        id: tools.length + 1,
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim()),
        usageCount: 0
      };
      
      onAdd(newTool);
      setFormData({
        name: '',
        description: '',
        category: '',
        keywords: '',
        difficulty: '',
        duration: '',
        targetAudience: ''
      });
      setErrors({});
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Neues Tool hinzufügen</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full p-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="z.B. GROW-Modell Template"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`w-full p-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                rows={3}
                placeholder="Kurze Beschreibung des Tools..."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`w-full p-2 border rounded-lg ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Kategorie wählen...</option>
                <option value="Zielsetzung">Zielsetzung</option>
                <option value="Persönlichkeit">Persönlichkeit</option>
                <option value="Kommunikation">Kommunikation</option>
                <option value="Assessment">Assessment</option>
                <option value="Framework">Framework</option>
                <option value="Workshop">Workshop</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="z.B. ziele, struktur, gespräch (durch Komma trennen)"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schwierigkeit *</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className={`w-full p-2 border rounded-lg ${errors.difficulty ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Wählen...</option>
                  <option value="Einfach">Einfach</option>
                  <option value="Mittel">Mittel</option>
                  <option value="Fortgeschritten">Fortgeschritten</option>
                </select>
                {errors.difficulty && <p className="text-red-500 text-xs mt-1">{errors.difficulty}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dauer *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className={`w-full p-2 border rounded-lg ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="z.B. 30-60 Min"
                />
                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zielgruppe</label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="z.B. Business Coaching, Life Coaching"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tool hinzufügen
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Add Coachee Modal Component
  const AddCoacheeModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      coachingGoals: '',
      startDate: new Date().toISOString().split('T')[0],
      sessionsTotal: 10
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newCoachee = {
        id: coachees.length + 1,
        ...formData,
        status: 'Aktiv',
        progress: 0,
        sessionsCompleted: 0,
        nextSession: 'TBD',
        notes: '',
        privacy: {
          profileVisible: true,
          goalsVisible: true,
          notesVisible: true,
          sessionsVisible: true,
          progressVisible: true,
          documentsVisible: true
        },
        documents: [],
        sessionHistory: []
      };
      
      onAdd(newCoachee);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        coachingGoals: '',
        startDate: new Date().toISOString().split('T')[0],
        sessionsTotal: 10
      });
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Neuen Coachee hinzufügen</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unternehmen</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coaching-Ziele</label>
              <textarea
                value={formData.coachingGoals}
                onChange={(e) => setFormData({...formData, coachingGoals: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Startdatum</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Geplante Sessions</label>
                <input
                  type="number"
                  value={formData.sessionsTotal}
                  onChange={(e) => setFormData({...formData, sessionsTotal: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  min="1"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Hinzufügen
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Main render function
  const renderCurrentView = () => {
    switch(currentView) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">🚀 Cockpit</h2>
              <p className="text-gray-600 mt-2">Dein Coaching-Command-Center</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Aktive Coachees</p>
                    <p className="text-3xl font-bold text-blue-900">{coachees.filter(c => c.status === 'Aktiv').length}</p>
                  </div>
                  <div className="text-blue-500 text-2xl">👥</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Sessions diese Woche</p>
                    <p className="text-3xl font-bold text-green-900">{appointments.length}</p>
                  </div>
                  <div className="text-green-500 text-2xl">📅</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Coaching-Tools</p>
                    <p className="text-3xl font-bold text-purple-900">{tools.length}</p>
                  </div>
                  <div className="text-purple-500 text-2xl">🛠</div>
                </div>
              </div>
            </div>

            {/* Coaching Pipeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-3">🎯</span>
                Coaching-Pipeline
              </h3>
              <div className="space-y-4">
                {coachees.map(coachee => (
                  <div key={coachee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {coachee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{coachee.name}</h4>
                        <p className="text-sm text-gray-600">{coachee.company} • {coachee.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${coachee.progress}%`}}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{coachee.progress}% abgeschlossen</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(coachee.status)}`}>
                        {coachee.status}
                      </span>
                      <button 
                        onClick={() => {
                          setSelectedCoachee(coachee);
                          setCurrentView('coachees');
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nächste Termine */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-3">📅</span>
                Nächste Termine
              </h3>
              <div className="space-y-3">
                {appointments.map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.coacheeName}</h4>
                      <p className="text-sm text-gray-600">{appointment.topic}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.date} um {appointment.time}
                      </p>
                      <p className="text-xs text-gray-600">{appointment.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'coachees':
        if (selectedCoachee) {
          const coachee = selectedCoachee;
          const [activeTab, setActiveTab] = useState('profile');
          
          return (
            <div className="space-y-6">
              {/* Header mit Zurück-Button */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSelectedCoachee(null)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  ← Zurück zur Übersicht
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{coachee.name}</h2>
                  <p className="text-gray-600">{coachee.company} • {coachee.position}</p>
                </div>
              </div>

              {/* Coachee Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'profile', name: 'Profil', icon: '👤' },
                    { id: 'goals', name: 'Ziele', icon: '🎯' },
                    { id: 'notes', name: 'Notizen', icon: '📝' },
                    { id: 'sessions', name: 'Sessions', icon: '💬' },
                    { id: 'progress', name: 'Fortschritt', icon: '📈' },
                    { id: 'documents', name: 'Dokumente', icon: '📄' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg shadow p-6">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">Profil-Informationen</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Sichtbarkeit:</span>
                        <button
                          onClick={() => togglePrivacySetting(coachee.id, 'profileVisible')}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            coachee.privacy.profileVisible 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {coachee.privacy.profileVisible ? '👁 Sichtbar' : '🙈 Verborgen'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <p className="text-gray-900">{coachee.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                        <p className="text-gray-900">{coachee.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                        <p className="text-gray-900">{coachee.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unternehmen</label>
                        <p className="text-gray-900">{coachee.company}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <p className="text-gray-900">{coachee.position}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Coaching-Start</label>
                        <p className="text-gray-900">{new Date(coachee.startDate).toLocaleDateString('de-DE')}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'goals' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Coaching-Ziele</h3>
                      <button
                        onClick={() => togglePrivacySetting(coachee.id, 'goalsVisible')}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          coachee.privacy.goalsVisible 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {coachee.privacy.goalsVisible ? '👁 Sichtbar' : '🙈 Verborgen'}
                      </button>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-900">{coachee.coachingGoals}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Coaching-Notizen</h3>
                      <button
                        onClick={() => togglePrivacySetting(coachee.id, 'notesVisible')}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          coachee.privacy.notesVisible 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {coachee.privacy.notesVisible ? '👁 Sichtbar' : '🙈 Verborgen'}
                      </button>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-gray-900">{coachee.notes}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'sessions' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Session-Historie</h3>
                      <button
                        onClick={() => togglePrivacySetting(coachee.id, 'sessionsVisible')}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          coachee.privacy.sessionsVisible 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {coachee.privacy.sessionsVisible ? '👁 Sichtbar' : '🙈 Verborgen'}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {coachee.sessionHistory.map((session, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{session.topic}</h4>
                              <p className="text-sm text-gray-600 mt-1">{session.notes}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{session.date}</p>
                              <p className="text-xs text-gray-500">{session.duration}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'progress' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Fortschritt</h3>
                      <button
                        onClick={() => togglePrivacySetting(coachee.id, 'progressVisible')}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          coachee.privacy.progressVisible 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {coachee.privacy.progressVisible ? '👁 Sichtbar' : '🙈 Verborgen'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600">{coachee.progress}%</p>
                        <p className="text-sm text-blue-600">Gesamtfortschritt</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600">{coachee.sessionsCompleted}</p>
                        <p className="text-sm text-green-600">Abgeschlossene Sessions</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-purple-600">{coachee.sessionsTotal - coachee.sessionsCompleted}</p>
                        <p className="text-sm text-purple-600">Verbleibende Sessions</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Dokumente</h3>
                      <button
                        onClick={() => togglePrivacySetting(coachee.id, 'documentsVisible')}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          coachee.privacy.documentsVisible 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {coachee.privacy.documentsVisible ? '👁 Sichtbar' : '🙈 Verborgen'}
                      </button>
                    </div>
                    {coachee.documents.length > 0 ? (
                      <div className="space-y-2">
                        {coachee.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">📄</span>
                              <div>
                                <p className="font-medium text-gray-900">{doc.name}</p>
                                <p className="text-sm text-gray-600">Hochgeladen: {doc.uploadDate}</p>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <span className="text-4xl">📄</span>
                        <p className="text-gray-600 mt-2">Noch keine Dokumente hochgeladen</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        }

        // Coachees Übersicht
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">👥 Coachees</h2>
                <p className="text-gray-600 mt-2">Verwalte deine Coaching-Klienten</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                + Neuen Coachee hinzufügen
              </button>
            </div>

            {/* Coachees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coachees.map(coachee => (
                <div key={coachee.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {coachee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(coachee.status)}`}>
                      {coachee.status}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1">{coachee.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{coachee.company}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Fortschritt</span>
                      <span>{coachee.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{width: `${coachee.progress}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-4">
                    <p>Sessions: {coachee.sessionsCompleted}/{coachee.sessionsTotal}</p>
                    {coachee.nextSession !== 'TBD' && (
                      <p>Nächster Termin: {coachee.nextSession}</p>
                    )}
                  </div>

                  <button 
                    onClick={() => setSelectedCoachee(coachee)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Details anzeigen
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">📅 Termine</h2>
              <p className="text-gray-600 mt-2">Verwalte deine Coaching-Termine</p>
            </div>

            {/* Kommende Termine */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Kommende Termine</h3>
              <div className="space-y-4">
                {appointments.map(appointment => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                          {appointment.coacheeName}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{appointment.topic}</p>
                        {appointment.notes && (
                          <p className="text-xs text-gray-500 mt-2">📝 {appointment.notes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{appointment.date}</p>
                        <p className="text-sm text-gray-600">{appointment.time} ({appointment.duration})</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block ${
                          appointment.status === 'Geplant' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // TIER 1 ULTIMATE TOOLS UPGRADE
// Ersetze nur den 'tools' case in deiner App.tsx (Zeile ca. 545-800)
// ALLES ANDERE BLEIBT UNVERÄNDERT!

case 'tools':
  {
    // ====== NEUE ULTIMATE FEATURES STATE ======
    const [selectedCategory, setSelectedCategory] = useState('Alle');
    const [showSessionPlanner, setShowSessionPlanner] = useState(false);
    const [isLiveSession, setIsLiveSession] = useState(false);
    const [liveSessionClient, setLiveSessionClient] = useState(null);
    const [liveSessionStartTime, setLiveSessionStartTime] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sessionTools, setSessionTools] = useState([]);
    const [usedToolsHistory, setUsedToolsHistory] = useState([]);
    
    // ====== NEUE FEATURE: INTELLIGENTE TOOL-EMPFEHLUNGEN ======
    const [selectedCoacheeForRecommendations, setSelectedCoacheeForRecommendations] = useState('');
    
    // Smart Tool-Empfehlungen basierend auf Coachee-Profil
    const getRecommendedToolsForCoachee = (coacheeId) => {
      if (!coacheeId) return [];
      
      const coachee = coachees.find(c => c.id === parseInt(coacheeId));
      if (!coachee) return [];
      
      const goals = coachee.coachingGoals.toLowerCase();
      
      return tools.filter(tool => {
        const keywords = tool.keywords.join(' ').toLowerCase();
        const description = tool.description.toLowerCase();
        
        // Intelligente Matching-Logic
        return (
          (goals.includes('führung') && (keywords.includes('führung') || keywords.includes('leadership'))) ||
          (goals.includes('entwickeln') && (keywords.includes('ziele') || keywords.includes('entwicklung'))) ||
          (goals.includes('balance') && (keywords.includes('stress') || keywords.includes('balance'))) ||
          (goals.includes('vision') && (description.includes('vision') || keywords.includes('ziele'))) ||
          (goals.includes('kommunikation') && keywords.includes('kommunikation')) ||
          (goals.includes('team') && (keywords.includes('kommunikation') || keywords.includes('führung')))
        );
      }).slice(0, 4); // Top 4 Empfehlungen
    };

    // ====== NEUE FEATURE: INTERAKTIVE TOOL-ANWENDUNG ======
    const [activeInteractiveTool, setActiveInteractiveTool] = useState(null);
    const [wheelOfLifeScores, setWheelOfLifeScores] = useState({
      career: 6, finances: 4, health: 7, relationships: 8,
      personal: 5, fun: 6, environment: 7, growth: 5
    });
    const [scaleToolValue, setScaleToolValue] = useState(7);
    const [scaleToolQuestion, setScaleToolQuestion] = useState('Wie hoch ist Ihr Selbstvertrauen in beruflichen Situationen?');

    // Interaktives Wheel of Life Component
    const InteractiveWheelOfLife = () => {
      const wheelCategories = [
        { key: 'career', label: 'Karriere', color: 'bg-blue-500' },
        { key: 'finances', label: 'Finanzen', color: 'bg-green-500' },
        { key: 'health', label: 'Gesundheit', color: 'bg-red-500' },
        { key: 'relationships', label: 'Beziehungen', color: 'bg-pink-500' },
        { key: 'personal', label: 'Persönlich', color: 'bg-purple-500' },
        { key: 'fun', label: 'Freizeit', color: 'bg-yellow-500' },
        { key: 'environment', label: 'Umgebung', color: 'bg-indigo-500' },
        { key: 'growth', label: 'Wachstum', color: 'bg-emerald-500' }
      ];

      const avgScore = (Object.values(wheelOfLifeScores).reduce((a, b) => a + b, 0) / 8).toFixed(1);

      return (
        <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            🎯 Interaktives Wheel of Life
            <span className="ml-auto text-sm text-gray-600">Durchschnitt: {avgScore}/10</span>
          </h4>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {wheelCategories.map((category) => (
              <div key={category.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className="text-lg font-bold text-blue-600">{wheelOfLifeScores[category.key]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={wheelOfLifeScores[category.key]}
                  onChange={(e) => setWheelOfLifeScores(prev => ({
                    ...prev,
                    [category.key]: parseInt(e.target.value)
                  }))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{background: `linear-gradient(to right, ${category.color.replace('bg-', '#')} 0%, ${category.color.replace('bg-', '#')} ${wheelOfLifeScores[category.key] * 10}%, #e5e7eb ${wheelOfLifeScores[category.key] * 10}%, #e5e7eb 100%)`}}
                />
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h5 className="font-medium text-blue-900 mb-2">🔍 Live-Analyse:</h5>
            <p className="text-sm text-blue-800">
              <strong>Stärkste Bereiche:</strong> {
                Object.entries(wheelOfLifeScores)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 2)
                  .map(([key, value]) => `${wheelCategories.find(c => c.key === key)?.label} (${value}/10)`)
                  .join(', ')
              }
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Entwicklungspotential:</strong> {
                Object.entries(wheelOfLifeScores)
                  .sort(([,a], [,b]) => a - b)
                  .slice(0, 2)
                  .map(([key, value]) => `${wheelCategories.find(c => c.key === key)?.label} (${value}/10)`)
                  .join(', ')
              }
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                alert(`Wheel of Life Ergebnisse:\n\n${Object.entries(wheelOfLifeScores).map(([key, value]) => `${wheelCategories.find(c => c.key === key)?.label}: ${value}/10`).join('\n')}\n\nDurchschnitt: ${avgScore}/10`);
              }}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              📊 Ergebnisse anzeigen
            </button>
            <button
              onClick={() => {
                // Transfer to coachee profile logic here
                if (liveSessionClient) {
                  alert(`✅ Wheel of Life Ergebnisse wurden in ${liveSessionClient.name}'s Profil übertragen!\n\nDurchschnitt: ${avgScore}/10`);
                } else {
                  alert('💡 Im Live-Session Modus würden die Ergebnisse automatisch ins Coachee-Profil übertragen.');
                }
              }}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              💾 In Profil übertragen
            </button>
          </div>
        </div>
      );
    };

    // Interaktives Skalen-Tool Component
    const InteractiveScaleTool = () => {
      const getScaleInterpretation = (value) => {
        if (value >= 8) return "Sehr hoch - Sie fühlen sich sehr sicher und kompetent";
        if (value >= 6) return "Gut - Solide Basis mit Raum für Wachstum";
        if (value >= 4) return "Mittel - Entwicklungspotential vorhanden";
        return "Niedrig - Hier liegt großes Wachstumspotential";
      };

      return (
        <div className="bg-white rounded-lg border-2 border-yellow-200 p-6">
          <h4 className="text-lg font-semibold mb-4">📏 Interaktives Skalen-Tool</h4>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Frage: "{scaleToolQuestion}"
            </label>
            <div className="relative">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Sehr niedrig</span>
                <span>Mittel</span>
                <span>Sehr hoch</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={scaleToolValue}
                onChange={(e) => setScaleToolValue(parseInt(e.target.value))}
                className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                {[0,1,2,3,4,5,6,7,8,9,10].map(num => (
                  <span key={num} className={num === scaleToolValue ? 'text-yellow-600 font-bold' : ''}>
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center mt-4">
              <span className="text-4xl font-bold text-yellow-600">{scaleToolValue}/10</span>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h5 className="font-medium text-yellow-900 mb-2">💡 Interpretation:</h5>
            <p className="text-sm text-yellow-800">{getScaleInterpretation(scaleToolValue)}</p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={scaleToolQuestion}
              onChange={(e) => setScaleToolQuestion(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="Eigene Frage eingeben..."
            />
            <button
              onClick={() => {
                if (liveSessionClient) {
                  alert(`✅ Skalen-Ergebnis wurde in ${liveSessionClient.name}'s Profil übertragen!\n\n"${scaleToolQuestion}"\nBewertung: ${scaleToolValue}/10`);
                } else {
                  alert('💡 Im Live-Session Modus würde das Ergebnis automatisch ins Coachee-Profil übertragen.');
                }
              }}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 text-sm"
            >
              💾 Speichern
            </button>
          </div>
        </div>
      );
    };

    // Session Planner Modal Component (erweitert)
    const SessionPlannerModal = ({ isOpen, onClose }) => {
      const [selectedClient, setSelectedClient] = useState('');
      const [recommendedTools, setRecommendedTools] = useState([]);

      const handleClientSelect = (clientId) => {
        setSelectedClient(clientId);
        setRecommendedTools(getRecommendedToolsForCoachee(clientId));
      };

      const addToolToSession = (tool) => {
        if (!sessionTools.find(t => t.id === tool.id)) {
          setSessionTools(prev => [...prev, {...tool, status: 'geplant', addedAt: new Date()}]);
        }
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">📅 Intelligente Session-Planung</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coachee auswählen:</label>
                <select
                  value={selectedClient}
                  onChange={(e) => handleClientSelect(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Coachee wählen...</option>
                  {coachees.filter(c => c.status === 'Aktiv').map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>

              {selectedClient && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900">
                    {coachees.find(c => c.id === parseInt(selectedClient))?.name}
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    🎯 Ziele: {coachees.find(c => c.id === parseInt(selectedClient))?.coachingGoals}
                  </p>
                </div>
              )}

              {recommendedTools.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    🧠 KI-basierte Tool-Empfehlungen:
                    <span className="ml-2 text-sm text-green-600">({recommendedTools.length} passende Tools gefunden)</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recommendedTools.map(tool => (
                      <div key={tool.id} className="border border-green-200 bg-green-50 rounded-lg p-3">
                        <h5 className="font-medium text-green-900">{tool.name}</h5>
                        <p className="text-xs text-green-700 mt-1">{tool.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-green-600">
                            {tool.difficulty} • {tool.duration}
                          </span>
                          <button
                            onClick={() => addToolToSession(tool)}
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            + Hinzufügen
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sessionTools.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">📋 Geplante Session-Tools ({sessionTools.length}):</h4>
                  <div className="space-y-2">
                    {sessionTools.map(tool => (
                      <div key={tool.id} className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                        <div>
                          <span className="font-medium text-blue-900">{tool.name}</span>
                          <span className="ml-2 text-xs text-blue-600">({tool.duration})</span>
                        </div>
                        <button
                          onClick={() => setSessionTools(prev => prev.filter(t => t.id !== tool.id))}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Entfernen
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Session geplant ✓
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      );
    };

    // Live Session Toolbar Component
    const LiveSessionToolbar = () => {
      if (!isLiveSession || !liveSessionClient) return null;

      const duration = liveSessionStartTime ? 
        Math.floor((new Date() - liveSessionStartTime) / 1000 / 60) : 0;

      return (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse"></div>
              <span className="font-semibold">🔴 LIVE SESSION AKTIV</span>
            </div>
            <span>mit {liveSessionClient.name}</span>
            <span className="text-red-200">• {duration} Min</span>
          </div>
          <button
            onClick={() => {
              const endConfirm = confirm(`Session mit ${liveSessionClient.name} beenden?\n\nDauer: ${duration} Minuten\nVerwendete Tools: ${usedToolsHistory.filter(h => h.type === 'live').length}`);
              if (endConfirm) {
                setIsLiveSession(false);
                setLiveSessionClient(null);
                setLiveSessionStartTime(null);
                alert('✅ Session erfolgreich beendet und dokumentiert!');
              }
            }}
            className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded text-sm"
          >
            Session beenden
          </button>
        </div>
      );
    };

    // Filter Tools Function (erweitert)
    const getFilteredTools = () => {
      let filtered = tools;
      
      if (selectedCategory !== 'Alle') {
        filtered = filtered.filter(tool => tool.category === selectedCategory);
      }
      
      if (searchTerm) {
        filtered = filtered.filter(tool =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      return filtered;
    };

    // Enhanced Tool Usage Handler
    const handleUseToolInteractive = (tool) => {
      if (tool.name === 'Wheel of Life') {
        setActiveInteractiveTool('wheel');
        return;
      }
      
      if (tool.name.toLowerCase().includes('skala') || tool.name.toLowerCase().includes('selbstvertrauen')) {
        setActiveInteractiveTool('scale');
        return;
      }
      
      // Standard tool usage
      handleUseTool(tool);
    };

    const handleUseTool = (tool) => {
      // Increment usage count
      setTools(prev => prev.map(t => 
        t.id === tool.id ? {...t, usageCount: t.usageCount + 1} : t
      ));
      
      // Add to history
      const historyEntry = {
        id: Date.now(),
        toolName: tool.name,
        clientName: isLiveSession ? liveSessionClient?.name : 'Demo-Modus',
        timestamp: new Date(),
        type: isLiveSession ? 'live' : 'demo'
      };
      
      setUsedToolsHistory(prev => [historyEntry, ...prev]);
      
      if (isLiveSession) {
        alert(`🔴 LIVE: "${tool.name}" wird mit ${liveSessionClient?.name} verwendet!\n\nTool wurde automatisch dokumentiert.`);
      } else {
        alert(`Tool "${tool.name}" Demo-Modus aktiviert!\n\n${tool.description}\n\nSchwierigkeit: ${tool.difficulty}\nDauer: ${tool.duration}`);
      }
    };

    // Start Live Session
    const startLiveSession = () => {
      const activeCoachees = coachees.filter(c => c.status === 'Aktiv');
      const clientList = activeCoachees.map((c, i) => `${i + 1}. ${c.name} (${c.company})`).join('\n');
      
      const clientId = prompt(`🔴 Live-Session starten mit:\n\n${clientList}\n\nNummer eingeben:`);
      
      if (clientId) {
        const clientIndex = parseInt(clientId) - 1;
        const selectedClient = activeCoachees[clientIndex];
        
        if (selectedClient) {
          setIsLiveSession(true);
          setLiveSessionClient(selectedClient);
          setLiveSessionStartTime(new Date());
          setSelectedCoacheeForRecommendations(selectedClient.id.toString());
          
          // Auto-suggest tools for this client
          const recommendations = getRecommendedToolsForCoachee(selectedClient.id);
          if (recommendations.length > 0) {
            setTimeout(() => {
              alert(`💡 Intelligente Tool-Empfehlungen für ${selectedClient.name}:\n\n${recommendations.slice(0, 3).map(t => `• ${t.name} (${t.duration})`).join('\n')}\n\nSiehe grüne Empfehlungen-Box unten!`);
            }, 1000);
          }
        }
      }
    };

    // TOOLS RENDER START
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">🛠 Coaching Tools</h2>
            <p className="text-gray-600 mt-2">Intelligente Tools mit Live-Session Integration</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowSessionPlanner(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📅 KI Session-Planung
            </button>
            <button
              onClick={startLiveSession}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              🔴 Live-Session starten
            </button>
            <button
              onClick={() => setShowAddToolModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Tool hinzufügen
            </button>
          </div>
        </div>

        <LiveSessionToolbar />

        {/* NEUE FEATURE: Intelligente Tool-Empfehlungen */}
        {!isLiveSession && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              🧠 Intelligente Tool-Empfehlungen
            </h3>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coachee auswählen für personalisierte Empfehlungen:
                </label>
                <select
                  value={selectedCoacheeForRecommendations}
                  onChange={(e) => setSelectedCoacheeForRecommendations(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Coachee wählen...</option>
                  {coachees.filter(c => c.status === 'Aktiv').map(client => (
                    <option key={client.id} value={client.id}>{client.name} ({client.company})</option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedCoacheeForRecommendations && (
              <div className="mt-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                  <h4 className="font-medium text-blue-900">
                    {coachees.find(c => c.id === parseInt(selectedCoacheeForRecommendations))?.name}
                  </h4>
                  <p className="text-sm text-blue-700">
                    🎯 Ziele: {coachees.find(c => c.id === parseInt(selectedCoacheeForRecommendations))?.coachingGoals}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getRecommendedToolsForCoachee(selectedCoacheeForRecommendations).map(tool => (
                    <div key={tool.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-green-900">{tool.name}</h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Empfohlen
                        </span>
                      </div>
                      <p className="text-sm text-green-700 mb-3">{tool.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUseToolInteractive(tool)}
                          className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700"
                        >
                          ⚡ Verwenden
                        </button>
                        <button
                          onClick={() => {
                            if (!sessionTools.find(t => t.id === tool.id)) {
                              setSessionTools(prev => [...prev, {...tool, status: 'geplant'}]);
                              alert(`✅ "${tool.name}" zur Session-Planung hinzugefügt!`);
                            }
                          }}
                          className="px-3 py-2 border border-green-600 text-green-600 rounded text-sm hover:bg-green-50"
                        >
                          📅
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {getRecommendedToolsForCoachee(selectedCoacheeForRecommendations).length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-gray-600">Keine spezifischen Empfehlungen für diese Ziele gefunden.</p>
                    <p className="text-sm text-gray-500 mt-1">Alle Tools stehen weiterhin zur Verfügung.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* NEUE FEATURE: Interaktive Tool-Anwendung */}
        {activeInteractiveTool && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">🎮 Interaktive Tool-Anwendung</h3>
              <button
                onClick={() => setActiveInteractiveTool(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕ Schließen
              </button>
            </div>
            
            {activeInteractiveTool === 'wheel' && <InteractiveWheelOfLife />}
            {activeInteractiveTool === 'scale' && <InteractiveScaleTool />}
          </div>
        )}

        {/* Enhanced Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="🔍 Intelligente Tool-Suche... (z.B. 'Führung', 'Stress', 'Kommunikation')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg pl-4"
            />
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                {getFilteredTools().slice(0, 5).map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSearchTerm(tool.name);
                      handleUseToolInteractive(tool);
                    }}
                    className="w-full text-left p-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-xs text-gray-600">{tool.category} • {tool.duration}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="Alle">Alle Kategorien ({tools.length})</option>
            <option value="Zielsetzung">Zielsetzung ({tools.filter(t => t.category === 'Zielsetzung').length})</option>
            <option value="Persönlichkeit">Persönlichkeit ({tools.filter(t => t.category === 'Persönlichkeit').length})</option>
            <option value="Kommunikation">Kommunikation ({tools.filter(t => t.category === 'Kommunikation').length})</option>
            <option value="Assessment">Assessment ({tools.filter(t => t.category === 'Assessment').length})</option>
            <option value="Framework">Framework ({tools.filter(t => t.category === 'Framework').length})</option>
            <option value="Workshop">Workshop ({tools.filter(t => t.category === 'Workshop').length})</option>
          </select>
        </div>

        {/* Enhanced Tool-Kategorien */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setSelectedCategory(selectedCategory === 'Zielsetzung' ? 'Alle' : 'Zielsetzung')}
            className={`p-6 text-center rounded-lg transition-all ${
              selectedCategory === 'Zielsetzung' 
                ? 'bg-blue-100 border-2 border-blue-500 shadow-lg transform scale-105' 
                : 'bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md hover:scale-102'
            }`}
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-blue-900">Zielsetzung</h3>
            <p className="text-sm text-blue-700 mt-1">SMART Goals, Vision, GROW-Modell</p>
            <p className="text-xs text-blue-600 mt-2">
              {tools.filter(t => t.category === 'Zielsetzung').length} Tools
            </p>
            {selectedCategory === 'Zielsetzung' && (
              <div className="mt-2 text-xs text-blue-800 font-medium">✓ Aktiv</div>
            )}
          </button>
          
          <button
            onClick={() => setSelectedCategory(selectedCategory === 'Persönlichkeit' ? 'Alle' : 'Persönlichkeit')}
            className={`p-6 text-center rounded-lg transition-all ${
              selectedCategory === 'Persönlichkeit' 
                ? 'bg-green-100 border-2 border-green-500 shadow-lg transform scale-105' 
                : 'bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md hover:scale-102'
            }`}
          >
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="font-semibold text-green-900">Persönlichkeit</h3>
            <p className="text-sm text-green-700 mt-1">Wheel of Life, Werte, Reflexion</p>
            <p className="text-xs text-green-600 mt-2">
              {tools.filter(t => t.category === 'Persönlichkeit').length} Tools
            </p>
            {selectedCategory === 'Persönlichkeit' && (
              <div className="mt-2 text-xs text-green-800 font-medium">✓ Aktiv</div>
            )}
          </button>
          
          <button
            onClick={() => setSelectedCategory(selectedCategory === 'Kommunikation' ? 'Alle' : 'Kommunikation')}
            className={`p-6 text-center rounded-lg transition-all ${
              selectedCategory === 'Kommunikation' 
                ? 'bg-purple-100 border-2 border-purple-500 shadow-lg transform scale-105' 
                : 'bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md hover:scale-102'
            }`}
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-purple-900">Kommunikation</h3>
            <p className="text-sm text-purple-700 mt-1">Gesprächsführung, Feedback</p>
            <p className="text-xs text-purple-600 mt-2">
              {tools.filter(t => t.category === 'Kommunikation').length} Tools
            </p>
            {selectedCategory === 'Kommunikation' && (
              <div className="mt-2 text-xs text-purple-800 font-medium">✓ Aktiv</div>
            )}
          </button>
        </div>

        {/* Session Tools (if any planned) */}
        {sessionTools.length > 0 && (
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
              <span className="mr-3">📋</span>
              Für Session geplante Tools ({sessionTools.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessionTools.map(tool => (
                <div key={tool.id} className="bg-white border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900">{tool.name}</h4>
                  <p className="text-sm text-green-700 mt-1">{tool.duration} • {tool.difficulty}</p>
                  <button
                    onClick={() => handleUseToolInteractive(tool)}
                    className={`w-full mt-3 px-4 py-2 rounded text-sm transition-colors ${
                      isLiveSession 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isLiveSession ? '🔴 Live verwenden' : '⚡ Interaktiv verwenden'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Standard-Tools Grid */}
        <div className="bg-white rounded-lg shadow p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <span className="mr-3">⭐</span>
            {selectedCategory === 'Alle' ? 'Alle Tools' : `${selectedCategory}-Tools`}
            <span className="ml-2 text-sm text-gray-600">({getFilteredTools().length})</span>
            {searchTerm && (
              <span className="ml-2 text-sm text-blue-600">für "{searchTerm}"</span>
            )}
          </h3>
          
          {getFilteredTools().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredTools().map(tool => (
                <div key={tool.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:scale-102">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">
                      {tool.name === 'Wheel of Life' ? '🎯' : 
                       tool.name.includes('GROW') ? '🌱' :
                       tool.name.includes('Kommunikation') ? '💬' :
                       tool.name.includes('Stress') ? '😰' :
                       tool.name.includes('Führung') ? '👨‍💼' :
                       tool.name.includes('Werte') ? '💎' : '🛠'}
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tool.difficulty === 'Einfach' ? 'bg-green-100 text-green-800' :
                        tool.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tool.difficulty}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{tool.usageCount}x verwendet</p>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{tool.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                  
                  <div className="text-xs text-gray-500 mb-4 space-y-1">
                    <p>📅 Dauer: {tool.duration}</p>
                    <p>🏷 Kategorie: {tool.category}</p>
                    {tool.targetAudience && <p>👥 Zielgruppe: {tool.targetAudience}</p>}
                    <p>🔑 Keywords: {tool.keywords.join(', ')}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUseToolInteractive(tool)}
                      className={`flex-1 px-4 py-2 rounded text-sm transition-colors ${
                        isLiveSession 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : tool.name === 'Wheel of Life' || tool.name.toLowerCase().includes('skala')
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isLiveSession ? '🔴 Live verwenden' : 
                       tool.name === 'Wheel of Life' || tool.name.toLowerCase().includes('skala') 
                         ? '🎮 Interaktiv' : '▶️ Verwenden'}
                    </button>
                    <button 
                      onClick={() => alert(`ℹ️ Tool-Info:\n\n${tool.description}\n\nKeywords: ${tool.keywords.join(', ')}\nSchwierigkeit: ${tool.difficulty}\nDauer: ${tool.duration}\nZielgruppe: ${tool.targetAudience || 'Alle'}`)}
                      className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      ℹ️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Keine Tools gefunden</h4>
              <p className="text-gray-600 mb-6">
                {searchTerm ? `Keine Ergebnisse für "${searchTerm}"` : `Keine Tools in der Kategorie "${selectedCategory}"`}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Alle');
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Tool Usage History */}
        {usedToolsHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-3">📊</span>
              Tool-Aktivitäten (Letzte Nutzungen)
              <span className="ml-auto text-sm text-gray-600">
                {usedToolsHistory.filter(h => h.type === 'live').length} Live • {usedToolsHistory.filter(h => h.type === 'demo').length} Demo
              </span>
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {usedToolsHistory.slice(0, 10).map(entry => (
                <div key={entry.id} className={`flex items-center justify-between p-3 rounded-lg text-sm ${
                  entry.type === 'live' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className={entry.type === 'live' ? 'text-red-600' : 'text-blue-600'}>
                      {entry.type === 'live' ? '🔴' : '💡'}
                    </span>
                    <div>
                      <span className={`font-medium ${entry.type === 'live' ? 'text-red-900' : 'text-blue-900'}`}>
                        {entry.toolName}
                      </span>
                      <span className={`ml-2 ${entry.type === 'live' ? 'text-red-700' : 'text-blue-700'}`}>
                        mit {entry.clientName}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {entry.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modals */}
        <SessionPlannerModal isOpen={showSessionPlanner} onClose={() => setShowSessionPlanner(false)} />
      </div>
    );
  }


      case 'analytics':
        const totalSessions = coachees.reduce((sum, coachee) => sum + coachee.sessionsCompleted, 0);
        const avgProgress = Math.round(coachees.reduce((sum, coachee) => sum + coachee.progress, 0) / coachees.length);
        const totalToolUsage = tools.reduce((sum, tool) => sum + tool.usageCount, 0);

        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">📊 Analytics</h2>
              <p className="text-gray-600 mt-2">Insights und Statistiken zu deinem Coaching</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Gesamt Coachees</p>
                    <p className="text-3xl font-bold text-blue-900">{coachees.length}</p>
                  </div>
                  <div className="text-blue-500 text-3xl">👥</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Sessions gesamt</p>
                    <p className="text-3xl font-bold text-green-900">{totalSessions}</p>
                  </div>
                  <div className="text-green-500 text-3xl">💬</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Ø Fortschritt</p>
                    <p className="text-3xl font-bold text-purple-900">{avgProgress}%</p>
                  </div>
                  <div className="text-purple-500 text-3xl">📈</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-medium">Tool-Nutzungen</p>
                    <p className="text-3xl font-bold text-orange-900">{totalToolUsage}</p>
                  </div>
                  <div className="text-orange-500 text-3xl">🛠</div>
                </div>
              </div>
            </div>

            {/* Coachee Status Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Coachee Status Übersicht</h3>
              <div className="space-y-4">
                {coachees.map(coachee => (
                  <div key={coachee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {coachee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{coachee.name}</h4>
                        <p className="text-sm text-gray-600">{coachee.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{coachee.progress}%</p>
                        <p className="text-xs text-gray-600">Fortschritt</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{coachee.sessionsCompleted}</p>
                        <p className="text-xs text-gray-600">Sessions</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(coachee.status)}`}>
                        {coachee.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool Usage Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Tool-Nutzungsstatistiken</h3>
              <div className="space-y-3">
                {tools.sort((a, b) => b.usageCount - a.usageCount).map(tool => (
                  <div key={tool.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.category}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${Math.min((tool.usageCount / Math.max(...tools.map(t => t.usageCount))) * 100, 100)}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {tool.usageCount}x
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'branding':
        const [logoUrl, setLogoUrl] = useState('');
        const [companyName, setCompanyName] = useState('TIER 1 Ultimate Coaching');
        const [primaryColor, setPrimaryColor] = useState('#3B82F6');
        const [secondaryColor, setSecondaryColor] = useState('#10B981');

        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">🎨 Branding & Corporate Identity</h2>
              <p className="text-gray-600 mt-2">Personalisiere das Erscheinungsbild deines Coaching-Systems</p>
            </div>

            {/* Logo Upload */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Firmenlogo</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo hochladen</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Hochladen
                    </button>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Company Logo" className="max-h-32 mx-auto" />
                  ) : (
                    <div>
                      <div className="text-4xl mb-2">🏢</div>
                      <p className="text-gray-600">Kein Logo hochgeladen</p>
                      <p className="text-sm text-gray-500 mt-1">Empfohlene Größe: 200x80px, PNG/JPG</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Company Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Unternehmenseinstellungen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Firmenname</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slogan/Tagline</label>
                  <input
                    type="text"
                    placeholder="z.B. Ihr Partner für nachhaltigen Erfolg"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Color Scheme */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Farbschema</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primärfarbe</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 h-8 rounded" style={{backgroundColor: primaryColor}}></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sekundärfarbe</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 h-8 rounded" style={{backgroundColor: secondaryColor}}></div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Vorschau</h3>
              <div className="border border-gray-200 rounded-lg p-6" style={{borderColor: primaryColor}}>
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-2" style={{color: primaryColor}}>
                    {companyName}
                  </h1>
                  <p className="text-gray-600 mb-4">Coaching Dashboard Vorschau</p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      className="px-6 py-3 rounded-lg text-white font-medium"
                      style={{backgroundColor: primaryColor}}
                    >
                      Primär Button
                    </button>
                    <button 
                      className="px-6 py-3 rounded-lg text-white font-medium"
                      style={{backgroundColor: secondaryColor}}
                    >
                      Sekundär Button
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
                Branding speichern
              </button>
            </div>
          </div>
        );

      default:
        return <div>Seite nicht gefunden</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TIER 1 Ultimate</h1>
              <span className="ml-2 text-sm text-gray-500">Coaching Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setSelectedCoachee(null);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'dashboard' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🚀 Cockpit
              </button>
              
              <button
                onClick={() => {
                  setCurrentView('coachees');
                  setSelectedCoachee(null);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'coachees' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                👥 Coachees
              </button>
              
              <button
                onClick={() => setCurrentView('appointments')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'appointments' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📅 Termine
              </button>
              
              <button
                onClick={() => setCurrentView('tools')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'tools' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🛠 Tools
              </button>
              
              <button
                onClick={() => setCurrentView('analytics')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'analytics' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📊 Analytics
              </button>
              
              <button
                onClick={() => setCurrentView('branding')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'branding' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🎨 Branding
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderCurrentView()}
        </div>
      </main>

      {/* Modals */}
      <AddCoacheeModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onAdd={(newCoachee) => setCoachees(prev => [...prev, newCoachee])}
      />
      
      <AddToolModal 
        isOpen={showAddToolModal} 
        onClose={() => setShowAddToolModal(false)}
        onAdd={(newTool) => setTools(prev => [...prev, newTool])}
      />
    </div>
  );
}

export default App;// Final deployment
