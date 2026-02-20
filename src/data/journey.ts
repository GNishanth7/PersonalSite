export type StoryCategory =
  | "hackathon"
  | "academic"
  | "product"
  | "research"
  | "internship"
  | "achievement";

export type JourneyStory = {
  id: string;
  title: string;
  category: StoryCategory;
  period: string;
  context: string;
  challenge: string;
  role: string;
  actions: string[];
  result: string;
  lessons: string[];
  tags: string[];
};

export const journeyStories: JourneyStory[] = [
  {
    id: "kings-hackathon-2022",
    title: "First Hackathon - Kings Engineering College",
    category: "hackathon",
    period: "2022 (UG 2nd year)",
    context: "36-hour hackathon, team of 4, selected for finals from a large pool.",
    challenge:
      "Build a practical facial-recognition attendance system quickly with limited time and self-collected data.",
    role:
      "Team organizer + data pipeline owner (data collection, cleaning, and model training preparation).",
    actions: [
      "Collected class data and built a clean training dataset.",
      "Used OpenCV-based workflow for face extraction and preparation.",
      "Iterated rapidly with the team during the 36-hour cycle.",
    ],
    result: "Shortlisted in Top 15 out of around 200 teams.",
    lessons: [
      "How to work under hackathon pressure with strict time constraints.",
      "Importance of clean data even for basic baseline models.",
    ],
    tags: ["OpenCV", "Computer Vision", "Hackathon"],
  },
  {
    id: "psg-national-hackathon",
    title: "PSG National Hackathon - Smart Ambulance Booking",
    category: "hackathon",
    period: "UG phase (Coimbatore, 36 hours)",
    context: "National event, team of 5, over 500 participating teams.",
    challenge:
      "Create an emergency ambulance booking app connected to wearable anomaly detection in just two sleepless nights.",
    role:
      "Android app development lead for UI/flow implementation while learning XML and Android Studio from scratch.",
    actions: [
      "Learned XML and Android Studio rapidly from documentation during the event.",
      "Implemented core booking app interactions and emergency trigger flow.",
      "Worked with teammates on wearable-signal-to-dispatch concept flow.",
    ],
    result: "Shortlisted Top 100, then Top 20, before final elimination.",
    lessons: [
      "Learning speed is a competitive advantage in hackathons.",
      "National-level competition sharpened execution and teamwork.",
    ],
    tags: ["Android", "XML", "Rapid Prototyping"],
  },
  {
    id: "personalized-diet-mini-project",
    title: "Mini Project - Personalized Diet Recommendation",
    category: "academic",
    period: "UG mini-project phase",
    context: "Team of 4 college project using Kaggle data.",
    challenge:
      "Deliver a recommendation model while handling coordination gaps and keeping project setup easy for all members.",
    role:
      "Team lead + main implementation owner (task allocation, model build, deployment setup).",
    actions: [
      "Built the model from Kaggle dataset preprocessing to recommendation output.",
      "Introduced Docker so teammates could run the same setup consistently.",
      "Created a Streamlit interface for a usable frontend experience.",
    ],
    result: "Delivered an end-to-end working prototype with portable setup.",
    lessons: [
      "Strong ownership can rescue team execution risk.",
      "Docker removes avoidable environment friction in student teams.",
    ],
    tags: ["Docker", "Streamlit", "ML"],
  },
  {
    id: "final-year-text-to-video",
    title: "Final Year Project - Text-to-Pictorial Video Generator",
    category: "product",
    period: "Mid 2023 to final submission",
    context:
      "Started with text-to-video ambition, evolved into an educational pictorial-video pipeline due to feasibility constraints.",
    challenge:
      "Turn an ambitious generative idea into a shippable product within academic deadlines while continuously improving features.",
    role: "Primary architect and full implementation owner from concept to final delivery.",
    actions: [
      "Redesigned scope from raw text-to-video into image-sequence storytelling with subtitles.",
      "Added summarization, PDF upload, multilingual audio, and voice customization.",
      "Built frontend in Gradio and iterated until final submission deadline.",
    ],
    result: "Delivered a feature-rich final-year system and validated personal product creativity.",
    lessons: [
      "Scope pivots are essential for turning hard ideas into deliverables.",
      "Product thinking improves when features are added with clear user value.",
    ],
    tags: ["Gradio", "Generative AI", "Product Design"],
  },
  {
    id: "college-payment-integration",
    title: "College Event Platform - Payment Gateway Integration",
    category: "product",
    period: "UG department assignment",
    context:
      "Worked on payment integration module inside an inter-college booking platform assigned to the department team.",
    challenge:
      "Implement secure and compliant payment flow for a real event booking system used by students.",
    role: "Owned payment gateway implementation and integration hardening.",
    actions: [
      "Integrated Paytm and Razorpay flows.",
      "Studied RBI-related compliance concerns and validated decisions.",
      "Focused on secure transaction handling and operational reliability.",
    ],
    result: "Successful gateway integration with stronger security awareness.",
    lessons: [
      "Payments demand both technical execution and regulatory understanding.",
      "Real systems require legal and operational thinking, not code only.",
    ],
    tags: ["Payments", "Security", "Compliance"],
  },
  {
    id: "trinity-captcha-prediction",
    title: "Trinity Project - CAPTCHA Prediction (Best in Class)",
    category: "research",
    period: "Trinity College Dublin",
    context: "Team of 2 model-comparison project with noisy CAPTCHA datasets.",
    challenge:
      "Handle noisy captcha images and choose the right architecture under limited time while resolving model strategy disagreements.",
    role:
      "Preprocessing and experimentation lead across segmentation and model comparisons.",
    actions: [
      "Built preprocessing steps to remove noise lines/dots and segment characters.",
      "Ran CNN and ViT experimentation with hyperparameter tuning.",
      "Introduced CTC approach that outperformed earlier model options.",
    ],
    result: "Achieved best score in class with a clear margin.",
    lessons: [
      "Evidence-based model comparison resolves team disagreements.",
      "Preprocessing quality strongly influences downstream accuracy.",
    ],
    tags: ["CNN", "ViT", "CTC", "Computer Vision"],
  },
  {
    id: "astroleo-scalable-computing",
    title: "Scalable Computing Final - AstroLEO",
    category: "academic",
    period: "Trinity College Dublin",
    context: "Team of 2 versus many teams of 4-5 in class.",
    challenge:
      "Design an encrypted, fault-aware satellite communication simulation and overcome presentation logistics issues.",
    role: "Co-architect and protocol implementation contributor for resilience flows.",
    actions: [
      "Simulated multi-satellite communication with heartbeat-based failover.",
      "Implemented encrypted communication logic using ChaCha20 principles.",
      "Escalated and resolved presentation booking conflict with faculty directly.",
    ],
    result: "Delivered presentation successfully and secured top score in class.",
    lessons: [
      "Small teams can outperform larger teams with focused ownership.",
      "Operational communication can be as critical as technical output.",
    ],
    tags: ["Distributed Systems", "Encryption", "Simulation"],
  },
  {
    id: "traffic-booking-distributed",
    title: "Distributed Traffic Booking App",
    category: "product",
    period: "Trinity team project",
    context: "Team of 5 building a high-availability booking architecture quickly.",
    challenge:
      "Meet no-single-point-of-failure and scalability requirements in a short project timeline.",
    role: "Owned database architecture and implementation using CockroachDB.",
    actions: [
      "Chose CockroachDB for multi-region and fault-tolerant design goals.",
      "Learned internals from docs and iterated schema/queries for reliability.",
      "Tested behavior under failure and scale assumptions.",
    ],
    result: "Delivered resilient design and gained hands-on mastery of a new database stack.",
    lessons: [
      "Deep documentation reading unlocks faster technical confidence.",
      "Database choice drives reliability architecture outcomes.",
    ],
    tags: ["CockroachDB", "HA Design", "Distributed Systems"],
  },
  {
    id: "pssqfl-dissertation-story",
    title: "Dissertation - Personalized Secure Slimmable Quantum FL",
    category: "research",
    period: "Trinity Semester 3",
    context:
      "Topic selected after literature review and professor challenge around novelty in quantum federated learning.",
    challenge:
      "Propose and validate a genuinely novel quantum federated approach with secure communication and strong performance.",
    role: "End-to-end research owner: problem framing, method design, experimentation, and analysis.",
    actions: [
      "Reviewed 20-30 papers and identified slimmable FL as a promising basis.",
      "Extended idea with secure communication and later personalization strategy.",
      "Diagnosed performance collapse and fixed it via personalized data handling.",
    ],
    result:
      "Produced strong accuracy results and established the PSSQFL concept with clear novelty.",
    lessons: [
      "Research quality comes from iterative hypothesis-test-debug cycles.",
      "Novelty requires both literature depth and engineering persistence.",
    ],
    tags: ["Quantum ML", "Federated Learning", "Research"],
  },
  {
    id: "kittykat-internship",
    title: "KittyKat Internship - Product + Automation",
    category: "internship",
    period: "3-month internship",
    context:
      "Joined after startup event connection; worked across collaboration features, chatbot fixes, and automation pipelines.",
    challenge:
      "Contribute inside a live product environment while switching across multiple assignments with production expectations.",
    role:
      "Cross-functional intern handling platform features, prompt tuning, n8n automations, and retrieval quality improvements.",
    actions: [
      "Built collaboration flow components and fixed chatbot memory via system prompt improvements.",
      "Created n8n automation for product extraction and campaign image generation.",
      "Improved moodboard relevance by filtering metadata/tags using MongoDB-backed logic.",
    ],
    result: "Shipped working pipeline improvements to production and strengthened product engineering maturity.",
    lessons: [
      "Production systems demand disciplined iteration and observability.",
      "Daily standups and Jira workflows accelerate engineering collaboration.",
    ],
    tags: ["n8n", "MongoDB", "Prompt Engineering", "Product Engineering"],
  },
  {
    id: "supplier-rag-pipeline-story",
    title: "RAG Project - Multi-Agent Supplier Quotation Pipeline",
    category: "product",
    period: "AI engineering project phase",
    context:
      "Built a pipeline to transform unstructured supplier quotations into structured data for faster decision making.",
    challenge:
      "Enable intelligent quotation search and comparison where keyword methods fail to capture context.",
    role:
      "Designed semantic retrieval and backend delivery for end-to-end AI-assisted procurement analysis.",
    actions: [
      "Implemented vector-embedding semantic retrieval with FAISS.",
      "Built FastAPI backend services and containerized with Docker.",
      "Automated evaluation workflow for standardized multi-criteria comparison.",
    ],
    result:
      "Delivered a reproducible RAG-style retrieval system that improved context-aware supplier data discovery.",
    lessons: [
      "RAG pipelines require strong indexing strategy and evaluation discipline.",
      "Deployment reliability is as important as retrieval quality in enterprise workflows.",
    ],
    tags: ["RAG", "FAISS", "FastAPI", "Docker", "Embeddings"],
  },
  {
    id: "department-volleyball-winner",
    title: "Department Volleyball Winner - Rajalakshmi Engineering College",
    category: "achievement",
    period: "UG period (college event)",
    context:
      "Won the department volleyball event conducted at Rajalakshmi Engineering College, Chennai.",
    challenge:
      "Compete in a team sport environment while balancing academics and technical project workload.",
    role:
      "Active team contributor focused on consistency, communication, and match execution.",
    actions: [
      "Trained with teammates and prepared for event competition format.",
      "Maintained focus and discipline while balancing technical commitments.",
      "Executed coordinated gameplay strategy under match pressure.",
    ],
    result: "Won the department-level volleyball competition.",
    lessons: [
      "Team coordination and communication directly influence performance.",
      "Competitive sports strengthened discipline and pressure handling.",
    ],
    tags: ["Leadership", "Teamwork", "Discipline"],
  },
];

export const storyCategoryLabels: Record<StoryCategory, string> = {
  hackathon: "Hackathons",
  academic: "Academic",
  product: "Product Builds",
  research: "Research",
  internship: "Internship",
  achievement: "Achievements",
};

export const journeySummary = {
  totalStories: journeyStories.length,
  hackathons: journeyStories.filter((story) => story.category === "hackathon").length,
  researchWork: journeyStories.filter((story) => story.category === "research").length,
  shippedBuilds: journeyStories.filter((story) => story.category === "product").length,
  achievements: journeyStories.filter((story) => story.category === "achievement").length,
};
