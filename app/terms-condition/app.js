// pages/terms.js (or components/Terms.js)



export default function Terms() {
  return (
    <div className=" bg-gray-50 flex flex-col items-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <p className="mb-4">
          Welcome to Demo Mail! By accessing or using our website, you agree to comply
          with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of the Website</h2>
        <p className="mb-4">
          You agree to use the website only for lawful purposes and in a way that
          does not infringe the rights of others or restrict their use of the website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Privacy</h2>
        <p className="mb-4">
          We respect your privacy. Please review our Privacy Policy to understand how
          we collect, use, and protect your information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p className="mb-4">
          All content, logos, graphics, and materials on this site are the property
          of Demo Mail or its licensors and are protected by copyright and other laws.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="mb-4">
          Demo Mail is not responsible for any damages or losses resulting from the
          use of this website or any linked sites.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
        <p className="mb-4">
          We may update these terms at any time. Continued use of the website indicates
          your acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contact</h2>
        <p className="mb-4">
          If you have any questions about these terms, please contact us at
          <a href="mailto:gsdwiwedi@gmail.com" className="text-blue-600 underline"> gsdwiwedi@gmail.com</a>.
        </p>

        <p className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Demo Mail. All rights reserved.
        </p>
      </div>
    </div>
  );
}
