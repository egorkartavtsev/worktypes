import { Component, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'main-table',
  templateUrl: './table.html'
})
export class MainTableComponent {
  
    @Input() emptyData: boolean;
    @Input() curData:      any;
    @Input() statuses: any;
    @Input() loading:    boolean;
    @Input() org_id:    string;

    showDetails: boolean = false;
    list: any[] = [];
    request: any = {};

    constructor(private http: HttpService){
    }

    getDetails(flag: string, org_id:string, date: string, vendor: string, dep: string, status: string){
      if(flag == '0'){
        return false;
      } else {
        this.request = {
          "date": date,
          "vendor": vendor,
          "dep": dep,
          "status": status
        };
        let cond = [
          {"key":"date", "value":date},
          {"key":"vendor", "value":(vendor=="NaN"?"is null":" = '"+vendor+"'")},
          {"key":"dep", "value":(dep=="NaN"?"is null":" = '"+dep+"'")},
          {"key":"status", "value":(status=="NaN"?"is null":" = '"+status+"'")},
          {"key":"org_id", "value":org_id}
        ];
        this.request={
          "date":date,
          "status":status,
          "vendor":vendor,
          "dep":dep
        };
        this.http.getData('313', cond).subscribe(
          (data: any[]) => {
            this.list = Object.keys(data).map(i => data[i]);
            console.log(this.list);
          }
        );


      }
      this.toogleDetails();
    }

    // openForm(org_id: string, entity_id: string) {
    //     let url = "";
    //     this.http.getFormURL(org_id, entity_id).subscribe(
    //         (data: any) => {
    //             console.log(data[0].URL);
    //             console.log(this._plist);
    //             window.open(data[0].URL.toString(), "hello");
    //         }
    //     );
    // }

    toogleDetails(){
      if(this.showDetails){
        this.showDetails = false;
      } else {
        this.showDetails = true;
      }
    }

}