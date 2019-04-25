import { Component, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'main-table',
  templateUrl: './table.html'
})
export class MainTableComponent {
  
    @Input() loading: boolean;
    @Input() org_id: string;
    @Input() emptyData: boolean;
    @Input() totalData: any[] = [];
    @Input() statuses: any[] = [];

    showDetails: boolean = false;
    list: any[] = [];
    request: any = {};

    constructor(private http: HttpService){
    }

    getDetails(flag: string, org_id:string, date: string, vendor: string, dep: string, status: string, work_type: string){
      // console.log(work_type);
      if(flag == '0'){
        return false;
      } else {
        let cond = [
          {"key":"date", "value":date},
          {"key":"vendor", "value":(vendor=="NaN"?"is null":" = '"+vendor+"'")},
          {"key":"dep", "value":(dep=="NaN"?"is null":" = '"+dep+"'")},
          {"key":"status", "value":(status=="NaN"?"is null":" = '"+status+"'")},
          {"key":"work_type", "value":(work_type=="NaN"?"is null":" = '"+work_type+"'")},
          {"key":"org_id", "value":org_id}
        ];
        this.request={
          "org_id":org_id,
          "date":date,
          "status":status,
          "vendor":vendor,
          "dep":dep,
          "work_type": work_type
        };
        this.http.getData('313', cond).subscribe(
          (data: any[]) => {
            this.list = Object.keys(data).map(i => data[i]);
            // console.log(this.list);
          }
        );


      }
      this.toogleDetails();
    }

    toogleDetails(){
      if(this.showDetails){
        this.showDetails = false;
      } else {
        this.showDetails = true;
      }
    }

}