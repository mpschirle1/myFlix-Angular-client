import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: String;
      Birth: String;
      Death: String;
      Bio: String;
    }
  ) {}
}
