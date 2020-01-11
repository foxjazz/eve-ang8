interface ISortObject {
  name: string;
  [key: string]: any;
}


export interface ISortPattern {
  name: string;
  index: number;
}



export class priSort{

  private  sp: ISortPattern[];
  private checkSort(l: string, r: string){
    let lb = false;
    let rb = false;
    let lbx = -1;
    let rbx = -1;

    for (let x of this.sp){
      if(l === x.name) {
        lb = true;
        lbx = x.index;
      }
      if(r === x.name) {
        rb = true;
        rbx = x.index;
      }
    }
    if(lb === true && rb === false)
      return -1;
    if(lb === false && rb === true)
      return 1;

    if(lb === true && rb === true){
      if(lbx < rbx) return -1;
      else
        return 1;
    }
    if(l < r) return -1;
    if(r < l) return 1;
    return 0;

  }
  public sort(so: ISortObject[], sp: ISortPattern[] ): any

  {
    this.sp = sp.sort((left, right): number => { if (left.index < right.index) return -1; if (left.index > right.index) return 1; else return 0; });
    return so.sort((left, right) => {return this.checkSort(left.name, right.name)})


  }

}
