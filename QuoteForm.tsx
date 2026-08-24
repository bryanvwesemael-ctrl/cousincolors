import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Upload, X, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

import { trackEvent } from '@/lib/analytics';

const SERVICE_OPTIONS = [
  'Binnenschilderwerken',
  'Buitenschilderwerken',
  'Behangwerken',
  'Schuren & lakken',
  'Meerdere diensten',
  'Ik weet het nog niet',
];

const PROPERTY_OPTIONS = ['Huis', 'Appartement', 'Andere'];
const START_OPTIONS = ['Zo snel mogelijk', 'Binnen 1 maand', 'Binnen 3 maanden', 'Later', 'Nog geen idee'];

const TOTAL_STEPS = 7;

const stepLabels = [
  'Dienst',
  'Type pand',
  'Locatie',
  'Timing',
  'Project',
  'Foto\'s',
  'Contact',
];

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [serviceType, setServiceType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [startTime, setStartTime] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!serviceType;
      case 1: return !!propertyType;
      case 2: return !!municipality.trim() || !!postalCode.trim();
      case 3: return !!startTime;
      case 4: return true;
      case 5: return true;
      case 6: return !!firstName.trim() && !!lastName.trim() && !!phone.trim() && !!email.trim();
      default: return false;
    }
  };

  const next = () => {
    if (step === 0) trackEvent('quote_started');
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handlePhotoAdd = (files: FileList | null) => {
    if (!files) return;
    const newPhotos = Array.from(files).slice(0, 10 - photos.length);
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (supabase) {
        const { error } = await supabase.from('leads').insert({
          type: 'quote',
          service_type: serviceType,
          property_type: propertyType,
          municipality: municipality.trim() || null,
          postal_code: postalCode.trim() || null,
          start_time: startTime,
          project_description: projectDescription.trim() || null,
          photo_names: photos.map((f) => f.name),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
        });
        if (error) throw error;
      }

      trackEvent('quote_completed');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-ink-100 sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
          <Check size={32} className="text-sage-700" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-ink-950">Bedankt!</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">
          We hebben je aanvraag goed ontvangen. Cousin Colors neemt zo snel mogelijk
          contact met je op.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100 sm:p-8 lg:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-ink-700">
            Stap {step + 1} van {TOTAL_STEPS}
          </span>
          <span className="text-ink-400">{stepLabels[step]}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-100">
          <div
            className="h-full rounded-full bg-clay-600 transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[220px]">
        {step === 0 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-ink-950">Wat wil je laten uitvoeren?</h3>
            <p className="mt-1 text-sm text-ink-500">Kies de dienst die je nodig hebt.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setServiceType(opt)}
                  className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
                    serviceType === opt
                      ? 'border-clay-600 bg-clay-50 text-clay-700 ring-1 ring-clay-600'
                      : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-ink-950">Over welk type pand gaat het?</h3>
            <p className="mt-1 text-sm text-ink-500">Zo kunnen we de aanpak beter afstemmen.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {PROPERTY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPropertyType(opt)}
                  className={`rounded-xl border px-4 py-3.5 text-center text-sm font-medium transition-all ${
                    propertyType === opt
                      ? 'border-clay-600 bg-clay-50 text-clay-700 ring-1 ring-clay-600'
                      : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-ink-950">Waar bevindt het project zich?</h3>
            <p className="mt-1 text-sm text-ink-500">Gemeente en postcode helpen ons om de reistijd in te schatten.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="municipality" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Gemeente
                </label>
                <input
                  id="municipality"
                  type="text"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  placeholder="bv. Bornem"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Postcode
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="bv. 2880"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-ink-950">Wanneer wil je starten?</h3>
            <p className="mt-1 text-sm text-ink-500">We plannen samen het beste moment in.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {START_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setStartTime(opt)}
                  className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
                    startTime === opt
                      ? 'border-clay-600 bg-clay-50 text-clay-700 ring-1 ring-clay-600'
                      : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-ink-950">Vertel iets over je project.</h3>
            <p className="mt-1 text-sm text-ink-500">Hoe meer we weten, hoe gerichter we kunnen reageren.</p>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={6}
              placeholder="bv. We willen de woonkamer en slaapkamer een nieuwe kleur geven. De muren zijn in goede staat maar hebben een paar scheurtjes..."
              className="input-field mt-5 resize-none"
            />
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-ink-950">Upload foto's</h3>
            <p className="mt-1 text-sm text-ink-500">Voeg foto's van de ruimte of het werk toe (optioneel, max. 10).</p>
            <label
              htmlFor="photo-upload"
              className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-cream-50 px-6 py-10 text-center transition-colors hover:border-clay-400 hover:bg-clay-50"
            >
              <Upload size={28} className="text-ink-400" />
              <span className="mt-3 text-sm font-medium text-ink-700">Klik om foto's te selecteren</span>
              <span className="mt-1 text-xs text-ink-400">JPG, PNG — max 10 foto's</span>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handlePhotoAdd(e.target.files)}
              />
            </label>
            {photos.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-2 rounded-lg bg-cream-100 px-3 py-2 text-xs text-ink-700"
                  >
                    <span className="max-w-[120px] truncate">{photo.name}</span>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="text-ink-400 hover:text-clay-600"
                      aria-label="Foto verwijderen"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 6 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-ink-950">Hoe kunnen we je bereiken?</h3>
            <p className="mt-1 text-sm text-ink-500">We nemen zo snel mogelijk contact met je op.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Voornaam *
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Naam *
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Telefoon *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="04xx xx xx xx"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                  E-mail *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@voorbeeld.be"
                  className="input-field"
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-400">
              We gebruiken je gegevens enkel om contact op te nemen over je aanvraag. We delen je gegevens nooit met derden.
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {submitError && (
        <p className="mt-4 rounded-lg bg-clay-50 px-4 py-3 text-sm text-clay-700">
          {submitError}
        </p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="btn-ghost"
            disabled={submitting}
          >
            <ChevronLeft size={18} />
            Terug
          </button>
        ) : (
          <span />
        )}
        {step < TOTAL_STEPS - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canProceed()}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Volgende
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Versturen...
              </>
            ) : (
              'Vraag mijn vrijblijvende offerte aan'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
