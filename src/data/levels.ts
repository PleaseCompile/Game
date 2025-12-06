import { Level } from '../types/game';

export const levels: Record<number, Level> = {
  1: {
    id: 1,
    name: 'Tutorial: Understanding the Grid',
    nameTh: 'บทเรียน: ทำความเข้าใจโครงข่าย',
    difficulty: 'tutorial',
    attackerType: 'Training Scenario',
    attackerTypeTh: 'สถานการณ์ฝึก',
    story: 'Learn the basics of the Smart Grid and Purdue Model',
    storyTh: 'เรียนรู้พื้นฐานของ Smart Grid และ Purdue Model',
    objectives: [
      'Complete the tutorial',
      'Deploy at least one defense',
      'Understand grid levels'
    ],
    objectivesTh: [
      'จบบทเรียน',
      'ติดตั้งการป้องกันอย่างน้อย 1 อัน',
      'เข้าใจชั้นของโครงข่าย'
    ],
    availableAttacks: ['network-scanning'],
    initialActionPoints: 10,
    turnLimit: 5,
    successScore: 500
  },
  2: {
    id: 2,
    name: 'Tutorial: Basic Defense',
    nameTh: 'บทเรียน: การป้องกันพื้นฐาน',
    difficulty: 'tutorial',
    attackerType: 'Training Scenario',
    attackerTypeTh: 'สถานการณ์ฝึก',
    story: 'Learn to deploy and manage defensive actions',
    storyTh: 'เรียนรู้การติดตั้งและจัดการการป้องกัน',
    objectives: [
      'Deploy 3 different defenses',
      'Block at least one attack',
      'Keep grid health above 80%'
    ],
    objectivesTh: [
      'ติดตั้งการป้องกัน 3 อันที่แตกต่างกัน',
      'บล็อกการโจมตีอย่างน้อย 1 ครั้ง',
      'รักษาสุขภาพโครงข่ายเหนือ 80%'
    ],
    availableAttacks: ['spear-phishing', 'network-scanning', 'scripting'],
    initialActionPoints: 12,
    turnLimit: 8,
    successScore: 1000
  },
  3: {
    id: 3,
    name: 'Tutorial: Attack Chains',
    nameTh: 'บทเรียน: ลำดับการโจมตี',
    difficulty: 'tutorial',
    attackerType: 'Training Scenario',
    attackerTypeTh: 'สถานการณ์ฝึก',
    story: 'Learn to recognize and stop MITRE ATT&CK kill chains',
    storyTh: 'เรียนรู้การจดจำและหยุด MITRE ATT&CK kill chains',
    objectives: [
      'Stop an attack chain before it reaches Impact',
      'Use all 5 NIST Framework functions',
      'Complete without losing any grid level'
    ],
    objectivesTh: [
      'หยุดลำดับการโจมตีก่อนถึง Impact',
      'ใช้ทั้ง 5 ฟังก์ชันของ NIST Framework',
      'จบโดยไม่เสียชั้นโครงข่ายใดเลย'
    ],
    availableAttacks: ['spear-phishing', 'scripting', 'valid-accounts', 'network-scanning', 'default-credentials'],
    initialActionPoints: 15,
    turnLimit: 10,
    successScore: 1500
  },
  4: {
    id: 4,
    name: 'Hacktivist Campaign',
    nameTh: 'แคมเปญ Hacktivist',
    difficulty: 'easy',
    attackerType: 'Hacktivist Group',
    attackerTypeTh: 'กลุ่ม Hacktivist',
    story: 'Anonymous-style hacktivists protesting energy policy',
    storyTh: 'กลุ่ม hacktivist แบบ Anonymous ประท้วงนโยบายพลังงาน',
    objectives: [
      'Protect DMZ (Level 3.5)',
      'Block DDoS attacks',
      'Keep grid operational for 12 turns'
    ],
    objectivesTh: [
      'ปกป้อง DMZ (ชั้น 3.5)',
      'บล็อกการโจมตี DDoS',
      'รักษาโครงข่ายให้ทำงานได้ 12 เทิร์น'
    ],
    availableAttacks: ['internet-facing-exploit', 'dos-attack', 'scripting', 'masquerading', 'network-scanning'],
    initialActionPoints: 15,
    turnLimit: 12,
    successScore: 2000
  },
  5: {
    id: 5,
    name: 'Ransomware Gang',
    nameTh: 'แก๊ง Ransomware',
    difficulty: 'easy',
    attackerType: 'Ransomware Gang',
    attackerTypeTh: 'แก๊ง Ransomware',
    story: 'Cybercriminals attempting to encrypt SCADA systems',
    storyTh: 'อาชญากรไซเบอร์พยายามเข้ารหัสระบบ SCADA',
    objectives: [
      'Protect Level 2 (SCADA)',
      'Deploy backup systems',
      'Prevent data encryption'
    ],
    objectivesTh: [
      'ปกป้องชั้น 2 (SCADA)',
      'ติดตั้งระบบสำรอง',
      'ป้องกันการเข้ารหัสข้อมูล'
    ],
    availableAttacks: ['spear-phishing', 'valid-accounts', 'data-repositories', 'firmware-corruption', 'block-commands'],
    initialActionPoints: 18,
    turnLimit: 15,
    successScore: 2500
  },
  6: {
    id: 6,
    name: 'Organized Crime',
    nameTh: 'อาชญากรองค์กร',
    difficulty: 'easy',
    attackerType: 'Crime Syndicate',
    attackerTypeTh: 'กลุ่มอาชญากร',
    story: 'Sophisticated criminals manipulating energy markets',
    storyTh: 'อาชญากรที่มีความซับซ้อนจัดการตลาดพลังงาน',
    objectives: [
      'Detect insider threats',
      'Prevent market manipulation',
      'Maintain grid stability'
    ],
    objectivesTh: [
      'ตรวจจับภัยคุกคามจากภายใน',
      'ป้องกันการจัดการตลาด',
      'รักษาความเสถียรของโครงข่าย'
    ],
    availableAttacks: ['supply-chain-compromise', 'valid-accounts', 'masquerading', 'data-repositories', 'manipulation-control'],
    initialActionPoints: 20,
    turnLimit: 15,
    successScore: 3000
  },
  7: {
    id: 7,
    name: 'Nation State: Reconnaissance',
    nameTh: 'รัฐชาติ: การลาดตระเวน',
    difficulty: 'medium',
    attackerType: 'APT Group',
    attackerTypeTh: 'กลุ่ม APT',
    story: 'Nation-state actor conducting reconnaissance',
    storyTh: 'กลุ่มที่ได้รับการสนับสนุนจากรัฐลาดตระเวน',
    objectives: [
      'Detect all reconnaissance attempts',
      'Prevent data exfiltration',
      'Identify C2 channels'
    ],
    objectivesTh: [
      'ตรวจจับความพยายามลาดตระเวนทั้งหมด',
      'ป้องกันการส่งข้อมูลออก',
      'ระบุช่องทาง C2'
    ],
    availableAttacks: ['internet-facing-exploit', 'network-scanning', 'remote-system-discovery', 'standard-protocols', 'screen-capture'],
    initialActionPoints: 22,
    turnLimit: 18,
    successScore: 4000
  },
  8: {
    id: 8,
    name: 'Nation State: Infiltration',
    nameTh: 'รัฐชาติ: การแทรกซึม',
    difficulty: 'medium',
    attackerType: 'APT Group',
    attackerTypeTh: 'กลุ่ม APT',
    story: 'APT attempting to establish persistence',
    storyTh: 'APT พยายามสร้างฐานอยู่ในระบบ',
    objectives: [
      'Root out all persistence mechanisms',
      'Protect firmware integrity',
      'Block C2 communications'
    ],
    objectivesTh: [
      'ถอนรากถอนโคนกลไกอยู่รอดทั้งหมด',
      'ปกป้องความสมบูรณ์ของเฟิร์มแวร์',
      'บล็อกการสื่อสาร C2'
    ],
    availableAttacks: ['firmware-corruption', 'valid-accounts', 'masquerading', 'connection-proxy', 'indicator-removal'],
    initialActionPoints: 25,
    turnLimit: 20,
    successScore: 5000
  },
  9: {
    id: 9,
    name: 'Nation State: Preparation',
    nameTh: 'รัฐชาติ: การเตรียมการ',
    difficulty: 'medium',
    attackerType: 'APT Group',
    attackerTypeTh: 'กลุ่ม APT',
    story: 'APT positioning for coordinated attack',
    storyTh: 'APT วางตำแหน่งเพื่อโจมตีประสานการ',
    objectives: [
      'Stop lateral movement',
      'Protect all grid levels',
      'Maintain full operational capability'
    ],
    objectivesTh: [
      'หยุดการเคลื่อนย้ายด้านข้าง',
      'ปกป้องทุกชั้นของโครงข่าย',
      'รักษาความสามารถการทำงานเต็มที่'
    ],
    availableAttacks: ['default-credentials', 'exploitation-lateral', 'remote-system-discovery', 'data-repositories', 'standard-protocols'],
    initialActionPoints: 28,
    turnLimit: 20,
    successScore: 6000
  },
  10: {
    id: 10,
    name: 'Nation State: Attack Phase 1',
    nameTh: 'รัฐชาติ: การโจมตีระยะที่ 1',
    difficulty: 'hard',
    attackerType: 'APT Group - Full Assault',
    attackerTypeTh: 'กลุ่ม APT - การโจมตีเต็มรูปแบบ',
    story: 'Multi-vector coordinated attack on all levels',
    storyTh: 'การโจมตีประสานการหลายทิศทางทุกชั้น',
    objectives: [
      'Defend against simultaneous attacks',
      'Keep all systems above 50% health',
      'Maintain defensive posture'
    ],
    objectivesTh: [
      'ปกป้องจากการโจมตีพร้อมกัน',
      'รักษาระบบทั้งหมดเหนือ 50% สุขภาพ',
      'รักษาท่าทางการป้องกัน'
    ],
    availableAttacks: ['internet-facing-exploit', 'command-line', 'valid-accounts', 'exploitation-lateral', 'block-commands', 'loss-of-view'],
    initialActionPoints: 30,
    turnLimit: 25,
    successScore: 8000
  },
  11: {
    id: 11,
    name: 'Nation State: Attack Phase 2',
    nameTh: 'รัฐชาติ: การโจมตีระยะที่ 2',
    difficulty: 'hard',
    attackerType: 'APT Group - SCADA Assault',
    attackerTypeTh: 'กลุ่ม APT - การโจมตี SCADA',
    story: 'Direct attack on SCADA and control systems',
    storyTh: 'การโจมตีโดยตรงต่อ SCADA และระบบควบคุม',
    objectives: [
      'Protect Level 1 and 2',
      'Prevent control manipulation',
      'Maintain grid operations'
    ],
    objectivesTh: [
      'ปกป้องชั้น 1 และ 2',
      'ป้องกันการจัดการควบคุม',
      'รักษาการทำงานของโครงข่าย'
    ],
    availableAttacks: ['firmware-corruption', 'block-commands', 'loss-of-control', 'manipulation-control', 'dos-attack', 'loss-of-view'],
    initialActionPoints: 35,
    turnLimit: 25,
    successScore: 10000
  },
  12: {
    id: 12,
    name: 'Final Stand: Save the Grid',
    nameTh: 'การยืนหยัดครั้งสุดท้าย: ช่วยโครงข่าย',
    difficulty: 'hard',
    attackerType: 'APT Group - Final Assault',
    attackerTypeTh: 'กลุ่ม APT - การโจมตีครั้งสุดท้าย',
    story: 'All-out attack attempting cascading grid failure',
    storyTh: 'การโจมตีแบบเต็มรูปแบบพยายามทำให้โครงข่ายล้มเหลวทบทวี',
    objectives: [
      'Survive 30 turns',
      'Protect Level 0 (Physical Process)',
      'Save Thailand from blackout'
    ],
    objectivesTh: [
      'อยู่รอด 30 เทิร์น',
      'ปกป้องชั้น 0 (กระบวนการทางกายภาพ)',
      'ช่วยประเทศไทยจากไฟดับ'
    ],
    availableAttacks: [
      'supply-chain-compromise',
      'firmware-corruption',
      'exploitation-lateral',
      'block-commands',
      'dos-attack',
      'loss-of-control',
      'manipulation-control',
      'loss-of-view',
      'damage-property'
    ],
    initialActionPoints: 40,
    turnLimit: 30,
    successScore: 15000
  }
};

// Export as array for easier iteration
export const levelList = Object.values(levels);

// Get levels by difficulty
export const tutorialLevels = levelList.filter(l => l.difficulty === 'tutorial');
export const easyLevels = levelList.filter(l => l.difficulty === 'easy');
export const mediumLevels = levelList.filter(l => l.difficulty === 'medium');
export const hardLevels = levelList.filter(l => l.difficulty === 'hard');
