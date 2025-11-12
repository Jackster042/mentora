import React from 'react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using Mentora, you accept and agree to be bound by the terms and provisions
            of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
          <p>
            You agree to use our service only for lawful purposes and in a way that does not infringe
            the rights of others or restrict their use and enjoyment of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for
            all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p>
            All content, features, and functionality of Mentora are owned by us and are protected by
            international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            Mentora shall not be liable for any indirect, incidental, special, consequential, or punitive
            damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the service
            after changes constitutes acceptance of the modified terms.
          </p>
        </section>
      </div>
    </div>
  );
}
