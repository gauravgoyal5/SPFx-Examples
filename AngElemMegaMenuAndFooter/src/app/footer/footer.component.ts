import { Component, OnInit,Input, ViewEncapsulation } from '@angular/core';
import pnp from '@pnp/pnpjs';
import {Web,sp} from '@pnp/sp';

@Component({
  selector: 'biz-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  @Input() fromsp :string ="false";
  @Input() adminurl:string="";
  footerData:string="";
  constructor() { }

  ngOnInit() {
    
    if(this.fromsp =="true")
    {
    sp.setup({
      spfxContext: window["FooterContext"]
    });
    this.genedateDataFromSPforFooter();
  }
  else
  {
    this.generateMockDataForFooter();
  }
  }

  generateMockDataForFooter(){
    this.footerData=`
    <div class='container-fluid'><div class='row-fluid'><div class='col-sm-3'><div class='navbar-text'><div class="ExternalClass150B822AD818407EAF5F4ED650951740"><p><strong><span style="color&#58;#cc0000;">Head Office</span></strong></p><p>23191 La Cadena Drive, #101&#160;<br>Laguna Hills, CA 92653&#160;<br>USA</p><p>Phone&#58; (949) 522 0608</p><p><a href="https&#58;//goo.gl/maps/gLjijue1EUB2" target="_blank" title="Click to open the map"><span style="color&#58;#00ccff;">Google map</span></a></p></div></div></div><div class='col-sm-3'><div class='navbar-text'><div class="ExternalClass79C8117D61E949F79251E358B7C146F0"><p><strong>India Office</strong></p><p>Plot No. 8, Scheme No. 78, Part-2,&#160;<br>Indore (MP) - 452010&#160;<br>India<br></p><p>Phone&#58; 91-731 4008148<br></p><p><a href="https&#58;//goo.gl/maps/waYtmbPzitx" target="_blank" title="Click to see the map"><span style="color&#58;#00ccff;">Google map</span></a><br></p></div></div></div><div class='col-sm-3'><div class='navbar-text'><div class="ExternalClass3FF6F48A164E4ADDAC5DEBE3856B768B"><a href="/sites/BasecampPortal/forms/pages/outofoffice.aspx" target="_blank" title="Fill the form to notify your absence from office"><span style="color&#58;#3399ff;">Notify when out of office</span></a><br></div></div></div><div class='col-sm-3'><div class='navbar-text'><div class="ExternalClass78C3FFBD31A546DDBD324B610C327928"><p><a href="http&#58;//www.basecampstartups.co.in" target="_blank" title="Building the next breed of innovative applications"><span style="color&#58;#3399ff;">Basecamp Startups Website</span></a><span style="color&#58;#3399ff;">&#160;</span><span style="color&#58;#3399ff;"><a href="http&#58;//www.bizportals.com/" target="_blank" title="Intranet for small to medium size businesses"><span style="color&#58;#3399ff;"></span></a></span><span style="color&#58;#3399ff;"><span style="color&#58;#3399ff;"></span></span></p><p><span style="color&#58;#3399ff;"><span style="color&#58;#3399ff;"><a href="https&#58;//www.bizportals365.com/" target="_blank" title="Your complete business intranet">BizPortals 365 Website</a></span></span></p><p><span style="color&#58;#3399ff;"><span style="color&#58;#3399ff;"><a href="https&#58;//www.bizchathq.com/" target="_blank" title="Communicate faster and be more productive">BizChat Website</a></span></span></p><p><span style="font-size&#58;12.0pt;font-family&#58;'Calibri',sans-serif;color&#58;black;"><a href="https&#58;//www.optiproerp.com/" title="OptiProERP Global Website" target="_blank">OptiProERP Global Website</a> </span></p></div></div></div></div></div><div class='footer-bottom'><div class='container-fluid'><div class='row-fluid'><div class='col-sm-6 copyright'><div class='navbar-text'><div class="ExternalClass1E0E2F667AB34B87B653A40643B83CFB">&#160;</div></div></div><div class='col-sm-6 copyright'><div class='navbar-text'><div class="ExternalClass3FF6F48A164E4ADDAC5DEBE3856B768B"><a href="/sites/BasecampPortal/forms/pages/outofoffice.aspx" target="_blank" title="Fill the form to notify your absence from office"><span style="color&#58;#3399ff;"></span></a><br></div></div></div></div></div></div>
    `;
  }

  genedateDataFromSPforFooter()
  {
    console.log('genedateDataFromSPforFooter');
    console.log('Admin Url : ',this.adminurl);
    let web =new Web(this.adminurl);
    console.log('Getting web');
    web.get().then(w => {
      console.log('Got web : '+w.Title);
      web.lists.getByTitle('BizpFooter').select('BizpFooterColumn1','BizpFooterColumn2','BizpFooterColumn3','BizpFooterColumn4','BizpFooterLine1','BizpFooterLine2').items.top(1).get().then(itms =>{
        console.log('Footer');
        console.log(itms);
      });
  });

  }

}
