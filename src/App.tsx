import { FormEvent, useEffect, useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Bolt, CheckCircle2, ChevronRight, Clock3, Mail,
  Cable, MapPin, Menu, Phone, ShieldCheck, Wrench, X,
} from 'lucide-react'

type Project = {
  title: string
  summary: string
  location: string
  category: string
  image: string
}

const currentPath = window.location.pathname
const canonicalShowcasePath = '/Demo-J-D'
const normalizedPath = currentPath.replace(/\/+$/, '').toLowerCase()
const normalizedShowcasePath = canonicalShowcasePath.toLowerCase()
const showcaseBase = normalizedPath === normalizedShowcasePath || normalizedPath.startsWith(`${normalizedShowcasePath}/`) ? canonicalShowcasePath : ''
const route = (path: string) => `${showcaseBase}${path}`
const asset = (path: string) => `${showcaseBase}${path}`
const NOVAS_AGENCY_URL = 'https://novasagency.com'
const NOVAS_CONTACT_URL = `${NOVAS_AGENCY_URL}/contact`

const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
]

const projects: Project[] = [
  { title: 'Riverside Mews', summary: 'A carefully coordinated rewire and lighting upgrade across a period residential development.', location: 'Demo · Belfast', category: 'Residential upgrade', image: asset('/images/fabian-kleiser-CW0T7Rce2SA-unsplash.jpg') },
  { title: 'Beacon Yard', summary: 'Power distribution, LED lighting and EV-ready infrastructure for a mixed-use workspace.', location: 'Demo · Lisburn', category: 'Commercial fit-out', image: asset('/images/641c1cd1810de2e16b69977cc41358bc.jpg') },
  { title: 'Hillside Workshop', summary: 'A dependable three-phase supply upgrade, containment and task lighting installation.', location: 'Demo · Newry', category: 'Industrial installation', image: asset('/images/mark-kats-oj1zW_PNI4k-unsplash.jpg') },
  { title: 'Oakfield Homes', summary: 'Domestic electrical first-fix, smart lighting and compliant final certification.', location: 'Demo · Bangor', category: 'New-build residential', image: asset('/images/nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg') },
  { title: 'North Coast Charging', summary: 'A scalable workplace EV charging scheme designed around future demand.', location: 'Demo · Coleraine', category: 'EV infrastructure', image: asset('/images/zaptec-UHNdOFqNhNQ-unsplash.jpg') },
  { title: 'Harbour House', summary: 'A refined apartment renovation with concealed services and considered feature lighting.', location: 'Demo · Holywood', category: 'Residential renovation', image: asset('/images/e32375219bc4107fccd81055667006e8.jpg') },
]

const services = [
  { title: 'Domestic Electrical', text: 'Rewires, consumer units, fault finding, extensions and thoughtful upgrades for safer homes.', icon: Bolt, bullets: ['Full and partial rewires', 'Consumer unit upgrades', 'Fault finding and repairs', 'Indoor and outdoor lighting'] },
  { title: 'Commercial Installations', text: 'Reliable electrical work for offices, retail, landlord portfolios and growing local businesses.', icon: Wrench, bullets: ['Fit-outs and refurbishments', 'Power and containment', 'Emergency lighting', 'Testing and certification'] },
  { title: 'Power, Lighting & Controls', text: 'Practical, efficient electrical environments built around how your space is really used.', icon: ShieldCheck, bullets: ['LED lighting upgrades', 'Smart controls', 'Distribution boards', 'Data and small-power works'] },
  { title: 'EV Charging', text: 'Straightforward home and workplace charging guidance, installation and handover.', icon: Bolt, bullets: ['Home charger installation', 'Workplace charging', 'Load checks', 'Future-ready cabling'] },
  { title: 'Maintenance & Testing', text: 'Clear, responsive support that keeps your property safe, compliant and operational.', icon: CheckCircle2, bullets: ['Electrical condition reports', 'Planned maintenance', 'Reactive callouts', 'Landlord compliance support'] },
  { title: 'Fire & Security Systems', text: 'Connected protection systems planned clearly for safer homes, workplaces and shared spaces.', icon: Cable, bullets: ['Alarm and detection wiring', 'Access control cabling', 'CCTV power provision', 'System-ready infrastructure'] },
]

