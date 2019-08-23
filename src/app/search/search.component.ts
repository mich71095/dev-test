import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { SearchPreview } from '../interfaces/search.preview.interface';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchInput = new FormControl('');
  
  data: SearchPreview;
  datas: SearchPreview[];
  dataTemp = [];

  isData = false;
  isDatas = false;
  isComplexData = false;
  isError = false;

  errorMessage: string = '';

  constructor(
    private _service: SearchService
  ) { }

  ngOnInit() {
  }

  isInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
  }

  search(): void {
    if (this.searchInput.value.length === 1) {
      if(!this.isInteger(this.searchInput.value)){
        console.log("ERROR");
        this.isError = true;
        this.errorMessage = "Not a number ID";
      } else {
        console.log("NO ERROR");
        this.isError = false;
        if (Number(this.searchInput.value) === 0){
         this.isData = false;
         this.isDatas = true;
         this.isComplexData = false;
          this.getDatas();
        }
        else {
          this.isData= true;
          this.isDatas = false; 
          this.isComplexData = false;
          this.getData(Number(this.searchInput.value));
          
        }
      }
    } else {
       
      this.isData= false;
      this.isDatas = false; 
      this.isComplexData = true;

      let filteredInputs = this.searchInput.value.split(",");
      console.log(filteredInputs);
      this.getDatasComplex(filteredInputs);
    }

  }

  getData(input: number): void {
    this._service.getData(input)
      .subscribe((data: SearchPreview) => {
        this.data = data;
        console.log(data);
      });
  }

  getDatas(): void {
    this._service.getDatas()
      .subscribe((datas: SearchPreview[]) => {
        this.datas = datas;
        console.log(datas);
      });
  }

  getDatasComplex(inputs: Array<string>): void {
    this.dataTemp = [];
    this._service.getDatas()
      .subscribe((datas: SearchPreview[]) => {
       
        console.log(inputs.length);
        console.log(datas.length);
        for(let i=0; i<datas.length; i++){

          if(inputs.includes(String(datas[i].id))){
            let temp = {};
            temp['id'] = datas[i].id;
            temp['title'] = datas[i].title;
            temp['body'] = datas[i].body;
            this.dataTemp.push(temp);
          }
        }
        console.log(this.dataTemp);
      });
  }

}
