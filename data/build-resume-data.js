/*
 * Builds site/assets/js/resume-data-v2.js (the public resume data) from data/experience-profile.js.
 * Run from this folder:  node build-resume-data.js
 * Edit experience-profile.js (evidence, depth ratings, roles). The summary, key areas and education
 * live in the 'old' object below. Keep both files free of phone numbers, email and clearance details.
 */
const fs=require('fs'), path=require('path'); global.window={};
require(path.join(__dirname,'experience-profile.js')); const E=window.EXPERIENCE;
const old={"summary": "Cybersecurity leader with more than 25 years in IT and security, 12 of them in leadership roles. I build the plans, meetings, and metrics that let technical people do what they do best, and I give leadership a straight answer to “Are we secure?”", "keyAreas": ["RMF / ATO", "NIST SP 800-53 Rev 5", "Continuous monitoring", "POA&M", "STIG compliance", "Vulnerability management", "Change control", "Process improvement", "Stakeholder management", "Jira & Confluence", "Executive reporting"], "education": [["ISC2 CISSP-ISSMP (Information Systems Security Management Professional)", "2025"], ["Situational Leadership II (SLII)", "2025"], ["LDI and LDI+ Leadership Development (AIM Utah)", "2019–2022"], ["Western Governors University, M.S. Cybersecurity & Information Assurance (Capstone of Excellence)", "2020"], ["ISC2 CISSP", "2017"], ["Crucial Conversations & Crucial Confrontations Coaching", "2013–2015"], ["Utah Valley University, B.S. Information Technology – Cybersecurity", "2012"]]};
const NAMES={lead:'Leadership & People',risk:'Risk, Compliance & Audit',vuln:'Vulnerability Management',iam:'Identity & Privileged Access',arch:'Secure Architecture',infra:'Network & Systems Engineering',cloud:'Cloud & SaaS Security',detect:'Detection & Response',program:'Security Program & Policy',metrics:'Metrics & Executive Reporting',process:'Process Improvement & Automation',pm:'Project Management & Delivery',training:'Training & Mentoring'};
const SHORT={lead:'Leadership',risk:'Risk & Compliance',vuln:'Vulnerability Mgmt',iam:'Identity & Access',arch:'Architecture',infra:'Network & Systems',cloud:'Cloud',detect:'Detection & IR',program:'Security Program',metrics:'Metrics',process:'Process & Automation',pm:'Project Mgmt',training:'Training'};
const order=E.areas.map(a=>a.id);
const PRE={
 ciso:{label:'CISO / Deputy CISO',d:'Owns the program and answers to the business.',h:'Program ownership, risk, executive reporting and leadership'},
 director:{label:'Director of Security & Assurance',d:'Runs the security function across teams and programs.',h:'Leading teams, governance and risk programs, and reporting'},
 spm:{label:'Security Program Manager',d:'Runs cross-team programs, process and reporting.',h:'Program delivery, process improvement and metrics'},
 srmgr:{label:'Senior Security Manager',d:'Leads security engineers and operations teams.',h:'Leading security engineering and operations'},
 iso:{label:'Information Security Officer',d:'Policy, risk, incident response and compliance for one organization.',h:'Risk, policy, incident response and compliance'},
 biso:{label:'Business Information Security Officer (BISO)',d:'Security partner to a business unit.',h:'Risk, governance, metrics and partnership with the business'}
};
const presets=E.targets.map(t=>({id:t.id,label:PRE[t.id].label,d:PRE[t.id].d,h:PRE[t.id].h,tags:Object.keys(t.w).sort((a,b)=>t.w[b]-t.w[a]||order.indexOf(a)-order.indexOf(b)).slice(0,4),w:t.w}));

