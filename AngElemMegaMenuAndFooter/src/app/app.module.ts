import {createCustomElement} from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [FooterComponent],
  entryComponents:[FooterComponent]
})
export class AppModule { 
  constructor(private injector: Injector){

  }

  ngDoBootstrap(){
    const footer=createCustomElement(FooterComponent,{injector: this.injector});
    customElements.define('biz-footer',footer);
  }
}

//https://pnp.github.io/pnpjs/pnpjs/docs/