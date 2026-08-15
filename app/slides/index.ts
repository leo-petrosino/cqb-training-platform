import Slide01_Title from './Slide01_Title';
import Slide02_AOR_Concept from './Slide02_AOR_Concept';
import Slide03_AOR_Applied from './Slide03_AOR_Applied';
import Slide04_Elements_Structure from './Slide04_Elements_Structure';
import Slide05_Elements_Commands1 from './Slide05_Elements_Commands1';
import Slide06_Elements_Commands2 from './Slide06_Elements_Commands2';
import Slide07_Elements_Commands3 from './Slide07_Elements_Commands3';
import Slide08_Formations_Column from './Slide08_Formations_Column';
import Slide09_Formations_Y from './Slide09_Formations_Y';
import Slide10_Formations_Diamond from './Slide10_Formations_Diamond';
import Slide11_Maneuvers_WallShift from './Slide11_Maneuvers_WallShift';
import Slide12_Maneuvers_BoundPeel from './Slide12_Maneuvers_BoundPeel';
import Slide13_Entry_ButtonhookCrossover from './Slide13_Entry_ButtonhookCrossover';
import Slide14_Entry_LimitedPenetration from './Slide14_Entry_LimitedPenetration';
import Slide15_CoordinatedEntry from './Slide15_CoordinatedEntry';
import Slide16_BreachingTechniques from './Slide16_BreachingTechniques';
import Slide17_Summary from './Slide17_Summary';

export interface SlideDef {
  id: string;
  title: string;
  component: React.FC;
  duration?: number; // seconds instructor should spend on this slide
}

export const SLIDE_SET: SlideDef[] = [
  { id: '01', title: 'Title', component: Slide01_Title, duration: 45 },
  { id: '02', title: 'AOR Concept', component: Slide02_AOR_Concept, duration: 120 },
  { id: '03', title: 'AOR Applied', component: Slide03_AOR_Applied, duration: 150 },
  { id: '04', title: 'Elements — Structure', component: Slide04_Elements_Structure, duration: 120 },
  { id: '05', title: 'Elements — Commands (1)', component: Slide05_Elements_Commands1, duration: 120 },
  { id: '06', title: 'Elements — Commands (2)', component: Slide06_Elements_Commands2, duration: 120 },
  { id: '07', title: 'Elements — Commands (3)', component: Slide07_Elements_Commands3, duration: 120 },
  { id: '08', title: 'Formations — Column', component: Slide08_Formations_Column, duration: 90 },
  { id: '09', title: 'Formations — Y', component: Slide09_Formations_Y, duration: 90 },
  { id: '10', title: 'Formations — Diamond', component: Slide10_Formations_Diamond, duration: 90 },
  { id: '11', title: 'Maneuvers — Wall Shift', component: Slide11_Maneuvers_WallShift, duration: 120 },
  { id: '12', title: 'Maneuvers — Bound-Peel', component: Slide12_Maneuvers_BoundPeel, duration: 120 },
  { id: '13', title: 'Entry — Buttonhook/Crossover', component: Slide13_Entry_ButtonhookCrossover, duration: 150 },
  { id: '14', title: 'Entry — Limited Penetration', component: Slide14_Entry_LimitedPenetration, duration: 150 },
  { id: '15', title: 'Coordinated Entry', component: Slide15_CoordinatedEntry, duration: 120 },
  { id: '16', title: 'Breaching Techniques', component: Slide16_BreachingTechniques, duration: 150 },
  { id: '17', title: 'Summary', component: Slide17_Summary, duration: 60 },
];

export const TOTAL_SLIDES = SLIDE_SET.length;
