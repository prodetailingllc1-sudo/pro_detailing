import { LegalDocument } from '@/components/site/LegalDocument';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Terms & Conditions | PRO Detailing',
  description:
    'Terms governing the PRO Detailing website, service-request tools, appointments and automotive or residential services.',
  path: '/terms-conditions',
});

const sections = [
  {
    title: '1. Services and estimates',
    paragraphs: [
      'PRO Detailing LLC provides automotive appearance, protection and vehicle-care services, including window tint, ceramic coating, paint protection film, detailing, approved mobile work, maintenance, tire, glass and key services, plus residential window-film consultations where offered.',
      'An online configuration or photo assessment is a request for review, not a final diagnosis, guaranteed result, confirmed appointment or binding price. Products, coverage, preparation, parts, timing and pricing are confirmed after the studio reviews the actual vehicle or property.',
    ],
  },
  {
    title: '2. Customer responsibilities',
    bullets: [
      'Provide accurate contact, vehicle, property, condition and access information.',
      'Disclose damage, prior repairs, existing film or coating, hazardous material, mold, bodily fluids and other conditions that may affect safe work.',
      'Remove valuables and make the vehicle or approved service location legally and safely accessible.',
      'Review the written scope, price, warranty and aftercare before authorizing work.',
    ],
  },
  {
    title: '3. Uploaded photos',
    paragraphs: [
      'You confirm that you have the right to upload each image and that it relates to the requested service. Do not upload identification documents, payment-card details, people, license plates you do not want reviewed, or unrelated private information. Photos help with preliminary planning but may not reveal every condition.',
    ],
  },
  {
    title: '4. Appointments, cancellations and mobile access',
    paragraphs: [
      'Appointment timing is confirmed directly by the studio. At least 24 hours’ notice is requested for cancellation or rescheduling. A missed appointment may result in a fee where disclosed. Weather, parts, access or safety conditions may require a schedule or scope change. Mobile or residential work requires a suitable, lawful and approved service location.',
    ],
  },
  {
    title: '5. Payments and disputes',
    paragraphs: [
      'Payment is due as agreed in the confirmed service scope. Payments may be processed by a secure third party. Refunds or adjustments are handled according to the written service agreement, the work performed and applicable law. Contact the studio promptly so concerns can be inspected and addressed.',
    ],
  },
  {
    title: '6. Communications',
    paragraphs: [
      'When you opt in, PRO Detailing may contact you by phone, email or SMS about the request, appointment and related service. Message frequency varies and message or data rates may apply. Reply STOP to opt out of texts or HELP for assistance.',
    ],
  },
  {
    title: '7. Website use and intellectual property',
    paragraphs: [
      'Do not misuse, disrupt, probe or attempt unauthorized access to the website, forms, storage or connected systems. The PRO Detailing name, original branding, site design, photographs, videos and written material are owned by PRO Detailing LLC or used with permission and may not be reused without authorization.',
      'The embedded Ceramic Pro SHIFT VISION visualizer is a third-party tool provided by its owner. Its vehicle models, colors, trademarks and software remain the property of their respective owners. Visualizer availability and supported models may change, and its previews do not confirm that PRO Detailing offers a displayed product or finish.',
    ],
  },
  {
    title: '8. Results, warranties and limitations',
    paragraphs: [
      'Results depend on starting condition, material, prior work, customer maintenance and external factors. Cleaning cannot reverse permanent wear or damage, coatings do not prevent every defect, and paint protection film protects only covered areas. Any manufacturer or workmanship warranty is governed by its current written terms and eligibility requirements.',
      'To the fullest extent permitted by law, PRO Detailing LLC is not responsible for indirect or consequential loss caused by use of this website or circumstances outside its reasonable control. Nothing in these terms excludes rights or liability that cannot legally be excluded.',
    ],
  },
  {
    title: '9. Governing law, changes and contact',
    paragraphs: [
      'These terms are governed by the laws of the Commonwealth of Virginia, with applicable proceedings in Prince William County, Virginia. We may update the terms as services or legal requirements change. Contact info@pro-detailing.co or (202) 360-7095 with questions.',
    ],
  },
] as const;

export default function TermsConditionsPage() {
  return (
    <LegalDocument
      eyebrow="Website & service terms"
      title="Terms & Conditions"
      introduction="These terms carry the former site’s core rules into the replacement application and clarify the new service-configuration and photo-assessment process."
      updated="September 9, 2026"
      sections={sections}
    />
  );
}
