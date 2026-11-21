// Each localized value contains Korean first and English second.
// TODO: Add verified employers, dates, job titles, project architecture, tools,
// metrics, implementation details, and public profile/CV links when supplied.
const locale = (ko, en) => ({ ko, en });
// Project: id, title, client/domain, period (null = to be added), overview, duties[], results[], tools[]
// Project images live in assets/projects/<id>/ : cover.jpg (or .png/.webp/.svg) and optional gallery 1.jpg ... 6.jpg (or .png)
// 이미지 주소에 붙이는 버전: 같은 파일명으로 사진을 바꿨을 때 브라우저 캐시를 무효화한다
const ASSET_V = '20261124a';
function imgFallback(el) {
  const exts = el.dataset.exts.split(',');
  const n = Number(el.dataset.n || 0);
  if (n < exts.length) { el.dataset.n = n + 1; el.src = `assets/projects/${el.dataset.id}/${el.dataset.name}.${exts[n]}?v=${ASSET_V}`; }
  else if (el.dataset.hide) el.remove();
  else el.onerror = null;
}
const projectImg = (id, name = 'cover', exts = 'png,webp,svg', hide = '') =>
  `<img src="assets/projects/${id}/${name}.jpg?v=${ASSET_V}" alt="" loading="lazy" data-id="${id}" data-name="${name}" data-exts="${exts}" ${hide ? 'data-hide="1"' : ''} onerror="imgFallback(this)">`;
