import {
  FiCpu,
  FiZap,
  FiDatabase,
  FiTable,
  FiLayout,
  FiBarChart2,
  FiGlobe,
  FiLayers,
  FiSmartphone,
  FiServer,
  FiShare2,
  FiMessageSquare,
  FiMail,
  FiAlertCircle,
  FiClock,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiMaximize,
  FiSearch,
  FiCheckCircle
} from 'react-icons/fi';

export const servicesData = [
  {
    id: 'business-process-automation',
    icon: FiZap,
    title: 'Business Process Automation',
    shortDesc: 'Optimize operational efficiency and eliminate manual bottlenecks.',
    fullDesc: 'Transform your business operations with our end-to-end automation solutions.',
    image: '/services/images/Business_front.png',
    banner: '/services/images/business_banner.png',
    benefits: [
      'Reduced Operational Costs',
      'Elimination of Manual Errors',
      'Real-time Workflow Visibility',
      'Scalable Process Management'
    ],
    detailContent: {
      whatIsIt: [
        "Business Process Automation (BPA) replaces slow, error-prone manual tasks with streamlined digital workflows. We analyze your operations to find bottlenecks and continuously optimize them, ensuring your team has the time to focus on strategic growth rather than repetitive data entry."
      ],
      problems: [
        { icon: FiClock, title: "Time-Consuming Tasks", description: "Employees spend hours on manual data entry and repetitive approvals." },
        { icon: FiAlertCircle, title: "High Error Rates", description: "Human intervention in data transfers leads to costly mistakes and rework." },
        { icon: FiSearch, title: "Lack of Visibility", description: "Management lacks clear oversight into process status and bottlenecks." }
      ],
      howWeHelp: [
        { problem: "Manual Repetition", solution: "Automated Workflows", outcome: "Faster processing times and reclaimed employee hours." },
        { problem: "Human Errors", solution: "Rule-Based Logic", outcome: "Eliminated mistakes and improved data reliability." },
        { problem: "Blind Spots", solution: "Real-Time Tracking", outcome: "Complete transparency and better reporting visibility." }
      ],
      processDiagram: [
        { step: 1, title: "Discovery & Audit", description: "We map your existing processes to uncover friction points." },
        { step: 2, title: "Design Architecture", description: "We outline an automated workflow tailored to your ecosystem." },
        { step: 3, title: "Implementation", description: "We build and connect the automated scripts across your tools." },
        { step: 4, title: "Optimization", description: "We monitor performance and refine rules for continuous improvement." }
      ],
      useCases: [
        { title: "Invoice Processing", scenario: "Automatically extracting data from incoming invoices and syncing it securely to accounting software." },
        { title: "Employee Onboarding", scenario: "Triggering a sequence of account creations and welcome emails when a new hire is added." }
      ]
    }
  },
  {
    id: 'ai-agents-chatbots',
    icon: FiCpu,
    title: 'AI Agents & ChatBots',
    shortDesc: 'Advanced conversational AI for automated support and lead generation.',
    fullDesc: 'Leverage the power of Generative AI with our custom AI Agents and Chatbots.',
    image: '/services/images/AI_Front_image.png',
    banner: '/services/images/updated_ai_banner.png',
    benefits: [
      '24/7 Intelligent Customer Support',
      'Context-Aware Conversations',
      'Seamless CRM Integration',
      'Multilingual Support Capabilities'
    ],
    detailContent: {
      whatIsIt: [
        "Our custom AI Agents and Chatbots use generative AI to deliver human-like, context-aware conversations. We build systems uniquely trained on your business data to handle customer inquiries, capture leads, and provide instant resolutions across platforms."
      ],
      problems: [
        { icon: FiUsers, title: "Overwhelmed Support", description: "Human agents are bogged down by repetitive, simple questions." },
        { icon: FiClock, title: "Delayed Responses", description: "Customers face long wait times during off-hours or peak seasons." },
        { icon: FiTrendingUp, title: "Lost Opportunities", description: "Potential leads bounce off your website because they can't find answers quickly." }
      ],
      howWeHelp: [
        { problem: "High Ticket Volume", solution: "Instant AI Resolution", outcome: "Reduced manual effort and freed-up human agents." },
        { problem: "Off-Hour Delays", solution: "24/7 Availability", outcome: "Continuous support resulting in higher customer satisfaction." },
        { problem: "Missed Leads", solution: "Smart Qualification", outcome: "Automated lead capture flowing seamlessly into your CRM." }
      ],
      processDiagram: [
        { step: 1, title: "Bot Strategy", description: "Defining the agent's persona and primary objectives." },
        { step: 2, title: "Knowledge Training", description: "Ingesting your FAQs, documents, and historical data." },
        { step: 3, title: "Deployment", description: "Integrating across your website, WhatsApp, and internal platforms." },
        { step: 4, title: "Refinement", description: "Reviewing conversational logs to enhance accuracy over time." }
      ],
      useCases: [
        { title: "E-Commerce Support", scenario: "Answering product queries, checking order statuses, and guiding users to checkout." },
        { title: "B2B Lead Generation", scenario: "Qualifying website visitors and scheduling sales meetings directly on calendars." }
      ]
    }
  },
  {
    id: 'data-management',
    icon: FiDatabase,
    title: 'Data Management',
    shortDesc: 'Secure collection, storage, and real-time syncing of enterprise data.',
    fullDesc: 'Establish a rock-solid data foundation with our comprehensive Data Management services.',
    image: '/services/images/datamanagement_front.png',
    banner: '/services/images/updated_datamanagement_banner.png',
    benefits: [
      'Scalable Data Architecture',
      'Automated ETL Pipelines',
      'Real-time Synchronization',
      'Enhanced Security & Compliance'
    ],
    detailContent: {
      whatIsIt: [
        "We provide end-to-end data lifecycle management, transforming fragmented information into a unified, secure asset. From robust ETL pipelines to synchronized cloud storage, we ensure your business applications run on accurate, accessible data."
      ],
      problems: [
        { icon: FiLayout, title: "Data Silos", description: "Critical information is trapped in disconnected departmental software." },
        { icon: FiAlertCircle, title: "Inaccurate Records", description: "Duplicate entries and outdated files lead to poor decision-making." },
        { icon: FiShield, title: "Security Risks", description: "Lack of centralized governance exposes sensitive data to breaches." }
      ],
      howWeHelp: [
        { problem: "Fragmented Systems", solution: "Centralized Data Warehouses", outcome: "A single, reliable source of truth for the entire company." },
        { problem: "Manual Updates", solution: "Automated Pipelines", outcome: "Real-time synchronization across all platforms." },
        { problem: "Vulnerability", solution: "Strict Governance", outcome: "Enhanced security controls and regulatory compliance." }
      ],
      processDiagram: [
        { step: 1, title: "Data Audit", description: "Evaluating sources, quality, and current storage infrastructure." },
        { step: 2, title: "Schema Design", description: "Creating scalable data models for efficient querying." },
        { step: 3, title: "Pipeline Build", description: "Scripting automated extraction, transformation, and loading (ETL)." },
        { step: 4, title: "Security Config", description: "Applying access controls and encryption protocols." }
      ],
      useCases: [
        { title: "Multi-Platform Sync", scenario: "Connecting an e-commerce storefront with an ERP to ensure inventory levels are always accurate." },
        { title: "Historical Archiving", scenario: "Migrating years of legacy records into a secure, easily searchable cloud database." }
      ]
    }
  },
  {
    id: 'mis-systems-google-sheets',
    icon: FiTable,
    title: 'MIS Systems (Google Sheets)',
    shortDesc: 'Powerful management information systems built on Google Sheets.',
    fullDesc: 'Leverage the flexibility of Google Sheets to build sophisticated Management Information Systems (MIS).',
    image: '/services/images/mis_front.png',
    banner: '/services/images/mis_banner.png',
    benefits: [
      'Cost-Effective Custom Tools',
      'Easy Team Collaboration',
      'Automated Data Aggregation',
      'User-Friendly Interfaces'
    ],
    detailContent: {
      whatIsIt: [
        "We supercharge Google Sheets using Apps Script to build professional Management Information Systems (MIS). You get the tracking power and customized automation of expensive enterprise software, built entirely within the familiar Google ecosystem."
      ],
      problems: [
        { icon: FiAlertCircle, title: "Spreadsheet Chaos", description: "Teams struggle with overwritten data, broken formulas, and version control issues." },
        { icon: FiTrendingUp, title: "High SaaS Costs", description: "Paying exorbitant monthly fees for specialized software that teams barely use." },
        { icon: FiClock, title: "Manual Reporting", description: "Consolidating monthly figures requires hours of tedious copy-pasting." }
      ],
      howWeHelp: [
        { problem: "Broken Formulas", solution: "Locked Workflows & Scripts", outcome: "Protected data integrity and stable calculations." },
        { problem: "Expensive Software", solution: "Apps Script Customization", outcome: "Cost-effective, highly tailored tracking solutions." },
        { problem: "Tedious Aggregation", solution: "Automated Dashboards", outcome: "Instant, accurate reports generated without manual effort." }
      ],
      processDiagram: [
        { step: 1, title: "Requirement Gathering", description: "Understanding the exact KPIs and data flows required." },
        { step: 2, title: "Structural Design", description: "Building an intuitive, relational sheet architecture." },
        { step: 3, title: "Scripting Logic", description: "Applying custom code for automations and cross-sheet triggers." },
        { step: 4, title: "Handover & Training", description: "Delivering the system and empowering your team to use it." }
      ],
      useCases: [
        { title: "Sales CRM Tracker", scenario: "A shared hub where reps log calls and managers see automated weekly performance roll-ups." },
        { title: "Inventory Management", scenario: "Dynamic sheets that automatically update stock levels and flag items needing reorder." }
      ]
    }
  },
  {
    id: 'intrasites-google-sites',
    icon: FiLayout,
    title: 'Intrasites / Google Sites',
    shortDesc: 'Secure internal portals and knowledge hubs for your teams.',
    fullDesc: 'Improve internal communication and knowledge sharing with custom Intrasites built on Google Sites.',
    image: '/services/images/updated_google_front2.jpg',
    banner: '/services/images/google_banner.png',
    benefits: [
      'Secure Access Control',
      'Centralized Resource Hub',
      'Mobile-Responsive Design',
      'Zero Maintenance Hosting'
    ],
    detailContent: {
      whatIsIt: [
        "We design secure, premium internal communication portals using Google Sites. These custom Intrasites act as the digital heartbeat of your organization, centralizing company wikis, project boards, and employee resources in one highly accessible space."
      ],
      problems: [
        { icon: FiSearch, title: "Lost Documents", description: "Employees waste time searching through chaotic shared drives for policies and assets." },
        { icon: FiUsers, title: "Poor Communication", description: "Important company updates get buried in email threads or ignored in chat apps." },
        { icon: FiShield, title: "Access Issues", description: "Managing permissions for scattered files is an administrative nightmare." }
      ],
      howWeHelp: [
        { problem: "Scattered Files", solution: "Centralized Knowledge Hubs", outcome: "Rapid information retrieval and improved onboarding." },
        { problem: "Buried Updates", solution: "Dedicated News Portals", outcome: "Clearer internal communication and aligned teams." },
        { problem: "Permission Chaos", solution: "Integrated Workspace Access", outcome: "Secure, role-based visibility managed effortlessly." }
      ],
      processDiagram: [
        { step: 1, title: "Content Audit", description: "We review and organize your existing internal documents." },
        { step: 2, title: "UI/UX Layout", description: "Designing a clean, intuitive interface for the portal." },
        { step: 3, title: "Development", description: "Building the site and embedding necessary drives and calendars." },
        { step: 4, title: "Launch", description: "Deploying the portal with granular access controls." }
      ],
      useCases: [
        { title: "Employee Onboarding", scenario: "A dedicated portal guiding new hires through paperwork, training videos, and company culture." },
        { title: "Marketing Asset Hub", scenario: "A secure repository where sales teams can quickly download up-to-date logos and presentation decks." }
      ]
    }
  },
  {
    id: 'looker-studio-dashboards',
    icon: FiBarChart2,
    title: 'Looker Studio Dashboards',
    shortDesc: 'Real-time BI visualization and interactive KPI tracking.',
    fullDesc: 'Turn raw data into beautiful, interactive dashboards with Looker Studio.',
    image: '/services/images/dashboard_front.png',
    banner: '/services/images/dashboard_banner.png',
    benefits: [
      'Real-time Data Visualization',
      'Interactive KPI Filters',
      'Cross-Platform Data Blending',
      'Automated Email Delivery'
    ],
    detailContent: {
      whatIsIt: [
        "We transform complex data streams into clean, interactive Looker Studio dashboards. By connecting all your marketing, sales, and operational channels into one command center, we empower decision-makers to act on real-time visual insights rather than dense spreadsheets."
      ],
      problems: [
        { icon: FiAlertCircle, title: "Data Overload", description: "Stakeholders are overwhelmed by raw numbers lacking context." },
        { icon: FiClock, title: "Delayed Reporting", description: "Compiling weekly performance reports takes days of manual effort." },
        { icon: FiLayout, title: "Fragmented Metrics", description: "Advertising, sales, and web data live in completely different systems." }
      ],
      howWeHelp: [
        { problem: "Unclear Data", solution: "Visual Storytelling", outcome: "Clearer insights that drive immediate strategic decisions." },
        { problem: "Manual Compilation", solution: "Automated Dashboards", outcome: "Continuous, zero-effort reporting visibility." },
        { problem: "Scattered Tools", solution: "Cross-Platform Blending", outcome: "A unified view of your entire business performance." }
      ],
      processDiagram: [
        { step: 1, title: "KPI Definition", description: "Aligning on the core metrics that drive your business success." },
        { step: 2, title: "Data Connections", description: "Linking SQL databases, ad platforms, and CRM systems." },
        { step: 3, title: "Visualization Design", description: "Crafting charts, scorecards, and filters for optimal readability." },
        { step: 4, title: "Review & Polish", description: "Refining the dashboard based on user feedback and utility." }
      ],
      useCases: [
        { title: "Executive Overview", scenario: "A high-level dashboard summarizing company-wide revenue, margins, and goals." },
        { title: "Marketing ROI", scenario: "Tracking ad spend across multiple channels against actual sales generated in real-time." }
      ]
    }
  },
  {
    id: 'professional-websites',
    icon: FiGlobe,
    title: 'Professional Websites',
    shortDesc: 'High-end branding and SEO-optimized web experiences.',
    fullDesc: 'Elevate your digital presence with a premium, professional website.',
    image: '/services/images/website_front.png',
    banner: '/services/images/website_banner.png',
    benefits: [
      'SEO-First Architecture',
      'Ultra-Fast Load Times',
      'Conversion-Optimized UI',
      'Modern, Responsive Design'
    ],
    detailContent: {
      whatIsIt: [
        "We engineer high-performance, responsive websites that serve as your premier digital storefront. Combining stunning aesthetics with deep technical SEO optimization, we ensure your site not only looks exceptional but actively converts visitors into customers."
      ],
      problems: [
        { icon: FiTrendingUp, title: "Low Conversion Rates", description: "Traffic arrives but leaves without engaging or purchasing." },
        { icon: FiClock, title: "Poor Performance", description: "Slow loading speeds frustrate users and hurt search engine rankings." },
        { icon: FiSmartphone, title: "Outdated Design", description: "A non-responsive layout that looks broken on mobile devices." }
      ],
      howWeHelp: [
        { problem: "Low Engagement", solution: "Strategic UX Design", outcome: "Intuitive user journeys that guide visitors to take action." },
        { problem: "Slow Speeds", solution: "Modern Architecture", outcome: "Lightning-fast performance and improved SEO rankings." },
        { problem: "Mobile Issues", solution: "Responsive Frameworks", outcome: "A flawless experience across desktops, tablets, and phones." }
      ],
      processDiagram: [
        { step: 1, title: "Brand Discovery", description: "Analyzing your market positioning and visual identity." },
        { step: 2, title: "Prototyping", description: "Creating clickable wireframes and high-fidelity mockups." },
        { step: 3, title: "Development", description: "Coding the site with clean, scalable, and optimized architecture." },
        { step: 4, title: "Launch & SEO", description: "Deploying to production and submitting sitemaps to search engines." }
      ],
      useCases: [
        { title: "Corporate Identity", scenario: "A sleek, professional site for a consulting firm looking to establish premium trust." },
        { title: "Service Portfolios", scenario: "An interactive showcase for a creative agency highlighting past work and client testimonials." }
      ]
    }
  },
  {
    id: 'scalable-web-apps',
    icon: FiLayers,
    title: 'Scalable Web Apps',
    shortDesc: 'Custom SaaS and complex internal business applications.',
    fullDesc: 'Solve unique business challenges with custom-built web applications.',
    image: '/services/images/webapp_front.png',
    banner: '/services/images/webapp_banner.png',
    benefits: [
      'Custom Logic Implementation',
      'Scalable Cloud Backend',
      'Role-Based Access Control',
      'Third-Party API Integration'
    ],
    detailContent: {
      whatIsIt: [
        "We develop custom, high-performance web applications tailored specifically to your operational demands. Using modern frameworks, we build resilient SaaS platforms, intricate customer portals, and internal tools that generic off-the-shelf software simply cannot match."
      ],
      problems: [
        { icon: FiAlertCircle, title: "Rigid Software", description: "Off-the-shelf tools force you to change your processes to fit their limitations." },
        { icon: FiTrendingUp, title: "Scaling Bottlenecks", description: "Current systems crash or slow down under heavy user traffic." },
        { icon: FiShield, title: "Complex Access Needs", description: "Inability to properly manage multi-tier user roles and permissions." }
      ],
      howWeHelp: [
        { problem: "Process Friction", solution: "Custom Development", outcome: "Software built exactly to support your unique workflows." },
        { problem: "Performance Drops", solution: "Cloud-Native Architecture", outcome: "Seamless scaling to handle growing business demands." },
        { problem: "Security Gaps", solution: "Role-Based Logic", outcome: "Granular control over who sees and edits sensitive data." }
      ],
      processDiagram: [
        { step: 1, title: "Scoping", description: "Deep diving into complex logic, user stories, and feature requirements." },
        { step: 2, title: "Architecture Design", description: "Planning database schemas and secure API pathways." },
        { step: 3, title: "Agile Sprints", description: "Iterative coding with regular demos and continuous feedback." },
        { step: 4, title: "DevOps & Deployment", description: "Establishing CI/CD pipelines for secure, reliable updates." }
      ],
      useCases: [
        { title: "Custom SaaS Product", scenario: "Building a multi-tenant platform with subscription logic for specialized B2B services." },
        { title: "Client Portals", scenario: "A secure environment where your clients can log in to view project statuses and invoices." }
      ]
    }
  },
  {
    id: 'mobile-applications',
    icon: FiSmartphone,
    title: 'Mobile Applications',
    shortDesc: 'Native-feel Android and iOS apps for your business.',
    fullDesc: 'Reach your audience everywhere with high-performance mobile applications.',
    image: '/services/images/mobile_front.png',
    banner: '/services/images/mobile_banner.png',
    benefits: [
      'Cross-Platform Development',
      'Intuitive User UX/UI',
      'Push Notification Support',
      'Offline Data Accessibility'
    ],
    detailContent: {
      whatIsIt: [
        "We build high-performance, native-feel mobile applications for iOS and Android. Our cross-platform solutions provide an exceptional mobile-first interface, allowing you to engage customers directly or empower a remote workforce with custom tools."
      ],
      problems: [
        { icon: FiGlobe, title: "Limited Reach", description: "Failing to engage the rapidly growing mobile-first consumer segment." },
        { icon: FiAlertCircle, title: "Disjointed Experience", description: "Mobile websites lack the smooth interactions and hardware features of apps." },
        { icon: FiUsers, title: "Disconnected Teams", description: "Field workers struggle to access or log data without a stable desktop." }
      ],
      howWeHelp: [
        { problem: "Low Engagement", solution: "App Store Presence", outcome: "Increased brand visibility and direct customer access." },
        { problem: "Clunky UX", solution: "Native-Feel Design", outcome: "Smooth, intuitive interactions leveraging device hardware." },
        { problem: "Offline Hurdles", solution: "Local Syncing", outcome: "Uninterrupted productivity for remote and field staff." }
      ],
      processDiagram: [
        { step: 1, title: "UX Wireframing", description: "Mapping out gesture-based navigation and screen flows." },
        { step: 2, title: "Development", description: "Coding the front-end interface and connecting backend databases." },
        { step: 3, title: "Beta Testing", description: "Rigorously evaluating performance across various devices and OS versions." },
        { step: 4, title: "Store Submission", description: "Managing compliance and publishing to Apple and Google stores." }
      ],
      useCases: [
        { title: "Consumer E-Commerce", scenario: "A branded shopping app with push notifications for sales and updates." },
        { title: "Field Service Tools", scenario: "An internal app allowing technicians to log repairs offline and sync later." }
      ]
    }
  },
  {
    id: 'erp-systems-aws',
    icon: FiServer,
    title: 'ERP Systems on AWS',
    shortDesc: 'Cloud-hosted enterprise resource planning for modern scale.',
    fullDesc: 'Modernize your enterprise management with cloud-hosted ERP systems on AWS.',
    image: '/services/images/aws_front.png',
    banner: '/services/images/aws_banner.png',
    benefits: [
      'High Availability & Uptime',
      'Automated Cloud Backups',
      'Global Scaling Architecture',
      'Enterprise-Grade Security'
    ],
    detailContent: {
      whatIsIt: [
        "We migrate, build, and optimize robust Enterprise Resource Planning (ERP) systems hosted on AWS. By leveraging top-tier cloud infrastructure, we replace vulnerable on-site servers with highly secure, globally accessible management tools."
      ],
      problems: [
        { icon: FiServer, title: "On-Site Liabilities", description: "Maintaining physical servers is costly, vulnerable, and prone to hardware failure." },
        { icon: FiTrendingUp, title: "Rigid Scaling", description: "Adding more capacity for seasonal surges requires expensive new hardware purchases." },
        { icon: FiGlobe, title: "Localized Access", description: "Remote employees struggle to access core systems securely from out-of-office networks." }
      ],
      howWeHelp: [
        { problem: "Hardware Risks", solution: "AWS Cloud Infrastructure", outcome: "Unmatched reliability and automated disaster recovery." },
        { problem: "High Capex", solution: "Elastic Scaling", outcome: "Cost-efficient performance that adapts dynamically to your needs." },
        { problem: "Access Barriers", solution: "Global Cloud Deployment", outcome: "Secure, high-speed access for approved users anywhere in the world." }
      ],
      processDiagram: [
        { step: 1, title: "Infrastructure Audit", description: "Evaluating current server loads and legacy software dependencies." },
        { step: 2, title: "Cloud Architecture", description: "Designing an AWS Virtual Private Cloud tailored for security." },
        { step: 3, title: "Migration", description: "Safely transferring critical ERP data with minimal downtime." },
        { step: 4, title: "Hardening", description: "Implementing strict IAM controls, encryption, and continuous monitoring." }
      ],
      useCases: [
        { title: "Legacy Modernization", scenario: "Moving an outdated local manufacturing ERP to AWS to enable remote access." },
        { title: "High-Volume Logistics", scenario: "Ensuring an inventory system remains perfectly responsive during holiday spikes." }
      ]
    }
  },
  {
    id: 'api-system-integrations',
    icon: FiShare2,
    title: 'API & System Integrations',
    shortDesc: 'Seamless data flow and connectivity between your platforms.',
    fullDesc: 'Eliminate data silos by connecting all your software platforms.',
    image: '/services/images/api_front.jpg',
    banner: '/services/images/api_banner.png',
    benefits: [
      'Real-time Data Syncing',
      'Custom Webhook Handling',
      'Middleware Development',
      'Error-Resilient Connections'
    ],
    detailContent: {
      whatIsIt: [
        "We build customized digital bridges between your software platforms. By developing robust API integrations and middleware, we ensure your CRM, accounting tools, and external services automatically communicate and synchronize in real-time."
      ],
      problems: [
        { icon: FiAlertCircle, title: "Disconnected Tools", description: "Essential software platforms operate in isolation, lacking native connectivity." },
        { icon: FiClock, title: "Manual Data Entry", description: "Staff must manually copy information from one system to another." },
        { icon: FiLayout, title: "Sync Errors", description: "Poor integrations lead to dropped data or duplicate records." }
      ],
      howWeHelp: [
        { problem: "Data Isolation", solution: "Custom API Connectors", outcome: "A deeply unified and synchronized software ecosystem." },
        { problem: "Double Entry", solution: "Automated Triggers", outcome: "Eliminated manual work and improved operational efficiency." },
        { problem: "Data Loss", solution: "Resilient Middleware", outcome: "Secure, reliable data transfers with automated error-handling protocols." }
      ],
      processDiagram: [
        { step: 1, title: "Systems Mapping", description: "Detailing the data structures of all platforms involved." },
        { step: 2, title: "Logic Design", description: "Defining exactly how, when, and where data should move." },
        { step: 3, title: "Middleware Build", description: "Creating the secure hub that handles authentication and routing." },
        { step: 4, title: "Stress Testing", description: "Ensuring the integration remains robust under heavy data loads." }
      ],
      useCases: [
        { title: "CRM to Accounting", scenario: "Automatically generating invoices when a deal is marked 'Closed Won' in the CRM." },
        { title: "E-Commerce to Fulfillment", scenario: "Instantly routing online orders directly to a third-party logistics warehouse." }
      ]
    }
  },
  {
    id: 'whatsapp-automation',
    icon: FiMessageSquare,
    title: 'WhatsApp Automation',
    shortDesc: 'AI-assisted customer communication and campaign workflows.',
    fullDesc: "Engage customers on the world's most popular messaging app.",
    image: '/services/images/whatsapp_front.png',
    banner: '/services/images/whatsapp_banner.png',
    benefits: [
      '24/7 Automated Responses',
      'Targeted Broadcast Lists',
      'Order Status Notifications',
      'Official API Verified'
    ],
    detailContent: {
      whatIsIt: [
        "We leverage the official WhatsApp Business API to create powerful, automated communication channels. From AI-driven support bots to large-scale promotional workflows, we help you reach customers instantly on the app they use most."
      ],
      problems: [
        { icon: FiTrendingUp, title: "Low Email Open Rates", description: "Important announcements and promotions are ignored in crowded inboxes." },
        { icon: FiClock, title: "Support Bottlenecks", description: "Customers wait too long for answers to basic questions." },
        { icon: FiAlertCircle, title: "Notification Delays", description: "Clients are unaware of order statuses or appointment updates." }
      ],
      howWeHelp: [
        { problem: "Ignored Messages", solution: "Direct Conversational Reach", outcome: "Significantly stronger engagement and interaction rates." },
        { problem: "Slow Support", solution: "Automated Reply Logic", outcome: "Instant resolutions, leading to happier customers." },
        { problem: "Opacity", solution: "Transactional Alerts", outcome: "Proactive communication that builds brand trust." }
      ],
      processDiagram: [
        { step: 1, title: "API Setup", description: "Getting your business verified on the official WhatsApp API." },
        { step: 2, title: "Template Approval", description: "Designing messages that comply with Meta's quality guidelines." },
        { step: 3, title: "Automation Logic", description: "Building chatbots and connecting event triggers from your CRM." },
        { step: 4, title: "Launch & Iterate", description: "Rolling out campaigns and tuning responses based on user interaction." }
      ],
      useCases: [
        { title: "Order Tracking", scenario: "Automatically sending a highly visible WhatsApp message when a package ships." },
        { title: "Lead Nurturing", scenario: "Sending a personalized welcome message and qualifying questions to a new prospect." }
      ]
    }
  },
  {
    id: 'email-sms-automation',
    icon: FiMail,
    title: 'Email & SMS Automation',
    shortDesc: 'Multi-channel marketing and alerts to nurture and retain leads.',
    fullDesc: 'Maximize your reach and retention with integrated Email and SMS automation.',
    image: '/services/images/email_front.png',
    banner: '/services/images/email_banner.png',
    benefits: [
      'Cross-Channel Sequences',
      'High-Deliverability Infrastructure',
      'Conversion Tracking Analytics',
      'Dynamic Lead Personalization'
    ],
    detailContent: {
      whatIsIt: [
        "We design precision-engineered Email and SMS automation systems that nurture leads and re-engage your audience. By mapping complex drip campaigns to user behavior, we ensure the right message hits the right inbox at the perfect moment."
      ],
      problems: [
        { icon: FiAlertCircle, title: "Lost Prospects", description: "Potential customers disengage because of infrequent or irrelevant follow-ups." },
        { icon: FiTrendingUp, title: "Abandoned Purchases", description: "Users add items to carts or start forms but never finalize the action." },
        { icon: FiUsers, title: "Generic Batching", description: "Sending the same blast to everyone hurts deliverability and annoys subscribers." }
      ],
      howWeHelp: [
        { problem: "Cold Leads", solution: "Behavioral Drip Campaigns", outcome: "Warm, nurtured prospects ready for conversion." },
        { problem: "Incomplete Actions", solution: "Automated Recovery Sequences", outcome: "Recaptured revenue and higher completion rates." },
        { problem: "Irrelevant Spam", solution: "Dynamic Segmentation", outcome: "Highly personalized outreach that resonates with distinct user groups." }
      ],
      processDiagram: [
        { step: 1, title: "Audience Audit", description: "Segmenting your contacts based on behavior, intent, and profile." },
        { step: 2, title: "Journey Mapping", description: "Designing logical flows for welcome series, abandoned carts, and updates." },
        { step: 3, title: "Content Creation", description: "Writing compelling copy and designing responsive templates." },
        { step: 4, title: "Testing & Publishing", description: "Monitoring deliverability rates and A/B testing subject lines for impact." }
      ],
      useCases: [
        { title: "Abandoned Cart", scenario: "Triggering a gentle SMS reminder followed by an email with an incentive." },
        { title: "Post-Purchase Nurture", scenario: "Sending an automated email sequence educating users on how to make the most of their purchase." }
      ]
    }
  }
];
