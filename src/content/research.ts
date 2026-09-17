/* ---------------------------------------------------------------------------
 * RESEARCH AREAS
 *
 * The three areas are the three letters of the lab's name. Order here is the
 * order shown on /research; `featured` areas also appear on the home page.
 * ------------------------------------------------------------------------- */

export type ResearchArea = {
  slug: string;
  /** The B, O, or M of BOM — rendered as the large marker on the card. */
  letter: string;
  title: string;
  /** One or two sentences — used on cards and the home page. */
  summary: string;
  /** Full description, one string per paragraph. */
  body: string[];
  keywords: string[];
  /** Used on home cards and /research. Stored in /public/media/research/, named after the slug. */
  image?: { src: string; alt: string };
  featured?: boolean;
};

/** Shown above the list on /research. */
export const researchIntro = [
  "The lab is named after the three things it studies. A machine that is going to act in the physical world needs a body it can control, objects it can recognise and locate, and an understanding of motion that connects the two through time.",
  "The thread running through all three is efficiency. Dexterous control, dense reconstruction, and long-video motion estimation are each expensive by default, and we are interested in formulations where the cost tracks the content that actually matters.",
];

export const researchAreas: ResearchArea[] = [
  {
    slug: "body",
    letter: "B",
    title: "Body — Dexterous Manipulation and Robot Learning",
    summary:
      "Policies that control high-degree-of-freedom robotic hands, learned from human demonstrations rather than written by hand.",
    body: [
      "A robotic hand with twenty or more joints poses a control problem that does not yield to hand-written rules. We learn these policies instead, using human demonstrations as the supervision signal and looking for representations of contact and grasp that carry over to objects the robot has never held.",
      "The binding constraint is data. Real manipulation demonstrations are slow and expensive to collect, so much of this work is about extracting more from each one — through augmentation that stays physically plausible, and through policy representations that generalise from a handful of examples rather than thousands.",
    ],
    keywords: ["dexterous manipulation", "robot learning", "imitation learning", "data augmentation"],
    image: {
      src: "/media/research/body.webp",
      alt: "A multi-fingered robotic hand holding a yellow cube on a lab bench, beside a depth camera and a monitor showing a simulated grasp.",
    },
    featured: true,
  },
  {
    slug: "object",
    letter: "O",
    title: "Object — 3D and 4D Reconstruction",
    summary:
      "Recovering the geometry of a scene, and how that geometry changes over time, from ordinary video.",
    body: [
      "Before a system can act on an object it has to know where the object is and what shape it takes. We reconstruct 3D structure from images and extend it through time into 4D, so that geometry and motion are estimated jointly instead of one after the other — each constrains the other, and solving them separately throws that constraint away.",
      "We are particularly interested in what can be recovered without per-scene optimisation or dense supervision: priors strong enough that a single forward pass returns structure you can actually use.",
    ],
    keywords: ["3D reconstruction", "4D reconstruction", "multi-view geometry", "neural rendering"],
    image: {
      src: "/media/research/object.webp",
      alt: "A clay pitcher on a turntable in front of a camera and a calibration checkerboard, with its reconstructed 3D model on a monitor.",
    },
    featured: true,
  },
  {
    slug: "motion",
    letter: "M",
    title: "Motion — Tracking and Forecasting",
    summary:
      "Following where every point in a scene goes, and predicting where moving agents will go next.",
    body: [
      "Motion is the thread that connects perception to action. We work on point tracking through long videos, where the difficulty is holding onto identity through occlusion and deformation, and on trajectory forecasting, where the difficulty is that the future is genuinely multi-modal — a single most-likely path is usually the wrong answer to give.",
      "Both problems are expensive to solve densely. We look for formulations that spend computation where the motion is, rather than uniformly across every frame and every pixel.",
    ],
    keywords: ["point tracking", "trajectory forecasting", "video understanding", "efficient inference"],
    image: {
      src: "/media/research/motion.webp",
      alt: "A monitor showing point tracks following a hand as it moves a blue cube, recorded by a camera on a tripod.",
    },
    featured: true,
  },
];

export const featuredResearch = researchAreas.filter((area) => area.featured);
