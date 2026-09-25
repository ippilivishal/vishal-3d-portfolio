// 作品集数据（双语）。5 大板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

const WORKS_EN: WorksLang = {
  title: 'Works',
  closeLabel: 'Back',
  openLabel: 'Explore',
  hint: 'Keep scrolling',
  awardsLabel: 'Highlights',
  visitLabel: 'Visit',
  detailPlaceholder: 'Details available on request.',
  phImageLabel: 'Image / Video',
  phButtonLabel: 'Link',
  countLabel: (n) => `${n} items`,
  sections: [
    {
      id: 'cases',
      no: '01',
      title: 'Case Studies',
      tagline: 'Reliability · Incident analysis',
      items: [
        { name: 'Eliminating silent message loss', meta: 'Reliability', slug: 'silent-message-loss' },
        { name: 'One root cause behind five incidents', meta: 'Incident analysis', slug: 'one-root-cause' },
        { name: 'Voice-based grievance routing', meta: 'Academic project', slug: 'grievance-routing' },
      ],
    },
    {
      id: 'platforms',
      no: '02',
      title: 'Platforms',
      tagline: 'Trading · Manufacturing · Banking',
      items: [
        {
          name: 'Multi-market trading platform',
          meta: 'IG Group · AU / SG / UAE',
          tags: ['~33M pricing events / day', '~3.4M ledger events / day'],
          slug: 'trading-platform',
        },
        {
          name: 'Smartshop manufacturing execution',
          meta: 'Genpact · GE Gas Power',
          tags: ['Team of 10', '~$2M saved across 5 factories'],
          slug: 'smartshop-mes',
        },
        { name: 'Banking applications', meta: 'Infosys · Citi', slug: 'banking-apps' },
      ],
    },
    {
      id: 'certs',
      no: '03',
      title: 'Certifications',
      tagline: 'AWS · 2025',
      items: [
        { name: 'AWS Certified Solutions Architect – Associate', meta: '2025', slug: 'aws-solutions-architect' },
        { name: 'AWS Certified AI Practitioner', meta: '2025', slug: 'aws-ai-practitioner' },
      ],
    },
    {
      id: 'toolkit',
      no: '04',
      title: 'Toolkit',
      tagline: 'Tools & Frameworks',
      groups: [
        { heading: 'Languages', items: ['TypeScript', 'JavaScript (Node.js 22)', 'Java 21'] },
        { heading: 'Frontend', items: ['React Native'] },
        {
          heading: 'Cloud / Serverless',
          items: ['AWS Lambda', 'EventBridge', 'SQS', 'DynamoDB', 'Step Functions', 'SAM', 'CloudFormation', 'ECS Fargate', 'Cognito'],
        },
        { heading: 'Messaging / Integration', items: ['Kafka / Avro', 'FIX (QuickFIX/J)', 'REST', 'EventBridge'] },
        { heading: 'Vendors', items: ['IBKR', 'Braze', 'Salesforce'] },
        { heading: 'CI/CD & Security', items: ['GitLab CI', 'Snyk', 'Wiz', 'GitGuardian'] },
        { heading: 'Observability', items: ['CloudWatch', 'Honeycomb'] },
        { heading: 'AI / Productivity', items: ['Claude', 'Custom SDLC harness (AI-assisted design, review, RCA)'] },
        {
          heading: 'Practices',
          items: ['Event-driven microservices', 'DDD', 'Test-first', 'Secure SDLC', 'Incident RCA', 'Multi-region delivery'],
        },
      ],
    },
  ],
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: WORKS_EN,
  en: WORKS_EN,
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {
  cases: `${import.meta.env.BASE_URL}works/covers/cases.jpg`,
  platforms: `${import.meta.env.BASE_URL}works/covers/platforms.jpg`,
  certs: `${import.meta.env.BASE_URL}works/covers/certs.jpg`,
}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
