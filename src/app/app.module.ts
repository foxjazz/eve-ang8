import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TimersComponent } from './timers/timers.component';
import { DevelopComponent } from './develop/develop.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { ItemsByGroupComponent } from './items-by-group/items-by-group.component';
import { RegionsComponent } from './regions/regions.component';
import {RouterModule, Routes} from "@angular/router";
import {moneyPipe, mPipe} from "./pipes/mony.pipe";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ItemsService} from "./services/items.service";
import {RegionService} from "./services/region.service";
import { JustItemsComponent } from './just-items/just-items.component';
import {ItemonlyService} from './services/itemonly.service';


const appRoutes: Routes = [
  {path: "", component: JustItemsComponent},
  {path: "items", component: ItemsByGroupComponent},
  {path: "just", component: JustItemsComponent},
  {path: "develop", component: DevelopComponent},
  {path: "timers", component: TimersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TimersComponent,
    DevelopComponent,
    TreeviewComponent,
    ItemsByGroupComponent,
    RegionsComponent,
    mPipe,
    moneyPipe,
    JustItemsComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers:  [RegionService, ItemsService, ItemonlyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
