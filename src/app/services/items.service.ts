import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {IRegion,  ISystems} from "../interfaces/IRegions";
import {HttpClient} from "@angular/common/http";
import {ICategory, IGroup, IOrder, IType} from "../interfaces/IItems";

@Injectable()
export class ItemsService {

  public categoryNumbers: string[];

  public itemNumbers: string[];

  private baseUri: string;
  private uri: string;
  private uriEnd: string;
  private categoriesUri: string;
  private groupsUri: string;
  private typesUri: string;
  private ordersUri: string;

  public graphicUri: string;
  constructor(private http: HttpClient){
    this.baseUri = "https://esi.evetech.net/latest/universe";
    this.uriEnd = "/?datasource=tranquility&language=en-us";
    this.categoriesUri = "https://esi.evetech.net/latest/universe/categories/?datasource=tranquility";
    this.groupsUri = "https://esi.evetech.net/latest/universe/groups/";
    this.typesUri = "https://esi.evetech.net/latest/universe/types/";
    this.graphicUri = "https://esi.evetech.net/latest/universe/graphics/";
    this.ordersUri = "https://esi.evetech.net/latest/markets/";

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

