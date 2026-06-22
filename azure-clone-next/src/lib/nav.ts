/**
 * Site navigation — mirrors the live azure.folio3.com mega-menu exactly:
 * SERVICES · SOLUTIONS · INDUSTRY · RESOURCES · CONTACT US.
 * Top-level dropdown triggers use href "#" (live behaviour); Contact Us is a
 * direct link. "Copilot Agent" is a nested submenu under Services.
 */
export type NavChild = { label: string; href: string; children?: NavChild[] };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: 'Services',
    href: '#',
    children: [
      { label: 'Azure Cloud Services', href: '/azure-cloud-service/' },
      {
        label: 'Azure Data Analytics',
        href: '/azure-data-analytics/',
        children: [
          { label: 'Microsoft Fabric Services', href: '/microsoft-fabric-services/' },
          { label: 'Data Integration As A Service', href: '/data-integration-as-a-service/' },
          { label: 'Data Visualization as a service', href: '/azure-data-analytics/data-visualization-as-a-service/' },
          { label: 'Data Warehousing as a Service', href: '/data-warehousing-as-a-service/' },
        ],
      },
      { label: 'Microsoft Copilot Consulting', href: '/data-science-ai/microsoft-copilot-consulting/' },
      { label: 'Copilot Scenario Library', href: '/ai-scenario-library/' },
      {
        label: 'Copilot Agent',
        href: '#',
        children: [
          { label: 'RecruitFlow Copilot', href: '/ai-powered-solutions/copilot-for-recruitment/' },
          { label: 'SmartExpense Agent', href: '/ai-agents/smartexpense-agent/' },
          { label: 'ITAsset Copilot', href: '/ai-agents/it-asset-management-agent/' },
          { label: 'KubeMonitor Copilot', href: '/ai-agents/kubemonitor-agent/' },
          { label: 'Zammad Ticketing Copilot', href: '/ai-agents/ai-powered-ticketing-and-customer-service-agent/' },
        ],
      },
      { label: 'Microsoft Power Platform', href: '/microsoft-power-platform-services/' },
      { label: 'Azure Managed Services', href: '/azure-managed-services/' },
    ],
  },
  {
    label: 'Solutions',
    href: '#',
    children: [{ label: 'Intellifabric', href: '/solution/intellifabric/' }],
  },
  {
    label: 'Industry',
    href: '#',
    children: [
      { label: 'Logistics and Transport', href: '/azure-for-logistics-and-transport/' },
      { label: 'Healthcare', href: '/azure-for-healthcare/' },
      { label: 'Retail', href: '/azure-for-retail/' },
      { label: 'Manufacturing', href: '/azure-for-manufacturing/' },
      { label: 'Construction', href: '/azure-for-construction/' },
    ],
  },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Success Stories', href: '/case-studies/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'About Us', href: '/about-us/' },
    ],
  },
  { label: 'Contact Us', href: '/contact-us/' },
];
