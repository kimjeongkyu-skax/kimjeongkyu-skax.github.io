// Each localized value contains Korean first and English second.
// TODO: Add verified employers, dates, job titles, project architecture, tools,
// metrics, implementation details, and public profile/CV links when supplied.
const locale = (ko, en) => ({ ko, en });
// Project: id, title, client/domain, period (null = to be added), overview, duties[], results[], tools[]
// Project images live in assets/projects/<id>/ : cover.jpg (or .png/.webp/.svg) and optional gallery 1.jpg ... 6.jpg (or .png)
// 이미지 주소에 붙이는 버전: 같은 파일명으로 사진을 바꿨을 때 브라우저 캐시를 무효화한다
const ASSET_V = '20261201o';
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
      ko: "2026.10 ~ 현재",
      en: "Oct. 2026 – present"
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
    story: {
      situation: {
        ko: "사내에서 Claude Code와 ChatGPT의 조직 차원 도입을 검토하면서 AI 서비스의 활용 방식, 보안 및 비용 관리에 대한 논의가 진행되었습니다.",
        en: "While reviewing organization-wide adoption of Claude Code and ChatGPT, discussions took place on how to use AI services and how to manage security and cost."
      },
      task: {
        ko: "여러 AI 서비스를 통합하고 사용자별 접근 권한과 비용을 관리할 방법이 필요했습니다. 관련 기술을 조사하면서 LLM Gateway를 알게 되었고, AWS 세션을 통해 인증 및 접근 통제 등 보안 측면에서도 보완이 필요하다고 판단했습니다.",
        en: "We needed a way to integrate multiple AI services and manage per-user access and cost. While researching related technologies, I came across the LLM gateway, and through an AWS session I judged that authentication and access control also needed to be strengthened from a security standpoint."
      },
      action: {
        ko: "LiteLLM 기반 AI Gateway를 구성하고, Amazon Bedrock 호출에는 IAM 인증을 적용해 API Key 노출 위험을 줄이고자 했습니다. Gateway 서버는 Private Subnet에 배치하고 외부 접근이 가능한 별도의 Web Portal을 앞단에 두는 구조를 설계했습니다. 이후 포털에 사용자 인증, 관리자 승인, 접근 권한 및 비용 관리 기능을 구현하고 일부 사내 사용자를 대상으로 PoC를 진행하고 있습니다.",
        en: "Set up an AI gateway on LiteLLM and applied IAM authentication to Amazon Bedrock calls to reduce the risk of API key exposure. Designed an architecture in which the gateway server sits in a private subnet behind a separate, externally accessible web portal. Then implemented user authentication, administrator approval, and access-permission and cost-management features in the portal, and am running a PoC with some internal users."
      },
      test: {
        ko: "[사용자 인증 및 접근 통제]\n초기 PoC에서는 사내 구글 이메일 OTP 인증후 메일 확인을 통해 코드를 확인하고, 최초 가입 시 관리자 승인, 사내망 접근 제한을 적용했습니다. 사용자 Q&A를 통해 로그인할 때마다 이메일 인증 코드를 입력하는 불편함과 외부 환경에서 접근할 수 없다는 의견을 확인했습니다. 현재는 세 가지 접근 통제 방식이 의도대로 동작하는 것을 확인한 상태이며, PoC 단계에서 수집한 의견을 바탕으로 인증 절차와 접근 정책의 개선 방향을 고려하고 있습니다.\n[Claude Code 토큰 사용량 분석 및 최적화]\nClaude Code를 제공한 이후 개발 직군, 특히 웹 개발 업무에서 토큰 사용 비용이 높게 발생하는 현상을 확인했습니다. 1M 토큰 컨텍스트 환경에서 대화 기록이 누적되면서 매 요청마다 대량의 컨텍스트가 반복 처리되는 문제를 확인했습니다. 이에 자동 컨텍스트 압축 기준을 약 40만 토큰으로 조정하고, 대규모 코드 분석 등 긴 컨텍스트가 필요한 경우에만 1M 토큰 환경을 활용하도록 사용 방식을 구분할 수 있도록 설정했습니다. 추가로 포니테일 Skill을 적용해 불필요한 출력과 코드 생성량을 줄이는 방향으로 개선했으며, 이를 통해 사용 비용을 약 30% 절감했습니다.\n[Bedrock 모델 호출 비용 검토]\nAmazon Bedrock의 글로벌 크로스 리전 추론을 활용하면 모델 호출 비용을 약 10% 절감할 수 있다는 점을 확인했습니다. 현재 사내 PoC는 비용 효율성을 우선하여 글로벌 크로스 리전 방식을 선택했습니다. 다만 향후 외부 고객사에 솔루션을 제공할 경우, 인증 및 데이터 처리 위치에 대한 요구사항을 고려해야 한다고 판단했습니다. 따라서 고객사 환경에서는 추가 비용이 발생하더라도 지정된 리전에서 모델을 호출하도록 구성하는 방향이 필요하다고 생각됩니다.\n[AI 서비스별 사용 패턴 분석]\nClaude Code와 비교해 Cowork 및 Chatbot은 상대적으로 짧은 작업과 질의응답 중심으로 사용되는 경향을 확인했습니다. 실제 PoC에서는 일일 사용 비용이 Claude Code 대비 약 10분의 1 수준인 사례도 확인했습니다. 이를 통해 AI 도구별 사용 목적과 컨텍스트 소비 특성에 따라 비용 관리 기준을 달리할 필요가 있다고 판단했습니다.\n[중앙 관리의 한계 및 향후 개선 방향]\n컨텍스트 압축 기준과 Skills 설정을 사용자 환경에 배포했지만, 개인 PC에서 root 권한을 활용하여, 설정을 변경할 수 있어 동일한 비용 관리 정책을 일관되게 적용하기 어려웠습니다. 일부 사용자는 설정 변경 이후 토큰 사용량과 비용이 다시 증가하는 현상도 확인했습니다. 이에 따라 사용자별 설정에 의존하는 방식에서 벗어나, 중앙 통제의 고도화 및 사용량과 예산을 관리하는 구조가 필요하다고 판단했습니다. LiteLLM에서는 Tool Policies를 통해 input과 output을 제한할 수 있지만, Claude 설정이나 내용은 제한하지 못하고 지속적으로 제한하는 데에도 한계가 있어, 향후 LiteLLM과 연계 가능한 모니터링 도구를 검토하고, 사용자별 요청 로그, 토큰 사용량, 컨텍스트 크기 등을 관찰하여 비용 예측과 중앙 관리 기능을 개선할 계획입니다.",
        en: "[User authentication and access control]\nIn the initial PoC we applied internal Google-account email OTP authentication (checking the code in the mail), administrator approval at first sign-up, and internal-network-only access. User Q&A raised that entering an email code at every login is inconvenient and that access from outside is not possible. We have confirmed that these three access-control methods work as intended, and are considering improvements to the authentication flow and access policy based on the feedback collected during the PoC.\n[Claude Code token usage analysis and optimization]\nAfter providing Claude Code, we found that token costs were high among developers, especially in web development work. With a 1M-token context, conversation history accumulated and large amounts of context were repeatedly processed on every request. We therefore adjusted the automatic compaction threshold to about 400K tokens and configured usage so that the 1M-token environment is used only when long context is needed, such as large-scale code analysis. We also applied the Ponytail skill to reduce unnecessary output and code generation, which cut usage costs by about 30%.\n[Bedrock model invocation cost review]\nWe confirmed that Amazon Bedrock global cross-region inference can cut model invocation costs by about 10%. The current internal PoC chose global cross-region inference to prioritize cost efficiency. However, we judged that for solutions offered to external customers, requirements on authentication and data-processing location must be considered. We therefore think customer environments should call models in designated regions, even at additional cost.\n[Usage patterns by AI service]\nCompared with Claude Code, Cowork and chatbot usage tended to center on shorter tasks and Q&A. In the actual PoC we also saw cases where daily usage cost was about one tenth of Claude Code. We judged that cost management criteria should differ by the purpose and context-consumption characteristics of each AI tool.\n[Limits of central management and future improvements]\nWe deployed the context compaction threshold and Skills settings to user environments, but because users can change settings with root access on their own PCs, it was hard to apply the same cost policy consistently. Some users' token usage and costs rose again after changing settings. We therefore judged that we need stronger central control and a structure for managing usage and budgets, rather than relying on per-user settings. LiteLLM can restrict input and output through Tool Policies, but it cannot restrict Claude settings or content, and restricting them continuously has its limits, so going forward we will review monitoring tools that work with LiteLLM and observe per-user request logs, token usage, and context size to improve cost forecasting and central management."
      }
    },
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
      ko: "LiteLLM과 Bedrock 기반으로 사내 생성형 AI 사용 환경과 접근, 비용 관리 기능을 구축하고, 일부 사용자 PoC로 기능과 운영, 비용 구조를 검증했습니다.",
      en: "Built an internal generative-AI environment with access and cost management on LiteLLM and Bedrock, and validated features, operations, and cost structure through a PoC with some users."
    },
    role: {
      ko: [
        "생성형 AI 활용을 위한 Gateway 아키텍처 설계 및 PoC 수행",
        "Claude Code, Cowork, Chatbot 등의 사용자별 서비스 제공 방안 검토",
        "AWS IAM 인증을 활용한 LiteLLM–Amazon Bedrock 연동 및 서비스 환경 구성",
        "별도 사용자 및 관리자 포털 아키텍처 제안과 개발",
        "사내 이메일 인증과 관리자 가입 승인 기능 구현",
        "PoC 사용자의 시간 단위 및 일별 사용량 모니터링, 비용 최적화 테스트 및 주요 기능 테스트",
        "사용자 및 팀별 접근 권한, 예산, 사용 비용을 조회 및 통제하는 관리자 모니터링 기능 구현",
        "외부 접근 포털과 승인 검토 규칙 기획"
      ],
      en: [
        "Designed the gateway architecture for generative AI use and ran the PoC",
        "Evaluated per-user service options such as Claude Code, Cowork, and chatbots",
        "Integrated LiteLLM with Amazon Bedrock using AWS IAM authentication and configured the service environment",
        "Proposed and developed separate user and administrator portal architectures",
        "Implemented internal email authentication and administrator sign-up approval",
        "Monitored hourly and daily usage of PoC users and ran cost-optimization and key-feature tests",
        "Implemented administrator monitoring to view and control permissions, budgets, and usage cost per user and team",
        "Planned the external-access portal and its approval review rules"
      ]
    },
    outcome: {
      ko: [
        "일부 사내 사용자 대상 PoC 진행 및 기능, 운영, 비용 구조 검증",
        "외부 고객 제공을 고려한 솔루션 고도화 진행 중"
      ],
      en: [
        "Ran a PoC with internal users and validated features, operations, and cost structure",
        "Advancing the solution for external customer delivery"
      ]
    },
    gallery: [
      { ko: "로그인: 회사 메일 입력", en: "Sign-in: company email entry" },
      { ko: "사내 이메일 인증코드 메일 (Gmail SMTP 발송, Gmail 수신 화면)", en: "Internal email verification code message (sent via Gmail SMTP, shown in Gmail)" },
      { ko: "로그인: 인증코드 입력", en: "Sign-in: verification code entry" },
      { ko: "사내 이메일 인증 완료 후 초기 가입시 사용 신청", en: "After internal email verification, first-time sign-up submits an access request" },
      { ko: "신규 사용 신청 시 관리자에게 승인 요청 메일 발송 (Gmail)", en: "Approval request email sent to the administrator on a new access request (Gmail)" },
      { ko: "관리자 승인, 키 교체, 예산 관리", en: "Admin: approvals, key replacement, and budget management" },
      { ko: "관리자: 팀별 사용액 모니터링", en: "Admin: usage monitoring by team" },
      { ko: "AWS 아키텍처", en: "AWS architecture" }
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
    story: {
      situation: {
        ko: "기존 MSP 사업을 수행하던 회사는 바이오헬스케어 시장으로 사업 영역을 확장하고자 했습니다. 이를 위해 기존 클라우드 인프라 역량을 활용하면서도 새로운 시장에서 경쟁력을 확보할 수 있는 제품과 서비스 방향을 모색하고 있었습니다. 입사 당시에는 바이오헬스케어 분야에 적용할 독자적인 소프트웨어 개발을 검토하고 있었습니다. 이후 벤치마킹 기업들과의 미팅과 기술 동향 조사를 거치며 Bioinformatics 연구자를 위한 솔루션 플랫폼으로 방향을 발전시켰습니다. 논의가 이어지면서 특정 분석 분야에 한정된 소프트웨어보다 다양한 연구자가 수집된 데이터를 관리하고 실제 연구에 활용할 수 있는 플랫폼의 필요성이 부각되었습니다. 이에 AWS 기반 연구 환경과 데이터 거버넌스, AI Agent 활용 방안을 결합한 AI-RE 플랫폼을 기획하게 되었습니다.",
        en: "The company, which had been running an MSP business, wanted to expand into the bio-healthcare market. To do so it was looking for product and service directions that could leverage its existing cloud infrastructure capabilities while building competitiveness in a new market. When I joined, it was considering developing proprietary software for the bio-healthcare field. Through meetings with benchmarked companies and technology-trend research, the direction evolved into a solution platform for bioinformatics researchers. As discussions continued, the need grew for a platform where diverse researchers can manage collected data and use it in actual research, rather than software limited to a specific analysis field. This led to planning the AI-RE platform, combining an AWS-based research environment, data governance, and AI Agent use."
      },
      task: {
        ko: "기존 MSP 사업 역량을 바이오헬스케어 분야의 새로운 서비스 모델로 발전시키기 위해서는 연구자의 업무 특성을 반영한 플랫폼 구조가 필요했습니다. 연구 분야와 프로젝트마다 데이터 특성, 분석 환경, 접근 권한이 다르기 때문에 프로젝트별 독립적인 연구 환경을 제공하면서도 데이터 접근과 자원 사용을 통제할 수 있어야 했습니다. 또한 연구 데이터의 반입과 반출에 대한 승인 절차를 통해 보안과 관리 체계를 마련해야 했습니다. 나아가 데이터를 단순히 보관하는 데서 그치지 않고 연구자가 축적된 데이터를 분석하고 활용할 수 있도록 AI 기술의 연계 가능성도 고려해야 했습니다. 핵심 과제는 연구자의 데이터 활용 환경과 AWS 인프라 거버넌스를 통합하고, AI 기반 연구 활동까지 지원할 수 있는 플랫폼의 서비스 방향과 아키텍처를 구체화하는 것이었습니다.",
        en: "To turn the company's MSP capabilities into a new service model in bio-healthcare, a platform structure reflecting researchers' work characteristics was needed. Because data characteristics, analysis environments, and access permissions differ by research field and project, the platform had to provide an independent research environment per project while controlling data access and resource use. A security and management framework was also needed through approval procedures for bringing research data in and out. Beyond simply storing data, the possibility of integrating AI so researchers can analyze and use accumulated data also had to be considered. The core task was to define the service direction and architecture of a platform that integrates researchers' data-use environment with AWS infrastructure governance and supports AI-based research activities."
      },
      action: {
        ko: "[시장 조사와 격주 임원회의를 통한 플랫폼 방향 구체화]\n벤치마킹 기업들과의 미팅, AWS 및 Microsoft 컨퍼런스, 바이오헬스케어 관련 행사에 참여하며 경쟁 솔루션과 클라우드 기반 연구 서비스의 기술 동향을 조사했습니다. 조사한 내용을 기존 Bioinformatics 개발 및 연구 환경 구축 경험과 연결해 기획 자료를 작성하고, 격주마다 임원회의에서 발표했습니다. 발표 후 받은 피드백을 다음 조사와 기획에 반영하며 서비스의 대상 사용자와 기능 범위를 구체화했습니다. 이러한 과정을 통해 Bioinformatics 중심의 솔루션 구상에서 다양한 분야의 연구자가 활용할 수 있는 연구 플랫폼으로 기획 범위를 확장했습니다.\n[연구자 중심의 AWS 인프라 및 거버넌스 구조 설계]\n실제 Bioinformatics 분석 파이프라인 개발과 연구 시스템 운영 경험을 바탕으로 연구자의 데이터 활용 방식과 분석 환경을 고려한 AWS 아키텍처를 설계했습니다. 연구자 및 프로젝트별 접근 권한, 데이터 반입과 반출 승인 절차, 프로젝트별 독립적인 실행 환경을 주요 요구사항으로 정의했습니다. 또한, 웹 페이지를 위한 와이어 프레임 및 스토리 보드도 함께 작성했습니다. 이를 통해 연구자가 필요한 데이터와 인프라를 활용하면서도 관리자가 접근 권한과 자원 사용을 통제할 수 있는 연구 환경을 구상했습니다.\n[연구 데이터 활용을 위한 AI Agent 연계 설계]\n연구 데이터의 수집과 관리를 넘어 실제 연구 활용을 지원하기 위해 AI Agent 연계 방향을 검토했습니다. 사용자별 권한 및 비용 통제 방안을 연구 플랫폼에 반영하고, 연구자가 축적된 데이터를 AI Agent를 통해 분석하고 활용할 수 있는 구조를 구상했습니다. 이를 AWS 기반 연구 환경 및 데이터 거버넌스 설계와 결합하여 AI-RE의 전체 아키텍처를 구체화했습니다.\n[솔루션팀 개발 협업 및 바이오 도메인 요구사항 검토]\n기획한 플랫폼의 기능과 아키텍처를 기반으로 솔루션팀 동료들이 연구자용 웹 환경과 프로젝트 관리 기능을 개발하고 있습니다. 개발 과정에서는 기존 Bioinformatics 개발 및 연구 현장 경험을 바탕으로 실제 사용 환경에서 발생할 수 있는 문제와 도메인별 요구사항을 검토하고 있습니다. 검토 내용을 솔루션팀 동료들과 공유하며 기능 및 설계의 보완 사항을 제안하고 있습니다. 또한 AI Agent 연계 방향을 함께 검토하며 플랫폼 기획이 실제 구현으로 이어질 수 있도록 협업하고 있습니다.\n[KHF 및 IHF를 통한 고객 발굴과 서비스 출시 준비]\nKHF 발표 및 IHF 컨퍼런스를 통해 잠재 고객에게 AI-RE의 기획 방향과 연구 데이터 활용 방안을 소개했습니다. 행사에서 확인한 고객의 관심과 요구사항을 바탕으로 플랫폼 적용 및 협력 가능성에 대한 후속 논의가 이어지고 있습니다. 현재 솔루션팀에서는 웹 기능 개발과 AI 연계 구조 구체화를 진행하고 있으며, 2027년 1분기 정식 서비스 배포를 목표로 준비하고 있습니다.",
        en: "[Shaping the platform direction through market research and executive meetings]\nI joined meetings with benchmarked companies and attended AWS and Microsoft conferences and bio-healthcare events to research competing solutions and technology trends in cloud-based research services. I connected what I found with my prior experience in bioinformatics development and research-environment building to write planning documents, and presented them at executive meetings every other week. I reflected the feedback in the next round of research and planning, which clarified the target users and the feature scope. Through this process, the scope expanded from a bioinformatics-centered solution to a research platform that researchers in various fields can use.\n[Designing a researcher-centered AWS infrastructure and governance structure]\nBased on hands-on experience developing bioinformatics analysis pipelines and operating research systems, I designed an AWS architecture that takes researchers' data-use patterns and analysis environments into account. I defined per-researcher and per-project access permissions, approval procedures for bringing data in and out, and isolated per-project execution environments as the main requirements, and also wrote wireframes and storyboards for the web pages. This allowed me to conceive a research environment in which researchers can use the data and infrastructure they need while administrators control access and resource use.\n[Designing AI Agent integration for research data use]\nTo support actual research use beyond collecting and managing research data, I reviewed directions for integrating an AI Agent. I reflected per-user permission and cost-control measures in the research platform and conceived a structure in which researchers analyze and use accumulated data through the AI Agent. By combining this with the AWS-based research environment and data governance design, I defined the overall AI-RE architecture.\n[Collaborating with the Solutions team and reviewing bio-domain requirements]\nBased on the planned features and architecture, my colleagues on the Solutions team are developing the researcher web environment and project management features. During development I review problems that could arise in real usage environments and domain-specific requirements, drawing on my experience in bioinformatics development and research sites, share the findings with the team, and propose improvements to features and design. I also review the AI Agent integration direction together with them so that the plan leads to actual implementation.\n[Finding customers through KHF and IHF and preparing for launch]\nAt the KHF presentation and the IHF conference, I introduced AI-RE's planned direction and ways of using research data to potential customers. Follow-up discussions on applying the platform and cooperating are continuing, based on the interest and requirements customers showed at the events. The Solutions team is currently developing web features and detailing the AI integration structure, and is preparing for an official service release targeted for Q1 2027."
      }
    },
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
      ko: "2026.01 ~ 2026.08",
      en: "Jan. – Aug. 2026"
    },
    overview: {
      ko: "B2B 공동연구 플랫폼을 기획하고, 의료 현장에서 도입할 수 있는 구조를 기획 중인 내용으로 KHF 2026에서 발표했습니다. 이후 nAI-Gateway 구축과 WGS 분석 AI Agent 데모를 PoC로 진행하며 AI Agent 플랫폼과 AWS 기반 웹 인프라로 확장하게 되었습니다.",
      en: "Planned a B2B joint-research platform and presented the work-in-progress plan for a structure adoptable in clinical settings at KHF 2026. It then grew into an AI Agent platform and web-based AWS infrastructure through PoCs: building nAI-Gateway and a WGS analysis AI Agent demo."
    },
    role: {
      ko: [
        "바이오헬스케어 시장 진출을 위한 초기 Bioinformatics Community 기획 및 경쟁 솔루션 벤치마킹 (Seqera, Basepair, InVisibl Cloud)",
        "AWS, Microsoft 및 바이오헬스케어 컨퍼런스에서 기술 동향을 조사하고, 격주 임원회의 발표와 피드백을 통해 B2B 연구 플랫폼 기획 구체화",
        "Bioinformatics 중심 솔루션에서 다양한 연구자를 위한 AI 기반 연구 데이터 활용 플랫폼으로 서비스 범위 확장 검토",
        "연구자별 독립 분석 환경, 프로젝트별 접근 권한, 데이터 반입 및 반출 승인 체계 등 AWS 인프라 및 거버넌스 아키텍처 설계",
        "연구 데이터 활용을 위한 Scientist AI Agent 연계 구조 기획",
        "솔루션팀의 웹 기능 개발 과정에서 바이오 도메인 요구사항과 연구 현장 운영 문제 검토 및 설계 보완",
        "KHF 2026 기술 발표 및 IHF 컨퍼런스에서 플랫폼 소개, 잠재 고객 요구사항 파악 및 기술 설명 담당"
      ],
      en: [
        "Planned the early Bioinformatics Community for entering the bio-healthcare market and benchmarked competing solutions (Seqera, Basepair, InVisibl Cloud)",
        "Researched technology trends at AWS, Microsoft, and bio-healthcare conferences, and refined the B2B research platform plan through biweekly executive-meeting presentations and feedback",
        "Reviewed expanding the service scope from a bioinformatics-centered solution to an AI-based research data platform for diverse researchers",
        "Designed the AWS infrastructure and governance architecture, including per-researcher isolated analysis environments, per-project access permissions, and data in/out approval procedures",
        "Planned the integration structure for the Scientist AI Agent to use research data",
        "Reviewed bio-domain requirements and research-site operational issues during the Solutions team's web feature development and supplemented the design",
        "Presented at KHF 2026 and the IHF conference, introducing the platform, identifying potential customers' requirements, and giving technical explanations"
      ]
    },
    outcome: {
      ko: [
        "기존 MSP 역량을 기반으로 AI 연구 플랫폼의 서비스 방향과 연구 환경, 데이터 거버넌스 및 AI 활용 기능 구체화",
        "AWS 기반 연구 플랫폼 아키텍처 및 주요 기능 설계, 솔루션팀 개발 연계",
        "KHF 2026 발표 및 고객 대응을 통해 팀 기준 문의 고객 82건 확보에 기여 (이전 4개년 평균 9건)",
        "잠재 고객과 플랫폼 적용 및 협력 가능성에 대한 후속 논의 진행"
      ],
      en: [
        "Defined the service direction, research environment, data governance, and AI features of the AI research platform, building on the company's existing MSP capabilities",
        "Designed the AWS-based research platform architecture and main features, and linked them to the Solutions team's development",
        "Contributed to 82 customer inquiries (team total) through the KHF 2026 presentation and customer handling (previous 4-year average: 9)",
        "Follow-up discussions with potential customers on applying the platform and cooperating"
      ]
    },
    gallery: [
      { ko: "초창기 구성도", en: "Early concept diagram" },
      { ko: "서비스 흐름도 01: 데이터와 권한 (정보 거버넌스)", en: "Service flow 01: data and permissions (information governance)" },
      { ko: "서비스 흐름도 02: 프로젝트 그룹과 권한", en: "Service flow 02: project groups and permissions" },
      { ko: "서비스 흐름도 03: 파이프라인", en: "Service flow 03: pipelines" },
      { ko: "와이어프레임: 메인 페이지", en: "Wireframe: main page" },
      { ko: "화면 설계 작성 예) (1): 표시 방법 정의", en: "Screen design example (1): display conventions" },
      { ko: "화면 설계 작성 예) (2): UI 구성 요소 정의", en: "Screen design example (2): UI components" },
      { ko: "데이터 업로드 및 다운로드 승인과 비용 관리 흐름", en: "Data upload and download approval and cost management flow" }
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
    story: {
      situation: {
        ko: "회사의 전사적인 AX 도입을 검토하던 시기에 사내 규정문서와 공지사항은 기존 레거시 홈페이지에 분산되어 있었습니다. 필요한 규정을 확인하려면 여러 페이지와 문서를 직접 찾아야 했으며, 문서의 양도 많아 원하는 정보를 찾는 데 어려움이 있었습니다. 이러한 상황에서 팀장님이 타 기업의 사내 규정문서 활용 사례를 참고해 내부 도입을 제안했고, 임원회의 승인을 받아 사내 규정문서 기반 RAG 챗봇 프로젝트를 시작했습니다.",
        en: "While the company was considering company-wide AX adoption, internal policy documents and announcements were scattered across the legacy website. To check a needed policy, one had to search through several pages and documents by hand, and the sheer volume made it hard to find the information wanted. In this situation, our team lead referred to other companies' use of internal policy documents and proposed adopting it internally, and with executive-meeting approval we started the internal policy-document RAG chatbot project."
      },
      task: {
        ko: "우선 레거시 홈페이지에 흩어져 있는 규정문서를 수집하고, 실제 업무에 필요한 문서를 선별해야 했습니다. 실무 관련 문서 112개를 추린 뒤 최신 버전 44개로 정리했으며, 초기 테스트에 적합한 문서 6개를 선정했습니다. 빠르게 PoC를 구축해야 하는 상황에서 미국 파견 당시 사용했던 LibreChat을 활용했습니다. 처음에는 PDF를 업로드하면 자동으로 임베딩하고 검색하는 기본 RAG 기능을 사용했지만, 규정문서처럼 정확한 답변과 근거 확인이 중요한 환경에서는 한계가 있었습니다. 특히 여러 규정의 내용이 하나의 답변에 섞이거나, PDF 표 구조가 손상되어 첫 행의 내용이 다음 행과 겹치거나, 금액과 친족 관계를 잘못 해석하는 문제가 발생했습니다. 이를 해결하기 위해 기존 문서 처리 기능은 활용하면서도 질문 분류, 검색 결과 검증, 답변 생성 및 계산 과정을 직접 제어할 수 있는 구조가 필요하다고 판단했습니다.",
        en: "First, the policy documents scattered across the legacy website had to be collected and the ones needed for actual work selected. I narrowed them to 112 work-related documents, organized them into 44 latest versions, and chose 6 documents suitable for initial testing. Since the PoC had to be built quickly, I used LibreChat, which I had used during the US assignment. At first I used its basic RAG feature, which automatically embeds and searches PDFs after upload, but it had limits in an environment like policy documents where accurate answers and source verification matter. In particular, several problems occurred: content from multiple policies got mixed into a single answer, damaged PDF table structures made the first row's content overlap with the next, and amounts and kinship relations were misinterpreted. To solve this, I judged that we needed a structure that reuses the existing document-processing features while letting us directly control question classification, search-result verification, answer generation, and calculation."
      },
      action: {
        ko: "[LangGraph 기반 Coordinator]\nLibreChat의 rag_api를 활용해 문서를 처리하고, 질의 처리는 FastAPI와 LangGraph로 별도 개발했습니다. Coordinator에서 질문 유형을 분류하고 처리 흐름을 제어했으며, 규정 관련 질문은 반드시 문서 검색을 거치도록 구성했습니다.\n[LLM 기반 Reranking 및 검색 개선]\n질문을 검색에 적합한 Query로 변환하고, 관련성이 낮은 청크와 개정 이력 표를 필터링했습니다. 이후 Claude Sonnet이 검색 결과의 관련성을 평가해 답변에 사용할 근거를 선별하도록 했으며, 결과가 부족하면 재검색하도록 구성했습니다.\n[문서 자동 선택 및 근거 확인]\n여러 규정이 검색될 때 답변이 섞이는 문제를 해결하기 위해 문서 선택 로직을 구현했습니다. 관련도가 명확하거나 이전에 선택한 문서가 있으면 자동으로 선택하고, 판단이 어려울 때만 사용자에게 선택지를 제공했습니다.\nPDF 표 추출 과정에서 깨진 데이터는 원본과 비교해 보정했습니다. 또한 문서명과 페이지 정보를 LibreChat 화면으로 전달해 원본 PDF를 확인할 수 있는 근거 패널을 구현했습니다.\n[모델 분리 및 운영 개선]\n정확한 판단이 필요한 질문 분류와 Reranking에는 Claude Sonnet을, Query 변환과 답변 생성에는 Claude Haiku를 사용했습니다. LiteLLM으로 사용자별 사용량과 비용을 관리하고, 사내 PoC에서 접수된 오답 사례를 바탕으로 기능을 개선했습니다.",
        en: "[LangGraph coordinator]\nDocuments are processed through LibreChat's rag_api, while the query handling was built separately with FastAPI and LangGraph. A coordinator classifies the question type and controls the processing flow, and policy-related questions always go through a document search.\n[LLM-based reranking and search improvements]\nThe question is converted into a query suited to search, and low-relevance chunks and revision-history tables are filtered out. Claude Sonnet then assesses how relevant the search results are and selects the evidence to use in the answer, searching again when the results fall short.\n[Automatic document selection and source checking]\nTo stop answers from blending together when several policies match, I implemented document selection logic. It picks a document automatically when the relevance is clear or when one was chosen earlier, and offers the user a choice only when the call is genuinely ambiguous.\nData broken during PDF table extraction was corrected against the original. I also passed the document name and page information through to the LibreChat screen, building a source panel where the original PDF can be checked.\n[Model split and operational improvements]\nClaude Sonnet handles question classification and reranking, where accurate judgement matters, while Claude Haiku handles query conversion and answer generation. LiteLLM manages per-user usage and cost, and features were improved from the wrong answers reported during the internal PoC."
      },
      test: {
        ko: "실무자들이 확인하고 싶은 부분만 채팅으로 확인하는 작업이 대부분이었고, 코드를 구현하거나 같은 질문과 꼬리 질문을 반복하는 일이 예상보다 적어서 비용은 Claude Code PoC 때보다 현저히 낮았습니다. 하지만 다중 질문과 단답형 질문, 실제 친족 관계 질문 등에서 잘못된 답변이 나온다는 Q&A가 들어왔고, 이 이슈들을 해결하는 작업이 필요했습니다.",
        en: "Most usage was practitioners checking only the parts they wanted through chat, and there was less coding and fewer repeated or follow-up questions than expected, so the cost was far lower than in the Claude Code PoC. However, Q&A came in about wrong answers to multi-part questions, short-answer questions, and real kinship questions, and work was needed to resolve these issues."
      }
    },
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
      ko: "레거시 홈페이지에 흩어져 있던 규정문서를 선별하고, LibreChat의 문서 처리는 활용하면서 질의 처리는 LangGraph로 직접 개발해 근거를 확인할 수 있는 사내 챗봇을 배포했습니다.",
      en: "Selected the policy documents scattered across the legacy website, then deployed an internal chatbot with verifiable sources — reusing LibreChat's document handling while building the query handling in-house with LangGraph."
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
        "Implemented model routing: Haiku for general chat, Sonnet for policy search and result re-ranking",
        "Implemented Sonnet-based reranking that offers up to 3 candidate policy documents for the user to choose",
        "Built a PDF page preview with the cited passage highlighted",
        "Improved features and monitored usage cost after internal deployment"
      ]
    },
    outcome: {
      ko: [
        "사내 배포 후 실무자 대상 PoC 진행, 모델 분기로 Claude Code PoC보다 현저히 낮은 운영 비용 확인",
        "답변마다 문서명과 쪽 번호, PDF 미리보기를 제공해 근거를 직접 확인할 수 있는 구조 구현",
        "PoC Q&A로 접수된 오답(다중 질문, 단답형, 친족 관계)을 표 보정, 계산기, 친족 관계 풀이로 개선"
      ],
      en: [
        "Ran a PoC with practitioners after internal deployment and confirmed operating cost far below the Claude Code PoC thanks to model routing",
        "Implemented a structure where every answer carries the document name, page number, and a PDF preview so sources can be checked directly",
        "Resolved wrong answers reported in PoC Q&A (multi-part questions, short answers, kinship) with table correction, a calculator, and kinship resolution"
      ]
    },
    gallery: [
      { ko: "답변과 근거 문서 표시 (여비규정 해당 페이지, 일부 모자이크 처리)", en: "Answer with cited source document (travel expense regulation page, partly blurred)" },
      { ko: "가족 관계 질문에 대한 답변: 친족 관계를 풀이해 해당 규정 표와 출처 안내", en: "Answer to a family-relationship question: resolves the kinship and shows the matching policy tables and sources" }
    ],
    tools: [
      "Python",
      "LiteLLM",
      "FastAPI",
      "LangGraph",
      "LibreChat",
      "pgvector",
      "Docker",
      "Amazon Bedrock",
      "Amazon Titan Text Embeddings",
      "AWS"
    ]
  },
  {
    id: "cgn-aacr",
    story: {
      situation: {
        ko: "농심데이터시스템 입사 후 바이오 분야의 신규 사업 타당성을 검토하는 업무를 맡았습니다. 기존 바이오인포매틱스 파이프라인 개발과 국내외 병원 및 실험실 운영 경험을 바탕으로, 이노크라스가 제안한 사업 모델의 분석 비용, 운영 방식, 예상 수익성 및 기술적 실현 가능성을 검토하고 격주 임원회의에서 관련 내용을 보고했습니다.\n이 과정에서 기존 고객사인 이노크라스의 공동대표와 CTO를 비롯한 임원진이 방문해 사업 방향과 AACR 학회 계획을 설명했습니다. 이노크라스는 AACR을 중요한 사업적 기회로 보고 있었으며, 이를 준비하는 과정에서 농심데이터시스템이 지원할 수 있는 부분을 논의했습니다.\n농심데이터시스템 역시 이번 협업을 통해 바이오 AI 솔루션의 사업 가능성을 확인하고, AACR 현장 데모와 세션 발표의 반응, 미국 본사의 규모 및 운영 현황 등을 신규 사업 검토에 참고하고자 했습니다. 이후 AI 플랫폼 개발 협업이 진행되면서 동료 1명과 함께 미국 샌디에이고 이노크라스 본사에 약 한 달간 파견되었습니다.",
        en: "After joining Nongshim Data System, I was assigned to assess the feasibility of new business in the bio field. Drawing on my experience developing bioinformatics pipelines and working in hospitals and laboratories in Korea and abroad, I reviewed the analysis costs, operating model, expected profitability, and technical feasibility of the business model Inocras proposed, and reported the findings at the biweekly executive meeting.\nDuring that work, executives from Inocras — an existing customer — including the co-CEO and the CTO, visited to present their business direction and their plans for the AACR conference. Inocras saw AACR as an important business opportunity, and we discussed which parts of the preparation Nongshim Data System could support.\nFor Nongshim Data System, the collaboration was likewise a way to confirm the business potential of bio AI solutions and to draw on the response to the AACR on-site demo and session talk, along with the scale and operations of the US headquarters, in its new-business review. As the AI platform development collaboration moved forward, I was assigned with one colleague to the Inocras headquarters in San Diego for about a month."
      },
      task: {
        ko: "프로젝트의 주요 과제는 이노크라스가 제공한 1,342개 샘플의 분석 결과 파일을 AI 플랫폼에 적용하고, AACR 학회 세션 발표 및 현장 데모에서 활용할 수 있는 수준으로 개발하는 것이었습니다.\n사용자가 자연어 프롬프트를 입력하면 실제 분석 데이터를 바탕으로 원하는 정보를 조회하고, Waterfall Plot이나 Circos Plot 등의 시각화 결과와 분석 설명을 생성할 수 있어야 했습니다. 사전에 준비된 결과를 보여주는 것이 아니라, 현장에서 입력한 질문에 따라 필요한 데이터와 분석 기능을 선택하고 실행하는 것이 핵심이었습니다.\n이를 위해 분석 데이터와 LLM을 연결하고, 사용자 요청에 맞는 분석 코드 실행 및 결과 시각화 기능을 구현해야 했습니다. 또한 생성된 결과의 데이터 일치 여부와 바이오 도메인 관점의 적절성을 확인하고, 사용자가 별도의 코드 작성 없이 결과를 확인할 수 있도록 화면을 구성해야 했습니다.",
        en: "The main task was to apply the analysis result files for the 1,342 samples Inocras provided to the AI platform and develop it to a level usable in the AACR session talk and the on-site demo.\nWhen a user entered a natural-language prompt, the platform had to query the requested information from the real analysis data and generate visualizations such as waterfall plots or Circos plots together with an analytical explanation. The key was not to show prepared results, but to select and run the data and analysis functions each question required, from questions typed on site.\nThat meant connecting the analysis data to the LLM and implementing analysis-code execution and result visualization matching the user's request. It also meant verifying that the generated results matched the data and were sound from a bio-domain perspective, and building an interface where users could check results without writing any code."
      },
      action: {
        ko: "[AACR 데모용 AI 플랫폼 기획 및 개발]\n미국 현지에서는 AACR 학회 발표와 데모에 사용할 AI 플랫폼이 필요했지만, 이를 개발할 별도의 인력이 없는 상황이었습니다. 이에 분석 기능뿐 아니라 사용자가 직접 Query를 입력하고 결과를 확인할 수 있는 화면까지 함께 구성해야 했습니다.\n저는 1,342개 샘플의 분석 결과를 바탕으로 사용자가 Query를 입력하면 관련 데이터와 Plot, 분석 설명을 확인할 수 있는 화면 구성을 제안했습니다. 학회 현장에서 직접 시연하는 것이 목적이었기 때문에 미리 만들어 놓은 결과를 보여주기보다는, 입력된 Query에 따라 실제 분석이 실행되고 결과가 화면에 표시되도록 개발했습니다.\n[Claude Code Skills 및 SKILL.md 기반 실행 구조 설계]\n초기에는 AWS Bedrock을 통해 Claude Opus와 Sonnet을 활용했지만, 당시 모델만으로는 바이오 데이터를 정확하게 해석하거나 일관된 분석 결과를 생성하는 데 한계가 있었습니다. 특히 데이터 계산 과정에서 실행 조건이나 명령어를 구체적으로 지정하지 않으면 의도와 다른 결과가 나오는 경우가 있었습니다.\n학회 데모에서는 사용자가 어떤 Query를 입력하더라도 실제 데이터에 근거한 결과를 제공해야 했기 때문에, LLM이 매번 분석 방법과 코드를 결정하도록 하는 방식은 적합하지 않다고 판단했습니다. 이에 Claude Code Skills를 활용해 분석 기능을 분리하고, SKILL.md로 각 기능을 연결하는 구조를 제안했습니다.\n상위 SKILL.md를 Coordinator 역할로 사용해 각 Skill의 위치와 사용 조건을 정리했습니다. 예를 들어 Query에 Waterfall Plot이나 Circos Plot 관련 요청이 들어오면 해당 키워드를 트리거로 삼아 관련 Skill 문서를 참조하도록 했습니다. 바이오 관련 내용 검토에는 K-Dense를 활용하도록 연결했습니다.\n각 하위 폴더에도 Markdown 문서를 두어 필요한 입력 파일과 변수, 실행할 Python 스크립트의 위치를 안내했습니다. 이를 통해 Claude가 상위 문서를 참고해 필요한 Skill을 찾고, 하위 문서에 정의된 절차에 따라 작업하도록 구성했습니다.\n[Skills별 Python 분석 및 시각화 코드 구현]\nWaterfall Plot이나 Circos Plot처럼 정해진 계산 방식과 시각화 형식이 필요한 기능은 Python으로 미리 구현하고, 실행할 때 필요한 변수만 전달하도록 구성했습니다.\n각 Skill 폴더에는 실행 지침을 작성한 Markdown 문서와 Python 스크립트를 함께 배치했습니다. Markdown 문서에는 사용할 분석 파일과 입력 변수, 실행 방법을 정의했으며, 실제 데이터 계산과 Plot 생성은 Python 코드에서 처리하도록 했습니다. 사용자 Query가 들어오면 Claude는 관련 Skill을 찾아 필요한 입력 변수를 전달하고, Python 스크립트가 분석 결과와 Plot을 생성하는 방식이었습니다.\n이렇게 LLM에는 Query 해석과 기능 선택을 맡기고, 계산과 시각화는 기존 Python 코드에서 처리하도록 구분했습니다. 이를 통해 Query 표현에 따라 분석 코드가 달라지는 문제를 줄이고, 동일한 데이터와 조건에서 결과를 재현할 수 있도록 했습니다.\n[현장 요구사항 반영 및 데모 준비]\n개발 과정에서는 이노크라스 관계자들과 필요한 기능과 화면 구성을 논의하면서 수정 작업을 진행했습니다.\nAACR 학회 세션 발표와 현장 데모에서 사용자가 직접 Query를 입력하고, 생성된 Plot과 분석 설명을 확인할 수 있도록 기능을 연결했습니다. 또한 AWS 기반 실행 환경 도입에도 참여하며 분석 코드와 플랫폼 구동에 필요한 부분을 함께 검토했습니다.",
        en: "[Planning and building the AI platform for the AACR demo]\nOn site in the US, an AI platform was needed for the AACR talk and demo, but there was no separate engineer to build it. That meant putting together not only the analysis functions but also the screen where a user could enter a query themselves and see the result.\nBased on the analysis results of the 1,342 samples, I proposed a layout where a user enters a query and sees the related data, plots, and an analytical explanation. Because the point was to demonstrate it live at the conference, I built it so that the analysis actually ran against the query entered and the result appeared on screen, rather than showing pre-built results.\n[Designing the execution structure around Claude Code Skills and SKILL.md]\nAt first we used Claude Opus and Sonnet through AWS Bedrock, but the models of the time had limits in interpreting bio data accurately and producing consistent analysis results. In particular, when execution conditions or commands were not specified concretely, the calculation step sometimes produced results that differed from what was intended.\nSince the demo had to return results grounded in the real data no matter what query a user typed, I judged that letting the LLM decide the analysis method and the code every time was not suitable. I therefore proposed separating the analysis functions as Claude Code Skills and wiring them together through SKILL.md files.\nThe top-level SKILL.md served as a coordinator, listing where each skill lived and the conditions for using it. For example, when a query involved a waterfall plot or a Circos plot, those keywords acted as triggers to consult the matching skill document. For review of bio-related content, it pointed to K-Dense.\nEach sub-folder also carried a Markdown document describing the input files and variables required and the location of the Python script to run. With this, Claude consults the top-level document to find the skill it needs and then works through the procedure defined in the sub-document.\n[Implementing the Python analysis and visualization code per skill]\nFunctions with a fixed calculation method and visual format, such as waterfall plots and Circos plots, were implemented in Python in advance, so that only the variables needed at run time were passed in.\nEach skill folder holds both a Markdown document with the execution instructions and the Python script. The Markdown defines the analysis files to use, the input variables, and how to run it, while the actual data calculation and plot generation happen in the Python code. When a user query arrives, Claude finds the relevant skill and passes the required input variables, and the Python script produces the analysis result and the plot.\nThis divided the work: the LLM handles interpreting the query and choosing the function, while the existing Python code handles calculation and visualization. It reduced the problem of the analysis code changing with how a query was phrased, and made results reproducible for the same data and conditions.\n[Reflecting on-site requirements and preparing the demo]\nDuring development I discussed the required functions and screen layout with people at Inocras and made revisions accordingly.\nFor the AACR session talk and the on-site demo, I connected the features so that a user could enter a query directly and see the generated plot and analytical explanation. I also took part in introducing the AWS-based execution environment, reviewing what the analysis code and the platform needed in order to run."
      }
    },
    badge: { flag: "us", text: locale("미국 파견", "US assignment") },
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
      ko: "2026.04",
      en: "Apr. 2026"
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
        "1,342개 샘플의 분석 결과를 자연어 질문만으로 조회, 분석, 시각화하는 흐름을 AACR 세션 발표와 현장 데모에서 시연"
      ],
      en: [
        "Completed a demo within about a month for the AACR 2026 conference",
        "Demonstrated querying, analyzing, and visualizing the analysis results of 1,342 samples through natural-language questions alone, in the AACR session talk and the on-site demo"
      ]
    },
    gallery: [
      { ko: "AACR 학회 소개", en: "AACR conference introduction" },
      { ko: "데모 시연: 세션에서 사용할 WGS 코호트 데이터셋 선택", en: "Demo walkthrough: selecting the WGS cohort datasets for a session" },
      { ko: "데모 시연: HRD 상위 5개 샘플의 Circos plot 생성 과정과 이미지", en: "Demo walkthrough: generating Circos plots for the top 5 HRD samples, with the images produced" },
      { ko: "데모 시연: 고객의 요청사항 자동 plot화 및 실제 데이터 적용", en: "Demo walkthrough: automated plotting of the customer's request, applied to real data" },
      { ko: "AWS 아키텍처: 초기 구성도", en: "AWS architecture: initial design" },
      { ko: "AWS 아키텍처: 보안 및 운영 제안", en: "AWS architecture: security and operations proposal" }
    ],
    tools: [
      "Python",
      "AWS",
      "Docker",
      "LibreChat",
      "Claude Code Skills",
      "Bioinformatics"
    ]
  },
  {
    id: "spatial",
    story: {
      situation: {
        ko: "삼성바이오에피스에 제공할 공간전사체 분석 데이터와 메타데이터를 준비하는 과정에서, 연구원별로 분석 환경과 실행 방식이 달라 결과 생성 과정을 파악하기 어려운 문제가 있었습니다. 당시 바이오인포매틱스 전문 인력이 아닌 실험 연구원들이 각자의 PC에서 RStudio와 Jupyter를 활용해 분석하고 있었습니다. 연구원마다 사용하는 코드와 패키지, 실행 환경이 달랐으며, 분석 코드를 단계별로 실행하고 결과를 확인한 뒤 다음 작업을 진행하는 방식이었습니다. 이러한 분석 과정을 정리하고, 반복적으로 실행할 수 있도록 자동화하는 업무를 담당하게 되었습니다.",
        en: "While preparing the spatial transcriptomics data and metadata to be delivered to Samsung Bioepis, it was hard to follow how results had been produced, because each researcher had a different analysis environment and a different way of running things. At the time the analyses were being done by bench researchers rather than bioinformatics specialists, each using RStudio and Jupyter on their own PC. The code, packages, and runtime differed from researcher to researcher, and the pattern was to run the analysis code one step at a time, check the result, and then move on to the next. I took on the work of organizing that process and automating it so it could be run repeatedly."
      },
      task: {
        ko: "연구원들이 개별적으로 작성한 전처리 및 분석 코드를 수집하고, 각 코드의 입력 데이터와 출력 결과, 실행 순서를 확인해야 했습니다. 기존 분석 모듈의 실행 방식을 검토하고 최적화하면서, 각 단계의 의존성을 정의해 최종 데이터와 메타데이터를 생성할 수 있는 Workflow로 통합하는 것이 목표였습니다. 또한 CLI 사용에 익숙하지 않은 실험 연구원들도 분석할 데이터를 선택하고 Workflow를 실행할 수 있도록 해야 했으며, 분석 진행 상태를 확인할 수 있는 기능도 필요했습니다.",
        en: "I had to collect the preprocessing and analysis code each researcher had written, and establish the input data, the outputs, and the execution order for each piece. The goal was to review and optimize how the existing analysis modules ran, define the dependencies between stages, and consolidate them into a workflow that produced the final data and metadata. It also had to let bench researchers who were not comfortable with the CLI select the data to analyze and start the workflow, and they needed a way to see how far an analysis had progressed."
      },
      action: {
        ko: "[연구원별 분석 코드 수집 및 모듈 최적화]\n프로젝트에 참여한 연구원들과 미팅을 진행하고, 각자 사용하던 R과 Python 분석 코드와 실행 방법을 전달받았습니다. 수집한 코드를 검토하면서 필요한 패키지와 입력 데이터, 출력 파일 및 실행 순서를 파악했습니다. 이후 기존 분석 모듈의 실행 구조를 정리하고 모듈별 최적화 작업을 진행했습니다. 이를 바탕으로 전체 분석 Workflow의 구성 방안을 설계해 회의에서 공유했습니다.\n[Snakemake 기반 전처리 및 분석 Workflow 자동화]\n기존에 RStudio와 Jupyter에서 개별적으로 실행하던 코드를 기능별 모듈로 정리하고, Snakemake Rule을 작성해 각 단계의 실행 조건과 의존성을 정의했습니다. Visium QC, RCTD, Annotation, Malignant, Tumor Specificity, Coverage, CoExpression 등의 분석 단계와 PANGEA, scAtomic, scMalignantFinder 등 기존 분석 모듈을 Workflow로 구성했습니다. 각 단계에서 생성되는 결과 파일이 필요한 후속 작업의 입력으로 사용되도록 연결하고, 최종 산출물에 필요한 분석 작업들이 Snakemake를 통해 실행되도록 했습니다. 이를 통해 연구원이 중간 결과를 기다리며 코드를 하나씩 실행하던 방식을 자동화된 Workflow로 전환했습니다.\n[Streamlit 및 GPU 기반 Llama 연계 PoC]\nCLI 환경에서 분석 스크립트를 실행하는 데 어려움을 느끼는 연구원들을 위해 Streamlit 기반 실행 화면을 구현했습니다. 연구원이 분석할 데이터를 찾아 선택하면 사전에 정의된 분석 Workflow를 실행할 수 있도록 구성했으며, GPU 환경에서 구동하는 Llama 모델과의 연계도 PoC로 검증했습니다.\n[분석 진행 상태 모니터링]\n연구원들이 분석 진행 상황을 확인할 수 있도록 별도의 모니터링 화면을 구현했습니다. Workflow 실행 과정에서 생성되는 파일명을 확인해 분석 단계별 진행 상태를 표시하도록 했습니다. 이를 통해 연구원들이 CLI에 직접 접속하지 않고도 현재 분석이 어느 단계까지 진행됐는지 확인할 수 있도록 했습니다.",
        en: "[Collecting the analysis code from each researcher and optimizing the modules]\nI met with the researchers on the project and received the R and Python analysis code each of them used, along with how they ran it. Going through the code, I established the packages it needed, the input data, the output files, and the execution order. I then organized how the existing analysis modules ran and optimized each of them. On that basis I designed how the whole analysis workflow would be put together and shared it at a meeting.\n[Automating preprocessing and analysis as a Snakemake workflow]\nI reorganized the code that had been run individually in RStudio and Jupyter into modules by function, and wrote Snakemake rules defining the run conditions and dependencies for each stage. The workflow covered analysis stages including Visium QC, RCTD, annotation, malignant, tumor specificity, coverage, and co-expression, along with existing analysis modules such as PANGEA, scAtomic, and scMalignantFinder. The output files produced at each stage were wired in as the input of the follow-on work that needed them, so everything required for the final deliverable ran through Snakemake. This replaced the pattern of researchers waiting on intermediate results and running code one piece at a time with an automated workflow.\n[Streamlit front end and a GPU-based Llama PoC]\nFor researchers who found running analysis scripts from the CLI difficult, I built a Streamlit-based screen for launching them. A researcher can find and select the data to analyze and then run the predefined analysis workflow. I also validated, as a PoC, the integration with a Llama model running on GPU.\n[Monitoring analysis progress]\nI built a separate monitoring screen so researchers could check how an analysis was progressing. It reads the file names produced as the workflow runs and shows the progress through each analysis stage, so researchers can see how far an analysis has gone without connecting to the CLI themselves."
      }
    },
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
        "Simplified usage so that bench researchers can run analyses themselves",
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
    gallery: [
      { ko: "Streamlit 활용 LLM 파일 조회", en: "LLM-driven file lookup built with Streamlit" },
      { ko: "모니터링", en: "Monitoring" },
      { ko: "샘플 단계 확인", en: "Per-sample stage tracking" },
      // 4번은 Jupyter + RStudio 화면을 합친 "초기 작업 과정" 이미지 자리 (4.png 추가 예정)
      { ko: "초기 작업 과정: Jupyter와 RStudio에서 개별 수행", en: "Initial way of working: analyses run individually in Jupyter and RStudio" },
      { ko: "파이프라인화: singlecell 전처리 (DAG)", en: "Converted to a pipeline: single-cell preprocessing (DAG)" },
      { ko: "파이프라인화: visium 후처리 (DAG)", en: "Converted to a pipeline: Visium post-processing (DAG)" }
    ],
    tools: [
      "Python",
      "R",
      "Bash",
      "Linux",
      "Snakemake",
      "Singularity",
      "Docker",
      "Streamlit",
      "Ollama"
    ]
  },
  {
    id: "liquid-ldt",
    featured: true,
    story: {
      situation: {
        ko: "액체생검은 혈액에서 암 변이를 찾는 검사입니다. 조직을 떼어내는 검사와 달리 혈액에 아주 적게 섞여 있는 변이를 잡아내야 해서, 분석이 맞게 돌아가고 있는지 확인할 기준이 필요했습니다. 회사는 이 검사를 의료기관에 제공하는 LDT 분석 시스템으로 만들려 했고, 저는 분석 파이프라인 개발과 성능 검증을 맡았습니다.",
        en: "A liquid biopsy looks for cancer variants in blood. Unlike a tissue biopsy it has to pick up variants present in very small amounts, so we needed a reference point for confirming the analysis was working correctly. The company set out to turn the test into an LDT analysis system for medical institutions, and I took on the pipeline development and the performance validation."
      },
      task: {
        ko: "기존 레거시 액체생검 파이프라인의 데이터를 검수하면서, 데이터의 세 번째 base 구간에서 에러율이 높게 나오는 것을 확인했습니다. UMI 쪽도 조합 수가 적어 정확도를 더 끌어올리기 어려운 상태였습니다. 정확도를 높일 새로운 방법론이 필요하다고 판단해, 레거시 파이프라인을 걷어내고 신규 파이프라인으로 전환하면서 개발에 착수했습니다.",
        en: "Reviewing the data from the legacy liquid biopsy pipeline, I found a high error rate at the third base position. The UMI side also had too few combinations to push accuracy any further. Judging that a new methodology was needed to raise accuracy, I began development by stripping out the legacy pipeline and moving to a new one."
      },
      action: {
        ko: "UMI 기반 변이 분석 파이프라인을 개발하고, 분석 모듈을 컨테이너로 묶어 Snakemake 워크플로우로 자동화했습니다. raw 데이터부터 결과까지 단계별로 검증하면서 레거시 파이프라인의 결과 데이터 문제를 찾아 고쳤습니다.\n성능 검증은 표준물질을 구입해 진행했습니다. 변이가 어느 수준까지 검출되는지 직접 측정해 LOD를 확인하고, 같은 조건에서 경쟁 제품과 비교했습니다. 이 결과는 범부처전주기의료기기연구개발사업 과제의 핵심 요소로 제공했습니다.\n* 사업화와 범부처 과제에 관련된 내용이어서 세부 사항은 축약했습니다.",
        en: "Developed a UMI-based variant-analysis pipeline, packaged the analysis modules as containers, and automated them as a Snakemake workflow. Verifying each stage from the raw data through to the results surfaced problems in the legacy pipeline's output, which I then fixed.\nPerformance validation was done with purchased reference material: I measured directly how far down variants could still be detected to establish the limit of detection, and compared that against competing products under the same conditions. Those results went into the Korea Medical Device Development Fund project as a core component.\n* Details are abbreviated because this work relates to commercialization and to a national multi-ministry R&D project."
      }
    },
    abbr: locale("LDT(Laboratory Developed Test, 실험실 자체개발 검사), UMI(Unique Molecular Identifier, 고유 분자 식별자), LOD(Limit of Detection, 검출한계)", "LDT (Laboratory Developed Test), UMI (Unique Molecular Identifier), LOD (Limit of Detection)"),
    title: {
      ko: "액체생검 LDT 분석 플랫폼 개발 및 성능 검증",
      en: "Liquid biopsy LDT analysis platform development and performance validation"
    },
    client: {
      ko: "국내 상급종합병원 / 바이오 임상 진단 분석",
      en: "Domestic tertiary hospitals / Bio clinical diagnostic analysis"
    },
    period: {
      ko: "2024.11 ~ 2025.06",
      en: "Nov. 2024 – Jun. 2025"
    },
    overview: {
      ko: "UMI 기반 액체생검 변이 분석 파이프라인을 구축하고, 표준물질로 검출한계(LOD)를 직접 측정해 경쟁 제품 대비 성능을 개선했습니다. 범부처 국책과제의 핵심 요소로 기여했습니다.",
      en: "Built a UMI-based liquid biopsy variant-analysis pipeline and measured its limit of detection directly with reference materials, improving performance against competing products. Contributed a core component to a national multi-ministry R&D project."
    },
    role: {
      ko: [
        "UMI 기반 액체생검 변이 분석 파이프라인 개발 (합의 서열 생성, 변이 검출, 주석)",
        "분석 모듈 컨테이너화와 Snakemake 기반 워크플로우 자동화",
        "raw 데이터와 분석 결과 검증, 레거시 파이프라인의 결과 데이터 문제 발견 및 개선",
        "표준물질 구입 및 실제 LOD 측정 수행",
        "경쟁 제품 대비 분석 성능 비교 및 개선",
        "분석 진행 상황 모니터링 및 서버 CAPA 최적화",
        "의료기관 대상 LDT 분석 시스템 배포 및 납품 지원",
        "범부처전주기의료기기연구개발사업 ‘전립선암의 맞춤형 치료를 위한 전주기 진단용 액체생검 통합 플랫폼 개발’ 과제의 핵심 요소 기여"
      ],
      en: [
        "Developed a UMI-based liquid biopsy variant-analysis pipeline (consensus generation, variant calling, annotation)",
        "Containerized analysis modules and automated workflows with Snakemake",
        "Verified raw data and analysis results; found and fixed result-data problems in the legacy pipeline",
        "Purchased reference materials and measured the actual limit of detection",
        "Compared and improved analysis performance against competing products",
        "Monitored analysis progress and optimized server capacity",
        "Supported deployment and delivery of the LDT analysis system to medical institutions",
        "Contributed a core component to the Korea Medical Device Development Fund project ‘Development of an integrated full-cycle diagnostic liquid biopsy platform for personalized treatment of prostate cancer’"
      ]
    },
    outcome: {
      ko: [
        "표준물질 기반 LOD 측정으로 분석 성능을 실측 검증",
        "경쟁 제품 대비 분석 성능 개선 확인",
        "범부처전주기의료기기연구개발사업 과제의 핵심 요소로 기여",
        "분석 실행 환경 표준화 및 반복 작업 자동화",
        "의료기관 대상 분석 시스템 구축, 납품과 운영 개선 지원"
      ],
      en: [
        "Validated analysis performance by measuring the limit of detection with reference materials",
        "Confirmed improved analysis performance against competing products",
        "Contributed a core component to the Korea Medical Device Development Fund project",
        "Standardized the execution environment and automated repetitive work",
        "Supported building, delivering, and improving operations of the analysis system for medical institutions"
      ]
    },
    gallery: [
      { ko: "납품용 일체형 파이프라인을 모듈로 나누고 모듈별 CPU/Memory 최적화", en: "Splitting the all-in-one delivery pipeline into modules and optimizing CPU and memory per module" },
      { ko: "Snakemake 워크플로우 실행 로그", en: "Snakemake workflow run log" },
      { ko: "Snakemake module DAG 구조", en: "Snakemake module DAG structure" }
    ],
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
    story: {
      situation: {
        ko: "자동 배포 체계를 만든 뒤, 실제 병원 현장에 새 버전을 올리는 단계였습니다. 레거시가 설치되어 있었지만 활용이 저조했던 병원부터 교체해 나갔습니다. 현장은 폐쇄망이었고 병원마다 장비와 내부 절차, 승인 방식이 달랐습니다. 레거시는 DB를 볼 화면이 없어 DBeaver나 리눅스로 직접 컬럼을 확인해야 했고, 오류가 나도 로그가 남지 않는 경우가 있었습니다.\n분석 파이프라인이 병원 서버 스펙에 맞지 않고 최적화되지 않아 문제가 계속 발생했습니다. 여러 병원에서 컴플레인이 들어왔고, 분석이 중간에 죽으면 실무자가 직접 가서 DB의 run 코드를 수정하고 분석을 모두 지운 뒤 다시 돌리는 일이 반복되었습니다. 이에 사내 사수와 서버 관리자와 함께 개선 방향을 모색했습니다.",
        en: "With the automated deployment in place, the next stage was rolling the new version out at the hospitals themselves. Legacy installs were already running, and I started with the hospitals where adoption had been low. The sites ran on a closed network, and equipment, internal procedures, and approval routes differed from hospital to hospital. The legacy system had no screen for inspecting the database, so columns had to be checked directly through DBeaver or Linux, and errors sometimes left no log at all.\nProblems kept recurring because the analysis pipeline did not fit the specifications of the hospital servers and had not been optimized. Complaints came in from several hospitals, and whenever a run died midway an operator had to go on site, edit the run code in the database, delete the whole analysis, and start it over. I began looking for a way to improve this together with my senior colleague and the server administrator."
      },
      task: {
        ko: "배포 방식을 정하고, 정해진 날 정해진 시간에 작업을 끝내는 것이 과제였습니다. 기존 레거시와 동등한 결과가 나오는지 데이터와 성능을 평가해야 했고, 오류가 발생하지 않는 상태에서 병원의 LIMS와 EMR 연동까지 마쳐야 했습니다.\n한 달에 적게는 20번, 많게는 30번 병원을 방문했습니다. 하루에 많게는 세 곳, 보통 두 곳을 다니며 장비 확인, 병원 내부 절차와 승인 확인, 프로그램 설치, 시스템 연동, 네트워크 마운팅을 진행했습니다. 사용자가 병리과 병리사와 병리의였기 때문에 요구사항도 직접 듣고 판단했습니다.",
        en: "The task was to settle on a deployment approach and finish the work on a fixed date, within a fixed window. The data and the performance had to be evaluated to show the new version matched the legacy system, and the integration with the hospital's LIMS and EMR had to be completed with no errors along the way.\nI visited hospitals 20 to 30 times a month — up to three sites in a day, usually two — checking equipment, confirming each hospital's internal procedures and approvals, installing the software, integrating systems, and mounting network storage. The users were pathologists and pathology technologists, so I took their requirements directly and decided on them myself."
      },
      action: {
        ko: "[레거시 장애 분석 및 파이프라인 개선 방향 수립]\n기존 분석 파이프라인은 오류가 발생해도 로그가 제대로 남지 않아 원인을 확인하기 어려웠습니다. 분석이 중단되면 현장에서 DB의 Run 상태를 수정하고 기존 분석 결과를 정리한 뒤 다시 실행해야 하는 경우도 있었습니다.\n특히 서울성모병원에서는 분석을 세 번 실행하면 한 번 정도 실패하는 문제가 반복됐습니다. 원인을 확인한 결과, 기존 2~5GB 수준이던 Raw Data가 실험 건수에 따라 7~10GB까지 증가하면서 서버 메모리가 부족해지는 문제였습니다.\n기존 스크립트를 부분적으로 수정하는 방식으로는 대응에 한계가 있다고 판단했습니다. 이에 사수와 서버 관리자와 함께 파이프라인의 모듈화, 실행 환경 분리, 형상관리 및 워크플로 도구 도입을 검토했습니다.\n[Snakemake 및 Singularity 기반 파이프라인 재구성]\n파이프라인 개선을 위해 Snakemake와 Nextflow 등을 검토했고, 기존에 Snakemake를 사용해 본 서버 관리자와 사수의 의견을 참고해 Snakemake를 선택했습니다.\n레거시 분석 스크립트를 기능별 모듈로 분리하고, Singularity SIF 파일을 활용해 각 모듈의 실행 환경을 구성했습니다. 이후 Snakemake Rule로 모듈 간 실행 순서와 의존성을 정의하고, 전체 분석 과정이 하나의 워크플로로 동작하도록 재구성했습니다. 또한 Daemon과 Logging을 구성해 분석 실행 상태와 오류 기록을 확인할 수 있도록 개선했습니다.\n[병원별 분석 파이프라인 배포 및 결과 검증]\n병원마다 서버 사양과 폐쇄망 환경이 달랐기 때문에 설치 과정과 실행 설정을 현장 환경에 맞춰 진행해야 했습니다. 기존에 개발한 자동 배포 스크립트를 활용해 Singularity SIF 파일과 Snakemake Rule, 분석에 필요한 설정 파일을 배포했습니다. 데이터 접근을 위한 네트워크 마운팅과 실행 환경 설정을 진행하고, Crontab을 등록해 정해진 일정에 따라 필요한 작업이 실행되도록 구성했습니다.\n배포 후에는 기존 레거시 파이프라인과 신규 파이프라인의 분석 결과를 비교해 동일성을 검증했습니다. 분석이 정상적으로 완료되는지 확인한 뒤 현장 운영으로 전환했습니다. 이후 오전마다 분석 실행 상태와 오류 발생 여부를 점검하며 운영을 안정화했습니다.\n[병리과 사용자 요구사항 반영]\n병원 현장을 방문하면서 병리사와 병리의에게 시스템 사용 과정의 불편 사항과 개선 요청을 직접 전달받았습니다. 수집한 요구사항은 신규 버전 배포 시 함께 반영할 수 있도록 정리했습니다. 대표적인 사례가 IGV 조회 기능이었습니다. 기존에는 분석 결과를 스냅샷 이미지로 제공하고 있어 변이 위치와 주변 서열을 자세히 확인하기 어렵다는 의견이 있었습니다.\n이 부분을 개선하기 위해 분석 파이프라인에 오픈소스 IGV-Report 모듈을 추가했습니다. 분석 과정에서 IGV-Report를 통해 HTML 결과물을 생성하고, 생성된 파일을 LIMS와 연동해 사용자가 직접 조회할 수 있도록 구성했습니다. 이를 통해 기존의 정적인 스냅샷 이미지 대신 HTML 기반의 IGV 결과를 확인할 수 있도록 개선했습니다.",
        en: "[Analyzing legacy failures and setting the direction for the pipeline]\nThe existing analysis pipeline did not leave proper logs when something went wrong, which made causes hard to establish. When a run stopped, there were cases where someone had to go on site, correct the run status in the database, clear out the previous results, and start it again.\nAt Seoul St. Mary's Hospital in particular, roughly one run in three kept failing. On investigation, raw data that had been 2–5 GB was growing to 7–10 GB depending on the number of experiments, leaving the server short of memory.\nPatching the existing scripts piece by piece was clearly not going to keep up. Together with my senior colleague and the server administrator, I looked into modularizing the pipeline, isolating its runtime, and adopting configuration management and a workflow tool.\n[Rebuilding the pipeline on Snakemake and Singularity]\nI reviewed Snakemake, Nextflow, and others, and chose Snakemake on the advice of the server administrator and my senior colleague, who had both used it before.\nI split the legacy analysis scripts into modules by function and built the runtime for each module using Singularity SIF images. Snakemake rules then defined the execution order and the dependencies between modules, so the whole analysis ran as a single workflow. I also configured a daemon and logging so that run status and error records could be inspected.\n[Deploying the pipeline per hospital and verifying results]\nServer specifications and closed-network conditions differed from hospital to hospital, so the installation steps and runtime settings had to be matched to each site. Using the automated deployment script built earlier, I deployed the Singularity SIF images, the Snakemake rules, and the configuration files the analysis required. I set up the network mounting for data access and the runtime configuration, and registered Crontab entries so the necessary jobs ran on schedule.\nAfter deployment, I compared the results of the legacy pipeline and the new one to verify they matched. Once runs were completing normally, the site switched over to the new pipeline. From then on I checked run status and errors every morning until operations had settled.\n[Acting on requirements from pathology users]\nOn site visits, pathology technologists and pathologists told me directly about friction in using the system and what they wanted improved. I collected those requirements so they could be folded into the next version release. The main example was IGV viewing. Results had been provided as snapshot images, and users said it was hard to examine variant positions and the surrounding sequence in any detail.\nTo address that, I added the open-source IGV-Report module to the analysis pipeline. The pipeline generates an HTML output through IGV-Report, and the generated file is linked into the LIMS so users can open it themselves. This replaced the static snapshot images with HTML-based IGV results."
      }
    },
    title: {
      ko: "국내 상급종합병원 분석 시스템 구축 (파이프라인 배포 및 운영)",
      en: "Tertiary hospital analysis system build (pipeline deployment and operation)"
    },
    client: {
      ko: "국내 상급종합병원 / 바이오 임상 진단 분석",
      en: "Domestic tertiary hospital / Bio clinical diagnostic analysis"
    },
    period: {
      ko: "2023.06 ~ 2023.11",
      en: "Jun. – Nov. 2023"
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
        "현장 모니터링 및 장애 대응",
        "병리과 사용자 요구사항 반영: IGV-Report 모듈화로 스냅샷 이미지를 HTML 조회로 전환",
        "분석 실패 원인 분석: raw data 증가에 따른 메모리 부족 확인 및 파이프라인 최적화 방향 도출"
      ],
      en: [
        "Deployed the analysis system to per-hospital on-premise and air-gapped environments",
        "Modularized legacy scripts and standardized the execution environment",
        "Verified result identity and stabilized operations",
        "Configured daemons and logging and performed DB migration",
        "On-site monitoring and incident response",
        "Acted on pathology users' requirements: packaged IGV-Report as a module, moving from snapshot images to HTML viewing",
        "Diagnosed analysis failures as memory exhaustion from growing raw data, and defined the pipeline optimization direction"
      ]
    },
    outcome: {
      ko: [
        "제한된 네트워크 환경에 맞춘 시스템 구축 및 운영",
        "Daemon 및 Logging 구성으로 오류 발생 시 기록이 남도록 개선",
        "사용자 요구를 반영한 IGV-Report 조회 기능 도입",
        "분석 실패의 원인을 메모리 부족으로 규명하고, Module 분리와 Snakemake 전환으로 파이프라인을 전면 개편해 배포 완료"
      ],
      en: [
        "Built and operated the system under restricted network conditions",
        "Configured a daemon and logging so that failures leave a record",
        "Introduced IGV-Report viewing in response to user requests",
        "Traced failed runs to memory exhaustion and reworked the pipeline end to end — splitting it into modules and moving it to Snakemake — through to deployment"
      ]
    },
    gallery: [
      { ko: "새로운 배포 체계 확립", en: "New deployment structure established" },
      { ko: "현장 Node의 동시 분석 시 메모리 부족", en: "Memory running short when analyses ran concurrently on the on-site nodes" },
      { ko: "기존 분석에서 Module을 분리한 이유", en: "Why the modules were separated out of the original analysis" }
    ],
    tools: [
      "Python",
      "Linux",
      "Crontab",
      "DBeaver",
      "Panoptes",
      "Snakemake",
      "Miniconda",
      "MariaDB",
      "SGE",
      "Singularity",
      "On-premise",
      "Air-gapped"
    ]
  },
  {
    id: "lims",
    abbr: locale("LIMS(Laboratory Information Management System, 실험실정보관리시스템)", "LIMS (Laboratory Information Management System)"),
    story: {
      situation: {
        ko: "여러 상급종합병원에 레거시 버전의 LIMS가 이미 설치되어 운영되고 있었습니다. 회사의 주력이 분석 파이프라인이었던 만큼 파이프라인 수정이 잦았고, 수정한 뒤 LIMS의 DB나 웹 화면에서 데이터가 보이지 않는 문제가 반복되었습니다. 병원 측에서 IP가 변경되어 서버가 뜨지 않는 사고도 계속 있었습니다.\n문제는 고치기 전 단계에 있었습니다. 병원마다 폴더 구성과 저장 경로가 달랐고 업데이트 기록도 남아 있지 않아, 무엇이 어디에 있는지부터 찾아야 했습니다. 구조가 사내 개발 버전과 크게 달라 컨테이너 분리나 폴더 체계가 없었고, 전면 교체를 하려면 데이터베이스까지 변경해야 하는 규모였습니다.\n유지보수 한 건을 처리하는 데도 웹과 DB, 분석 파이프라인, 네트워크, 리눅스까지 여러 영역을 함께 다뤄야 했습니다. 증상만 보고는 어느 영역에서 비롯된 문제인지 알 수 없어, 원인을 가려내는 일부터 시작해야 했기 때문입니다. 게다가 현장은 외부망이 차단되어 참고 자료나 코드를 찾아볼 수 없었습니다. 로그를 보고 증상을 좁힌 뒤, 막히면 화장실이나 병원 복도로 나가 휴대폰으로 해결 방법을 찾아보고 다시 들어와 적용하는 식으로 작업했습니다. 배포와 테스트를 합쳐 약 7일이 걸렸습니다.\n기존에는 담당 파트가 나뉘어 있었지만 이 업무를 맡았던 전임자들이 연이어 퇴사한 상황이어서, 인계받을 자료 없이 전체를 혼자 맡게 되었습니다.",
        en: "Legacy versions of the LIMS were already installed and running at several tertiary hospitals. Because the company's main product was the analysis pipeline, the pipeline changed often, and after each change data would stop appearing in the LIMS database or web screens. Servers also kept failing to come up because the hospital had changed its IP addresses.\nThe real problem came before the fix. Folder layouts and storage paths differed from hospital to hospital, and no update history had been kept, so the first task was always finding what was where. The structure differed substantially from the version we were developing in-house — no container separation, no folder conventions — and replacing it outright would have meant changing the database as well.\nA single maintenance item could span the web layer, the database, the analysis pipeline, the network, and Linux. The symptom alone never showed which layer it came from, so every fix started with isolating the cause. On top of that, the sites had no external network, so there was no way to look up reference material or code. I would narrow the symptom down from the logs and, when stuck, step out to a restroom or a hospital corridor to look up a solution on my phone, then come back in and apply it. Deployment and testing together took about seven days.\nThe work had previously been split among several people, but the predecessors who handled it had left one after another, so I ended up taking on the whole of it alone, with nothing handed over."
      },
      task: {
        ko: "유지보수에 들어가는 맨먼스가 계속 늘어나는 상황이었습니다. 병원 수가 적지 않은데 그때마다 현장을 찾아가 같은 작업을 반복해야 했고, 이런 방식으로 유지보수를 계속하면 정작 사내 개발에 쓸 시간이 남지 않겠다고 판단했습니다. 그래서 설치와 운영 방식을 바꾸는 방향을 직접 제안했습니다.\n앞으로도 같은 시스템을 여러 병원에 배포해야 하는 상황이었기 때문에, 병원마다 달라지는 값만 교체해 같은 절차를 반복할 수 있어야 했습니다. 외부망이 없는 환경에서도 동작해야 했고, 담당자가 바뀌어도 같은 방식으로 설치할 수 있도록 절차를 문서로 남길 필요가 있었습니다.",
        en: "The man-months going into maintenance kept growing. There were a fair number of hospitals, and each one meant travelling to the site to repeat the same work; I judged that keeping maintenance on this footing would leave no time for the in-house development we needed to do. So I proposed changing how the system was installed and operated.\nThe same system would have to be deployed to more hospitals, so the procedure had to be repeatable by swapping only the values that differed per site. It had to work where there was no external network, and it had to be written down so that a different engineer could install the system the same way."
      },
      action: {
        ko: "[컨테이너로 묶어 한 번에 설치]\nTomcat, MariaDB, OZ Report, Shiny를 Docker 컨테이너로 구성하고 Docker 네트워크로 묶어, DB와 라이선스, 애플리케이션을 한 번에 설치하도록 했습니다. 병원의 OS와 기존에 설치된 라이브러리에 영향받지 않게 되었고, On-premise와 Air-gapped 환경 모두에 대응하는 절차를 정리했습니다. 병원에서 이미 쓰고 있는 포트와 겹치지 않도록, 설치할 때 포트를 지정할 수 있게 했습니다.\n[폴더 트리와 마운트 경로 통일]\n병원마다 다르던 폴더 구성과 저장 경로를 하나의 구조로 통일하고 마운트 경로를 맞췄습니다. 어느 병원이든 같은 위치를 보면 되므로, 장애가 생겼을 때 무엇이 어디에 있는지 찾는 작업이 없어졌습니다.\n[검증할 수 없는 환경은 단계를 나눠 대응]\n검증은 AWS에 환경을 만들어 설치 과정을 처음부터 끝까지 돌려 보는 방식으로 진행했습니다. 사내에 남는 PC를 활용해, 인터넷을 끊은 상태에서도 Docker 이미지나 패키지를 내려받지 않고 설치가 끝나는지 함께 확인했습니다. 다만 병원과 완전히 같은 환경을 사내에서 재현할 수는 없었습니다.\n그래서 첫 버전은 설치를 여섯 단계로 나눠 하나씩 골라 실행하는 선택형으로 만들었습니다. 검증하지 못한 환경에서 중간에 문제가 생기면 그 단계에서 멈추고 원인을 확인한 뒤 이어갈 수 있도록 한 것입니다.\n첫 병원 설치를 마치고 각 단계가 실제 환경에서 동작하는 것을 확인한 뒤, 원라인 설치로 합쳤습니다. 스크립트가 실행 환경을 먼저 확인하고, CentOS면 firewalld, Ubuntu면 ufw로 분기해 방화벽과 포트 설정을 스스로 처리하도록 했습니다. 1번, 2번을 차례로 입력하던 작업이 명령 한 줄로 끝나게 되었습니다.\n[병원별 값은 폴더 이름별로 구분하며, 반입은 tar.gz 파일 하나로 구성]\n병원마다 달라지는 부분은 폴더 구조로 분리했습니다. 병원별 디렉터리를 두고 그 안에 DB dump와 라이선스, 리포트 파일을 나눠 담았기 때문에, 설치할 때 해당 병원 디렉터리만 지정하면 같은 스크립트를 그대로 재사용할 수 있었습니다. 여기에 Docker 이미지까지 함께 담아 두어, 외부망이 없어 이미지를 내려받을 수 없는 병원에서도 같은 방식으로 설치할 수 있었습니다.\n결과적으로 현장 작업은 이렇게 정리되었습니다. 사전에 Docker 설치 여부를 확인하고 없으면 설치를 요청하고, IP와 포트를 미리 받아 둡니다. 그 뒤로는 압축 파일 하나를 들고 가 풀고 실행하면 설치가 끝났습니다. 설치마다 파일을 직접 고치던 작업이 없어졌습니다.\n[SOP에 장애 유형과 해결 방법 기록]\n구축 및 실행 방법과 설치에 필요한 폴더 구성을 SOP로 정리했습니다. 더해서 현장에서 겪은 장애를 유형별로 적어 두었습니다. 증상만 보고는 IP 문제인지, 라이선스 문제인지, 웹 쪽 문제인지, 데이터 문제인지 알 수 없었기 때문에, 무엇을 먼저 확인하면 되는지와 각 경우의 해결 방법을 겪은 대로 기록했습니다. 다른 담당자도 같은 절차로 설치하고, 같은 순서로 원인을 좁혀 해결할 수 있게 되었습니다.",
        en: "[Bundling into containers for a single install]\nPackaged Tomcat, MariaDB, OZ Report, and Shiny as Docker containers and tied them together on a Docker network so the database, license, and application all installed in one pass. The system no longer depended on the hospital's OS or the libraries already installed there, and the procedure covered both on-premise and air-gapped sites. Ports could be assigned at install time so they would not collide with ports the hospital was already using.\n[Unifying folder trees and mount paths]\nConsolidated the folder layouts and storage paths that had differed per hospital into one structure and aligned the mount paths. Because every hospital now looked the same, troubleshooting no longer began with hunting for what was where.\n[Splitting into steps for an environment I could not replicate]\nValidation was done by building an environment on AWS and running the installation through it end to end. Using a spare office PC, I also checked that with the internet disconnected the install still finished without pulling down any Docker images or packages. Even so, the hospital environment could not be reproduced in full in-house.\nFor that reason the first version split the installation into six steps that were selected and run one at a time. If something broke partway through on an environment I had not been able to test, I could stop at that step, find the cause, and then carry on.\nAfter completing the first hospital and confirming each step worked on the real environment, I consolidated it into a one-line install. The script checked the runtime environment first and branched — firewalld on CentOS, ufw on Ubuntu — handling the firewall and port configuration itself. What had been typing option 1, then option 2, became a single command.\n[Per-hospital values separated by folder name, delivery as a single tar.gz]\nWhatever varied by hospital was separated out in the folder structure: a directory per site holding its DB dump, license, and report files, so installation only had to point at the right one and the same script was reused as-is. The Docker images were bundled in as well, so the same approach worked at hospitals with no external network, where images could not be pulled.\nThat left the on-site work looking like this: check in advance whether Docker is installed and request it if not, and get the IP and port ahead of time. After that, bring one archive, extract it, and run it — the install was done. No more editing files by hand for every install.\n[Recording failure types and their fixes in the SOP]\nWrote the build-and-run procedure and the folder layout required for installation as an SOP. On top of that, I recorded the failures encountered on site by type. A symptom alone never showed whether the cause lay in the IP, the license, the web layer, or the data, so I wrote down — from experience — what to check first and how each case had been resolved. Another engineer could then install the system the same way and work through causes in the same order."
      }
    },
    title: {
      ko: "LIMS System Docker 기반 자동 배포 시스템 구축 (웹 플랫폼 배포 및 운영)",
      en: "LIMS System Docker-based automated deployment system (web platform deployment and operation)"
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
      ko: "병원마다 제각각이던 설치와 운영 방식을 하나의 자동 배포 체계로 만들어 단독으로 구축하고 현장에 적용했습니다. 수동으로 진행하던 설치가 명령 한 줄로 끝나면서, 약 7일 걸리던 배포와 테스트가 30~40분으로 줄었습니다.",
      en: "Independently built an automated deployment system that replaced installation and operating practices which had differed from hospital to hospital, and rolled it out on site. What had been a manual installation came down to a single command, cutting deployment and testing from about seven days to 30–40 minutes."
    },
    role: {
      ko: [
        "병원별 설치 환경(CentOS, Ubuntu)에 대응하는 자동 배포 스크립트를 단독으로 설계 및 개발",
        "정보처의 열린 포트 확인, 라이선스 파일 교체, DB dump 생성, WAR 파일 교체 등 수동으로 진행하던 설치 작업을 스크립트로 자동화하고 원라인 설치로 통합",
        "Docker 컨테이너(Tomcat, MariaDB, OZ Report, Shiny)로 애플리케이션 실행 환경을 구성해 병원별 환경 차이를 최소화",
        "On-premise 및 Air-gapped 환경에 대응하는 설치 절차 구성",
        "설치 SOP 작성: 구축 및 실행 방법, 설치에 필요한 폴더 구성 정리"
      ],
      en: [
        "Independently designed and developed automated deployment scripts for each hospital environment (CentOS, Ubuntu)",
        "Automated the installation work that had been done by hand — checking which ports the hospital IT department had opened, replacing the license file, creating the DB dump, replacing the WAR file — and consolidated it into a one-line install",
        "Packaged the application as Docker containers (Tomcat, MariaDB, OZ Report, Shiny) to minimize differences between hospital environments",
        "Defined installation procedures for on-premise and air-gapped sites",
        "Wrote the installation SOP: build-and-run procedure and the folder layout required for installation"
      ]
    },
    outcome: {
      ko: [
        "기존 약 7일 소요 배포 및 테스트 작업을 30~40분으로 단축",
        "병원마다 달랐던 설치와 운영 방식을 하나의 자동 배포 체계로 통일",
        "병원별 폴더 구성과 마운트 경로를 통일해 장애 대응 시 경로를 찾는 작업 제거",
        "장애 유형(IP, 라이선스, 웹, 데이터)별 확인 순서와 해결 방법을 SOP에 기록해 장애 대응 방식 표준화",
        "설치 환경 차이로 인한 반복 작업 감소",
        "구축 및 실행 SOP 문서화로 설치 절차 표준화"
      ],
      en: [
        "Reduced deployment and testing from about 7 days to 30–40 minutes",
        "Unified installation and operating practices that had differed per hospital into a single automated deployment system",
        "Unified folder layouts and mount paths across hospitals, removing the need to hunt for paths during incidents",
        "Standardized incident response by recording, per failure type (IP, license, web, data), what to check and how it had been fixed",
        "Reduced repeated work caused by installation-environment differences",
        "Standardized the installation procedure by documenting it in a build-and-run SOP"
      ]
    },
    gallery: [
      { ko: "초기 설치 화면 (단계별 선택형)", en: "Initial installer screen (step-by-step menu)" },
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
    story: {
      situation: {
        ko: "당시 회사에서는 여러 부서가 하나의 분석 서버를 공유하고 있었으며, 부서별로 서버를 사용할 수 있는 날짜가 정해져 있었습니다. 이 때문에 온프레미스 서버에서 일주일에 처리할 수 있는 분석은 최대 10~12건 정도였습니다.\n그러던 중 마케팅과 영업 부서에서 200건 이상의 신규 분석 계약이 가능하다는 이야기가 나왔습니다. 수주 물량은 주 100~300건 수준이어서 기존 서버의 처리 한계를 크게 넘었고, 분석 일정도 지연될 수 있어 AWS로 분석 환경을 전환하기로 했습니다. 저는 신입으로 입사한 직후 해당 프로젝트에 팀원으로 참여했습니다.",
        en: "At the time several departments shared a single analysis server, with set days for each department to use it. That limited the on-premise server to roughly 10 to 12 analyses a week.\nThen marketing and sales reported that more than 200 new analysis contracts were possible. The contracted volume ran at 100 to 300 analyses a week, well past what the existing server could take, and schedules were likely to slip, so we decided to move the analysis environment to AWS. I joined the project as a team member right after starting as a new graduate."
      },
      task: {
        ko: "기존 사내 서버에서 운영하던 WGS, WES, WTS 연구용 분석 파이프라인을 AWS로 이전하고, 증가하는 분석 물량을 처리할 수 있는 환경을 구축해야 했습니다.\n당시 여러 부서에서 분석 파이프라인을 개별적으로 운영하고 있었기 때문에, 이를 분석 유형별로 대표 파이프라인 하나씩으로 정리해야 했습니다. 기존 분석 모듈은 Docker 이미지로 제작하고, 여러 분석 작업을 병렬로 실행할 수 있도록 워크플로를 구축하는 것도 필요했습니다.\n또한 부서별로 분산된 분석 데이터를 정리하고, 장기 보관할 데이터를 구분해야 했습니다. 특히 AWS 전환 이후 스토리지 비용이 증가할 수 있어, S3 Glacier를 활용한 장기 보관과 미사용 리소스 정리도 주요 과제였습니다.",
        en: "The WGS, WES, and WTS research analysis pipelines running on the in-house server had to be moved to AWS, with an environment capable of handling the growing volume.\nBecause several departments were each running their own pipelines, these had to be consolidated into one representative pipeline per analysis type. The existing analysis modules needed to be built as Docker images, and a workflow had to be in place to run multiple analyses in parallel.\nAnalysis data scattered across departments also had to be organized, separating what was still in use from what should go to long-term storage. Storage costs could rise after the move to AWS, so long-term archiving with S3 Glacier and cleanup of unused resources were key parts of the task."
      },
      action: {
        ko: "[WGS, WES, WTS 분석 파이프라인 통합 및 Docker 이미지 구성]\n여러 부서에서 운영하던 WGS, WES, WTS 분석 파이프라인을 확인하고, 분석 유형별로 대표 파이프라인 하나씩으로 통합했습니다.\n이 과정에서 GATK, STAR, Manta, RSEM 등 분석에 필요한 모듈의 실행 환경을 Docker 이미지로 제작하고 AWS ECR에 등록했습니다. 기존 서버에서 사용하던 분석 도구를 AWS 환경에서도 동일하게 실행할 수 있도록 정리했습니다.\n[AWS Batch 및 Step Functions 기반 워크플로 구축]\n팀장님과 함께 AWS Batch와 Step Functions를 활용해 분석 워크플로를 구축했습니다.\n분석 모듈별로 AWS Batch Job Definition을 구성하고, 작업에 필요한 EC2 인스턴스 사양과 Compute Environment를 연결했습니다. Step Functions에서는 분석 단계별 실행 순서와 조건 분기를 정의했습니다. WTS 분석의 경우 S3에 기존 분석 결과가 있는지 확인하고, 필요한 경우 STAR와 RSEM을 실행하도록 구성했습니다. 이를 통해 분석 단계별 실행 여부를 확인하고 필요한 작업을 수행할 수 있도록 했습니다.\n[CLI 기반 분석 실행 자동화]\n분석을 실행할 때마다 여러 명령어와 파라미터를 직접 입력해야 하는 불편함이 있어 Bash와 AWS CLI를 활용한 실행 스크립트를 제작했습니다. oneline.sh에서 WGS, WES, WTS 및 Normal, Tumor, Paired 등의 분석 유형을 선택하고, 각 분석에 필요한 Sample ID, Flowcell 정보, Target Depth, Reference Version 등을 입력받도록 했습니다. 입력된 값은 분석별 실행 스크립트로 전달해 AWS Step Functions를 호출하도록 구성했습니다. 이를 통해 AWS 콘솔에서 작업을 일일이 설정하지 않고도 CLI에서 분석을 실행할 수 있도록 했습니다.\n[분석 데이터 정리 및 S3 Glacier 기반 비용 관리]\n여러 부서에 분산되어 있던 분석 데이터를 정리하고, 현재 분석에 필요한 데이터와 장기 보관할 데이터를 구분했습니다. 분석이 완료되어 자주 사용하지 않는 데이터는 S3 Glacier로 옮겨 장기 보관하도록 했습니다. 또한 사용하지 않는 AWS 리소스를 정리하면서 스토리지와 컴퓨팅 비용을 줄이는 작업에 참여했습니다.",
        en: "[Consolidating the WGS, WES, and WTS pipelines and building Docker images]\nI went through the WGS, WES, and WTS pipelines each department was running and consolidated them into one representative pipeline per analysis type.\nIn the process I built Docker images for the runtime of the modules the analyses needed — GATK, STAR, Manta, RSEM and others — and registered them in AWS ECR, so the tools used on the old server ran identically on AWS.\n[Building the workflow on AWS Batch and Step Functions]\nTogether with the team lead, I built the analysis workflow on AWS Batch and Step Functions.\nI defined an AWS Batch job definition per analysis module and tied each to the EC2 instance type and compute environment the job required. Step Functions then defined the execution order of the analysis stages and the conditional branches. For WTS, the workflow checks whether prior results already exist in S3 and runs STAR and RSEM when they are needed, so each stage runs only if it has to.\n[Automating analysis runs from the CLI]\nRunning an analysis meant typing out a series of commands and parameters every time, so I wrote execution scripts using Bash and the AWS CLI. In oneline.sh the user selects the analysis type — WGS, WES, WTS and normal, tumor, or paired — and enters the sample ID, flowcell information, target depth, and reference version the analysis needs. Those values are passed to the per-analysis execution script, which calls AWS Step Functions. This made it possible to launch an analysis from the CLI without configuring each job by hand in the AWS console.\n[Organizing analysis data and managing cost with S3 Glacier]\nI organized the analysis data that had been scattered across departments, separating what was needed for current analyses from what should be kept long term. Completed data that was no longer accessed often was moved to S3 Glacier for long-term storage. I also took part in cleaning up unused AWS resources to bring down storage and compute costs."
      }
    },
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
        gallery: [
      { ko: "저장할 S3 폴더 구성", en: "S3 folder layout for stored data" },
      { ko: "Bio tool에 대한 Docker 이미지 (AWS ECR)", en: "Docker images for the bio tools (AWS ECR)" },
      { ko: "AWS Batch 컴퓨팅 환경", en: "AWS Batch compute environments" },
      { ko: "AWS Batch 작업 정의", en: "AWS Batch job definitions" },
      { ko: "최초 버전의 원라인 실행 스크립트 (oneline.sh)", en: "First version of the one-line run script (oneline.sh)" },
      { ko: "WTS 초기 테스트 Step Functions 호출 예시", en: "Example Step Functions run for the initial WTS test" }
    ],
tools: [
      "AWS EC2",
      "AWS Batch",
      "S3",
      "S3 Glacier",
      "Step Functions",
      "Docker",
      "AWS ECR",
      "Bash"
    ]
  },
  {
    id: "gxd-japan",
    badge: { flag: "jp", text: locale("일본 법인 파견", "Japan assignment") },
    featured: true,
    story: locale("* MONSTAR SCREEN-3는 2026년 12월까지 계약이 유지되는 프로젝트성 과제여서 세부 사항은 축약했습니다.", "* MONSTAR SCREEN-3 is a project-based engagement under contract until December 2026, so details are abbreviated."),
    title: {
      ko: "NCCE MONSTAR SCREEN-3 분석 시스템 구축 및 운영 자동화",
      en: "NCCE MONSTAR SCREEN-3 analysis system build and operations automation"
    },
    client: {
      ko: "GxD 株式会社 / 바이오 유전체 분석",
      en: "GxD 株式会社 / Bio genomics analysis"
    },
    period: {
      ko: "2023.11 ~ 2024.03",
      en: "Nov. 2023 – Mar. 2024"
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
  frontend: locale('Frontend', 'Frontend'),
  db: locale('DB', 'DB'),
  cloud: locale('Cloud & Container', 'Cloud & Container'),
  ai: locale('AI', 'AI'),
  workflow: locale('Workflow & Observation', 'Workflow & Observation'),
  devtools: locale('Developer Tools', 'Developer Tools'),
};

const skills = [
  ['lang', 'production', 'Python', 'python', '분석 파이프라인과 AI 서비스 개발', 'Analysis pipelines and AI services'],
  ['lang', 'implemented', 'R', 'r', 'R 기반 데이터 분석', 'Data analysis with R'],
  ['lang', 'implemented', 'Java', 'java', 'Java 기반 애플리케이션 개발과 운영', 'Java application development and operation'],
  ['lang', 'implemented', 'JavaScript', 'javascript', 'JavaScript 기반 웹 화면 개발', 'Web front-end development with JavaScript'],
  ['db', 'production', 'MariaDB', 'mariadb', 'LIMS 데이터베이스를 Docker 컨테이너로 구성', 'LIMS database packaged as a Docker container'],
  ['db', 'implemented', 'MySQL', 'mysql', 'MySQL 호환 데이터베이스 구성과 운영', 'MySQL-compatible database setup and operation'],
  ['db', 'implemented', 'SQLite', 'sqlite', 'nAI-Gateway 사용자와 사용량 데이터 저장', 'User and usage data storage for nAI-Gateway'],
  ['db', 'implemented', 'pgvector', 'pgvector', 'LibreChat 문서 검색용 벡터 저장 (PostgreSQL 확장)', 'Vector storage for LibreChat document search (PostgreSQL extension)'],
  ['ai', 'implemented', 'LiteLLM', 'litellm', 'AWS 기반 AI Gateway로 LLM 사용 환경과 비용 관리', 'AI Gateway on AWS for managing LLM access and costs'],
  ['ai', 'implemented', 'LibreChat', 'librechat', '사내 AI 챗봇 서비스 구성과 AI Gateway 연동', 'Internal AI chatbot service integrated with the AI Gateway'],
  ['ai', 'exploring', 'LangGraph', 'langgraph', 'AI Agent 워크플로 설계', 'AI agent workflow design'],
  ['ai', 'implemented', 'Skills', 'claude-code', '사내 AI 개발 도구 도입과 사용 환경 구성', 'Introduced and configured AI development tooling for the company'],
  ['cloud', 'production', 'AWS', 'aws', '클라우드 환경 구축 및 서비스 운영', 'Cloud environment setup and service operations'],
  ['cloud', 'production', 'Docker', 'docker', '컨테이너 기반 분석 환경 구성과 자동 배포', 'Container-based analysis environments and automated deployment'],
  ['cloud', 'production', 'Singularity', 'singularity', '분석 모듈 컨테이너화와 서버 실행 환경 구성', 'Containerizing analysis modules and server runtime setup'],
  ['workflow', 'production', 'Snakemake', 'snakemake', '분석 파이프라인 워크플로우 자동화', 'Automating analysis pipeline workflows'],
  ['workflow', 'implemented', 'Panoptes', 'panoptes', 'Snakemake 워크플로우 실행 상태 모니터링', 'Monitoring the run status of Snakemake workflows'],
  ['frontend', 'implemented', 'HTML', 'html', '웹 화면 마크업', 'Web page markup'],
  ['frontend', 'implemented', 'CSS', 'css', '웹 화면 스타일링', 'Web page styling'],
  ['devtools', 'production', 'Linux', 'linux', 'CentOS, Ubuntu 서버 환경 구성과 운영', 'CentOS and Ubuntu server setup and operation'],
  ['devtools', 'production', 'Git', 'git', '소스 버전 관리', 'Source version control'],
  ['devtools', 'production', 'MobaXterm', 'mobaxterm', '서버 원격 접속과 작업', 'Remote server access and work'],
  ['devtools', 'production', 'VS Code', 'vscode', '개발 환경', 'Development environment'],
  ['devtools', 'implemented', 'Orca', 'orca', 'AI 에이전트 개발 환경', 'Agent development environment'],
  ['devtools', 'implemented', 'T3 Code', 't3', '코딩 에이전트 운영 도구', 'Control plane for coding agents'],
].map(([c, level, n, icon, ko, en]) => ({ c, level, n, icon, d: locale(ko, en) }));

const milestones = [
  { f: 'exp', start: '2025-11', logo: 'nongshim.svg', org: locale('농심데이터시스템', 'Nongshim Data System'), role: locale('전략사업본부 솔루션팀 과장 / AI 솔루션 기획 및 개발, B2B 솔루션 구축', 'Manager, Solutions Team, Strategic Business Division / AI solution planning and development, B2B solution delivery'),
    text: locale('AI 솔루션, AI Agent 플랫폼, B2B 솔루션, 클라우드 아키텍처 분야를 담당합니다.', 'Working on AI solutions, AI agent platforms, B2B solutions, and cloud architecture.'),
    projects: ['nai-gateway', 'ai-re', 'rag-chatbot'],
    children: [
      { start: '2026-10', logo: 'inocras.png', org: locale('이노크라스 국내 파견', 'Inocras (domestic assignment)'), role: locale('농심데이터시스템 재직 중 국내 고객사 파견', 'Assigned to a domestic customer while at Nongshim Data System'), desc: locale('현재 NDA(비밀유지계약) 및 MOU(업무협약)에 따라 업무를 수행하고 있습니다.', 'Currently working under an NDA (non-disclosure agreement) and an MOU (memorandum of understanding).'), list: locale(["기존 분석 시스템의 데이터 처리 구조와 모듈 정리 및 운영 환경 파악", "기존 분석 시스템에서 해결되지 않은 문제의 원인 분석과 개선 방향 검토", "분석 처리 비용 최적화 및 모듈 단위 실행 속도 개선 제시", "가상화 기반 분석 모듈 환경 구성 및 개발", "raw data 분석 결과부터 시작하여, 각 모듈의 개선점을 시각화 활용한 결과 차이 검증", "고객사 국내 담당자 및 미국 지사와의 합동 회의를 통해 기술적 문제와 개선 방향 협의", "추후 각 모듈에 대해 조건에 따른 CPU와 GPU 하이브리드 파이프라인 구현 예정"], ["Organized the data-processing structure and modules of the existing analysis system and understood its operating environment", "Analyzed the causes of unresolved problems in the existing analysis system and reviewed improvement directions", "Proposed analysis cost optimization and faster module-level execution", "Configured and developed virtualization-based analysis module environments", "Starting from the raw-data analysis results, verified result differences for each module's improvements using visualization", "Discussed technical problems and improvement directions in joint meetings with the customer's domestic staff and the US branch", "Planned to implement hybrid CPU and GPU pipelines for each module depending on conditions"]), note: locale('* 회사 기밀 보호를 위해 세부 내용을 축약했습니다.', '* Details are abbreviated to protect confidential company information.'), toggle: true },
      { start: '2026-04', end: '2026-04', logo: 'inocras.png', org: locale('이노크라스 미국 파견', 'Inocras (US assignment)'), role: locale('농심데이터시스템 재직 중 해외 고객사 파견', 'Assigned to an overseas customer while at Nongshim Data System'), projects: ['cgn-aacr'] },
    ] },
  { f: 'exp', start: '2022-03', end: '2025-11', logo: 'geninus.png', org: locale('지니너스', 'GENINUS'), role: locale('전략기획본부 AI센터 선임 연구원 / 유전체 분석 소프트웨어 및 시스템 개발', 'Senior Researcher, AI Center, Strategic Planning Division / Genomic analysis software and system development'),
    text: locale('Bioinformatics Engineering, Workflow Automation, 의료기관 시스템 구축, AWS 전환을 담당했습니다.', 'Worked on bioinformatics engineering, workflow automation, medical-institution system delivery, and AWS migration.'),
    projects: ['spatial', 'liquid-ldt', 'hospital', 'lims', 'aws-migration'],
    children: [
      { start: '2024-04', end: '2025-11', org: locale('국내용 CAP PT / 실사 대응(미국병리학회 인증)', 'Domestic CAP PT / Inspection response (College of American Pathologists accreditation)'), role: locale('분석 시스템 점검, SOP 및 증빙 문서 준비, CAP PT 분석 및 결과지 제출', 'System checks, SOP and evidence documents, CAP PT analysis and result reports'), list: locale(['CAP 실사를 위한 분석 시스템 점검 및 증빙 문서 준비', 'CAP PT 숙련도 평가용 데이터 분석 및 결과지 제출', 'Software SOP 및 데이터 형상관리 문서 작성', 'CAP 실사평가 대응'], ['Analysis system checks and evidence documents for the CAP inspection', 'Data analysis and result-report submission for CAP PT proficiency testing', 'Software SOP and data configuration-management documents', 'CAP inspection response']), note: locale('* 회사 기밀 보호를 위해 세부 내용을 축약했습니다.', '* Details are abbreviated to protect confidential company information.') },
      { start: '2023-11', end: '2024-03', logo: 'gxd.png', org: locale('GxD 株式会社 (일본 파견)', 'GxD 株式会社 (Japan assignment)'), role: locale('데이터사이언스센터 BI팀 주임 연구원 / 지니너스 재직 중 일본 자회사 파견 (NCCE MONSTAR SCREEN-3)', 'Associate Researcher, BI Team, Data Science Center / Assigned to the Japan subsidiary while at GENINUS (NCCE MONSTAR SCREEN-3)'), projects: ['gxd-japan'] },
    ] },
  { f: 'edu', link: 'assets/papers/dongguk-msc-thesis.pdf', start: '2019-03', end: '2021-02', org: locale('멀티미디어공학과 석사 (M.Sc.)', 'M.Sc., Multimedia Engineering'), inst: locale('동국대학교', 'Dongguk University'), text: locale('학점 4.39 / 4.5<br>석사 졸업 논문: Research on DNA Sequence Alignment Algorithm Based on Anchoring', 'GPA 4.39 / 4.5<br>Master’s thesis: Research on DNA Sequence Alignment Algorithm Based on Anchoring') },
  { f: 'edu', link: 'assets/papers/dongguk-bsc-report.pdf', start: '2013-03', end: '2019-02', org: locale('컴퓨터공학과 학사 (B.Sc.)', 'B.Sc., Computer Science and Engineering'), inst: locale('동국대학교', 'Dongguk University'), text: locale('학점 3.24 / 4.5<br>학사 졸업 논문: A domestic crime information system by year. (web site)', 'GPA 3.24 / 4.5<br>Bachelor’s thesis: A domestic crime information system by year. (web site)') },
  { f: 'pub', link: 'https://acsjournals.onlinelibrary.wiley.com/doi/full/10.1002/cncr.35609', date: locale('2025.01', 'Jan. 2025'), org: locale('Phase II Trial of Avelumab in Combination with Gemcitabine in Advanced Leiomyosarcoma as a Second-line Treatment (EAGLES, KCSG UN18-09)', 'Phase II Trial of Avelumab in Combination with Gemcitabine in Advanced Leiomyosarcoma as a Second-line Treatment (EAGLES, KCSG UN18-09)'), inst: locale('Cancer, vol. 131, Issue 1, e35609', 'Cancer, vol. 131, Issue 1, e35609'), text: locale('Miso Kim MD, PhD, …, <b>Jeongkyu Kim</b> MS, Young Saing Kim MD, PhD, Jin-Hee Ahn MD, PhD', 'Miso Kim MD, PhD, …, <b>Jeongkyu Kim</b> MS, Young Saing Kim MD, PhD, Jin-Hee Ahn MD, PhD') },
  { f: 'pub', link: 'https://ieeexplore.ieee.org/document/9223667', date: locale('2020.12', '2020'), org: locale('A Review on Sequence Alignment Algorithms for Short Reads Based on Next-Generation Sequencing', 'A Review on Sequence Alignment Algorithms for Short Reads Based on Next-Generation Sequencing'), inst: locale('IEEE Access, vol. 8, pp. 189811–189822', 'IEEE Access, vol. 8, pp. 189811–189822'), text: locale('<b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi', '<b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi') },
    { f: 'award', link: 'assets/awards/wngp-2025.jpg', date: locale('2025.08', 'Aug. 2025'), org: locale('스포츠모델 AGE 3위', 'Sports Model AGE, 3rd place'), inst: locale('천안 WNGP (World Natural Grand Prix)', 'WNGP Cheonan (World Natural Grand Prix)'), text: locale('<b>Jeongkyu Kim</b>', '<b>Jeongkyu Kim</b>') },
    { f: 'award', link: 'assets/awards/kms-best-paper-2020.pdf', date: locale('2020.08', 'Aug. 2020'), org: locale('우수논문상', 'Best Paper Award'), inst: locale('Korea Multimedia Society', 'Korea Multimedia Society'), text: locale('<b>Research on Hash Table-Based Sorting Process Using k-mer Approach with Short Reads</b><br><b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi', '<b>Research on Hash Table-Based Sorting Process Using k-mer Approach with Short Reads</b><br><b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi') },
{ f: 'conf', link: 'assets/papers/kms-hash-sorting-2020.pdf', date: locale('2020.08', 'Aug. 2020'), org: locale('Research on Hash Table-Based Sorting Process Using k-mer Approach with Short Reads', 'Research on Hash Table-Based Sorting Process Using k-mer Approach with Short Reads'), inst: locale('Korea Multimedia Society', 'Korea Multimedia Society'), text: locale('<b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi', '<b>Jeongkyu Kim</b>, Mingeun Ji, Gangman Yi') },
  { f: 'conf', link: 'assets/papers/kips-seed-aligner-2019.pdf', date: locale('2019.11', 'Nov. 2019'), org: locale('A Study on the Implementation of a Seed-Based Short Read Aligner', 'A Study on the Implementation of a Seed-Based Short Read Aligner'), inst: locale('Korea Information Processing Society, vol. 26, no. 2, pp. 1107–1109', 'Korea Information Processing Society, vol. 26, no. 2, pp. 1107–1109'), text: locale('Mingeun Ji, <b>Jeongkyu Kim</b>, Gangman Yi', 'Mingeun Ji, <b>Jeongkyu Kim</b>, Gangman Yi') },
];

// 학력 카드: inst(학교명)와 date(기간)를 locale('한글','English')로 추가하면 카드에 표시됩니다.

