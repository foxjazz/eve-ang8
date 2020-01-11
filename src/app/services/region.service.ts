import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {IRegion,  ISystems} from "../interfaces/IRegions";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RegionService {

  private uri = "https://crest-tq.eveonline.com/regions/";
  private uriSys: string = "";
  public Regions: Array<IRegion>;

  public loading: boolean;

  public e: Array<Object>;
  result: Object;

  private baseUri: string;
  private uriEnd: string;
  public regions: string[];
  private regionsUri: string;

  constructor(private http: HttpClient) {
    this.baseUri = "https://esi.evetech.net/latest/universe";
    this.uriEnd = "/?datasource=tranquility&language=en-us";
    this.regionsUri = "https://esi.evetech.net/latest/universe/regions/?datasource=tranquility";
    this.Regions = new Array<IRegion>();
  }

  public getRegions(): Observable<any> {
    if (this.regions == null)
      return this.http.get(this.regionsUri);
    else
      return null;
  }

  getRegionContent(id: string): Observable<IRegion> {
    this.uri  = this.baseUri + "/regions/" + id + this.uriEnd;
    return this.http.get<IRegion>(this.uri);
  }




  getSystems(id: string): Observable<ISystems> {
    //https://crest-tq.eveonline.com/market/10000002/orders/?type=https://crest-tq.eveonline.com/inventory/types/34/
    let uriSys = "https://crest-tq.eveonline.com/market/" + id + "/orders/?type=https://crest-tq.eveonline.com/inventory/types/34/";
    return this.http.get<ISystems>(uriSys);


  }

}
