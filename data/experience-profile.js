/* Experience profile for Richard Johnson (DRAFT v1, built from the October 2026 interview).
   Public-safe wording only: no phone, email, credential IDs, clearance, audit results, risk-model weights,
   or reasons a prior team left. status:'confirm' items are NOT to be shown until Richard confirms them.
   verbs rank how much ownership he had: used/advised 1, operated/wrote 2, led 3, built/owned 4, set-the-method 5. */
window.EXPERIENCE = (function () {
  var VERB = { used: 1, advised: 1, operated: 2, wrote: 2, taught: 2, led: 3, built: 4, owned: 4, method: 5 };

  /* Depth scale (shown to visitors as five dots):
     1 Aware: used or read the framework, no ownership
     2 Practitioner: did the work as part of a role
     3 Owner: owned the function at an employer
     4 Builder: built or rebuilt it at two or more employers, or at scale, and led others doing it
     5 Authority: set the method others follow (published, adopted org-wide, or taught) */
  var SCALE = [
    [1, 'Aware', 'Used or studied it'],
    [2, 'Practitioner', 'Did the work as part of a role'],
    [3, 'Owner', 'Owned the function at an employer'],
    [4, 'Builder', 'Built or rebuilt it at two or more employers, or at scale, and led others doing it'],
    [5, 'Authority', 'Set the method others follow: published, adopted across an organization, or taught']
  ];

  var roles = [
    { id: 'usaf', org: 'U.S. Air Force', title: 'Information Systems Security Manager', dates: '10/2023 – Present', from: 2023, to: 2026, sector: 'Federal / defense',
      lead: { kind: 'program', n: 18, note: 'Directs the work of 18 ISSOs (3 contractors); program authority, none report on paper' },
      reportsTo: 'System owner and authorizing official', note: 'ISSO for the first year, then ISSM. Oversees isolated networks; one moved to another ISSM after its ATO.' },
    { id: 'usu', org: 'Utah State University', title: 'Information Security Officer', dates: '4/2022 – 3/2023', from: 2022, to: 2023, sector: 'Higher education (R1 research university)',
      lead: { kind: 'sole', n: 1, note: 'Sole security officer; worked across colleges and departments' }, reportsTo: 'CIO' },
    { id: 'merrick', org: 'Merrick Bank', title: 'Manager, Information Security', dates: '3/2019 – 2/2022', from: 2019, to: 2022, sector: 'Banking (top-20 Visa card issuer)',
      lead: { kind: 'supervisor', n: 8, hired: 4, note: '8 direct reports; hired 4; promoted from Sr. Engineer to Manager within 5 months' }, reportsTo: 'CISO' },
    { id: 'upwell', org: 'UpWell Health', title: 'Sr. Information Security Engineer (Team Lead)', dates: '10/2017 – 2/2019', from: 2017, to: 2019, sector: 'Healthcare (national health company)',
      lead: { kind: 'lead', n: 13, note: 'Led a team of 13 (project direction and workload); no direct reports' }, reportsTo: 'Director of Information Systems' },
    { id: 'storagecraft', org: 'StorageCraft', title: 'Sr. Information Security Engineer (Team Lead)', dates: '8/2011 – 9/2017', from: 2011, to: 2017, sector: 'Technology (about 450 employees, 6 global sites)',
      lead: { kind: 'lead', n: 6, note: 'Team lead of a 6-person helpdesk and its escalation point; later trained and handed IT operations to new sysadmins; no direct reports' }, reportsTo: 'Director of IT',
      note: 'Sr. Systems Security Administrator until 2013, then Sr. Information Security Engineer (Team Lead).' },
    { id: 'nym', org: 'Nine Year Mortgage (formerly No More Mortgage)', title: 'Network Engineer / Security Administrator', dates: '3/2010 – 7/2011', from: 2010, to: 2011, sector: 'Financial services', early: true },
    { id: 'pulc', org: 'Power Users LLC', title: 'Founder and CEO', dates: '12/2008 – 8/2011', from: 2008, to: 2011, sector: 'IT and security consulting', early: true,
      note: 'Three full-time clients for the life of the business (one was a contract server-admin job); sold the clients after starting at StorageCraft.' },
    { id: 'qenets', org: 'Quality Engineered Networks (QeNETS)', title: 'Network Administrator', dates: '1/2007 – 7/2008', from: 2007, to: 2008, sector: 'IT consulting', early: true },
    { id: 'ebc', org: 'EBC Computers', title: 'Depot Technician and Branch Manager', dates: '8/2006 – 1/2007', from: 2006, to: 2007, sector: 'Retail IT repair', early: true,
      lead: { kind: 'supervisor', n: 8, note: 'Supervised 8 technicians' } },
    { id: 'mission', org: 'Volunteer service, Fukuoka, Japan', title: 'Full-time volunteer missionary', dates: '7/2004 – 7/2006', from: 2004, to: 2006, sector: 'Service', early: true,
      lead: { kind: 'lead', n: 12, note: 'Led teams of up to 12; reported weekly results; ran weekly training' }, note: 'Fluent in Japanese.' },
    { id: 'vortex', org: 'Vortex Data Systems', title: 'Computer Repair Technician', dates: '2002 – 2003', from: 2002, to: 2003, sector: 'IT repair', early: true },
    { id: 'sbc', org: 'SBC (Southwestern, Pacific and Nevada Bell)', title: 'ADSL Technical Support Representative', dates: '1997 – 2001', from: 1997, to: 2001, sector: 'Telecom', early: true }
  ];

  var areas = [
    { id: 'lead', name: 'People & Team Leadership', since: 2004, to: 2026, level: 4,
      why: 'Directly supervised 16 people across two roles and hired 4; led 6, 13 and 18 more without supervising them; rebuilt a security team from the ground up.' },
    { id: 'risk', name: 'Risk, Compliance & Audit', since: 2011, to: 2026, level: 4,
      why: 'Fifteen years of compliance work across SOC 2, HIPAA/HITRUST, FDIC/PCI, FISMA and RMF; wrote the risk method every ISSO now uses; RMF/ATO specifically is 3 years.' },
    { id: 'vuln', name: 'Vulnerability & Exposure Management', since: 2011, to: 2026, level: 5,
      why: 'Built or rebuilt the program at three employers; published capstone with an award; plan adopted across a multi-site directorate; vendor adopted features he asked for.' },
    { id: 'iam', name: 'Identity & Privileged Access', since: 2011, to: 2026, level: 4,
      why: 'Built tiered-admin/PAM from scratch at UpWell, architected and selected PAM at Merrick, automated RBAC at StorageCraft, wrote the ICAM plan at the Air Force.' },
    { id: 'arch', name: 'Secure Architecture & Zero Trust', since: 2012, to: 2022, level: 4,
      why: 'Designed the sensitive-data environments at UpWell and Merrick (tiered access, VDI zones, Okta boundaries) and built StorageCraft’s certificate-based network access.' },
    { id: 'infra', name: 'Network & Systems Engineering', since: 2006, to: 2017, level: 4, handsOn: false,
      why: 'Owned a 6-site, ~1,500-server environment at StorageCraft and built networks from scratch at four earlier employers. Last hands-on in 2017; leadership only since.' },
    { id: 'cloud', name: 'Cloud & SaaS Security', since: 2015, to: 2022, level: 3, handsOn: false,
      why: 'Led the Microsoft 365 migration and architected the Netskope rollout. Commercial cloud only: no AWS, GCP or DoD cloud.' },
    { id: 'detect', name: 'Detection & Incident Response', since: 2012, to: 2026, level: 3,
      why: 'Built the monitoring and SIEM stack at StorageCraft and the incident response program at Utah State; worked a critical incident at Merrick and about a dozen low/moderate cases at the Air Force.' },
    { id: 'program', name: 'Security Program & Policy Building', since: 2011, to: 2026, level: 4,
      why: 'Wrote the policy set or full program at StorageCraft, UpWell and Utah State and the plan set at the Air Force.' },
    { id: 'metrics', name: 'Metrics & Executive Reporting', since: 2014, to: 2026, level: 4,
      why: 'Built the metrics system, dashboards and reporting cadence at Merrick and the Air Force; briefs senior officials weekly and annually.' },
    { id: 'process', name: 'Process Improvement & Automation', since: 2008, to: 2026, level: 5,
      why: 'Repeated measurable wins over 18 years (75%, 40%, 5 hours to zero, 350 to under 15 days); the latest was adopted across an organization.' },
    { id: 'pm', name: 'Project & Program Management', since: 2015, to: 2026, level: 3,
      why: 'Built the Jira/Confluence platform at Merrick, helped build the organization-wide process at the Air Force, and manages projects as ISSM without a formal PMO.' },
    { id: 'training', name: 'Training, Mentoring & Teaching', since: 2004, to: 2026, level: 3,
      why: 'Trained 900+ employees in person, taught trainers, ran hunting trainings, and mentors every team he leads.' }
  ];

  /* Evidence. a = areas (first is primary); v = verb; top = headline item; s: 'ok' | 'confirm' */
  var evidence = [
    /* U.S. Air Force */
    { id: 'usaf-1', r: 'usaf', a: ['process', 'metrics'], v: 'built', top: 1, m: ['350 → <15 days', '86 → 600+'], s: 'ok',
      t: `Redesigned the software approval process within change management, moving from paper forms to automated workflows and cutting average request time from ~350 days to under 15 and final approval time from 96 days to under 3. Approvals rose from 86 in 2025 to **600+** in the first half of 2026, and the process has been adopted across the organization’s networks.` },
    { id: 'usaf-2', r: 'usaf', a: ['risk', 'program'], v: 'owned', top: 1, s: 'ok',
      t: `Delivered a new authorization to operate (ATO) for a major lab environment **two months ahead of target** and kept two more ATOs current, **all on time**, after gathering requirements with program stakeholders and writing the policies and procedures for each control family.` },
    { id: 'usaf-3', r: 'usaf', a: ['risk', 'process', 'metrics'], v: 'built', s: 'ok',
      t: `Led the migration of two authorization packages (**900+ NIST SP 800-53 controls**) to Rev 5 **ahead of schedule**, rebuilding continuous monitoring and POA&M workflows and adding live dashboards that show leadership the top risks and control status at any time.` },
    { id: 'usaf-4', r: 'usaf', a: ['risk', 'metrics'], v: 'method', top: 1, s: 'ok',
      t: `Designed a quantitative residual-risk method that adds process maturity, mitigating factors and control weight to NIST 800-30. **Every ISSO uses it**; it sorts every POA&M and drives each decision to mitigate or accept, and results go to the assessor and the authorizing official.` },
    { id: 'usaf-5', r: 'usaf', a: ['lead', 'risk'], v: 'led', top: 1, m: ['18 ISSOs'], s: 'ok',
      t: `Direct the work of **18 information system security officers** (3 contractors) across isolated networks, assigning and prioritizing work and giving final review to every authorization artifact before it reaches senior leadership. The authority is program authority; none report to me on paper, all report progress to me.` },
    { id: 'usaf-6', r: 'usaf', a: ['lead', 'metrics'], v: 'owned', s: 'ok',
      t: `Final decision authority on the Change Control Board and a key stakeholder on the POA&M and vulnerability steering committees; run daily stand-ups and weekly scrums, brief the system owner and assessor **weekly**, and brief the authorizing official and directorate leadership about **annually**.` },
    { id: 'usaf-7', r: 'usaf', a: ['vuln', 'program', 'metrics'], v: 'built', top: 1, m: ['33% less exposure'], s: 'ok',
      t: `Wrote the organization’s Vulnerability Management Plan from 14 stakeholder meetings over 6 months, then led recurring patching syncs that contributed to a **33% reduction in vulnerability exposure**. The plan is being adopted across a multi-site directorate.` },
    { id: 'usaf-8', r: 'usaf', a: ['metrics', 'vuln'], v: 'built', s: 'ok',
      t: `Built custom Grafana dashboards (Python pulling from the scanner API into a database) combining vulnerability scans and STIG findings. About **50 IT and cyber staff** use them to prioritize remediation and plan configuration work.` },
    { id: 'usaf-9', r: 'usaf', a: ['pm', 'process'], v: 'built', s: 'ok',
      t: `Helped senior leadership build the organization’s project management process in Jira and Confluence (meeting cadence, backlog reviews, workflows, automations). As ISSM I also act as project manager for many efforts, since there is no formal PMO.` },
    { id: 'usaf-10', r: 'usaf', a: ['program', 'arch'], v: 'led', s: 'ok',
      t: `Led a year-long effort with about 12 stakeholders across cyber operations, development and AI/automation teams to write the Container Security Plan, now approved and in use.` },
    { id: 'usaf-11', r: 'usaf', a: ['program', 'iam'], v: 'wrote', s: 'ok',
      t: `Wrote the organization’s identity, credential and access management (ICAM) plan, plus the risk assessment plan and the policies and procedures for the Rev 5 packages. Planning is under way for tiered administration and privileged access workstations on the isolated networks.` },
    { id: 'usaf-12', r: 'usaf', a: ['lead', 'training'], v: 'led', s: 'ok',
      t: `Defined success criteria and led a rotating IT and cyber team that built a training environment for 200 new hires and interns waiting on clearances.` },
    { id: 'usaf-13', r: 'usaf', a: ['detect'], v: 'operated', s: 'ok',
      t: `Part of nearly a dozen insider-threat incident responses (all low to moderate severity).` },

    /* Utah State */
    { id: 'usu-1', r: 'usu', a: ['program', 'risk'], v: 'built', top: 1, s: 'ok',
      t: `Built the university’s cybersecurity program from the ground up as its sole security officer, working with colleges and departments (Legal, Compliance, Audit, IT, Research) to write the policies, standards and procedures for FISMA, the Utah Cybersecurity Affirmative Defense Act, NIST 800-171 and CIS, and delivered it before I left.` },
    { id: 'usu-2', r: 'usu', a: ['risk', 'metrics'], v: 'led', s: 'ok', m: ['44% → 85%'],
      t: `Prioritized risk findings and oversaw remediation, raising compliance from **44% to 85%** in the first year, and reported to the CIO and executive leadership in candid reports written for non-technical audiences.` },
    { id: 'usu-3', r: 'usu', a: ['detect'], v: 'built', s: 'ok',
      t: `Built the incident response program: playbooks based on CISA templates, SOC metrics, scorecards and SOPs, with training for IT and security staff. Managed the risk from findings in the multi-university USHE penetration-testing exercises and sat in remediation planning.` },
    { id: 'usu-4', r: 'usu', a: ['process', 'metrics'], v: 'built', s: 'ok',
      t: `Built a custom GRC platform in Jira to track compliance and risk metrics while negotiating the ServiceNow GRC contract.` },

    /* Merrick Bank */
    { id: 'mer-1', r: 'merrick', a: ['lead'], v: 'built', top: 1, m: ['8 direct reports', '4 hired'], s: 'ok',
      t: `Rebuilt the security team from the ground up with the CISO. **8 direct reports**, **4 hired by me** (all stayed through my tenure; one succeeded me and is now a director). Handled hiring, onboarding, scheduling, appraisals and coaching, and wrote the career paths and role requirements (similar to DoD 8570).` },
    { id: 'mer-2', r: 'merrick', a: ['vuln', 'metrics'], v: 'method', top: 1, m: ['13% → 99%+ coverage'], s: 'ok',
      t: `Rebuilt a broken vulnerability program (the subject of my published capstone): scanning coverage rose from 13% to **99%+**, remediation compliance from 13% to **95%+**, and CIS benchmark compliance from 35% to **75%** in the first year. Found that under 70% of Windows devices authenticated to scans and under 30% of those reported accurate results, fixed it, wrote the Vulnerability Management Standard, and got executive-approved SLAs reviewed at the board each quarter.` },
    { id: 'mer-3', r: 'merrick', a: ['vuln', 'process'], v: 'owned', s: 'ok',
      t: `Consolidated two disagreeing scanners (Rapid7 and Ivanti) onto Tanium after testing showed fewer false findings. It also provided asset inventory and CIS baseline scanning for about 1,300 assets, and the teams preferred it.` },
    { id: 'mer-4', r: 'merrick', a: ['metrics', 'process'], v: 'built', s: 'ok',
      t: `Built a custom control-assurance application (Python, MySQL, Grafana) that turned several-thousand-page scan reports into strategic, operational and tactical KPIs with drill-downs. Reported daily to operations, weekly to my CISO, monthly to executives, and through the CISO to the board each quarter, and cut the vulnerability project’s weekly meeting from 2 hours to a few minutes in Slack.` },
    { id: 'mer-5', r: 'merrick', a: ['iam', 'arch'], v: 'built', top: 1, m: ['~50 admins, ~200 accounts'], s: 'ok',
      t: `Architected and selected the privileged access program (about **50 admins and 200 privileged accounts**) after evaluating Microsoft PAM, Thycotic, CyberArk and Centrify. Designed it around the Microsoft Enterprise Access Model and the card-data environment; my team built and ran it. Privileged accounts in the card-data environment are now fully isolated.` },
    { id: 'mer-6', r: 'merrick', a: ['iam', 'risk'], v: 'owned', s: 'ok',
      t: `Ran quarterly access reviews with SailPoint across 60+ file shares and about 15 applications (mostly public web services and the card-data environment), and the user provisioning and deprovisioning that feeds PAM.` },
    { id: 'mer-7', r: 'merrick', a: ['arch', 'iam'], v: 'built', s: 'ok',
      t: `Designed the network and access architecture for the sensitive card-data environment: Microsoft Enterprise Access Model zones, VDI between zones, and Okta as the identity layer that authenticates and crosses zone boundaries.` },
    { id: 'mer-8', r: 'merrick', a: ['cloud', 'arch'], v: 'built', top: 1, s: 'ok',
      t: `Architected and deployed the Netskope CASB with my team: allow-listed cloud apps and specific tenants, reverse-proxied the bank’s Microsoft 365, Jira, Confluence and Okta tenants so only bank-managed assets can reach them, and DLP rules for card numbers, SSNs and a keyword list. 100% of critical cloud apps were covered.` },
    { id: 'mer-9', r: 'merrick', a: ['risk'], v: 'operated', s: 'ok',
      t: `Supported FDIC and PCI audits and used FFIEC CAT and CIS to assess controls; evaluated third-party products to shorten the time to deploy controls.` },
    { id: 'mer-10', r: 'merrick', a: ['detect', 'lead'], v: 'led', s: 'ok',
      t: `Managed my team’s part of a critical incident, in which indicators of compromise were found on a database server that was unpatched when I arrived: hardening, baselines and proof that the controls were deployed.` },
    { id: 'mer-11', r: 'merrick', a: ['pm', 'training'], v: 'built', s: 'ok',
      t: `Built the Jira and Confluence platform (workflows and project hierarchy) for the PMO, IT operations and security, set the meeting flow, and taught the trainers who taught employees to use it.` },

    /* UpWell Health */
    { id: 'upw-1', r: 'upwell', a: ['iam', 'arch'], v: 'built', top: 1, m: ['~2,000 servers, 13 admins, 16 months'], s: 'ok',
      t: `Built a tiered administration model from scratch (Microsoft red forest, 13 privileged access workstations, step-up MFA) over **16 months**, covering about **2,000 servers, 600 workstations and 13 administrators**. It was fully working.` },
    { id: 'upw-2', r: 'upwell', a: ['program', 'risk'], v: 'built', s: 'ok',
      t: `Built the security program as the path to HIPAA and HITRUST, implementing controls from NIST CSF and writing all cyber and IT policies, standards and procedures. Supported the HIPAA, HITRUST and SOC auditors.` },
    { id: 'upw-3', r: 'upwell', a: ['training', 'metrics'], v: 'built', top: 1, m: ['900+ trained', '~50% fewer incidents'], s: 'ok',
      t: `Cut phishing and DLP incidents by nearly **50%** with semi-annual in-person training for **900+ employees** plus awareness training on the Ninjio platform. Measured by counting clicks to new and malware domains at the firewall before and after.` },
    { id: 'upw-4', r: 'upwell', a: ['lead'], v: 'led', top: 1, m: ['13 led'], s: 'ok',
      t: `Led a team of 13 as team lead: set project direction and workload across IT and security without being their supervisor.` },
    { id: 'upw-5', r: 'upwell', a: ['vuln'], v: 'operated', s: 'ok',
      t: `Ran the Rapid7 scanning platform and Shavlik patching, with after-hours patching of Windows and Linux servers across 6 data centers.` },
    { id: 'upw-6', r: 'upwell', a: ['detect', 'training'], v: 'taught', s: 'ok',
      t: `Taught weekly threat-hunting sessions (hunting for indicators of compromise and mapping techniques in ATT&CK Navigator). My team of about 8 won a regional cyber wargame by taking the other team’s stack down so it could neither defend nor attack.` },
    { id: 'upw-7', r: 'upwell', a: ['arch', 'cloud'], v: 'built', s: 'ok',
      t: `Led the design of the sensitive data environment for health records and card data, using Microsoft 365 and Intune.` },

    /* StorageCraft */
    { id: 'stc-1', r: 'storagecraft', a: ['infra', 'lead'], v: 'owned', top: 1, m: ['6 sites, ~1,500 servers, ~450 staff'], s: 'ok',
      t: `Owned networks, wireless, firewalls and site-to-site VPNs for **6 global sites**, ESX clusters and storage for **~1,500 servers** (mostly Linux), backups, the help desk and asset platforms, Docker and Kubernetes, Active Directory, and every security control for a company of about **450 people**.` },
    { id: 'stc-2', r: 'storagecraft', a: ['infra', 'arch'], v: 'built', s: 'ok',
      t: `Built wired and wireless 802.1X from the ground up with certificate-based user and device authentication, switch configurations and change detection through Nagios. It ran for years until the company was acquired.` },
    { id: 'stc-3', r: 'storagecraft', a: ['cloud', 'iam'], v: 'built', s: 'ok',
      t: `Lead architect of the Microsoft 365 migration: hybrid Azure AD, Intune MDM and MAM, Exchange Online and role-based conditional access.` },
    { id: 'stc-4', r: 'storagecraft', a: ['process', 'iam'], v: 'built', top: 1, m: ['40%+ fewer tickets'], s: 'ok',
      t: `Used help desk ticket metrics to expose a gap in role-based group management, then automated RBAC and user provisioning and deprovisioning in PowerShell, cutting ticket volume by **40%+**.` },
    { id: 'stc-5', r: 'storagecraft', a: ['process', 'infra'], v: 'built', s: 'ok',
      t: `Automated Linux with SaltStack: CIS baselines, server provisioning, service deployment, most patching and configuration files across the Linux fleet.` },
    { id: 'stc-6', r: 'storagecraft', a: ['vuln', 'process'], v: 'built', top: 1, m: ['5 hours/week → ~0'], s: 'ok',
      t: `Built the vulnerability program (weekly Nessus scans, automated third-party and OS patching, yearly third-party pentests) and moved critical services into containers, cutting patching downtime from about **5 hours a week to nearly zero**.` },
    { id: 'stc-7', r: 'storagecraft', a: ['detect', 'metrics'], v: 'built', s: 'ok',
      t: `Built a global IT and security operations monitoring platform: distributed Nagios/Centreon across 5 sites, OSSEC host intrusion detection, a SIEM (AlienVault, later a 3-node ELK cluster), with Grafana and Kibana dashboards.` },
    { id: 'stc-8', r: 'storagecraft', a: ['lead', 'training'], v: 'led', s: 'ok',
      t: `Led a 6-person help desk as team lead and escalation point, documented every platform in Jira and Confluence, trained new sysadmins and handed IT operations to them so I could focus on security.` },
    { id: 'stc-9', r: 'storagecraft', a: ['program', 'training'], v: 'wrote', s: 'ok',
      t: `Wrote security policies and procedures with Legal, delivered security training, and worked with SOC 2 assessors.` },

    /* Earlier career */
    { id: 'nym-1', r: 'nym', a: ['process', 'infra'], v: 'built', top: 1, m: ['$125K avoided', '75% fewer requests'], s: 'ok',
      t: `Replaced a $125K commercial phone-system quote with an open-source PBX and Cisco phones for about 55 users, and cut help desk requests by up to **75%** with automated workstation cloning.` },
    { id: 'nym-2', r: 'nym', a: ['infra', 'program'], v: 'built', s: 'ok',
      t: `Designed the company’s network and disaster recovery plan, monitored 200+ devices, and brought the company into PCI compliance.` },
    { id: 'pul-1', r: 'pulc', a: ['infra', 'lead'], v: 'owned', s: 'ok',
      t: `Founded and ran an IT and security consulting company with three full-time clients while attending university.` },
    { id: 'qen-1', r: 'qenets', a: ['infra'], v: 'owned', s: 'ok',
      t: `Administered up to 20 customer networks (300+ workstations, up to 26 domain controllers and Exchange servers) and won first place regionally at SkillsUSA computer repair.` },
    { id: 'ebc-1', r: 'ebc', a: ['lead', 'infra'], v: 'led', s: 'ok',
      t: `Managed a branch and supervised 8 technicians.` },
    { id: 'mis-1', r: 'mission', a: ['lead', 'training'], v: 'led', s: 'ok',
      t: `Led teams of up to 12, ran weekly training, reported results weekly, and became fluent in Japanese.` }
  ];

  var frameworks = [
    { name: 'NIST SP 800-53 (Rev 4 and 5)', level: 'Built · Assessed', where: 'U.S. Air Force' },
    { name: 'RMF (Risk Management Framework)', level: 'Built · Assessed', where: 'U.S. Air Force' },
    { name: 'NIST SP 800-171', level: 'Built · Assessed', where: 'Utah State' },
    { name: 'HIPAA and HITRUST', level: 'Built · Worked with assessors', where: 'UpWell Health' },
    { name: 'CIS Controls', level: 'Built · Assessed', where: 'Utah State, Merrick Bank' },
    { name: 'NIST CSF', level: 'Implemented controls · Assessed', where: 'UpWell, Merrick, Utah State' },
    { name: 'PCI-DSS', level: 'Assessed · Supported audits', where: 'Merrick Bank' },
    { name: 'FFIEC CAT', level: 'Used the tool', where: 'Merrick Bank' },
    { name: 'FISMA', level: 'Assessed', where: 'Utah State' },
    { name: 'SOC 2', level: 'Worked with assessors', where: 'StorageCraft' },
    { name: 'CMMC', level: 'Know', where: '' },
    { name: 'ISO 27001', level: 'Implemented controls only', where: '' }
  ];

  var limits = [
    `Cloud: commercial only (Microsoft 365, Azure, Netskope). No AWS, GCP or DoD cloud, and I have not worked with the Cloud Computing SRG directly.`,
    `Hands-on engineering: I built the networks, servers and platforms, and I now work as a leader. I would not take a hands-on engineering role.`,
    `Budgets: I have not owned a budget. I have negotiated contracts and selected tools.`,
    `Board: I have briefed a CISO, CIO, system owners and authorizing officials. At the bank the CISO briefed the board.`,
    `Formal supervision: two roles with direct reports (8 each). At UpWell and the Air Force I led people through project or program authority.`
  ];

  var tools = [
    { n: 'Rapid7 InsightVM / Nexpose', y: 10 }, { n: 'Ivanti / Shavlik Patch', y: 8 }, { n: 'Tanium', y: 2 }, { n: 'Tenable ACAS / Nessus' },
    { n: 'Netskope CASB', y: 3 }, { n: 'Microsoft 365, Intune, Defender' }, { n: 'Okta' }, { n: 'SailPoint (IDN, File Access Manager)' }, { n: 'Thycotic / Delinea' },
    { n: 'Illumio' }, { n: 'Jira and Confluence', y: 10 }, { n: 'Grafana, Kibana, ELK' }, { n: 'SaltStack' }, { n: 'Python, PowerShell, Bash' },
    { n: 'VMware ESX, Docker, Kubernetes' }, { n: 'HPE/Aruba, Watchguard' }, { n: 'Nagios / Centreon, OSSEC' }, { n: 'Carbon Black, Morphisec' }, { n: 'Ninjio' }, { n: 'ServiceNow' }, { n: 'STIG Manager' }
  ];

  /* Target roles: area weights 0–3 drive the "pick a role" presets on the page. */
  /* Starting levels for the role menu. Researched from real postings and role guides: see data/role-research.md and data/role-research.js (3 Critical, 2 Important, 1 Nice to have, missing = Not needed). */
  var targets = [
    { id: 'ciso', name: 'CISO / Deputy CISO', w: { lead: 3, risk: 3, vuln: 2, iam: 2, arch: 2, cloud: 2, detect: 2, program: 3, metrics: 3, process: 1, pm: 1, training: 2 } },
    { id: 'director', name: 'Director of Information Security / Cybersecurity / Assurance', w: { lead: 3, risk: 3, vuln: 1, iam: 1, arch: 1, cloud: 1, detect: 1, program: 3, metrics: 2, process: 1, pm: 2, training: 2 } },
    { id: 'spm', name: 'Security Program Manager', w: { lead: 1, risk: 2, vuln: 1, iam: 1, arch: 1, cloud: 1, detect: 1, program: 2, metrics: 3, process: 2, pm: 3 } },
    { id: 'srmgr', name: 'Senior Manager, Security', w: { lead: 3, risk: 2, vuln: 2, iam: 1, arch: 2, infra: 1, cloud: 1, detect: 2, program: 2, metrics: 2, process: 2, pm: 1 } },
    { id: 'iso', name: 'Information Security Officer', w: { lead: 1, risk: 3, vuln: 2, iam: 1, arch: 1, infra: 1, cloud: 1, detect: 3, program: 3, metrics: 2, process: 1, pm: 1, training: 2 } },
    { id: 'biso', name: 'Business Information Security Officer', w: { lead: 1, risk: 3, vuln: 1, iam: 1, arch: 1, cloud: 1, detect: 1, program: 3, metrics: 2, pm: 1, training: 2 } }
  ];

  var pitch = [
    { n: '350 → <15 days', l: 'Software approval time, rebuilt and adopted organization-wide' },
    { n: '13% → 99%+', l: 'Vulnerability scan coverage, from a broken program to a published method' },
    { n: 'Built it, then led it', l: 'From certificate-based networks and tiered admin to team leadership and ATOs' }
  ];

  return { SCALE: SCALE, VERB: VERB, roles: roles, areas: areas, evidence: evidence, frameworks: frameworks, limits: limits, tools: tools, targets: targets, pitch: pitch };
})();