const WHY={
 lead:"I have directly supervised 16 people across two roles and hired 4. I have led 6, 13 and 18 more through project or program authority, and rebuilt a security team from the ground up.",
 risk:"Fifteen years of compliance work across SOC 2, HIPAA and HITRUST, FDIC and PCI, FISMA and RMF. I wrote the risk method every ISSO now uses. RMF and ATO work specifically is three years.",
 vuln:"I built or rebuilt the program at three employers. My capstone on it was published with an award, the plan I wrote is being adopted across a multi-site directorate, and a vendor adopted features I asked for.",
 iam:"I built tiered administration and privileged access from scratch at UpWell, architected and selected the PAM program at Merrick, automated role-based access at StorageCraft, and wrote the ICAM plan at the Air Force.",
 arch:"I designed the sensitive-data environments at UpWell and Merrick (tiered access, VDI zones, Okta boundaries) and built StorageCraft's certificate-based network access.",
 infra:"I owned a 6-site, ~1,500-server environment at StorageCraft and built networks from scratch at four earlier employers. My last hands-on engineering was in 2017; I have led since.",
 cloud:"I led the Microsoft 365 migration and architected the Netskope rollout. Commercial cloud only: no AWS, GCP or DoD cloud.",
 detect:"I built the monitoring and SIEM stack at StorageCraft and the incident response program at Utah State, worked a critical incident at Merrick, and took part in about a dozen low-to-moderate cases at the Air Force.",
 program:"I wrote the policy set or the full program at StorageCraft, UpWell and Utah State, and the plan set at the Air Force.",
 metrics:"I built the metrics system, dashboards and reporting cadence at Merrick and the Air Force, and I brief senior officials weekly and annually.",
 process:"Repeated measurable wins over 18 years: 75% fewer requests, 40%+ fewer tickets, 5 hours of downtime to nearly zero, 350 days to under 15. The latest was adopted across an organization.",
 pm:"I built the Jira and Confluence platform at Merrick, helped build the organization-wide process at the Air Force, and run projects as ISSM without a formal PMO.",
 training:"I trained 900+ employees in person, taught the trainers, ran threat-hunting sessions, and mentor everyone I lead."
};
const bul=e=>({t:e.t,tags:e.a,top:e.top?1:0,m:e.m||[],v:e.v});
const main=['usaf','usu','merrick','upwell','storagecraft'];
const rm={}; E.roles.forEach(r=>rm[r.id]=r);
const roles=main.map(id=>{const r=rm[id]; return {id,title:r.title+(id==='storagecraft'?'':''),org:r.org,dates:r.dates,sector:r.sector,lead:r.lead||null,note:r.note||'',bullets:E.evidence.filter(e=>e.r===id&&e.s==='ok').map(bul)};});
const EO={nym:'Nine Year Mortgage',pulc:'Power Users LLC',qenets:'QeNETS',ebc:'EBC Computers',mission:'Volunteer service in Japan'};
const early=Object.keys(EO); 
roles.push({id:'earlier',title:'Network engineer, consultant and founder',org:'Earlier career',dates:'1997 – 2011',sector:'IT, consulting and service',lead:null,note:'',bullets:early.flatMap(id=>E.evidence.filter(e=>e.r===id&&e.s==='ok').map(e=>Object.assign(bul(e),{t:EO[id]+': '+e.t})))});
const depth={}; E.areas.forEach(a=>{const ev=E.evidence.filter(e=>e.a.includes(a.id)&&e.s==='ok'); const emp=new Set(ev.map(e=>e.r)); const last=Math.max(...[...emp].map(r=>rm[r].to)); depth[a.id]={level:a.level,label:E.SCALE[a.level-1][1],since:a.since,to:a.to,years:a.to-a.since,employers:emp.size,last:last>=2026?'now':last,why:WHY[a.id],handsOn:a.handsOn!==false};});
const stats=[
 {big:'350 → <15',unit:'days',label:'Software approval time',tags:['process','metrics','pm']},
 {big:'86 → 600+',unit:'',label:'Approvals per year, 2025 to first half of 2026',tags:['process','metrics']},
 {big:'3 of 3',unit:'',label:'Authorizations to operate delivered on time',tags:['risk','program']},
 {big:'900+',unit:'',label:'NIST 800-53 controls moved to Rev 5',tags:['risk','process']},
 {big:'18',unit:'',label:'Security officers directed',tags:['lead','risk']},
 {big:'8',unit:'',label:'Direct reports at Merrick Bank, 4 hired by me',tags:['lead']},
 {big:'13% → 99%+',unit:'',label:'Vulnerability scan coverage',tags:['vuln','metrics']},
 {big:'33%',unit:'',label:'Reduction in vulnerability exposure',tags:['vuln','metrics']},
 {big:'5 h → ~0',unit:'',label:'Weekly patching downtime after containerizing',tags:['vuln','process','infra']},
 {big:'~50%',unit:'',label:'Fewer phishing and DLP incidents',tags:['training','metrics','detect']},
 {big:'900+',unit:'',label:'Employees trained in person',tags:['training']},
 {big:'40%+',unit:'',label:'Fewer help desk tickets after automating RBAC',tags:['process','iam']},
 {big:'~1,500',unit:'',label:'Servers across 6 global sites, owned end to end',tags:['infra','lead']},
 {big:'~50 / ~200',unit:'',label:'Privileged admins / accounts under PAM',tags:['iam','arch']},
 {big:'~2,000',unit:'',label:'Servers under a tiered-admin model built in 16 months',tags:['iam','arch']},
 {big:'$125K',unit:'',label:'Phone-system quote replaced with open source',tags:['infra','process']}
];

