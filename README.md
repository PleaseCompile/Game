# 🎮 Smart Grid Cyber Defense Game | เกมปกป้องโครงข่ายไฟฟ้าอัจฉริยะ

An educational cybersecurity game that teaches players about protecting critical infrastructure through interactive gameplay based on real-world security frameworks.

![Game Intro](https://github.com/user-attachments/assets/d4d3896c-34f3-455c-aa8a-6a1ba781445f)
![Tutorial](https://github.com/user-attachments/assets/a4b1b2ed-1fa4-4f45-9bab-a97add4f79b9)
![Gameplay](https://github.com/user-attachments/assets/f8ceff4a-a32e-4f84-b3ec-9c78e5d0de28)

## 🌟 Features

### Educational Framework
- **MITRE ATT&CK for ICS**: Attack patterns based on real-world industrial control system threats
- **NIST Cybersecurity Framework**: Defense strategies following IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER
- **ISA-95/Purdue Model**: Realistic 7-layer Smart Grid architecture visualization
- **Thai Language Support**: Full bilingual interface (Thai/English)

### Game Mechanics
- **Turn-Based Strategy**: Plan defenses and respond to attacks in tactical turns
- **12 Progressive Levels**: From tutorial scenarios to nation-state APT attacks
- **Action Points System**: Resource management adds strategic depth
- **Attack Chain Visualization**: Watch attackers progress through the kill chain
- **Achievement System**: Unlock new defenses and earn badges
- **Real-Time Feedback**: Educational tooltips and mentor guidance

### Attack Types (MITRE ATT&CK ICS)
- Initial Access: Spear Phishing, Internet-Facing Exploits, Supply Chain Compromise
- Execution: Scripting, Command-Line Interface
- Persistence: Valid Accounts, Firmware Corruption
- Evasion: Masquerading, Indicator Removal
- Discovery: Network Scanning, Remote System Discovery
- Lateral Movement: Default Credentials, Exploitation
- Collection: Data from Repositories, Screen Capture
- Command & Control: Standard Protocols, Connection Proxy
- Inhibit Response: Block Commands, Denial of Service
- Impact: Loss of Control, Manipulation, Damage to Property

### Defense Options (NIST Framework)
- **IDENTIFY**: Asset Discovery, Risk Assessment
- **PROTECT**: Firewall, Access Control, Encryption, Network Segmentation
- **DETECT**: IDS/IPS, SIEM, Anomaly Detection, Protocol Analyzer
- **RESPOND**: Incident Response, Containment, Forensics, EDR
- **RECOVER**: Backup & Restore, System Recovery, Redundancy

### Smart Grid Components (Purdue Model)
- Level 5: Enterprise Network
- Level 4: Business Planning
- Level 3.5: DMZ (Demilitarized Zone)
- Level 3: Operations Management
- Level 2: Supervisory Control (SCADA/HMI)
- Level 1: Basic Control (PLC/RTU)
- Level 0: Physical Process (Sensors/Actuators)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/PleaseCompile/Game.git
cd Game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The project uses:
- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS** for cyberpunk-themed styling
- No external UI libraries - everything custom built

## 🎯 How to Play

### Objective
Protect the Thai National Grid from cyber attacks across 12 challenging levels.

### Controls
1. **Deploy Defenses**: Click on defense cards to select, then deploy them
2. **Monitor Grid**: Watch health bars for all 7 Purdue Model levels
3. **Read Attack Log**: Track what attackers are doing in real-time
4. **Manage Action Points**: Each defense costs AP - spend wisely!
5. **End Turn**: Click "End Turn" when ready to proceed

### Strategy Tips
- **Early Detection**: Deploy DETECT defenses first to see attacks coming
- **Layer Defense**: Protect multiple levels of the grid
- **Counter Tactics**: Match defenses to expected attack types
- **Resource Management**: Don't spend all AP at once
- **Read Briefings**: Each level tells you what to expect

## 📚 Educational Value

This game teaches:
- **Real Security Frameworks**: MITRE ATT&CK, NIST CSF, ISA-95
- **Critical Infrastructure**: How power grids are structured and protected
- **Cyber Defense**: Practical security concepts and strategies
- **Threat Actors**: From hacktivists to nation-state APTs
- **Incident Response**: How to detect, respond, and recover

Perfect for:
- Cybersecurity students
- ICS/SCADA professionals
- Security awareness training
- Educational institutions
- Anyone interested in critical infrastructure protection

## 🏆 Levels & Progression

### Tutorial Levels (1-3)
- Learn the Purdue Model
- Understand basic defenses
- Master attack chains

### Easy Levels (4-6)
- **Level 4**: Hacktivist Campaign
- **Level 5**: Ransomware Gang
- **Level 6**: Organized Crime

### Medium Levels (7-9)
- **Level 7**: Nation State - Reconnaissance
- **Level 8**: Nation State - Infiltration
- **Level 9**: Nation State - Preparation

### Hard Levels (10-12)
- **Level 10**: Nation State - Attack Phase 1
- **Level 11**: Nation State - Attack Phase 2
- **Level 12**: Final Stand - Save the Grid!

## 🎨 Design

### Cyberpunk Theme
- Animated grid background
- Neon glow effects
- Monospace font (Courier New)
- Dark color scheme with cyan/magenta accents
- Responsive design for mobile and desktop

### Color Palette
- Primary: Dark blue (#0a0e27)
- Accent: Cyan (#00ffff), Magenta (#ff00ff)
- Status: Green (safe), Yellow (warning), Red (critical)

## 📖 References

The game is based on real-world frameworks and research:
- [MITRE ATT&CK for ICS](https://attack.mitre.org/matrices/ics/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [ISA-95 Standard (Purdue Model)](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95)
- ThreatGEN Red vs Blue (inspiration for game mechanics)
- DOE Electric Grid Security Reports
- Smart Grid Cyber Security Research Papers

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with animations
- **State Management**: React Hooks (custom)
- **No External Dependencies**: Pure React implementation

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── Game.tsx           # Main game orchestrator
│   ├── HUD.tsx            # Heads-up display
│   ├── GridVisualization.tsx  # Purdue Model display
│   ├── DefensePanel.tsx   # NIST Framework defenses
│   ├── AttackLog.tsx      # Real-time attack feed
│   ├── StoryPanel.tsx     # Narrative screens
│   ├── TutorialOverlay.tsx # Tutorial system
│   ├── MentorDialog.tsx   # Dr. Somchai guidance
│   ├── AchievementPopup.tsx # Achievement notifications
│   └── GameOver.tsx       # Victory/defeat screen
├── data/            # Game content
│   ├── story.ts          # Narratives and dialogues
│   ├── tutorials.ts      # Tutorial steps
│   ├── attacks.ts        # MITRE ATT&CK attacks
│   ├── defenses.ts       # NIST defenses
│   ├── achievements.ts   # Achievement definitions
│   └── levels.ts         # Level configurations
├── hooks/           # Custom React hooks
│   ├── useGameState.ts      # Main game state
│   ├── useGameProgression.ts # Level progression
│   ├── useAchievements.ts   # Achievement tracking
│   └── useTutorial.ts       # Tutorial flow
├── types/           # TypeScript definitions
│   └── game.ts
├── utils/           # Game logic utilities
│   └── gameLogic.ts
├── styles/          # CSS styling
│   └── game.css
├── App.tsx
└── main.tsx
```

## 🤝 Contributing

This is an educational project. Contributions are welcome!

Areas for improvement:
- Additional levels and scenarios
- More attack types from MITRE ATT&CK
- Enhanced visualizations
- Sound effects and music
- Multiplayer mode
- Additional language support

## 📝 License

ISC

## 👥 Credits

- **Frameworks**: MITRE, NIST, ISA
- **Inspiration**: ThreatGEN Red vs Blue
- **Character**: Dr. Somchai (fictional mentor)

## 🎓 Educational Disclaimer

This game is for educational purposes only. Attack techniques are simplified representations of real-world threats. Always follow responsible disclosure practices and legal guidelines in cybersecurity work.

---

**Built with ❤️ for cybersecurity education and critical infrastructure protection**

