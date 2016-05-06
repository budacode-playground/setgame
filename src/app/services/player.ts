import {Injectable} from '@angular/core';

@Injectable()
export class Player {
  id: string = Math.random().toString(36).substring(7);
  points: number = 0;

  constructor() {

  }

  penality(point:number) {
    this.points = this.points - point;
  }

  reward(point:number) {
    this.points = this.points + point;
  }
}
