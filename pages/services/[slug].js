import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import BookingModal from '../../components/BookingModal';
import ServicesModal from '../../components/ServicesModal';
import homeStyles from '../../styles/Home.module.css';
import pageStyles from '../../styles/ServicePage.module.css';

// ─── All service metadata ────────────────────────────────────────────────────
const SERVICES = {
  // ── Cleaning ──────────────────────────────────────────────────────────────
  'bathroom-deep-cleaning': {
    id: 101,
    heroTitle: 'Your Bathroom Deep Cleaning Partner',
    subtitle1: 'Professional deep cleaning — floors, walls, basins, commodes, mirrors & ventilators.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Our expert team provides thorough deep cleaning for every corner of your bathroom. We use professional-grade cleaning agents that eliminate germs, limescale, and soap scum, leaving your bathroom hygienically clean and fresh.',
    includes: [
      'Floor scrubbing & disinfection',
      'Wall tile cleaning & grout treatment',
      'Single basin deep clean',
      'Single pan / commode sanitisation',
      'Mirror polishing',
      'Ventilator cleaning',
    ],
    faqs: [
      { q: 'How long does the service take?', a: 'Typically 1–2 hours per bathroom, depending on size and condition.' },
      { q: 'Do I need to supply any equipment?', a: 'No. Our team brings all necessary equipment and professional cleaning products.' },
      { q: 'Is the service available daily?', a: 'Yes, you can schedule any day that suits you, including weekends.' },
      { q: 'What if I have multiple bathrooms?', a: 'We offer discounted rates for multiple bathrooms in the same booking. Contact us for a custom quote.' },
    ],
  },

  'kitchen-deep-cleaning': {
    id: 102,
    heroTitle: 'Your Kitchen Deep Cleaning Partner',
    subtitle1: 'Professional deep cleaning for a spotless, grease-free, hygienic kitchen.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Our trained team deep cleans every surface of your kitchen — floors, walls, sink, outside cabinets, inside windows, and exit fan — using heavy-duty degreasers and professional cleaning products that cut through years of built-up grease and grime.',
    includes: [
      'Floor scrubbing & disinfection',
      'Wall tile deep clean',
      'Sink descaling & sanitisation',
      'Outside cabinet wipe-down',
      'Inside window cleaning',
      'Exit fan cleaning',
    ],
    faqs: [
      { q: 'How long does the service take?', a: 'Typically 2–3 hours depending on kitchen size and level of grease build-up.' },
      { q: 'Can you clean my kitchen hood too?', a: 'Yes! Kitchen hood cleaning is available as an add-on. Choose from Basic or Master clean options.' },
      { q: 'Do I need to empty the cabinets?', a: 'We clean outside cabinet surfaces. For inside cabinet cleaning, please empty them beforehand.' },
      { q: 'What cleaning products do you use?', a: 'We use commercial-grade, food-safe degreasers and disinfectants.' },
    ],
  },

  'floor-deep-cleaning': {
    id: 103,
    heroTitle: 'Your Floor Deep Cleaning Partner',
    subtitle1: 'Expert deep cleaning for all floor types — tiles, mosaic, marble, and wood.',
    subtitle2: 'Priced per square foot. Reliable, fast and available 24/7.',
    description:
      'We restore your floors to their original shine using professional scrubbing machines and appropriate cleaning agents for each floor type. Whether it is tiled, mosaic, marble, or wooden flooring — our team handles it all with care.',
    includes: [
      'Pre-sweep & debris removal',
      'Machine scrubbing',
      'Stain & grout treatment',
      'Surface disinfection',
      'Final mop & dry',
      'Suitable for tiles, mosaic, marble & wood',
    ],
    faqs: [
      { q: 'How is the price calculated?', a: 'Pricing is per square foot, varying by floor type. Tiles start at ৳3/sft, marble at ৳5/sft.' },
      { q: 'How long does it take?', a: 'Typically 2–4 hours depending on the total area and floor type.' },
      { q: 'Will the floors be wet afterward?', a: 'Floors will be slightly damp immediately after; they dry within 30–60 minutes.' },
      { q: 'Can you do multiple floor types in one visit?', a: 'Yes, each area will be treated with the appropriate method and materials.' },
    ],
  },

  'full-home-deep-cleaning': {
    id: 104,
    heroTitle: 'Your Full Home Deep Cleaning Partner',
    subtitle1: 'Complete whole-home deep cleaning for a fresh, healthy, spotless living space.',
    subtitle2: 'Reliable, fast and available 24/7 for your home needs.',
    description:
      'Our full home deep cleaning service covers every room — bathrooms, kitchen, living areas, bedrooms, and balconies — in a single visit. Priced by home size, this is the most comprehensive cleaning package we offer, perfect for post-construction, post-tenancy, or seasonal deep cleans.',
    includes: [
      'All bathrooms deep cleaned',
      'Kitchen deep clean',
      'All rooms swept, mopped & dusted',
      'Balcony & corridor cleaning',
      'Ceiling fan & fixture dusting',
      'Door & window frame wipe-down',
    ],
    faqs: [
      { q: 'How long does a full home clean take?', a: 'Typically a full day (6–8 hours) depending on home size and condition.' },
      { q: 'How many team members come?', a: 'Usually a team of 2–4 professionals depending on the home size.' },
      { q: 'Should I be home during the service?', a: 'We recommend being present, but it is not mandatory if arrangements are made in advance.' },
      { q: 'What if my home is larger than 1701 sq.ft.?', a: 'Contact us for a custom quotation. We will send a team for a site visit.' },
    ],
  },

  'window-cleaning': {
    id: 105,
    heroTitle: 'Your Window Cleaning Partner',
    subtitle1: 'Crystal-clear windows — inside and outside — for homes and offices.',
    subtitle2: 'Minimum 5 windows per booking. Reliable and available 24/7.',
    description:
      'Our window cleaning team uses professional squeegees, extension poles, and streak-free cleaning solutions to leave every pane spotless. We handle both inside and outside window cleaning safely and efficiently.',
    includes: [
      'Frame & sill wipe-down',
      'Glass streak-free cleaning',
      'Inside window cleaning',
      'Outside window cleaning',
      'Screen cleaning (where accessible)',
      'Minimum 5 windows per booking',
    ],
    faqs: [
      { q: 'How is the price calculated?', a: 'Pricing is per window. Inside cleaning is ৳200/window; outside is ৳800/window.' },
      { q: 'What about high-rise windows?', a: 'We offer solutions for high-rise windows. Contact us to discuss your specific building.' },
      { q: 'How long does it take?', a: 'Around 10–20 minutes per window depending on size and level of dirt.' },
      { q: 'Is outside window cleaning safe?', a: 'Yes, our team uses appropriate safety equipment and follows safety protocols.' },
    ],
  },

  'thai-glass-cleaning': {
    id: 106,
    heroTitle: 'Your Thai Glass Cleaning Partner',
    subtitle1: 'Professional cleaning for indoor and outdoor Thai glass panels — per square foot.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Thai glass panels require specialised cleaning techniques to avoid scratching and to remove mineral deposits and smears. Our team uses the correct tools and solutions for both indoor and outdoor Thai glass, leaving them crystal clear.',
    includes: [
      'Pre-inspection of glass condition',
      'Mineral deposit & stain removal',
      'Streak-free glass cleaning',
      'Frame & seal wipe-down',
      'Indoor & outdoor glass treatment',
      'Priced per square foot',
    ],
    faqs: [
      { q: 'How is pricing calculated?', a: 'Indoor glass is ৳4/sft; outdoor glass is ৳8/sft.' },
      { q: 'Can you remove hard water stains?', a: 'Yes, we use specialist descalers to remove mineral and hard water deposits.' },
      { q: 'How long does the service take?', a: 'Depends on total glass area. Most jobs are completed within 2–4 hours.' },
      { q: 'What is Thai glass?', a: 'Thai glass refers to large-format decorative or architectural glass panels commonly used in Bangladeshi homes and offices.' },
    ],
  },

  'furniture-carpet-cleaning': {
    id: 107,
    heroTitle: 'Your Furniture & Carpet Cleaning Partner',
    subtitle1: 'Deep cleaning for sofas, chairs, and carpets — restore freshness and hygiene.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Our team uses hot water extraction and foam cleaning methods to remove deep-seated dirt, allergens, stains, and odours from your carpets, sofas, and chairs. We treat fabric and rexine surfaces with appropriate cleaning agents to restore their appearance.',
    includes: [
      'Pre-vacuuming & debris removal',
      'Stain pre-treatment',
      'Hot water extraction / foam clean',
      'Sofa & chair upholstery cleaning',
      'Carpet deep clean per sq.ft.',
      'Odour neutralisation',
    ],
    faqs: [
      { q: 'How long does it take to dry?', a: 'Typically 2–4 hours for most fabrics. We recommend keeping windows open for ventilation.' },
      { q: 'Can you remove tough stains?', a: 'We pre-treat stains with specialist products. Most stains are fully removed; some very old or set stains may only be reduced.' },
      { q: 'Do you clean leather sofas?', a: 'We specialise in fabric and rexine. Contact us for leather sofa cleaning enquiries.' },
      { q: 'How often should sofas be professionally cleaned?', a: 'We recommend every 6–12 months for households, or more frequently with pets and children.' },
    ],
  },

  'marble-mosaic-polish': {
    id: 108,
    heroTitle: 'Your Marble & Mosaic Polish Partner',
    subtitle1: 'Professional cutting and polishing for marble and mosaic floors — per square foot.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Our skilled technicians use industrial diamond pads and professional polishing machines to restore the natural shine of marble and mosaic surfaces. We remove scratches, stains, and dullness, leaving floors mirror-bright and protected.',
    includes: [
      'Surface assessment & preparation',
      'Diamond pad grinding & cutting',
      'Scratch & stain removal',
      'Machine polishing',
      'Final crystallisation / sealing',
      'Covers marble and mosaic surfaces',
    ],
    faqs: [
      { q: 'How is pricing calculated?', a: 'Marble cutting and polish is ৳40/sft; mosaic is ৳30/sft.' },
      { q: 'How long does the floor need to dry?', a: 'The floor can be walked on within 1–2 hours after treatment.' },
      { q: 'How often should marble be polished?', a: 'We recommend every 1–2 years to maintain the shine and protect the surface.' },
      { q: 'Can you remove deep scratches?', a: 'Most scratches and etch marks can be removed by the cutting and polishing process. Very deep gouges may require additional treatment.' },
    ],
  },

  'appliance-cleaning': {
    id: 109,
    heroTitle: 'Your Appliance Cleaning Partner',
    subtitle1: 'Deep cleaning for kitchen hoods, refrigerators, washing machines and more.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Household appliances accumulate grease, bacteria, and odours over time. Our specialist team deep cleans kitchen hoods, refrigerators, washing machines, and ceiling fans using safe, appliance-appropriate cleaning products to restore hygiene and performance.',
    includes: [
      'Kitchen hood — all types',
      'Ceiling fan deep clean',
      'Refrigerator interior & exterior',
      'Washing machine drum & drum clean',
      'Safe, appliance-appropriate products',
      'Degreasing & disinfection',
    ],
    faqs: [
      { q: 'Do I need to empty the refrigerator?', a: 'Yes, please empty the refrigerator before the service so we can clean all compartments.' },
      { q: 'What type of kitchen hoods do you clean?', a: 'We clean flat, box, and glass kitchen hoods with appropriate techniques for each type.' },
      { q: 'How long does appliance cleaning take?', a: 'Typically 30–60 minutes per appliance depending on condition.' },
      { q: 'Are the products used safe for food areas?', a: 'Yes, we use food-safe, certified cleaning agents for all kitchen appliances.' },
    ],
  },

  'tank-pipe-cleaning': {
    id: 110,
    heroTitle: 'Your Tank & Pipe Cleaning Partner',
    subtitle1: 'Professional cleaning for water tanks, septic tanks, and pipes.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Clean water tanks and clear pipes are essential for health. Our team cleans PVC water tanks, reserve and overhead tanks, septic tanks, and pipes using safe methods and proper equipment. We ensure water hygiene and free-flowing drainage.',
    includes: [
      'PVC water tank cleaning',
      'Reserve & overhead tank cleaning',
      'Septic tank cleaning',
      'Pit cleaning',
      'Pipe clearing (per foot)',
      'Disinfection after cleaning',
    ],
    faqs: [
      { q: 'How often should water tanks be cleaned?', a: 'We recommend every 6 months to maintain water hygiene and prevent bacterial growth.' },
      { q: 'Is a site visit needed for septic tanks?', a: 'Yes, septic and pit cleaning require a site visit first. We charge ৳250 for the visit, deducted from the final service fee.' },
      { q: 'How long does tank cleaning take?', a: 'PVC tank cleaning typically takes 1–2 hours. Reserve tanks may take 3–4 hours.' },
      { q: 'Do you dispose of waste from septic tanks?', a: 'Yes, we handle full waste removal and disposal safely and in compliance with local regulations.' },
    ],
  },

  'monthly-service': {
    id: 111,
    heroTitle: 'Your Monthly Cleaning Service Partner',
    subtitle1: 'Dedicated cleaners, office boys, and house maids — monthly packages for home & office.',
    subtitle2: 'Reliable, professional and available 24/7 for your home and office needs.',
    description:
      'Our monthly service provides you with trained, background-checked cleaning staff on a full-time basis. Whether you need a regular cleaner, an office boy, or a house maid, we provide reliable, professional staff suited to your requirements.',
    includes: [
      'Dedicated trained staff member',
      '8 hours/day, 6 days/week',
      'Background-checked professionals',
      'Regular cleaner or office boy options',
      'House maid placement available',
      'Ongoing support & replacement guarantee',
    ],
    faqs: [
      { q: 'What is the minimum contract period?', a: 'Our standard contract is month-to-month with no long-term lock-in.' },
      { q: 'What if I am not satisfied with the staff?', a: 'We offer a replacement guarantee — if you are not satisfied, we will replace the staff member promptly.' },
      { q: 'Are staff members insured?', a: 'Yes, all our deployed staff are covered under our service agreement.' },
      { q: 'Can I request a house maid?', a: 'House maid placement requires a site visit to understand your requirements. A ৳250 visit fee applies.' },
    ],
  },

  // ── Pest Control ──────────────────────────────────────────────────────────
  'cockroaches-control': {
    id: 201,
    heroTitle: 'Your Cockroach Control Partner',
    subtitle1: 'Effective cockroach extermination for homes and commercial spaces.',
    subtitle2: 'Safe, fast and available 24/7 for your home and office needs.',
    description:
      'Our certified pest control technicians use gel baiting, spray, and integrated pest management techniques to eliminate cockroach infestations at their source. Treatment is safe for families and pets once dry.',
    includes: [
      'Full property inspection',
      'Gel bait & spray treatment',
      'Kitchen, bathroom & drain treatment',
      'Safe for families & pets when dry',
      'Post-treatment guidance',
      'Follow-up support available',
    ],
    faqs: [
      { q: 'How long does treatment take?', a: 'Typically 1–2 hours depending on the property size.' },
      { q: 'Is the treatment safe for children and pets?', a: 'Yes, once the treatment has dried (about 30–60 minutes) it is safe for children and pets.' },
      { q: 'How many treatments are needed?', a: 'Most infestations are controlled in 1–2 treatments. Severe cases may require a follow-up visit.' },
      { q: 'Should I clean after treatment?', a: 'Avoid mopping or cleaning treated surfaces for 24 hours to allow the treatment to take full effect.' },
    ],
  },

  'bed-bugs-control': {
    id: 202,
    heroTitle: 'Your Bed Bugs Control Partner',
    subtitle1: 'Complete bed bug elimination — by bedroom, guaranteed results.',
    subtitle2: 'Safe, fast and available 24/7 for your home needs.',
    description:
      'Bed bugs are notoriously difficult to eliminate. Our certified team uses heat treatment, spray, and residual insecticide techniques targeting all life stages of bed bugs — eggs, nymphs, and adults — for complete eradication.',
    includes: [
      'Full bedroom inspection',
      'Mattress & furniture treatment',
      'Spray & residual insecticide',
      'Bed frame & headboard treatment',
      'Safe product usage',
      'Post-treatment follow-up advice',
    ],
    faqs: [
      { q: 'How long does treatment take?', a: 'Typically 1–2 hours per bedroom.' },
      { q: 'Do I need to wash bedding before treatment?', a: 'Yes, we recommend washing all bedding in hot water (60°C+) before our team arrives.' },
      { q: 'How soon can I sleep in my bed?', a: 'We recommend waiting 4–6 hours after treatment before sleeping in the treated room.' },
      { q: 'How many sessions are needed?', a: 'Usually 2 sessions (7–10 days apart) are recommended for complete elimination.' },
    ],
  },

  'termite-control': {
    id: 203,
    heroTitle: 'Your Termite Control Partner',
    subtitle1: 'Expert termite inspection and treatment to protect your home from structural damage.',
    subtitle2: 'Professional, reliable and available 24/7 for your home and office needs.',
    description:
      'Termites cause billions in structural damage every year. Our expert team conducts a thorough inspection, identifies the termite species and infestation level, and applies the most effective treatment — baiting systems, liquid termiticide, or localised treatment — to protect your property.',
    includes: [
      'Full property termite inspection',
      'Species & infestation assessment',
      'Liquid termiticide application',
      'Baiting system installation (if required)',
      'Structural entry point treatment',
      'Post-treatment monitoring plan',
    ],
    faqs: [
      { q: 'Why is a site visit required first?', a: 'Termite treatment varies significantly by infestation type, size, and building construction. A site visit allows us to give you an accurate quote.' },
      { q: 'How much does the site visit cost?', a: 'The site visit fee is ৳250, which is deducted from the final service charge.' },
      { q: 'Is the treatment safe?', a: 'Yes, we use certified termiticides approved for residential and commercial use.' },
      { q: 'How long does treatment take to work?', a: 'Liquid treatment works within 24–48 hours. Baiting systems may take a few weeks for full colony elimination.' },
    ],
  },

  'rodent-control': {
    id: 204,
    heroTitle: 'Your Rodent Control Partner',
    subtitle1: 'Premium rodent extermination and prevention for homes and businesses.',
    subtitle2: 'Professional, reliable and available 24/7 for your home and office needs.',
    description:
      'Rats and mice carry diseases and cause significant property damage. Our rodent control team uses trapping, baiting, and exclusion techniques to eliminate existing infestations and prevent re-entry, keeping your property rodent-free.',
    includes: [
      'Full property rodent inspection',
      'Entry point identification & sealing',
      'Bait station installation',
      'Trapping programme',
      'Sanitation advice',
      'Follow-up visit included',
    ],
    faqs: [
      { q: 'Why is a site visit required?', a: 'Rodent control is highly specific to the property layout and infestation severity. A visit ensures we provide the right solution.' },
      { q: 'How much is the site visit?', a: 'The visit fee is ৳250, which is deducted from the final service charge.' },
      { q: 'How quickly will I see results?', a: 'Most customers notice a significant reduction in rodent activity within 3–5 days.' },
      { q: 'Do you seal entry points?', a: 'Yes, identifying and sealing entry points is a key part of our rodent control programme.' },
    ],
  },

  // ── Shifting ──────────────────────────────────────────────────────────────
  'family-home-shifting': {
    id: 301,
    heroTitle: 'Your Family Home Shifting Partner',
    subtitle1: 'Safe, careful, and efficient moving service for families across Dhaka.',
    subtitle2: 'Professional, reliable and available 24/7 for your home moving needs.',
    description:
      'Moving a family home is a major undertaking. Our experienced team handles everything from packing and loading to transportation and unloading, ensuring your belongings are moved safely and efficiently with minimal stress.',
    includes: [
      'Professional packing service',
      'Careful furniture disassembly',
      'Safe loading & secure transportation',
      'Unloading & placement',
      'Furniture reassembly',
      'Custom quotation after site visit',
    ],
    faqs: [
      { q: 'Why is a site visit needed?', a: 'Home size, number of items, distance, and floor level all affect pricing. A visit gives us the information to quote accurately.' },
      { q: 'How much is the site visit?', a: 'The visit fee is ৳250, deducted from the final service charge.' },
      { q: 'Do you provide packing materials?', a: 'Yes, we bring all necessary packing materials including boxes, bubble wrap, and moving blankets.' },
      { q: 'Can you move a piano or heavy safe?', a: 'Yes, we have the equipment to move heavy and bulky items. Please mention these during the site visit.' },
    ],
  },

  'bachelor-home-shifting': {
    id: 302,
    heroTitle: 'Your Bachelor Home Shifting Partner',
    subtitle1: 'Quick, affordable, and hassle-free moving service for bachelor flats.',
    subtitle2: 'Professional, reliable and available 24/7 for your moving needs.',
    description:
      'Relocating your bachelor flat? Our team provides a fast, affordable moving service tailored for smaller households. We handle packing, loading, transportation, and unloading so you can settle into your new place without the hassle.',
    includes: [
      'Packing of all items',
      'Safe loading & transportation',
      'Unloading & placement',
      'Quick turnaround service',
      'Affordable pricing',
      'Custom quotation after site visit',
    ],
    faqs: [
      { q: 'Why is a site visit needed?', a: 'We need to assess the volume of belongings and access conditions to give an accurate quote.' },
      { q: 'How much is the site visit?', a: 'The visit fee is ৳250, deducted from the final charge.' },
      { q: 'How long does a bachelor shift take?', a: 'Most bachelor home moves are completed within 3–5 hours.' },
      { q: 'Can you move on weekends?', a: 'Yes, we operate 7 days a week including weekends and public holidays.' },
    ],
  },

  'office-shifting': {
    id: 303,
    heroTitle: 'Your Office Shifting Partner',
    subtitle1: 'Professional office relocation with minimal downtime for your business.',
    subtitle2: 'Reliable, efficient and available 24/7 for your business moving needs.',
    description:
      'Office moves require precision, speed, and confidentiality. Our experienced team handles IT equipment, furniture, files, and sensitive items with care, ensuring your office is up and running in the new location with minimal disruption to your operations.',
    includes: [
      'IT equipment packing & handling',
      'Furniture disassembly & reassembly',
      'Secure document & file transport',
      'Safe loading & transportation',
      'New office layout setup',
      'Custom quotation after site visit',
    ],
    faqs: [
      { q: 'Can you move outside business hours?', a: 'Yes, we offer evening and weekend moves to minimise disruption to your business.' },
      { q: 'How is pricing determined?', a: 'Based on office size, number of items, distance, and access. We quote after a site visit.' },
      { q: 'Do you handle server equipment?', a: 'We handle IT equipment with care; we recommend your IT team oversees disconnection and reconnection of servers.' },
      { q: 'How much is the site visit?', a: 'The visit fee is ৳250, deducted from the final service charge.' },
    ],
  },

  // ── AC Services ───────────────────────────────────────────────────────────
  'ac-check-up': {
    id: 401,
    heroTitle: 'Your AC Check Up Partner',
    subtitle1: 'Complete AC health check and diagnosis to keep your unit running efficiently.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Our certified AC technicians carry out a comprehensive health check of your air conditioning unit — inspecting filters, coils, refrigerant levels, electrical connections, and overall performance — and provide a full diagnostic report.',
    includes: [
      'Filter inspection & cleaning',
      'Coil condition check',
      'Refrigerant level check',
      'Electrical connection inspection',
      'Thermostat & controls check',
      'Full diagnostic report',
    ],
    faqs: [
      { q: 'How long does the check-up take?', a: 'Typically 30–45 minutes per unit.' },
      { q: 'Does the check-up include gas refilling?', a: 'No, gas refilling is a separate service. We will advise you if it is needed after the check-up.' },
      { q: 'How often should I get an AC check-up?', a: 'We recommend at least once a year, ideally before summer.' },
      { q: 'What happens if a fault is found?', a: 'We will explain the issue clearly and provide a quote for the repair before any work is done.' },
    ],
  },

  'ac-gas-checkup': {
    id: 402,
    heroTitle: 'Your AC Gas Checkup Partner',
    subtitle1: 'Refrigerant gas level inspection to ensure peak cooling performance.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Low refrigerant gas is the most common cause of poor AC cooling performance. Our technicians check the gas pressure and identify any leaks. If a top-up is required, we provide a full gas refilling service.',
    includes: [
      'Refrigerant pressure check',
      'Leak detection inspection',
      'Performance assessment',
      'Written diagnosis',
      'Gas top-up available if needed',
      'Covers all common refrigerant types',
    ],
    faqs: [
      { q: 'How do I know if my AC needs gas?', a: 'Common signs are reduced cooling, ice forming on the unit, or the AC running but not cooling.' },
      { q: 'Is gas refilling included?', a: 'The ৳400 fee covers the checkup. Gas refilling is charged separately if needed.' },
      { q: 'How long does the checkup take?', a: 'About 20–30 minutes.' },
      { q: 'Is it safe to run an AC with low gas?', a: 'Running an AC with low refrigerant can damage the compressor over time. We recommend addressing it promptly.' },
    ],
  },

  'ac-jet-wash': {
    id: 403,
    heroTitle: 'Your AC Jet Wash Partner',
    subtitle1: 'High-pressure jet washing for a deeply cleaned, efficiently running AC.',
    subtitle2: 'Bulk discounts for multiple ACs. Available 24/7.',
    description:
      'Over time, AC coils and fins clog with dust and debris, reducing efficiency and increasing electricity bills. Our high-pressure jet wash blasts clean the indoor and outdoor units, restoring airflow, cooling performance, and energy efficiency.',
    includes: [
      'High-pressure jet wash of indoor unit',
      'Outdoor unit coil cleaning',
      'Fin straightening',
      'Drain pan & pipe flush',
      'Post-wash performance test',
      'Bulk discounts for 2–4 ACs',
    ],
    faqs: [
      { q: 'How often should I jet wash my AC?', a: 'We recommend every 6–12 months depending on usage and environment.' },
      { q: 'Will water damage my AC?', a: 'No. Jet washing is a standard AC maintenance procedure. We take full precautions to protect electrical components.' },
      { q: 'Do you offer discounts for multiple ACs?', a: 'Yes, we have discounted packages for 2, 3, and 4 ACs in the same session.' },
      { q: 'How long does it take?', a: 'Approximately 45–60 minutes per unit.' },
    ],
  },

  'ac-master-service': {
    id: 404,
    heroTitle: 'Your AC Master Service Partner',
    subtitle1: 'Comprehensive AC service — cleaning, gas check, and performance tuning in one visit.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Our AC Master Service is the most complete AC maintenance package we offer. It includes a full jet wash, refrigerant gas level check, electrical inspection, filter cleaning, and performance tuning — everything your AC needs to run at its best.',
    includes: [
      'Full jet wash (indoor & outdoor units)',
      'Refrigerant gas level check',
      'Filter deep clean',
      'Electrical connection inspection',
      'Thermostat calibration',
      'Performance test & report',
    ],
    faqs: [
      { q: 'What is included vs a basic jet wash?', a: 'Master Service includes the jet wash plus gas check, electrical inspection, and performance tuning — a full annual service.' },
      { q: 'How long does it take?', a: 'Approximately 60–90 minutes per unit.' },
      { q: 'How often should I book a master service?', a: 'Once a year is sufficient for most home ACs. Commercial ACs in heavy use may benefit from twice-yearly servicing.' },
      { q: 'Is gas refilling included?', a: 'Gas check is included. If a top-up is required, it is charged separately.' },
    ],
  },

  'ac-foam-wash': {
    id: 405,
    heroTitle: 'Your AC Foam Wash Partner',
    subtitle1: 'Chemical foam wash for deep AC coil cleaning without full disassembly.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Foam washing uses a special expanding chemical foam to penetrate deep into the AC coil fins, dissolving mould, bacteria, and stubborn grime that a standard jet wash cannot reach. It is particularly effective for ACs in humid environments.',
    includes: [
      'Expanding chemical foam application',
      'Deep coil penetration & cleaning',
      'Mould & bacteria treatment',
      'No full disassembly required',
      'Drain flush after foam treatment',
      'Post-wash performance test',
    ],
    faqs: [
      { q: 'How is foam wash different from jet wash?', a: 'Foam wash uses a chemical agent that penetrates deeper into the coils, targeting mould and bacteria. Jet wash uses pressurised water for general cleaning.' },
      { q: 'Is the foam chemical safe?', a: 'Yes, we use certified, non-toxic AC cleaning foam that is safe for your home.' },
      { q: 'How long does it take?', a: 'About 45–60 minutes per unit including foam dwell time.' },
      { q: 'My AC smells musty — will foam wash help?', a: 'Yes, foam wash is highly effective at eliminating the mould and bacteria that cause musty odours.' },
    ],
  },

  'ac-water-drop-solution': {
    id: 406,
    heroTitle: 'Your AC Water Drop Solution Partner',
    subtitle1: 'Fix AC water leakage and dripping issues — fast and permanently.',
    subtitle2: 'Reliable, fast and available 24/7 for your home and office needs.',
    description:
      'Water dripping from your AC is usually caused by a blocked drain pipe, a dirty air filter, or a frozen evaporator coil. Our technicians diagnose and fix the root cause of the leak, clearing blockages, cleaning coils, and ensuring the drain system works correctly.',
    includes: [
      'Leak source diagnosis',
      'Drain pan cleaning & unblocking',
      'Drain pipe flush & clear',
      'Filter cleaning',
      'Evaporator coil inspection',
      'Post-fix leak test',
    ],
    faqs: [
      { q: 'Why is my AC dripping water?', a: 'The most common causes are a blocked drain line, dirty filter, or low refrigerant causing ice build-up. Our technician will diagnose the exact cause.' },
      { q: 'Can water leaking from an AC cause damage?', a: 'Yes, prolonged leaking can damage ceilings, walls, and flooring. It is important to fix it promptly.' },
      { q: 'How long does the fix take?', a: 'Most water drop issues are resolved within 30–60 minutes.' },
      { q: 'Will the problem come back?', a: 'We fix the root cause, not just the symptom. Regular annual servicing helps prevent recurrence.' },
    ],
  },
};

