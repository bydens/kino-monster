import { Injectable } from '@angular/core';
import {KinoMonsterModel} from "../models/kino-monster.model";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class KinoMonsterService {
  private dbPath = '/movies';

  kinoMonsterRef: AngularFireList<KinoMonsterModel>

  constructor(private db: AngularFireDatabase) {
    this.kinoMonsterRef = this.db.list(this.dbPath);
  }

  getAll(): AngularFireList<KinoMonsterModel> {
    return this.kinoMonsterRef;
  }

  create(movie: KinoMonsterModel | null): any {
    if (movie) {
      return this.kinoMonsterRef.push(movie);
    }
  }

  update(key: string, value: any): Promise<void> {
    return this.kinoMonsterRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.kinoMonsterRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.kinoMonsterRef.remove();
  }
}
