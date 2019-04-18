import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class HttpService{
    workPort: string = '7100';
    // workPort: string = '7190';
    constructor(private http: HttpClient) { }

    getData(query: string, cond?: any){
        let body = {
            "s": query
            // "token": "6e580e17-a2e6-4594-af3c-fb6e8623f026"
        };
        if(typeof(cond)!== 'undefined'){
            for(let key of cond){
                body[key.key] = key.value;
            }
        }
        return this.http.get("http://161.8.230.113:"+this.workPort+"/getdata.aspx", { params: body });
    }
}