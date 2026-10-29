/* Role research: how much each area matters for the six "start from a role" presets.
 *
 * Method
 *  1. Read real postings and role guides for each role (listed in SOURCES).
 *  2. For each source, score every area 0-3 from how that source treats it:
 *       3   top tier (highest, high, strongest, heaviest, strong)
 *       2.5 significant, medium-high, moderate-to-strong
 *       2   moderate, medium, present
 *       1   light, low, minimal, brief, preferred only
 *       0   not mentioned
 *  3. Average the scores across a role's sources, then map the average to a slider level:
 *       2.6 and up -> 3 Critical (nearly every source puts it at the top)
 *       1.5 to 2.6 -> 2 Important
 *       0.5 to 1.5 -> 1 Nice to have
 *       under 0.5  -> 0 Not needed
 *  4. Floor: the five security disciplines (vulnerability, identity, architecture, detection, cloud) never drop
 *     below Nice to have. A posting that does not mention one is not saying nobody needs it, and every one of
 *     these roles asks for working knowledge of the whole field. Areas that are really separate jobs
 *     (infrastructure, process improvement, project delivery, training) can still be Not needed.
 *
 * Usage:  node role-research.js          prints the result table and the weights
 *         node role-research.js --md     prints the markdown write-up
 */
var AREAS = ['lead', 'risk', 'vuln', 'iam', 'arch', 'infra', 'cloud', 'detect', 'program', 'metrics', 'process', 'pm', 'training'];
var NAMES = {
  lead: 'People leadership', risk: 'Risk and compliance', vuln: 'Vulnerability management', iam: 'Identity and access', arch: 'Security architecture',
  infra: 'Infrastructure', cloud: 'Cloud', detect: 'Detection and response', program: 'Program, policy and governance', metrics: 'Metrics and reporting',
  process: 'Process improvement', pm: 'Project and program delivery', training: 'Training and awareness'
};
var ROLES = {
  ciso: 'CISO / Deputy CISO', director: 'Director of Security & Assurance', spm: 'Security Program Manager',
  srmgr: 'Senior Security Manager', iso: 'Information Security Officer', biso: 'Business Information Security Officer (BISO)'
};

