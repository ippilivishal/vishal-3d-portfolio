const GITHUB_URL = 'https://github.com/ippilivishal'
const LINKEDIN_URL = 'https://www.linkedin.com/in/vishalippili'
const EMAIL = 'ippili.vishal@gmail.com'
const RESUME_URL = `${import.meta.env.BASE_URL}Vishal-Ippili-Resume.pdf`

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section className="contact" aria-labelledby="contact-title">
      <span className="contact-status">
        <i aria-hidden="true" />
        Available for new roles · October 2026
      </span>
      <h2 id="contact-title" className="contact-title">
        Let’s talk
      </h2>
      <p className="contact-body">
        Open to senior and lead engineering roles. If your team cares about systems that hold up under real load, I’d
        like to hear about it.
      </p>
      <div className="contact-links">
        <a className="contact-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
          <span>GitHub</span>
        </a>
        <a className="contact-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          <ResumeIcon />
          <span>Résumé</span>
        </a>
        <a className="contact-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
          <span>LinkedIn</span>
        </a>
      </div>
      <a className="contact-mail" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <button className="contact-term" onClick={() => window.dispatchEvent(new Event('open-terminal'))}>
        <span aria-hidden="true">›_</span> psst — press <kbd>~</kbd> anywhere for a terminal
      </button>
      <p className="contact-foot">Vishal Ippili · Bengaluru · 2026</p>
      <p className="contact-credit">
        3D character by{' '}
        <a href="https://about.senbuzy.com/" target="_blank" rel="noopener noreferrer">
          Sen Zheng
        </a>
        , used with permission · built on his open-source{' '}
        <a href="https://github.com/dayinji/sen-3d-resume" target="_blank" rel="noopener noreferrer">
          sen-3d-resume
        </a>
      </p>
    </section>
  )
}
