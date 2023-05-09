import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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
mostraElemento:boolean = true;

constructor(private elRef: ElementRef){}

@HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.mostraElemento = window.innerWidth >= 800;
  }
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

getMarginTop(): number {
  console.log(this.homeVideo.nativeElement.offsetHeight)
  return this.homeVideo.nativeElement.offsetHeight + 30;
}

}
