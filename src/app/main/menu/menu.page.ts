import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Fal',
      url: '/menu/wall',
      icon: 'home'

    },
    {
      title: 'Vizsgálatok',
      url: '/menu/examination',
      icon: 'build'
    },
    {
      title: 'Csoportstatisztika',
      url: '/menu/group-statistics',
      icon: 'build'
    },
    {
      title: 'Munkatársak',
      url: '/menu/staff',
      icon: 'build'
    },
    {
      title: 'Diagnózis',
      url: '/menu/histological',
      icon: 'build'
    },

  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}
}