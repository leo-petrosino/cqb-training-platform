import Slide01_Intro from './Slide01_Intro';
import Slide02_StackFormation from './Slide02_StackFormation';
import Slide03_Threshold from './Slide03_Threshold';
import Slide04_RoomClearing from './Slide04_RoomClearing';
import Slide05_Pieing from './Slide05_Pieing';
import Slide06_Communications from './Slide06_Communications';
import Slide07_ReactToContact from './Slide07_ReactToContact';
import Slide08_FatalFunnels from './Slide08_FatalFunnels';
import Slide09_SectorsOfFire from './Slide09_SectorsOfFire';
import Slide10_QuizPrep from './Slide10_QuizPrep';

export interface SlideDef {
  id: string;
  title: string;
  component: React.FC;
  duration?: number; // seconds instructor should spend on this slide
}

export const SLIDE_SET: SlideDef[] = [
  { id: '01', title: 'CQB Fundamentals — Introduction', component: Slide01_Intro, duration: 120 },
  { id: '02', title: 'The Stack — Entry Formation', component: Slide02_StackFormation, duration: 180 },
  { id: '03', title: 'Threshold Evaluation', component: Slide03_Threshold, duration: 150 },
  { id: '04', title: 'Room Clearing — 4-Man Flow', component: Slide04_RoomClearing, duration: 240 },
  { id: '05', title: 'Pieing the Corner', component: Slide05_Pieing, duration: 180 },
  { id: '06', title: 'Comms & Callouts', component: Slide06_Communications, duration: 120 },
  { id: '07', title: 'React to Contact — Hard Corner', component: Slide07_ReactToContact, duration: 200 },
  { id: '08', title: 'Fatal Funnels', component: Slide08_FatalFunnels, duration: 150 },
  { id: '09', title: 'Sectors of Fire', component: Slide09_SectorsOfFire, duration: 180 },
  { id: '10', title: 'Quiz Preparation', component: Slide10_QuizPrep, duration: 60 },
];

export const TOTAL_SLIDES = SLIDE_SET.length;
