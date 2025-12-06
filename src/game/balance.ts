// Game Balance Constants
// Central location for all balance-related values to make tuning easier

// Blue Team Starting Resources
export const BLUE_STARTING_MONEY = 15;
export const BLUE_STARTING_STAFF = 3;
export const BLUE_BASE_INCOME = 3;

// Red Team Starting Resources
export const RED_STARTING_HACKING_POINTS = 5;
export const RED_MAX_HACKING_POINTS = 30;
export const RED_STARTING_BOTNET_SIZE = 0;
export const RED_STARTING_REPUTATION = 0;

// Red Team Income
export const RED_BASE_INCOME = 2;
export const RED_INCOME_SERVER = 3;        // Crypto mining
export const RED_INCOME_WORKSTATION = 1;   // Botnet node
export const RED_INCOME_DATABASE = 5;      // Sell data on dark web
export const RED_INCOME_GATEWAY = 2;       // Control point

// Red Team Action Costs
export const RED_COST_RECON = 1;           // HOST_SCAN, PORT_SCAN
export const RED_COST_FIND_VULN = 2;
export const RED_COST_ATTACK_HIGH_VULN = 3; // High severity vulnerability
export const RED_COST_ATTACK_OTHER = 4;     // Medium/Low severity

// Game Settings
export const MAX_TURNS = 20;
