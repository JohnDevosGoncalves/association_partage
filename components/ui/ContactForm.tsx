"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
const FORMSPREE_URL = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : null;

type Status = "idle" | "submitting" | "success" | "error";

const PURPOSES = [
  { value: "mecenat", label: "Devenir mécène" },
  { value: "benevolat", label: "Bénévolat / soutien actif" },
  { value: "visite", label: "Visite de la Maison Bledi" },
  { value: "cooperative", label: "Produits de la coopérative" },
  { value: "presse", label: "Demande presse / partenariat" },
  { value: "autre", label: "Autre demande" },
];

const TIERS = [
  { value: "", label: "Niveau de mécénat (optionnel)" },
  { value: "bronze", label: "Bronze · 1 000 € – 4 999 €" },
  { value: "argent", label: "Argent · 5 000 € – 14 999 €" },
  { value: "or", label: "Or · 15 000 € – 49 999 €" },
  { value: "platinium", label: "Platinium · 50 000 € et +" },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("mecenat");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot : si rempli, c'est probablement un bot — on simule un succès.
    if (formData.get("_gotcha")) {
      setStatus("success");
      return;
    }

    if (!FORMSPREE_URL) {
      setStatus("error");
      setErrorMessage(
        "Formspree n'est pas configuré. Renseignez NEXT_PUBLIC_FORMSPREE_FORM_ID dans .env.local pour activer l'envoi.",
      );
      return;
    }

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setPurpose("mecenat");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(
          data?.errors?.[0]?.message ??
            "L'envoi a échoué. Réessayez ou écrivez-nous directement à contact@association-partage.fr.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Connexion impossible. Vérifiez votre réseau et réessayez.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5"
      noValidate
      aria-busy={status === "submitting"}
    >
      {/* Honeypot — invisible aux humains, piégeant les bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto w-px h-px overflow-hidden"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nom complet" htmlFor="contact-name" required>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Marie Dubois"
            className={inputClasses}
          />
        </Field>

        <Field label="Email" htmlFor="contact-email" required>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="marie.dubois@exemple.fr"
            className={inputClasses}
          />
        </Field>

        <Field label="Téléphone" htmlFor="contact-phone">
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+33 6 12 34 56 78"
            className={inputClasses}
          />
        </Field>

        <Field label="Type de demande" htmlFor="contact-purpose" required>
          <select
            id="contact-purpose"
            name="purpose"
            required
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className={inputClasses}
          >
            {PURPOSES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Niveau de mécénat — révélé seulement si type = mécène */}
      <AnimatePresence>
        {purpose === "mecenat" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Field label="Niveau envisagé" htmlFor="contact-tier">
              <select
                id="contact-tier"
                name="tier"
                defaultValue=""
                className={inputClasses}
              >
                {TIERS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <Field label="Votre message" htmlFor="contact-message" required>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Présentez-vous brièvement et expliquez votre projet ou votre question…"
          className={clsx(inputClasses, "resize-y min-h-[140px]")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-bridge-ink/75 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 w-4 h-4 accent-atlas-clay flex-shrink-0"
        />
        <span>
          J'accepte que mes informations soient utilisées par Association
          Partage pour traiter ma demande. Conformément au RGPD, je peux à tout
          moment demander leur suppression à{" "}
          <a
            href="mailto:contact@association-partage.fr"
            className="text-atlas-clay underline hover:text-atlas-saffron"
          >
            contact@association-partage.fr
          </a>
          .
        </span>
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={clsx(
            "px-8 py-3.5 rounded-full font-sans font-medium tracking-wide text-sm md:text-base transition-all duration-500 shadow-lg",
            status === "submitting"
              ? "bg-bridge-ink/40 text-bridge-cream cursor-wait"
              : "bg-atlas-saffron hover:bg-atlas-cream text-bridge-ink hover:shadow-xl",
          )}
        >
          {status === "submitting" ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>

        {!FORMSPREE_URL && (
          <p className="text-xs italic text-atlas-clay/80">
            ⓘ Mode démo — configurez Formspree pour activer l'envoi réel.
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-atlas-cream/60 border border-atlas-clay/30 p-5 text-bridge-ink"
            role="status"
          >
            <p className="font-serif text-xl text-atlas-clay mb-1">
              Merci pour votre message
            </p>
            <p className="text-sm text-bridge-ink/80">
              Nous revenons vers vous sous 48 heures. Pour les demandes
              urgentes, écrivez à{" "}
              <a
                href="mailto:contact@association-partage.fr"
                className="text-atlas-clay underline"
              >
                contact@association-partage.fr
              </a>
              .
            </p>
          </motion.div>
        )}

        {status === "error" && errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-atlas-clay/10 border border-atlas-clay/40 p-5 text-bridge-ink"
            role="alert"
          >
            <p className="font-serif text-lg text-atlas-clay mb-1">
              L'envoi n'a pas abouti
            </p>
            <p className="text-sm text-bridge-ink/80">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-loire-stone/70 bg-bridge-cream text-bridge-ink placeholder:text-bridge-ink/40 font-sans text-sm transition-colors focus:outline-none focus:border-atlas-clay focus:ring-2 focus:ring-atlas-clay/20";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs uppercase tracking-[0.2em] text-bridge-ink/60 font-sans font-medium mb-2"
      >
        {label}
        {required && <span className="text-atlas-clay ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
