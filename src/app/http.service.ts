import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import  'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }
  showAllPosts(){
    return this._http.get("https://www.reddit.com/r/all/new.json?limit=100")
    .map(allnews=>allnews.json())
    .toPromise()
    }
  
    specificSubreddits(sub: string){
      return this._http.get('https://www.reddit.com/r/'+sub+".json?limit=100")
      .map(subnews=>subnews.json())
      .toPromise()
  
    }
  

}
