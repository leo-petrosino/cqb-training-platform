export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'scenario';
  options?: string[];
  correct_answer?: string;
  scenario_context?: string;
}

export const QUIZ_SET: QuizQuestion[] = [
  {
    id: 'q01',
    type: 'multiple_choice',
    question: 'What does AOR stand for in CQB doctrine?',
    options: [
      'Area of Responsibility',
      'Angle of Response',
      'Axis of Rotation',
      'Alert Operational Range',
    ],
    correct_answer: 'Area of Responsibility',
  },
  {
    id: 'q02',
    type: 'multiple_choice',
    question: "In a 4-man element, how many degrees does each Operator's primary AOR cover?",
    options: ['45°', '60°', '90°', '120°'],
    correct_answer: '90°',
  },
  {
    id: 'q03',
    type: 'multiple_choice',
    question: 'Which command is used to split the element into smaller sub-groups under a callsign?',
    options: ['Ready Up', 'Detach', 'Fall In', 'Spread Out'],
    correct_answer: 'Detach',
  },
  {
    id: 'q04',
    type: 'multiple_choice',
    question: 'Which formation prioritises speed and expansive AOR coverage over even distribution?',
    options: ['Column', 'Diamond', 'Y Formation', 'Double Column'],
    correct_answer: 'Y Formation',
  },
  {
    id: 'q05',
    type: 'multiple_choice',
    question: 'Which formation provides the most even 360° coverage but is slower to manoeuvre?',
    options: ['Y Formation', 'Column', 'Diamond', 'Staggered Column'],
    correct_answer: 'Diamond',
  },
  {
    id: 'q06',
    type: 'multiple_choice',
    question: 'What does the command "Ready Up" indicate?',
    options: [
      'Advance to the next waypoint',
      'Prepare the element for entry or re-organise after a rally',
      'Return to base immediately',
      'Switch to secondary weapons',
    ],
    correct_answer: 'Prepare the element for entry or re-organise after a rally',
  },
  {
    id: 'q07',
    type: 'multiple_choice',
    question: 'In Bounding Overwatch, what is the core principle?',
    options: [
      'All Operators advance simultaneously',
      'One element advances while the other covers, then roles alternate',
      'The leader advances alone to scout',
      'The rear guard moves to the front repeatedly',
    ],
    correct_answer: 'One element advances while the other covers, then roles alternate',
  },
  {
    id: 'q08',
    type: 'multiple_choice',
    question: 'Which entry technique involves hooking toward the nearest hard corner just inside the doorway?',
    options: ['Crossover', 'Buttonhook', 'Limited Penetration', 'Dynamic Entry'],
    correct_answer: 'Buttonhook',
  },
  {
    id: 'q09',
    type: 'multiple_choice',
    question: 'Which entry technique requires the Operator to cross the doorway funnel to take the far corner?',
    options: ['Buttonhook', 'Crossover', 'Peel', 'Wall Shift'],
    correct_answer: 'Crossover',
  },
  {
    id: 'q10',
    type: 'multiple_choice',
    question: 'What is "Limited Penetration"?',
    options: [
      'Entering the room with only half the element',
      'Sweeping the room from the doorway threshold without fully entering',
      'Using reduced-velocity ammunition',
      'Breaching with minimal explosive charge',
    ],
    correct_answer: 'Sweeping the room from the doorway threshold without fully entering',
  },
  {
    id: 'q11',
    type: 'multiple_choice',
    question: 'Which breaching method is the fastest but carries the highest risk to occupants?',
    options: ['Mechanical', 'Thermal', 'Ballistic', 'Explosive'],
    correct_answer: 'Explosive',
  },
  {
    id: 'q12',
    type: 'scenario',
    question: 'You are the Pointman in a 4-man Y Formation approaching a T-junction. You spot a hostile contact to your left, approximately 15 metres away. What is your immediate action and callout?',
    scenario_context: 'Consider: your AOR, the formation you are in, communication protocol, and whether you should engage or manoeuvre.',
  },
  {
    id: 'q13',
    type: 'scenario',
    question: 'During a Coordinated Entry, your team (RED) receives the Go-Code "ZULU" but Team BLUE does not breach simultaneously. You hear no radio traffic from BLUE. What do you do?',
    scenario_context: 'Consider: you are already committed to the breach, the element of surprise is degrading, and friendly forces may be converging on the same objective.',
  },
  {
    id: 'q14',
    type: 'scenario',
    question: 'You are the lead breacher. The door is reinforced steel with a heavy deadbolt. The objective is believed to contain hostages. Intelligence suggests the hostile is armed but not expecting assault. Which breaching method do you recommend and why?',
    scenario_context: 'Consider: speed vs. control, risk to hostages, noise signature, and available methods (mechanical, ballistic, explosive, thermal).',
  },
  {
    id: 'q15',
    type: 'scenario',
    question: 'You are the Rear Guard in a Column formation moving through a narrow corridor. You hear gunfire and a shout of "CONTACT, REAR!" from the last man. The corridor has no cover. What is your immediate action and what command do you give?',
    scenario_context: 'Consider: the formation is vulnerable in a fatal funnel, the rest of the element is ahead and may not have heard, and you must maintain cohesion while responding to the threat.',
  },
];

export const TOTAL_QUIZ_QUESTIONS = QUIZ_SET.length;
