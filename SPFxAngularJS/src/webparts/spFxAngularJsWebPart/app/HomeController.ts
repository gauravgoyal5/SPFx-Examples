import * as angular from 'angular';

export class HomeController{
    public testTitle: string='Gaurav Goyal' ;
    constructor()
    {

    }

    getTitle=() : string=>{
        return "This is Title."
    }
}

