export type MissionPhase = {
  id: "t0" | "t1" | "t2" | "t3" | "t4";
  label: string;
  snapshot: string;
  note: string;
  metricDelta: string;
};

export type Mission = {
  id: string;
  title: string;
  domain: string;
  role: string;
  duration: string;
  stack: string[];
  challenge: string;
  headlineMetric: string;
  strengths: string[];
  growthEdge: string;
  phases: MissionPhase[];
};

export const missions: Mission[] = [
  {
    id: "supplier-quotation-rag-pipeline",
    title: "Multi-Agent Supplier Quotation Processing Pipeline",
    domain: "RAG AI Systems",
    role: "AI/Backend Engineer",
    duration: "AI engineering project",
    stack: [
      "Python",
      "FastAPI",
      "Vector Embeddings",
      "FAISS",
      "Docker",
    ],
    challenge:
      "Convert unstructured supplier quotations into structured, decision-ready data with intelligent retrieval.",
    headlineMetric:
      "Built semantic retrieval with embeddings + FAISS and reproducible FastAPI Docker deployment.",
    strengths: [
      "RAG-style semantic retrieval design",
      "Multi-agent processing pipeline orchestration",
      "Backend API and deployment reliability",
    ],
    growthEdge:
      "Add stronger citation tracing and evaluation benchmarks for response confidence.",
    phases: [
      {
        id: "t0",
        label: "Baseline",
        snapshot: "Supplier quotes were mostly unstructured and hard to compare quickly.",
        note: "Decision workflows were manual and inconsistent.",
        metricDelta: "processing latency high",
      },
      {
        id: "t1",
        label: "Symptom",
        snapshot: "Keyword search missed context and reduced retrieval quality.",
        note: "Relevant quotations were difficult to rank correctly.",
        metricDelta: "retrieval precision gap",
      },
      {
        id: "t2",
        label: "Hypothesis",
        snapshot: "Semantic embeddings + FAISS could improve contextual retrieval.",
        note: "Designed multi-stage pipeline for ingest, structure, and retrieval.",
        metricDelta: "RAG path selected",
      },
      {
        id: "t3",
        label: "Intervention",
        snapshot: "Implemented semantic retrieval and backend services in FastAPI.",
        note: "Containerized deployment with Docker for reproducibility.",
        metricDelta: "pipeline operational",
      },
      {
        id: "t4",
        label: "Outcome",
        snapshot: "Automated evaluation workflow standardized supplier comparison.",
        note: "Teams could search and compare quotes with stronger context relevance.",
        metricDelta: "decision workflow accelerated",
      },
    ],
  },
  {
    id: "personalized-nutrition-advisor",
    title: "Personalized Nutrition Advisor",
    domain: "Applied ML",
    role: "ML Engineer + API/Frontend Integrator",
    duration: "Mini project (team of 4)",
    stack: ["Python", "Scikit-learn", "FastAPI", "Streamlit", "Docker"],
    challenge:
      "Build personalized diet recommendations that move beyond generic plans and remain easy to use for everyday users.",
    headlineMetric:
      "Delivered a full content-based recommendation pipeline with reproducible Docker deployment.",
    strengths: [
      "Recommendation modeling with nearest neighbors",
      "End-to-end ML delivery (model + API + UI)",
      "Containerized collaboration and portability",
    ],
    growthEdge:
      "Extend recommendation quality with nutrition constraints and user feedback loops.",
    phases: [
      {
        id: "t0",
        label: "Baseline",
        snapshot: "Static diet suggestions without personalization depth.",
        note: "Initial recommendations were broad and generic.",
        metricDelta: "personal relevance: low",
      },
      {
        id: "t1",
        label: "Symptom",
        snapshot: "Users with different profiles got similar outputs.",
        note: "One-size-fits-all logic reduced usefulness.",
        metricDelta: "personal fit gap observed",
      },
      {
        id: "t2",
        label: "Hypothesis",
        snapshot: "Content-based nearest-neighbor approach could improve relevance.",
        note: "Feature similarity modeling was selected for explainability and speed.",
        metricDelta: "candidate approach selected",
      },
      {
        id: "t3",
        label: "Intervention",
        snapshot: "Implemented model + FastAPI backend + Streamlit frontend.",
        note: "Added Docker workflow so teammates could run identical environments.",
        metricDelta: "end-to-end system ready",
      },
      {
        id: "t4",
        label: "Outcome",
        snapshot: "Functional personalized nutrition advisor delivered.",
        note: "Project became easier to demo and share across machines.",
        metricDelta: "deployment friction reduced",
      },
    ],
  },
  {
    id: "face-attendance-tracker",
    title: "Face Identification for Attendance Tracking",
    domain: "Computer Vision",
    role: "Data and model pipeline contributor",
    duration: "Hackathon build",
    stack: ["Python", "TensorFlow", "OpenCV", "HOG", "CNN"],
    challenge:
      "Create a robust attendance tracker that can identify faces reliably under practical classroom conditions.",
    headlineMetric:
      "Built a working face-attendance prototype with augmentation-enhanced generalization.",
    strengths: [
      "Data augmentation strategy",
      "Face detection and preprocessing",
      "CNN-based identification pipeline",
    ],
    growthEdge:
      "Improve low-light and occlusion handling for more production-ready accuracy.",
    phases: [
      {
        id: "t0",
        label: "Baseline",
        snapshot: "Simple recognition trials with limited raw images.",
        note: "Model reliability was unstable with small data diversity.",
        metricDelta: "generalization weak",
      },
      {
        id: "t1",
        label: "Symptom",
        snapshot: "Model performance dropped with angle/lighting changes.",
        note: "Face detection and training data variance were not robust enough.",
        metricDelta: "false predictions increased",
      },
      {
        id: "t2",
        label: "Hypothesis",
        snapshot: "HOG detection + stronger augmentation could stabilize learning.",
        note: "Combined feature extraction and data diversity plan.",
        metricDelta: "pipeline redesign planned",
      },
      {
        id: "t3",
        label: "Intervention",
        snapshot: "Integrated HOG face detection and trained CNN with augmented data.",
        note: "Reworked preprocessing and model training sequence.",
        metricDelta: "robustness improved",
      },
      {
        id: "t4",
        label: "Outcome",
        snapshot: "Attendance tracking app functioned reliably for demo scenarios.",
        note: "System moved from concept to practical prototype.",
        metricDelta: "prototype validated",
      },
    ],
  },
  {
    id: "medicult-ambulance-booking",
    title: "Medicult - Smart Ambulance Booking App",
    domain: "Mobile Emergency Tech",
    role: "Android builder + anomaly-trigger workflow contributor",
    duration: "HackFest 2022 (36 hours)",
    stack: [
      "Android Studio",
      "Java",
      "Firebase",
      "Arduino",
      "Python",
      "GPS",
    ],
    challenge:
      "Design an emergency booking system that can dispatch the nearest ambulance and react to persistent abnormal heart-rate events.",
    headlineMetric:
      "Shortlisted Top 25 at HackFest 2022 with a wearable-linked emergency dispatch prototype.",
    strengths: [
      "Rapid mobile prototyping under hackathon pressure",
      "Hardware + software integration",
      "Real-time emergency flow design",
    ],
    growthEdge:
      "Enhance medical false-positive handling and dispatch prioritization logic.",
    phases: [
      {
        id: "t0",
        label: "Baseline",
        snapshot: "Basic ambulance booking app concept.",
        note: "Needed to move beyond manual request flow.",
        metricDelta: "no proactive trigger",
      },
      {
        id: "t1",
        label: "Symptom",
        snapshot: "Manual-only emergency triggers were too slow for critical cases.",
        note: "Automated detection path became essential.",
        metricDelta: "response risk identified",
      },
      {
        id: "t2",
        label: "Hypothesis",
        snapshot: "Wearable heartbeat anomalies can trigger automatic dispatch.",
        note: "Linked Arduino signal logic to app-side event workflow.",
        metricDelta: "automation path defined",
      },
      {
        id: "t3",
        label: "Intervention",
        snapshot: "Built Android + Firebase app with GPS nearest-ambulance routing.",
        note: "Implemented abnormal-heartbeat detection bridge with Python logic.",
        metricDelta: "auto-dispatch working",
      },
      {
        id: "t4",
        label: "Outcome",
        snapshot: "Demonstrated integrated rescue workflow in national hackathon.",
        note: "Team reached final shortlist stage with strong practical framing.",
        metricDelta: "Top 25 shortlist",
      },
    ],
  },
  {
    id: "linguarails-smart-yatra",
    title: "LinguaRails: Smart Yatra",
    domain: "Multilingual Speech AI",
    role: "ML pipeline engineer",
    duration: "Railway AI solution build",
    stack: [
      "Transformer",
      "SeamlessM4T",
      "PyTorch",
      "Diffusers",
      "Flask",
    ],
    challenge:
      "Reduce language barriers in railway contexts by combining multilingual speech recognition, translation, and language identification.",
    headlineMetric:
      "Built a unified multilingual speech pipeline with quality filtering and data-alignment automation.",
    strengths: [
      "Large-model pipeline composition",
      "Multilingual speech processing",
      "Data generation under label scarcity",
    ],
    growthEdge:
      "Improve real-time latency and edge deployment readiness for field conditions.",
    phases: [
      {
        id: "t0",
        label: "Baseline",
        snapshot: "Fragmented speech tools with no unified multilingual pipeline.",
        note: "End users faced inconsistent communication quality.",
        metricDelta: "workflow fragmented",
      },
      {
        id: "t1",
        label: "Symptom",
        snapshot: "Transcript quality and language mismatch reduced reliability.",
        note: "Insufficient filtering and supervision quality created noise.",
        metricDelta: "quality instability",
      },
      {
        id: "t2",
        label: "Hypothesis",
        snapshot: "A master model pipeline can unify recognition + translation + ID.",
        note: "Encoder-decoder transformer flow selected as core.",
        metricDelta: "unified architecture chosen",
      },
      {
        id: "t3",
        label: "Intervention",
        snapshot: "Implemented processing pipeline with automated transcript filtering.",
        note: "Added aligned speech-data generation for low-resource settings.",
        metricDelta: "data quality uplift",
      },
      {
        id: "t4",
        label: "Outcome",
        snapshot: "Inclusive multilingual communication prototype for railway use.",
        note: "System addressed both model quality and sustainability concerns.",
        metricDelta: "end-to-end pipeline delivered",
      },
    ],
  },
  {
    id: "distributed-traffic-booking",
    title: "Traffic Booking Platform",
    domain: "Distributed Systems",
    role: "Full-Stack + Platform Engineer",
    duration: "16 weeks",
    stack: ["Node.js", "Redis", "CockroachDB", "Docker"],
    challenge: "Prevent double-booking during traffic spikes.",
    headlineMetric: "99.9% uptime, sub-second average response",
    strengths: ["Reliability under load", "Data consistency", "Infra pragmatism"],
    growthEdge: "Deeper multi-region tracing across all services.",
    phases: [
      { id: "t0", label: "Baseline", snapshot: "Single-region APIs with periodic slow queries.", note: "Initial architecture worked for low concurrency.", metricDelta: "p95 latency 840ms" },
      { id: "t1", label: "Symptom", snapshot: "Traffic spikes caused queue buildup and write conflicts.", note: "Booking collisions surfaced during peak windows.", metricDelta: "error rate 4.2%" },
      { id: "t2", label: "Hypothesis", snapshot: "Contention hotspots in transaction path and cache misses.", note: "Modelled contention and split read/write flows.", metricDelta: "cache miss 37%" },
      { id: "t3", label: "Intervention", snapshot: "Introduced idempotent booking tokens and Redis-assisted locking.", note: "Refactored booking workflow with strict transaction boundaries.", metricDelta: "error rate 0.9%" },
      { id: "t4", label: "Outcome", snapshot: "Stable throughput across high-traffic events.", note: "Platform became resilient for global rollouts.", metricDelta: "p95 latency 310ms" },
    ],
  },
  {
    id: "visionary-ai",
    title: "Visionary AI",
    domain: "Generative AI",
    role: "ML Engineer",
    duration: "10 weeks",
    stack: ["Python", "TensorFlow", "Streamlit"],
    challenge: "Generate useful video content with minimal manual editing.",
    headlineMetric: "Reduced content production time by 60%",
    strengths: ["Model-product integration", "Rapid iteration", "UX for AI tools"],
    growthEdge: "Production-grade model evaluation harness.",
    phases: [
      { id: "t0", label: "Baseline", snapshot: "Script-based prototype converted text to rough scenes.", note: "Output quality was inconsistent.", metricDelta: "manual edits ~45 min/video" },
      { id: "t1", label: "Symptom", snapshot: "Audio desync and context drift across scenes.", note: "Users dropped outputs after first pass.", metricDelta: "user completion 41%" },
      { id: "t2", label: "Hypothesis", snapshot: "Prompt structure lacked continuity controls.", note: "Introduced context memory and scene constraints.", metricDelta: "coherence +18%" },
      { id: "t3", label: "Intervention", snapshot: "Refined generation pipeline with staged validation.", note: "Built quality gates before final render.", metricDelta: "retry rate -35%" },
      { id: "t4", label: "Outcome", snapshot: "Reliable one-click workflow for content teams.", note: "Significantly faster first usable cut.", metricDelta: "manual edits ~18 min/video" },
    ],
  },
  {
    id: "pssqfl",
    title: "Quantum Fed Learning",
    domain: "Quantum ML Research",
    role: "Research Engineer",
    duration: "Dissertation project",
    stack: ["Python", "PennyLane", "TensorFlow", "PyTorch"],
    challenge: "Train healthcare models collaboratively without raw data exchange.",
    headlineMetric: "Research publication + strong privacy-preserving accuracy",
    strengths: ["Research depth", "Experimental rigor", "Applied ML thinking"],
    growthEdge: "Faster experimental orchestration tooling.",
    phases: [
      { id: "t0", label: "Baseline", snapshot: "Classical federated setup used as benchmark.", note: "Needed stronger privacy guarantees.", metricDelta: "baseline F1 0.78" },
      { id: "t1", label: "Symptom", snapshot: "Privacy methods degraded model quality too sharply.", note: "Clinical utility dropped below acceptable threshold.", metricDelta: "F1 0.69" },
      { id: "t2", label: "Hypothesis", snapshot: "Hybrid quantum feature encoding could recover lost signal.", note: "Designed constrained experimental matrix.", metricDelta: "privacy preserved" },
      { id: "t3", label: "Intervention", snapshot: "Built PSSQFL training loop with tuned aggregation.", note: "Balanced privacy objectives with convergence behavior.", metricDelta: "F1 0.81" },
      { id: "t4", label: "Outcome", snapshot: "Publishable framework with better tradeoff profile.", note: "Method demonstrated practical potential for healthcare collaboration.", metricDelta: "paper published" },
    ],
  },
];

export const profile = {
  name: "Nishanth Gopinath",
  title: "Data Scientist & AI/ML Engineer",
  strengths: [
    { name: "System Thinking", proof: "Distributed booking platform stabilized under peak load." },
    { name: "Applied ML", proof: "Shipped usable AI workflows with measurable time savings." },
    { name: "Research + Build", proof: "Published work while translating ideas into engineering artifacts." },
  ],
  growthAreas: [
    { name: "Tracing at scale", action: "Building deeper observability patterns across services." },
    { name: "Evaluation automation", action: "Standardizing model quality benchmarks per release." },
  ],
  levels: [
    { skill: "ML Engineering", level: 7 },
    { skill: "Data Systems", level: 7 },
    { skill: "Distributed Platforms", level: 6 },
    { skill: "Frontend Product", level: 5 },
  ],
};
