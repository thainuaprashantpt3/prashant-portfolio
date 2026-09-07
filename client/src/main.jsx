import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code2,
  Database,
  ShieldCheck,
  Server,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Send
} from 'lucide-react';
import './styles.css';

const resume = '/prashantresume1_6 (1).pdf';

const profile = {
  name: 'Prashant Thainua',
  role: 'Full Stack Developer',
  location: 'Agra, India',
  email: 'thainuaprashant.pt3@gmail.com',
  phone: '+91-7078192828',
  github: 'https://github.com/thainuaprashantpt3',
  linkedin: 'https://www.linkedin.com/in/prashant-thainua/'
};

const skills = [
  {
    title: 'Frontend',
    icon: Code2,
    items: [
      'React.js',
      'JavaScript ES6+',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'React Router',
      'Reusable Components'
    ],
    note:
      'Responsive interfaces, reusable components, dashboards, forms and API-driven UX.'
  },
  {
    title: 'Backend',
    icon: Server,
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT',
      'Middleware',
      'CRUD',
      'Validation',
      'Error Handling'
    ],
    note:
      'I build structured APIs with authentication, validation, error handling and clear request-response flows.'
  },
  {
    title: 'Database',
    icon: Database,
    items: [
      'MySQL',
      'MongoDB',
      'Mongoose',
      'Database Design',
      'Schema Design',
      'Relationships',
      'Queries'
    ],
    note:
      'I work with relational schemas, queries, relationships and application data management.'
  },
  {
    title: 'Tools & Concepts',
    icon: ShieldCheck,
    items: [
      'Git',
      'GitHub',
      'RBAC',
      'Postman',
      'Authentication',
      'API Testing'
    ],
    note:
      'Version control, API testing, authentication, RBAC and maintainable application structure.'
  }
];

const projects = [
  {
    num: '01',
    title: 'Attendance Management System',
    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MySQL'
    ],
    summary:
      'A full-stack employee attendance platform for attendance tracking, leave management and administrative reporting.',
    points: [
      'Built responsive React dashboards and forms for employee and attendance workflows.',
      'Developed REST APIs using Node.js and Express.js.',
      'Designed MySQL data structures for employees, attendance, leave and monthly summaries.',
      'Implemented authentication and role-based access for protected workflows.',
      'Added attendance calculations, monthly reporting and salary-slip generation.'
    ],
    architecture:
      'React UI → REST API → Authentication → MySQL'
  },
  {
    num: '02',
    title: 'Call Center Management Dashboard',
    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MySQL'
    ],
    summary:
      'A role-based dashboard for employee management, task assignment and operational workflow tracking.',
    points: [
      'Built responsive dashboard interfaces for employee and task workflows.',
      'Implemented role-based access for different user responsibilities.',
      'Integrated React frontend with REST APIs.',
      'Added search, filtering and status-based data handling.',
      'Structured backend routes, controllers and services for maintainable business logic.'
    ],
    architecture:
      'RBAC → React Dashboard → REST API → MySQL'
  }
];

function Section({ eyebrow, title, children, id }) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      'main section, .skill-card, .project-card, .exp-grid > div, .contact-card, .education-card'
    );

    elements.forEach((element) => element.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id={id}>
      <div className="section-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>

      {children}
    </section>
  );
}

