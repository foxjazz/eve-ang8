export interface Timer {
  timer: number;
  nameof: string;
  targetTime: Date;
  status: boolean;
  left: string;
  minutesLeft: string;
}
export interface TimerM {
  nameof: string;
  timer: number;
  multiplier: number;
}
