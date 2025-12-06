// Core game state types for Cybersecurity Simulation Game

export type Team = 'BLUE' | 'RED';
export type AssetStatus = 'SAFE' | 'COMPROMISED' | 'DENIED';

export interface Vulnerability {
  id: string;
  name: string;           // Thai: "รหัสผ่านอ่อนแอ"
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface SecurityControl {
  id: string;
  type: 'FIREWALL' | 'IDS' | 'PATCHED';
}

export interface Asset {
  id: string;
  name: string;           // Thai: "เซิร์ฟเวอร์ฐานข้อมูล"
  type: 'WORKSTATION' | 'SERVER' | 'DB' | 'GATEWAY' | 'INTERNET';
  zone: 'INTERNET' | 'DMZ' | 'INTERNAL';
  isCritical: boolean;
  discoveredByRed: boolean;
  scannedPortsByRed: boolean;
  vulnerabilities: Vulnerability[];
  status: AssetStatus;
  controls: SecurityControl[];
  position: { x: number; y: number };  // for Konva
  connectedTo: string[];  // IDs of connected assets
}

export type ActionId =
  | 'HOST_SCAN'
  | 'PORT_SCAN'
  | 'FIND_VULN'
  | 'ATTACK'
  | 'DEPLOY_FIREWALL'
  | 'PATCH_ASSET'
  | 'DEPLOY_IDS'
  | 'MONITOR';

export interface ActionTemplate {
  id: ActionId;
  name: string;           // Thai name
  description: string;    // Thai description
  team: Team;
  cost: number;
  duration: number;       // turns to complete
  requiresTarget: boolean;
  canTargetCompromised?: boolean;
}

export interface QueuedAction {
  id: string;
  templateId: ActionId;
  player: Team;
  targetId?: string;
  remainingTurns: number;
}

export interface PlayerResources {
  money: number;
  staff: number;
  redPoints: number;
}

export type Phase = 'PLAYER_TURN' | 'AI_TURN' | 'RESOLVE' | 'CHECK_WIN' | 'GAME_OVER';

export interface GameState {
  assets: Asset[];
  queue: QueuedAction[];
  turnNumber: number;
  currentTurn: Team;
  phase: Phase;
  maxTurns: number;
  blueResources: PlayerResources;
  redResources: PlayerResources;
  notifications: string[];  // Thai messages
  winner?: Team | 'DRAW';
  selectedAssetId?: string;
}

export type GameAction =
  | { type: 'SELECT_ASSET'; assetId?: string }
  | { type: 'QUEUE_ACTION'; actionId: ActionId; targetId?: string }
  | { type: 'END_TURN' }
  | { type: 'RESOLVE_ACTIONS' }
  | { type: 'AI_TURN' }
  | { type: 'CHECK_VICTORY' }
  | { type: 'RESET_GAME' };
