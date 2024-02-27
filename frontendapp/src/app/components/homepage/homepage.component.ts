import { Component, AfterViewInit } from '@angular/core';
declare var $: any; // declare jQuery

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // Initialize the carousel
    $('#carouselExampleControls').carousel();
  }
}