import { Component } from '@angular/core';
import {KinoMonsterService} from "../../services/kino-monster.service";
import {KinoMonsterModel} from "../../models/kino-monster.model";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {

  movie: KinoMonsterModel = {
    name: '',
    description: '',
  };

  submitted = false;

  constructor(private kinoMonsterService: KinoMonsterService) {
  }

  saveMovie(): void {
    this.kinoMonsterService
      .create(this.movie)
      .then(() => {
        console.log('Created new item successfully!');
        this.submitted = true;
      })
  }

  newMovie(): void {
    this.submitted = false;
    this.movie = {
      name: '',
      description: ''
    };
  }

}
