import { Renderer2, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../services/http.service';
import { NGB_DATEPICKER_CALENDAR_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  /* calend */
  modelStart: NgbDateStruct;
  modelEnd: NgbDateStruct;
  startCalDay: NgbDateStruct;
  endCalDay: NgbDateStruct;
  
  /* condition */
  start: string;
  end: string;
  org_id: string = '';
  organs: any;
  
  /* main table*/
  totalDataMT: any = [];
  statusesMT: any = [];
  emptyDataMT: boolean = true;
  loadingMT: boolean = true;
  
  /* TZ & WOC */
  totalDataTW: any = [];
  currentDataTW: any = [];
  statusesTW: any = [];
  emptyDataTW: boolean = true;
  loadingTW: boolean = true;
  
  /* interface */
  @ViewChild('startCal') startCal: any;
  @ViewChild('endCal') endCal: any;
  @ViewChild('applyButton') applyButton: any;
  @ViewChild('content') content: any;
  @ViewChild('mainMenu') mainMenu: any;
  @ViewChild('toggler') toggler: any;
  @ViewChild('subrep') subrep: any;
  lastPos: number = 0;
  showElements: number = 20;


  constructor(private renderer: Renderer2, private http: HttpService){
    let sup = new Date();
    
    this.endCalDay = this.startCalDay = this.modelEnd = this.modelStart = {
      "year": sup.getFullYear(),
      "month": sup.getMonth()+1,
      "day": sup.getDate()
    };
    this.start = this.makeTrueDate(this.startCalDay.day.toString()+'.'+this.startCalDay.month.toString()+'.'+this.startCalDay.year.toString()+' 00:00:00');
    this.end = this.makeTrueDate(this.endCalDay.day.toString()+'.'+this.endCalDay.month.toString()+'.'+this.endCalDay.year.toString()+' 23:59:00');
    
    
    this.http.getData('304').subscribe(
      (data: any) => {
        this.organs = data;
        this.loadingMT = false;
        this.loadingTW = false;
      }
    );
  }

  ngOnInit(){
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  /* validate from*/
  validate(){
    // var supStart = new Date(this.start.replace(/(\d+).(\d+).(\d+) (\d+):(\d+):(\d+)/, '$1/$2/$3 $4:$5:$6'));
    var supStart = new Date(this.start.replace(/(\d+).(\d+).(\d+)/, '$2/$1/$3'));
    var supEnd = new Date(this.end.replace(/(\d+).(\d+).(\d+)/, '$2/$1/$3'));

    if(supStart <= supEnd && this.org_id !== ''){
      this.renderer.removeAttribute(this.applyButton.nativeElement, 'disabled');
    } else {
      this.renderer.setAttribute(this.applyButton.nativeElement, 'disabled', 'disabled');
    }
  }
  /* work with data*/

  scroll = (event: any): void => {
    let number = 0;
    let isActive = this.subrep.nativeElement.className.indexOf("active");
    if(typeof(event.srcElement.scrollingElement)=="undefined"){
      number = event.srcElement.documentElement.scrollTop;
      this.showElements = (this.totalDataTW.length >=20)?2:20;
    } else {
      number = event.srcElement.scrollingElement.scrollTop;
    }
    if(isActive>=0 && number>this.lastPos && this.totalDataTW.length > this.currentDataTW.length){ // scrolling down
      Array.prototype.push.apply(this.currentDataTW, this.totalDataTW.slice(this.currentDataTW.length, (this.currentDataTW.length + this.showElements)));
      // console.log(this.currentDataTW.length);
    }
    this.lastPos = number;
  };

  // showMoreElements(){}

  getDataTable(){
    this.loadingMT = true;
    this.emptyDataMT = true;
    this.loadingTW = true;
    this.emptyDataTW = true;
    this.currentDataTW = [];
    let cond = [
      {"key":"org_id", "value":this.org_id},
      {"key":"start", "value":this.start},
      {"key":"end", "value":this.end},
      {"key":"target", "value":"dataTable"}
    ];
    /* сводный отчёт */
    this.http.getData('310', cond).subscribe(
      (data: any) => {
        this.statusesMT = Object.keys(data['statuses']).map(i => data['statuses'][i]);
        this.totalDataMT = Object.keys(data['list']).map(i => data['list'][i]);
        this.loadingMT = false;
        this.emptyDataMT = false;
      });
      /* отчёты ТЗ и ЗВР */
    this.http.getData('314', cond).subscribe(
      (data: any) => {
        this.statusesTW  = Object.keys(data['statuses']).map(i => data['statuses'][i]);
        this.totalDataTW = data['list'];
        
        Array.prototype.push.apply(this.currentDataTW, this.totalDataTW.slice(this.currentDataTW.length, (this.currentDataTW.length + this.showElements)));

        this.loadingTW = false;
        this.emptyDataTW = false;
      });
      // this.toggleMainMenu();
  }

  toggleMainMenu(){
      if(this.mainMenu.nativeElement.className.indexOf("d-none")<0){
        this.renderer.addClass(this.mainMenu.nativeElement, "d-none");
        this.renderer.addClass(this.content.nativeElement, "bigData");
        this.renderer.addClass(this.toggler.nativeElement, "attention");
      } else {
        this.renderer.removeClass(this.mainMenu.nativeElement, "d-none");        
        this.renderer.removeClass(this.content.nativeElement, "bigData");        
        this.renderer.removeClass(this.toggler.nativeElement, "attention");        
      }
  }


// dates & calendars
  toogleCalendar(target: string) {
    switch(target){
      case 'start':
        if (this.startCal.nativeElement.className.toString().indexOf('d-none') < 0) {
          this.renderer.addClass(this.startCal.nativeElement, 'd-none');
        } else {
            this.renderer.removeClass(this.startCal.nativeElement, 'd-none');
        }
        break;
        case 'end':
        if (this.endCal.nativeElement.className.toString().indexOf('d-none') < 0) {
          this.renderer.addClass(this.endCal.nativeElement, 'd-none');
        } else {
            this.renderer.removeClass(this.endCal.nativeElement, 'd-none');
        }
      break;
    }
  }
  
  setDate(target: string) {
    switch(target){
      case 'start':
        this.start = this.makeTrueDate(this.modelStart.day + "." + this.modelStart.month + "." + this.modelStart.year + " 00:00:00");
      break;
      case 'end':
        this.end = this.makeTrueDate(this.modelEnd.day + "." + this.modelEnd.month + "." + this.modelEnd.year + " 23:59:59");
      break;
    }
    this.validate();
    this.toogleCalendar(target);
  }
  
  cancelDate(target: string) {
    switch(target){
      case 'start':
        var sup = new Date(this.start.replace(/(\d+).(\d+).(\d+)/, '$2/$1/$3'));
        this.modelStart = { year: sup.getFullYear(), month: (+sup.getMonth() + 1), day: sup.getDate() };
      break;
      case 'end':
        var sup = new Date(this.end.replace(/(\d+).(\d+).(\d+)/, '$2/$1/$3'));
        this.modelEnd = { year: sup.getFullYear(), month: (+sup.getMonth() + 1), day: sup.getDate() };
      break;
    }
    this.toogleCalendar(target);
  }

  makeTrueDate(date: string) {
    var sup = new Date(date.replace(/(\d+).(\d+).(\d+)/, '$2/$1/$3'));
    let day: string;
    let month: string;
    let year: string = sup.getFullYear().toString();

    if (sup.getDate().toString().length < 2) {
        day = "0" + sup.getDate().toString();
    } else {
        day = sup.getDate().toString();
    }
    if (sup.getMonth().toString().length < 2) {
        month = "0" + (sup.getMonth() + 1).toString();
    } else {
        month = (sup.getMonth() + 1).toString();
    }
    return day + "." + month + "." + year;
  }
  
}
