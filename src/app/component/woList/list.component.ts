import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'details-block',
  templateUrl: './list.html'
})
export class ListComponent {

    @Input() request: any;
    @Input() list: any[];
    @Output() onToggle = new EventEmitter<boolean>();


    constructor(private http: HttpService){

    }

    goBack(){
        this.onToggle.emit(true);
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

}