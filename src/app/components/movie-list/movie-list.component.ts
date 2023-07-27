import {Component, OnInit} from '@angular/core';
import {KinoMonsterService} from "../../services/kino-monster.service";
import {KinoMonsterModel} from "../../models/kino-monster.model";
import {map} from "rxjs";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit{
  public movies?: KinoMonsterModel[];
  public currentMovie?: KinoMonsterModel;
  currentIndex = -1;
  title = '';

  constructor(private kinoMonsterService: KinoMonsterService) {
  }

  ngOnInit(): void {
    this.retrieveMovies();
  }

  retrieveMovies(): void {
    this.kinoMonsterService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      )
      .subscribe(data => this.movies = data)
  }

  refreshList(): void {
    this.currentMovie = undefined;
    this.currentIndex = -1;
    this.retrieveMovies();
  }

  setActiveMovie(movie: KinoMonsterModel, index: number): void {
    this.currentMovie = movie;
    this.currentIndex = index;
  }

  removeAllMovies(): void {
    this.kinoMonsterService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.error(err))
  }

}
