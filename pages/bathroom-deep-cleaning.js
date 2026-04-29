import fs from 'fs';
import path from 'path';
import ServiceTemplate from '../components/ServiceTemplate';

export default function BathroomDeepCleaning({ service, category }) {
  return <ServiceTemplate service={service} category={category} />;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'info', 'services.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    for (const bs of (data.business_services || [])) {
      for (const sc of (bs.subcategories || [])) {
        if (sc && sc.slug === 'bathroom-deep-cleaning') {
          return { props: { service: sc, category: bs.category || '' } };
        }
      }
    }
  } catch (e) {}
  return { notFound: true };
}
// The rest of this file was a duplicated homepage-based component
// removed to avoid duplicate default exports. The static page
// above uses `ServiceTemplate` and `getStaticProps` to render
// the bathroom deep cleaning service.
