'use client';

import { useState } from 'react';

export default function Home() {
  const [countryCode, setCountryCode] = useState('+62');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const cleanNumber =
    countryCode.replace(/\D/g, '') + phoneNumber.replace(/\D/g, '');
  const generatedLink =
    cleanNumber.length > 0
      ? `https://wa.me/${cleanNumber}${
          message ? `?text=${encodeURIComponent(message)}` : ''
        }`
      : '';

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openWhatsApp() {
    if (generatedLink) {
      window.open(generatedLink);
    }
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold">Chat via WhatsApp</h1>
          <p className="text-base-content/70 text-sm">
            Build a link to open a chat with a specific phone number and
            pre-filled message.
          </p>
        </div>

        <div className="mt-8 w-full max-w-xl">
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body space-y-6">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Phone number</span>
                </div>
                <div className="join w-full mt-1">
                  <input
                    type="tel"
                    placeholder="+62"
                    className="input input-bordered join-item w-32"
                    value={countryCode}
                    pattern="^\+?[0-9]*$"
                    maxLength={5}
                    onChange={(event) => setCountryCode(event.target.value)}
                  />
                  <input
                    type="text"
                    className="input input-bordered join-item flex-1"
                    value={phoneNumber}
                    pattern="^[0-9]*$"
                    maxLength={15}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </div>
                <div className="label mt-1">
                  <span className="label-text-alt text-xs text-base-content/60">
                    Include country code. Symbols and spaces are optional.
                  </span>
                </div>
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-medium">
                    Message (optional)
                  </span>
                </div>
                <textarea
                  className="textarea mt-1 textarea-bordered min-h-28 block w-full"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </label>

              <div className="space-y-2">
                <span className="text-sm font-medium">Generated link</span>
                <div className="join w-full mt-1">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink || 'https://wa.me/'}
                    className="input input-bordered join-item flex-1 font-mono text-sm"
                  />
                  <button
                    className="btn join-item ml-1"
                    onClick={copyToClipboard}
                    disabled={!generatedLink}
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <button className="btn btn-success btn-lg" onClick={openWhatsApp}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
