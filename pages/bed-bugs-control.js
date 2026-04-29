import fs from 'fs';
import path from 'path';
import ServiceTemplate from '../components/ServiceTemplate';

export default function BedBugsControl({ service, category }) {
  return <ServiceTemplate service={service} category={category} />;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'info', 'services.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    for (const bs of (data.business_services || [])) {
      for (const sc of (bs.subcategories || [])) {
        if (sc && sc.slug === 'bed-bugs-control') {
          return { props: { service: sc, category: bs.category || '' } };
        }
      }
    }
  } catch (e) {}
  return { notFound: true };
}
