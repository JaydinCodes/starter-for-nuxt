export type DepartmentSlug =
  | 'childrens-church'
  | 'youth'
  | 'young-adults'
  | 'nehemiah-men'
  | 'deborah-ladies'
  | 'sunshine-seniors'

export interface DepartmentMeta {
  slug: DepartmentSlug
  name: string
  shortName: string
  tagline: string
  seoDescription: string
  accentColor: string
  heroFrom: string
  heroTo: string
  ageRange?: string
  highlights: string[]
  scripture?: string
}

const DEPARTMENTS: DepartmentMeta[] = [
  {
    slug: 'childrens-church',
    name: "Children's Church",
    shortName: 'Children',
    tagline: 'Helping kids discover that Jesus loves them and church is a joyful place to be.',
    seoDescription:
      'Children’s Church at Westridge Baptist Church is a safe, joy-filled space where kids discover Jesus through stories, worship, and play while being cared for by trusted leaders.',
    accentColor: '#fb923c', // orange-400
    heroFrom: 'rgba(251, 146, 60, 0.22)',
    heroTo: 'rgba(56, 189, 248, 0.18)', // sky-400
    ageRange: 'Ages 3–12',
    highlights: [
      'Bible teaching told in simple, memorable ways children can understand.',
      'Play, crafts, and worship that make church feel like the best hour of their week.',
      'A safe, secure environment with caring, background-checked volunteers.',
    ],
    scripture: '“Let the little children come to me…” – Matthew 19:14',
  },
  {
    slug: 'youth',
    name: 'Youth',
    shortName: 'Youth',
    tagline: 'Creating a space where teenagers can ask real questions and own their faith for themselves.',
    seoDescription:
      'Youth at Westridge Baptist Church is a community of teenagers growing together in Christ through relevant teaching, honest conversations, small groups, and shared moments of fun.',
    accentColor: '#6366f1', // indigo-500
    heroFrom: 'rgba(99, 102, 241, 0.26)',
    heroTo: 'rgba(236, 72, 153, 0.22)', // pink-500
    ageRange: 'High school / teens',
    highlights: [
      'Bible teaching that speaks into school, family, friendships, and online life.',
      'Honest space for questions, doubts, and conversations about real issues.',
      'Community through hangouts, camps, and serving together in church and community.',
    ],
    scripture: '“Don’t let anyone look down on you because you are young…” – 1 Timothy 4:12',
  },
  {
    slug: 'young-adults',
    name: 'Young Adults',
    shortName: 'Young Adults',
    tagline: 'Walking with young adults as they navigate calling, work, study, and relationships with Jesus at the centre.',
    seoDescription:
      'Young Adults at Westridge Baptist Church is a home for students and young professionals discovering what it means to follow Jesus in everyday decisions, relationships, and calling.',
    accentColor: '#22c55e', // green-500
    heroFrom: 'rgba(34, 197, 94, 0.26)',
    heroTo: 'rgba(59, 130, 246, 0.18)', // blue-500
    ageRange: '18–30s',
    highlights: [
      'Community for students, workers, and young professionals from different backgrounds.',
      'Discussion-driven Bible study that connects Scripture to Monday-through-Saturday life.',
      'Moments of fun, retreat, and meaningful serving opportunities together.',
    ],
    scripture: '“In all your ways submit to him, and he will make your paths straight.” – Proverbs 3:6',
  },
  {
    slug: 'nehemiah-men',
    name: 'Nehemiah Men',
    shortName: 'Nehemiah Men',
    tagline: 'Calling men to build strong lives, families, and faith together in Jesus.',
    seoDescription:
      'Nehemiah Men at Westridge Baptist Church is a brotherhood of men encouraging one another to walk closely with God and to build strong homes, church, and community.',
    accentColor: '#0ea5e9', // sky-500
    heroFrom: 'rgba(14, 165, 233, 0.26)',
    heroTo: 'rgba(30, 64, 175, 0.25)', // indigo-900-ish
    highlights: [
      'Gatherings that both challenge and encourage men in their walk with God.',
      'Practical teaching and conversation about work, family, and spiritual leadership.',
      'Serving projects that bless the church, community, and those in need.',
    ],
    scripture: '“The God of heaven will give us success. We his servants will start rebuilding.” – Nehemiah 2:20',
  },
  {
    slug: 'deborah-ladies',
    name: 'Deborah Ladies',
    shortName: 'Deborah Ladies',
    tagline: 'Creating space for women to be strengthened in faith, identity, and God-given calling.',
    seoDescription:
      'Deborah Ladies at Westridge Baptist Church is a community of women encouraging one another to stand strong in faith, courage, and purpose in every season of life.',
    accentColor: '#ec4899', // pink-500
    heroFrom: 'rgba(236, 72, 153, 0.30)',
    heroTo: 'rgba(168, 85, 247, 0.24)', // purple-500
    highlights: [
      'Bible study and prayer spaces that speak into the lived realities of women.',
      'Friendship and mentoring across different ages and stages of womanhood.',
      'Moments of rest, retreat, and refreshment in the presence of God and one another.',
    ],
    scripture: '“Village life in Israel ceased… until I, Deborah, arose, a mother in Israel.” – Judges 5:7',
  },
  {
    slug: 'sunshine-seniors',
    name: 'Sunshine Seniors',
    shortName: 'Sunshine Seniors',
    tagline: 'Honouring and caring for those in their later years with joy, dignity, and friendship.',
    seoDescription:
      'Sunshine Seniors at Westridge Baptist Church is a warm community for older adults to worship, connect, and continue bearing fruit and sharing wisdom with younger generations.',
    accentColor: '#facc15', // yellow-400
    heroFrom: 'rgba(250, 204, 21, 0.35)',
    heroTo: 'rgba(96, 165, 250, 0.22)', // blue-400
    ageRange: 'Older adults',
    highlights: [
      'Gentle-paced gatherings with worship, prayer, encouragement, and plenty of time to connect.',
      'Community and care for those who have carried the life of the church for many years.',
      'Opportunities to share stories, testimony, and wisdom with younger generations.',
    ],
    scripture: '“They will still bear fruit in old age, they will stay fresh and green.” – Psalm 92:14',
  },
]

export const getDepartmentMetaBySlug = (slug?: string | string[] | null): DepartmentMeta | null => {
  if (!slug) return null
  const key = Array.isArray(slug) ? slug[0] : slug
  return DEPARTMENTS.find((d) => d.slug === key) ?? null
}

export const getDepartmentMetaByName = (name?: string | null): DepartmentMeta | null => {
  if (!name) return null
  const normalized = name.toLowerCase().trim()

  // Try exact match first
  const exact = DEPARTMENTS.find((d) => d.name.toLowerCase() === normalized)
  if (exact) return exact

  // Then loose match by containing key words
  return (
    DEPARTMENTS.find((d) => normalized.includes(d.shortName.toLowerCase())) ??
    DEPARTMENTS.find((d) => normalized.includes(d.slug.replace(/-/g, ' ')))
  ) ?? null
}

export const listDepartmentsMeta = (): DepartmentMeta[] => DEPARTMENTS

