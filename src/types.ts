export interface Butterfly {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
  color: string;
}

export interface RSVPData {
  guestName: string;
  attendanceStatus: 'attending' | 'apologetic';
  companionsCount: number;
  notes: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