const portfolioProjects = [
  {
    id: "b2b-analysis",
    title: {
      ko: "국내 이노크라스 분석 시스템 개선 및 솔루션 개발",
      en: "Inocras (domestic) analysis system improvement and solution development"
    },
    client: {
      ko: "국내 이노크라스 / 바이오 임상 진단 분석",
      en: "Inocras (domestic) / Bio clinical diagnostic analysis"
    },
    period: {
      ko: "2026.10 ~ 현재 (국내 파견)",
      en: "Oct. 2026 – present (domestic assignment)"
    },
    overview: {
      ko: "기존 분석 시스템의 문제를 분석하고 비용과 실행 속도를 개선하는 솔루션을 개발합니다.",
      en: "Analyzing problems in an existing analysis system and developing a solution that improves cost and execution speed."
    },
    role: {
      ko: [
        "기존 분석 시스템의 처리 구조 및 운영 환경 파악",
        "기존 시스템에서 해결되지 않은 문제의 원인 분석과 개선 방향 검토",
        "분석 처리 비용 최적화 및 모듈 단위 실행 속도 개선 업무",
        "가상화 기반 분석 모듈 환경 구성 및 개발",
        "분석 결과와 시각화 데이터를 활용한 결과 차이 검증",
        "고객사 국내 담당자 및 미국 지사와의 합동 회의를 통해 기술적 문제와 개선 방향 협의"
      ],
      en: [
        "Reviewed the processing structure and operating environment of the existing analysis system",
        "Analyzed root causes of unresolved problems and evaluated improvement directions",
        "Worked on optimizing analysis processing cost and improving per-module execution speed",
        "Configured and developed a virtualization-based analysis module environment",
        "Verified result differences using analysis results and visualization data",
        "Discussed technical issues and improvement directions in joint meetings with the domestic customer contacts and the US office"
      ]
    },
    outcome: {
      ko: [
        "현장 분석에 기반한 개선 방향 구체화 및 솔루션 개선 진행 중",
        "비용 및 성능 개선 결과의 최종 수치는 추후 확인 필요"
      ],
      en: [
        "Improvement direction defined from on-site analysis; solution improvement in progress",
        "Final cost and performance figures to be confirmed"
      ]
    },
    tools: [
      "Linux",
      "Singularity",
      "Docker",
      "Python",
      "Snakemake"
    ]
  },
  {
    id: "nai-gateway",
    featured: true,
    title: {
      ko: "nAI-Gateway 구축 및 사내 적용",
      en: "nAI-Gateway build and internal rollout"
    },
    client: {
      ko: "농심데이터시스템 및 농심 내부 / 기업 IT",
      en: "Nongshim Data System and Nongshim (internal) / Enterprise IT"
    },
    period: {
      ko: "2026.06 ~ 현재",
      en: "Jun. 2026 – present"
    },
    overview: {
      ko: "LiteLLM과 Amazon Bedrock 기반으로 사내 생성형 AI 사용 환경과 접근, 비용 관리 기능을 구축하고, 일부 사내 사용자를 대상으로 PoC를 진행해 기능, 운영, 비용 구조를 검증했습니다.",
      en: "Built an internal generative-AI environment on LiteLLM and Amazon Bedrock with access control and cost management, and ran a PoC with some internal users to validate features, operations, and cost structure."
    },
    role: {
      ko: [
        "생성형 AI 활용을 위한 Gateway 아키텍처 설계 및 PoC 수행",
        "Claude Code, Cowork, Chatbot 등의 사용자별 서비스 제공 방안 검토",
        "AWS IAM 인증을 활용한 LiteLLM–Amazon Bedrock 연동 및 서비스 환경 구성",
        "별도 사용자 및 관리자 포털 아키텍처 제안과 개발",
        "랜덤 코드 인증과 관리자 가입 승인 기능 구현",
        "PoC 사용자의 시간 단위 및 일별 사용량 모니터링, 비용 최적화 테스트 및 주요 기능 테스트",
        "사용자 및 팀별 접근 권한, 예산, 사용 비용을 조회 및 통제하는 관리자 모니터링 기능 구현",
        "외부 접근 포털과 승인 검토 규칙 기획"
      ],
      en: [
        "Designed the gateway architecture for generative AI use and ran the PoC",
        "Evaluated per-user service options such as Claude Code, Cowork, and chatbots",
        "Integrated LiteLLM with Amazon Bedrock using AWS IAM authentication and configured the service environment",
        "Proposed and developed separate user and administrator portal architectures",
        "Implemented random-code authentication and administrator sign-up approval",
        "Monitored hourly and daily usage of PoC users and ran cost-optimization and key-feature tests",
        "Implemented administrator monitoring to view and control permissions, budgets, and usage cost per user and team",
        "Planned the external-access portal and its approval review rules"
      ]
    },
    outcome: {
      ko: [
        "Gateway 및 관리 포털의 주요 기능 구현",
        "일부 사내 사용자 대상 PoC 진행 및 기능, 운영, 비용 구조 검증",
        "외부 고객 제공을 고려한 솔루션 고도화 진행 중"
      ],
      en: [
        "Implemented the main features of the gateway and admin portal",
        "Ran a PoC with internal users and validated features, operations, and cost structure",
        "Advancing the solution for external customer delivery"
      ]
    },
    gallery: [
      { ko: "로그인: 회사 메일 입력", en: "Sign-in: company email entry" },
      { ko: "랜덤 인증코드 메일 (Gmail SMTP 발송, Gmail 수신 화면)", en: "Random verification code email (sent via Gmail SMTP, shown in Gmail)" },
      { ko: "로그인: 인증코드 입력", en: "Sign-in: verification code entry" },
      { ko: "내정보: 키 상태와 개인 및 팀 사용량", en: "My info: key status and personal/team usage" },
      { ko: "관리자 페이지 전체 화면 (가입 승인, 키 교체 요청, 예산, 사용자 관리)", en: "Admin page overview (sign-up approval, key replacement, budget and user management)" },
      { ko: "AWS 아키텍처 (서울/도쿄 리전, LiteLLM Gateway on ECS, Amazon Bedrock)", en: "AWS architecture (Seoul and Tokyo regions, LiteLLM gateway on ECS, Amazon Bedrock)" }
    ],
    tools: [
      "SMTP",
      "SQLite",
      "LiteLLM",
      "Docker",
      "AWS"
    ]
  },
  {
    id: "ai-re",
    featured: true,
    deck: "assets/projects/ai-re/khf-2026-presentation.pdf",
    title: {
      ko: "AI-RE 연구 환경 플랫폼 기획",
      en: "AI-RE research environment platform planning"
    },
    client: {
      ko: "연구기관 / 바이오 및 의료 연구자",
      en: "Research institutes / Bio and medical researchers"
    },
    period: {
      ko: "2026.01 ~ 2026.08 (KHF 2026 발표)",
      en: "Jan. – Aug. 2026 (presented at KHF 2026)"
    },
    overview: {
      ko: "B2B 공동연구 플랫폼을 기획하고, 의료 현장에서 도입할 수 있는 구조를 기획 중인 내용으로 KHF 2026에서 발표했습니다. 이후 nAI-Gateway 구축과 WGS 분석 AI Agent 데모를 PoC로 진행하며 AI Agent 플랫폼과 AWS 기반 웹 인프라로 확장하게 되었습니다.",
      en: "Planned a B2B joint-research platform and presented the work-in-progress plan for a structure adoptable in clinical settings at KHF 2026. It then grew into an AI Agent platform and web-based AWS infrastructure through PoCs: building nAI-Gateway and a WGS analysis AI Agent demo."
    },
    role: {
      ko: [
        "Bioinformatics Community 초기 아이디어 기획 및 연구환경 벤치마킹 (Seqera, Basepair, Invisibl Cloud)",
        "임원회의 및 사업 방향 검토를 통해 B2B 공동연구 플랫폼으로 기획 구체화",
        "연구자별 독립 분석 환경, 프로젝트 권한, 데이터 반입 및 반출 승인 구조 기획",
        "AWS 기반 연구 환경 인프라와 Scientist AI Agent, AI Gateway 연계 구조 구상",
        "의료 현장 도입을 고려한 구조화 및 KHF 2026 기술 발표, 고객 대응"
      ],
      en: [
        "Planned the initial Bioinformatics Community idea and benchmarked research environments (Seqera, Basepair, Invisibl Cloud)",
        "Refined it into a B2B joint-research platform through executive meetings and business review",
        "Planned per-researcher isolated analysis environments, project permissions, and data in/out approval flows",
        "Conceived the AWS-based research-environment infrastructure and its integration with the Scientist AI Agent and AI Gateway",
        "Structured the platform for clinical adoption, gave a technical presentation at KHF 2026, and handled customer inquiries"
      ]
    },
    outcome: {
      ko: [
        "연구 운영 관리, AI Governance, 클라우드 연구 환경의 주요 기능 정의",
        "KHF 2026 발표와 고객 대응을 통해 팀 기준 문의 고객 82건 확보에 기여 (이전 4개년 평균 9건)"
      ],
      en: [
        "Defined the main features of research operations management, AI governance, and the cloud research environment",
        "Contributed to 82 customer inquiries (team total) from the KHF 2026 presentation and customer handling (previous 4-year average: 9)"
      ]
    },
    gallery: [
      { ko: "벤치마킹 회사: Seqera, Basepair, Invisibl Cloud", en: "Benchmarked companies: Seqera, Basepair, Invisibl Cloud" }
    ],
    tools: [
      "AWS Architecture",
      "AI Governance",
      "Requirements Analysis",
      "Technical Presentation"
    ]
  },
  {
    id: "rag-chatbot",
    featured: true,
    title: {
      ko: "사내 규정문서 기반 RAG 챗봇",
      en: "Internal policy-document RAG chatbot"
    },
    client: {
      ko: "농심데이터시스템 내부 / 기업 IT",
      en: "Nongshim Data System (internal) / Enterprise IT"
    },
    period: {
      ko: "2026.08 ~ 현재",
      en: "Aug. 2026 – present"
    },
    overview: {
      ko: "LibreChat에 자체 Agent 서비스를 연동해 규정 검색과 근거 문서 확인이 가능한 챗봇을 배포했습니다.",
      en: "Deployed a chatbot with policy search and source-document viewing by connecting a custom agent service to LibreChat."
    },
    role: {
      ko: [
        "LibreChat에 FastAPI 기반 자체 Agent 서비스 연동",
        "LangGraph를 활용한 질의 처리 흐름 개발",
        "일반 대화에는 Haiku, 규정 검색 및 결과 재정렬에는 Sonnet을 적용하는 모델 분기 구조 구현",
        "Sonnet 기반 리랭킹으로 관련 규정문서 후보 최대 3개를 제시하고 사용자가 선택하는 흐름 구현",
        "PDF 페이지 미리보기 및 인용 구간 강조 UI 구현",
        "사내 배포 후 기능 개선과 사용 비용 모니터링"
      ],
      en: [
        "Connected a FastAPI-based custom agent service to LibreChat",
        "Built the query-handling flow with LangGraph",
        "Implemented model routing: Haiku for general chat, Sonnet for policy search and reranking",
        "Implemented Sonnet-based reranking that offers up to 3 candidate policy documents for the user to choose",
        "Built a PDF page preview with highlighted cited passages",
        "Improved features and monitored usage cost after internal deployment"
      ]
    },
    outcome: {
      ko: [
        "저비용 모델 분기를 고려한 질의 처리 구조 구현",
        "근거 문서를 확인할 수 있는 검색 UI 개발 및 서비스 배포"
      ],
      en: [
        "Implemented a query-handling structure with low-cost model routing",
        "Developed and deployed a search UI that lets users check source documents"
      ]
    },
    gallery: [
      { ko: "답변과 근거 문서 표시 (여비규정 해당 페이지, 일부 모자이크 처리)", en: "Answer with cited source document (travel expense regulation page, partly blurred)" }
    ],
    tools: [
      "Python",
      "LiteLLM",
      "FastAPI",
      "LangGraph",
      "LibreChat",
      "pgvector",
      "Docker",
      "Amazon Titan Text Embeddings",
      "AWS"
    ]
  },
  {
    id: "cgn-aacr",
    featured: true,
    links: [{ href: "https://www.aacr.org/meeting/aacr-annual-meeting-2026/", label: locale("AACR 2026", "AACR 2026") }],
    title: {
      ko: "미국 이노크라스 AI 플랫폼 개발 및 AACR 학회 데모 지원",
      en: "Inocras US AI platform development and AACR conference demo support"
    },
    client: {
      ko: "미국 이노크라스 / 바이오 유전체 연구",
      en: "Inocras US / Bio genomics research"
    },
    period: {
      ko: "2026.04 (미국 파견 및 AACR 데모)",
      en: "Apr. 2026 (US assignment and AACR demo)"
    },
    overview: {
      ko: "WGS 코호트 데이터 기반 생성형 AI 연구지원 데모를 약 1개월 만에 개발해 AACR 2026에서 활용했습니다.",
      en: "Developed a WGS-cohort generative-AI research-support demo in about a month, used at AACR 2026."
    },
    role: {
      ko: [
        "WGS 코호트 데이터 기반 생성형 AI 연구지원 데모 개발 및 미국 현장 기술 지원",
        "당시 Claude 기반 Agent의 전문 분석 절차 수행 문제 검토",
        "Claude Code Skills를 도입하여 도메인 지식과 작업별 지침 구성",
        "LibreChat 기반 Agent Scientist UI 개선",
        "AWS 개발 및 운영 서버 아키텍처 설계",
        "고객 요구사항에 따른 기능 개선과 데모 안정화"
      ],
      en: [
        "Developed a generative-AI research-support demo on WGS cohort data and gave on-site technical support in the US",
        "Investigated why the Claude-based agent struggled with specialized analysis procedures",
        "Introduced Claude Code Skills to encode domain knowledge and task-specific instructions",
        "Improved the LibreChat-based Agent Scientist UI",
        "Designed the AWS development and production server architecture",
        "Improved features per customer requirements and stabilized the demo"
      ]
    },
    outcome: {
      ko: [
        "약 1개월 내 AACR 2026 컨퍼런스에서 활용할 데모 완성",
        "연구자 사용 환경을 고려한 UI 및 Agent 작업 지침 개선"
      ],
      en: [
        "Completed a demo within about a month for the AACR 2026 conference",
        "Improved the UI and agent task instructions for researchers"
      ]
    },
    tools: [
      "Python",
      "AWS",
      "Docker",
      "LiteLLM",
      "LibreChat",
      "Claude Code Skills"
    ]
  },
  {
    id: "spatial",
    title: {
      ko: "제약사 공간전사체 분석 자동화 및 LLM 연계 PoC",
      en: "Pharma spatial transcriptomics analysis automation and LLM PoC"
    },
    client: {
      ko: "삼성바이오에피스 / 제약 / 바이오 연구",
      en: "Samsung Bioepis / Pharma / Bio research"
    },
    period: {
      ko: "2025.07 ~ 2025.11",
      en: "Jul. – Nov. 2025"
    },
    overview: {
      ko: "개별 분석 작업을 Script 기반 자동화 Workflow로 전환하고 LLM 모듈 연계를 검증했습니다.",
      en: "Turned individual analyses into a script-based automated workflow and validated an LLM module integration."
    },
    role: {
      ko: [
        "Single-cell, Visium 기반 End-to-End 분석 파이프라인 개발",
        "RStudio/Jupyter 중심의 개별 분석을 모듈 단위로 분리하고 자동화 Workflow로 전환",
        "Public Data 분석부터 결과 및 보고서 생성까지 자동화",
        "실험자도 분석을 수행할 수 있도록 사용 방식 단순화",
        "Ollama 기반 LLM 모듈을 분석 Workflow에 연계한 PoC 수행"
      ],
      en: [
        "Developed end-to-end analysis pipelines for single-cell and Visium data",
        "Split RStudio/Jupyter-centered individual analyses into modules and converted them into an automated workflow",
        "Automated everything from public-data analysis to result and report generation",
        "Simplified usage so that experimenters can run analyses themselves",
        "Ran a PoC integrating an Ollama-based LLM module into the workflow"
      ]
    },
    outcome: {
      ko: [
        "분석 소요 시간 기존 2~3일에서 12시간 이내로 단축",
        "실행 환경 표준화 및 사용자별 Local 환경 의존성 감소"
      ],
      en: [
        "Cut analysis time from 2–3 days to within 12 hours",
        "Standardized the execution environment and reduced dependence on per-user local setups"
      ]
    },
    tools: [
      "Python",
      "R",
      "Bash",
      "Linux",
      "Snakemake",
      "Singularity",
      "Docker",
      "Ollama"
    ]
  },
  {
    id: "liquid-ldt",
    featured: true,
    title: {
      ko: "액체생검 LDT 분석 플랫폼 개발 및 사업화",
      en: "Liquid biopsy LDT analysis platform development and commercialization"
    },
    client: {
      ko: "국내 상급종합병원 및 사업화 / 바이오 임상 진단 분석",
      en: "Domestic tertiary hospitals and commercialization / Bio clinical diagnostic analysis"
    },
    period: {
      ko: "2024.11 ~ 2025.06",
      en: "Nov. 2024 – Jun. 2025"
    },
    overview: {
      ko: "UMI 기반 액체생검 변이 분석 파이프라인(합의 서열 생성, 변이 검출, 주석)을 Snakemake 워크플로우로 자동화하고 컨테이너로 구성해, 의료기관에 납품하는 LDT 분석 시스템 구축에 참여했습니다.",
      en: "Took part in building an LDT analysis system delivered to medical institutions, automating a UMI-based liquid biopsy variant-analysis pipeline (consensus generation, variant calling, annotation) as a Snakemake workflow and packaging it in containers."
    },
    role: {
      ko: [
        "액체생검 분석 소프트웨어 및 파이프라인 개발",
        "분석 모듈 컨테이너화와 Snakemake 기반 워크플로우 자동화",
        "레거시 파이프라인의 결과 데이터 문제 발견 및 개선",
        "분석 진행 상황 모니터링 및 서버 CAPA 최적화",
        "의료기관 대상 LDT 분석 시스템 배포 및 납품 지원"
      ],
      en: [
        "Developed liquid biopsy analysis software and pipelines",
        "Containerized analysis modules and automated workflows with Snakemake",
        "Found and fixed result-data problems in the legacy pipeline",
        "Monitored analysis progress and optimized server capacity",
        "Supported deployment and delivery of the LDT analysis system to medical institutions"
      ]
    },
    outcome: {
      ko: [
        "분석 실행 환경 표준화 및 반복 작업 자동화",
        "의료기관 대상 분석 시스템 구축, 납품과 운영 개선 지원"
      ],
      en: [
        "Standardized the execution environment and automated repetitive work",
        "Supported building, delivering, and improving operations of the analysis system for medical institutions"
      ]
    },
    tools: [
      "Python",
      "Linux",
      "Docker",
      "Singularity",
      "Snakemake"
    ]
  },
  {
    id: "hospital",
    title: {
      ko: "국내 상급종합병원 분석 시스템 구축 및 운영",
      en: "Tertiary hospital analysis system build and operation"
    },
    client: {
      ko: "국내 상급종합병원 / 바이오 임상 진단 분석",
      en: "Domestic tertiary hospital / Bio clinical diagnostic analysis"
    },
    period: {
      ko: "2023.06 ~ 2023.11 (재설치 및 현장 지원 기준)",
      en: "Jun. – Nov. 2023 (reinstallation and on-site support)"
    },
    overview: {
      ko: "병원별 폐쇄망 환경에 분석 시스템을 배포하고 결과 검증과 운영 안정화를 수행했습니다.",
      en: "Deployed the analysis system to hospital air-gapped environments and handled result verification and stabilization."
    },
    role: {
      ko: [
        "병원별 On-premise 및 Air-gapped 환경에 분석 시스템 배포",
        "레거시 스크립트 모듈화와 실행 환경 표준화",
        "분석 결과 동일성 검증 및 운영 안정화",
        "Daemon 및 Logging 구성, DB Migration 수행",
        "현장 모니터링 및 장애 대응"
      ],
      en: [
        "Deployed the analysis system to per-hospital on-premise and air-gapped environments",
        "Modularized legacy scripts and standardized the execution environment",
        "Verified result identity and stabilized operations",
        "Configured daemons and logging and performed DB migration",
        "On-site monitoring and incident response"
      ]
    },
    outcome: {
      ko: [
        "제한된 네트워크 환경에 맞춘 시스템 구축 및 운영",
        "MNP 변이 저장 오류의 VARCHAR(50) 제약 확인 후 VARCHAR(200)으로 개선"
      ],
      en: [
        "Built and operated the system under restricted network conditions",
        "Traced an MNP variant storage error to a VARCHAR(50) limit and raised it to VARCHAR(200)"
      ]
    },
    tools: [
      "Python",
      "Linux",
      "Crontab",
      "DBeaver",
      "Panoptes",
      "Snakemake",
      "On-premise",
      "Air-gapped"
    ]
  },
  {
    id: "lims",
    title: {
      ko: "LIMS(Web) Docker 기반 자동 배포 시스템 구축",
      en: "LIMS (Web) Docker-based automated deployment system"
    },
    client: {
      ko: "국내 상급종합병원 / 바이오 임상 진단 분석",
      en: "Domestic tertiary hospital / Bio clinical diagnostic analysis"
    },
    period: {
      ko: "2022.09 ~ 2022.12",
      en: "Sep. – Dec. 2022"
    },
    overview: {
      ko: "병원별 설치 환경에 대응하는 자동 배포 스크립트를 단독으로 개발해, 6단계로 나뉜 설치 절차를 원라인 설치로 간소화하고 약 7일 걸리던 배포와 테스트를 30~40분으로 줄였습니다.",
      en: "Independently developed automated deployment scripts for each hospital environment, simplifying a 6-step installation into a one-line install and cutting deployment and testing from about 7 days to 30–40 minutes."
    },
    role: {
      ko: [
        "병원별 설치 환경(CentOS, Ubuntu)에 대응하는 자동 배포 스크립트를 단독으로 설계 및 개발",
        "포트 개방, 라이선스 파일 교체, DB dump 생성, WAR 파일 교체 등 6단계로 나뉜 설치 절차를 원라인 설치로 간소화",
        "Docker 컨테이너(Tomcat, MariaDB, OZ Report, Shiny)로 애플리케이션 실행 환경을 구성해 병원별 환경 차이를 최소화",
        "On-premise 및 Air-gapped 환경에 대응하는 설치 절차 구성",
        "설치 SOP 작성: 구축 및 실행 방법, 설치에 필요한 폴더 구성 정리"
      ],
      en: [
        "Independently designed and developed automated deployment scripts for each hospital environment (CentOS, Ubuntu)",
        "Simplified a 6-step installation (port opening, license file replacement, DB dump creation, WAR file replacement, etc.) into a one-line install",
        "Packaged the application as Docker containers (Tomcat, MariaDB, OZ Report, Shiny) to minimize differences between hospital environments",
        "Defined installation procedures for on-premise and air-gapped sites",
        "Wrote the installation SOP: build-and-run procedure and the folder layout required for installation"
      ]
    },
    outcome: {
      ko: [
        "기존 약 7일 소요 배포 및 테스트 작업을 30~40분으로 단축",
        "6단계 설치 절차를 원라인 설치로 간소화",
        "설치 환경 차이로 인한 반복 작업 감소",
        "구축 및 실행 SOP 문서화로 설치 절차 표준화"
      ],
      en: [
        "Reduced deployment and testing from about 7 days to 30–40 minutes",
        "Simplified the 6-step installation into a one-line install",
        "Reduced repeated work caused by installation-environment differences",
        "Standardized the installation procedure by documenting it in a build-and-run SOP"
      ]
    },
    gallery: [
      { ko: "초기 설치 화면 (선택형 설치 절차를 원라인 설치로 간소화)", en: "Initial installer screen (simplifying a menu-driven installation into a one-line install)" },
      { ko: "최종 설치 화면 (원라인 설치)", en: "Final installer screen (one-line install)" },
      { ko: "설치 SOP 표지", en: "Installation SOP cover" },
      { ko: "설치 SOP: 설치에 필요한 폴더 구성 정리", en: "Installation SOP: folder layout required for installation" }
    ],
    tools: [
      "CentOS",
      "Ubuntu",
      "Docker",
      "Bash",
      "Software SOP"
    ]
  },
  {
    id: "aws-migration",
    title: {
      ko: "연구용 분석 서비스 AWS 전환 및 운영 자동화",
      en: "Research analysis service AWS migration and operations automation"
    },
    client: {
      ko: "연구용 분석 서비스 / 바이오 유전체 분석",
      en: "Research analysis service / Bio genomics analysis"
    },
    period: {
      ko: "2022.03 ~ 2022.07",
      en: "Mar. – Jul. 2022"
    },
    overview: {
      ko: "신입 시절 팀원으로 참여해, 주 100~300건 분석 수요에 대응하는 AWS 전환과 분석 워크플로 구축을 함께 수행했습니다.",
      en: "As a junior team member, helped build the AWS migration and analysis workflow that handled 100–300 analyses per week."
    },
    role: {
      ko: [
        "팀원으로 참여해 주 100~300건 분석 수요에 대응하는 AWS 전환을 함께 구축",
        "EC2, S3, Step Functions 기반 분석 워크플로 구성",
        "CLI 스크립트로 반복 운영 작업 자동화 및 Docker 기반 분석 실행 환경 구성",
        "병렬 분석 환경 구성 및 TAT 개선에 참여",
        "S3 Glacier 전환과 미사용 리소스 정리를 통한 비용 관리"
      ],
      en: [
        "Joined the team and helped build the AWS migration to handle 100–300 analyses per week",
        "Built the analysis workflow on EC2, S3, and Step Functions",
        "Automated repetitive operations with CLI scripts and set up a Docker-based analysis runtime",
        "Took part in setting up parallel analysis and improving TAT",
        "Managed cost through S3 Glacier transitions and cleanup of unused resources"
      ]
    },
    outcome: {
      ko: [
        "프로젝트 성과: 분석 TAT 14일에서 7일 이내로 단축",
        "프로젝트 성과: 월 AWS 비용 약 800~900만 원에서 400~500만 원 수준으로 절감"
      ],
      en: [
        "Project result: cut analysis TAT from 14 days to within 7 days",
        "Project result: reduced monthly AWS cost from about KRW 8–9 million to KRW 4–5 million"
      ]
    },
    tools: [
      "AWS EC2",
      "S3",
      "S3 Glacier",
      "Step Functions",
      "Docker",
      "Bash"
    ]
  },
  {
    id: "gxd-japan",
    featured: true,
    title: {
      ko: "NCCE MONSTAR SCREEN-3 분석 시스템 구축 및 운영 자동화",
      en: "NCCE MONSTAR SCREEN-3 analysis system build and operations automation"
    },
    client: {
      ko: "GxD 株式会社 / 바이오 유전체 분석",
      en: "GxD 株式会社 / Bio genomics analysis"
    },
    period: {
      ko: "2023.11 ~ 2024.03 (일본 파견 기간)",
      en: "Nov. 2023 – Mar. 2024 (Japan assignment)"
    },
    overview: {
      ko: "일본 법인 초기 구축 멤버로 분석 시스템 구축과 이관, 파이프라인 자동화, 장비 이슈 분석, 현지 SOP 대응까지 수행했습니다.",
      en: "As an initial member of the Japan entity, handled system build and migration, pipeline automation, instrument issue analysis, and local SOP support."
    },
    role: {
      ko: [
        "일본 자회사 초기 구축 멤버로 참여하여 현지 분석 서버 환경 구성 및 국내 유전체 분석 파이프라인 이관",
        "Linux 심볼릭 링크를 활용한 대용량 데이터 저장 경로 구성 및 서버 자원 활용 최적화",
        "DNA/RNA 데이터 자동 분류, Raw Data 변환 및 분석 파이프라인 실행 자동화 모듈 개발",
        "Python, Crontab, Singularity, Snakemake를 활용한 분석 워크플로우 구성 및 운영 자동화",
        "SGE qsub을 활용해 데이터 변환 작업을 병렬화하여 처리 시간을 약 2시간에서 20분 이내로 단축",
        "NovaSeq X Plus 장비의 데이터 생성 오류 발생 시 CLI 로그와 정상 테스트 기록을 비교하여 카메라 축 좌표 이상 징후 확인",
        "장비 이상 분석 결과를 공유하여 제조사 원인 검증 및 부품 교체 대응을 지원하고, 약 1억 원 규모의 재실험 비용 보상 관련 대응에 기여",
        "일본 현지 분석 파이프라인 SOP 작성 및 데이터 성능평가, QC 최적화, CAP Proficiency Testing 대응"
      ],
      en: [
        "Joined as an initial member of the Japan subsidiary: set up the local analysis server environment and migrated the domestic genomic analysis pipelines",
        "Configured large-data storage paths with Linux symbolic links and optimized server resource use",
        "Developed modules for automatic DNA/RNA data classification, raw-data conversion, and pipeline execution",
        "Built analysis workflows and automated operations with Python, Crontab, Singularity, and Snakemake",
        "Parallelized data conversion with SGE qsub, cutting processing time from about 2 hours to under 20 minutes",
        "Compared CLI logs with normal test records after NovaSeq X Plus data-generation errors and identified a camera-axis coordinate anomaly",
        "Shared the analysis so the manufacturer could verify the cause and replace parts, and contributed to the response on compensation for roughly KRW 100 million of re-experiment costs",
        "Wrote local analysis pipeline SOPs and supported data performance evaluation, QC optimization, and CAP proficiency testing"
      ]
    },
    outcome: {
      ko: [
        "현지 분석 환경 구축 및 국내 시스템 이관, 데이터 중복 복사를 줄이고 운영 환경 정비",
        "데이터 변환 작업 약 2시간에서 20분 이내로 단축, 반복 실행 작업 및 분석 파이프라인 운영 자동화",
        "장비 이상 징후 식별 및 제조사 대응, 부품 교체 후속 조치 지원, 약 1억 원 규모 재실험 비용 보상 관련 대응에 기여",
        "일본 현지 분석 운영 문서 정비 및 품질 검증, 숙련도 평가 관련 기술 대응"
      ],
      en: [
        "Built the local analysis environment and migrated the domestic system; reduced duplicate data copies and tidied the operating environment",
        "Reduced data conversion from about 2 hours to under 20 minutes and automated recurring jobs and pipeline operations",
        "Identified signs of instrument failure, supported the manufacturer response and part replacement, and contributed to the response on compensation for roughly KRW 100 million of re-experiment costs",
        "Organized local analysis operations documents and provided technical support for quality verification and proficiency testing"
      ]
    },
    gallery: [
      { ko: "MONSTAR 프로그램 개요", en: "MONSTAR program overview" },
      { ko: "초창기 사무실", en: "Early office" },
      { ko: "구축 완료 후 사무실", en: "Office after setup" },
      { ko: "분석 시스템 구성도", en: "Analysis system architecture" },
      { ko: "폴더 구조와 심볼릭 링크(ln -s)", en: "Folder structure and symbolic links (ln -s)" },
      { ko: "단일 모듈 병렬 처리", en: "Parallel processing of a single module" },
      { ko: "E2E 분석 과정", en: "End-to-end analysis workflow" },
      { ko: "장비 오류 (NovaSeq X Plus)", en: "Instrument failure (NovaSeq X Plus)" },
      { ko: "CAP 인증서", en: "CAP certificate of accreditation" }
    ],
    tools: [
      "Python",
      "Bash",
      "Linux",
      "Crontab",
      "Singularity",
      "Snakemake",
      "SGE(qsub)",
      "Docker"
    ]
  }
];

