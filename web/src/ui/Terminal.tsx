import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'

const RESUME_URL = `${import.meta.env.BASE_URL}Vishal-Ippili-Resume.pdf`
const LINKS = {
  github: 'https://github.com/ippilivishal',
  linkedin: 'https://www.linkedin.com/in/vishalippili',
  email: 'mailto:ippili.vishal@gmail.com',
}

type Line = { kind: 'in' | 'out' | 'err'; text: string }

const HELP = [
  'Available commands:',
  '  whoami        who is this person',
  '  experience    where I have worked',
  '  skills        what I build with',
  '  projects      selected work',
  '  resume        open my résumé (PDF)',
  '  contact       how to reach me',
  '  github        open GitHub',
  '  linkedin      open LinkedIn',
  '  coffee        brew one',
  '  clear         clear the screen',
  '  exit          close the terminal',
]

function run(raw: string, open: (url: string) => void): string[] | 'clear' | 'exit' {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ')
  if (!cmd) return []
  switch (cmd) {
    case 'help':
    case '?':
      return HELP
    case 'whoami':
      return [
        'Vishal Ippili — Senior Software Engineer, Bengaluru.',
        'Seven years building event pipelines, ledgers and trading platforms.',
        'Mostly TypeScript and Java on AWS.',
      ]
    case 'experience':
    case 'exp':
      return [
        '2026         IG Group      Senior Software Engineer   trading platform · AU / SG / UAE',
        '2023 – 2026  Genpact       Lead Consultant            led 10 · GE Smartshop MES · ~$2M saved',
        '2019 – 2023  Infosys       Specialist Programmer      full-stack for Citi',
        '2015 – 2019  SRM           B.Tech, Computer Science',
      ]
    case 'skills':
      return [
        'languages      TypeScript · JavaScript (Node.js 22) · Java 21',
        'cloud          Lambda · EventBridge · SQS · DynamoDB · Step Functions · ECS Fargate · Cognito',
        'messaging      Kafka / Avro · FIX (QuickFIX/J) · REST',
        'delivery       GitLab CI · SAM · CloudFormation · Snyk · Wiz · GitGuardian',
        'observability  CloudWatch · Honeycomb',
        'ai             Claude · custom SDLC harness',
      ]
    case 'projects':
    case 'ls':
    case 'ls projects':
      return [
        'silent-message-loss.md     idempotency before retry',
        'one-root-cause.md          five incidents, one missing field',
        'grievance-routing.md       voice → opinion mining → fuzzy routing',
        '(scroll to "Works" to read them)',
      ]
    case 'resume':
    case 'cv':
      open(RESUME_URL)
      return ['Opening résumé in a new tab…']
    case 'contact':
      return ['email     ippili.vishal@gmail.com', 'linkedin  linkedin.com/in/vishalippili', 'github    github.com/ippilivishal']
    case 'github':
      open(LINKS.github)
      return ['Opening GitHub…']
    case 'linkedin':
      open(LINKS.linkedin)
      return ['Opening LinkedIn…']
    case 'email':
    case 'mail':
      open(LINKS.email)
      return ['Opening your mail app…']
    case 'coffee':
      return ['   ( (', '    ) )', '  ........', '  |      |]', '  \\      /', "   `----'", 'Brewing… the best bugs are found on the second cup.']
    case 'sudo hire vishal':
    case 'sudo hire-vishal':
      return ['[sudo] password for recruiter: ********', 'Permission granted. ✔', 'Next step: type "contact" — I reply within a day.']
    case 'hire vishal':
      return ['Permission denied. Try: sudo hire vishal']
    case 'sudo rm -rf /':
      return ['Nice try. This terminal has idempotent deletes and a dead-letter queue.']
    case 'clear':
    case 'cls':
      return 'clear'
    case 'exit':
    case 'quit':
      return 'exit'
    default:
      return [`command not found: ${cmd.split(' ')[0]} — type "help"`]
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'vishal-os 1.0 — type "help" to see what you can do.' },
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<Element | null>(null)

  const show = useCallback(() => {
    lastFocus.current = document.activeElement
    setOpen(true)
  }, [])
  const hide = useCallback(() => {
    setOpen(false)
    ;(lastFocus.current as HTMLElement | null)?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
      if ((e.key === '`' || e.key === '~') && !typing) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => show()
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-terminal', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-terminal', onOpen)
    }
  }, [show])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30)
  }, [open])
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  const submit = () => {
    const input = value
    setValue('')
    setHIdx(-1)
    if (input.trim()) setHistory((h) => [input, ...h].slice(0, 30))
    const res = run(input, (url) => window.open(url, '_blank', 'noopener'))
    if (res === 'clear') return setLines([])
    if (res === 'exit') {
      setLines((l) => [...l, { kind: 'in', text: input }])
      return hide()
    }
    setLines((l) => [
      ...l,
      { kind: 'in', text: input },
      ...res.map((text) => ({ kind: (text.startsWith('command not found') ? 'err' : 'out') as Line['kind'], text })),
    ])
  }

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit()
    else if (e.key === 'Escape') hide()
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(hIdx + 1, history.length - 1)
      if (i >= 0) {
        setHIdx(i)
        setValue(history[i])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = hIdx - 1
      setHIdx(Math.max(i, -1))
      setValue(i >= 0 ? history[i] : '')
    } else if (e.key === '`' || e.key === '~') {
      e.preventDefault()
      hide()
    }
  }

  if (!open) return null
  return (
    <div className="term" role="dialog" aria-modal="true" aria-label="Terminal" onClick={() => inputRef.current?.focus()}>
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term-title">vishal@portfolio: ~</span>
        <button className="term-close" onClick={hide} aria-label="Close terminal">
          ×
        </button>
      </div>
      <div className="term-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={`term-line term-${l.kind}`}>
            {l.kind === 'in' && <span className="term-prompt">➜ ~ </span>}
            {l.text}
          </div>
        ))}
        <div className="term-line term-input-row">
          <span className="term-prompt">➜ ~ </span>
          <input
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onInputKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal command"
          />
        </div>
      </div>
    </div>
  )
}
