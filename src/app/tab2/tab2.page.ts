import { Component, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  @ViewChild(IonSearchbar) serachBar: IonSearchbar;
  findText: string = '';
  ideas: string[] = [
    'Spide-Man',
    'La Vida es Bella',
    'Thor Love and Thunder',
    'The Batman',
  ];
  searching: boolean = false;

  constructor() {}

  search() {
    this.searching = true;
    this.findText = this.serachBar.value;
    console.log(this.serachBar);
    console.log(this.findText);
  }

  // selectIdea(idea) {
  //   this.serachBar.value = idea;
  // }
}
