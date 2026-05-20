import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-shell',
  imports: [
    Navbar,
    Footer,
    RouterOutlet
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class Shell {}
