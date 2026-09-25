/* ---------------------------------------------------------------------------
 * PUBLICATIONS
 *
 * To add a paper, copy an entry and edit it. Nothing else needs to change:
 * the year grouping, the type filter, and the "selected" list on the home page
 * are all derived from this array.
 *
 * Author names matching `site.labAuthors` are emphasized automatically.
 * Mark equal contribution with the 0-based author indices in `equalContrib`.
 * ------------------------------------------------------------------------- */

export type PublicationType = "journal" | "conference" | "workshop" | "preprint";

/**
 * A figure or short looping clip shown with the paper on the home page. Files
 * live in /public/media/publications/, named after the publication `id`.
 */
export type Teaser = {
  /** Describes what is shown, for screen readers. */
  alt: string;
  /**
   * "contain" keeps a whole diagram visible on a white card; "cover" fills the
   * frame, which suits camera footage. Defaults to contain for images and cover
   * for video.
   */
  fit?: "contain" | "cover";
} & (
  | { kind: "image"; src: string }
  | {
      kind: "video";
      /** H.264 MP4, muted, a few seconds long. */
      src: string;
      /** Still frame shown before playback and to visitors who prefer reduced motion. */
      poster: string;
    }
);

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  /** Journal or conference name, as it should be cited. */
  venue: string;
  year: number;
  type: PublicationType;
  /** e.g. "12(4), 331-344" */
  details?: string;
  doi?: string;
  arxiv?: string;
  /** Official proceedings or publisher page for the paper, shown as "Paper". */
  page?: string;
  /** Standalone project website. */
  project?: string;
  /** Path under /public, or an external URL. */
  pdf?: string;
  code?: string;
  /** e.g. "Spotlight", "Oral Presentation", "Best Paper Award" */
  award?: string;
  /** Featured on the home page. */
  selected?: boolean;
  teaser?: Teaser;
  /** 0-based indices of authors who contributed equally. */
  equalContrib?: number[];
};

