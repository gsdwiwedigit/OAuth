// pages/terms.js (or components/Terms.js)

export default function Privacy() {
  return (
    <div className="  flex flex-col items-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">
          At Demo Mail, your privacy is important to us. This Privacy Policy explains how
          we collect, use, and protect your personal information when you use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect information you provide directly, such as your name and email address,
          and information collected automatically, such as usage data, cookies, and browser type.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to improve our website, communicate with you, and provide
          the services you request. We do not sell your personal information to third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="mb-4">
          We implement reasonable security measures to protect your personal information.
          However, no data transmission over the internet can be guaranteed to be 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Cookies</h2>
        <p className="mb-4">
          We use cookies to enhance your experience on our website. You can choose to disable
          cookies in your browser settings, but some features may not function properly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party websites. We are not responsible for
          the privacy practices of these websites. Please review their privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Your continued use of the website
          constitutes acceptance of the updated policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at
          <a href="mailto:gsdwiwedi@gmail.com" className="text-blue-600 underline"> gsdwiwedi@gmail.com</a>.
        </p>

        <p className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Demo Mail. All rights reserved.
        </p>
      </div>
    </div>
  );
}
