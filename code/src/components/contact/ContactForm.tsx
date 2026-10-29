"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) newErrors.name = "Please enter your full name";
    if (!email.trim() || !email.includes("@"))
      newErrors.email = "Please enter a valid email address";
    if (!message.trim() || message.length < 10)
      newErrors.message = "Message must be at least 10 characters long";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-3xl bg-white border border-tan/80 shadow-md text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-green/15 text-green flex items-center justify-center">
          <CheckCircle className="w-8 h-8" />
        </div>
        <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green/10 text-green">
          Message Received
        </span>
        <h3 className="font-serif text-2xl font-bold text-coffee">
          Thank you, {name}!
        </h3>
        <p className="text-sm text-espresso/70 max-w-md mx-auto leading-relaxed">
          We received your message regarding &ldquo;{subject}&rdquo;. Our campus cafe team will review your inquiry and reply to <span className="font-semibold text-coffee">{email}</span> within 24 hours.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setMessage("");
              setSubject("General Inquiry");
            }}
            className="px-5 py-2.5 rounded-xl border border-tan text-coffee hover:bg-tan text-xs font-semibold transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-3xl bg-white border border-tan/80 shadow-md space-y-5"
    >
      <div className="space-y-1">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-coffee">
          Send Us a Direct Message
        </h3>
        <p className="text-xs sm:text-sm text-espresso/70">
          Have feedback or catering requests? Fill out the form below.
        </p>
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-name" className="text-xs font-bold text-coffee block">
          Full Name *
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="e.g. Fatima Ali"
          className="w-full px-3.5 py-2.5 rounded-xl border border-tan bg-cream text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange"
        />
        {errors.name && <span className="text-[11px] text-red-500">{errors.name}</span>}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-email" className="text-xs font-bold text-coffee block">
          Email Address *
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="e.g. fatima.ali@comsats.edu.pk"
          className="w-full px-3.5 py-2.5 rounded-xl border border-tan bg-cream text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange"
        />
        {errors.email && <span className="text-[11px] text-red-500">{errors.email}</span>}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-subject" className="text-xs font-bold text-coffee block">
          Inquiry Type *
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-tan bg-cream text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange cursor-pointer"
        >
          <option value="General Inquiry">General Campus Inquiry</option>
          <option value="Catering / Bulk Order">Department / Society Catering Request</option>
          <option value="Feedback / Complaint">Meal Quality Feedback & Suggestions</option>
          <option value="Lost & Found">Lost & Found Inquiry</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-message" className="text-xs font-bold text-coffee block">
          Your Message *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder="Please describe your question, feedback, or event date in detail..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-tan bg-cream text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange resize-none"
        />
        {errors.message && (
          <span className="text-[11px] text-red-500">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-orange hover:bg-orange-hover text-cream font-semibold text-sm sm:text-base shadow-lg transition-all active:scale-[0.98] cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>Submit Message</span>
      </button>
    </form>
  );
}
