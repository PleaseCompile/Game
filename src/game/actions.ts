// Action template definitions with Thai localization
import { ActionTemplate } from './gameState';

export const ACTION_TEMPLATES: Record<string, ActionTemplate> = {
  // RED TEAM ACTIONS
  HOST_SCAN: {
    id: 'HOST_SCAN',
    name: 'สแกนหาโฮสต์',
    description: 'ค้นหาอุปกรณ์ในเครือข่าย (ค้นพบ assets ในโซนถัดไป)',
    team: 'RED',
    cost: 0,
    duration: 1,
    requiresTarget: false,
  },
  
  PORT_SCAN: {
    id: 'PORT_SCAN',
    name: 'สแกนพอร์ต',
    description: 'สแกนพอร์ตเพื่อระบุประเภทของอุปกรณ์',
    team: 'RED',
    cost: 0,
    duration: 1,
    requiresTarget: true,
  },
  
  FIND_VULN: {
    id: 'FIND_VULN',
    name: 'ค้นหาช่องโหว่',
    description: 'ค้นหาช่องโหว่ในระบบเป้าหมาย',
    team: 'RED',
    cost: 0,
    duration: 2,
    requiresTarget: true,
  },
  
  ATTACK: {
    id: 'ATTACK',
    name: 'โจมตี',
    description: 'โจมตีช่องโหว่เพื่อยึดครองระบบ',
    team: 'RED',
    cost: 0,
    duration: 1,
    requiresTarget: true,
    canTargetCompromised: false,
  },
  
  // BLUE TEAM ACTIONS
  DEPLOY_FIREWALL: {
    id: 'DEPLOY_FIREWALL',
    name: 'ติดตั้ง Firewall',
    description: 'ติดตั้งไฟร์วอลล์เพื่อลดโอกาสการโจมตีสำเร็จ',
    team: 'BLUE',
    cost: 100,
    duration: 2,
    requiresTarget: true,
  },
  
  PATCH_ASSET: {
    id: 'PATCH_ASSET',
    name: 'แพทช์ระบบ',
    description: 'แพทช์ช่องโหว่ในระบบเป้าหมาย',
    team: 'BLUE',
    cost: 50,
    duration: 2,
    requiresTarget: true,
  },
  
  DEPLOY_IDS: {
    id: 'DEPLOY_IDS',
    name: 'ติดตั้ง IDS',
    description: 'ติดตั้งระบบตรวจจับการบุกรุก (แจ้งเตือนเมื่อถูกโจมตี)',
    team: 'BLUE',
    cost: 150,
    duration: 2,
    requiresTarget: true,
  },
  
  MONITOR: {
    id: 'MONITOR',
    name: 'ตรวจสอบระบบ',
    description: 'ตรวจสอบและค้นหาระบบที่ถูกบุกรุก',
    team: 'BLUE',
    cost: 75,
    duration: 1,
    requiresTarget: false,
  },
};
