import React, { useState } from 'react';
import { X, User, MapPin, Briefcase, Target, Shield, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: any) => void;
}

interface ClientFormData {
  // Grunddaten
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  
  // Adresse
  street: string;
  zipCode: string;
  city: string;
  country: string;
  
  // Berufliches
  company: string;
  position: string;
  industry: string;
  careerLevel: string;
  howDidYouHear: string;
  referredBy: string;
  
  // Coaching
  coachingGoals: string[];
  challenges: string;
  sessionLength: string;
  sessionFrequency: string;
  preferredTime: string;
  sessionType: string;
  notes: string;
  
  // Datenschutz
  consentBasicData: boolean;
  consentSessionNotes: boolean;
  consentRecordings: boolean;
  consentMarketing: boolean;
  consentDataSharing: boolean;
  consentExtendedStorage: boolean;
}

const initialFormData: ClientFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: '',
  street: '',
  zipCode: '',
  city: '',
  country: 'Deutschland',
  company: '',
  position: '',
  industry: '',
  careerLevel: '',
  howDidYouHear: '',
  referredBy: '',
  coachingGoals: [],
  challenges: '',
  sessionLength: '60',
  sessionFrequency: 'weekly',
  preferredTime: 'morning',
  sessionType: 'online',
  notes: '',
  consentBasicData: false,
  consentSessionNotes: false,
  consentRecordings: false,
  consentMarketing: false,
  consentDataSharing: false,
  consentExtendedStorage: false
};

const steps = [
  { id: 1, title: 'Grunddaten', icon: User, description: 'Persönliche Informationen' },
  { id: 2, title: 'Adresse', icon: MapPin, description: 'Kontaktdaten & Adresse' },
  { id: 3, title: 'Berufliches', icon: Briefcase, description: 'Beruf & Hintergrund' },
  { id: 4, title: 'Coaching', icon: Target, description: 'Ziele & Präferenzen' },
  { id: 5, title: 'Datenschutz', icon: Shield, description: 'DSGVO-Einverständnisse' }
];

const coachingGoalOptions = [
  'Karriereentwicklung & Aufstieg',
  'Führungskompetenzen entwickeln',
  'Work-Life-Balance verbessern',
  'Stressmanagement & Resilienz',
  'Kommunikationsfähigkeiten',
  'Selbstvertrauen stärken',
  'Zielsetzung & Prioritäten',
  'Teamführung & Delegation',
  'Konfliktlösung & Mediation',
  'Persönliche Transformation'
];

