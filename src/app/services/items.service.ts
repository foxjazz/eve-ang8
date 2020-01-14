import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {IRegion,  ISystems} from "../interfaces/IRegions";
import {HttpClient} from "@angular/common/http";
import {ICategory, IGroup, IOrder, IOrderL, IType} from '../interfaces/IItems';
import {Subject} from 'rxjs/Subject';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Injectable()
export class ItemsService {

  public categoryNumbers: string[];

  public itemNumbers: string[];
  public sinkPrice = new Subject<number>();
  private baseUri: string;
  private uri: string;
  private uriEnd: string;
  private categoriesUri: string;
  private groupsUri: string;
  private typesUri: string;
  private ordersUri: string;
  public JitaOrders: IOrderL[];
  public AmarrOrders: IOrderL[];
  public DodixieOrders: IOrderL[];
  public RensOrders: IOrderL[];
  public HekOrders: IOrderL[];

  public graphicUri: string;
  constructor(private http: HttpClient){
    this.baseUri = "https://esi.evetech.net/latest/universe";
    this.uriEnd = "/?datasource=tranquility&language=en-us";
    this.categoriesUri = "https://esi.evetech.net/latest/universe/categories/?datasource=tranquility";
    this.groupsUri = "https://esi.evetech.net/latest/universe/groups/";
    this.typesUri = "https://esi.evetech.net/latest/universe/types/";
    this.graphicUri = "https://esi.evetech.net/latest/universe/graphics/";
    this.ordersUri = "https://esi.evetech.net/latest/markets/";
// https://esi.evetech.net/latest/markets/10000042/orders/?datasource=tranquility&order_type=sell&page=1&type_id=36

  }


  public getPriceDataPages(regionId: number, itemId: number, stationId: number) {
      let uriBase = "https://esi.evetech.net/latest/markets/RegionId/orders/?datasource=tranquility&order_type=sell&page=PageId&type_id=ItemId";
      uriBase = uriBase.replace("ItemId", itemId.toString());
      uriBase = uriBase.replace("RegionId", regionId.toString());

      const uris = [];
      for (let i = 1; i < 50; i++) {
        const uriPage = uriBase.replace("PageId", i.toString());
        const uriAction = this.http.get<IOrderL[]>(uriPage);
        uris.push(uriAction);
      }
      forkJoin(uris).subscribe(data => {

        const orders = data.filter(stationId === data[0].location_id);
        for (let i1 = 0; i1 < data.length; data++) {

        }
        switch (regionId) {
          case 10000002: {
            this.JitaOrders = Object.assign(orders);
            break;
          }
          case 10000043: {
            this.AmarrOrders = Object.assign(orders);
            break;
          }
          case 10000032: {
            this.DodixieOrders = Object.assign(orders);
            break;
          }
          case 10000030: {
            this.RensOrders = Object.assign(orders);
            break;
          }
          case 10000042: {
            this.HekOrders = Object.assign(orders);
            break;
          }
        }
      });
  }

  public getPriceDataUri(regionid: string){
    return this.http.get<IOrder[]>(this.ordersUri + regionid+ "/orders" + this.uriEnd)
  }
  public getGroup(id: string): Observable<IGroup> {
    return this.http.get<IGroup>(this.groupsUri + id + this.uriEnd);

  }
  public getType(id: number): Observable<IType> {
    return this.http.get<IType>(this.typesUri + id.toString() + this.uriEnd);

  }

  public getCategories(): Observable<any> {
    if (this.categoryNumbers == null)
      return this.http.get(this.categoriesUri);
    else
      return null;
  }

  getCategoryContent(id: string): Observable<ICategory> {
    this.uri  = this.baseUri + "/categories/" + id + this.uriEnd;
    return  this.http.get<ICategory>(this.uri);
  }

}

