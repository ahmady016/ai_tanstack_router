export type Post = {
  id: string
  title: string
  content: string
  timestamp: string
  comments?: Comment[]
}

export type PostWithoutComments = Exclude<Post, 'comments'>

export type Comment = {
  id: string
  postId: string
  author: string
  content: string
  timestamp: string
}

export const INTIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'API Design Best Practices',
    content:
      'Implement RESTful principles with proper status codes, versioning, and HATEOAS. Use OpenAPI/Swagger for documentation.',
    comments: [
      {
        id: '1',
        author: 'Lead Architect',
        content:
          'Consider adding circuit breakers for fault tolerance in distributed systems.',
        timestamp: '2024-02-15T09:30:00',
        postId: '1',
      },
      {
        id: '2',
        author: 'Junior Dev',
        content: 'Should we version via URL path or headers?',
        timestamp: '2024-02-15T10:15:00',
        postId: '1',
      },
    ],
    timestamp: '',
  },
  {
    id: '2',
    title: 'State Management in React',
    content:
      'Compare Redux Toolkit, Context API, and Zustand for different complexity needs. Use selectors for performance optimization.',
    comments: [
      {
        id: '1',
        author: 'Frontend Lead',
        content: 'Zustand shines for microfrontend architectures.',
        timestamp: '2024-02-14T14:30:00',
        postId: '2',
      },
      {
        id: '2',
        author: 'Mobile Dev',
        content: 'Remember to unsubscribe effects in useEffect!',
        timestamp: '2024-02-14T15:00:00',
        postId: '2',
      },
    ],
    timestamp: '',
  },
  {
    id: '3',
    title: 'TypeScript Pro Tips',
    content:
      'Leverage utility types (Pick/Omit), type guards, and discriminated unions for type-safe architectures.',
    comments: [
      {
        id: '1',
        author: 'TS Expert',
        content: 'Combine satisfies operator with interfaces for validation.',
        timestamp: '2024-02-13T11:45:00',
        postId: '3',
      },
    ],
    timestamp: '',
  },
  {
    id: '4',
    title: 'Effective Code Reviews',
    content:
      'Focus on readability, maintainability, and architecture patterns. Use checklist-driven approaches for consistency.',
    comments: [
      {
        id: '1',
        author: 'Engineering Manager',
        content: 'Implement automated code quality gates in CI pipeline.',
        timestamp: '2024-02-12T16:20:00',
        postId: '4',
      },
      {
        id: '2',
        author: 'Senior Dev',
        content: 'Peer review pairing improves knowledge sharing.',
        timestamp: '2024-02-12T17:00:00',
        postId: '4',
      },
    ],
    timestamp: '',
  },
  {
    id: '5',
    title: 'CI/CD Pipelines',
    content:
      'Implement automated testing, containerization, and canary deployments using GitHub Actions or GitLab CI.',
    comments: [
      {
        id: '1',
        author: 'DevOps',
        content: 'Consider parallel test execution for faster feedback.',
        timestamp: '2024-02-11T10:30:00',
        postId: '5',
      },
    ],
    timestamp: '',
  },
  {
    id: '6',
    title: 'React Hooks Deep Dive',
    content:
      'Master useEffect dependencies, useMemo/useCallback optimization, and custom hook composition patterns.',
    comments: [
      {
        id: '1',
        author: 'React Core Team',
        content: 'Avoid over-optimization - profile first!',
        timestamp: '2024-02-10T14:15:00',
        postId: '6',
      },
      {
        id: '2',
        author: 'New Hire',
        content: 'Great explanation of dependency arrays!',
        timestamp: '2024-02-10T15:30:00',
        postId: '6',
      },
    ],
    timestamp: '',
  },
  {
    id: '7',
    title: 'Microservices Auth',
    content:
      'Implement JWT with RSA256, refresh tokens, and API gateway validation for distributed systems security.',
    comments: [
      {
        id: '1',
        author: 'Security Lead',
        content: 'Rotate keys quarterly and monitor JWT leakage.',
        timestamp: '2024-02-09T09:45:00',
        postId: '7',
      },
    ],
    timestamp: '',
  },
  {
    id: '8',
    title: 'Testing Strategies',
    content:
      'Pyramid testing: 70% unit, 20% integration, 10% E2E. Use mocking for external dependencies.',
    comments: [
      {
        id: '1',
        author: 'QA Lead',
        content: 'Implement mutation testing for critical paths.',
        timestamp: '2024-02-08T13:00:00',
        postId: '8',
      },
      {
        id: '2',
        author: 'SDET',
        content: 'BrowserStack integration saved us 40% testing time.',
        timestamp: '2024-02-08T14:30:00',
        postId: '8',
      },
    ],
    timestamp: '',
  },
  {
    id: '9',
    title: 'Performance Optimization',
    content:
      'Chrome DevTools audits, React memoization, and Webpack bundle analysis techniques.',
    comments: [
      {
        id: '1',
        author: 'Perf Engineer',
        content: 'Lighthouse CI helps prevent regressions.',
        timestamp: '2024-02-07T11:00:00',
        postId: '9',
      },
      {
        id: '2',
        author: 'Frontend Dev',
        content: 'Code splitting reduced our TTI by 35%!',
        timestamp: '2024-02-07T12:15:00',
        postId: '9',
      },
    ],
    timestamp: '',
  },
  {
    id: '10',
    title: 'Security Best Practices',
    content:
      'OWASP Top 10 mitigation: sanitize inputs, CSP headers, and dependency vulnerability scanning.',
    comments: [
      {
        id: '1',
        author: 'CISO',
        content: 'Implement SAST/DAST in SDLC phases.',
        timestamp: '2024-02-06T10:00:00',
        postId: '10',
      },
      {
        id: '2',
        author: 'Dev Lead',
        content: 'Snyk integration caught 15 vulns last month.',
        timestamp: '2024-02-06T11:30:00',
        postId: '10',
      },
    ],
    timestamp: '',
  },
]