function App() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const site = document.querySelector('.site');
    if (!site || window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (event) => {
      site.style.setProperty('--cursor-x', `${event.clientX}px`);
      site.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    const updateCursorMode = (event) => {
      const card = event.target.closest(
        '.skill-card, .project, .experience-card, .edu-grid > div, .lead-card, .contact-form, .hero-image-frame'
      );
      site.classList.toggle('cursor-on-card', Boolean(card));
    };

    const showCursor = () => site.classList.add('cursor-active');
    const hideCursor = () => site.classList.remove('cursor-active');

    window.addEventListener('pointermove', moveCursor, { passive: true });
    window.addEventListener('pointerover', updateCursorMode, { passive: true });
    window.addEventListener('pointerenter', showCursor);
    window.addEventListener('pointerleave', hideCursor);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerover', updateCursorMode);
      window.removeEventListener('pointerenter', showCursor);
      window.removeEventListener('pointerleave', hideCursor);
    };
  }, []);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    type: '',
    message: ''
  });

  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (sending) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setFormStatus({
        type: 'error',
        message: 'Please complete all fields before sending.'
      });

      return;
    }

    const apiUrl = (
      import.meta.env.VITE_API_URL || 'http://localhost:5000'
    ).replace(/\/$/, '');

    setSending(true);

    setFormStatus({
      type: '',
      message: ''
    });

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      const responseText = await response.text();

      let data = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            'The server returned an invalid response.'
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Unable to send your message. (${response.status})`
        );
      }

      setForm({
        name: '',
        email: '',
        message: ''
      });

      setFormStatus({
        type: 'success',
        message:
          'Message sent successfully. Thank you for reaching out.'
      });
    } catch (error) {
      console.error('Contact form error:', error);

      let errorMessage =
        'Something went wrong. Please try again.';

      if (error.message === 'Failed to fetch') {
        errorMessage =
          'Unable to connect to the server. Please try again in a moment.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setFormStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setSending(false);
    }
  };

  const nav = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth'
      });

    setMenu(false);
  };

  return (
    <div className="site">

      <div className="custom-cursor" aria-hidden="true">
        <span className="cursor-dot" />
        <span className="cursor-ring" />
        <span className="cursor-label">VIEW</span>
      </div>

      <div className="ambient-background" aria-hidden="true">
        <span className="ambient-orb ambient-orb-one" />
        <span className="ambient-orb ambient-orb-two" />
        <span className="ambient-orb ambient-orb-three" />
      </div>

      {/* ================= NAVIGATION ================= */}

      <header className="nav">
        <a className="brand" href="#top">
          Prashant Thainua
        </a>

        <nav className={menu ? 'nav-open' : ''}>
          {[
            ['about', 'About'],
            ['skills', 'Skills'],
            ['projects', 'Projects'],
            ['experience', 'Experience'],
            ['contact', 'Contact']
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => nav(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <a
          className="nav-resume"
          href={resume}
          download
        >
          <Download size={15} />
          Resume
        </a>

        <button
          className="menu"
          onClick={() => setMenu(!menu)}
          aria-label={
            menu
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={menu}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">

        {/* ================= HERO ================= */}

        <section className="hero">
          <div className="hero-copy">

            <div className="status">
              Hire me 
            </div>

            

            <h1>
              Building complete web applications{' '}
              
            </h1>

            <p className="hero-text">
              I’m Prashant Thainua, a Full Stack Developer who
              builds responsive React interfaces, REST APIs,
              authentication systems and database-driven
              applications using modern JavaScript technologies.
            </p>

            <div className="actions">
              <button
                className="primary"
                onClick={() => nav('projects')}
              >
                Explore my work
                <ArrowRight size={17} />
              </button>

              <a
                className="secondary"
                href={resume}
                download
              >
                <Download size={17} />
                Download Resume
              </a>
            </div>



          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85"
                alt="Developer working on a software project"
              />
              <div className="hero-image-caption">
                <Code2 size={15} />
                Building reliable web applications
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}

        <Section
          eyebrow="01 · About"
          title="A developer who explains the system, not just the screen."
          id="about"
        >
          <div className="about-grid">

            <div className="lead-card">
              <span className="quote">“</span>

              <p>
                I build applications by understanding the
                complete flow — from the interface a user
                interacts with to the API, business logic and
                database behind it.
              </p>
            </div>

            <div className="about-copy">
              <p>
                During my experience at BCS Infallible
                Technology, I worked across frontend, backend
                and database using React.js, Node.js,
                Express.js, MySQL and MongoDB.
              </p>

              <p>
                I have worked with reusable React components,
                dashboards, forms, CRUD workflows, REST APIs,
                authentication, role-based access control,
                validation and database operations.
              </p>

              <div className="mini-list">
                <span>
                  <CheckCircle2 />
                  React interfaces
                </span>

                <span>
                  <CheckCircle2 />
                  REST API integration
                </span>

                <span>
                  <CheckCircle2 />
                  Authentication
                </span>

                <span>
                  <CheckCircle2 />
                  Database-driven applications
                </span>
              </div>
            </div>

          </div>
        </Section>

        {/* ================= SKILLS ================= */}

        <Section
          eyebrow="02 · Technical Stack"
          title="Skills with context."
          id="skills"
        >
          <div className="skill-grid">

            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                <article
                  className="skill-card"
                  key={skill.title}
                >
                  <div className="icon">
                    <Icon size={19} />
                  </div>

                  <h3>{skill.title}</h3>

                  <div className="tags">
                    {skill.items.map((item) => (
                      <span key={item}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <p>{skill.note}</p>
                </article>
              );
            })}

          </div>
        </Section>

        {/* ================= PROJECTS ================= */}

        <Section
          eyebrow="03 · Selected Work"
          title="Projects that demonstrate the architecture."
          id="projects"
        >
          <div className="project-list">

            {projects.map((project) => (
              <article
                className="project"
                key={project.num}
              >
                <div className="project-num">
                  {project.num}
                </div>

                <div className="project-main">

                  <div className="project-title">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>

                    <span className="arch">
                      {project.architecture}
                    </span>
                  </div>

                  <div className="tags">
                    {project.stack.map((item) => (
                      <span key={item}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <ul>
                    {project.points.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={16} />
                        {point}
                      </li>
                    ))}
                  </ul>

                </div>
              </article>
            ))}

          </div>
        </Section>

        {/* ================= EXPERIENCE ================= */}

        <Section
          eyebrow="04 · Experience"
          title="Where I applied the stack."
          id="experience"
        >
          <div className="experience-card">

            <div className="timeline-dot" />

            <div>
              <p className="date">
                JUN 2025 — JAN 2026 · AGRA
              </p>

              <h3>
                Software Developer Intern{' '}
                <span>
                  @ BCS Infallible Technology
                </span>
              </h3>

              <p className="exp-intro">
                Worked on production-oriented web
                application development across React,
                Node.js, Express and MySQL.
              </p>

              <div className="exp-grid">

                <div>
                  <p>
                    Built and integrated 15+ RESTful
                    endpoints with authentication,
                    validation and structured error
                    handling.
                  </p>
                </div>

                <div>
                  <p>
                    Built{' '}
                    <b>
                      JWT authentication + role guards
                    </b>{' '}
                    for Admin, Manager and Employee
                    access patterns.
                  </p>
                </div>

                <div>
                  <p>
                    Modelled normalized{' '}
                    <b>MySQL schemas</b> for employees,
                    attendance, leave etc.
                  </p>
                </div>

                <div>
                  <p>
                    Integrated React with backend APIs,
                    including async states, HTTP errors
                    and consistent responses.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </Section>

        {/* ================= EDUCATION ================= */}

        <Section
          eyebrow="05 · Education"
          title="Academic foundation."
          id="education"
        >
          <div className="edu-grid">

            <div>
              <span>2025</span>
              <h3>
                Master of Computer Applications
              </h3>
              <p>
                Dr. A.P.J. Abdul Kalam Technical
                University (AKTU)
              </p>
            </div>

            <div>
              <span>2021</span>
              <h3>
                Bachelor of Computer Applications
              </h3>
              <p>
                Dr. Bhimrao Ambedkar University
              </p>
            </div>

            <div>
              <span>Certifications</span>
              <h3>
                React.js · C Programming
              </h3>
              <p>
                React.js certification from Udemy,
                C Programming certification completed
                through local training.
              </p>
            </div>

          </div>
        </Section>

        {/* ================= CONTACT ================= */}

        <section
          className="contact"
          id="contact"
        >
          <div className="contact-copy">

            <span className="eyebrow">
              06 · Contact
            </span>

            <h2>
              Have a role, project or technical
              conversation in mind?
            </h2>

            <p>
              I’m open to Full Stack Developer and
              Software Engineer opportunities where I can
              contribute across frontend, backend and
              database development.
            </p>

            <div className="contact-links">

              <a
                href={`mailto:${profile.email}`}
              >
                <Mail size={17} />
                {profile.email}
              </a>

              <a
                href={`tel:${profile.phone}`}
              >
                <Phone size={17} />
                {profile.phone}
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} />
                GitHub
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={17} />
                LinkedIn
              </a>

            </div>
          </div>

          <form
            onSubmit={submit}
            className="contact-form"
          >

            <label>
              Name

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
                placeholder="Your name"
                autoComplete="name"
                required
                disabled={sending}
              />
            </label>

            <label>
              Email

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value
                  })
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={sending}
              />
            </label>

            <label>
              Message

              <textarea
                rows="5"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value
                  })
                }
                placeholder="Tell me about your role, project or opportunity..."
                required
                disabled={sending}
              />
            </label>

            <button
              className="primary"
              type="submit"
              disabled={sending}
            >
              <Send size={16} />

              {sending
                ? 'Sending...'
                : 'Send message'}
            </button>

            {formStatus.message && (
              <div
                className={`form-status ${formStatus.type}`}
                role="status"
                aria-live="polite"
              >
                {formStatus.type === 'success' ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <AlertCircle size={17} />
                )}

                <span>
                  {formStatus.message}
                </span>
              </div>
            )}

            {!formStatus.message && (
              <small>
                Your message will be sent securely
                through the portfolio contact form.
              </small>
            )}

          </form>
        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer>
        <span>
          © 2026 Prashant Thainua
        </span>

      </footer>

    </div>
  );
}

createRoot(
  document.getElementById('root')
).render(<App />);