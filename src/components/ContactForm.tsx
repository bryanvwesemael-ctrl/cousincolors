import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';

export default function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSubmit = !!firstName.trim() && !!lastName.trim() && !!phone.trim() && !!email.trim() && !!message.trim();

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (supabase) {
        const { error } = await supabase.from('leads').insert({
          type: 'contact',
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          project_description: message.trim(),
        });
        if (error) throw error;
      }

      trackEvent('contact_form_submitted');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Er ging iets mis. Probeer het later opnieuw of bel ons.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-ink-100">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100">
          <Check size={28} className="text-sage-700" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-ink-950">Bedankt voor je bericht!</h3>
        <p className="mt-2 text-sm text-ink-600">We nemen zo snel mogelijk contact met je op.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-firstName" className="mb-1.5 block text-sm font-medium text-ink-700">
            Voornaam *
          </label>
          <input
            id="contact-firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="contact-lastName" className="mb-1.5 block text-sm font-medium text-ink-700">
            Naam *
          </label>
          <input
            id="contact-lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-ink-700">
            Telefoon *
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="04xx xx xx xx"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink-700">
            E-mail *
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="naam@voorbeeld.be"
            className="input-field"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink-700">
          Bericht *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Vertel ons over je project of stel je vraag..."
          className="input-field resize-none"
        />
      </div>
      <p className="mt-3 text-xs text-ink-400">
        We gebruiken je gegevens enkel om contact op te nemen. We delen je gegevens nooit met derden.
      </p>
      {submitError && (
        <p className="mt-4 rounded-lg bg-clay-50 px-4 py-3 text-sm text-clay-700">
          {submitError}
        </p>
      )}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || submitting}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Versturen...
          </>
        ) : (
          'Verstuur bericht'
        )}
      </button>
    </div>
  );
}
