import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bono-regalo',
  templateUrl: './bono-regalo.page.html',
  styleUrls: ['./bono-regalo.page.scss'],
})
export class BonoRegaloPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
}
