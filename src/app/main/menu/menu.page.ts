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
      icon: 'calendar-outline'

    },
    {
      title: 'Vizsgálatok',
      url: '/menu/examination',
      icon: 'document-text-outline'
    },
    {
      title: 'Csoportstatisztika',
      url: '/menu/group-statistics',
      icon: 'bar-chart-outline'
    },
    {
      title: 'Tagok',
      url: '/menu/staff',
      icon: 'people-outline'
    },
    {
      title: 'Diagnózis',
      url: '/menu/histological',
      icon: 'pulse-outline'
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