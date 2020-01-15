import { Component, OnInit } from "@angular/core";
import {ItemsService} from "../services/items.service";
import {
  Alert, cHub, CTradeItemPrice, ICategory, IGroup, IHub, IOrder, IOrderL, ITradeItemPrice, IType
} from '../interfaces/IItems';
import {ISortPattern, priSort} from "../Patterns/prioritySort";
import {jsonpCallbackContext} from "@angular/common/http/src/module";
import {Subject} from 'rxjs/Subject';

@Component({
  selector: "app-items-by-group",
  templateUrl: "./items-by-group.component.html",
  styleUrls: ["./items-by-group.component.css"]
})
export class ItemsByGroupComponent implements OnInit {

  public finishedPriceLoad: Subject<ITradeItemPrice>;
  public groups: Array<IGroup>;
  public usGroups: Array<IGroup>;
  public categories: Array<ICategory>;
  public sortedCategories: Array<ICategory>;
  public selectedCategory: ICategory;
  public selectedGroup: IGroup;
  public selectedType: IType;
  public selType: IType;
  public selectedItem: ITradeItemPrice;
  public types: Array<IType>;
  public unsortedTypes: Array<IType>;
  public test: string;
  public selItemTypes: IType[];
  private bb: CTradeItemPrice;
  private currentType: IType;

  public hubs: IHub[];
  public tradeItemPriceList: ITradeItemPrice[];
  public displayPriceList: ITradeItemPrice[];
  // Hubs

  private groupCount: number;
  public orders: IOrder[];
  public categoryPattern: ISortPattern[];
  constructor(private is: ItemsService) {
    this.categories = new Array<ICategory>();
    this.groups = new Array<IGroup>();
    this.types = new Array<IType>();
    this.displayPriceList = new Array<ITradeItemPrice>();
    this.tradeItemPriceList = new Array<ITradeItemPrice>();
    this.selItemTypes = new Array<IType>();

    this.orders = new Array<IOrder>();
    this.hubs = new Array<IHub>();
    let hub = new cHub();
    hub.name = "Jita"; hub.regionId = 10000002; hub.stationId = 60003760;
    this.hubs.push(hub);

    hub = new cHub();
    hub.name = "Amarr"; hub.regionId = 10000043; hub.stationId = 60008494;
    this.hubs.push(hub);

    hub = new cHub();
    hub.name = "Dodixie"; hub.regionId = 10000032; hub.stationId = 60011866;
    this.hubs.push(hub);

    hub = new cHub();
    hub.name = "Rens"; hub.regionId = 10000030; hub.stationId = 60004588;
    this.hubs.push(hub);

    hub = new cHub();
    hub.name = "Hek"; hub.regionId = 10000042; hub.stationId = 60005686;
    this.hubs.push(hub);
    this.sortedCategories = new Array<ICategory>();
    this.categoryPattern = new Array<ISortPattern>();
    this.categoryPattern.push( { name: "Accessories", index: 1});
    this.categoryPattern.push( { name: "Ship", index: 4});
    this.categoryPattern.push( { name: "Drone", index: 5});

    this.categoryPattern.push( { name: "Module", index: 6});
    this.categoryPattern.push( { name: "Subsystem", index: 7});
    this.categoryPattern.push( { name: "Material", index: 8});
    this.categoryPattern.push( { name: "Asteroid", index: 9});
    this.categoryPattern.push( { name: "Commodity", index: 20});
    this.categoryPattern.push( { name: "Deployable", index: 21});
    this.categoryPattern.push( { name: "Skill", index: 24});

    /*   hub = new cHub();
       hub.name = "Tash-Murkon"; hub.regionId = 10000020; hub.stationId = 60008764;
       this.hubs.push(hub);

       hub = new cHub();
       hub.name = "Oursulaert"; hub.regionId = 10000064; hub.stationId = 60011740;
       this.hubs.push(hub);*/

    //localStorage.setItem("tradeHubs", JSON.stringify(this.tradeItemPriceList));
  }

  public getLowestPrice(type: IType, regionId: number, b: ITradeItemPrice, orders: IOrderL[]) {
    let retval  = NaN;
    for (let i = 0; i < orders.length; i++) {
      if (isNaN(retval) || orders[i].price < retval) {
        retval = orders[i].price;
      }
    }
    this.setItemPrice(regionId, retval, b);
  }

