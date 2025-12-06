import { Attack } from '../types/game';

export const attacks: Record<string, Attack> = {
  // Initial Access
  'spear-phishing': {
    id: 'spear-phishing',
    name: 'Spear Phishing',
    nameEn: 'Spear Phishing',
    nameTh: 'การฟิชชิ่งแบบกำหนดเป้าหมาย',
    description: 'Targeted phishing email to gain initial access',
    descriptionTh: 'อีเมลฟิชชิ่งที่กำหนดเป้าหมายเพื่อเข้าถึงครั้งแรก',
    tactic: 'initial-access',
    mitreId: 'T0865',
    targetLevel: 'level5',
    damage: 15,
    complexity: 'low',
    detectability: 'medium',
    icon: '📧'
  },
  'internet-facing-exploit': {
    id: 'internet-facing-exploit',
    name: 'Internet-Facing System Exploit',
    nameEn: 'Internet-Facing System Exploit',
    nameTh: 'การใช้ประโยชน์ระบบที่เผชิญอินเทอร์เน็ต',
    description: 'Exploiting vulnerabilities in internet-facing systems',
    descriptionTh: 'การใช้ประโยชน์จากช่องโหว่ในระบบที่เผชิญอินเทอร์เน็ต',
    tactic: 'initial-access',
    mitreId: 'T0883',
    targetLevel: 'level35',
    damage: 20,
    complexity: 'medium',
    detectability: 'easy',
    icon: '🌐'
  },
  'supply-chain-compromise': {
    id: 'supply-chain-compromise',
    name: 'Supply Chain Compromise',
    nameEn: 'Supply Chain Compromise',
    nameTh: 'การบุกรุกห่วงโซ่อุปทาน',
    description: 'Compromising trusted third-party software or hardware',
    descriptionTh: 'การบุกรุกซอฟต์แวร์หรือฮาร์ดแวร์จากบุคคลที่สามที่เชื่อถือได้',
    tactic: 'initial-access',
    mitreId: 'T0862',
    targetLevel: 'level4',
    damage: 25,
    complexity: 'high',
    detectability: 'hard',
    icon: '📦'
  },

  // Execution
  'scripting': {
    id: 'scripting',
    name: 'Malicious Scripting',
    nameEn: 'Malicious Scripting',
    nameTh: 'การใช้สคริปต์ที่เป็นอันตราย',
    description: 'Executing malicious scripts on compromised systems',
    descriptionTh: 'การรันสคริปต์ที่เป็นอันตรายบนระบบที่ถูกบุกรุก',
    tactic: 'execution',
    mitreId: 'T0853',
    targetLevel: 'level3',
    damage: 15,
    complexity: 'low',
    detectability: 'medium',
    icon: '📜'
  },
  'command-line': {
    id: 'command-line',
    name: 'Command-Line Interface',
    nameEn: 'Command-Line Interface',
    nameTh: 'การใช้คำสั่งผ่านบรรทัดคำสั่ง',
    description: 'Using CLI to execute malicious commands',
    descriptionTh: 'การใช้ CLI เพื่อรันคำสั่งที่เป็นอันตราย',
    tactic: 'execution',
    mitreId: 'T0807',
    targetLevel: 'level3',
    damage: 10,
    complexity: 'low',
    detectability: 'easy',
    icon: '⌨️'
  },

  // Persistence
  'valid-accounts': {
    id: 'valid-accounts',
    name: 'Valid Accounts',
    nameEn: 'Valid Accounts',
    nameTh: 'การใช้บัญชีที่ถูกต้อง',
    description: 'Using stolen credentials to maintain access',
    descriptionTh: 'การใช้ข้อมูลประจำตัวที่ถูกขโมยเพื่อรักษาการเข้าถึง',
    tactic: 'persistence',
    mitreId: 'T0859',
    targetLevel: 'level3',
    damage: 20,
    complexity: 'medium',
    detectability: 'hard',
    icon: '🔑'
  },
  'firmware-corruption': {
    id: 'firmware-corruption',
    name: 'Firmware Corruption',
    nameEn: 'Firmware Corruption',
    nameTh: 'การทำให้เฟิร์มแวร์เสียหาย',
    description: 'Corrupting firmware to maintain persistence',
    descriptionTh: 'การทำให้เฟิร์มแวร์เสียหายเพื่อรักษาความอยู่รอด',
    tactic: 'persistence',
    mitreId: 'T0857',
    targetLevel: 'level1',
    damage: 30,
    complexity: 'high',
    detectability: 'hard',
    icon: '💾'
  },

  // Evasion
  'masquerading': {
    id: 'masquerading',
    name: 'Masquerading',
    nameEn: 'Masquerading',
    nameTh: 'การปลอมตัว',
    description: 'Disguising malicious activities as legitimate',
    descriptionTh: 'การปลอมกิจกรรมที่เป็นอันตรายให้ดูถูกต้อง',
    tactic: 'evasion',
    mitreId: 'T0849',
    targetLevel: 'level3',
    damage: 10,
    complexity: 'medium',
    detectability: 'hard',
    icon: '🎭'
  },
  'indicator-removal': {
    id: 'indicator-removal',
    name: 'Indicator Removal',
    nameEn: 'Indicator Removal',
    nameTh: 'การลบตัวบ่งชี้',
    description: 'Removing traces of attack from logs and systems',
    descriptionTh: 'การลบร่องรอยของการโจมตีจากบันทึกและระบบ',
    tactic: 'evasion',
    mitreId: 'T0872',
    targetLevel: 'level3',
    damage: 5,
    complexity: 'low',
    detectability: 'hard',
    icon: '🧹'
  },

  // Discovery
  'network-scanning': {
    id: 'network-scanning',
    name: 'Network Scanning',
    nameEn: 'Network Scanning',
    nameTh: 'การสแกนเครือข่าย',
    description: 'Scanning network to discover assets and vulnerabilities',
    descriptionTh: 'การสแกนเครือข่ายเพื่อค้นหาทรัพย์สินและช่องโหว่',
    tactic: 'discovery',
    mitreId: 'T0846',
    targetLevel: 'level3',
    damage: 5,
    complexity: 'low',
    detectability: 'easy',
    icon: '🔍'
  },
  'remote-system-discovery': {
    id: 'remote-system-discovery',
    name: 'Remote System Discovery',
    nameEn: 'Remote System Discovery',
    nameTh: 'การค้นหาระบบระยะไกล',
    description: 'Identifying remote systems and their configurations',
    descriptionTh: 'การระบุระบบระยะไกลและการกำหนดค่า',
    tactic: 'discovery',
    mitreId: 'T0846',
    targetLevel: 'level2',
    damage: 10,
    complexity: 'low',
    detectability: 'medium',
    icon: '🗺️'
  },

  // Lateral Movement
  'default-credentials': {
    id: 'default-credentials',
    name: 'Default Credentials',
    nameEn: 'Default Credentials',
    nameTh: 'ข้อมูลประจำตัวเริ่มต้น',
    description: 'Using default passwords to move between systems',
    descriptionTh: 'การใช้รหัสผ่านเริ่มต้นเพื่อเคลื่อนย้ายระหว่างระบบ',
    tactic: 'lateral-movement',
    mitreId: 'T0812',
    targetLevel: 'level2',
    damage: 20,
    complexity: 'low',
    detectability: 'medium',
    icon: '🔓'
  },
  'exploitation-lateral': {
    id: 'exploitation-lateral',
    name: 'Exploitation for Lateral Movement',
    nameEn: 'Exploitation for Lateral Movement',
    nameTh: 'การใช้ประโยชน์เพื่อเคลื่อนย้ายด้านข้าง',
    description: 'Exploiting vulnerabilities to move deeper into the network',
    descriptionTh: 'การใช้ประโยชน์จากช่องโหว่เพื่อเคลื่อนย้ายลึกเข้าไปในเครือข่าย',
    tactic: 'lateral-movement',
    mitreId: 'T0866',
    targetLevel: 'level1',
    damage: 25,
    complexity: 'medium',
    detectability: 'medium',
    icon: '➡️'
  },

  // Collection
  'data-repositories': {
    id: 'data-repositories',
    name: 'Data from Information Repositories',
    nameEn: 'Data from Information Repositories',
    nameTh: 'ข้อมูลจากคลังข้อมูล',
    description: 'Collecting sensitive data from databases and repositories',
    descriptionTh: 'การรวบรวมข้อมูลที่ละเอียดอ่อนจากฐานข้อมูลและคลัง',
    tactic: 'collection',
    mitreId: 'T0811',
    targetLevel: 'level4',
    damage: 15,
    complexity: 'low',
    detectability: 'medium',
    icon: '📊'
  },
  'screen-capture': {
    id: 'screen-capture',
    name: 'Screen Capture',
    nameEn: 'Screen Capture',
    nameTh: 'การจับภาพหน้าจอ',
    description: 'Capturing screenshots of SCADA systems',
    descriptionTh: 'การจับภาพหน้าจอของระบบ SCADA',
    tactic: 'collection',
    mitreId: 'T0852',
    targetLevel: 'level2',
    damage: 10,
    complexity: 'low',
    detectability: 'easy',
    icon: '📸'
  },

  // Command & Control
  'standard-protocols': {
    id: 'standard-protocols',
    name: 'Standard Application Layer Protocol',
    nameEn: 'Standard Application Layer Protocol',
    nameTh: 'โปรโตคอลชั้นแอปพลิเคชันมาตรฐาน',
    description: 'Using standard protocols like HTTP/HTTPS for C2',
    descriptionTh: 'การใช้โปรโตคอลมาตรฐานเช่น HTTP/HTTPS สำหรับ C2',
    tactic: 'command-control',
    mitreId: 'T0869',
    targetLevel: 'level35',
    damage: 15,
    complexity: 'medium',
    detectability: 'hard',
    icon: '📡'
  },
  'connection-proxy': {
    id: 'connection-proxy',
    name: 'Connection Proxy',
    nameEn: 'Connection Proxy',
    nameTh: 'พร็อกซีการเชื่อมต่อ',
    description: 'Using proxy servers to hide C2 communications',
    descriptionTh: 'การใช้เซิร์ฟเวอร์พร็อกซีเพื่อซ่อนการสื่อสาร C2',
    tactic: 'command-control',
    mitreId: 'T0884',
    targetLevel: 'level35',
    damage: 10,
    complexity: 'medium',
    detectability: 'hard',
    icon: '🔀'
  },

  // Inhibit Response
  'block-commands': {
    id: 'block-commands',
    name: 'Block Command Messages',
    nameEn: 'Block Command Messages',
    nameTh: 'บล็อกข้อความคำสั่ง',
    description: 'Blocking legitimate command messages to SCADA systems',
    descriptionTh: 'การบล็อกข้อความคำสั่งที่ถูกต้องไปยังระบบ SCADA',
    tactic: 'inhibit-response',
    mitreId: 'T0803',
    targetLevel: 'level2',
    damage: 25,
    complexity: 'high',
    detectability: 'medium',
    icon: '🚫'
  },
  'dos-attack': {
    id: 'dos-attack',
    name: 'Denial of Service',
    nameEn: 'Denial of Service',
    nameTh: 'การปฏิเสธการให้บริการ',
    description: 'Overwhelming systems to make them unavailable',
    descriptionTh: 'การทำให้ระบบล้นเพื่อทำให้ไม่สามารถใช้งานได้',
    tactic: 'inhibit-response',
    mitreId: 'T0814',
    targetLevel: 'level2',
    damage: 30,
    complexity: 'low',
    detectability: 'easy',
    icon: '💥'
  },

  // Impact
  'loss-of-control': {
    id: 'loss-of-control',
    name: 'Loss of Control',
    nameEn: 'Loss of Control',
    nameTh: 'การสูญเสียการควบคุม',
    description: 'Taking control away from legitimate operators',
    descriptionTh: 'การยึดการควบคุมจากผู้ควบคุมที่ถูกต้อง',
    tactic: 'impact',
    mitreId: 'T0827',
    targetLevel: 'level1',
    damage: 40,
    complexity: 'high',
    detectability: 'medium',
    icon: '🎮'
  },
  'manipulation-control': {
    id: 'manipulation-control',
    name: 'Manipulation of Control',
    nameEn: 'Manipulation of Control',
    nameTh: 'การจัดการควบคุม',
    description: 'Manipulating control systems to cause physical damage',
    descriptionTh: 'การจัดการระบบควบคุมเพื่อสร้างความเสียหายทางกายภาพ',
    tactic: 'impact',
    mitreId: 'T0831',
    targetLevel: 'level0',
    damage: 50,
    complexity: 'high',
    detectability: 'medium',
    icon: '⚙️'
  },
  'loss-of-view': {
    id: 'loss-of-view',
    name: 'Loss of View',
    nameEn: 'Loss of View',
    nameTh: 'การสูญเสียการมองเห็น',
    description: 'Blinding operators by disrupting monitoring systems',
    descriptionTh: 'การทำให้ผู้ควบคุมมองไม่เห็นโดยรบกวนระบบตรวจสอบ',
    tactic: 'impact',
    mitreId: 'T0829',
    targetLevel: 'level2',
    damage: 35,
    complexity: 'medium',
    detectability: 'easy',
    icon: '👁️'
  },
  'damage-property': {
    id: 'damage-property',
    name: 'Damage to Property',
    nameEn: 'Damage to Property',
    nameTh: 'ความเสียหายต่อทรัพย์สิน',
    description: 'Causing physical damage to grid infrastructure',
    descriptionTh: 'การสร้างความเสียหายทางกายภาพต่อโครงสร้างโครงข่าย',
    tactic: 'impact',
    mitreId: 'T0879',
    targetLevel: 'level0',
    damage: 60,
    complexity: 'high',
    detectability: 'easy',
    icon: '🔥'
  }
};

// Export array for easier iteration
export const attackList = Object.values(attacks);

// Group attacks by tactic
export const attacksByTactic = attackList.reduce((acc, attack) => {
  if (!acc[attack.tactic]) {
    acc[attack.tactic] = [];
  }
  acc[attack.tactic].push(attack);
  return acc;
}, {} as Record<string, Attack[]>);
