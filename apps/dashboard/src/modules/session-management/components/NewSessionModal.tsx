import React, { useState, useEffect } from 'react';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface CoachingMethod {
  id: string;
  name: string;
  description: string;
  duration: number;
  category: string;
  icon: string;
  color: string;
}

interface NewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sessionData: any) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const NewSessionModal: React.FC<NewSessionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  selectedTime
}) => {
  const [formData, setFormData] = useState({
    clientId: '',
    date: '',
    startTime: '',
    duration: 60,
    title: '',
    type: 'coaching',
    location: 'office',
    notes: '',
    reminderEnabled: true,
    reminderTime: 24,
    coachingMethod: ''
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [showMethodSelector, setShowMethodSelector] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  // ECHTE COACHING-METHODEN
  const coachingMethods: CoachingMethod[] = [
    {
      id: 'systemic-coaching',
      name: 'Systemisches Coaching',
      description: 'Arbeit mit Beziehungsmustern, Familien- und Organisationssystemen',
      duration: 90,
      category: 'Systemisch',
      icon: '🌐',
      color: 'blue'
    },
    {
      id: 'solution-focused',
      name: 'Lösungsorientiertes Coaching',
      description: 'Fokus auf Lösungen und Ressourcen statt auf Probleme',
      duration: 60,
      category: 'Lösungsorientiert',
      icon: '💡',
      color: 'green'
    },
    {
      id: 'resource-oriented',
      name: 'Ressourcenorientiertes Coaching',
      description: 'Stärken und vorhandene Kompetenzen aktivieren und ausbauen',
      duration: 75,
      category: 'Ressourcenorientiert',
      icon: '💪',
      color: 'purple'
    },
    {
      id: 'cognitive-behavioral',
      name: 'Kognitiv-Verhaltensorientiert',
      description: 'Gedanken- und Verhaltensmuster erkennen und verändern',
      duration: 60,
      category: 'Verhaltensorientiert',
      icon: '🧠',
      color: 'orange'
    },
    {
      id: 'humanistic-coaching',
      name: 'Humanistisches Coaching',
      description: 'Personenzentrierter Ansatz nach Carl Rogers, Selbstakzeptanz',
      duration: 90,
      category: 'Humanistisch',
      icon: '❤️',
      color: 'red'
    },
    {
      id: 'narrative-coaching',
      name: 'Narratives Coaching',
      description: 'Lebensgeschichten und persönliche Narrative neu gestalten',
      duration: 75,
      category: 'Narrativ',
      icon: '📖',
      color: 'yellow'
    },
    {
      id: 'gestalt-coaching',
      name: 'Gestalt-Coaching',
      description: 'Hier-und-Jetzt-Bewusstsein, Körperwahrnehmung und Kontakt',
      duration: 90,
      category: 'Gestalt',
      icon: '🎭',
      color: 'indigo'
    },
    {
      id: 'neuro-linguistic',
      name: 'NLP-Coaching',
      description: 'Neurolinguistische Programmierung und Kommunikationsmuster',
      duration: 60,
      category: 'NLP',
      icon: '🧩',
      color: 'teal'
    },
    {
      id: 'positive-psychology',
      name: 'Positive Psychologie',
      description: 'Fokus auf Wohlbefinden, Stärken und positive Emotionen',
      duration: 75,
      category: 'Positiv',
      icon: '🌟',
      color: 'pink'
    },
    {
      id: 'mindfulness-based',
      name: 'Achtsamkeitsbasiertes Coaching',
      description: 'Meditation, Präsenz und bewusste Wahrnehmung integrieren',
      duration: 90,
      category: 'Achtsamkeit',
      icon: '🧘',
      color: 'emerald'
    }
  ];

  // COACHING-LEITFÄDEN DATABASE
  const coachingGuides = {
    'systemic-coaching': {
      name: 'Systemisches Coaching',
      icon: '🌐',
      color: 'blue',
      phases: [
        {
          name: 'EINSTIEG',
          duration: '10-15 Min',
          icon: '🎯',
          questions: [
            '"Welche Systeme sind heute für Sie relevant?" (Systemische Grundfrage)',
            '"Wer gehört zu Ihrem wichtigsten System dazu?"',
            '"Was würde [wichtige Person] über Ihr Anliegen sagen?"',
            '"Welche Beziehungsmuster beschäftigen Sie aktuell?"'
          ],
          tools: [
            '📊 System-Mapping Vorlage',
            '👥 Genogramm-Grundgerüst',
            '🔄 Beziehungskreis-Diagram'
          ]
        },
        {
          name: 'EXPLORATION',
          duration: '25-35 Min',
          icon: '🔍',
          questions: [
            '"Was ist die Geschichte dieses Systems?"',
            '"Welche Regeln gelten in diesem System?"',
            '"Wer hat welche Rolle in diesem System?"',
            '"Welche zirkulären Muster erkennen Sie?"'
          ],
          tools: [
            '🎭 Familienbrett/Systemaufstellung',
            '🔄 Zirkuläre Fragen-Sammlung',
            '📈 Systemdynamik-Analyse'
          ]
        },
        {
          name: 'BEARBEITUNG',
          duration: '15-25 Min',
          icon: '⚡',
          questions: [
            '"Welche neuen Perspektiven sind möglich?"',
            '"Was würde [Person X] zu dieser Lösung sagen?"',
            '"Welche kleine Veränderung könnte große Wirkung haben?"'
          ],
          tools: [
            '🔄 Perspektivwechsel-Übung',
            '⚖️ System-Balancing',
            '🎯 Interventions-Planung'
          ]
        },
        {
          name: 'INTEGRATION',
          duration: '10-15 Min',
          icon: '🔧',
          questions: [
            '"Was wird sich in Ihrem System verändern?"',
            '"Wer wird diese Veränderung als erstes bemerken?"',
            '"Wie können Sie das System unterstützen?"'
          ],
          tools: [
            '📋 Veränderungs-Checkliste',
            '⚠️ Widerstand-Antizipation',
            '🎯 System-Intervention Plan'
          ]
        },
        {
          name: 'ABSCHLUSS',
          duration: '5-10 Min',
          icon: '✅',
          questions: [
            '"Was nehmen Sie aus dieser System-Betrachtung mit?"',
            '"Welche Person in Ihrem System würde sich über diese Erkenntnisse freuen?"'
          ],
          tools: [
            '📝 System-Erkenntnisse Dokumentation',
            '🎯 System-Monitoring Plan'
          ]
        }
      ]
    },
    'solution-focused': {
      name: 'Lösungsorientiertes Coaching',
      icon: '💡',
      color: 'green',
      phases: [
        {
          name: 'EINSTIEG',
          duration: '10-15 Min',
          icon: '🎯',
          questions: [
            '"Was ist Ihre kühnste Hoffnung für unser Gespräch?" (De Shazer)',
            '"Woran würden Sie merken, dass sich das Gespräch gelohnt hat?"',
            '"Auf einer Skala von 1-10: Wo stehen Sie heute?"'
          ],
          tools: [
            '📊 Hoffnungs-Skala (1-10)',
            '🎯 Gesprächsziel-Definition',
            '⭐ Erfolgs-Indikatoren Liste'
          ]
        },
        {
          name: 'EXPLORATION',
          duration: '25-35 Min',
          icon: '🔍',
          questions: [
            '"Die Wunderfrage: Stellen Sie sich vor, über Nacht geschieht ein Wunder..." (De Shazer)',
            '"Wann war das Problem schon mal weniger stark?"',
            '"Was machen Sie bereits richtig, auch wenn es klein ist?"'
          ],
          tools: [
            '✨ Wunderfrage-Arbeitsblatt',
            '🔍 Ausnahme-Detektor',
            '💪 Ressourcen-Inventar'
          ]
        },
        {
          name: 'BEARBEITUNG',
          duration: '15-25 Min',
          icon: '⚡',
          questions: [
            '"Was wäre der kleinste Schritt in Richtung Lösung?"',
            '"Wenn Sie von 3 auf 4 kommen wollen, was würden Sie tun?"',
            '"Welche Ihrer bisherigen Lösungen können Sie ausbauen?"'
          ],
          tools: [
            '👣 Mini-Schritte Generator',
            '📊 Skalierungs-Leiter',
            '🔄 Lösungs-Verstärker'
          ]
        },
        {
          name: 'INTEGRATION',
          duration: '10-15 Min',
          icon: '🔧',
          questions: [
            '"Wie werden Sie sich an diese Lösung erinnern?"',
            '"Was wird Ihnen helfen, am Ball zu bleiben?"',
            '"Welche Unterstützung brauchen Sie?"'
          ],
          tools: [
            '📝 Lösungs-Anker setzen',
            '🎯 Unterstützungs-Netzwerk',
            '📊 Fortschritts-Indikatoren'
          ]
        },
        {
          name: 'ABSCHLUSS',
          duration: '5-10 Min',
          icon: '✅',
          questions: [
            '"Auf der Skala von 1-10: Wo stehen Sie jetzt?"',
            '"Was war heute am wertvollsten für Sie?"',
            '"Was werden Sie als erstes ausprobieren?"'
          ],
          tools: [
            '📊 Fortschritts-Messung',
            '🎯 Next-Action Planung',
            '⭐ Erfolgs-Anker'
          ]
        }
      ]
    }
  };

  // Mock clients data
  useEffect(() => {
    const mockClients: Client[] = [
      { id: '1', firstName: 'Max', lastName: 'Mustermann', email: 'max@example.com' },
      { id: '2', firstName: 'Anna', lastName: 'Schmidt', email: 'anna@example.com' },
      { id: '3', firstName: 'Thomas', lastName: 'Weber', email: 'thomas@example.com' },
      { id: '4', firstName: 'Lisa', lastName: 'Müller', email: 'lisa@example.com' },
      { id: '5', firstName: 'Michael', lastName: 'Fischer', email: 'michael@example.com' }
    ];
    setClients(mockClients);
  }, []);

  // Set initial values from props
  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate.toISOString().split('T')[0]
      }));
    }
    if (selectedTime) {
      setFormData(prev => ({
        ...prev,
        startTime: selectedTime
      }));
    }
  }, [selectedDate, selectedTime]);

  // Generate available time slots
  useEffect(() => {
    if (formData.date) {
      setIsCheckingAvailability(true);
      setTimeout(() => {
        const slots = [];
        for (let hour = 8; hour <= 18; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const isUnavailable = (hour === 12 && minute === 0) || (hour === 14 && minute === 30);
            if (!isUnavailable) {
              slots.push(timeString);
            }
          }
        }
        setAvailableSlots(slots);
        setIsCheckingAvailability(false);
      }, 500);
    }
  }, [formData.date]);

  // Auto-update duration and title when method is selected
  useEffect(() => {
    if (formData.coachingMethod) {
      const method = coachingMethods.find(m => m.id === formData.coachingMethod);
      if (method) {
        setFormData(prev => ({
          ...prev,
          duration: method.duration,
          title: prev.title || method.name
        }));
      }
    }
  }, [formData.coachingMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientId || !formData.date || !formData.startTime || !formData.title) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    const startTime = new Date(`${formData.date}T${formData.startTime}`);
    const endTime = new Date(startTime.getTime() + formData.duration * 60000);
    const selectedMethod = coachingMethods.find(m => m.id === formData.coachingMethod);

    const sessionData = {
      id: `s${Date.now()}`,
      clientId: formData.clientId,
      date: formData.date,
      startTime: formData.startTime,
      endTime: endTime.toTimeString().slice(0, 5),
      duration: formData.duration,
      title: formData.title,
      type: formData.type,
      location: formData.location,
      notes: formData.notes,
      status: 'scheduled',
      reminderEnabled: formData.reminderEnabled,
      reminderTime: formData.reminderTime,
      coachingMethod: selectedMethod ? {
        id: selectedMethod.id,
        name: selectedMethod.name,
        category: selectedMethod.category,
        description: selectedMethod.description
      } : null,
      createdAt: new Date().toISOString()
    };

    onSubmit(sessionData);
    onClose();
    
    // Reset form
    setFormData({
      clientId: '',
      date: '',
      startTime: '',
      duration: 60,
      title: '',
      type: 'coaching',
      location: 'office',
      notes: '',
      reminderEnabled: true,
      reminderTime: 24,
      coachingMethod: ''
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : '';
  };

  const getSelectedMethod = () => {
    return coachingMethods.find(m => m.id === formData.coachingMethod);
  };

  const getSelectedGuide = () => {
    return coachingGuides[formData.coachingMethod as keyof typeof coachingGuides];
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      teal: 'bg-teal-50 border-teal-200 text-teal-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800'
    };
    return colorMap[color] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const handleShowGuide = () => {
    setShowGuide(true);
    setActivePhase(0);
  };

  const isSlotAvailable = (time: string) => {
    return availableSlots.includes(time);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {showGuide ? '📚 Session-Leitfaden' : 'Neue Coaching Session planen'}
              </h2>
              <p className="text-blue-100">
                {showGuide ? 'Professioneller Coaching-Leitfaden' : 'Termin erstellen und Coaching-Methode wählen'}
              </p>
            </div>
            <button
              onClick={() => {
                if (showGuide) {
                  setShowGuide(false);
                } else {
                  onClose();
                }
              }}
              className="text-white hover:text-blue-200 text-2xl transition-colors"
            >
              {showGuide ? '← Zurück' : '×'}
            </button>
          </div>
        </div>

        {showGuide ? (
          // COACHING GUIDE VIEW
          <div className="p-6">
            {(() => {
              const guide = getSelectedGuide();
              const currentPhase = guide?.phases[activePhase];
              
              if (!guide) return <div>Leitfaden nicht gefunden</div>;

              return (
                <>
                  {/* Guide Header */}
                  <div className={`p-6 rounded-xl border-2 mb-6 ${getColorClasses(guide.color)}`}>
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{guide.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold">{guide.name}</h3>
                        <p className="opacity-80">Professioneller Session-Leitfaden</p>
                      </div>
                    </div>
                  </div>

                  {/* Phase Navigation */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {guide.phases.map((phase, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePhase(index)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          activePhase === index
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {phase.icon} {phase.name}
                      </button>
                    ))}
                  </div>

                  {/* Current Phase Content */}
                  {currentPhase && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="mb-6">
                        <h4 className="text-2xl font-bold flex items-center gap-3 mb-2">
                          {currentPhase.icon} {currentPhase.name}
                        </h4>
                        <p className="text-gray-600">
                          ⏱️ {currentPhase.duration}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Questions */}
                        <div>
                          <h5 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            💬 Leitfragen
                          </h5>
                          <div className="space-y-3">
                            {currentPhase.questions.map((question, index) => (
                              <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-gray-800 font-medium">{question}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tools */}
                        <div>
                          <h5 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            🛠️ Tools & Interventionen
                          </h5>
                          <div className="space-y-3">
                            {currentPhase.tools.map((tool, index) => (
                              <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p className="text-gray-800 font-medium">{tool}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between items-center mt-8 pt-6 border-t">
                        <button
                          onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
                          disabled={activePhase === 0}
                          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                            activePhase === 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          ← Vorherige Phase
                        </button>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            Phase {activePhase + 1} von {guide.phases.length}
                          </p>
                        </div>

                        <button
                          onClick={() => setActivePhase(Math.min(guide.phases.length - 1, activePhase + 1))}
                          disabled={activePhase === guide.phases.length - 1}
                          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                            activePhase === guide.phases.length - 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          Nächste Phase →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        ) : (
          // SESSION PLANNING FORM
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Client Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Klient auswählen *
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => handleInputChange('clientId', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Klient wählen...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName} ({client.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Session Type & Coaching Method */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Art
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      handleInputChange('type', e.target.value);
                      setShowMethodSelector(e.target.value === 'coaching');
                      if (e.target.value !== 'coaching') {
                        handleInputChange('coachingMethod', '');
                      }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="coaching">Coaching Session</option>
                    <option value="consultation">Erstberatung</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="workshop">Workshop</option>
                    <option value="assessment">Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ort
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="office">Büro</option>
                    <option value="online">Online/Video Call</option>
                    <option value="client-location">Beim Klienten</option>
                    <option value="neutral">Neutraler Ort</option>
                  </select>
                </div>
              </div>

              {/* Coaching Method Selector */}
              {(formData.type === 'coaching' || showMethodSelector) && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Coaching-Methode wählen</h3>
                      <p className="text-sm text-gray-600">Wählen Sie einen professionellen Coaching-Ansatz</p>
                    </div>
                    <div className="text-2xl">🎯</div>
                  </div>

                  {formData.coachingMethod ? (
                    // Selected Method Display with Guide Button
                    <div className="space-y-3">
                      <div className={`p-4 rounded-lg border-2 ${getColorClasses(getSelectedMethod()?.color || 'blue')}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">{getSelectedMethod()?.icon}</div>
                            <div>
                              <h4 className="font-semibold">{getSelectedMethod()?.name}</h4>
                              <p className="text-sm opacity-90 mt-1">{getSelectedMethod()?.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs">
                                <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                                  📅 {getSelectedMethod()?.duration} Min.
                                </span>
                                <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                                  📂 {getSelectedMethod()?.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {/* LEITFADEN BUTTON */}
                            {getSelectedGuide() && (
                              <button
                                type="button"
                                onClick={handleShowGuide}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                              >
                                📚 Leitfaden anzeigen
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleInputChange('coachingMethod', '')}
                              className="text-sm bg-white bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded transition-colors"
                            >
                              Ändern
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Method Selection Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                      {coachingMethods.map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => handleInputChange('coachingMethod', method.id)}
                          className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getColorClasses(method.color)} hover:transform hover:scale-105`}
                        >
                          <div className="flex items-start space-x-3 text-left">
                            <div className="text-xl">{method.icon}</div>
                            <div>
                              <h4 className="font-medium text-sm">{method.name}</h4>
                              <p className="text-xs opacity-80 mt-1">{method.description}</p>
                              <div className="flex items-center space-x-2 mt-2 text-xs">
                                <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                                  {method.duration}min
                                </span>
                                <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                                  {method.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Datum *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {formData.date && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(formData.date)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dauer (Minuten) *
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={30}>30 Minuten</option>
                  <option value={45}>45 Minuten</option>
                  <option value={60}>60 Minuten</option>
                  <option value={75}>75 Minuten</option>
                  <option value={90}>90 Minuten</option>
                  <option value={120}>120 Minuten</option>
                </select>
                {getSelectedMethod() && (
                  <p className="text-sm text-blue-600 mt-1">
                    💡 Empfohlene Dauer für {getSelectedMethod()?.name}: {getSelectedMethod()?.duration} Min.
                  </p>
                )}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uhrzeit *
              </label>
              {isCheckingAvailability ? (
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Verfügbarkeit wird geprüft...</span>
                </div>
              ) : formData.date ? (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                  {availableSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleInputChange('startTime', time)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        formData.startTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : isSlotAvailable(time)
                          ? 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                      disabled={!isSlotAvailable(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 p-4 bg-gray-50 rounded-lg">
                  Bitte wählen Sie zuerst ein Datum aus
                </p>
              )}
            </div>

            {/* Session Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Titel *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={getSelectedMethod() ? getSelectedMethod()?.name : "z.B. Systemisches Coaching"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notizen/Vorbereitung
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Besondere Notizen oder Vorbereitungen für diese Session..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Reminder Settings */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.reminderEnabled}
                    onChange={(e) => handleInputChange('reminderEnabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Erinnerung aktivieren
                  </span>
                </label>
              </div>
              
              {formData.reminderEnabled && (
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Erinnerung senden
                  </label>
                  <select
                    value={formData.reminderTime}
                    onChange={(e) => handleInputChange('reminderTime', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value={15}>15 Minuten vorher</option>
                    <option value={60}>1 Stunde vorher</option>
                    <option value={1440}>1 Tag vorher</option>
                    <option value={2880}>2 Tage vorher</option>
                  </select>
                </div>
              )}
            </div>

            {/* Enhanced Summary */}
            {formData.clientId && formData.date && formData.startTime && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Session Zusammenfassung</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Klient:</strong> {getClientName(formData.clientId)}</p>
                  <p><strong>Datum:</strong> {formatDate(formData.date)}</p>
                  <p><strong>Zeit:</strong> {formData.startTime} Uhr ({formData.duration} Min.)</p>
                  <p><strong>Titel:</strong> {formData.title || 'Noch nicht eingegeben'}</p>
                  {getSelectedMethod() && (
                    <p><strong>Methode:</strong> {getSelectedMethod()?.icon} {getSelectedMethod()?.name}</p>
                  )}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Session erstellen
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewSessionModal;