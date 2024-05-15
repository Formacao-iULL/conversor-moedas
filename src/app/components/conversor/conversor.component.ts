import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [
    HeaderComponent, 
    ButtonComponent
  ],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.scss'
})
export class ConversorComponent {

}
