import { Defense } from '../types/game';

export const defenses: Record<string, Defense> = {
  // IDENTIFY
  'asset-discovery': {
    id: 'asset-discovery',
    name: 'Asset Discovery',
    nameEn: 'Asset Discovery',
    nameTh: 'การค้นพบทรัพย์สิน',
    description: 'Identify and catalog all grid assets',
    descriptionTh: 'ระบุและจัดทำรายการทรัพย์สินโครงข่ายทั้งหมด',
    function: 'identify',
    cost: 2,
    effectiveness: 60,
    protectsLevel: 'level3',
    counters: ['discovery'],
    icon: '🔍',
    requiresUnlock: false
  },
  'risk-assessment': {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    nameEn: 'Risk Assessment',
    nameTh: 'การประเมินความเสี่ยง',
    description: 'Assess and prioritize security risks',
    descriptionTh: 'ประเมินและจัดลำดับความสำคัญความเสี่ยงด้านความปลอดภัย',
    function: 'identify',
    cost: 3,
    effectiveness: 70,
    protectsLevel: 'level4',
    counters: ['discovery', 'initial-access'],
    icon: '📊',
    requiresUnlock: false
  },

  // PROTECT
  'firewall': {
    id: 'firewall',
    name: 'Firewall',
    nameEn: 'Firewall',
    nameTh: 'ไฟร์วอลล์',
    description: 'Network firewall to filter traffic',
    descriptionTh: 'ไฟร์วอลล์เครือข่ายเพื่อกรองการรับส่งข้อมูล',
    function: 'protect',
    cost: 3,
    effectiveness: 75,
    protectsLevel: 'level35',
    counters: ['initial-access', 'lateral-movement'],
    icon: '🔥',
    requiresUnlock: false
  },
  'access-control': {
    id: 'access-control',
    name: 'Access Control',
    nameEn: 'Access Control',
    nameTh: 'การควบคุมการเข้าถึง',
    description: 'Implement strict access control policies',
    descriptionTh: 'ใช้นโยบายการควบคุมการเข้าถึงที่เข้มงวด',
    function: 'protect',
    cost: 4,
    effectiveness: 80,
    protectsLevel: 'level3',
    counters: ['persistence', 'lateral-movement'],
    icon: '🔐',
    requiresUnlock: false
  },
  'encryption': {
    id: 'encryption',
    name: 'Data Encryption',
    nameEn: 'Data Encryption',
    nameTh: 'การเข้ารหัสข้อมูล',
    description: 'Encrypt sensitive data and communications',
    descriptionTh: 'เข้ารหัสข้อมูลและการสื่อสารที่ละเอียดอ่อน',
    function: 'protect',
    cost: 4,
    effectiveness: 85,
    protectsLevel: 'level4',
    counters: ['collection', 'command-control'],
    icon: '🔒',
    requiresUnlock: true
  },
  'network-segmentation': {
    id: 'network-segmentation',
    name: 'Network Segmentation',
    nameEn: 'Network Segmentation',
    nameTh: 'การแบ่งส่วนเครือข่าย',
    description: 'Segment network to limit lateral movement',
    descriptionTh: 'แบ่งส่วนเครือข่ายเพื่อจำกัดการเคลื่อนย้ายด้านข้าง',
    function: 'protect',
    cost: 5,
    effectiveness: 90,
    protectsLevel: 'level3',
    counters: ['lateral-movement', 'impact'],
    icon: '🧱',
    requiresUnlock: true
  },

  // DETECT
  'ids': {
    id: 'ids',
    name: 'Intrusion Detection System',
    nameEn: 'Intrusion Detection System',
    nameTh: 'ระบบตรวจจับการบุกรุก',
    description: 'Detect malicious network activity',
    descriptionTh: 'ตรวจจับกิจกรรมเครือข่ายที่เป็นอันตราย',
    function: 'detect',
    cost: 3,
    effectiveness: 70,
    protectsLevel: 'level35',
    counters: ['initial-access', 'execution'],
    icon: '👁️',
    requiresUnlock: false
  },
  'siem': {
    id: 'siem',
    name: 'SIEM System',
    nameEn: 'SIEM System',
    nameTh: 'ระบบ SIEM',
    description: 'Security Information and Event Management',
    descriptionTh: 'การจัดการข้อมูลและเหตุการณ์ความปลอดภัย',
    function: 'detect',
    cost: 5,
    effectiveness: 85,
    protectsLevel: 'level3',
    counters: ['evasion', 'persistence', 'command-control'],
    icon: '📡',
    requiresUnlock: true
  },
  'anomaly-detection': {
    id: 'anomaly-detection',
    name: 'Anomaly Detection',
    nameEn: 'Anomaly Detection',
    nameTh: 'การตรวจจับความผิดปกติ',
    description: 'AI-powered detection of abnormal behavior',
    descriptionTh: 'การตรวจจับพฤติกรรมผิดปกติด้วย AI',
    function: 'detect',
    cost: 6,
    effectiveness: 90,
    protectsLevel: 'level2',
    counters: ['evasion', 'inhibit-response', 'impact'],
    icon: '🤖',
    requiresUnlock: true
  },
  'protocol-analyzer': {
    id: 'protocol-analyzer',
    name: 'Protocol Analyzer',
    nameEn: 'Protocol Analyzer',
    nameTh: 'ตัววิเคราะห์โปรโตคอล',
    description: 'Monitor ICS protocols for anomalies',
    descriptionTh: 'ตรวจสอบโปรโตคอล ICS เพื่อหาความผิดปกติ',
    function: 'detect',
    cost: 5,
    effectiveness: 80,
    protectsLevel: 'level2',
    counters: ['command-control', 'inhibit-response'],
    icon: '📊',
    requiresUnlock: true
  },

  // RESPOND
  'incident-response': {
    id: 'incident-response',
    name: 'Incident Response Team',
    nameEn: 'Incident Response Team',
    nameTh: 'ทีมตอบสนองเหตุการณ์',
    description: 'Rapid response to security incidents',
    descriptionTh: 'การตอบสนองอย่างรวดเร็วต่อเหตุการณ์ความปลอดภัย',
    function: 'respond',
    cost: 4,
    effectiveness: 75,
    protectsLevel: 'level3',
    counters: ['execution', 'persistence', 'lateral-movement'],
    icon: '🚨',
    requiresUnlock: false
  },
  'containment': {
    id: 'containment',
    name: 'Threat Containment',
    nameEn: 'Threat Containment',
    nameTh: 'การกักกันภัยคุกคาม',
    description: 'Isolate and contain active threats',
    descriptionTh: 'แยกและกักกันภัยคุกคามที่ใช้งานอยู่',
    function: 'respond',
    cost: 5,
    effectiveness: 85,
    protectsLevel: 'level2',
    counters: ['lateral-movement', 'inhibit-response', 'impact'],
    icon: '🛡️',
    requiresUnlock: false
  },
  'forensics': {
    id: 'forensics',
    name: 'Digital Forensics',
    nameEn: 'Digital Forensics',
    nameTh: 'นิติวิทยาศาสตร์ดิจิทัล',
    description: 'Analyze attack patterns and methods',
    descriptionTh: 'วิเคราะห์รูปแบบและวิธีการโจมตี',
    function: 'respond',
    cost: 4,
    effectiveness: 70,
    protectsLevel: 'level3',
    counters: ['evasion', 'persistence'],
    icon: '🔬',
    requiresUnlock: true
  },

  // RECOVER
  'backup-restore': {
    id: 'backup-restore',
    name: 'Backup & Restore',
    nameEn: 'Backup & Restore',
    nameTh: 'สำรองและกู้คืน',
    description: 'Restore systems from clean backups',
    descriptionTh: 'กู้คืนระบบจากการสำรองข้อมูลที่สะอาด',
    function: 'recover',
    cost: 5,
    effectiveness: 80,
    protectsLevel: 'level2',
    counters: ['impact'],
    icon: '💾',
    requiresUnlock: false
  },
  'system-recovery': {
    id: 'system-recovery',
    name: 'System Recovery',
    nameEn: 'System Recovery',
    nameTh: 'การกู้คืนระบบ',
    description: 'Comprehensive system recovery procedures',
    descriptionTh: 'ขั้นตอนการกู้คืนระบบแบบครอบคลุม',
    function: 'recover',
    cost: 6,
    effectiveness: 90,
    protectsLevel: 'level1',
    counters: ['impact', 'inhibit-response'],
    icon: '🔄',
    requiresUnlock: false
  },
  'redundancy': {
    id: 'redundancy',
    name: 'System Redundancy',
    nameEn: 'System Redundancy',
    nameTh: 'ความซ้ำซ้อนของระบบ',
    description: 'Maintain redundant systems for failover',
    descriptionTh: 'รักษาระบบสำรองสำหรับการสลับ',
    function: 'recover',
    cost: 7,
    effectiveness: 95,
    protectsLevel: 'level0',
    counters: ['impact', 'inhibit-response'],
    icon: '♻️',
    requiresUnlock: true
  },

  // Advanced Defenses (require unlocking)
  'zero-trust': {
    id: 'zero-trust',
    name: 'Zero Trust Architecture',
    nameEn: 'Zero Trust Architecture',
    nameTh: 'สถาปัตยกรรม Zero Trust',
    description: 'Never trust, always verify approach',
    descriptionTh: 'แนวทางไม่เชื่อเลย ตรวจสอบเสมอ',
    function: 'protect',
    cost: 8,
    effectiveness: 95,
    protectsLevel: 'level3',
    counters: ['persistence', 'lateral-movement', 'evasion'],
    icon: '🎯',
    requiresUnlock: true
  },
  'threat-hunting': {
    id: 'threat-hunting',
    name: 'Proactive Threat Hunting',
    nameEn: 'Proactive Threat Hunting',
    nameTh: 'การล่าภัยคุกคามเชิงรุก',
    description: 'Actively search for hidden threats',
    descriptionTh: 'ค้นหาภัยคุกคามที่ซ่อนอยู่อย่างแข็งขัน',
    function: 'detect',
    cost: 7,
    effectiveness: 92,
    protectsLevel: 'level2',
    counters: ['evasion', 'persistence', 'command-control'],
    icon: '🎯',
    requiresUnlock: true
  },
  'deception-tech': {
    id: 'deception-tech',
    name: 'Deception Technology',
    nameEn: 'Deception Technology',
    nameTh: 'เทคโนโลยีการหลอกลวง',
    description: 'Deploy honeypots and decoys to trap attackers',
    descriptionTh: 'ติดตั้ง honeypots และเหยื่อล่อเพื่อดักจับผู้โจมตี',
    function: 'detect',
    cost: 6,
    effectiveness: 88,
    protectsLevel: 'level3',
    counters: ['discovery', 'lateral-movement'],
    icon: '🍯',
    requiresUnlock: true
  },
  'edr': {
    id: 'edr',
    name: 'Endpoint Detection & Response',
    nameEn: 'Endpoint Detection & Response',
    nameTh: 'การตรวจจับและตอบสนองที่ปลายทาง',
    description: 'Advanced endpoint protection and response',
    descriptionTh: 'การป้องกันและตอบสนองที่ปลายทางขั้นสูง',
    function: 'respond',
    cost: 6,
    effectiveness: 90,
    protectsLevel: 'level3',
    counters: ['execution', 'persistence', 'evasion'],
    icon: '💻',
    requiresUnlock: true
  }
};

// Export array for easier iteration
export const defenseList = Object.values(defenses);

// Group defenses by function
export const defensesByFunction = defenseList.reduce((acc, defense) => {
  if (!acc[defense.function]) {
    acc[defense.function] = [];
  }
  acc[defense.function].push(defense);
  return acc;
}, {} as Record<string, Defense[]>);

// Get available defenses (not requiring unlock)
export const availableDefenses = defenseList.filter(d => !d.requiresUnlock);

// Get locked defenses
export const lockedDefenses = defenseList.filter(d => d.requiresUnlock);
