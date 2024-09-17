import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fast-pickups';
  texts: any[] = [];
  destinationsImages: { src: string; caption: string }[] = [];
  travellers: {
    src: string;
    title: string;
    desc: string;
    isReverse: boolean;
  }[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  ngOnInit() {
    this.destinationsImages = [
      { src: '../assets/images/dest/dest1.webp', caption: 'Greece' },
      { src: '../assets/images/dest/dest2.webp', caption: 'Spain' },
      { src: '../assets/images/dest/dest3.webp', caption: 'France' },
      { src: '../assets/images/dest/dest4.webp', caption: 'Italy' },
      { src: '../assets/images/dest/dest5.webp', caption: 'Germany' },
      { src: '../assets/images/dest/dest6.webp', caption: 'Cyprus' },
      { src: '../assets/images/dest/dest7.webp', caption: 'Netherlands' },
      { src: '../assets/images/dest/dest8.webp', caption: 'United Kingdom' },
      { src: '../assets/images/dest/dest9.webp', caption: 'China' },
      { src: '../assets/images/dest/dest10.webp', caption: 'Austria' },
      { src: '../assets/images/dest/dest11.webp', caption: 'Portugal' },
      { src: '../assets/images/dest/dest12.webp', caption: 'Israel' },
    ];
    this.travellers = [
      {
        src: '../assets/images/travel1.webp',
        title: '1500+ hotels offer a better customer experience',
        desc: 'In just a few minutes you can set up our free automated transfer solution and start giving your guests the best possible welcome experience while earning extra revenue',
        isReverse: false,
      },
      {
        src: '../assets/images/travel2.webp',
        title: '800+ vacation rentals automate transfers and boost earnings',
        desc: 'Streamline your transfer arrangements while increasing your earnings per apartment',
        isReverse: true,
      },
      {
        src: '../assets/images/travel3.webp',
        title: '20+ travel companies expand their services',
        desc: 'With effortless integration and available white label solutions, offer your clients access to a superior transfer experience. Plus, you’ll learn more about your clients, increase NPS, and boost your revenue.',
        isReverse: false,
      },
      {
        src: '../assets/images/travel4.webp',
        title: '1000+ professional drivers in our family of Welcomers',
        desc: 'We help you earn money as a driver by connecting you with travellers who want to feel at home in your city. Schedule quality rides in advance, get paid weekly, and work when it’s convenient for you. Download our Driver app today:',
        isReverse: true,
      },
    ];

    this.texts = [
      {
        image: '../assets/images/driver1.webp',
        name: 'Loranzo',
        content:
          ' Proud Roman who worked as a tour guide in the past. A story-teller and history buff person you will love to meet and have conversations with.',
      },
      {
        image: '../assets/images/driver2.webp',
        name: 'Raul',
        content:
          '100% Catalan and in love with showing Barcelonas hidden gems to travelers. He knows the most authentic tapas place in town, far away from tourist traps.',
      },
      {
        image: '../assets/images/driver3.webp',
        name: 'Kostas',
        content:
          ' Born-and-bred Athenian, with recommendations for off-the-beaten-path places you will enjoy visiting! Loves cooking ... and history.',
      },
    ];
  }
}