const eras=[
 {id:'early',name:'Builder',years:'1997 – 2011',mode:'Hands-on',roles:[5],sum:'I built networks and systems, ran my own IT and security consulting company, and led teams of up to 12.',stats:[{big:'Up to 20',label:'Customer networks administered'},{big:'Up to 12',label:'People led on volunteer service in Japan'},{big:'8',label:'Technicians supervised as a branch manager'},{big:'$125K',label:'Phone-system quote replaced with open source'}]},
 {id:'engineer',name:'Security engineer and team lead',years:'2011 – 2019',mode:'Building and leading',roles:[4,3],sum:'I owned the security and IT infrastructure for a company of about 450, then built a tiered administration model and the security program for a health company. I led teams of 6 and 13 without supervising them.',stats:[{big:'~1,500',label:'Servers across 6 global sites, owned end to end'},{big:'~2,000',label:'Servers under a tiered-admin model built in 16 months'},{big:'900+',label:'Employees trained in person'},{big:'5 h → ~0',label:'Weekly patching downtime after containerizing'}]},
 {id:'manager',name:'Manager and first security officer',years:'2019 – 2023',mode:'Leading people and programs',roles:[2,1],sum:'I rebuilt a bank’s security team with 8 direct reports, fixed its vulnerability program, then built a university’s cybersecurity program as its sole security officer.',stats:[{big:'8',label:'Direct reports at Merrick Bank, 4 hired by me'},{big:'13% → 99%+',label:'Vulnerability scan coverage'},{big:'~50 / ~200',label:'Privileged admins and accounts under PAM'},{big:'44% → 85%',label:'Compliance at Utah State in the first year'}]},
 {id:'program',name:'Program leader',years:'2023 – now',mode:'Directing a program',roles:[0],sum:'I direct 18 information system security officers, deliver authorizations to operate on time, and rebuilt the software approval process from 350 days to under 15.',stats:[{big:'18',label:'Security officers directed'},{big:'350 → <15',unit:'days',label:'Software approval time'},{big:'3 of 3',label:'Authorizations to operate delivered on time'},{big:'900+',label:'NIST 800-53 controls moved to Rev 5'}]}
];
const out={eras,verb:E.VERB,tags:NAMES,short:SHORT,presets,summary:old.summary,keyAreas:old.keyAreas,roles,education:old.education,depth,scale:E.SCALE,frameworks:E.frameworks,tools:E.tools,stats,roleShort:['U.S. Air Force','Utah State','Merrick Bank','UpWell','StorageCraft','Earlier career']};
fs.writeFileSync(path.join(__dirname,'..','site','assets','js','resume-data-v2.js'),'/* Resume data v2: generated from the interview profile. Do not edit by hand. */\nwindow.RESUME = '+JSON.stringify(out)+';\n');
console.log('roles',roles.map(r=>r.bullets.length).join(','),'presets',presets.map(p=>p.tags.join('/')).join(' | '));
const bad=[]; roles.forEach(r=>r.bullets.forEach(b=>b.tags.forEach(t=>{if(!NAMES[t])bad.push(t);}))); stats.forEach(s=>s.tags.forEach(t=>{if(!NAMES[t])bad.push('stat '+t);})); console.log('bad',bad.join(',')||'none'); console.log(JSON.stringify(depth.vuln));
