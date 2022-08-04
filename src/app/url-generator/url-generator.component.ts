import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CallApiService } from '../call-api.service';
import { tap, lastValueFrom, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-url-generator',
  templateUrl: './url-generator.component.html',
  styleUrls: ['./url-generator.component.css']
})
export class UrlGeneratorComponent implements OnInit {
  @ViewChildren("copyButton") copyButton!: QueryList<ElementRef>;
  @ViewChild("urlInput") urlInput!: ElementRef

  show:boolean = false
  showUrls:boolean = false
  url:string = ""
  urlShorten:string = ""
  count:number = 0
  urlsArray:any = []
  copyText:string = "Copy"
  copiedButton:boolean = false
  errorText:any = "Please add a link"

  constructor(
    private CallApiService: CallApiService,
    private render2: Renderer2,
    ) {}

  ngOnInit(): void {
    const urlsStored:any = localStorage.getItem("urls")
    const urls = JSON.parse(urlsStored)
    if(urlsStored !== null) {
      for(let url of urls) {
        this.urlsArray.push(url)
      }
      this.count = this.urlsArray[this.urlsArray.length-1].id
    }else {
      console.log("null")
    }
  }

  async sendUrl(inputValue: string){
    if(inputValue.length !== 0) {
      this.show = false
      const obj = {
        id: this.count,
        url: this.url,
        urlShorten: this.urlShorten
      }
      try {await lastValueFrom(this.CallApiService.call(inputValue).pipe(
        tap(res => obj.urlShorten = res.result.full_short_link2)))
        this.urlShorten = obj.urlShorten
        obj.url = inputValue
        obj.id = ++this.count
        this.storeUrls(obj)
        this.showUrls = true
        this.show = false
        this.urlInput.nativeElement.value = ""
      }catch (error: any) {
        this.errorText = error.error.error
        this.show = true
      }
    }else {
      this.show = true
    }
  }

  storeUrls(urlsObj: { id: number; url: string; urlShorten: string; }) {
    this.urlsArray.unshift(urlsObj)
    localStorage.setItem("urls", JSON.stringify(this.urlsArray))
  }

  clickOnCopyButton(ele: any) {
    this.copyButton.forEach(element => {
      element.nativeElement.classList.remove("button-copied")
      element.nativeElement.textContent = "Copy"
    })
    this.render2.addClass(ele, "button-copied")
    ele.textContent = "Copied!"
  }

  errorHandler(error: HttpErrorResponse) {
    console.warn(error.error.error)
    return throwError(() => ("Estoy en el throwError"))
  }
}
