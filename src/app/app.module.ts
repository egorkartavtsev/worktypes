// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }     from '@angular/common/http';
import { FormsModule }          from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';

//components
import { AppComponent } from './component/app/app.component';
import { MainTableComponent } from './component/maintable/main-table.component';
import { TzTableComponent } from './component/tztable/tz-table.component';
import { WoTableComponent } from './component/wotable/wo-table.component';
import { ListComponent } from './component/woList/list.component';

//services
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent, MainTableComponent, ListComponent, WoTableComponent, TzTableComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
