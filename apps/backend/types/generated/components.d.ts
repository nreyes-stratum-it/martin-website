import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsAnalyticsTabs extends Struct.ComponentSchema {
  collectionName: 'components_components_analytics_tabs';
  info: {
    description: '';
    displayName: 'analyticsTab';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface ComponentsBarStat extends Struct.ComponentSchema {
  collectionName: 'components_components_bar_stats';
  info: {
    displayName: 'BarStat';
  };
  attributes: {
    name: Schema.Attribute.String;
    value: Schema.Attribute.BigInteger;
  };
}

export interface ComponentsButtons extends Struct.ComponentSchema {
  collectionName: 'components_components_buttons';
  info: {
    description: '';
    displayName: 'button';
  };
  attributes: {
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface ComponentsCard extends Struct.ComponentSchema {
  collectionName: 'components_components_cards';
  info: {
    description: '';
    displayName: 'wrapper';
  };
  attributes: {
    cta: Schema.Attribute.Component<'components.link', false>;
    paragraph: Schema.Attribute.Text;
    preTitle: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['card', 'group']>;
  };
}

export interface ComponentsContentTab extends Struct.ComponentSchema {
  collectionName: 'components_components_content_tabs';
  info: {
    description: '';
    displayName: 'contentTab';
  };
  attributes: {
    header: Schema.Attribute.Component<'components.card', false>;
    stepElements: Schema.Attribute.Component<'components.element', true>;
  };
}

export interface ComponentsElement extends Struct.ComponentSchema {
  collectionName: 'components_components_elements';
  info: {
    description: '';
    displayName: 'element';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    message: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['card', 'accordion', 'stepper']>;
  };
}

export interface ComponentsHeadline extends Struct.ComponentSchema {
  collectionName: 'components_components_headlines';
  info: {
    description: '';
    displayName: 'Headline';
  };
  attributes: {
    tag: Schema.Attribute.Enumeration<['h1', 'h2', 'h3', 'h4', 'h5', 'h6']> &
      Schema.Attribute.Required;
    text: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface ComponentsImage extends Struct.ComponentSchema {
  collectionName: 'components_components_images';
  info: {
    description: '';
    displayName: 'Image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface ComponentsInsightCard extends Struct.ComponentSchema {
  collectionName: 'components_components_insight_cards';
  info: {
    description: '';
    displayName: 'InsightCard';
  };
  attributes: {
    media: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
    viewLink: Schema.Attribute.Component<'components.link', false>;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['simple', 'btn', 'link', 'iconLink', 'CTA']
    >;
  };
}

export interface ComponentsLogo extends Struct.ComponentSchema {
  collectionName: 'components_components_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required;
  };
}

export interface ComponentsMember extends Struct.ComponentSchema {
  collectionName: 'components_components_members';
  info: {
    description: '';
    displayName: 'Member';
  };
  attributes: {
    contactNumber: Schema.Attribute.String;
    email: Schema.Attribute.String;
    name: Schema.Attribute.String;
    networks: Schema.Attribute.Component<'components.link', true>;
    position: Schema.Attribute.String;
    profilePicture: Schema.Attribute.Media<'images', true>;
  };
}

export interface ComponentsParagraph extends Struct.ComponentSchema {
  collectionName: 'components_components_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
  };
  attributes: {
    text: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface ComponentsRoadMapTabs extends Struct.ComponentSchema {
  collectionName: 'components_components_road_map_tabs';
  info: {
    description: '';
    displayName: 'roadMapTab';
  };
  attributes: {
    header: Schema.Attribute.Component<'components.card', false>;
    stepElements: Schema.Attribute.Component<'components.element', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsStat extends Struct.ComponentSchema {
  collectionName: 'components_components_stats';
  info: {
    description: '';
    displayName: 'stat';
  };
  attributes: {
    customValue: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images', true>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    symbol: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['chart', 'stat', 'simple']>;
    value: Schema.Attribute.String;
  };
}

export interface ComponentsTabContent extends Struct.ComponentSchema {
  collectionName: 'components_components_tab_contents';
  info: {
    displayName: 'TabContent';
  };
  attributes: {
    paragraph: Schema.Attribute.Text;
    statistic: Schema.Attribute.Relation<
      'oneToOne',
      'api::market-statistic.market-statistic'
    >;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsTestimonialCard extends Struct.ComponentSchema {
  collectionName: 'components_components_testimonial_cards';
  info: {
    displayName: 'TestimonialCard';
  };
  attributes: {
    author: Schema.Attribute.String;
    authorPicture: Schema.Attribute.Media<'images'>;
    authorTitle: Schema.Attribute.String;
    testimonial: Schema.Attribute.Text;
  };
}

export interface GlobalsFooter extends Struct.ComponentSchema {
  collectionName: 'components_globals_footers';
  info: {
    description: '';
    displayName: 'FooterV1';
  };
  attributes: {
    contact: Schema.Attribute.Component<'components.card', false>;
    legal: Schema.Attribute.Component<'components.link', true>;
    logo: Schema.Attribute.Media<'images'>;
    services: Schema.Attribute.Component<'components.link', true>;
  };
}

export interface GlobalsHeader extends Struct.ComponentSchema {
  collectionName: 'components_globals_headers';
  info: {
    displayName: 'HeaderV1';
  };
  attributes: {
    email: Schema.Attribute.String;
    links: Schema.Attribute.Component<'components.link', true>;
    location: Schema.Attribute.String;
    logo: Schema.Attribute.Component<'components.logo', false>;
  };
}

export interface SectionsBusinessBenefitsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_business_benefits_sections';
  info: {
    description: '';
    displayName: 'BusinessBenefitsSection';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'components.element', true>;
    manager: Schema.Attribute.Component<'components.member', false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCompetitiveAdventageSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_competitive_adventage_sections';
  info: {
    description: '';
    displayName: 'CompetitiveAdvantageSection';
  };
  attributes: {
    elements: Schema.Attribute.Component<'components.element', true>;
    infoGroup: Schema.Attribute.Component<'components.card', false>;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    description: '';
    displayName: 'HeroSection';
    icon: 'stack';
  };
  attributes: {
    bgMedia: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    card: Schema.Attribute.Component<'components.card', false>;
    stats: Schema.Attribute.Component<'components.stat', true>;
  };
}

export interface SectionsInsightsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_insights_sections';
  info: {
    description: '';
    displayName: 'InsightsSection';
  };
  attributes: {
    insights: Schema.Attribute.Component<'components.insight-card', true>;
    link: Schema.Attribute.Component<'components.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsInspirationQuoteSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_inspiration_quote_sections';
  info: {
    description: '';
    displayName: 'inspirationQuoteSection';
  };
  attributes: {
    bgMedia: Schema.Attribute.Media<'images'>;
    inspirationQuotes: Schema.Attribute.Component<'components.element', true>;
  };
}

export interface SectionsInternationalAccessSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_international_access_sections';
  info: {
    description: '';
    displayName: 'InternationalAccessSection';
  };
  attributes: {
    accordionElements: Schema.Attribute.Component<'components.element', true>;
    infoGroup: Schema.Attribute.Component<'components.card', false>;
  };
}

export interface SectionsMarketChallengeSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_market_challenge_sections';
  info: {
    description: '';
    displayName: 'MarketChallengeSection';
  };
  attributes: {
    marketTabs: Schema.Attribute.Component<'components.tab-content', true>;
  };
}

export interface SectionsOverviewSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_overview_sections';
  info: {
    displayName: 'OverviewSection';
  };
  attributes: {
    grid_type: Schema.Attribute.String;
    headline: Schema.Attribute.Component<'components.headline', false>;
    paragraph: Schema.Attribute.Component<'components.paragraph', false>;
  };
}

export interface SectionsPartnershipValuesSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_partnership_values_sections';
  info: {
    description: '';
    displayName: 'PartnershipValuesSection';
  };
  attributes: {
    cardElements: Schema.Attribute.Component<'components.element', true>;
    infoGroup: Schema.Attribute.Component<'components.card', false>;
  };
}

export interface SectionsRoadMapSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_road_map_sections';
  info: {
    description: '';
    displayName: 'RoadMapSection';
  };
  attributes: {
    tabs: Schema.Attribute.Component<'components.road-map-tabs', true>;
  };
}

export interface SectionsSectionCertifications extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_certifications';
  info: {
    description: '';
    displayName: 'Section Certifications';
  };
  attributes: {
    headline: Schema.Attribute.Component<'components.headline', false>;
    subline: Schema.Attribute.RichText;
  };
}

export interface SectionsTalentSolutionsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_talent_solutions_sections';
  info: {
    description: '';
    displayName: 'TalentSolutionsSection';
  };
  attributes: {
    cards: Schema.Attribute.Component<'components.card', true>;
  };
}

export interface SectionsTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials_sections';
  info: {
    description: '';
    displayName: 'TestimonialsSection';
  };
  attributes: {
    infoGroup: Schema.Attribute.Component<'components.card', false>;
    testimonials: Schema.Attribute.Component<
      'components.testimonial-card',
      true
    >;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'Seo';
    icon: 'arrowUp';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    keywords: Schema.Attribute.String & Schema.Attribute.Required;
    openGraph: Schema.Attribute.JSON;
    schema: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    twitterCard: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.analytics-tabs': ComponentsAnalyticsTabs;
      'components.bar-stat': ComponentsBarStat;
      'components.buttons': ComponentsButtons;
      'components.card': ComponentsCard;
      'components.content-tab': ComponentsContentTab;
      'components.element': ComponentsElement;
      'components.headline': ComponentsHeadline;
      'components.image': ComponentsImage;
      'components.insight-card': ComponentsInsightCard;
      'components.link': ComponentsLink;
      'components.logo': ComponentsLogo;
      'components.member': ComponentsMember;
      'components.paragraph': ComponentsParagraph;
      'components.road-map-tabs': ComponentsRoadMapTabs;
      'components.stat': ComponentsStat;
      'components.tab-content': ComponentsTabContent;
      'components.testimonial-card': ComponentsTestimonialCard;
      'globals.footer': GlobalsFooter;
      'globals.header': GlobalsHeader;
      'sections.business-benefits-section': SectionsBusinessBenefitsSection;
      'sections.competitive-adventage-section': SectionsCompetitiveAdventageSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.insights-section': SectionsInsightsSection;
      'sections.inspiration-quote-section': SectionsInspirationQuoteSection;
      'sections.international-access-section': SectionsInternationalAccessSection;
      'sections.market-challenge-section': SectionsMarketChallengeSection;
      'sections.overview-section': SectionsOverviewSection;
      'sections.partnership-values-section': SectionsPartnershipValuesSection;
      'sections.road-map-section': SectionsRoadMapSection;
      'sections.section-certifications': SectionsSectionCertifications;
      'sections.talent-solutions-section': SectionsTalentSolutionsSection;
      'sections.testimonials-section': SectionsTestimonialsSection;
      'seo.seo': SeoSeo;
    }
  }
}
