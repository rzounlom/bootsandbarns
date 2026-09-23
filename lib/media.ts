export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type FarmVideo = {
  src: string;
  poster: string;
  title: string;
  description: string;
};

/** Wide pen photographs, shown in full so the animals are not cropped away. */
export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/img/animals/IMG_20260917_081413.jpg",
    alt: "Two pigs standing together in a sunlit corner of a concrete pen.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081443.jpg",
    alt: "A spotted pig and two pale pigs in a pen, one looking up toward the camera.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081346.jpg",
    alt: "A sow lying on her side on the floor of a pen.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081120.jpg",
    alt: "Four young pigs gathered around a concrete feeding trough.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081610.jpg",
    alt: "Concrete pens with barred windows, one pig below and two pigs resting in an upper pen.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081143.jpg",
    alt: "A pig looking through a metal gate, with other pigs at a trough behind it.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081719.jpg",
    alt: "A large white pig in the foreground and two pigs in a raised pen behind.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081237.jpg",
    alt: "Pigs drinking from wall-mounted nipples beside a pen with a barred window.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081501.jpg",
    alt: "A young pig standing in a pen and looking toward the camera, with other pigs nearby.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081553.jpg",
    alt: "A pale pig and a spotted pig at a feeding trough, with a water trough beside them.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081645.jpg",
    alt: "A large white pig seen from above, standing in a pen beside a wire gate.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081423.jpg",
    alt: "Two pigs in a pen, with sunlight across the wall and buckets stored nearby.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081703.jpg",
    alt: "A group of pigs gathered around a feeding trough in a pen.",
    width: 2400,
    height: 1080,
  },
  {
    src: "/img/animals/IMG_20260917_081210.jpg",
    alt: "Several pigs in a pen, including one standing behind a wire gate.",
    width: 2400,
    height: 1080,
  },
];

export const heroPhoto = {
  src: "/img/animals/IMG_20260917_081413.jpg",
  alt: "Two pigs standing together in a sunlit corner of a pen at Boots and Barns.",
  width: 2400,
  height: 1080,
};

/**
 * Safe filenames for the original WhatsApp clips:
 * by-the-window ← 15.22.20, piglets-nursing ← 15.23.35,
 * at-the-trough ← 15.25.49, rinsing ← 15.27.17, sow-and-piglets ← 16.37.51
 */
export const farmVideos: FarmVideo[] = [
  {
    src: "/videos/piglets-nursing.mp4",
    poster: "/videos/posters/piglets-nursing.jpg",
    title: "Piglets nursing",
    description: "Piglets feeding alongside a sow.",
  },
  {
    src: "/videos/at-the-trough.mp4",
    poster: "/videos/posters/at-the-trough.jpg",
    title: "At the trough",
    description: "Young pigs gathered at a feeding trough.",
  },
  {
    src: "/videos/by-the-window.mp4",
    poster: "/videos/posters/by-the-window.jpg",
    title: "By the window",
    description: "A pig standing beside a barred window.",
  },
  {
    src: "/videos/sow-and-piglets.mp4",
    poster: "/videos/posters/sow-and-piglets.jpg",
    title: "Sow and piglets",
    description: "A sow lying with her piglets.",
  },
  {
    src: "/videos/rinsing.mp4",
    poster: "/videos/posters/rinsing.jpg",
    title: "Rinsing",
    description: "A pig being rinsed in a pen.",
  },
];

export const founders = [
  {
    name: "Sifon-Glory Benson",
    src: "/img/founders/Sifon-Profile-Pic.png",
    width: 919,
    height: 1000,
    alt: "Portrait of Sifon-Glory Benson.",
    objectPosition: "center 18%",
  },
  {
    name: "Senyie Benson",
    src: "/img/founders/Senyie-Profile-Pic.png",
    width: 1000,
    height: 1000,
    alt: "Portrait of Senyie Benson.",
    objectPosition: "center 42%",
  },
] as const;