const skillGroups = {
  lang: locale('Languages', 'Languages'),
  db: locale('DB', 'DB'),
  ai: locale('AI', 'AI'),
  container: locale('Container', 'Container'),
  cloud: locale('Cloud', 'Cloud'),
  workflow: locale('Workflow', 'Workflow'),
};

const skills = [
  ['lang', 'production', 'Python', 'python', '분석 파이프라인과 AI 서비스 개발', 'Analysis pipelines and AI services'],
  ['lang', 'implemented', 'R', 'r', 'R 기반 데이터 분석', 'Data analysis with R'],
  ['db', 'production', 'MariaDB', 'mariadb', 'LIMS 데이터베이스를 Docker 컨테이너로 구성', 'LIMS database packaged as a Docker container'],
  ['db', 'implemented', 'SQLite', 'sqlite', 'nAI-Gateway 사용자와 사용량 데이터 저장', 'User and usage data storage for nAI-Gateway'],
  ['db', 'implemented', 'pgvector', 'pgvector', '규정 문서 임베딩 저장과 유사도 검색', 'Embedding storage and similarity search for policy documents'],
  ['ai', 'implemented', 'LiteLLM', 'litellm', 'AWS 기반 AI Gateway로 LLM 사용 환경과 비용 관리', 'AI Gateway on AWS for managing LLM access and costs'],
  ['ai', 'implemented', 'LibreChat', 'librechat', '사내 AI 챗봇 서비스 구성과 AI Gateway 연동', 'Internal AI chatbot service integrated with the AI Gateway'],
  ['ai', 'exploring', 'LangGraph', 'langgraph', 'AI Agent 워크플로 설계 학습 및 검토', 'Exploring AI agent workflow design'],
  ['ai', 'implemented', 'Claude Code Skills', 'claude-code', '사내 AI 개발 도구 도입과 사용 환경 구성', 'Introduced and configured AI development tooling for the company'],
  ['ai', 'exploring', 'MCP', 'mcp', 'Tool Calling과 MCP 기반 도구 연동 학습 및 검토', 'Exploring tool calling and MCP-based integrations'],
  ['container', 'production', 'Docker', 'docker', '컨테이너 기반 분석 환경 구성과 자동 배포', 'Container-based analysis environments and automated deployment'],
  ['container', 'production', 'Singularity', 'singularity', '분석 모듈 컨테이너화와 서버 실행 환경 구성', 'Containerizing analysis modules and server runtime setup'],
  ['cloud', 'production', 'AWS', 'aws', '클라우드 환경 구축 및 서비스 운영', 'Cloud environment setup and service operations'],
  ['workflow', 'production', 'Snakemake', 'snakemake', '분석 파이프라인 워크플로우 자동화', 'Automating analysis pipeline workflows'],
].map(([c, level, n, icon, ko, en]) => ({ c, level, n, icon, d: locale(ko, en) }));

