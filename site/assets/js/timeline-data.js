/* Experience timeline data. Edit this file; the page rebuilds itself.

   LANES   = horizontal lines. kind "job" = employer, "edu" = school, "creds" = certifications track.
   EVENTS  = dots on a lane. type: "project" | "achievement" | "cert" | "degree".
   Dates   = "YYYY-MM" or "YYYY". approx:true marks a date I estimated from the resumes (shown as "approx." on the page).
             Please confirm or correct every approx:true date.
   Optional challenge / approach / result show as a three-part story; otherwise summary is used. */
window.TIMELINE = {
  defaultId: "af-approvals",

  lanes: [
    { id: "af", kind: "job", sector: "Federal Government", org: "U.S. Air Force", role: "Information Systems Security Manager", from: "2023-10", to: null,
      summary: "I direct the work of 18 information system security officers across secure, isolated networks and give final review to every authorization artifact before it reaches senior leadership. I also serve as final decision authority on the Change Control Board and brief leadership on compliance posture, risk, vulnerability trends, and ATO status.",
      points: ["Every authorization to operate delivered on time", "Software approvals: 86 in 2025 to 600+ in the first half of 2026", "Process work adopted across the organization’s networks"] },

    { id: "usu", kind: "job", sector: "Higher Education", org: "Utah State University", role: "Information Security Officer", from: "2022-04", to: "2023-03",
      summary: "Sole security officer for the university, working with 12+ teams across colleges and departments (Legal, Compliance, Audit, IT, Research) to build a program that met FISMA and the Utah Cybersecurity Affirmative Defense Act.",
      points: ["Compliance raised from 44% to 85% in the first year", "Custom GRC platform built in Jira", "Led cyber risk and incident response"] },

    { id: "mb", kind: "job", sector: "FinTech", org: "Merrick Bank", role: "Manager, Information Security", from: "2019-03", to: "2022-02",
      summary: "Managed a team of 8 senior security engineers at a top-20 Visa card issuer, covering vulnerability management, endpoint and cloud application controls, and access controls, within FDIC and PCI requirements.",
      points: ["Vulnerability scanning coverage from 13% to 99%+", "Remediation compliance from 13% to 95%+", "Reporting for every audience, daily to board-level"] },

    { id: "uw", kind: "job", sector: "Healthcare", org: "UpWell Health", role: "Sr. Information Security Engineer (Team Lead)", from: "2017-10", to: "2019-02",
      summary: "Led a team of 13 and built the company’s cybersecurity program on the NIST Cybersecurity Framework as a path to HIPAA and HITRUST compliance.",
      points: ["Wrote all cyber and IT policies, standards, and procedures", "Security training for 900+ employees", "Designed a sensitive data environment for health and payment data"] },

    { id: "sc", kind: "job", sector: "Global Tech", org: "StorageCraft", role: "Sr. Information Security Engineer (Team Lead)", from: "2011-08", to: "2017-09",
      summary: "Six years growing from systems and security administration into team lead. Built the security program that guided corporate IT’s network and systems architecture, and led the IT helpdesk team.",
      points: ["Ground-up secure wired and wireless networks", "Automated access control to cut tickets 40%+", "Vulnerability management built around containers"] },

    { id: "nym", kind: "job", sector: "FinTech", org: "Nine Year Mortgage", role: "Network Engineer / Security Administrator", from: "2010-03", to: "2011-07",
      summary: "Moved the company’s networks from reactive to fully automated and proactively monitored, using open source tools to cut cost and improve resilience.",
      points: ["Saved over $125,000 in licensing and hardware", "Designed the disaster recovery plan", "Cut help desk requests by up to 75%"] },

    { id: "mm", kind: "job", sector: "Digital Marketing & Documentation", org: "McKinnon-Mulherin", role: "Server Administrator", from: "2008-08", to: "2011-08",
      summary: "Built, secured, and monitored the company’s Windows server roles and Linux-based security devices, and automated workstation and server maintenance to improve business continuity.",
      points: ["Linux firewall, IPS/IDS, proxy, and DMZ", "VPN to a client remote site", "Automated server and workstation maintenance"] },

    { id: "qen", kind: "job", sector: "Tech", org: "Quality Engineered Networks", short: "QENets", role: "Network Administrator", from: "2007-01", to: "2008-07",
      summary: "Remote and on-site administration for up to 20 customer networks and more than 300 user workstations, including Windows domain security and routing.",
      points: ["Up to 20 customer networks", "300+ user workstations", "Windows domains and routing (RIPv2, EIGRP, OSPF)"] },

    { id: "ebc", kind: "job", sector: "Tech", org: "EBC Computers", role: "Depot Technician, Manager", from: "2006-08", to: "2007-01",
      summary: "Managed the Orem branch and supervised eight network technicians providing customer PC repair, while building and configuring hundreds of Windows and Linux systems.",
      points: ["Led a team of eight technicians", "Branch hiring and daily accounting", "Hundreds of custom systems built"] },

    { id: "mis", kind: "svc", sector: "Volunteer Service", org: "The Church of Jesus Christ of Latter-day Saints", short: "Church of Jesus Christ…", role: "Full-Time Missionary, Fukuoka, Japan", from: "2004-06", to: "2006-06",
      summary: "Two years of full-time volunteer service in Fukuoka, Japan, living and working in Japanese every day. I led weekly missionary training groups, taught English as a service to the community, and served the people around me in whatever way I could to help them see their purpose in life.",
      points: ["Became fluent in Japanese", "Led weekly missionary training groups", "Taught English as a community service", "Served the local community in Fukuoka"] },

    { id: "wgu", kind: "edu", sector: "Higher Education", org: "Western Governors University", role: "M.S. Cybersecurity & Information Assurance", from: "2018-01", to: "2019-12",
      summary: "Master’s degree in Cybersecurity and Information Assurance, January 2018 to January 2020, finishing with a Capstone of Excellence award and a published paper." },

    { id: "uvu", kind: "edu", sector: "Higher Education", org: "Utah Valley University", role: "B.S. Information Technology, Cybersecurity", from: "2007-09", to: "2012-12",
      summary: "Bachelor’s degree in Information Technology with a cybersecurity focus and advanced coursework in networking and security, earned while working full time." },

    { id: "creds", kind: "creds", sector: "Professional", org: "Certifications & training", role: "Credentials & leadership training", track: true,
      summary: "Industry certifications and leadership development programs." }
  ],

  events: [
    /* ---------------- U.S. Air Force (Civilian) ---------------- */
    { id: "af-training", lane: "af", type: "project", date: "2024-03", approx: true,
      title: "Hands-on training environment for new hires",
      challenge: "New hires and interns waiting on their clearances had no hands-on way to build cyber skills.",
      approach: "Defined success criteria and led a rotating IT and cyber team to design and build a dedicated training environment, documented with architecture diagrams, SOPs, and wiki-style knowledge base articles.",
      result: "A training environment designed for **200 new hires and interns**, with a repeatable build and documentation process.",
      tags: ["Leadership", "Training"] },

    { id: "af-pm", lane: "af", type: "project", date: "2024-09", approx: true,
      title: "Project management process at scale",
      challenge: "A large cybersecurity organization needed a consistent way to plan and track work.",
      approach: "Helped senior leadership define meeting cadence and format, backlog reviews, meeting minutes, workflows, and automations in Jira and Confluence.",
      result: "Now used by **1,500+ employees**, tracking 4 org-wide initiatives and 52 projects in the cybersecurity section.",
      tags: ["Process", "Jira", "Confluence"] },

    { id: "af-rev5", lane: "af", type: "project", date: "2025-03", approx: true,
      title: "NIST SP 800-53 Rev 5 migration",
      challenge: "Move two authorization packages covering 900+ controls to Rev 5 without disrupting authorizations.",
      approach: "Rebuilt the control traceability matrix, continuous monitoring, and POA&M workflows, and added live dashboards.",
      result: "**Finished ahead of schedule.** Leadership can see top risks and control compliance status at any time.",
      tags: ["RMF", "Dashboards"] },

    { id: "af-lab", lane: "af", type: "achievement", date: "2025-06",
      title: "ATO delivered two months early for a major new lab",
      challenge: "A new lab environment needed authorization to operate, with a target date two months out.",
      approach: "Gathered requirements with program stakeholders and other security officers, then wrote 15 policies and procedures covering each control family.",
      result: "ATO delivered in June 2025, **two months ahead of its August target**. The lab lets operational software be tested for vulnerabilities before it reaches the people who depend on it.",
      tags: ["ATO", "RMF"] },

    { id: "af-cert-test", lane: "af", type: "achievement", date: "2025-07", when: "July 8, 2025",
      title: "Certificate of Achievement for security support of a test team",
      challenge: "Keep a program’s test team running at peak performance while upholding rigorous security protocols, a balance between customer service and security that the high-visibility test results often overshadow.",
      approach: "As Information Systems Security Officer from March to June 2025, brought the security teams’ contributions to the forefront and balanced customer service with robust security measures.",
      result: "The test team reached optimal efficiency **without compromising security**. Recognized with a **Certificate of Achievement from the Department of the Air Force**.",
      tags: ["Award", "Customer service", "Security operations"] },

    { id: "af-cert-sprint", lane: "af", type: "achievement", date: "2025-07", when: "July 30, 2025",
      title: "Certificate of Achievement for a 30-day authorization sprint",
      challenge: "Three Authorization to Operate (ATO) extension packages had to be completed on time in a single 30-day sprint.",
      approach: "As Information Systems Security Manager from May to June 2025, worked with the team to author, assess, and update **over 1,300 security controls** while keeping nine core security artifacts consistent. The team also saw that Plan of Action and Milestones (POA&M) tracking needed to move from spreadsheets to an application.",
      result: "**All three ATO extension packages completed on time.** The POA&M application improves transparency with stakeholders and lets teams share resources and work on vulnerability mitigation at the same time, supporting continuous improvement of the organization’s security posture. Recognized with a **Certificate of Achievement from the Department of the Air Force**.",
      tags: ["Award", "ATO", "POA&M", "Process improvement"] },

    { id: "af-ato", lane: "af", type: "project", date: "2025-10",
      title: "New ATO for an isolated lab network",
      challenge: "A new isolated lab network needed an Authorization to Operate (ATO) under RMF Rev 4, meeting the strict security requirements that apply to national security systems.",
      approach: "Published the policy, standards, and procedures for all 18 RMF control families, and wrote the continuous monitoring (CONMON) plan, the change management process, and the other plans and documents RMF requires.",
      result: "ATO achieved **on time and under budget**.",
      tags: ["ATO", "RMF", "Continuous monitoring", "Change management"] },

    { id: "af-risk", lane: "af", type: "project", date: "2025-09", approx: true,
      title: "Quantitative risk scoring method",
      challenge: "Qualitative NIST SP 800-30 ratings made risk decisions hard to compare and defend.",
      approach: "Built a scoring method that weighs process maturity, mitigating factors, and control criticality.",
      result: "In use across POA&M workflows and **under consideration for organization-wide adoption**.",
      tags: ["Risk", "Metrics"] },

    { id: "af-container", lane: "af", type: "project", date: "2025-12", approx: true,
      title: "Container Security Plan",
      challenge: "Container use on secure networks needed a security plan that development, operations, and leadership could all sign off on.",
      approach: "Led a year-long effort with about 12 stakeholders from cyber operations, development, and AI/automation teams.",
      result: "Plan signed by the information security officer and **now in use**.",
      tags: ["Containers", "Policy"] },

    { id: "af-approvals", lane: "af", type: "achievement", date: "2026-01", approx: true,
      title: "Software approvals: about 350 days down to under 15",
      challenge: "Software requests moved on paper forms and took about 350 days on average.",
      approach: "Worked with operational teams to rebuild the process, moving from paper forms to digital workflows.",
      result: "Average request time **~350 days to under 15**. Final approvals went from 96 days to under 3, and annual approvals from **86 in 2025 to 600+ in the first half of 2026**. Adopted across the organization’s networks.",
      tags: ["Process improvement", "Change control"] },

    { id: "af-vuln", lane: "af", type: "project", date: "2025-04",
      title: "Vulnerability Management Plan",
      challenge: "Get many operational and security teams to agree on one patching approach.",
      approach: "Held 14 stakeholder meetings over 6 months to write the plan, then led recurring patching syncs.",
      result: "**33% reduction in vulnerability exposure.** The plan is being adopted across a multi-site directorate.",
      tags: ["Vulnerability management", "Stakeholders"] },

    { id: "af-quarter", lane: "af", type: "achievement", date: "2026-09",
      title: "Support of the Quarter award",
      challenge: "Security technical implementation guide (STIG) assessments were a labor-intensive, administrative process for every evaluation cycle.",
      approach: "Independently architected and deployed a browser-based STIG dashboard with a “zero-footprint” design that runs entirely inside local browser sessions, so sensitive compliance data is processed without leaving the user’s machine and the tool stays within strict operational security standards. It maps findings to NIST Risk Management Framework control families and generates risk metrics automatically.",
      result: "Turned a manual process into an **automated, one-step analysis**, eliminated substantial administrative overhead each evaluation cycle, and bridged the gap between technical vulnerabilities and executive risk decisions. Recognized with the **Support of the Quarter** award for technical innovation and customer-focused leadership.",
      tags: ["Award", "STIG", "RMF", "Automation"] },

    { id: "af-cert-rev5", lane: "af", type: "achievement", date: "2026-07", when: "July 14, 2026",
      title: "Certificate of Achievement for the NIST SP 800-53 Rev 5 transition",
      challenge: "A newly mandated move to NIST SP 800-53 Revision 5 meant assessing a comprehensive baseline of **1,198 security and privacy controls** without holding up the organization’s capabilities.",
      approach: "Evaluated the full baseline control by control and coordinated proactively across the organization, in the Information Systems Security Manager role from May to July 2026.",
      result: "The organization deployed critical capabilities **on schedule** while raising the system’s security posture to the latest federal standard. Recognized with a **Certificate of Achievement from the Department of the Air Force**.",
      tags: ["Award", "NIST 800-53", "Rev 5", "RMF"] },

    /* ---------------- Utah State University ---------------- */
    { id: "usu-grc", lane: "usu", type: "project", date: "2022-09", approx: true,
      title: "Custom GRC platform in Jira",
      challenge: "The university had no single place to track compliance and risk metrics.",
      approach: "Built a custom GRC platform in Jira while negotiating the ServiceNow GRC contract.",
      result: "Program compliance and risk metrics tracked in one place and reported to executive leadership.",
      tags: ["GRC", "Jira"] },

    { id: "usu-purple", lane: "usu", type: "project", date: "2022-11", approx: true,
      title: "Red and purple team exercises",
      challenge: "Responders needed realistic practice and detections needed tuning.",
      approach: "Led internal red and purple team exercises with about 20 interns, security, and IT staff, aligned to OWASP, CIS CSC, and PCI. Built SOC metrics, scorecards, playbooks, and SOPs.",
      result: "Better-trained responders, improved detections, and documented procedures.",
      tags: ["Incident response", "Training"] },

    { id: "usu-program", lane: "usu", type: "project", date: "2023-02", approx: true,
      title: "University information security program",
      challenge: "Build a security program to meet FISMA and the Utah Cybersecurity Affirmative Defense Act across many siloed departments.",
      approach: "Worked with disparate teams on policies, standards, and procedures, prioritized risk findings, and reported candidly to the CIO and executive leadership.",
      result: "Laid the groundwork to enable objective, measurable compliance audits and better collaboration and accountability between previously siloed departments. The program was not completed before I left.",
      tags: ["FISMA", "UCADA", "Program"] },

    /* ---------------- Merrick Bank ---------------- */
    { id: "mb-vuln", lane: "mb", type: "achievement", date: "2019-12", approx: true,
      title: "Vulnerability management rebuilt from the ground up",
      challenge: "Low scanning coverage and slow remediation at a top-20 Visa card issuer.",
      approach: "Rebuilt the threat and vulnerability management program with new controls, standards, processes, and meaningful KPIs.",
      result: "Within the first year: scanning coverage **13% to 99%+**, remediation compliance **13% to 95%+**, CIS benchmark compliance **35% to 75%**.",
      tags: ["Vulnerability management", "Metrics"] },

    { id: "mb-cloud", lane: "mb", type: "project", date: "2020-03", approx: true,
      title: "Cloud application security controls",
      challenge: "The bank’s critical cloud applications and endpoints needed consistent protection.",
      approach: "Led deployments of Netskope CASB, Azure and M365 controls, Microsoft Defender, Thycotic PAM, SailPoint, and ServiceNow.",
      result: "New controls on **90%+ of endpoints** and improved protection of **100% of critical cloud applications**.",
      tags: ["Cloud", "Identity"] },

    { id: "mb-reporting", lane: "mb", type: "project", date: "2020-09", approx: true,
      title: "Reporting for every audience",
      challenge: "Different audiences, from operations teams to the board, needed different views of the same data.",
      approach: "Built daily dashboards, weekly IT manager reports, monthly executive KPIs, and quarterly board updates, with a custom Python application to automate metric collection.",
      result: "Cut the vulnerability project’s weekly stakeholder meeting from **2 hours to a few minutes** in Slack.",
      tags: ["Metrics", "Reporting"] },

    /* ---------------- UpWell Health ---------------- */
    { id: "uw-program", lane: "uw", type: "project", date: "2018-02", approx: true,
      title: "Security program on the NIST Cybersecurity Framework",
      challenge: "A healthcare company needed a program that could lead to HIPAA and HITRUST compliance.",
      approach: "Led a team of 13 and wrote all cyber and IT policies, standards, and procedures.",
      result: "A complete security program and documentation set aligned to NIST CSF, HIPAA, and HITRUST.",
      tags: ["HIPAA", "HITRUST", "NIST CSF"] },

    { id: "uw-hackwest", lane: "uw", type: "achievement", date: "2018-06", approx: true,
      title: "First place in the HackWest SLC cyber wargames",
      summary: "The company sponsored me to attend HackWest SLC, where my team took first place in the Cyber Security Wargames.",
      tags: ["Competition"] },

    { id: "uw-training", lane: "uw", type: "project", date: "2018-09", approx: true,
      title: "In-person security training for 900+ employees",
      challenge: "Phishing and data loss incidents were a steady source of risk.",
      approach: "Researched, developed, and delivered semi-annual in-person cybersecurity training.",
      result: "Trained **900+ employees** and cut phishing and DLP incidents by nearly **50%**.",
      tags: ["Awareness", "Training"] },

    { id: "uw-sde", lane: "uw", type: "project", date: "2018-11", approx: true,
      title: "Sensitive data environment",
      challenge: "Customer health records and payment card data needed stronger isolation.",
      approach: "Led the design and construction of a Sensitive Data Environment, mentoring IT and security staff in secure architecture, privileged access management, and zero trust.",
      result: "A dedicated environment for health records and payment card information.",
      tags: ["Architecture", "Zero trust"] },

    { id: "uw-paw", lane: "uw", type: "project", date: "2018-04", approx: true,
      title: "Privileged access architecture",
      challenge: "Administrator credentials are the most valuable target in a Windows environment, and everyday administration from ordinary workstations exposed them to theft, replay and pivoting, and privilege escalation.",
      approach: "Designed a privileged access architecture around hardened Privileged Access Workstations: dedicated physical devices (Windows 10 Enterprise, TPM 2.0, Hyper-V and Credential Guard) used only for administration, with a separate VM for internet and email so the admin host stays a clean source. Layered on Active Directory controls: logon restrictions, authentication policies and silos, AppLocker, BitLocker, LAPS, Just Enough and Just-in-Time Administration, and Windows Firewall with IPsec domain isolation.",
      result: "A repeatable baseline of Group Policy templates and step-by-step walkthroughs (36 GPOs built just for PAWs) that gives IT teams a defense-in-depth model for administering domain controllers, servers, workstations, network equipment and cloud portals. I published it as an open-source repository.",
      link: { url: "https://github.com/utsecnet/PAW", label: "PAW baseline templates on GitHub" },
      tags: ["Privileged access", "Active Directory", "Credential Guard", "Defense in depth"] },

    /* ---------------- StorageCraft ---------------- */
    { id: "sc-8021x", lane: "sc", type: "project", date: "2013-06", approx: true,
      title: "Global secure network build",
      challenge: "The company needed a secure global network, built from the ground up, to connect its offices and protect staff and devices.",
      approach: "Led the full acquisition and build of new HP Enterprise network infrastructure worldwide: site-to-site IPsec VPNs between locations, secure routing, and enterprise wired and wireless networks with certificate-based 802.1X authentication.",
      result: "A secure, global network linking every site, with authenticated, certificate-based access for staff and devices.",
      tags: ["Network security", "IPsec VPN", "Secure routing", "HP Enterprise", "802.1X"] },

    { id: "sc-docs", lane: "sc", type: "project", date: "2015-06", approx: true,
      title: "IT Ops documentation repository",
      challenge: "Document every newly deployed and existing (retroactive) service and piece of infrastructure.",
      approach: "Built Confluence templates for system architecture and configuration, wrote procedures for finding information and navigating the repository, and designed Jira workflows to keep the documentation current over its lifetime.",
      result: "A hierarchical documentation repository for StorageCraft’s global IT department that described and diagrammed every installed network service, the IT Ops infrastructure, and the roles and responsibilities of the IT team.",
      tags: ["Documentation", "Confluence", "Jira", "IT operations"] },

    { id: "sc-defcon", lane: "sc", type: "achievement", date: "2014-08",
      title: "DEF CON: the turn to full-time cybersecurity",
      summary: "Attended DEF CON in August 2014 and came away certain that security was the work I wanted to do. I changed my career direction from general IT to cybersecurity full time, and my career has been in security ever since.",
      tags: ["Career", "Cybersecurity", "DEF CON"] },

    { id: "sc-siem", lane: "sc", type: "project", date: "2014-06", approx: true,
      title: "Proactive monitoring and incident response",
      challenge: "Administrators needed useful alerts, not noise.",
      approach: "Deployed OSSIM (SIEM), OSSEC (HIDS), and Nagios, and tuned each sensor to report only what administrators need to know.",
      result: "Proactive monitoring and incident response across the company’s systems.",
      tags: ["SIEM", "Monitoring"] },

    { id: "sc-rbac", lane: "sc", type: "achievement", date: "2015-09", approx: true,
      title: "Automated access control cut tickets by 40%+",
      challenge: "Helpdesk ticket metrics exposed a gap in role-based group management.",
      approach: "Led the 6-person IT helpdesk team, then automated role-based access control (RBAC) in the identity management system.",
      result: "Ticket volume down by **over 40%**.",
      tags: ["Identity", "Automation"] },

    { id: "sc-o365", lane: "sc", type: "project", date: "2016-09", approx: true,
      title: "Secure Office 365 migration",
      challenge: "Move to Office 365 without weakening security.",
      approach: "Key role in the migration, using Intune MDM, SharePoint Online DLP policies, and Azure Conditional Access.",
      result: "Cloud collaboration with device management, data loss prevention, and conditional access in place.",
      tags: ["Cloud", "DLP"] },

    { id: "sc-vuln", lane: "sc", type: "project", date: "2017-03", approx: true,
      title: "Vulnerability management built around containers",
      challenge: "Patching and failovers caused downtime on critical systems.",
      approach: "Partnered with the Cloud DevOps team and IT leadership to build the program around containerizing critical architecture.",
      result: "Less downtime during patching and failovers.",
      tags: ["Vulnerability management", "Containers"] },

    /* ---------------- Nine Year Mortgage ---------------- */
    { id: "nym-dr", lane: "nym", type: "project", date: "2010-09", approx: true,
      title: "Disaster recovery plan and automated imaging",
      challenge: "Recovery and workstation setup were manual and slow.",
      approach: "Designed the disaster recovery plan, including rsync backups, server and workstation imaging with open source tools, and full documentation.",
      result: "Help desk requests reduced by **up to 75%** through automated workstation cloning.",
      tags: ["Disaster recovery", "Automation"] },

    { id: "nym-savings", lane: "nym", type: "achievement", date: "2011-03", approx: true,
      title: "Saved over $125,000 with open source",
      challenge: "Licensing and hardware costs were high.",
      approach: "Virtualized infrastructure, consolidated server roles, and migrated the phone system to an in-house PBX using open source software.",
      result: "More than **$125,000** saved in licensing and hardware costs.",
      tags: ["Cost savings", "Virtualization"] },

    /* ---------------- McKinnon-Mulherin ---------------- */
    { id: "mm-utm", lane: "mm", type: "project", date: "2009-09", approx: true,
      title: "Linux-based network security stack",
      challenge: "Protect company servers and a client’s remote site.",
      approach: "Secured the network with Linux-based UTM devices (stateful firewall, Snort IPS/IDS, Squid proxy, DMZ) and a client remote site with L2TP over SSL VPN and firewall ACLs.",
      result: "Layered network protection for the company and a secured remote site.",
      tags: ["Network security", "IPS/IDS"] },

    /* ---------------- Utah Valley University ---------------- */
    { id: "uvu-cna", lane: "uvu", type: "cert", date: "2010",
      title: "Certified Network Administrator (CNA)", summary: "Certified Network Administrator, earned through Utah Valley University.", tags: ["Networking"] },
    { id: "uvu-bs", lane: "uvu", type: "degree", date: "2012-12",
      title: "B.S. Information Technology, Cybersecurity", summary: "Bachelor of Science in Information Technology with a cybersecurity focus, Utah Valley University.", tags: ["Education"] },

    /* ---------------- Western Governors University ---------------- */
    { id: "wgu-ms", lane: "wgu", type: "degree", date: "2020-01",
      title: "M.S. Cybersecurity & Information Assurance", summary: "Master of Science in Cybersecurity and Information Assurance, Western Governors University.", tags: ["Education"] },
    { id: "wgu-paper", lane: "wgu", type: "achievement", date: "2019-12",
      title: "Capstone of Excellence and published paper",
      summary: "Awarded the Capstone of Excellence for my vulnerability management research. The paper, “When the Vulnerability Management Program is Vulnerable,” is published in the university’s excellence archive.", tags: ["Publication", "Vulnerability management"] },

    /* ---------------- Certifications & training ---------------- */
    { id: "c-aplus", lane: "creds", type: "cert", date: "2007",
      title: "CompTIA A+", summary: "CompTIA A+ IT Technician and A+ Essentials certifications.", tags: ["CompTIA"] },
    { id: "c-nplus", lane: "creds", type: "cert", date: "2008",
      title: "CompTIA Network+", summary: "CompTIA Network+ certification.", tags: ["CompTIA"] },
    { id: "c-crucial", lane: "creds", type: "cert", date: "2015",
      title: "Crucial Conversations & Crucial Confrontations", summary: "Coaching in Crucial Conversations and Crucial Confrontations, 2013 to 2015.", tags: ["Leadership"] },
    { id: "c-cissp", lane: "creds", type: "cert", date: "2017-10",
      title: "CISSP", summary: "Certified Information Systems Security Professional (ISC2), certified since 2017 and in good standing through the current cycle.", tags: ["ISC2"] },
    { id: "c-ldi", lane: "creds", type: "cert", date: "2019",
      title: "LDI and LDI+ Leadership Development", summary: "Leadership Development Institute (LDI) and LDI+ Personal Leadership programs from AIM Utah, 2019 to 2022.", link: { url: "https://www.aimutah.org/", label: "AIM Utah" }, tags: ["Leadership"] },
    { id: "c-issmp", lane: "creds", type: "cert", date: "2025-04",
      title: "CISSP-ISSMP", summary: "Information Systems Security Management Professional (ISC2), the management concentration of the CISSP, earned April 2025.", tags: ["ISC2", "Management"] },
    { id: "c-slii", lane: "creds", type: "cert", date: "2025",
      title: "Situational Leadership II (SLII)", summary: "Situational Leadership II training, 2025.", tags: ["Leadership"] },
    { id: "c-lwp", lane: "creds", type: "cert", date: "2026-10", when: "October 19–20, 2026",
      title: "Leading with Purpose Backed by Data",
      summary: "Two-day leadership course from Technical Management Services. It pairs purpose-driven leadership (finding meaning in the work, writing a personal leadership statement, and connecting people’s values to the mission) with practical data skills for leaders: data literacy, preparing data for analysis, avoiding common analysis mistakes, data governance, choosing public-sector KPIs, data storytelling and visualization, and solving problems with data. It closes with a readiness assessment, strategies for building curiosity and continuous learning, and an action plan, using federal case studies including a VA wait-time improvement and the DAF Data Strategy.",
      tags: ["Leadership", "Data-informed decisions"] }
  ]
};
