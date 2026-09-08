export type LocalTintImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const localTintImages = [
  {
    src: '/gallery/local-tint-white-sedan-night.webp',
    alt: 'White sedan with dark side windows parked outside a workshop at night.',
    caption: 'White sedan, side-on after dark.',
    width: 1600,
    height: 1200,
  },
  {
    src: '/gallery/local-tint-grey-bmw-workshop.webp',
    alt: 'Grey sport sedan with dark side windows parked inside an automotive workshop.',
    caption: 'Grey sport sedan inside the workshop.',
    width: 1200,
    height: 1600,
  },
  {
    src: '/gallery/local-tint-white-electric-sedan-studio.webp',
    alt: 'White electric sedan with dark side windows parked outside the detailing studio.',
    caption: 'White electric sedan outside the studio.',
    width: 1200,
    height: 1600,
  },
] as const satisfies readonly LocalTintImage[];