  public setHubPrice2(type: IType, hub: IHub, b: ITradeItemPrice) {
    this.is.getPriceDataPages(hub.regionId, type.type_id, hub.stationId);
  }
  public  setHubPrice(type: IType, hub: IHub, b: ITradeItemPrice)
  {
     this.is.getPriceDataUri(hub.regionId.toString()).subscribe(res => {
        let retval  = NaN;
        let hubName = hub.name;
        if (type == null)
          return;
        for (const ll of res) {
          if (ll.is_buy_order === false && ll.type_id === type.type_id) {
            if (isNaN(retval) || ll.price < retval) {
              retval = ll.price;
              this.setItemPrice(0, retval, b);
            }
          }
        }

      }
    );
  }
  getArrow(c: ICategory): string{
    if(JSON.stringify(c) === JSON.stringify(this.selectedCategory))
      return "q";
    return "u";
  }
  isSelected(c: ICategory): boolean{
    if(JSON.stringify(c) === JSON.stringify(this.selectedCategory)) {
      if(this.selectedCategory.groups.length === this.groupCount)
        return true;
    }
    return false;
  }
  isSelectedGroup(g: IGroup): boolean {
    if (JSON.stringify(g) === JSON.stringify(this.selectedGroup)) {
        return true;
    }
    return false;
  }
  setItemPrice(regionId: number, price: number, o: ITradeItemPrice) {
    switch (regionId) {
      case 10000002:
        o.jitaPrice = price;
        o.jita = true;
        break;
      case 10000043:
        o.amarrPrice = price;
        o.amarr = true;
        break;
      case 10000032:
        o.dodixiePrice = price;
        o.dodixie = true;
        break;
      case 10000030:
        o.rensPrice = price;
        o.rens = true;
        break;
      case 10000042:
        o.hekPrice = price;
        o.hek = true;
        break;
    }
    if (o.hek && o.rens && o.dodixie && o.amarr && o.jita) {
      this.finishedPriceLoad.next(o);
    }
  }

  onRemoveItem ( item: ITradeItemPrice)  {
    if (event.target["alt"] === "bom") {
      //this.onGetBOM(item);
    }
    if(event.target["id"] === "img") {
      this.selType = item.item;
    }
    /* else if(event.target["alt"]==="save event"){
       this.saveEvent(item);
     }*/
    else if (event.target["alt"] === "fallsbelow") {
      return;
    }
    else if (event.target["id"] === "remove"){
      const tempItems = this.selItemTypes;
      this.selItemTypes = new Array<IType>();
      let i = 0;
      for (i = 0; i < tempItems.length; i++) {
        if (item.item.name === tempItems[i].name) {
          continue;
        }
        this.selItemTypes.push(tempItems[i]);
      }
      let ii = 0;
      for(const xx of this.tradeItemPriceList){

        if(xx.item.name === item.item.name){
          this.tradeItemPriceList.splice(ii,1);
        }
        ii++;
      }
      localStorage.setItem("SelEveItems", JSON.stringify(this.selItemTypes));
    }
    else if (event.target["id"] === "addAlert") {
      const eid = localStorage.getItem("EveId");
      if (eid != null && eid.length > 0){
        const res = localStorage.getItem("EveAlerts");
        const alerts = JSON.parse(res);
        /*
                let alert: Alert = {
                  type: item.name,
                  side: "ask",
                  hub: this.getHub("Jita"),
                  price: item.Jitaprice,
                  targetPrice: Number((item.Jitaprice * .9).toFixed(0)),
                  percentage: 10,
                  qty: 0
                };

                if(this.alerts == null) {
                  this.alerts = new Array<Alert>();
                }

                if(this.alerts.length < 20)  //no more than 20
                  this.alerts.push(alert);
                localStorage.setItem('EveAlerts', JSON.stringify(this.alerts));
                */
      }
    }
  }

  /*public onSelectItem (it: IType) {
    let i = 0;
    for (i = 0; i < this.selItemTypes.length; i++) {
      if (it === this.selItemTypes[i]) {
        return;
      }
    }
    this.setHubPrice(it,this.getHub('Jita'));
    this.setHubPrice(it,this.getHub('Amarr'));
    this.setHubPrice(it,this.getHub('Dodixie'));
    this.setHubPrice(it,this.getHub('Hek'));
    this.setHubPrice(it,this.getHub('Rens'));
    /!*
            this.setHubPrice(it,this.getHub('Tash-Murkon'));
            this.setHubPrice(it,this.getHub('Oursulaert'));
    *!/
    this.selItemTypes.push(it);
    localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
  }*/