const proofPoints = [
  { value: '10+', label: 'Years of hands-on electrical experience', icon: ShieldCheck },
  { value: '24hr', label: 'Target response for urgent demo enquiries', icon: Clock3 },
  { value: '100%', label: 'Demo commitment to clear, compliant work', icon: CheckCircle2 },
]

function LinkButton({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'light' | 'text' }) {
  return <a className={`button button--${variant}`} href={route(href)}>{children}{variant !== 'text' && <ArrowRight size={17} strokeWidth={2.4} />}</a>
}

function Logo({ light = false }: { light?: boolean }) {
  return <img className="brand-logo" src={asset(`/brand/JD-Electrical_Primary-Horizontal_${light ? 'White' : 'Colour'}.svg`)} alt="JD Electrical" />
}

function Header({ page }: { page: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [page])

  return <header className="site-header">
    <a href={route('/')} className="logo-link" aria-label="JD Electrical home"><Logo light /></a>
    <nav className="desktop-nav" aria-label="Main navigation">
      {nav.map((item, index) => <span className="nav-item" key={item.href}><a className={page === item.href ? 'active' : ''} href={route(item.href)}>{item.label}</a>{index < nav.length - 1 && <ChevronRight size={13} />}</span>)}
    </nav>
    <a className="header-cta" href={route('/contact')}>Send an enquiry</a>
    <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <div className="mobile-menu">
      <a href={route('/')} className="menu-logo"><Logo light /></a>
      <button className="menu-close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}><X /></button>
      <nav aria-label="Mobile navigation">{[...nav, { label: 'Contact', href: '/contact' }].map(item => <a href={route(item.href)} key={item.href}>{item.label}<ArrowUpRight size={18} /></a>)}</nav>
      <a className="button button--light" href={route('/contact')}>Start a project<ArrowRight size={17} /></a>
    </div>}
  </header>
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div><Logo light /><p>Dependable domestic and commercial electrical work, delivered with clarity and care.</p><small>Demo website — details are placeholders.</small></div>
      <div><span className="footer-kicker">Quick links</span><a href={route('/')}>Home</a><a href={route('/about')}>About</a><a href={route('/projects')}>Projects</a><a href={route('/services')}>Services</a><a href={route('/contact')}>Contact</a></div>
      <div><span className="footer-kicker">Get in touch</span><p><MapPin size={16} /> Demo address<br />Northern Ireland</p><p><Mail size={16} /> hello@jdelectrical.demo</p><p><Phone size={16} /> 028 0000 0000</p></div>
    </div>
    <div className="footer-base">© 2026 JD Electrical <span>•</span> Power, Precisely Delivered. <a className="novas-agency-footer-link" href={NOVAS_AGENCY_URL} target="_blank" rel="noreferrer">Website created by Novas Agency</a></div>
  </footer>
}

