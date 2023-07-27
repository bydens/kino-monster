import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {KinoMonsterModel} from "../../models/kino-monster.model";
import {KinoMonsterService} from "../../services/kino-monster.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnChanges{
  @Input()
  movie?: KinoMonsterModel;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  currentMovie: KinoMonsterModel = {
    name: '',
    description: '',
    published: false,
  };

  message = '';

  constructor(private kinoMonsterService: KinoMonsterService) {
  }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentMovie = {...this.movie};
  }

  updatePublished(status: boolean): void {
    if(this.currentMovie.key) {
      this.kinoMonsterService.update(this.currentMovie.key, {published: status})
        .then(() => {
          this.currentMovie.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

  updateMovie(): void {
    const data = {
      name: this.currentMovie.name,
      description: this.currentMovie.description
    }

    if(this.currentMovie.key) {
      this.kinoMonsterService.update(this.currentMovie.key, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteMovie(): void {
    if(this.currentMovie.key) {
      this.kinoMonsterService.delete(this.currentMovie.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
