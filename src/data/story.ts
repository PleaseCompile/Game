import { Story, Mentor } from '../types/game';

export const mentor: Mentor = {
  name: 'Dr. Somchai',
  nameTh: 'ดร. สมชาย',
  avatar: '👨‍💼',
  personality: 'experienced and supportive'
};

export const story: Story = {
  intro: `Welcome to Thai National Grid Security Operations Center.

You are a newly appointed Security Analyst tasked with protecting Thailand's critical power infrastructure from cyber threats. The grid serves millions of people, and any disruption could have catastrophic consequences.

Your mentor, Dr. Somchai, will guide you through understanding and defending our Smart Grid systems against sophisticated attackers.`,

  introTh: `ยินดีต้อนรับสู่ศูนย์ปฏิบัติการรักษาความปลอดภัยโครงข่ายไฟฟ้าแห่งชาติไทย

คุณเป็นนักวิเคราะห์ความปลอดภัยที่ได้รับการแต่งตั้งใหม่ มีหน้าที่ปกป้องโครงสร้างพื้นฐานด้านพลังงานที่สำคัญของประเทศไทยจากภัยคุกคามทางไซเบอร์ โครงข่ายไฟฟ้าให้บริการประชาชนหลายล้านคน และการหยุดชะงักใดๆ อาจก่อให้เกิดผลกระทบร้ายแรง

ดร. สมชาย พี่เลี้ยงของคุณ จะให้คำแนะนำในการทำความเข้าใจและปกป้องระบบ Smart Grid จากผู้โจมตีที่มีความซับซ้อน`,

  mentorIntro: `Hello! I'm Dr. Somchai, Chief Security Officer for the Thai National Grid.

I've been protecting our power infrastructure for 20 years. Today, the threats are more sophisticated than ever - from script kiddies to nation-state actors.

I'll teach you everything you need to know about:
- The Purdue Model (ISA-95) - how our grid is structured
- MITRE ATT&CK for ICS - understanding attacker tactics
- NIST Cybersecurity Framework - our defense strategy

Let's begin with the basics. Ready?`,

  mentorIntroTh: `สวัสดีครับ! ผมดร. สมชาย หัวหน้าเจ้าหน้าที่รักษาความปลอดภัยของโครงข่ายไฟฟ้าแห่งชาติไทย

ผมปกป้องโครงสร้างพื้นฐานด้านพลังงานมา 20 ปี ปัจจุบันภัยคุกคามมีความซับซ้อนมากกว่าที่เคย - ตั้งแต่แฮกเกอร์มือใหม่ไปจนถึงกลุ่มที่ได้รับการสนับสนุนจากรัฐ

ผมจะสอนทุกอย่างที่คุณต้องรู้เกี่ยวกับ:
- Purdue Model (ISA-95) - โครงสร้างของโครงข่ายไฟฟ้า
- MITRE ATT&CK for ICS - ทำความเข้าใจกลยุทธ์ของผู้โจมตี
- NIST Cybersecurity Framework - กลยุทธ์การป้องกัน

มาเริ่มกันที่พื้นฐานครับ พร้อมหรือยัง?`,

  levelBriefings: {
    1: `Tutorial Level 1: Understanding the Grid

Our Smart Grid operates on the Purdue Model with 7 layers:
- Level 5: Enterprise Network (business systems)
- Level 4: Business Planning
- Level 3.5: DMZ (demilitarized zone)
- Level 3: Operations Management
- Level 2: Supervisory Control (SCADA/HMI)
- Level 1: Basic Control (PLC/RTU)
- Level 0: Physical Process (sensors, actuators)

Each level is critical. A breach at any level can cascade down to cause physical damage.`,

    2: `Tutorial Level 2: Basic Defense

You have Action Points (AP) each turn. Use them wisely to:
- Deploy defenses (IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER)
- Scan for threats
- Respond to incidents

The attacker moves each turn. You must predict and counter their actions.`,

    3: `Tutorial Level 3: Attack Chains

Attackers follow the MITRE ATT&CK kill chain:
1. Initial Access - Getting in
2. Execution - Running code
3. Persistence - Staying hidden
4. Discovery - Finding targets
5. Lateral Movement - Moving deeper
6. Impact - Causing damage

Stop them early in the chain!`,

    4: `Level 4: Hacktivist Campaign

Intelligence reports indicate a hacktivist group is targeting our grid to protest energy policies. They're unsophisticated but motivated.

Expected tactics:
- Public exploits
- DDoS attacks
- Website defacement

They want attention, not destruction. But they can still cause blackouts.`,

    5: `Level 5: Ransomware Gang

A ransomware group has targeted multiple energy companies. They encrypt SCADA systems and demand payment.

Expected tactics:
- Phishing emails
- Remote Desktop Protocol attacks
- File encryption

They're in it for money. Protect our backup systems!`,

    6: `Level 6: Organized Crime

An organized crime syndicate is attempting to manipulate energy markets by causing selective outages.

Expected tactics:
- Supply chain compromise
- Insider threats
- Market manipulation

They're well-funded and patient. Stay vigilant!`,

    7: `Level 7: Nation State - Reconnaissance

Intelligence suggests a nation-state actor is conducting reconnaissance on critical infrastructure.

Expected tactics:
- Advanced Persistent Threat (APT)
- Zero-day exploits
- Living off the land

They're gathering intelligence for a future attack. We must expose them.`,

    8: `Level 8: Nation State - Infiltration

The APT group is back, attempting to establish persistence in our systems.

Expected tactics:
- Firmware compromise
- Certificate theft
- Command & Control channels

They're preparing for a major operation. Root them out!`,

    9: `Level 9: Nation State - Preparation

The attackers are positioning themselves for a coordinated attack on multiple grid components.

Expected tactics:
- Lateral movement across zones
- Credential harvesting
- Infrastructure mapping

This is getting serious. Full alert!`,

    10: `Level 10: Nation State - Attack Phase 1

They're launching the attack! Multiple simultaneous intrusions across all grid levels.

Expected tactics:
- Multi-vector attacks
- Coordinated timing
- Redundancy exploitation

This is what we trained for. Hold the line!`,

    11: `Level 11: Nation State - Attack Phase 2

The attack is intensifying. They're targeting our SCADA systems directly.

Expected tactics:
- Protocol manipulation
- False data injection
- Control system override

Protect the supervisory control layer at all costs!`,

    12: `Level 12: Final Stand

This is it. They're attempting to cause cascading failures across the entire grid.

Expected tactics:
- Everything they've got
- Coordinated infrastructure attack
- Physical damage attempts

Save the grid. Save Thailand. You can do this!`
  },

  levelBriefingsTh: {
    1: `บทเรียน 1: ทำความเข้าใจโครงข่ายไฟฟ้า

Smart Grid ใช้ Purdue Model ซึ่งมี 7 ชั้น:
- ชั้นที่ 5: Enterprise Network (ระบบธุรกิจ)
- ชั้นที่ 4: Business Planning (วางแผนธุรกิจ)
- ชั้นที่ 3.5: DMZ (เขต demilitarized)
- ชั้นที่ 3: Operations Management (การจัดการปฏิบัติการ)
- ชั้นที่ 2: Supervisory Control (SCADA/HMI)
- ชั้นที่ 1: Basic Control (PLC/RTU)
- ชั้นที่ 0: Physical Process (เซ็นเซอร์, actuators)

แต่ละชั้นสำคัญมาก การถูกบุกรุกที่ชั้นใดก็อาจลุกลามลงไปสร้างความเสียหายทางกายภาพได้`,

    2: `บทเรียน 2: การป้องกันพื้นฐาน

คุณมี Action Points (AP) ในแต่ละเทิร์น ใช้อย่างชาญฉลาดเพื่อ:
- ติดตั้งการป้องกัน (IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER)
- สแกนหาภัยคุกคาม
- ตอบสนองต่อเหตุการณ์

ผู้โจมตีเคลื่อนไหวทุกเทิร์น คุณต้องคาดการณ์และตอบโต้`,

    3: `บทเรียน 3: ลำดับการโจมตี

ผู้โจมตีทำตาม MITRE ATT&CK kill chain:
1. Initial Access - การเข้าสู่ระบบ
2. Execution - รันโค้ด
3. Persistence - ซ่อนตัว
4. Discovery - หาเป้าหมาย
5. Lateral Movement - เคลื่อนไหวลึกเข้าไป
6. Impact - สร้างความเสียหาย

หยุดพวกเขาตั้งแต่เริ่มต้น!`,

    4: `ด่าน 4: แคมเปญ Hacktivist

รายงานข่าวกรองระบุว่ากลุ่ม hacktivist กำลังมุ่งเป้าหมายโครงข่ายเพื่อประท้วงนโยบายพลังงาน พวกเขาไม่ซับซ้อนแต่มีแรงจูงใจ

กลยุทธ์ที่คาดว่าจะใช้:
- การใช้ประโยชน์จากช่องโหว่สาธารณะ
- การโจมตี DDoS
- การทำลายเว็บไซต์

พวกเขาต้องการความสนใจ ไม่ใช่การทำลาย แต่ยังทำให้ไฟดับได้`,

    5: `ด่าน 5: แก๊ง Ransomware

กลุ่ม ransomware กำลังโจมตีบริษัทพลังงานหลายแห่ง พวกเขาเข้ารหัสระบบ SCADA และเรียกค่าไถ่

กลยุทธ์ที่คาดว่าจะใช้:
- อีเมล Phishing
- การโจมตีผ่าน Remote Desktop Protocol
- การเข้ารหัสไฟล์

พวกเขาต้องการเงิน ปกป้องระบบสำรองของเรา!`,

    6: `ด่าน 6: องค์กรอาชญากรรม

กลุ่มอาชญากรองค์กรพยายามจัดการตลาดพลังงานโดยทำให้เกิดไฟดับเฉพาะจุด

กลยุทธ์ที่คาดว่าจะใช้:
- การบุกรุก supply chain
- ภัยคุกคามจากภายใน
- การจัดการตลาด

พวกเขามีเงินทุนดีและอดทน ระวังให้ดี!`,

    7: `ด่าน 7: รัฐชาติ - การลาดตระเวน

ข่าวกรองชี้ว่ากลุ่มที่ได้รับการสนับสนุนจากรัฐกำลังลาดตระเวนโครงสร้างพื้นฐานที่สำคัญ

กลยุทธ์ที่คาดว่าจะใช้:
- Advanced Persistent Threat (APT)
- การใช้ประโยชน์จาก zero-day
- Living off the land

พวกเขากำลังเก็บข้อมูลสำหรับการโจมตีในอนาคต เราต้องเปิดโปงพวกเขา`,

    8: `ด่าน 8: รัฐชาติ - การแทรกซึม

กลุ่ม APT กลับมาและพยายามสร้างฐานในระบบของเรา

กลยุทธ์ที่คาดว่าจะใช้:
- การบุกรุก firmware
- การขโมย certificate
- การสร้างช่องทาง Command & Control

พวกเขากำลังเตรียมการสำหรับปฏิบัติการใหญ่ ถอนรากถอนโคนพวกเขา!`,

    9: `ด่าน 9: รัฐชาติ - การเตรียมการ

ผู้โจมตีกำลังวางตำแหน่งเพื่อโจมตีประสานการหลายส่วนของโครงข่าย

กลยุทธ์ที่คาดว่าจะใช้:
- Lateral movement ข้ามโซน
- การเก็บรวบรวม credential
- การทำแผนที่โครงสร้าง

เรื่องกำลังจริงจัง เตรียมพร้อมเต็มที่!`,

    10: `ด่าน 10: รัฐชาติ - การโจมตีระยะที่ 1

พวกเขาเริ่มโจมตีแล้ว! การบุกรุกพร้อมกันหลายจุดทุกชั้นของโครงข่าย

กลยุทธ์ที่คาดว่าจะใช้:
- การโจมตีหลายทิศทาง
- การประสานเวลา
- การใช้ประโยชน์จากการสำรอง

นี่คือสิ่งที่เราฝึกมา ยืนหยัดให้มั่น!`,

    11: `ด่าน 11: รัฐชาติ - การโจมตีระยะที่ 2

การโจมตีรุนแรงขึ้น พวกเขากำลังโจมตีระบบ SCADA โดยตรง

กลยุทธ์ที่คาดว่าจะใช้:
- การจัดการ protocol
- การฉีดข้อมูลเท็จ
- การควบคุมระบบแทนที่

ปกป้องชั้นควบคุมการกำกับดูแลไม่ว่าจะเกิดอะไร!`,

    12: `ด่าน 12: การยืนหยัดครั้งสุดท้าย

นี่คือมันแล้ว พวกเขาพยายามทำให้เกิดความล้มเหลวแบบทบทวีทั่วทั้งโครงข่าย

กลยุทธ์ที่คาดว่าจะใช้:
- ทุกอย่างที่พวกเขามี
- การโจมตีโครงสร้างแบบประสานงาน
- ความพยายามสร้างความเสียหายทางกายภาพ

ช่วยโครงข่าย ช่วยประเทศไทย คุณทำได้!`
  },

  victoryMessages: {
    1: 'Excellent work! You understand the grid structure now.',
    2: 'Well done! You\'ve mastered basic defense deployment.',
    3: 'Perfect! You can identify and stop attack chains.',
    4: 'Outstanding! The hacktivists have been repelled.',
    5: 'Brilliant! The ransomware gang failed to encrypt our systems.',
    6: 'Superb! The organized crime syndicate has been thwarted.',
    7: 'Exceptional! You detected the nation-state reconnaissance.',
    8: 'Magnificent! The APT infiltration was stopped.',
    9: 'Incredible! You prevented their attack preparation.',
    10: 'Heroic! You held the line against their first wave.',
    11: 'Legendary! Our SCADA systems remain secure.',
    12: 'VICTORY! You saved the Thai National Grid! You are a true cyber defender!'
  },

  victoryMessagesTh: {
    1: 'ยอดเยี่ยม! คุณเข้าใจโครงสร้างโครงข่ายแล้ว',
    2: 'ดีมาก! คุณเชี่ยวชาญการติดตั้งการป้องกันพื้นฐานแล้ว',
    3: 'สมบูรณ์แบบ! คุณสามารถระบุและหยุดลำดับการโจมตีได้',
    4: 'ยอดเยี่ยม! กลุ่ม hacktivists ถูกขับไล่แล้ว',
    5: 'เจ็บ! แก๊ง ransomware ล้มเหลวในการเข้ารหัสระบบ',
    6: 'ยอดเยี่ยม! กลุ่มอาชญากรองค์กรถูกขัดขวางแล้ว',
    7: 'พิเศษ! คุณตรวจพบการลาดตระเวนของรัฐชาติ',
    8: 'ยิ่งใหญ่! การแทรกซึมของ APT ถูกหยุดแล้ว',
    9: 'ไม่น่าเชื่อ! คุณป้องกันการเตรียมการโจมตีของพวกเขา',
    10: 'กล้าหาญ! คุณยืนหยัดต่อคลื่นลูกแรก',
    11: 'ตำนาน! ระบบ SCADA ของเรายังปลอดภัย',
    12: 'ชัยชนะ! คุณช่วยโครงข่ายไฟฟ้าแห่งชาติไทยได้! คุณคือผู้ปกป้องไซเบอร์ตัวจริง!'
  },

  defeatMessages: {
    1: 'Don\'t worry, this is just training. Let\'s try again.',
    2: 'Remember to deploy defenses strategically. Try once more.',
    3: 'Watch for the attack chain patterns. You\'ll get it!',
    4: 'The hacktivists caused some disruptions. Learn and adapt.',
    5: 'Some systems were encrypted. We need better protection.',
    6: 'They manipulated the market. We must improve our defenses.',
    7: 'They completed their reconnaissance. Next time, detect them earlier.',
    8: 'They established persistence. We need to be more vigilant.',
    9: 'They positioned for attack. Strengthen our monitoring.',
    10: 'The first wave broke through. Regroup and try again.',
    11: 'SCADA systems compromised. This is critical - we need you!',
    12: 'Grid failure. Millions without power. But you can prevent this - try again!'
  },

  defeatMessagesTh: {
    1: 'ไม่ต้องกังวล นี่เป็นแค่การฝึก ลองใหม่อีกครั้ง',
    2: 'จำไว้ว่าต้องติดตั้งการป้องกันอย่างเป็นกลยุทธ์ ลองอีกครั้ง',
    3: 'สังเกตรูปแบบลำดับการโจมตี คุณจะทำได้!',
    4: 'กลุ่ม hacktivists สร้างความหยุดชะงักบางอย่าง เรียนรู้และปรับตัว',
    5: 'บางระบบถูกเข้ารหัส เราต้องการการป้องกันที่ดีกว่า',
    6: 'พวกเขาจัดการตลาด เราต้องปรับปรุงการป้องกัน',
    7: 'พวกเขาลาดตระเวนเสร็จแล้ว ครั้งต่อไปตรวจพบเร็วกว่านี้',
    8: 'พวกเขาสร้างฐานแล้ว เราต้องระวังมากขึ้น',
    9: 'พวกเขาวางตำแหน่งเพื่อโจมตี เสริมการตรวจสอบ',
    10: 'คลื่นลูกแรกทะลุเข้ามา รวมกลุ่มและลองใหม่',
    11: 'ระบบ SCADA ถูกบุกรุก นี่สำคัญมาก - เราต้องการคุณ!',
    12: 'โครงข่ายล้มเหลว หลายล้านคนไม่มีไฟ แต่คุณสามารถป้องกันได้ - ลองอีกครั้ง!'
  }
};
