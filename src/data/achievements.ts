import { Achievement } from '../types/game';

export const achievements: Record<string, Achievement> = {
  'first-defense': {
    id: 'first-defense',
    name: 'First Line of Defense',
    nameTh: 'แนวป้องกันแนวแรก',
    description: 'Deploy your first defense',
    descriptionTh: 'ติดตั้งการป้องกันแรกของคุณ',
    icon: '🛡️',
    condition: (state) => state.activeDefenses.length > 0
  },
  'tutorial-complete': {
    id: 'tutorial-complete',
    name: 'Security Analyst',
    nameTh: 'นักวิเคราะห์ความปลอดภัย',
    description: 'Complete all tutorial levels',
    descriptionTh: 'จบบทเรียนทุกด่าน',
    icon: '🎓',
    condition: (state) => state.currentLevel > 3
  },
  'perfect-defense': {
    id: 'perfect-defense',
    name: 'Impenetrable',
    nameTh: 'แทรกซึมไม่ได้',
    description: 'Complete a level without taking any damage',
    descriptionTh: 'จบด่านโดยไม่ได้รับความเสียหายเลย',
    icon: '💎',
    condition: (state) => {
      return Object.values(state.gridHealth).every(h => h === 100);
    }
  },
  'block-10-attacks': {
    id: 'block-10-attacks',
    name: 'Defender',
    nameTh: 'ผู้ปกป้อง',
    description: 'Block 10 attacks',
    descriptionTh: 'บล็อกการโจมตี 10 ครั้ง',
    icon: '🛡️',
    condition: (state) => {
      return state.attackChain.filter(a => a.blocked).length >= 10;
    }
  },
  'block-50-attacks': {
    id: 'block-50-attacks',
    name: 'Guardian',
    nameTh: 'ผู้พิทักษ์',
    description: 'Block 50 attacks',
    descriptionTh: 'บล็อกการโจมตี 50 ครั้ง',
    icon: '🏰',
    condition: (state) => {
      return state.attackChain.filter(a => a.blocked).length >= 50;
    }
  },
  'master-identifier': {
    id: 'master-identifier',
    name: 'Master of Identification',
    nameTh: 'ปรมาจารย์การระบุ',
    description: 'Deploy 5 IDENTIFY defenses in one game',
    descriptionTh: 'ติดตั้งการป้องกัน IDENTIFY 5 อันในเกมเดียว',
    icon: '🔍',
    condition: (state) => {
      return state.activeDefenses.filter(d => d.function === 'identify').length >= 5;
    }
  },
  'master-protector': {
    id: 'master-protector',
    name: 'Master of Protection',
    nameTh: 'ปรมาจารย์การปกป้อง',
    description: 'Deploy 5 PROTECT defenses in one game',
    descriptionTh: 'ติดตั้งการป้องกัน PROTECT 5 อันในเกมเดียว',
    icon: '🔐',
    condition: (state) => {
      return state.activeDefenses.filter(d => d.function === 'protect').length >= 5;
    }
  },
  'master-detector': {
    id: 'master-detector',
    name: 'Master of Detection',
    nameTh: 'ปรมาจารย์การตรวจจับ',
    description: 'Deploy 5 DETECT defenses in one game',
    descriptionTh: 'ติดตั้งการป้องกัน DETECT 5 อันในเกมเดียว',
    icon: '👁️',
    condition: (state) => {
      return state.activeDefenses.filter(d => d.function === 'detect').length >= 5;
    }
  },
  'quick-response': {
    id: 'quick-response',
    name: 'Lightning Response',
    nameTh: 'การตอบสนองสายฟ้า',
    description: 'Use a RESPOND defense in the first turn',
    descriptionTh: 'ใช้การป้องกัน RESPOND ในเทิร์นแรก',
    icon: '⚡',
    condition: (state) => {
      return state.turn === 1 && state.activeDefenses.some(d => d.function === 'respond');
    }
  },
  'full-recovery': {
    id: 'full-recovery',
    name: 'Phoenix',
    nameTh: 'ฟีนิกซ์',
    description: 'Use RECOVER defenses to restore all systems',
    descriptionTh: 'ใช้การป้องกัน RECOVER เพื่อกู้คืนระบบทั้งหมด',
    icon: '🔄',
    condition: (state) => {
      const hadDamage = Object.values(state.gridHealth).some(h => h < 100);
      const nowHealthy = Object.values(state.gridHealth).every(h => h > 90);
      return hadDamage && nowHealthy && state.activeDefenses.some(d => d.function === 'recover');
    }
  },
  'defeat-hacktivists': {
    id: 'defeat-hacktivists',
    name: 'Hacktivist Hunter',
    nameTh: 'นักล่า Hacktivist',
    description: 'Defeat the hacktivist campaign',
    descriptionTh: 'เอาชนะแคมเปญ hacktivist',
    icon: '🎯',
    condition: (state) => state.currentLevel > 4
  },
  'defeat-ransomware': {
    id: 'defeat-ransomware',
    name: 'Ransomware Neutralizer',
    nameTh: 'ผู้ทำลาย Ransomware',
    description: 'Defeat the ransomware gang',
    descriptionTh: 'เอาชนะแก๊ง ransomware',
    icon: '💰',
    condition: (state) => state.currentLevel > 5
  },
  'defeat-organized-crime': {
    id: 'defeat-organized-crime',
    name: 'Crime Fighter',
    nameTh: 'นักสู้อาชญากรรม',
    description: 'Defeat organized crime',
    descriptionTh: 'เอาชนะอาชญากรองค์กร',
    icon: '🕵️',
    condition: (state) => state.currentLevel > 6
  },
  'defeat-apt': {
    id: 'defeat-apt',
    name: 'APT Destroyer',
    nameTh: 'ผู้ทำลาย APT',
    description: 'Defeat nation-state APT attacks',
    descriptionTh: 'เอาชนะการโจมตี APT จากรัฐชาติ',
    icon: '🎖️',
    condition: (state) => state.currentLevel > 9
  },
  'high-score': {
    id: 'high-score',
    name: 'High Achiever',
    nameTh: 'ผู้บรรลุสูง',
    description: 'Score 10,000 points',
    descriptionTh: 'ทำคะแนนได้ 10,000 คะแนน',
    icon: '⭐',
    condition: (state) => state.score >= 10000
  },
  'efficiency': {
    id: 'efficiency',
    name: 'Efficient Defender',
    nameTh: 'ผู้ปกป้องที่มีประสิทธิภาพ',
    description: 'Complete a level using less than 50% of available action points',
    descriptionTh: 'จบด่านโดยใช้น้อยกว่า 50% ของ action points ที่มี',
    icon: '💡',
    condition: (state) => {
      // This would need to track total available AP vs used
      return state.actionPoints > 5;
    }
  },
  'strategic-mind': {
    id: 'strategic-mind',
    name: 'Strategic Mastermind',
    nameTh: 'ปรมาจารย์กลยุทธ์',
    description: 'Use all 5 NIST Framework functions in one level',
    descriptionTh: 'ใช้ทั้ง 5 ฟังก์ชันของ NIST Framework ในด่านเดียว',
    icon: '🧠',
    condition: (state) => {
      const functions = new Set(state.activeDefenses.map(d => d.function));
      return functions.size === 5;
    }
  },
  'savior': {
    id: 'savior',
    name: 'Savior of Thailand',
    nameTh: 'ผู้กอบกู้ประเทศไทย',
    description: 'Complete all 12 levels',
    descriptionTh: 'จบทั้ง 12 ด่าน',
    icon: '🏆',
    condition: (state) => state.currentLevel > 12
  },
  'legendary': {
    id: 'legendary',
    name: 'Legendary Defender',
    nameTh: 'ผู้ปกป้องในตำนาน',
    description: 'Score 50,000 points',
    descriptionTh: 'ทำคะแนนได้ 50,000 คะแนน',
    icon: '👑',
    condition: (state) => state.score >= 50000
  }
};

// Export array for easier iteration
export const achievementList = Object.values(achievements);

// Check for new achievements
export function checkAchievements(state: any): string[] {
  const newAchievements: string[] = [];
  
  for (const achievement of achievementList) {
    // Skip if already earned
    if (state.achievements.includes(achievement.id)) {
      continue;
    }
    
    // Check if condition is met
    if (achievement.condition(state)) {
      newAchievements.push(achievement.id);
    }
  }
  
  return newAchievements;
}
