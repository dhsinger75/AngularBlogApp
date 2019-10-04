import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../models/post.model';
import { AddPostService } from './app-post.service';
import { CommonService } from '../service/common.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService ]
})
export class AddPostComponent{

  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef
  public post : Post;

  constructor(private addPostService: AddPostService, private commonService: CommonService) { 
    this.post = new Post();
  }

  ngOnInit(){
    this.commonService.postEdit_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_edited;
      console.log('add post is ', this.post.title);
    });
  }

  addPost(){
    if(this.post.title && this.post.description){
      if (this.post._id){
        this.addPostService.updatePost(this.post).subscribe(res => {
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        })

      } else{
        this.addPostService.addPost(this.post).subscribe(res => {
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      }
      
    } else{
      alert('Title and Description are required');
    }
  }

}
