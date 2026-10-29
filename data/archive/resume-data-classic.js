/* Single source of truth for the resume. Edit here; the page rebuilds itself.
   Use **double asterisks** to bold a metric. Tags must match keys in TAGS. */
window.RESUME = {
  tags: {
    lead:     "Leadership & Management",
    risk:     "Risk, Compliance & ATO",
    vuln:     "Vulnerability Management",
    process:  "Process Improvement & Automation",
    metrics:  "Metrics & Executive Reporting",
    program:  "Program & Policy Building",
    cloud:    "Cloud & Identity Security",
    training: "Training & Mentoring"
  },
  presets: [
    { id: "manager",  label: "Security Manager / Director", tags: ["lead", "program", "metrics"] },
    { id: "pm",       label: "Security Program Manager",    tags: ["program", "process", "metrics", "lead"] },
    { id: "grc",      label: "GRC / ISSM / Compliance",     tags: ["risk", "program", "metrics"] },
    { id: "vuln",     label: "Vulnerability & Threat Mgmt", tags: ["vuln", "process", "metrics"] },
    { id: "eng",      label: "Security Engineer / Architect", tags: ["cloud", "vuln", "process"] }
  ],
  summary: "Cybersecurity leader with more than 25 years in IT and security, 12 of them in leadership roles. I build the plans, meetings, and metrics that let technical people do what they do best, and I give leadership a straight answer to “Are we secure?”",
  keyAreas: ["RMF / ATO", "NIST SP 800-53 Rev 5", "Continuous monitoring", "POA&M", "STIG compliance", "Vulnerability management", "Change control", "Process improvement", "Stakeholder management", "Jira & Confluence", "Executive reporting"],
  roles: [
    {
      title: "Information Systems Security Manager",
      org: "U.S. Air Force (Civilian)",
      dates: "10/2023 – Present",
      bullets: [
        { t: "Direct the work of **18 information system security officers** (including contractors) across multiple secure, isolated networks, assigning and prioritizing work and giving final review to every authorization artifact before it reaches senior leadership.", tags: ["lead", "risk"] },
        { t: "Redesigned the software approval process within change management, moving from paper forms to automated workflows and cutting average request time from **~350 days to under 15** and final approval time from **96 days to under 3**. Approvals rose from **86 in 2025 to 600+ in the first half of 2026**, and the process has since been adopted across the organization’s networks.", tags: ["process", "metrics"] },
        { t: "Delivered **every authorization to operate (ATO) on time**, including one for a major new lab environment **two months ahead of its target**, after gathering requirements with program stakeholders and writing 15 policies and procedures covering each control family.", tags: ["risk", "program"] },
        { t: "Led the migration of two authorization packages (**900+ NIST SP 800-53 controls**) to Rev 5 ahead of schedule, rebuilding continuous monitoring and POA&M workflows and adding live dashboards that show leadership the top risks and control status at any time.", tags: ["risk", "process", "metrics"] },
        { t: "Serve as final decision authority on the Change Control Board and a key stakeholder on the POA&M and vulnerability steering committees; run daily stand-ups and weekly scrums and brief leadership on compliance posture, risk, vulnerability trends, and ATO status.", tags: ["lead", "metrics"] },
        { t: "Wrote the organization’s Vulnerability Management Plan from **14 stakeholder meetings over 6 months**, then led recurring patching syncs that contributed to a **33% reduction in vulnerability exposure**. The plan is being adopted across a multi-site directorate.", tags: ["vuln", "program", "metrics"] },
        { t: "Helped senior leadership build the organization’s project management process in Jira and Confluence (meeting cadence, backlog reviews, workflows, automations), now used by **1,500+ employees** and tracking 4 org-wide initiatives and 52 projects in the cybersecurity section.", tags: ["program", "process"] },
        { t: "Developed a **quantitative risk scoring method** that accounts for process maturity, mitigating factors, and control criticality, closing a gap in qualitative NIST SP 800-30 assessments. It is in use in POA&M workflows and under consideration for organization-wide adoption.", tags: ["risk", "metrics"] },
        { t: "Led a year-long effort with about 12 stakeholders across cyber operations, development, and AI/automation teams to write the Container Security Plan, now approved and in use.", tags: ["program", "cloud"] },
        { t: "Defined success criteria and led a rotating IT and cyber team that built a training environment for **200 new hires and interns** waiting on clearances.", tags: ["lead", "training"] }
      ]
    },
    {
      title: "Information Security Officer",
      org: "Utah State University",
      dates: "4/2022 – 3/2023",
      bullets: [
        { t: "Led the university’s cybersecurity program as its sole security officer, working with **12+ teams** across colleges and departments (Legal, Compliance, Audit, IT, Research) to deliver the policies, standards, and procedures needed to comply with **FISMA** and the **Utah Cybersecurity Affirmative Defense Act**.", tags: ["program", "risk", "lead"] },
        { t: "Prioritized risk findings and oversaw remediation, raising compliance from **44% to 85%** in the first year, and reported to the CIO and executive leadership in candid reports written for non-technical audiences.", tags: ["risk", "metrics"] },
        { t: "Led cyber risk and incident response, including red/purple team exercises with about 20 interns, security, and IT staff; developed SOC metrics, scorecards, playbooks, and SOPs aligned to OWASP, CIS CSC, and PCI.", tags: ["training", "metrics"] },
        { t: "Built a custom GRC platform in Jira to track compliance and risk metrics while negotiating the ServiceNow GRC contract.", tags: ["process", "metrics"] }
      ]
    },
    {
      title: "Manager, Information Security",
      org: "Merrick Bank",
      dates: "3/2019 – 2/2022",
      bullets: [
        { t: "Managed a team of **8 senior security engineers** at a top-20 Visa card issuer, handling hiring, onboarding, scheduling, budgeting, appraisals, and coaching, and defined career paths and role requirements for cybersecurity staff (similar to DoD 8570).", tags: ["lead", "training"] },
        { t: "Rebuilt the threat and vulnerability management program: scanning coverage rose from **13% to 99%+**, remediation compliance from **13% to 95%+**, and CIS benchmark (STIG equivalent) compliance from **35% to 75%** within the first year.", tags: ["vuln", "metrics"] },
        { t: "Built reporting for every audience (daily dashboards, weekly IT manager reports, monthly executive KPIs, quarterly board updates) and cut the vulnerability project’s weekly meeting from 2 hours to a few minutes in Slack.", tags: ["metrics", "process"] },
        { t: "Led deployments of SaaS and hybrid security controls (Netskope CASB, Azure/M365, Microsoft Defender, Thycotic PAM, SailPoint, ServiceNow), extending cloud application controls to **90%+ of endpoints** and **100% of critical cloud applications**.", tags: ["cloud"] },
        { t: "Worked within bank regulation and audit regimes (FDIC, PCI) and evaluated third-party products to shorten the time to deploy security controls.", tags: ["risk"] }
      ]
    },
    {
      title: "Sr. Information Security Engineer (Team Lead)",
      org: "UpWell Health",
      dates: "10/2017 – 2/2019",
      bullets: [
        { t: "Led a team of **13** and built the company’s cybersecurity program on the NIST Cybersecurity Framework as a path to HIPAA and HITRUST compliance, writing all cyber and IT policies, standards, and procedures.", tags: ["lead", "program", "risk"] },
        { t: "Cut phishing and DLP incidents by nearly **50%** by developing and delivering semi-annual in-person security training to **900+ employees**.", tags: ["training", "metrics"] },
        { t: "Mentored IT and security staff in secure architecture, privileged access management, and zero trust, and led the design of a sensitive data environment for health records and payment card data.", tags: ["cloud", "training"] }
      ]
    },
    {
      title: "Sr. Information Security Engineer (Team Lead)",
      org: "StorageCraft",
      dates: "8/2011 – 9/2017",
      bullets: [
        { t: "Led a 6-person IT helpdesk team and used ticket metrics to expose a gap in role-based group management, then automated RBAC in the identity management system, cutting ticket volume by **40%+**.", tags: ["lead", "process", "metrics", "cloud"] },
        { t: "Built the vulnerability management program around containerizing critical architecture with Cloud DevOps and IT leadership, reducing downtime during patching and failovers.", tags: ["vuln", "process"] },
        { t: "Authored security policies and procedures and presented security training to employees.", tags: ["program", "training"] }
      ]
    }
  ],
  education: [
    ["ISC2 CISSP-ISSMP (Information Systems Security Management Professional)", "2025"],
    ["Situational Leadership II (SLII)", "2025"],
    ["LDI and LDI+ Leadership Development (AIM Utah)", "2019–2022"],
    ["Western Governors University, M.S. Cybersecurity & Information Assurance (Capstone of Excellence)", "2020"],
    ["ISC2 CISSP", "2017"],
    ["Crucial Conversations & Crucial Confrontations Coaching", "2013–2015"],
    ["Utah Valley University, B.S. Information Technology – Cybersecurity", "2012"]
  ]
};