const NewClientModal: React.FC<NewClientModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const updateFormData = (field: keyof ClientFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleGoal = (goal: string) => {
    const currentGoals = formData.coachingGoals;
    if (currentGoals.includes(goal)) {
      updateFormData('coachingGoals', currentGoals.filter(g => g !== goal));
    } else {
      updateFormData('coachingGoals', [...currentGoals, goal]);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'Vorname ist erforderlich';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nachname ist erforderlich';
        if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Ungültige E-Mail-Adresse';
        break;
      case 5:
        if (!formData.consentBasicData) newErrors.consentBasicData = 'Grundlegende Datenverarbeitung ist erforderlich';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData);
      setFormData(initialFormData);
      setCurrentStep(1);
      setErrors({});
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vorname *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Max"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nachname *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mustermann"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="max.mustermann@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefonnummer
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+49 123 456789"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Geburtsdatum
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateFormData('birthDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Geschlecht
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="male">Männlich</option>
                  <option value="female">Weiblich</option>
                  <option value="diverse">Divers</option>
                  <option value="prefer-not-to-say">Keine Angabe</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Straße & Hausnummer
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => updateFormData('street', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Musterstraße 123"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PLZ
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12345"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stadt
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Berlin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land
              </label>
              <select
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Deutschland">Deutschland</option>
                <option value="Österreich">Österreich</option>
                <option value="Schweiz">Schweiz</option>
                <option value="Andere">Andere</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unternehmen
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Muster GmbH"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position/Rolle
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => updateFormData('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Senior Manager, Entwickler, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branche
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="IT">IT & Software</option>
                  <option value="Finance">Finanzwesen</option>
                  <option value="Healthcare">Gesundheitswesen</option>
                  <option value="Manufacturing">Produktion</option>
                  <option value="Consulting">Beratung</option>
                  <option value="Education">Bildung</option>
                  <option value="Retail">Einzelhandel</option>
                  <option value="Other">Andere</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Karrierestufe
                </label>
                <select
                  value={formData.careerLevel}
                  onChange={(e) => updateFormData('careerLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="Entry">Berufseinsteiger</option>
                  <option value="Mid">Fachkraft</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Teamleitung</option>
                  <option value="Manager">Management</option>
                  <option value="Director">Direktor</option>
                  <option value="Executive">Geschäftsführung</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wie haben Sie von uns erfahren?
              </label>
              <select
                value={formData.howDidYouHear}
                onChange={(e) => updateFormData('howDidYouHear', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Bitte wählen</option>
                <option value="Recommendation">Empfehlung</option>
                <option value="Website">Website</option>
                <option value="Social Media">Social Media</option>
                <option value="Event">Veranstaltung</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Google">Google Suche</option>
                <option value="Other">Andere</option>
              </select>
            </div>

            {formData.howDidYouHear === 'Recommendation' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empfohlen von
                </label>
                <input
                  type="text"
                  value={formData.referredBy}
                  onChange={(e) => updateFormData('referredBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Name der Person oder Unternehmen"
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Coaching-Ziele (mehrere auswählbar)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {coachingGoalOptions.map((goal) => (
                  <div key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      id={goal}
                      checked={formData.coachingGoals.includes(goal)}
                      onChange={() => toggleGoal(goal)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={goal} className="text-sm text-gray-700 cursor-pointer">
                      {goal}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hauptherausforderungen
              </label>
              <textarea
                value={formData.challenges}
                onChange={(e) => updateFormData('challenges', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Beschreiben Sie Ihre größten beruflichen Herausforderungen..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session-Länge
                </label>
                <select
                  value={formData.sessionLength}
                  onChange={(e) => updateFormData('sessionLength', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="30">30 Minuten</option>
                  <option value="45">45 Minuten</option>
                  <option value="60">60 Minuten</option>
                  <option value="90">90 Minuten</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Häufigkeit
                </label>
                <select
                  value={formData.sessionFrequency}
                  onChange={(e) => updateFormData('sessionFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="weekly">Wöchentlich</option>
                  <option value="biweekly">Alle 2 Wochen</option>
                  <option value="monthly">Monatlich</option>
                  <option value="as-needed">Nach Bedarf</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bevorzugte Zeit
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => updateFormData('preferredTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="morning">Morgens (8-12 Uhr)</option>
                  <option value="afternoon">Nachmittags (12-17 Uhr)</option>
                  <option value="evening">Abends (17-20 Uhr)</option>
                  <option value="flexible">Flexibel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session-Art
                </label>
                <select
                  value={formData.sessionType}
                  onChange={(e) => updateFormData('sessionType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="online">Online (Video)</option>
                  <option value="phone">Telefon</option>
                  <option value="in-person">Vor Ort</option>
                  <option value="mixed">Gemischt</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zusätzliche Anmerkungen
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Weitere wichtige Informationen..."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-blue-900 mb-2">Datenschutz-Einverständnisse</h4>
              <p className="text-sm text-blue-700">
                Gemäß DSGVO benötigen wir Ihr Einverständnis für die Verarbeitung Ihrer Daten. 
                Die mit * markierten Einverständnisse sind für die Coaching-Dienstleistung erforderlich.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consentBasicData"
                    checked={formData.consentBasicData}
                    onChange={(e) => updateFormData('consentBasicData', e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="consentBasicData" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Grundlegende Datenverarbeitung für Coaching-Dienstleistungen *
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Verarbeitung von Kontaktdaten, Terminen und grundlegenden Coaching-Informationen zur Durchführung der vereinbarten Dienstleistungen.
                    </p>
                  </div>
                </div>
                {errors.consentBasicData && <p className="text-red-500 text-xs mt-1 ml-7">{errors.consentBasicData}</p>}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consentSessionNotes"
                    checked={formData.consentSessionNotes}
                    onChange={(e) => updateFormData('consentSessionNotes', e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="consentSessionNotes" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Session-Notizen und Reflexionen
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Speicherung detaillierter Session-Notizen, Ziele und Fortschritte für eine bessere Coaching-Kontinuität.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consentRecordings"
                    checked={formData.consentRecordings}
                    onChange={(e) => updateFormData('consentRecordings', e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="consentRecordings" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Session-Aufzeichnungen (optional)
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Audio-/Video-Aufzeichnungen von Sessions für Ihre persönliche Nachbereitung und Reflexion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consentMarketing"
                    checked={formData.consentMarketing}
                    onChange={(e) => updateFormData('consentMarketing', e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="consentMarketing" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Newsletter und Marketing-Kommunikation
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Zusendung von Coaching-Tipps, Newsletter und Informationen über neue Angebote.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consentDataSharing"
                    checked={formData.consentDataSharing}
                    onChange={(e) => updateFormData('consentDataSharing', e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="consentDataSharing" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Anonymisierte Datenweitergabe für Forschung
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Verwendung anonymisierter Daten für Coaching-Forschung und Methodenverbesserung.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consentExtendedStorage"
                    checked={formData.consentExtendedStorage}
                    onChange={(e) => updateFormData('consentExtendedStorage', e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="consentExtendedStorage" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Erweiterte Datenspeicherung (7 Jahre)
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Aufbewahrung der Coaching-Daten über die gesetzliche Frist hinaus für Langzeit-Coaching-Kontinuität.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <p className="text-xs text-gray-600">
                Sie können diese Einverständnisse jederzeit widerrufen. Weitere Informationen finden Sie in unserer 
                <button className="text-blue-600 hover:underline ml-1">Datenschutzerklärung</button>.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  Neuer Klient hinzufügen
                </h3>
                <p className="text-blue-100 text-sm">
                  Schritt {currentStep} von {steps.length}: {steps[currentStep - 1]?.title}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="max-h-96 overflow-y-auto">
              {renderStepContent()}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Zurück
            </button>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              
              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Weiter
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Klient erstellen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClientModal;