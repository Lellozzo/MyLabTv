import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { PersonDetail } from 'src/models/movie';

@Component({
  selector: 'app-attori',
  templateUrl: './attori.component.html',
  styleUrls: ['./attori.component.css']
})
export class AttoriComponent implements OnInit {
  loaded: boolean = false
  attoriDett!: PersonDetail 
  anniAttore: number = 0
  deceduto: boolean = false
  movieCredits: [] = [];
  
  constructor(private mediaService: MediaService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.getPerson()
  }


getPerson() {
  let id = this.route.snapshot.paramMap.get('id');
  let mediaType = "person";
 
  if (id && mediaType) {
    console.log("ci sono gli id e media")
    const personId = parseInt(id, 10);
    this.mediaService.getPersonDetail(mediaType, personId, 'it-US').subscribe(response => {
      console.log(response);
      this.attoriDett = response;
      this.loaded = true;

      if (!response.biography || response.biography.trim() === '') {
        // Utilizza la biografia in lingua inglese come fallback
        this.mediaService.getPersonDetail(mediaType, personId, 'en-US').subscribe(responseEnglish => {
          console.log(responseEnglish);
          this.attoriDett.biography = responseEnglish.biography;
          this.loaded = true;
        
          if (response.deathday === null) {
            this.anniAttore = this.calculateAge(response.birthday);
            console.log(this.anniAttore);
          } else {
            this.deceduto = true;
          }
        });
      } else {
        if (response.deathday === null) {
          this.anniAttore = this.calculateAge(response.birthday);
          console.log(this.anniAttore);
        } else {
          this.deceduto = true;
        }
      }
    });
  }
}
 

calculateAge(birthday: string): number {
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Verifico se il compleanno deve ancora arrivare quest'anno
  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

goToDetail(id: number) {
  const mediaType = 'movie'
  let ids = this.route.snapshot.paramMap.get('id');
  
  const url = `/${mediaType}/${id}`;
  console.log(url);
  this.router.navigate([url])
  
 
}

}
