import { LegalDocument } from '@/components/site/LegalDocument';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Privacy Policy | PRO Detailing',
  description:
    'How PRO Detailing LLC collects, uses, protects and shares information submitted through its website and service-request tools.',
  path: '/privacy-policy',
});

const sections = [
  {
    title: '1. Scope of this policy',
    paragraphs: [
      'This policy applies when you use the PRO Detailing website, service and condition-assessment forms, booking tools, email or SMS communications, or interact with the studio in person. Third-party websites and platforms follow their own privacy policies.',
    ],
  },
  {
    title: '2. Information we collect',
    bullets: [
      'Contact details such as name, phone number, email address and communication preference.',
      'Vehicle or property details, requested service, condition notes, selected packages and appointment preferences.',
      'A service address when you request an approved mobile or residential service.',
      'Vehicle or property photos that you choose to upload for condition review.',
      'Technical and attribution data such as device or browser information, referring page, campaign parameters and site interactions.',
      'Payment information handled by a secure third-party payment provider when payment is required; this website does not ask you to place card details in a condition-assessment form.',
    ],
  },
  {
    title: '3. How we use information',
    bullets: [
      'Review the requested service and condition, prepare a vehicle-specific scope and coordinate an appointment.',
      'Respond by phone, text or email and provide service, aftercare or warranty support.',
      'Protect the website, detect misuse, preserve required business records and improve the customer experience.',
      'Send promotional messages only where permitted and consistent with the consent you provided.',
    ],
  },
  {
    title: '4. Photos, managed storage and retention',
    paragraphs: [
      'When condition-photo submissions are activated, assessment photos will be stored in private application storage rather than a public image library. The planned workflow uses random object identifiers instead of customer names or addresses and time-limited team review links that do not expose the underlying storage location.',
      'We retain assessment records and photos only as long as reasonably necessary for service review, customer support, legal or contractual needs. You may request access, correction or deletion by contacting the studio, subject to records we are legally permitted or required to retain.',
    ],
  },
  {
    title: '5. SMS, email and calls',
    paragraphs: [
      'If you consent to messages, PRO Detailing may send appointment confirmations, service updates and other requested communications. Message frequency varies and carrier message or data rates may apply. Reply STOP to opt out of text messages or HELP for assistance. Mobile opt-in data is not sold or shared with third parties for their independent marketing.',
    ],
  },
  {
    title: '6. Service providers and sharing',
    paragraphs: [
      'We do not sell personal information. Information may be shared with providers that support hosting, private file storage, customer relationship management, scheduling, communications, payments, analytics, security or professional services; with authorities where legally required; or as part of a business transaction. Providers receive only the information reasonably needed for their role.',
    ],
  },
  {
    title: '7. Cookies and measurement',
    paragraphs: [
      'The website may use necessary cookies and similar technology for security, preferences, performance measurement and campaign attribution. Browser controls can block or remove cookies, although some features may work differently.',
      'The optional Ceramic Pro 3D vehicle visualizer is embedded from api.car-cover.net and follows the provider’s own privacy and cookie practices. Opening the tool may share ordinary technical information such as your IP address, browser and interaction data with that provider. PRO Detailing does not send information from its service-request forms to the visualizer.',
    ],
  },
  {
    title: '8. Your choices and privacy rights',
    paragraphs: [
      'Depending on where you live and applicable law, you may ask to access, correct or delete personal information, withdraw consent, or opt out of certain marketing or targeted advertising. Contact info@pro-detailing.co. We may need to verify the request before acting.',
    ],
  },
  {
    title: '9. Security and children',
    paragraphs: [
      'We use reasonable administrative and technical safeguards, restricted access and encrypted connections. No system is completely secure, so customers should not upload documents, payment-card details or images unrelated to the requested service. Our services are not directed to children under 13, and we do not knowingly collect their information.',
    ],
  },
  {
    title: '10. Updates and contact',
    paragraphs: [
      'We may update this policy as the application, providers or legal requirements change. The current revision date will appear on this page. Contact PRO Detailing LLC at info@pro-detailing.co, (202) 360-7095, or 7501 Gary Rd, Manassas, VA 20109.',
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Customer privacy"
      title="Privacy Policy"
      introduction="This launch draft carries the current PRO Detailing policy into the replacement application and explains the planned vehicle-photo assessment workflow."
      updated="September 9, 2026"
      sections={sections}
    />
  );
}
