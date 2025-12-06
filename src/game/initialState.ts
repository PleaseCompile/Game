// Initial game state with network topology
import { GameState, Asset } from './gameState';

// Create initial network assets (5 nodes)
export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'internet',
    name: 'อินเทอร์เน็ต',
    type: 'INTERNET',
    zone: 'INTERNET',
    isCritical: false,
    discoveredByRed: true,  // Red starts here
    scannedPortsByRed: true,
    vulnerabilities: [],
    status: 'SAFE',
    controls: [],
    position: { x: 100, y: 300 },
    connectedTo: ['gateway'],
  },
  {
    id: 'gateway',
    name: 'ไฟร์วอลล์หลัก',
    type: 'GATEWAY',
    zone: 'DMZ',
    isCritical: false,
    discoveredByRed: false,
    scannedPortsByRed: false,
    vulnerabilities: [
      {
        id: 'vuln-gw-1',
        name: 'การตั้งค่าไฟร์วอลล์ไม่เหมาะสม',
        severity: 'MEDIUM',
      },
    ],
    status: 'SAFE',
    controls: [],
    position: { x: 300, y: 300 },
    connectedTo: ['internet', 'webserver', 'workstation', 'database'],
  },
  {
    id: 'webserver',
    name: 'เว็บเซิร์ฟเวอร์',
    type: 'SERVER',
    zone: 'DMZ',
    isCritical: false,
    discoveredByRed: false,
    scannedPortsByRed: false,
    vulnerabilities: [
      {
        id: 'vuln-web-1',
        name: 'รหัสผ่านอ่อนแอ',
        severity: 'HIGH',
      },
    ],
    status: 'SAFE',
    controls: [],
    position: { x: 500, y: 200 },
    connectedTo: ['gateway'],
  },
  {
    id: 'workstation',
    name: 'เครื่องพนักงาน',
    type: 'WORKSTATION',
    zone: 'INTERNAL',
    isCritical: false,
    discoveredByRed: false,
    scannedPortsByRed: false,
    vulnerabilities: [
      {
        id: 'vuln-ws-1',
        name: 'ซอฟต์แวร์ล้าสมัย',
        severity: 'MEDIUM',
      },
    ],
    status: 'SAFE',
    controls: [],
    position: { x: 500, y: 400 },
    connectedTo: ['gateway', 'database'],
  },
  {
    id: 'database',
    name: 'เซิร์ฟเวอร์ฐานข้อมูล',
    type: 'DB',
    zone: 'INTERNAL',
    isCritical: true,  // Critical asset!
    discoveredByRed: false,
    scannedPortsByRed: false,
    vulnerabilities: [
      {
        id: 'vuln-db-1',
        name: 'SQL Injection',
        severity: 'HIGH',
      },
      {
        id: 'vuln-db-2',
        name: 'การเข้ารหัสข้อมูลไม่เพียงพอ',
        severity: 'MEDIUM',
      },
    ],
    status: 'SAFE',
    controls: [],
    position: { x: 700, y: 300 },
    connectedTo: ['gateway', 'workstation'],
  },
];

export const INITIAL_STATE: GameState = {
  assets: INITIAL_ASSETS,
  queue: [],
  turnNumber: 1,
  currentTurn: 'BLUE',
  phase: 'PLAYER_TURN',
  maxTurns: 20,
  blueResources: {
    money: 15,
    staff: 3,
    income: 3,  // รายได้ต่อเทิร์น
  },
  redResources: {
    hackingPoints: 5,        // เริ่มต้นมีพอสำหรับ 2-3 actions
    maxHackingPoints: 30,
    botnetSize: 0,
    reputation: 0,
  },
  notifications: ['🎮 เกมเริ่มต้น! Blue Team ป้องกันเครือข่ายจาก Red Team (AI)'],
  selectedAssetId: undefined,
};