const milestones = [
  { f: 'exp', start: '2025-11', logo: 'nongshim.svg', org: locale('농심데이터시스템', 'Nongshim Data System'), role: locale('AI 솔루션 기획 및 개발, B2B 솔루션 구축', 'AI solution planning and development, B2B solution delivery'),
    text: locale('AI 솔루션, AI Agent 플랫폼, B2B 솔루션, 클라우드 아키텍처 분야를 담당합니다.', 'Working on AI solutions, AI agent platforms, B2B solutions, and cloud architecture.'),
    projects: ['nai-gateway', 'ai-re', 'rag-chatbot'],
    children: [
      { start: '2026-10', logo: 'inocras.png', org: locale('이노크라스 국내 파견', 'Inocras (domestic assignment)'), role: locale('농심데이터시스템 재직 중 국내 고객사 파견', 'Assigned to a domestic customer while at Nongshim Data System'), desc: locale('현재 NDA(비밀유지계약) 및 MOU(업무협약)에 따라 업무를 수행하고 있습니다.', 'Currently working under an NDA (non-disclosure agreement) and an MOU (memorandum of understanding).'), note: locale('* 회사 기밀 보호를 위해 세부 내용을 축약했습니다.', '* Details are abbreviated to protect confidential company information.'), compact: true },
      { start: '2026-04', end: '2026-04', logo: 'inocras.png', org: locale('이노크라스 미국 파견', 'Inocras (US assignment)'), role: locale('농심데이터시스템 재직 중 해외 고객사 파견', 'Assigned to an overseas customer while at Nongshim Data System'), projects: ['cgn-aacr'] },
    ] },
  { f: 'exp', start: '2022-03', end: '2025-11', logo: 'geninus.png', org: locale('지니너스', 'GENINUS'), role: locale('유전체 분석 소프트웨어 및 시스템 개발', 'Genomic analysis software and system development'),
    text: locale('Bioinformatics Engineering, Workflow Automation, 의료기관 시스템 구축, AWS 전환을 담당했습니다.', 'Worked on bioinformatics engineering, workflow automation, medical-institution system delivery, and AWS migration.'),
    projects: ['spatial', 'liquid-ldt', 'hospital', 'lims', 'aws-migration'],
    children: [
      { start: '2024-04', end: '2025-11', org: locale('CAP PT / 실사 대응 (미국병리학회 인증)', 'CAP PT / Inspection response (College of American Pathologists accreditation)'), role: locale('분석 시스템 점검, SOP 및 증빙 문서 준비, CAP PT 분석 및 결과지 제출', 'System checks, SOP and evidence documents, CAP PT analysis and result reports'), note: locale('* 회사 기밀 보호를 위해 세부 내용을 축약했습니다.', '* Details are abbreviated to protect confidential company information.'), compact: true },
      { start: '2023-11', end: '2024-03', logo: 'gxd.png', org: locale('GxD 株式会社 (일본 파견)', 'GxD 株式会社 (Japan assignment)'), role: locale('지니너스 재직 중 일본 자회사 파견 (NCCE MONSTAR SCREEN-3)', 'Assigned to the Japan subsidiary while at GENINUS (NCCE MONSTAR SCREEN-3)'), projects: ['gxd-japan'] },
    ] },
  { f: 'edu', link: 'assets/papers/dongguk-msc-thesis.pdf', start: '2019-03', end: '2021-02', org: locale('멀티미디어공학과 석사 (M.Sc.)', 'M.Sc., Multimedia Engineering'), inst: locale('동국대학교', 'Dongguk University'), text: locale('학점 4.39 / 4.5<br>석사 졸업 논문: Research on DNA Sequence Alignment Algorithm Based on Anchoring', 'GPA 4.39 / 4.5<br>Master’s thesis: Research on DNA Sequence Alignment Algorithm Based on Anchoring') },
  { f: 'edu', link: 'assets/papers/dongguk-bsc-report.pdf', start: '2013-03', end: '2019-02', org: locale('컴퓨터공학과 학사 (B.Sc.)', 'B.Sc., Computer Science and Engineering'), inst: locale('동국대학교', 'Dongguk University'), text: locale('학점 3.24 / 4.5<br>학사 졸업 논문: A domestic crime information system by year. (web site)', 'GPA 3.24 / 4.5<br>Bachelor’s thesis: A domestic crime information system by year. (web site)') },
  { f: 'pub', link: 'https://acsjournals.onlinelibrary.wiley.com/doi/full/10.1002/cncr.35609', date: locale('2025.01', 'Jan. 2025'), org: locale('Phase II Trial of Avelumab in Combination with Gemcitabine in Advanced Leiomyosarcoma as a Second-line Treatment (EAGLES, KCSG UN18-09)', 'Phase II Trial of Avelumab in Combination with Gemcitabine in Advanced Leiomyosarcoma as a Second-line Treatment (EAGLES, KCSG UN18-09)'), inst: locale('Cancer, vol. 131, Issue 1, e35609', 'Cancer, vol. 131, Issue 1, e35609'), text: locale('Miso Kim MD, PhD, …, <b>Jeongkyu Kim</b> MS, Young Saing Kim MD, PhD, Jin-Hee Ahn MD, PhD', 'Miso Kim MD, PhD, …, <b>Jeongkyu Kim</b> MS, Young Saing Kim MD, PhD, Jin-Hee Ahn MD, PhD') },
  { f: 'pub', link: 'https://ieeexplore.ieee.org/document/9223667', date: locale('2020.12', '2020'), org: locale('A Review on Sequence Alignment Algorithms for Short Reads Based on Next-Generation Sequencing', 'A Review on Sequence Alignment Algorithms for Short Reads Based on Next-Generation Sequencing'), inst: locale('IEEE Access, vol. 8, pp. 189811–189822', 'IEEE Access, vol. 8, pp. 189811–189822'), text: locale('<b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi', '<b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi') },
    { f: 'award', link: 'assets/awards/kms-best-paper-2020.pdf', date: locale('2020.08', 'Aug. 2020'), org: locale('우수논문상', 'Best Paper Award'), inst: locale('Korea Multimedia Society', 'Korea Multimedia Society'), text: locale('<b>Research on Hash Table-Based Sorting Process Using k-mer Approach with Short Reads</b><br><b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi', '<b>Research on Hash Table-Based Sorting Process Using k-mer Approach with Short Reads</b><br><b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi') },
{ f: 'conf', link: 'assets/papers/kms-hash-sorting-2020.pdf', date: locale('2020.08', 'Aug. 2020'), org: locale('Research on Hash Table-Based Sorting Process Using k-mer Approach with Short Reads', 'Research on Hash Table-Based Sorting Process Using k-mer Approach with Short Reads'), inst: locale('Korea Multimedia Society', 'Korea Multimedia Society'), text: locale('<b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi', '<b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi') },
  { f: 'conf', link: 'assets/papers/kips-seed-aligner-2019.pdf', date: locale('2019.11', 'Nov. 2019'), org: locale('A Study on the Implementation of a Seed-Based Short Read Aligner', 'A Study on the Implementation of a Seed-Based Short Read Aligner'), inst: locale('Korea Information Processing Society, vol. 26, no. 2, pp. 1107–1109', 'Korea Information Processing Society, vol. 26, no. 2, pp. 1107–1109'), text: locale('Mingeun Ji, <b>Jeongkyu Kim</b>, Gangman Yi', 'Mingeun Ji, <b>Jeongkyu Kim</b>, Gangman Yi') },
];

