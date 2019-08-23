import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

var headers = new Headers();
        headers.append('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  api = "https://jsonplaceholder.typicode.com/posts/";

  constructor(
    private http: HttpClient
  ) { }

  getData(input: number){
    const url = this.api + input;
    console.log(url);
		return this.http.get(url)
      .pipe(
        map(response => { return response; })
    );
  }
  
  getDatas() {
    console.log(this.api);
		return this.http.get(this.api)
			.pipe(
        map(response => { return response; })
      );
  }

}