/* Scores are in AREAS order: lead risk vuln iam arch infra cloud detect program metrics process pm training */
var SOURCES = {
  ciso: [
    { n: 'Wiz, CISO job description guide', u: 'https://www.wiz.io/academy/cloud-careers/ciso-job-description-example', s: [2, 3, 1, 1, 1, 0, 3, 2, 3, 3, 0, 0, 1], note: 'Cloud security vendor, so it leans toward cloud.' },
    { n: 'JRG Partners, CISO job description template', u: 'https://www.jrgpartners.com/?p=80220', s: [3, 3, 1, 2, 2, 0, 0, 3, 3, 2, 1, 1, 1] },
    { n: 'Deputy CISO posting, financial services', u: 'https://careers-americancreditacceptance.icims.com/jobs/4147/deputy-chief-information-security-officer/job', s: [3, 3, 2, 2, 2, 1, 2, 2, 3, 2.5, 2, 2, 2] },
    { n: 'Wiz, what a Deputy CISO does', u: 'https://wiz.io/es-es/academy/cloud-careers/what-is-a-deputy-ciso', s: [3, 3, 2, 2, 1, 0, 3, 2, 3, 3, 1, 1, 2], note: 'Cloud security vendor.' }
  ],
  director: [
    { n: 'HubSpot, Director of Security GRC', u: 'https://jobs.generalcatalyst.com/companies/hubspot/jobs/46189198-director-security-governance-risk-and-compliance', s: [3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 1.5, 1.5, 2] },
    { n: 'Beth Israel Lahey Health, Director of Security Governance', u: 'https://jobs.bilh.org/jobs/director-security-governance-charlestown-ma-jr99747/', s: [2, 3, 0, 0, 2, 0, 0, 1, 3, 1, 1, 3, 2.5] },
    { n: 'General Dynamics, Director of Security Operations (assurance and compliance)', u: 'https://careers-gdms.icims.com/jobs/72622/director-of-security-operations/job', s: [3, 3, 2, 0, 0, 0, 0, 2, 3, 3, 0, 3, 1.5], note: 'Also covers personnel and physical security.' },
    { n: 'iHerb, security director', u: 'https://job-boards.greenhouse.io/iherb/jobs/7143797003', s: [3, 3, 3, 0, 2, 1, 1.5, 2, 3, 2, 1.5, 1, 2] }
  ],
  spm: [
    { n: 'Meta, Security Program Manager', u: 'https://metacareers.com/jobs/1009097751264608', s: [0, 3, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 0] },
    { n: 'Google, Technical Program Manager, Product Security', u: 'https://jobs.anitab.org/companies/google-24698/jobs/76651583-technical-program-manager-product-security-core', s: [1, 2, 0, 0, 0, 0, 0, 0, 1, 3, 2, 3, 0], note: 'Risk here is mostly timeline risk, so scored 2.' },
    { n: 'Salesforce, Technical Program Management Director, Security', u: 'https://www.purpose.jobs/discover/companies/salesforce-2/jobs/90104373-technical-program-management-director-security-trust-infrastructure', s: [2, 2, 0, 0, 1, 0, 0, 1, 2, 3, 2, 3, 0], note: 'Risk here is mostly program risk, so scored 2.' }
  ],
  srmgr: [
    { n: 'Google, Senior Security Engineering Manager', u: 'https://jobs.anitab.org/companies/google-24698/jobs/70598527-senior-security-engineering-manager-information-security-engineering', s: [3, 1, 3, 0, 2, 1, 0, 1, 2, 0, 3, 3, 0] },
    { n: 'Security Engineering Senior Manager (Built In listing)', u: 'https://builtin.com/job/security-engineering-senior-manager/8132707', s: [3, 2.5, 2, 1, 3, 2, 3, 1, 2, 2, 2, 1, 0] },
    { n: '6sense, Senior Manager Security Engineering', u: 'https://job-boards.greenhouse.io/6sense/jobs/8139157', s: [3, 3, 3, 2, 2, 3, 3, 1, 3, 3, 3, 2, 0] },
    { n: 'Symbotic, Senior Manager Security Operations', u: 'https://www.symbotic.com/careers/open-positions/R3307', s: [3, 2, 2, 0, 0, 0, 0, 3, 2, 2, 2, 1, 1] },
    { n: 'Senior Manager, Security Operations & Cyber Defense (Alexandria, VA)', u: 'https://www.careerbuilder.com/job-details/senior-manager-security-operations-cyber-defense-alexandria-va--f0352202-7f96-4b4b-946d-7dd63eb6a56f', s: [2, 3, 3, 0, 3, 2, 0, 3, 1, 3, 3, 0, 0] },
    { n: 'Infosec Institute, Security Manager career profile', u: 'https://www.infosecinstitute.com/career-profiles/technical-manager/', s: [2, 3, 0, 0, 0, 0, 0, 2, 3, 1, 0, 1, 0], note: 'Governance flavor of the title, included as a counterweight.' }
  ],
  iso: [
    { n: 'Kansas Information Technology Executive Council, ISO guide', u: 'https://ebit.ks.gov/home/showpublisheddocument/46/638346328384870000', s: [1, 3, 2, 0, 0, 1, 0, 3, 3, 2, 1, 1, 2] },
    { n: 'Gateway Foundation, Information Security Officer (healthcare)', u: 'https://illinoisjoblink.illinois.gov/jobs/12088406', s: [2, 3, 3, 2, 1, 1, 0, 3, 3, 2, 0, 0, 3] },
    { n: 'certSIGN, Information Security Officer', u: 'https://www.certsign.ro/en/job/information-security-officer-iso/', s: [1, 3, 3, 1, 2, 2, 2, 3, 3, 1, 0, 1, 2] },
    { n: 'KPMG Luxembourg, Information Security Officer', u: 'https://careers.kpmg.lu/job/Information-Security-Officer-(ISO)-(mfd)/2531-en_GB/', s: [0, 3, 2, 0, 1, 1, 0, 2.5, 3, 2, 1, 2, 2] }
  ],
  biso: [
    { n: 'FS-ISAC, BISO program and role', u: 'https://www.fsisac.com/hubfs/Knowledge/BISO_Program&Role.pdf', s: [1, 3, 2, 0, 0, 0, 0, 1, 3, 2.5, 0, 1, 2.5] },
    { n: 'Wipro, Business Information Security Officer', u: 'https://www.themuse.com/jobs/wipro/business-information-security-officer-828260', s: [0, 3, 0, 0, 0, 0, 1, 2, 3, 2, 1, 1, 2] },
    { n: 'Security Director, BISO (Built In listing)', u: 'https://builtin.com/job/security-director-biso/4782990', s: [2, 3, 0, 1, 0, 0, 0, 1, 3, 2, 0, 2, 2] }
  ]
};