// ─── Pricing helpers ─────────────────────────────────────────────────────────
function formatPrice(p) {
  if (p === undefined || p === null || p === '') return null;
  if (typeof p === 'number') return `৳${p.toLocaleString()}`;
  const s = String(p).trim();
  if (s.includes('৳') || s.includes('Tk')) return s;
  if (/^[0-9,]+$/.test(s)) {
    const n = parseInt(s.replace(/,/g, ''), 10);
    return `৳${n.toLocaleString()}`;
  }
  return s;
}

export default function ServicePage() {
  const router = useRouter();
  const { slug } = router.query;

  const [showBooking, setShowBooking] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const service = slug ? SERVICES[slug] : null;

  // Import DETAILS lazily via require so it stays client-side
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { DETAILS } = require('../../data/details');
  const details = service ? (DETAILS[service.id] || { title: '', items: [] }) : null;

  // Separate header notes from priced items
  const pricedItems = details
    ? details.items.filter(it => it.price !== '' && it.price !== null && it.price !== undefined)
    : [];
  const noteItems = details
    ? details.items.filter(it => it.price === '' || it.price === null || it.price === undefined)
    : [];

  if (!slug) {
    return null; // still loading
  }

  if (!service) {
    return (
      <>
        <Navigation onBookClick={() => setShowBooking(true)} onOpenServices={() => setShowServices(true)} />
        <main style={{ minHeight: '100vh', background: '#020814', color: '#e6fbff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, Arial' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 32, marginBottom: 12 }}>Service Not Found</h1>
            <p style={{ color: '#9aa3c6', marginBottom: 24 }}>We could not find that service page.</p>
            <button onClick={() => router.push('/')} style={{ background: '#00B4D8', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Back to Home
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation
        onBookClick={() => setShowBooking(true)}
        onOpenServices={() => setShowServices(true)}
      />

      <main className={pageStyles.pagebody}>
        {/* ── Hero — identical structure to home page ── */}
        <section className={homeStyles.hero}>
          <div className={homeStyles.heroBg}>
            <Image src="/home_page/ht_bg.png" alt={service.heroTitle} fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={homeStyles.heroOverlay} />
          <div className={homeStyles.heroContent}>
            <h1 className={homeStyles.heroTitle}>{service.heroTitle}</h1>
            <p className={homeStyles.heroSubtitle}>{service.subtitle1}</p>
            <p className={homeStyles.heroSubtitle}>{service.subtitle2}</p>
            <div className={homeStyles.heroActions}>
              <button className={homeStyles.bookBtn} onClick={() => setShowBooking(true)}>
                Book a Service
              </button>
              <a href="tel:+8801795180400" className={homeStyles.callBtn}>
                Call Now
              </a>
            </div>
          </div>
        </section>

        <div className={pageStyles.content}>
          {/* ── Description ── */}
          <section className={pageStyles.section}>
            <h2 className={pageStyles.sectionTitle}>About This Service</h2>
            <p className={pageStyles.sectionText}>{service.description}</p>
          </section>

          {/* ── What's Included ── */}
          <section className={pageStyles.section}>
            <h2 className={pageStyles.sectionTitle}>What&apos;s Included</h2>
            <ul className={pageStyles.includesList}>
              {service.includes.map((item, i) => (
                <li key={i} className={pageStyles.includesItem}>
                  <span className={pageStyles.checkIcon}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Pricing ── */}
          <section className={pageStyles.section}>
            <h2 className={pageStyles.sectionTitle}>Pricing</h2>
            {noteItems.map((note, i) => (
              <p key={i} className={pageStyles.pricingNote}>{note.label}</p>
            ))}
            <div className={pageStyles.packagesGrid}>
              {pricedItems.map((it, i) => {
                const displayPrice = formatPrice(it.price);
                return (
                  <div key={i} className={pageStyles.packageCard}>
                    <div className={pageStyles.packageLabel}>{it.label}</div>
                    <div className={pageStyles.packagePrice}>{displayPrice}</div>
                    <button
                      className={pageStyles.packageBookBtn}
                      onClick={() => setShowBooking(true)}
                    >
                      Book This Package
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── FAQs ── */}
          <section className={pageStyles.section}>
            <h2 className={pageStyles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={pageStyles.faqList}>
              {service.faqs.map((faq, i) => (
                <div key={i} className={pageStyles.faqItem}>
                  <button
                    className={pageStyles.faqQuestion}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <span className={pageStyles.faqChevron}>{openFaq === i ? '▴' : '▾'}</span>
                  </button>
                  {openFaq === i && (
                    <div className={pageStyles.faqAnswer}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Contact ── */}
        <section id="contact" className={homeStyles.contactSection}>
          <h2 className={homeStyles.contactTitle}>Ready to Get Started?</h2>
          <p className={homeStyles.contactSubtitle}>Contact HT Service today for a free consultation and quote.</p>
          <div className={homeStyles.contactCard}>
            <h3 className={homeStyles.contactCardTitle}>HT Service</h3>
            <p className={homeStyles.contactInfo}>📍 Dhaka, Bangladesh</p>
            <p className={homeStyles.contactInfo}>📞 01795180400</p>
            <p className={homeStyles.contactInfo}>✉️ info@htservice.com</p>
          </div>
          <div className={homeStyles.contactBtns}>
            <a href="tel:+8801795180400" className={homeStyles.btnPrimary}>Call Now</a>
            <a href="mailto:info@htservice.com" className={homeStyles.btnSecondary}>Email Us</a>
          </div>
        </section>

        <footer className={homeStyles.footer}>
          <p className={homeStyles.footerText}>HT Service - Honest &amp; Trusted service by Bipul</p>
          <small>&copy; 2026 HT Service. All rights reserved. Serving Dhaka, Bangladesh.</small>
        </footer>
      </main>

      {showBooking && (
        <BookingModal
          initialServiceId={service.id}
          onClose={() => setShowBooking(false)}
          onBook={() => setShowBooking(false)}
        />
      )}

      {showServices && (
        <ServicesModal
          onClose={() => setShowServices(false)}
          onSelect={() => { setShowServices(false); setShowBooking(true); }}
        />
      )}
    </>
  );
}
