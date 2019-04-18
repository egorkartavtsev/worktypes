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

}