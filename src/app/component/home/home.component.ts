import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
@ViewChild('homeVideo', {static: false}) homeVideo!: ElementRef<HTMLVideoElement>;


mouseMoved: boolean = false;
videoStarted:boolean=false
events:string[] = ['click', 'scroll', 'mousemove']
constructor(private elRef: ElementRef){}


/* FIX
 Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. h
*/

  ngAfterViewInit(): void {
    for (const e of this.events) {
      document.addEventListener (e, this.onMouseMove.bind(this));
    }
  }


  
ngOnInit(): void {
  
  }



onMouseMove() {
  this.mouseMoved = true;
  if (!this.videoStarted) {
    this.homeVideo.nativeElement.muted = true;
    this.homeVideo.nativeElement.play();
    this.videoStarted = true;
    
  }
}

}