// 학력 카드: inst(학교명)와 date(기간)를 locale('한글','English')로 추가하면 카드에 표시됩니다.
// NOTE: 화면에서는 제외한 "기술 문제 해결 사례" 내용입니다. 경력(milestones) 카드에 옮길 때 사용하세요.
const caseStudies = [
  ['mnp', [
    ['investigation', locale('실패한 변이 표현의 길이와 컬럼 제약을 대조했습니다.', 'Compared failing variant lengths with the column constraint.')],
    ['decision', locale('더 긴 변이 표현을 수용하도록 저장 용량을 늘리기로 했습니다.', 'Decided to increase storage capacity for longer representations.')],
  ]],
  ['wgs', [
    ['decision', locale('단일 모듈의 출력만 보지 않고 외부 결과와 교차 비교했습니다.', 'Cross-checked outputs with external results.')],
  ]],
  ['gateway', [
    ['decision', locale('사내 AI 사용 환경과 비용을 관리할 수 있도록 AWS 기반 게이트웨이를 구축했습니다.', 'Built an AWS-based gateway to manage the internal AI environment and costs.')],
  ]],
];

// NOTE: 화면에서는 제외한 "AI Agent와 엔터프라이즈 AX" 섹션 내용입니다.
const axAreas = [
  {
    title: locale('구축 경험', 'Built in practice'),
    text: locale('AWS 기반 AI Gateway를 구축하고 기업 내 AI 도구 도입과 비용 관리를 담당했습니다.', 'Built an AWS AI Gateway and worked on internal AI tool adoption and cost management.'),
  },
  {
    title: locale('학습 및 검토', 'Learning and exploration'),
    text: locale('LLM, RAG, Tool Calling, MCP, LLMOps와 LangGraph를 학습하고 검토하고 있습니다.', 'Exploring LLMs, RAG, tool calling, MCP, LLMOps, and LangGraph.'),
  },
  {
    title: locale('설계 방향', 'Design direction'),
    text: locale('업무를 단계별 Agent 워크플로로 나누고, ETL 경험을 RAG의 수집 및 정제에 적용합니다. 시스템 연동 경험은 MCP 도구 설계에, 결과 교차 검증 경험은 Agent 평가 설계에 활용할 수 있습니다.', 'Break business processes into agent workflows, apply ETL experience to RAG ingestion and cleaning, and use system integration and cross-validation experience to inform MCP tools and agent evaluation.'),
  },
];
