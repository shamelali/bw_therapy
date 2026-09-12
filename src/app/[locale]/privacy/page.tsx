"use client";
import Link from "next/link";
import { useDictionary, useLocalizedHref } from "@/lib/i18n/locale-context";

export default function PrivacyPolicyPage() {
  const dict = useDictionary();
  const buildHref = useLocalizedHref();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href={buildHref("/")} className="mb-6 inline-flex items-center text-sm text-teal-600 hover:text-teal-500">
        <span className="mr-2">←</span> {dict.nav.explore}
      </Link>
      
      <h1 className="mb-6 text-3xl font-bold text-gray-900">{dict.common.brand} Privacy Policy</h1>
      
      <div className="prose prose-teal max-w-none">
        <p className="mb-4">
          Last updated: September 12, 2026
        </p>
        
        <p className="mb-4">
          This Privacy Policy describes how Serenity ("we", "our", or "us") collects, uses, and protects your information when you use our website and mobile application (collectively, the "Service"). This policy applies to all visitors, users, and others who access or use the Service.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Personal Information</h3>
        <p className="mb-4">
          When you register for an account or use certain features of our Service, we may ask you to provide personally identifiable information that can be used to contact or identify you ("Personal Information"). This may include:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Date of birth</li>
          <li>Gender</li>
          <li>Address (including city, state, zip code)</li>
          <li>Profile picture</li>
          <li>Payment information (processed securely by third-party payment processors)</li>
        </ul>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Account Information</h3>
        <p className="mb-4">
          If you create an account, we collect:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Username and password (hashed and encrypted)</li>
          <li>Account type (customer or provider)</li>
          <li>Business information (for providers: business name, type, description, services offered, pricing, availability)</li>
          <li>Verification documents (for providers: licenses, certifications, insurance information)</li>
        </ul>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Usage Data</h3>
        <p className="mb-4">
          We automatically collect certain information when you access and use our Service:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>IP address, browser type, and operating system</li>
          <li>Pages visited and features used</li>
          <li>Referral source (how you found our Service)</li>
          <li>Date and time of access</li>
          <li>Device information (mobile device ID, model, manufacturer)</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Authentication Data</h3>
        <p className="mb-4">
          When you sign in using third-party authentication services (Google, Facebook, Instagram), we receive certain information from those providers:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Your name and email address</li>
          <li>Profile picture URL</li>
          <li>Unique identifier from the provider</li>
          <li>Any other information you choose to share with us through the provider's permissions</li>
        </ul>
        <p className="mb-4">
          Note: We do not store your third-party passwords or have access to your third-party accounts beyond what is necessary for authentication.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Booking and Transaction Data</h3>
        <p className="mb-4">
          When you book services or make payments through our platform, we collect:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Service details (type, duration, date, time)</li>
          <li>Provider and customer information</li>
          <li>Booking status and history</li>
          <li>Payment transaction details (amount, payment method, transaction ID)</li>
          <li>Reviews and ratings</li>
          <li>Communication between customers and providers (in-app messaging)</li>
        </ul>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
        
        <p className="mb-4">
          We use the information we collect for various purposes, including to:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Provide, maintain, and improve our Service</li>
          <li>Process bookings and payments</li>
          <li>Communicate with you about your account, bookings, and promotional offers</li>
          <li>Personalize your experience and show relevant content</li>
          <li>Verify your identity and prevent fraud</li>
          <li>Comply with legal obligations</li>
          <li>Enforce our Terms of Service</li>
          <li>Resolve disputes and provide customer support</li>
          <li>Analyze usage trends and improve our platform</li>
          <li>Send you newsletters, special offers, and other promotional materials (you can opt-out at any time)</li>
        </ul>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">3. Legal Basis for Processing</h2>
        
        <p className="mb-4">
          We process your personal information based on the following legal grounds:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Consent:</strong> When you explicitly agree to our processing of your data for specific purposes.</li>
          <li><strong>Contract Performance:</strong> When processing is necessary to fulfill our contractual obligations to you (e.g., processing bookings and payments).</li>
          <li><strong>Legitimate Interests:</strong> When we have a legitimate business interest in processing your data, provided it does not override your rights and freedoms.</li>
          <li><strong>Legal Compliance:</strong> When we are required to process your data to comply with applicable laws and regulations.</li>
        </ul>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">4. Sharing and Disclosure of Information</h2>
        
        <p className="mb-4">
          We may share your information with the following categories of recipients:
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Service Providers</h3>
        <p className="mb-4">
          We share information with third-party vendors and service providers who help us operate our Service, including:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Payment processors (to process payments securely)</li>
          <li>Cloud hosting providers (to host our application and data)</li>
          <li>Email service providers (to send transactional and marketing emails)</li>
          <li>Analytics providers (to understand how users interact with our Service)</li>
          <li>Customer support platforms</li>
          <li>Fraud prevention services</li>
        </ul>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Business Transfers</h3>
        <p className="mb-4">
          In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Legal Requirements</h3>
        <p className="mb-4">
          We may disclose your information when required by law, such as to comply with a subpoena, court order, or similar legal process, or when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">With Your Consent</h3>
        <p className="mb-4">
          We may share your information with third parties when we have obtained your explicit consent to do so.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">5. International Data Transfers</h2>
        
        <p className="mb-4">
          Your information may be transferred to, and maintained on, computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
        </p>
        <p className="mb-4">
          If you are located outside Malaysia and choose to provide information to us, please note that we transfer the data, including Personal Information, to Malaysia and process it there.
        </p>
        <p className="mb-4">
          Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">6. Data Retention</h2>
        
        <p className="mb-4">
          We will retain your Personal Information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
        </p>
        <p className="mb-4">
          We retain different types of data for different periods:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Account information: Until account deletion</li>
          <li>Booking and transaction records: Minimum 7 years for tax and legal compliance</li>
          <li>Communications: As long as necessary to provide service and support</li>
          <li>Marketing preferences: Until you opt-out</li>
          <li>Analytics data: Aggregated and anonymized data may be retained indefinitely</li>
        </ul>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">7. Security of Your Information</h2>
        
        <p className="mb-4">
          The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
        </p>
        <p className="mb-4">
          We implement industry-standard security measures including:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Encryption of sensitive data in transit and at rest</li>
          <li>Secure socket layer (SSL) technology for data transmission</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Secure password storage using industry-standard hashing algorithms</li>
          <li>Regular backups and disaster recovery procedures</li>
        </ul>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">8. Your Rights and Choices</h2>
        
        <p className="mb-4">
          Depending on your location, you may have certain rights regarding your Personal Information:
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Access and Portability</h3>
        <p className="mb-4">
          You have the right to request a copy of the Personal Information we hold about you and to have that information transferred to another service provider in a commonly used format.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Correction and Deletion</h3>
        <p className="mb-4">
          You have the right to request correction of any inaccurate or incomplete Personal Information we hold about you. You also have the right, under certain circumstances, to request deletion of your Personal Information.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Restriction and Objection</h3>
        <p className="mb-4">
          You have the right to request restriction of or to object to our processing of your Personal Information in certain circumstances.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Withdrawal of Consent</h3>
        <p className="mb-4">
          Where we process your Personal Information based on your consent, you have the right to withdraw that consent at any time.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Do Not Track</h3>
        <p className="mb-4">
          We do not support Do Not Track ("DNT") requests at this time as no standard has been established.
        </p>
        
        <p className="mb-4">
          To exercise any of these rights, please contact us using the information provided in Section 12 below.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">9. Children's Privacy</h2>
        
        <p className="mb-4">
          Our Service is not directed to anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from anyone under the age of 13 without verification of parental consent, we will take steps to remove that information from our servers.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">10. Changes to This Privacy Policy</h2>
        
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
        </p>
        <p className="mb-4">
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">11. Contact Us</h2>
        
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>By email: privacy@serenitymarketplace.com</li>
          <li>By mail: Serenity Marketplace, Attn: Privacy Officer, 123 Wellness Street, Kuala Lumpur, Malaysia 50000</li>
          <li>Through our website: Visit our Contact Us page</li>
        </ul>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">12. Third-Party Links and Services</h2>
        
        <p className="mb-4">
          Our Service may contain links to third-party websites or services that are not owned or controlled by Serenity. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Serenity shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such websites or services.
        </p>
        
        <p className="mb-4">
          We encourage you to be aware when you leave our Service and to read the terms and conditions and privacy policy of any third-party websites or services that you visit.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">13. Acceptance of This Policy</h2>
        
        <p className="mb-4">
          By using our Service, you signify your acceptance of this Privacy Policy and our Terms of Service. If you do not agree to this Privacy Policy, please do not use our Service. Your continued use of the Service following the posting of changes to this Privacy Policy will be deemed your acceptance of those changes.
        </p>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Serenity Marketplace. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}