function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,24,46,.92), rgba(0,24,46,.62)), url(${image})` }}><div className="page-hero-inner"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div></section>
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card"><img src={project.image} alt="" /><div className="project-card-overlay" /><div className="project-card-copy"><span className="project-index">0{index + 1}</span><h3>{project.title}</h3><p>{project.summary}</p><div><span><MapPin size={14} />{project.location}</span><span><Bolt size={14} />{project.category}</span></div></div></article>
}

function ServiceList({ detailed = false }: { detailed?: boolean }) {
  return <div className={detailed ? 'services-list services-list--detailed' : 'services-list'}>{services.map((service, index) => {
    const Icon = service.icon
    return <article className="service-card" key={service.title}><span className="service-number">0{index + 1}</span><Icon className="service-icon" size={30} strokeWidth={1.7} /><h3>{service.title}</h3><p>{service.text}</p>{detailed && <ul>{service.bullets.map(bullet => <li key={bullet}><CheckCircle2 size={15} />{bullet}</li>)}</ul>}<a href={route('/contact')} aria-label={`Enquire about ${service.title}`}><ArrowUpRight size={21} /></a></article>
  })}</div>
}

function CTA() {
  return <section className="cta-section"><div className="cta-copy"><p className="eyebrow eyebrow--orange">Start a project</p><h2>Let’s make your next electrical job straightforward.</h2><p>From the first conversation to a clean handover, JD Electrical keeps every step clear.</p></div><div className="cta-actions"><LinkButton href="/contact" variant="light">Send an enquiry</LinkButton><LinkButton href="/projects" variant="text">View demo projects</LinkButton></div></section>
}

function Home() {
  return <>
    <section className="home-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,18,35,.9) 0%, rgba(0,18,35,.56) 56%, rgba(0,18,35,.24)), url('${asset('/images/641c1cd1810de2e16b69977cc41358bc.jpg')}')` }}><div className="home-hero-inner"><p className="eyebrow eyebrow--orange">JD Electrical · Northern Ireland</p><h1>Power, precisely delivered.</h1><p>Dependable domestic and commercial electrical work, planned carefully and completed with pride.</p><div className="hero-actions"><LinkButton href="/contact">Send an enquiry</LinkButton><LinkButton href="/projects" variant="text">View demo projects</LinkButton></div></div></section>
    <section className="projects-strip"><div className="section-heading section-heading--dark"><p className="eyebrow eyebrow--orange">Selected work</p><h2>Built for the spaces that matter.</h2></div><div className="projects-grid projects-grid--three">{projects.slice(0, 3).map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></section>
    <section className="intro-section"><div className="intro-copy"><p className="eyebrow">Who we are</p><h2>Reliable electrical work with a sharper standard of care.</h2><p>JD Electrical brings calm, considered delivery to every domestic and commercial job. We believe great work is as much about communication and respect as it is about a technically precise finish.</p><div className="hero-actions"><LinkButton href="/about">Our approach</LinkButton><LinkButton href="/projects" variant="text">See our work</LinkButton></div></div><div className="proof-panel" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,24,46,.86), rgba(0,24,46,.44)), url('${asset('/images/mark-kats-oj1zW_PNI4k-unsplash.jpg')}')` }}>{proofPoints.map(point => { const Icon = point.icon; return <div className="proof-card" key={point.value}><Icon size={21} /><strong>{point.value}</strong><span>{point.label}</span></div> })}</div></section>
    <section className="featured-project"><div className="featured-image" style={{ backgroundImage: `url('${asset('/images/nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg')}')` }} /><div className="featured-copy"><p className="eyebrow">Featured demo project</p><h2>Oakfield Homes</h2><p>A polished new-build electrical package, from practical first-fix work through to warm, energy-efficient lighting and final certification.</p><LinkButton href="/projects" variant="text">View all projects</LinkButton><div className="featured-stats"><div><strong>5</strong><span>homes in this demo phase</span></div><div><strong>3</strong><span>service areas coordinated</span></div></div></div></section>
    <section className="services-section"><div className="section-heading"><p className="eyebrow">What we do</p><h2>Electrical support, from smaller fixes to full delivery.</h2><p>Practical expertise for homes, workplaces and growing local businesses.</p></div><ServiceList /></section>
    <CTA />
  </>
}

function About() {
  return <><PageHero eyebrow="Home · About" title="Built around dependable delivery." text="JD Electrical is a demo brand representing a clear, skilled and professional electrical partner for Northern Ireland." image={asset('/images/e32375219bc4107fccd81055667006e8.jpg')} /><section className="logo-strip"><span>Local homes</span><span>Commercial spaces</span><span>Property teams</span><span>Renovation projects</span><span>Workplace charging</span></section><section className="about-story"><div><p className="eyebrow">About JD Electrical</p><h2>Clear work. Safe hands. No fuss.</h2><p>Our fictional studio is built around the kind of service people genuinely value: turning up when promised, explaining the work in plain English, and leaving every space as tidy as we found it.</p><p>Whether it is a single room, an evolving property portfolio or a complex commercial installation, the aim stays the same — a reliable electrical result that feels straightforward from start to finish.</p></div><div className="about-image-card"><img src={asset('/images/8b896a3dad0b83bde36de97a7dd1e30f.jpg')} alt="Electrical installation detail" /><div className="about-image-card-caption"><span>JD Electrical</span><span>Residential delivery</span></div></div></section><section className="stats-section">{[...proofPoints, { value: '6', label: 'core demo services', icon: Bolt }].map(point => { const Icon = point.icon; return <div key={point.value}><Icon size={24} /><strong>{point.value}</strong><span>{point.label}</span></div> })}</section><section className="approach-section"><div className="section-heading"><p className="eyebrow">Our approach</p><h2>Structured for smooth, confident work.</h2></div><div className="approach-grid">{[['01', 'Listen first', 'We begin with the real requirements of the space, not a one-size-fits-all recommendation.'], ['02', 'Plan precisely', 'Clear scopes, considered materials and sensible timings keep the job on track.'], ['03', 'Deliver properly', 'A clean finish, practical handover and the right documentation complete the work.']].map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div></section><CTA /></>
}

function Projects() {
  return <><PageHero eyebrow="Home · Projects" title="Projects with a practical point of view." text="A demo portfolio of electrical installations tailored to the way people live, work and grow." image={asset('/images/mark-kats-oj1zW_PNI4k-unsplash.jpg')} /><section className="portfolio-section"><div className="section-heading"><p className="eyebrow">Our portfolio</p><h2>Selected demo projects</h2><p>Examples shown are fictional and included to demonstrate the project-led layout.</p></div><div className="projects-grid projects-grid--two">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></section><CTA /></>
}

function Services() {
  return <><PageHero eyebrow="Home · Services" title="The right power behind every project." text="From essential domestic fixes to carefully planned commercial work, JD Electrical keeps electrical delivery clear and capable." image={asset('/images/zaptec-hKDUWDQTZMw-unsplash.jpg')} /><section className="services-section services-page"><div className="section-heading"><p className="eyebrow">What we do</p><h2>Everything connected, properly.</h2><p>Every service is presented as a demo offering and can be replaced with your exact working scope.</p></div><ServiceList detailed /></section><CTA /></>
}

function Contact() {
  const [error, setError] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); if (!form.get('firstName') || !form.get('email') || !form.get('subject') || !form.get('message')) { setError('Please complete all required fields.'); return } setError(''); const read = (key: string) => String(form.get(key) ?? '').trim(); const params = new URLSearchParams(); params.set('prefill', 'showcase8'); params.set('source', 'JD Electrical demo website'); params.set('businessName', 'JD Electrical demo enquiry'); params.set('help', 'new-website'); const name = [read('firstName'), read('lastName')].filter(Boolean).join(' '); if (name) params.set('name', name); if (read('phone')) params.set('phone', read('phone')); if (read('email')) params.set('email', read('email')); if (read('message')) params.set('projectDetails', [`Selected service: ${read('subject')}`, read('message')].filter(Boolean).join('\n\n')); window.location.assign(`${NOVAS_CONTACT_URL}?${params.toString()}#contact-form`) }
  return <><PageHero eyebrow="Home · Contact" title="Let’s talk about the job." text="Tell us what you need and we’ll help you find the right next step. This is a demo contact experience." image={asset('/images/zaptec-2n7ugRl1YsQ-unsplash.jpg')} /><section className="contact-section"><div className="contact-copy"><p className="eyebrow">Get in touch</p><h2>Start with a straightforward conversation.</h2><p>Whether you have a small repair, a planned renovation or a commercial brief, send the details below. Submitting opens Novas Agency with your details prefilled.</p><div className="contact-details"><p><MapPin size={20} /><span><strong>Demo service area</strong>Northern Ireland and surrounding areas</span></p><p><Mail size={20} /><span><strong>Demo email</strong>hello@jdelectrical.demo</span></p><p><Phone size={20} /><span><strong>Demo phone</strong>028 0000 0000</span></p><p><Clock3 size={20} /><span><strong>Demo hours</strong>Monday–Friday, 08:00–17:00</span></p></div></div><div className="contact-form-wrap"><form onSubmit={submit} noValidate><div className="form-grid"><label>First name *<input name="firstName" required /></label><label>Last name<input name="lastName" /></label><label>Email address *<input name="email" type="email" required /></label><label>Phone number<input name="phone" type="tel" /></label></div><label>How can we help? *<select name="subject" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option value={service.title} key={service.title}>{service.title}</option>)}<option value="General enquiry">General enquiry</option></select></label><label>Tell us about the job *<textarea name="message" required rows={6} /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button--primary" type="submit">Continue to Novas Agency<ArrowRight size={17} /></button><small>Demo only — this opens the Novas Agency contact form with your details prefilled.</small></form></div></section></>
}

function App() {
  const path = (showcaseBase ? currentPath.slice(showcaseBase.length) : currentPath).replace(/\/$/, '') || '/'
  const pages: Record<string, React.ReactNode> = { '/': <Home />, '/about': <About />, '/projects': <Projects />, '/services': <Services />, '/contact': <Contact /> }
  const page = pages[path] ?? <Home />
  return <><Header page={path} /><main>{page}</main><Footer /></>
}

export default App
