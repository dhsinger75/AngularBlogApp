import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ LoginService ]
})
export class HomeComponent{
    @ViewChild('addPost', { static: false }) addBtn: ElementRef;

    constructor(private commonService: CommonService, private router: Router, public loginService: LoginService){
        
        if(!localStorage.getItem('loggedInUser')){
            this.router.navigate(['/']);
        }
        
        this.commonService.postEdit_Observable.subscribe(res => {
            this.addBtn.nativeElement.click();
        });
    }

    logout(){
        localStorage.removeItem('loggedInUser');
        this.router.navigate(['/']);
    }

    test(){
        this.loginService.test();
    }

}