"use client";
import Link from "next/link";
import { useDictionary, useLocalizedHref } from "@/lib/i18n/locale-context";

export default function TermsOfServicePage() {
  const dict = useDictionary();
  const buildHref = useLocalizedHref();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href={buildHref("/")} className="mb-6 inline-flex items-center text-sm text-teal-600 hover:text-teal-500">
        <span className="mr-2">←</span> {dict.nav.explore}
      </Link>
      
      <h1 className="mb-6 text-3xl font-bold text-gray-900">{dict.common.brand} Terms of Service</h1>
      
      <div className="prose prose-teal max-w-none">
        <p className="mb-4">
          Last updated: September 12, 2026
        </p>
        
        <p className="mb-4">
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Serenity website and mobile application (the "Service") operated by Serenity Marketplace ("us", "we", or "our").
        </p>
        
        <p className="mb-4">
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
        </p>
        
        <p className="mb-4">
          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">1. Accounts</h2>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Creating an Account</h3>
        <p className="mb-4">
          When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Account Security</h3>
        <p className="mb-4">
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
        </p>
        <p className="mb-4">
          You agree to notify us immediately of any unauthorized use of your password or any other breach of security. You also agree to ensure that you exit from your account at the end of each session. You should use particular caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Account Termination</h3>
        <p className="mb-4">
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>
        <p className="mb-4">
          If you wish to terminate your account, you may simply discontinue using the Service.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">2. Bookings and Payments</h2>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Making a Booking</h3>
        <p className="mb-4">
          When you book a service through our Service, you are entering into a contractual agreement with the service provider. We act as a facilitator for the booking but are not a party to the agreement between you and the provider.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Payment</h3>
        <p className="mb-4">
          All payments for services booked through our Service are processed by third-party payment processors. You agree to pay all charges and fees incurred by you through the Service at the then-current rates.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Cancellations and Refunds</h3>
        <p className="mb-4">
          Cancellation and refund policies are determined by individual service providers and are displayed at the time of booking. We encourage you to review the provider's cancellation policy before making a booking.
        </p>
        <p className="mb-4">
          We are not responsible for any refunds or compensation related to cancellations made according to the provider's policy.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">3. User Conduct</h2>
        
        <p className="mb-4">
          You agree not to use the Service to:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Violate any applicable local, state, national or international law, or any regulations having the force of law;</li>
          <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
          <li>Transmit any material that is obscene, offensive or objectionable;</li>
          <li>Transmit any material that encourages conduct that could constitute a criminal offense, give rise to civil liability, or otherwise violate any applicable local, state, national or international law or regulation;</li>
          <li>Impersonate any person or entity, or misrepresent your identity or affiliation with any person or entity;</li>
          <li>Interfere with or disrupt the Service or servers or networks connected to the Service, or disobey any requirements, procedures, policies or regulations of networks connected to the Service;</li>
          <li>Attempt to gain unauthorized access to the Service, our systems or networks or any related system through hacking, password mining or any other means;</li>
          <li>Harass, annoy, intimidate, threaten or defame any person or entity;</li>
          <li>Collect or store personal data about other users;</li>
          <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots or similar data gathering and extraction tools;</li>
          <li>Use the Service to advertise or offer to sell any goods or services;</li>
          <li>Engage in any activity that is harmful to minors in any way;</li>
          <li>Use the Service for any illegal or unauthorized purpose;</li>
          <li>Engage in any activity that is harmful to our business operations;</li>
          <li>Violate any applicable local, state, national or international law, or any regulations having the force of law.</li>
        </ul>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">4. Intellectual Property</h2>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">Our Proprietary Rights</h3>
        <p className="mb-4">
          The Service and its original content, features and functionality are and will remain the exclusive property of Serenity Marketplace and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Serenity Marketplace.
        </p>
        
        <h3 className="mb-3 text-xl font-medium text-gray-700">User-Generated Content</h3>
        <p className="mb-4">
          The Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
        </p>
        <p className="mb-4">
          By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use such Content in accordance with these Terms.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">5. Links To Other Web Sites</h2>
        
        <p className="mb-4">
          Our Service may contain links to third-party web sites or services that are not owned or controlled by Serenity Marketplace.
        </p>
        <p className="mb-4">
          Serenity Marketplace has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Serenity Marketplace shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web site or service.
        </p>
        <p className="mb-4">
          We strongly advise you to read the terms and conditions and privacy policy of any third-party web sites or services that you visit.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">6. Disclaimer of Warranty</h2>
        
        <p className="mb-4">
          THE SERVICE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
        </p>
        <p className="mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SERENITY MARKETPLACE BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING, BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF USE, LOSS OF DATA, OR OTHER PECUNIARY LOSS) ARISING OUT OF OR IN ANY WAY CONNECTED TO THE USE OR PERFORMANCE OF THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR OTHERWISE, EVEN IF THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">7. Limitation of Liability</h2>
        
        <p className="mb-4">
          IN NO EVENT SHALL SERENITY MARKETPLACE, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES ARISING OUT OF OR IN ANY WAY CONNECTED TO THE USE OR PERFORMANCE OF THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR OTHERWISE, EVEN IF THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">8. Governing Law</h2>
        
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions.
        </p>
        <p className="mb-4">
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will continue to be in full force and effect.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">9. Changes to These Terms</h2>
        
        <p className="mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        <p className="mb-4">
          By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
        </p>
        
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">10. Contact Us</h2>
        
        <p className="mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>By email: legal@serenitymarketplace.com</li>
          <li>By mail: Serenity Marketplace, Attn: Legal Department, 123 Wellness Street, Kuala Lumpur, Malaysia 50000</li>
          <li>Through our website: Visit our Contact Us page</li>
        </ul>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Serenity Marketplace. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}