export const publications: Publication[] = [
  {
    id: "dexterous-point-policy-2026",
    title:
      "Dexterous Point Policy: Learning Point-based Dexterous Hand Policies from Human Demonstrations",
    authors: [
      "Beomjun Kim",
      "Seong Hyeon Park",
      "Seunghoon Sim",
      "Seungjun Moon",
      "Sanghyeok Lee",
      "Jinwoo Shin",
    ],
    venue: "Preprint",
    year: 2026,
    type: "preprint",
    arxiv: "https://arxiv.org/abs/2606.10614",
    equalContrib: [0, 1],
    selected: true,
    teaser: {
      kind: "video",
      src: "/media/publications/dexterous-point-policy-2026.mp4",
      poster: "/media/publications/dexterous-point-policy-2026-poster.webp",
      alt: "A dexterous robot hand picks up an orange ball and places it in a metal bowl.",
    },
  },
  {
    id: "pose6daug-2026",
    title:
      "Pose6DAug: Physically Plausible Multi-view Object Swapping for Robot Data Augmentation",
    authors: [
      "Jonghoon Lee",
      "Seong Hyeon Park",
      "Byungwoo Jeon",
      "Minha Lee",
      "Jinwoo Shin",
    ],
    venue: "Neural Information Processing Systems (NeurIPS)",
    year: 2026,
    type: "conference",
    arxiv: "https://arxiv.org/abs/2606.20118",
    project: "https://jhoonjwa.github.io/pose6daug/",
    equalContrib: [0, 1],
    selected: true,
    teaser: {
      kind: "video",
      src: "/media/publications/pose6daug-2026.mp4",
      poster: "/media/publications/pose6daug-2026-poster.webp",
      alt: "A robot picks up a green spray bottle in the original episode. The same episode then replays while a sliding divider reveals the augmented version, with a purple bottle swapped in 3D.",
    },
  },
  {
    id: "track3r-2025",
    title: "Track3R: Joint Point Map and Trajectory Prior for Spatiotemporal 3D Understanding",
    authors: ["Seong Hyeon Park", "Jinwoo Shin"],
    venue: "Neural Information Processing Systems (NeurIPS)",
    year: 2025,
    type: "conference",
    page: "https://papers.nips.cc/paper_files/paper/2025/hash/f298545fedd9f714c4bc1bb0f21306fd-Abstract-Conference.html",
    selected: true,
    teaser: {
      kind: "image",
      src: "/media/publications/track3r-2025.webp",
      alt: "Track3R overview: joint point-map and trajectory decoders, compared with a pair-wise point-mapping architecture.",
    },
  },
  {
    id: "trackime-2024",
    title: "TrackIME: Enhanced Video Point Tracking via Instance Motion Estimation",
    authors: [
      "Seong Hyeon Park",
      "Huiwon Jang",
      "Byungwoo Jeon",
      "Sukmin Yun",
      "Paul Hongsuck Seo",
      "Jinwoo Shin",
    ],
    venue: "Neural Information Processing Systems (NeurIPS)",
    year: 2024,
    type: "conference",
    award: "Spotlight",
    page: "https://papers.nips.cc/paper_files/paper/2024/hash/7bf421a1370d5d3fae9ddbcbaf746143-Abstract-Conference.html",
    selected: true,
    teaser: {
      kind: "image",
      src: "/media/publications/trackime-2024.webp",
      alt: "TrackIME overview: trajectories of semantic neighbours are aggregated, then used to prune the input frames given to a point tracker.",
    },
  },
  {
    id: "tabular-transfer-2024",
    title: "Tabular Transfer Learning via Prompting LLMs",
    authors: [
      "Jaehyun Nam",
      "Woomin Song",
      "Seong Hyeon Park",
      "Jihoon Tack",
      "Sukmin Yun",
      "Jaehyung Kim",
      "Kyu Hwan Oh",
      "Jinwoo Shin",
    ],
    venue: "Conference on Language Modeling (COLM)",
    year: 2024,
    type: "conference",
    arxiv: "https://arxiv.org/abs/2408.11063",
  },
  {
    id: "mc2-2024",
    title:
      "MC2: Multi-view Consistent Depth Estimation via Coordinated Image-based Neural Rendering",
    authors: ["Subin Kim", "Seong Hyeon Park", "Sihyun Yu", "Kihyuk Sohn", "Jinwoo Shin"],
    venue: "CVPR Workshop on Neural Rendering Intelligence",
    year: 2024,
    type: "workshop",
    equalContrib: [0, 1],
    project: "https://subin-kim-cv.github.io/MC2/",
  },
  {
    id: "ifseg-2023",
    title: "IFSeg: Image-free Semantic Segmentation via Vision-Language Model",
    authors: ["Sukmin Yun", "Seong Hyeon Park", "Paul Hongsuck Seo", "Jinwoo Shin"],
    venue: "Computer Vision and Pattern Recognition (CVPR)",
    year: 2023,
    type: "conference",
    equalContrib: [0, 1],
    arxiv: "https://arxiv.org/abs/2303.14396",
  },
  {
    id: "k-centered-2022",
    title: "K-centered Patch Sampling for Efficient Video Recognition",
    authors: [
      "Seong Hyeon Park",
      "Jihoon Tack",
      "Byeongho Heo",
      "Jung-Woo Ha",
      "Jinwoo Shin",
    ],
    venue: "European Conference on Computer Vision (ECCV)",
    year: 2022,
    type: "conference",
    page: "https://www.ecva.net/papers/eccv_2022/papers_ECCV/html/4672_ECCV_2022_paper.php",
  },
  {
    id: "lapred-2021",
    title:
      "LaPred: Lane-Aware Prediction of Multi-Modal Future Trajectories of Dynamic Agents",
    authors: [
      "ByeoungDo Kim",
      "Seong Hyeon Park",
      "Seokhwan Lee",
      "Elbek Khoshimjonov",
      "Dongsuk Kum",
      "Junsoo Kim",
      "Jeong Soo Kim",
      "Jun Won Choi",
    ],
    venue: "Computer Vision and Pattern Recognition (CVPR)",
    year: 2021,
    type: "conference",
    arxiv: "https://arxiv.org/abs/2104.00249",
  },
  {
    id: "diverse-admissible-2020",
    title:
      "Diverse and Admissible Trajectory Forecasting through Multimodal Context Understanding",
    authors: [
      "Seong Hyeon Park",
      "Gyubok Lee",
      "Manoj Bhat",
      "Jimin Seo",
      "Minseok Kang",
      "Jonathan Francis",
      "Ashwin R. Jadhav",
      "Paul Pu Liang",
      "Louis-Philippe Morency",
    ],
    venue: "European Conference on Computer Vision (ECCV)",
    year: 2020,
    type: "conference",
    arxiv: "https://arxiv.org/abs/2003.03212",
  },
  {
    id: "seq2seq-2018",
    title:
      "Sequence-to-Sequence Prediction of Vehicle Trajectory via LSTM Encoder-Decoder Architecture",
    authors: [
      "Seong Hyeon Park",
      "ByeongDo Kim",
      "Chang Mook Kang",
      "Chung Choo Chung",
      "Jun Won Choi",
    ],
    venue: "IEEE Intelligent Vehicles Symposium (IV)",
    year: 2018,
    type: "conference",
    award: "Oral Presentation",
    arxiv: "https://arxiv.org/abs/1802.06338",
  },
];

export const publicationTypeLabels: Record<PublicationType, string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  preprint: "Preprint",
};
