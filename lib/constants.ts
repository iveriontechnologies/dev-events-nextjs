export interface EventItem {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    image: '/images/event1.png',
    title: 'React Summit 2026',
    slug: 'react-summit-2026',
    location: 'Amsterdam, Netherlands',
    date: 'Oct 14-16, 2026',
    time: '9:00 AM CET'
  },
  {
    image: '/images/event2.png',
    title: 'KubeCon + CloudNativeCon Europe',
    slug: 'kubecon-europe-2026',
    location: 'London, United Kingdom',
    date: 'Mar 17-20, 2026',
    time: '8:30 AM GMT'
  },
  {
    image: '/images/event3.png',
    title: 'Google I/O Extended',
    slug: 'google-io-extended-2026',
    location: 'San Francisco, USA',
    date: 'May 28, 2026',
    time: '10:00 AM PDT'
  },
  {
    image: '/images/event4.png',
    title: 'Hack the Future',
    slug: 'hack-the-future-2026',
    location: 'Toronto, Canada',
    date: 'Jun 12-14, 2026',
    time: '6:00 PM EDT'
  },
  {
    image: '/images/event5.png',
    title: 'DevOpsDays Amsterdam',
    slug: 'devopsdays-amsterdam-2026',
    location: 'Amsterdam, Netherlands',
    date: 'Sep 2-3, 2026',
    time: '9:00 AM CET'
  },
  {
    image: '/images/event6.png',
    title: 'JS World Conference',
    slug: 'js-world-conference-2026',
    location: 'Berlin, Germany',
    date: 'Nov 5-6, 2026',
    time: '8:45 AM CET'
  }
];