var FLOOR = { vuln: 1, iam: 1, arch: 1, detect: 1, cloud: 1 };
function level(avg) { return avg >= 2.6 ? 3 : avg >= 1.5 ? 2 : avg >= 0.5 ? 1 : 0; }
function compute() {
  var out = {};
  Object.keys(SOURCES).forEach(function (r) {
    out[r] = { avg: {}, w: {} };
    AREAS.forEach(function (a, i) {
      var sum = 0; SOURCES[r].forEach(function (s) { sum += s.s[i]; });
      var avg = sum / SOURCES[r].length; out[r].avg[a] = avg;
      var l = level(avg), fl = false;
      if (FLOOR[a] && l < FLOOR[a]) { l = FLOOR[a]; fl = true; }
      out[r].floor = out[r].floor || {}; if (fl) out[r].floor[a] = true;
      if (l > 0) out[r].w[a] = l;
    });
  });
  return out;
}
function check() {
  Object.keys(SOURCES).forEach(function (r) { SOURCES[r].forEach(function (s) { if (s.s.length !== AREAS.length) throw new Error('bad row ' + r + ' ' + s.n); }); });
}
check();
var R = compute();
var LAB = ['Not needed', 'Nice to have', 'Important', 'Critical'];

if (typeof module !== 'undefined') module.exports = { AREAS: AREAS, ROLES: ROLES, SOURCES: SOURCES, result: R, level: level };
if (typeof require !== 'undefined' && require.main === module) {
  if (process.argv.indexOf('--md') > -1) {
    var md = '# What each starting role needs\n\nResearch behind the "Or start from a role" menu on the Resume page. I read real postings and role guides for each role, scored each area from 0 to 3 in each source, averaged the scores, and mapped the average to a slider level (2.6 and up Critical, 1.5 and up Important, 0.5 and up Nice to have, otherwise Not needed). The five security disciplines (vulnerability, identity, architecture, detection, cloud) are never lower than Nice to have, because a posting that does not mention one is not saying nobody needs it. The scoring script is `role-research.js`, so the numbers can be re-run or adjusted.\n\nThe scores are my reading of each source, not counts, so treat a result near a boundary as a judgment call. Postings written by a vendor lean toward that vendor\'s topic (the two Wiz articles lean toward cloud).\n\n';
    Object.keys(ROLES).forEach(function (r) {
      md += '## ' + ROLES[r] + '\n\n| Area | Average | Level |\n|---|---|---|\n';
      AREAS.forEach(function (a) { md += '| ' + NAMES[a] + ' | ' + R[r].avg[a].toFixed(2) + ' | ' + LAB[R[r].w[a] || 0] + (R[r].floor[a] ? ' (raised to the floor)' : '') + ' |\n'; });
      md += '\nSources:\n' + SOURCES[r].map(function (s) { return '- [' + s.n + '](' + s.u + ')' + (s.note ? ' (' + s.note + ')' : ''); }).join('\n') + '\n\n';
    });
    md += '## Left out on purpose\n\n- Amazon "Program Security Manager" posting: it is a facility security officer role (clearances, secure facilities), not information security program management.\n- Postings that failed to load or had been taken down (several Dice and Paylocity listings).\n';
    process.stdout.write(md);
  } else {
    Object.keys(ROLES).forEach(function (r) {
      console.log('\n' + ROLES[r] + ' (' + SOURCES[r].length + ' sources)');
      console.log(AREAS.map(function (a) { return a + ' ' + R[r].avg[a].toFixed(2) + '->' + (R[r].w[a] || 0); }).join('  '));
      console.log('w: ' + JSON.stringify(R[r].w));
    });
  }
}
