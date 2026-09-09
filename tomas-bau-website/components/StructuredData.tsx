import { site, services, mapsLink, faqs, description } from '@/lib/site';

/** LocalBusiness + the service catalogue, emitted as one connected graph. */
export default function StructuredData() {
  const businessId = `${site.url}/#business`;

  const graph = [
    {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
      '@id': businessId,
      name: site.name,
      legalName: site.legalName,
      description,
      url: site.url,
      telephone: site.phone.e164,
      email: site.email,
      image: `${site.url}/images/og-image.jpg`,
      logo: `${site.url}/images/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        postalCode: site.address.postalCode,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      hasMap: mapsLink,
      openingHoursSpecification: site.openingHours.schema,
      sameAs: [site.instagram.url],
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: site.geo.lat,
          longitude: site.geo.lng,
        },
        geoRadius: site.serviceRadiusKm * 1000,
        description: `${site.address.city} und ${site.serviceRadiusKm} km Umgebung`,
      },
      knowsLanguage: ['de-DE'],
      slogan: site.tagline,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Bodenleger- und Reinigungsleistungen',
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            '@id': `${site.url}/#service-${s.slug}`,
            name: s.title,
            description: s.body,
            serviceType: s.title,
            provider: { '@id': businessId },
            areaServed: {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: site.geo.lat,
                longitude: site.geo.lng,
              },
              geoRadius: site.serviceRadiusKm * 1000,
            },
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'de-DE',
      publisher: { '@id': businessId },
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'),
      }}
    />
  );
}

