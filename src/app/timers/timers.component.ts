import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/interval';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/share';
import {Timer, TimerM} from '../interfaces/itimer';

@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.css']
})




export class TimersComponent implements OnInit {
  public timermodel: TimerM;
  public Timers: Array<Timer>;
  public Title = 'Eve Timers';
  public seconds;
  public notice: string;
  private nd: Date;
  private lSub;
  private ndiag;
  private init: boolean;
  private bufferTime;
  private myInterval = Observable.interval(300);
  constructor() {
    this.timermodel = { nameof: '', multiplier: 1, timer: 1};
    this.Timers = new Array<Timer>();
    this.notice = 'Welcome';
    this.Title = "Eve Timers";
    this.ndiag = 0;
    this.init = false;
  }

  onSubmit() {
    let i = 0;
    for (i = 0; i < this.Timers.length; i++){
      if (this.Timers[i].nameof === this.timermodel.nameof){
        this.notice = "Please choose a new name for your timer.";
        return;
      }
    }
    let n = this.timermodel.timer * this.timermodel.multiplier;

    let td = new Date();
    td.setSeconds(td.getSeconds() + n);

    let t =  {timer: n, nameof: this.timermodel.nameof, targetTime: td, status: false, left: '', minutesLeft: ''};
    this.Timers.push(t);
    localStorage.setItem('timers', JSON.stringify(this.Timers));
  }
  public subTimers(){
    //Create an observable that emits a value every 500ms
    let cd1 = new Date();
    if(this.init === false) {
      for (let tis of this.Timers) {
        let t1 = new Date(tis.targetTime.valueOf());
        let dif = t1.getTime() - cd1.getTime();
        if (dif < 0 && tis.status) {
          tis.status = false;
        }
      }
    }

    let myInterval = Observable.interval(300);
    this.lSub = myInterval.subscribe(val => {
      this.ndiag = this.ndiag + 1;
      let cd = new Date();
      for (let tis of this.Timers)
      {
        this.init = true;
        let t1 = new Date(tis.targetTime.valueOf());
        let dif = t1.getTime() - cd.getTime();
        if(dif < 0 && tis.status)
        {
          tis.status = false;
          this.playAlert();
        }
        else if (tis.status){
          let dif = t1.getTime() - cd.getTime();
          tis.minutesLeft = ((dif/1000)/60).toFixed(1);
          tis.left = (dif/1000).toFixed(0);
          //tis.left = parseInt((t1 - t2)/1000);
        }
      }
      //this.subTimers();
    });

  }
  public stopTimers(){
    for (let tis of this.Timers)
    {
      tis.status = false;
    }
  }

  private playAlert(){
    let audio = new Audio();
    audio.src = '/assets/sounds/priceAlert1.mp3';
    audio.load();
    audio.play();
  }
  public onUsingTable ( al: Timer) {
    if(event.target["id"] === "start")
    {
      let n = al.timer;
      let d = new Date();

      let td = new Date();
      td.setSeconds(td.getSeconds() + n);
      al.targetTime = td;
      al.status = true;
      localStorage.setItem('timers', JSON.stringify(this.Timers));

    }
    if(event.target["id"] === "stop")
    {
      al.status = false;
    }

    else if (event.target["id"]==="remove"){
      if(this.Timers.length === 1)  //don't remove all.
        return;
      let tempTimers = this.Timers;
      this.Timers = new Array<Timer>();
      let i = 0;
      for (i = 0; i < tempTimers.length; i++) {
        if (al.nameof === tempTimers[i].nameof) {
          continue;
        }
        this.Timers.push(tempTimers[i]);
      }
      localStorage.setItem('timers', JSON.stringify(this.Timers));
    }


  }


  ngOnInit()  {
    let res: string;
    res = localStorage.getItem('timers');
    if(res != null && res.indexOf('nameof') > 0) {
      this.Timers = JSON.parse(res);
    }
    if( this.Timers==null){
      this.Timers = new Array<Timer>();
    }
    this.subTimers();
  }
}
