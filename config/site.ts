export const siteConfig = {
  name: 'SlideGenie',
  description: 'Transform your academic content into professional presentations with AI-powered assistance',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://slidegenie.com',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/slidegenie',
    github: 'https://github.com/slidegenie',
    docs: 'https://docs.slidegenie.com',
  },
  creator: {
    name: 'SlideGenie Team',
    twitter: '@slidegenie',
  },
}

export const navConfig = {
  mainNav: [
    {
      title: 'Features',
      href: '/features',
    },
    {
      title: 'Templates',
      href: '/templates',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'About',
      href: '/about',
    },
  ],
  dashboardNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'LayoutDashboard',
    },
    {
      title: 'Presentations',
      href: '/dashboard/presentations',
      icon: 'Presentation',
    },
    {
      title: 'Templates',
      href: '/dashboard/templates',
      icon: 'FileTemplate',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'Settings',
    },
  ],
}