  sortCategories(){
    const ps = new priSort();
    this.sortedCategories = ps.sort(this.categories, this.categoryPattern);

  }
  private addCategory(c: ICategory){
    this.categories.push(c);
  }


  onRemove(it: ITradeItemPrice) {

    this.tradeItemPriceList.unshift(it);

  }


  getChildren(): Array<IGroup>{
    return this.groups;
  }

  onSelectCategory(ic: ICategory){
    this.groups.length = 0;
    this.usGroups = new Array<IGroup>();
    this.selectedCategory = ic;
    let cnt = 0;
    for (const gg of ic.groups){

      this.is.getGroup(gg.toString()).subscribe(x => {
        if(x.published) {
          this.usGroups.push(x);
        }
        cnt++;
        this.groupCount = cnt;
        if(cnt === ic.groups.length){
          this.groups = this.usGroups.sort((left, right): number => {
            if (left.name < right.name) return -1;
            if (left.name > right.name) return 1; else return 0;
          });
        }
      });
    }
  }

  onSelectType(it: IType){
    if (this.selItemTypes == null) {
      this.selItemTypes = new Array<IType>();
    }
    let note = true;
    for (let itt of this.selItemTypes) {
      if (itt.name === it.name) {
        note = false;
      }
    }
    if (note) {
      this.selItemTypes.push(it);
    }
    note = true;
    for (const ti of this.tradeItemPriceList) {
      if (ti.item.name === it.name) {
        note = false;
      }
    }
    if (note) {
      const b = new CTradeItemPrice();
      b.item = it;
      b.amarrPrice = 0;
      b.dodixiePrice = 0;
      b.hekPrice = 0;
      b.jitaPrice = 0;
      b.rensPrice = 0;
      b.amarr = false;
      b.jita = false;
      b.hek = false;
      b.dodixie = false;
      b.rens = false;
      if (this.tradeItemPriceList == null) {
        this.tradeItemPriceList = new Array<ITradeItemPrice>();

      }
      this.bb = b;
      this.currentType = it;
      for (const h of this.hubs) {
        this.setHubPrice2(it, h, b);
      }
    }
  }

  onSelectGroup(ig: IGroup){

    this.unsortedTypes = new Array<IType>();
    this.selectedGroup = ig;
    let cnt = 0;
    for (const gt of ig.types){
      this.is.getType(gt).subscribe(xt => {
        if(xt.published) {
          this.unsortedTypes.push(xt);
        }
        cnt++;
        if(cnt === ig.types.length) {
          this.types = this.unsortedTypes.sort((left, right): number => {
            if (left.name < right.name) return -1;
            if (left.name > right.name) return 1; else return 0;
          });
          console.log(this.types);
        }
      });


    }

  }
  getArrowGrp(g: IGroup): string{
    if(JSON.stringify(g)=== JSON.stringify(this.selectedGroup)) {
      return "q";
    }
    return "u"
  }
  refreshList(){
    if(this.selItemTypes != null) {
      for (const it of this.selItemTypes) {
        let cnt = 0;
        for(const xit of this.tradeItemPriceList){
          if(it.name === xit.item.name)
          {
            this.tradeItemPriceList.splice(cnt,1);
          }
          cnt++;
        }
        this.onSelectType(it);
      }
    }
  }

  ngOnInit() {

    const types = localStorage.getItem("SelEveItems");

    this.is.sinkPrice.subscribe(oSub => {
      this.getLowestPrice(this.currentType, oSub.regionId, this.bb, oSub.orderL);
    });

    this.selItemTypes = JSON.parse(types);
    if (this.finishedPriceLoad == null) {
      this.finishedPriceLoad = new Subject<ITradeItemPrice>();
    }

    this.finishedPriceLoad.subscribe(tp => {
      this.tradeItemPriceList.push(tp);
    });
    console.log("get categories");
    this.is.getCategories().subscribe(x => {
      if (x != null)
        this.is.categoryNumbers = x.splice(",");
      this.test = this.is.categoryNumbers[0];
      let cnt = 0;
      for (const r of this.is.categoryNumbers) {
        this.is.getCategoryContent(r.toString()).subscribe(ret => {
          if(ret.published) {
            this.addCategory(ret);
          }
          cnt++;
          if(cnt === this.is.categoryNumbers.length)
            this.sortCategories();
        });
      }

    });


  }

}
