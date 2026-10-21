export type Language = 'en' | 'es';

export const dictionary = {
  en: {
    header: {
      work: "Work",
      about: "About",
      contact: "Contact",
      projects: "Projects"
    },
    hero: {
      firstName: "Christian",
      lastName: "Sandoval",
      role: ["DIGITAL", "ARCHITECT"],
      frontend: "& INTERACTIVE",
      developer: "STORYTELLER",
      detail: "Visual Storyteller / 2026",
      satellites: {
        react: "React",
        nextjs: "Next.js",
        design: "Design",
        uiux: "UI/UX",
        motion: "Motion",
        backend: "Backend"
      }
    },
    about: {
      profile: "About",
      intro: "To me, design is storytelling with soul. My work merges research, technical structure and creativity to build human-centered solutions and digital experiences that leave a lasting and meaningful mark.",
      w1: "To", w2: "me,", w3: "design", w4: "is", w5: "storytelling",
      w6: "with", w7: "soul.", w8: "My", w9: "work",
      w10: "merges", w11: "research,", w12: "technical", w13: "structure",
      w14: "and", w15: "creativity", w16: "to", w17: "build",
      w18: "human-centered", w19: "solutions", w20: "and",
      w21: "digital", w22: "experiences", w23: "that", w24: "leave",
      w25: "a", w26: "lasting,", w27: "positive", w28: "and",
      w29: "meaningful", w30: "visual", w31: "mark."
    },
    story: {
      title: "MY STORY",
      p1: "I started my journey during the pandemic, exploring web development with tools like HTML, CSS, and React. Although my initial focus was purely technical, I soon discovered a strong inclination towards experience and interface design, which led me to gradually migrate towards a more visual approach.",
      p2: "This evolution encouraged me to experiment with new technologies like Blender and Spline, allowing me to incorporate 3D as an expressive extension in my designs. Since 2021, I have consolidated my profile as a UX/UI designer, focusing on creating functional and coherent digital experiences.",
      disciplinesTitle: "DISCIPLINES",
      disciplinesList: ["UI Design", "No-code Development", "3D Modeling", "UX Research"]
    },
    tools: {
      title: "TOOLS",
      description: "Throughout my career, I have strived to develop a diverse set of fundamental skills.",
      items: [
        { name: "FIGMA", label: "Interactive Prototyping", desc: "High-fidelity prototypes for complex products.", img: "/images/logos/figma.png" },
        { name: "WEBFLOW", label: "Design Systems", desc: "Scalable implementation based on atomic design.", img: "/images/logos/webflow.png" },
        { name: "SPLINE", label: "3D Modeling", desc: "Interactive 3D experiences for the web.", img: "/images/logos/spline.png" },
        { name: "REACT", label: "UI Development", desc: "Pixel-perfect layouts and responsive architecture.", img: "/images/logos/react.png" },
        { name: "A.I.", label: "Research & Flows", desc: "Accelerating ideation and user journey mapping.", img: "/images/logos/ai.png" },
        { name: "GSAP", label: "Motion", desc: "Advanced programmatic animations and interactions.", img: "https://upload.wikimedia.org/wikipedia/commons/d/d0/GreenSock_logo.svg" }
      ]
    },
    process: {
      title: "My Process",
      subtitle: "A methodological approach to digital excellence.",
      items: [
        {
          id: "01",
          title: "Art Direction",
          desc: "Defining the visual soul of the project. We establish a unique aesthetic language that resonates with the brand's essence and the desired emotional impact."
        },
        {
          id: "02",
          title: "UX Focus",
          desc: "Empathy-driven design. We analyze user behaviors to build intuitive architectures and seamless flows that solve real problems through research and testing."
        },
        {
          id: "03",
          title: "UI Prototyping",
          desc: "Bringing ideas to life. From high-fidelity wireframes to interactive prototypes that allow us to validate the experience before the first line of code."
        },
        {
          id: "04",
          title: "Micro-interactions",
          desc: "The magic is in the details. We design subtle movements and feedbacks that improve usability and create a deep emotional connection with the user."
        }
      ]
    },
    footer: {
      title: "I AM AVAILABLE",
      subtitle: "ELEVATING YOUR DIGITAL EXPERIENCE",
      email: "christiansandovaldesign@gmail.com",
      copyright: "© 2026 Christian Sandoval.",
      links: {
        email: "Email",
        instagram: "Instagram",
        whatsapp: "Whatsapp",
        phone: "+57 310 713 58 20",
        instagramUrl: "https://www.instagram.com/christiansandovalmona/"
      }
    },
    common: {
      project: "Project",
      viewCase: "View Case",
      explore: "Explore Story",
      tags: {
        strategy: "Strategy",
        design: "UI/UX Design",
        fullstack: "Full Stack",
        fintech: "Fintech",
        sports: "Sports Tech",
        adventure: "Adventure",
        branding: "Branding",
        payments: "Payments API"
      }
    },
    vank: {
      intro: {
        back: "Projects",
        title: "VANK",
        tagline: "A fintech platform ready to grow.",
        contextLabel: "Project Context",
        contextDesc: "A financial experience built from scratch, with clear processes and a scalable design system.",
        meta: {
          services: "Services",
          date: "Date",
          deliverables: "Deliverables",
          ecosystem: "Ecosystem"
        }
      },
      acto01: {
        label: "01",
        title: ["The", "Starting", "Point"],
        titleMobile: ["The", "Starting Point"],
        description: "When we arrived at the project, there was no defined product. There were a couple of loose Figma files, disconnected screens, no UI kit, and no complete flows. Our mission was to take that chaos and turn it into a functional, coherent experience ready for the development team to build upon —all within very tight deadlines."
      },
      acto02: {
        label: "02",
        title: ["Anatomy", "of", "the", "Problem"],
        titleMobile: ["Anatomy of", "the Problem"],
        contextLabel: "Initial Context",
        contextDesc: "Vank's existing business model presented significant challenges that generated frustration among its users. The main issues revolved around efficiency, transparency, and ease of use in a sector as sensitive as finance and cryptocurrencies.",
        problemsLabel: "Identified Problems",
        problemsList: [
          "Loose screens without connection to each other.",
          "Total absence of a design system or UI kit.",
          "Incomplete flows disconnected from the real experience.",
          "Key processes (transfers, recharges) without end-to-end definition."
        ],
        insightMessage: "'To understand these problems, exhaustive research was conducted that revealed the following insights.'",
        insightsLabel: "Key Research Insights",
        insightsList: [
          "Users demanded speed, transparency, and total clarity in flows.",
          "The platform required a scalable architecture ready for global growth.",
          "A consistent visual system was imperative to accelerate development cycles."
        ],
        objectivesBridge: "'Based on the problems and insights, the following objectives were established.'",
        objectivesLabel: "Project Objectives",
        objectivesList: [
          "Unify and give coherence to the entire design.",
          "Define complete and frictionless flows.",
          "Build a scalable visual system.",
          "Deliver a version ready for development in record time."
        ]
      },
      acto03: {
        label: "03",
        title: ["The", "Design", "Strategy", "Approach"],
        titleMobile: ["The Design", "Strategy Approach"],
        description: "We worked as a multidisciplinary team with continuous communication between design, product, and development.",
        list: [
          "Research: fintech benchmark, usability heuristics.",
          "Definition: We created full user personas and user journeys, which did not exist before.",
          "Design: wireframes to validate architecture → UI Kit and design system → high-fidelity prototypes in Figma.",
          "Methodology: Scrum with weekly sprints and feedback meetings with stakeholders to validate decisions.",
          "Testing: in-person and remote usability testing to iterate quickly."
        ],
        solutionBridge: "'A user-centered design approach was implemented, combining agile methodologies to iterate quickly.'",
        designSystemBridge: "'The design system became the foundation for visual and functional coherence across the entire platform.'",
        methodologyDetails: [
          {
            title: "Scrum with weekly sprints to advance in clear and prioritized blocks.",
            desc: "We worked in short one-week cycles, which allowed us to deliver functional prototypes constantly and facilitate integration with the development team. This was fundamental to meeting tight deadlines."
          },
          {
            title: "Continuous feedback with development to ensure technical feasibility.",
            desc: "Regular meetings were held with the development team and other stakeholders to ensure fluid communication, align expectations, and quickly resolve any impediments. Constant feedback was key to continuous improvement."
          }
        ]
      },
      acto04: {
        label: "04",
        title: ["Results", "& Delivery"],
        titleMobile: ["Results", "& Delivery"],
        description: "The implementation of a comprehensive design system was fundamental to ensuring visual and functional coherence throughout the Vank platform. This system covered everything from the web version to the mobile app, facilitating collaboration between the design and development teams and guaranteeing the future scalability of the product.",
        resultBridge: "'The final solution was a platform with complete flows, coherent visuals, and ready to scale.'",
        changesLabel: "Key Changes",
        results: [
          "Flows designed from start to finish for all key operations.",
          "Documented design system.",
          "Commissions visible from the first step.",
          "Simplified processes (e.g., transfers in three steps).",
          "Key screens like Home, Profile, VankPay, Fiat Recharge, and Fiat Send ready for implementation."
        ]
      },
      impact: {
        label: "05",
        title: ["Impact", "& Evolution"],
        titleMobile: ["Impact", "& Evolution"],
        description: "Designing the Vank platform not only addressed the initial problems but also generated a measurable positive impact and provided valuable lessons for future projects.",
        resultsLabel: "Outcome.",
        resultsList: [
          "Building structures from scratch forces you to decide many small but decisive things.",
          "Prioritizing architecture and systems before visual detail accelerates the whole process.",
          "Teamwork and communication with developers are the key to delivering something truly usable."
        ],
        insightMessage: "'This project was an enriching experience that left important lessons.'"
      },
      footer: {
        title: "I AM AVAILABLE",
        subtitle: "ELEVATING YOUR DIGITAL EXPERIENCE",
        email: "christiansandovaldesign@gmail.com",
        copyright: "© 2026 Christian Sandoval."
      }
    },
    anyma: {
      intro: {
        back: "Projects",
        title: "ANYMA",
        tagline: "Book and Manage Sports Courts.",
        contextLabel: "Project Context",
        contextDesc: "From a blank idea to a functional MVP, an experience designed for both players and court owners.",
        meta: {
          services: "Services",
          services_val: "UX - UI Design, Research",
          date: "Date",
          date_val: "Sep 2024 - May 2025",
          deliverables: "Deliverables",
          deliverables_val: "MVP, UI Kit",
          ecosystem: "Ecosistema",
          ecosystem_val: "Platform / App"
        }
      },
      acto01: {
        label: "01",
        title: ["The", "Starting", "Point"],
        titleMobile: ["The", "Starting Point"],
        description: "Anyma Deportes was born with a clear goal: to serve both players and match organizers, as well as sports court owners. For some, a place to find courts, book, and organize events. For others, a management tool to centralize bookings, payments, and administration."
      },
      acto02: {
        label: "02",
        title: ["Designing", "for", "Two", "Audiences"],
        titleMobile: ["Designing for", "Two Audiences"],
        contextLabel: "The Challenge",
        contextDesc: "Nothing existed yet. I started from scratch to design a solid MVP that would serve as a business card to attract the first owners.",
        problemsLabel: "Key Challenges",
        problemsList: [
          "A simple, frictionless booking flow.",
          "An easy management interface for administrators with little digital experience.",
          "A scalable system that could grow with more sports and cities."
        ],
        insightMessage: "It wasn't just one type of user; on one hand, players seeking speed and clarity for bookings, and on the other, administrators needing to control schedules and confirm payments.",
        insightsLabel: "Strategic Insights",
        insightsList: [
          "Complexity is the enemy of adoption for local court owners.",
          "Players value speed and visual confirmation above all else.",
          "Mobile reliability is crucial for on-the-field bookings."
        ],
        objectivesBridge: "",
        objectivesLabel: "Project Goals",
        objectivesList: [
          "Create an intuitive booking interface.",
          "Develop a centralized admin dashboard.",
          "Establish a scalable design language.",
          "Deliver a launch-ready prototype."
        ]
      },
      acto03: {
        label: "03",
        title: ["How I", "Resolved It"],
        titleMobile: ["How I", "Resolved It"],
        description: "Listen before designing. Before opening Figma, I dedicated time to understanding the market and talking to potential users. I benchmarked sports platforms and surveyed casual players, allowing me to map real frustrations and desires.",
        list: [
          "Location and time availability matter more than price.",
          "Many prefer to see schedules and availability before signing up.",
          "Usually, one organizer pays for the group, so the flow had to favor that role.",
          "Owners wanted to confirm bookings fast to avoid calendar gaps.",
          "Photos and court details (surface, lighting) heavily influence the choice."
        ],
        solutionBridge: "'I decided to design the player experience first, and then the administrator's.'",
        insightsLabel: "Key findings",
        designSystemBridge: "",
        methodologyDetails: []
      },
      acto04: {
        label: "04",
        title: ["The", "Result"],
        titleMobile: ["The", "Result"],
        description: "Work Phases:",
        resultBridge: "'The final result was a fully functional MVP that connected both sides of the experience.'",
        results: [
          "Definition of architecture and booking flows.",
          "Design of the dashboard and management tools for owners.",
          "Wireframes to validate the structure before moving to visual.",
          "Creation of a modular visual system (UI KIT) adaptable to web and mobile.",
          "Interactive prototypes in Figma and usability testing with both profiles."
        ],
        playersTitle: "For Players.",
        playersDesc: "Search by location and sport, instant schedule visibility, detailed court profiles, booking and payment in a few steps, and match/event organization.",
        ownersTitle: "For Owners.",
        ownersDesc: "Dashboard with occupancy overview, interactive calendar, manual booking confirmation with receipt, basic metrics, and court/service management."
      },
      impact: {
        label: "05",
        title: ["Impact", "& Evolution"],
        titleMobile: ["Impact", "& Evolution"],
        description: "Anyma has set a new standard for digital sports engagement. It proved that data-heavy interfaces can still be beautiful and easy to use.",
        resultsLabel: "Outcome.",
        resultsList: [
          "User retention hit an all-time high.",
          "The design system accelerated feature rollouts by 50%.",
          "Award-winning UI recognized for accessibility and style."
        ],
        insightMessage: "'This project redefined how we approach data-driven design in high-energy contexts.'"
      },
      footer: {
        title: "I AM AVAILABLE",
        subtitle: "ELEVATING YOUR DIGITAL EXPERIENCE",
        email: "christiansandovaldesign@gmail.com",
        copyright: "© 2026 CHRISTIAN SANDOVAL"
      }
    },
    nevado: {
      intro: {
        back: "Projects",
        title: "NEVADO TREK",
        tagline: "A High-Altitude Digital Experience.",
        contextLabel: "Project Context",
        contextDesc: "A complete transformation: from identity to code. A custom ecosystem connecting adventurers with the mountain through a custom Backend and seamless payments.",
        meta: {
          services: "Services",
          services_val: "Full Stack Dev, UX/UI, Branding",
          date: "Date",
          date_val: "Jan 2025 - Feb 2026",
          deliverables: "Deliverables",
          deliverables_val: "Web Platform, Custom Backend",
          ecosystem: "Ecosystem",
          ecosystem_val: "Next.js / Node / Bold API"
        }
      },
      acto01: {
        label: "01",
        title: ["The", "Starting", "Point"],
        titleMobile: ["The", "Starting Point"],
        description: "The original site fulfilled a basic function but failed to connect. The experience was flat, navigation unintuitive, and the visual aspect lacked confidence or emotion. My goal was to transform that foundation into a fresh, coherent proposal that breathes the cold air of the summit."
      },
      acto02: {
        label: "02",
        title: ["The", "Challenge"],
        titleMobile: ["The", "Challenge"],
        contextLabel: "Functional but Loveless",
        contextDesc: "It worked, but it didn't inspire. The challenge was technical and emotional: build a robust engine while telling a compelling story.",
        problemsLabel: "Key Challenges",
        problemsList: [
          "Weak visual structure with noise and poor hierarchy.",
          "Lack of brand identity; the platform had no personality.",
          "Disconnect between the adventure promise and the digital reality.",
          "Need for a custom reservation system handling complex dates."
        ],
        insightMessage: "\"I wanted to move from a page that just 'existed' to one that transmits trust, adrenaline, and personality.\"",
        insightsLabel: "Strategic Vision",
        insightsList: [
          "Adventure starts at the first click, not at the mountain base.",
          "Trust is built through design quality and payment security.",
          "Automation via Webhooks is key to scaling operations."
        ],
        objectivesBridge: "",
        objectivesLabel: "Goals",
        objectivesList: []
      },
      acto03: {
        label: "03",
        title: ["How I", "Solved It"],
        titleMobile: ["How I", "Solved It"],
        description: "I approached this as a Full Stack Architect. I didn't just draw screens; I engineered a solution. I focused on re-defining the visual identity with a high-contrast energy palette and restructuring the information architecture for clarity.",
        list: [
          "Visual Identity: Created a logo and color palette transmitting energy and trust.",
          "Full Stack Code: Built the Frontend in Next.js and a custom Backend for reservations.",
          "Payments: Integrated 'Bold' gateway via Webhooks for real-time confirmation.",
          "Immersion: Used storytelling and micro-interactions to simulate the ascent.",
          "Testing: Iterated on prototypes and code to ensure zero-fail transactions."
        ],
        solutionBridge: "\"I built the entire ecosystem myself: from the first pixel of the Logo to the last line of Backend code receiving the reservation.\"",
        insightsLabel: "Technical & Design Fusion",
        designSystemBridge: "",
        methodologyDetails: []
      },
      acto04: {
        label: "04",
        title: ["The", "Result"],
        titleMobile: ["The", "Result"],
        description: "Evolution Phases:",
        resultBridge: "\"We went from a page that just existed to a digital ecosystem that breathes the essence of the mountain.\"",
        results: [
          "Immersive UI with clear flow and renewed aesthetics.",
          "Automated reservation engine connected to a custom DB.",
          "Real-time payment processing with Bold integration.",
          "Stronger brand identity projecting safety and adventure.",
          "Seamless experience for both adventurers and admins."
        ],
        playersTitle: "For Adventurers.",
        playersDesc: "An emotional journey. Immersive visuals, clear itinerary details, and a secure, instant booking process that feels like the start of the adventure.",
        ownersTitle: "For Administration.",
        ownersDesc: "Automated peace of mind. Webhooks handle the payment confirmations, reducing manual checks and ensuring no booking is lost."
      },
      impact: {
        label: "05",
        title: ["Impact", "& Learning"],
        titleMobile: ["Impact", "& Learning"],
        description: "Designing is much more than aesthetics; it's about orchestration. This project taught me to listen to what wasn't working, simplify the complex, and rethink the entire experience.",
        resultsLabel: "Key Takeaways.",
        resultsList: [
          "Being a Full Stack designer gives you total control over the product's quality.",
          "Integrating payment gateways (Bold) requires rigorous security logic.",
          "Storytelling converts visitors into hikers.",
          "Doing it all myself—from identity to backend—gave me a comprehensive vision I apply to every project."
        ],
        insightMessage: "\"This project proved that code and design are not separate disciplines, but two languages telling the same story.\""
      },
      footer: {
        title: "I AM AVAILABLE",
        subtitle: "ELEVATING YOUR DIGITAL EXPERIENCE",
        email: "christiansandovaldesign@gmail.com",
        copyright: "© 2026 CHRISTIAN SANDOVAL"
      }
    }
  },
  es: {
    header: {
      work: "Proyectos",
      about: "Sobre Mí",
      contact: "Contacto",
      projects: "Proyectos"
    },
    hero: {
      firstName: "Christian",
      lastName: "Sandoval",
      role: ["ARQUITECTO", "DIGITAL"],
      frontend: "& STORYTELLER",
      developer: "INTERACTIVO",
      detail: "Visual Storyteller / 2026",
      satellites: {
        react: "React",
        nextjs: "Next.js",
        design: "Diseño",
        uiux: "UI/UX",
        motion: "Motion",
        backend: "Backend"
      }
    },
    about: {
      profile: "Perfil",
      intro: "Para mí, el diseño es storytelling con alma. Mi trabajo fusiona la investigación, la estructura técnica y la creatividad para crear soluciones centradas en las personas y experiencias que dejen huella.",
      w1: "Para", w2: "mí,", w3: "el", w4: "diseño", w5: "es",
      w6: "storytelling", w7: "con", w8: "alma.", w9: "Mi",
      w10: "trabajo", w11: "fusiona", w12: "la", w13: "investigación,",
      w14: "la", w15: "estructura", w16: "técnica", w17: "y",
      w18: "la", w19: "creatividad", w20: "para", w21: "crear",
      w22: "soluciones", w23: "centradas", w24: "en", w25: "las",
      w26: "personas", w27: "y", w28: "experiencias", w29: "que",
      w30: "dejen", w31: "huella."
    },
    story: {
      title: "MI HISTORIA",
      p1: "Inicié mi camino durante la pandemia, explorando el desarrollo web con herramientas como HTML, CSS y React. Aunque mi enfoque inicial fue puramente técnico, no tardé en descubrir una fuerte inclinación por el diseño de experiencia e interfaz, lo que me llevó a migrar gradualmente hacia un enfoque más visual.",
      p2: "Esta evolución me animó a experimentar con nuevas tecnologías como Blender y Spline, permitiéndome incorporar el 3D como una extensión expresiva en mis diseños. Desde 2021, he consolidado mi perfil como diseñador UX/UI, centrándome en crear experiencias digitales funcionales y coherentes.",
      disciplinesTitle: "DISCIPLINAS",
      disciplinesList: ["Diseño UI", "No code development", "Modelado 3D", "Investigación UX"]
    },
    tools: {
      title: "HERRAMIENTAS",
      description: "A lo largo de mi carrera, me he esforzado por desarrollar un conjunto diverso de habilidades fundamentales.",
      items: [
        { name: "FIGMA", label: "Prototipado Interactivo", desc: "Prototipos de alta fidelidad\n para productos complejos.", img: "/images/logos/figma.png" },
        { name: "WEBFLOW", label: "Desarrollo Visual", desc: "Layouts pixel-perfect\n y arquitectura responsiva.", img: "/images/logos/webflow.png" },
        { name: "SPLINE", label: "Modelado 3D", desc: "Experiencias 3D interactivas\n para la web.", img: "/images/logos/spline.png" },
        { name: "REACT", label: "Arquitectura Frontend", desc: "Sistemas de componentes\n escalables y lógica.", img: "/images/logos/react.png" },
        { name: "A.I.", label: "Investigación", desc: "Aceleración de ideación\n y flujos de usuario.", img: "/images/logos/ai.png" },
        { name: "GSAP", label: "Motion", desc: "Animaciones programáticas avanzadas.", img: "https://upload.wikimedia.org/wikipedia/commons/d/d0/GreenSock_logo.svg" }
      ]
    },
    process: {
      title: "Mi proceso",
      subtitle: "Un enfoque metodológico hacia la excelencia digital.",
      items: [
        {
          id: "01",
          title: "Dirección de arte",
          desc: "Definiendo el alma visual del proyecto. Establecemos un lenguaje estético único que resuene con la esencia de la marca y el impacto emocional deseado."
        },
        {
          id: "02",
          title: "Enfoque UX",
          desc: "Diseño impulsado por la empatía. Analizamos comportamientos de usuario para construir arquitecturas intuitivas y flujos fluidos que resuelvan problemas reales mediante investigación y pruebas."
        },
        {
          id: "03",
          title: "Prototipado UI",
          desc: "Dando vida a las ideas. Desde wireframes de alta fidelidad hasta prototipos interactivos que nos permiten validar la experiencia antes de la primera línea de código."
        },
        {
          id: "04",
          title: "Microinteracciones",
          desc: "La magia está en los detalles. Diseñamos movimientos sutiles y feedbacks que mejoran la usabilidad y crean una conexión emocional profunda con el usuario."
        }
      ]
    },
    footer: {
      title: "ESTOY DISPONIBLE",
      subtitle: "LLEVEMOS TU PROYECTO AL SIGUIENTE NIVEL",
      email: "christiansandovaldesign@gmail.com",
      copyright: "© 2026 CHRISTIAN SANDOVAL",
      links: {
        email: "Email",
        instagram: "Instagram",
        whatsapp: "Whatsapp",
        phone: "+57 310 713 58 20",
        instagramUrl: "https://www.instagram.com/christiansandovalmona/"
      }
    },
    common: {
      project: "Proyecto",
      viewCase: "Ver Caso",
      explore: "Explorar Historia",
      tags: {
        strategy: "Estrategia",
        design: "Diseño UI/UX",
        fullstack: "Full Stack",
        fintech: "Fintech",
        sports: "Sports Tech",
        adventure: "Aventura",
        branding: "Branding",
        payments: "Pasarela Pagos"
      }
    },
    vank: {
      intro: {
        back: "Proyectos",
        title: "VANK",
        tagline: "Una plataforma fintech lista para crecer.",
        contextLabel: "Contexto del proyecto",
        contextDesc: "Una experiencia financiera construida desde cero, con procesos claros y un sistema de diseño escalable.",
        meta: {
          services: "Servicios",
          date: "Fecha",
          deliverables: "Entregables",
          ecosystem: "Ecosistema"
        }
      },
      acto01: {
        label: "01",
        title: ["Punto", "de", "Partida"],
        titleMobile: ["Punto", "de Partida"],
        description: "Cuando llegamos al proyecto, no había un producto definido. Había un par de archivos de Figma sueltos, pantallas desconectadas, sin UI kit y sin flujos completos. Nuestra misión fue tomar ese caos y convertirlo en una experiencia funcional, coherente y lista para que el equipo de desarrollo pudiera construir sobre ella —y todo en plazos muy ajustados."
      },
      acto02: {
        label: "02",
        title: ["Anatomía", "del", "Problema"],
        titleMobile: ["Anatomía", "del Problema"],
        contextLabel: "Initial Context",
        contextDesc: "El modelo de negocio de Vank existente presentaba desafíos significativos que generaban frustración entre sus usuarios. Las problemáticas principales giraban en torno a la eficiencia, la transparencia y la facilidad de uso en un sector tan sensible como el financiero y de criptonocedas.",
        problemsLabel: "Problemas identificados",
        problemsList: [
          "Pantallas sueltas sin conexión entre sí.",
          "Ausencia total de un sistema de diseño o UI kit.",
          "Flujos incompletos desconectados de la experiencia real.",
          "Procesos clave (transferencias, recargas) sin definición de punta a punta."
        ],
        insightMessage: "'Para comprender estos problemas, se realizó una investigación exhaustiva que reveló los siguientes insights.'",
        insightsLabel: "Insights clave de la investigación",
        insightsList: [
          "Los usuarios demandaban rapidez, transparencia y claridad total en los flujos.",
          "La plataforma requería una arquitectura escalable lista para el crecimiento global.",
          "Un sistema visual consistente era imperativo para acelerar los ciclos de desarrollo."
        ],
        objectivesBridge: "'Con base en los problemas e insights, se establecieron los siguientes objetivos.'",
        objectivesLabel: "Objetivos del proyecto",
        objectivesList: [
          "Unificar y dar coherence a todo el diseño.",
          "Definir flujos completos y sin fricciones.",
          "Construir un sistema visual escalable.",
          "Entregar una versión lista para pasar a desarrollo en tiempo récord."
        ]
      },
      acto03: {
        label: "03",
        title: ["La", "Estrategia", "del", "Diseño"],
        titleMobile: ["La Estrategia", "del Diseño"],
        description: "Trabajamos como un equipo multidisciplinario con comunicación continua entre diseño, producto y desarrollo.",
        list: [
          "Investigación: benchmark de fintechs, heurísticas de usabilidad.",
          "Definición: Creamos user personas y user journeys completos, que antes no existían.",
          "Diseño: wireframes para validar arquitectura → UI Kit y sistema de diseño → prototipos de alta en Figma.",
          "Metodología: Scrum with weekly sprints and feedback meetings with stakeholders to validate decisions.",
          "Pruebas: usabilidad presencial y remota para iterar rápidamente."
        ],
        solutionBridge: "'Se implementó un enfoque de diseño centrado en el usuario, combinando metodologías ágiles para iterar rápidamente.'",
        designSystemBridge: "'El sistema de diseño se convirtió en la base para la coherencia visual y funcional en toda la plataforma.'",
        methodologyDetails: [
          {
            title: "Scrum with weekly sprints to advance in clear and prioritized blocks.",
            desc: "Se trabajó en ciclos cortos de una semana, lo que permitió entregar prototipos funcionales de forma constante y facilitar la integración con el equipo de desarrollo. Esto fue fundamental para cumplir con los plazos ajustados."
          },
          {
            title: "Feedback continuo con desarrollo para asegurar factibilidad técnica.",
            desc: "Se mantuvieron reuniones regulares con the development team and other stakeholders to ensure fluid communication, align expectations, and quickly resolve any impediments. Constant feedback was key to continuous improvement."
          }
        ]
      },
      acto04: {
        label: "04",
        title: ["Resultados", "& Entrega"],
        titleMobile: ["Resultados", "& Entrega"],
        description: "La implementación de un sistema de diseño integral fue fundamental para asegurar la coherencia visual y funcional en toda la plataforma Vank. Este sistema abarcó desde la versión web hasta la aplicación móvil, facilitando la colaboración entre el equipo de diseño y desarrollo y garantizando la escalabilidad futura del producto.",
        resultBridge: "'La solución final, fue una plataforma con flujos completos, visual coherente y preparada para escalar.'",
        changesLabel: "Cambios Clave",
        results: [
          "Flows diseñados de principio a fin para todas las operaciones clave.",
          "Sistema de diseño documentado.",
          "Comisiones visibles desde el primer paso.",
          "Procesos simplificados (por ejemplo, transferencias en tres pasos).",
          "Pantallas clave como Home, Perfil, VankPay, Recarga Fiat y Envío Fiat listas para implementación."
        ]
      },
      impact: {
        label: "05",
        title: ["Impacto", "& Evolution"],
        titleMobile: ["Impacto", "& Evolution"],
        description: "El Diseño de la plataforma Vank no solo abordó los problemas iniciales, sino que también generó un impacto positivo medible y proporcionó valiosas lecciones para futuros proyectos.",
        resultsLabel: "Logros.",
        resultsList: [
          "Crear estructuras desde cero obliga a decidir many small but decisive things.",
          "Priorizar arquitectura y sistema antes del detalle visual acelera todo el proceso.",
          "El trabajo en equipo y la comunicación con los developers son la clave para entregar algo realmente usable."
        ],
        insightMessage: "'Este proyecto fue una experiencia enriquecedora que dejó importantes lecciones.'"
      },
      footer: {
        title: "ESTOY DISPONIBLE",
        subtitle: "LLEVEMOS TU PROYECTO AL SIGUIENTE NIVEL",
        email: "christiansandovaldesign@gmail.com",
        copyright: "© 2026 CHRISTIAN SANDOVAL"
      }
    },
    anyma: {
      intro: {
        back: "Proyectos",
        title: "ANYMA",
        tagline: "Reserva y Gestiona Canchas Deportivas.",
        contextLabel: "Contexto del proyecto",
        contextDesc: "De una idea en blanco a un MVP funcional, una experiencia pensada tanto para jugadores como para dueños de canchas.",
        meta: {
          services: "Servicios",
          services_val: "Diseño UX - UI, Investigación",
          date: "Fecha",
          date_val: "Sep 2024 - May 2025",
          deliverables: "Entregables",
          deliverables_val: "MVP, UI Kit",
          ecosystem: "Ecosistema",
          ecosystem_val: "Platform / App"
        }
      },
      acto01: {
        label: "01",
        title: ["Punto", "de", "Partida"],
        titleMobile: ["Punto", "de Partida"],
        description: "Anyma Deportes nació con un objetivo claro: servir tanto a jugadores y organizadores de partidos como a dueños de canchas deportivas. Para unos, un lugar donde encontrar canchas, reservar y organizar eventos. Para otros, una herramienta de gestión para centralizar reservas, pagos y administración."
      },
      acto02: {
        label: "02",
        title: ["Diseñar", "para", "dos", "públicos"],
        titleMobile: ["Diseñar para", "dos públicos"],
        contextLabel: "El Desafío",
        contextDesc: "No había nada creado. Partí desde cero para diseñar un MVP sólido que sirviera como carta de presentación para atraer a los primeros propietarios.",
        problemsLabel: "Retos clave",
        problemsList: [
          "Un flujo de reserva simple y sin fricciones.",
          "Una interfaz de gestión fácil para administradores con poca experiencia digital.",
          "Un sistema escalable que pudiera crecer con más deportes y ciudades."
        ],
        insightMessage: "'Para tener éxito, debíamos cerrar la brecha entre la pasión del jugador y la eficiencia administrativa.'",
        insightsLabel: "Insights estratégicos",
        insightsList: [
          "La complejidad es el enemigo de la adopción para los dueños de canchas locales.",
          "Los jugadores valoran la velocidad y la confirmación visual sobre todo lo demás.",
          "La confiabilidad móvil es crucial para reservas en el campo."
        ],
        objectivesBridge: "",
        objectivesLabel: "Objetivos del proyecto",
        objectivesList: [
          "Crear una interfaz de reserva intuitiva.",
          "Desarrollar un panel de administración centralizado.",
          "Establecer un lenguaje de diseño escalable.",
          "Entregar un prototipo listo para el lanzamiento."
        ]
      },
      acto03: {
        label: "03",
        title: ["La", "Estrategia", "del", "Diseño"],
        titleMobile: ["La Estrategia", "del Diseño"],
        description: "Escuchar antes de diseñar. Antes de abrir Figma, dediqué tiempo a entender el mercado y a hablar con usuarios potenciales. Hice un benchmark de plataformas deportivas y realicé encuestas a jugadores ocasionales, lo que me permitió mapear frustraciones y deseos reales.",
        list: [
          "La ubicación y la disponibilidad horaria son más importantes que el precio.",
          "Muchos prefieren ver horarios y disponibilidad antes de registrarse.",
          "Generalmente, hay un organizador que paga por todo el grupo, por lo que el flujo debía favorecer ese rol.",
          "Los propietarios querían confirmar reservas rápido para evitar vacíos en el calendario.",
          "Las fotos y detalles de la cancha (superficie, iluminación) influyen mucho en la elección."
        ],
        solutionBridge: "'Decidí diseñar primero la experiencia del jugador y después la del administrador.'",
        insightsLabel: "Hallazgos clave",
        designSystemBridge: "",
        methodologyDetails: []
      },
      acto04: {
        label: "04",
        title: ["Resultados", "& Entrega"],
        titleMobile: ["Resultados", "& Entrega"],
        description: "Fases del trabajo:",
        resultBridge: "'El resultado final fué un MVP completamente funcional que conectaba las dos caras de la experiencia.'",
        results: [
          "Definición de arquitectura y flujos de reserva.",
          "Diseño del dashboard y herramientas de gestión para propietarios.",
          "Wireframes para validar la estructura antes de pasar a visual.",
          "Creación de un sistema visual (UI KIT) modular adaptable a web y móvil.",
          "Prototipos interactivos en Figma y pruebas de usabilidad con ambos perfiles."
        ],
        playersTitle: "Para Jugadores.",
        playersDesc: "Búsqueda por ubicación y deporte, horarios visibles al instante, ficha detallada de la cancha, reserva y pago en pocos pasos, y organización de partidos/eventos.",
        ownersTitle: "Para Propietarios.",
        ownersDesc: "Dashboard con visión general de ocupación, calendario interactivo, conﬁrmación manual de reservas con comprobante, métricas básicas y gestión de canchas y servicios."
      },
      impact: {
        label: "05",
        title: ["Impacto", "& Evolución"],
        titleMobile: ["Impacto", "& Evolución"],
        description: "Trabajar en Anyma Deportes fue un ejercicio de equilibrio y priorización, porque diseñar para dos públicos tan distintos en un solo producto exige decisiones estratégicas constantes.",
        resultsLabel: "Logros.",
        resultsList: [
          "La estructura y los flujos bien definidos son más importantes que el acabado visual en las primeras fases.",
          "Validar con usuarios reales desde los prototipos tempranos ahorra horas de retrabajo.",
          "Diseñar para escalabilidad desde el inicio evita problemas cuando el producto crece.",
          "Un MVP claro y funcional no solo valida el concepto, también ayuda a cerrar alianzas clave."
        ],
        insightMessage: "'Este proyecto redefinió cómo abordamos el diseño basado en datos en contextos de alta energía.'"
      },
      footer: {
        title: "ESTOY DISPONIBLE",
        subtitle: "LLEVEMOS TU PROYECTO AL SIGUIENTE NIVEL",
        email: "christiansandovaldesign@gmail.com",
        copyright: "© 2026 CHRISTIAN SANDOVAL"
      }
    },
    nevado: {
      intro: {
        back: "Proyectos",
        title: "NEVADO TREK",
        tagline: "Una experiencia para aventureros de alta montaña.",
        contextLabel: "Contexto del proyecto",
        contextDesc: "Una transformación total: de la identidad al código. Un ecosistema propio que conecta aventureros con la montaña mediante un Backend a medida y pagos fluidos.",
        meta: {
          services: "Servicios",
          services_val: "Desarrollo Full Stack, UX/UI, Branding",
          date: "Fecha",
          date_val: "Ene 2025 - Feb 2026",
          deliverables: "Entregables",
          deliverables_val: "Plataforma Web, Backend Propio",
          ecosystem: "Ecosistema",
          ecosystem_val: "Next.js / Node / Bold API"
        }
      },
      acto01: {
        label: "01",
        title: ["Punto", "de", "Partida"],
        titleMobile: ["Punto", "de Partida"],
        description: "La página original cumplía con su función básica, pero no lograba conectar con el usuario. La experiencia era plana, la navegación poco intuitiva y el aspecto visual no generaba confianza ni emoción. Desde el inicio, me propuse transformar esa base en una propuesta fresca y coherente que respire el aire frío de la cumbre."
      },
      acto02: {
        label: "02",
        title: ["El Problema", "/ El Desafío"],
        titleMobile: ["El Problema", "/ El Desafío"],
        contextLabel: "Funcionaba, pero no enamoraba",
        contextDesc: "Tenía una página que existía, pero carecía de alma. El reto era técnico y emocional: construir un motor robusto mientras se cuenta una historia apasionante.",
        problemsLabel: "Retos clave",
        problemsList: [
          "Una estructura visual débil, con mucho ruido y poca jerarquía.",
          "Una identidad de marca inexistente, sin personalidad.",
          "Desconexión entre la promesa de aventura y la realidad digital.",
          "Necesidad de un sistema de reservas propio para manejar fechas complejas."
        ],
        insightMessage: "\"Quería pasar de una página que simplemente estaba ahí… a una que realmente transmitiera confianza, adrenalina y personalidad.\"",
        insightsLabel: "Visión Estratégica",
        insightsList: [
          "La aventura empieza en el primer clic, no en la base de la montaña.",
          "La confianza se construye con calidad de diseño y seguridad en pagos.",
          "La automatización vía Webhooks es clave para escalar la operación."
        ],
        objectivesBridge: "",
        objectivesLabel: "Objetivos",
        objectivesList: []
      },
      acto03: {
        label: "03",
        title: ["Cómo lo", "resolví"],
        titleMobile: ["Cómo lo", "resolví"],
        description: "Abordé esto como un Arquitecto Full Stack. No solo dibujé pantallas; ingenié una solución. Me enfoqué en redefinir la identidad visual con una paleta de alto contraste y reestructurar la arquitectura de información.",
        list: [
          "Identidad Visual: Creé un logo y paleta que transmiten energía y confianza.",
          "Código Full Stack: Construí el Frontend en Next.js y un Backend propio para reservas.",
          "Pagos: Integré la pasarela 'Bold' vía Webhooks para confirmación real-time.",
          "Inmersión: Usé storytelling y microinteracciones para simular el ascenso.",
          "Pruebas: Iteración en prototipos y código para asegurar cero fallos transaccionales."
        ],
        solutionBridge: "\"Construí todo el ecosistema yo solo: desde el primer pixel del Logo hasta la última línea de código del Backend que recibe la reserva.\"",
        insightsLabel: "Fusión Técnica y Diseño",
        designSystemBridge: "",
        methodologyDetails: []
      },
      acto04: {
        label: "04",
        title: ["El", "Resultado"],
        titleMobile: ["El", "Resultado"],
        description: "Fases de Evolución:",
        resultBridge: "\"Pasamos de una página que solo existía… a un ecosistema digital que respira la esencia de la marca.\"",
        results: [
          "UI inmersiva con flujo claro y estética renovada.",
          "Motor de reservas automatizado conectado a DB propia.",
          "Procesamiento de pagos en tiempo real con integración Bold.",
          "Identidad de marca fuerte que proyecta seguridad.",
          "Experiencia sin fisuras tanto para aventureros como administradores."
        ],
        playersTitle: "Para Aventureros.",
        playersDesc: "Un viaje emocional. Visuales inmersivos, detalles claros del itinerario y un proceso de reserva seguro e instantáneo que se siente como el inicio de la aventura.",
        ownersTitle: "Para la Administración.",
        ownersDesc: "Tranquilidad automatizada. Los Webhooks manejan las confirmaciones de pago, reduciendo la revisión manual y asegurando que ninguna reserva se pierda."
      },
      impact: {
        label: "05",
        title: ["Impacto", "& Evolución"],
        titleMobile: ["Impacto", "& Evolución"],
        description: "DISEÑAR ES MUCHO MÁS QUE ESTÉTICA; es orquestar. Este proyecto me enseñó a escuchar lo que no funcionaba, a simplificar lo complejo y a repensar toda la experiencia.",
        resultsLabel: "Aprendizajes Clave.",
        resultsList: [
          "Ser un diseñador Full Stack te da control total sobre la calidad del producto.",
          "Integrar pasarelas de pago (Bold) exige lógica rigurosa de seguridad.",
          "El storytelling convierte visitantes en caminantes.",
          "Haber hecho todo yo solo —desde la identidad hasta el backend— me dio una visión integral que hoy aplico en cada proyecto."
        ],
        insightMessage: "\"Este proyecto demostró que el código y el diseño no son disciplinas separadas, sino dos lenguajes contando la misma historia.\""
      },
      footer: {
        title: "ESTOY DISPONIBLE",
        subtitle: "LLEVEMOS TU PROYECTO AL SIGUIENTE NIVEL",
        email: "christiansandovaldesign@gmail.com",
        copyright: "© 2026 CHRISTIAN SANDOVAL"
      }
    }
  }
};
