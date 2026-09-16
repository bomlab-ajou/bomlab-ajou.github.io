/* ---------------------------------------------------------------------------
 * JOIN US
 *
 * Recruiting is what this page is for, so keep it concrete: who we can take,
 * what to send, and what we actually read. Set `open: false` on a position to
 * show it as closed without deleting the entry.
 * ------------------------------------------------------------------------- */

/** Page title on /join. */
export const joinHeadline = "We are recruiting";

export const joinIntro = [
  "The Body, Object, and Motion Lab is recruiting graduate students and undergraduate researchers in the Department of Software and Computer Engineering at Ajou University.",
  "We work on efficient algorithms for robot learning and high-dimensional computer vision — dexterous hand policies, 3D and 4D reconstruction, and video motion estimation. If that is the kind of problem you want to spend a few years on, we would like to hear from you.",
];

/**
 * Time-sensitive notice shown above the position list on /join and in the
 * recruiting band on the home page. Set to `null` to hide it everywhere.
 */
export const admissionsNotice: { label: string; body: string } | null = {
  label: "Spring 2027 admissions",
  body: "Ajou University holds admissions for the spring 2027 semester in October 2026. If you are interested, please email us as soon as possible rather than waiting for the formal announcement.",
};

export type Opening = {
  title: string;
  open: boolean;
  summary: string;
  details: string[];
};

export const openings: Opening[] = [
  {
    title: "Graduate Students — M.S., Ph.D., and integrated M.S./Ph.D.",
    open: true,
    summary:
      "Admitted through Ajou University's regular graduate admissions, which run for both the spring and fall semesters.",
    details: [
      "Applications are limited to graduates of a four-year university in the Republic of Korea who completed their degree within the last two years.",
      "A background in computer science, electrical engineering, robotics, or a comparable quantitative field.",
      "You should be comfortable writing real code — most projects involve building a system, not only running experiments on someone else's.",
      "Email us before you apply, with your CV attached. A short message telling us which direction interests you is worth more than a perfect application form.",
    ],
  },
  {
    title: "Undergraduate Researchers",
    open: true,
    summary:
      "A semester-long project, which often continues into a graduation thesis or a graduate application.",
    details: [
      "At the moment we are only considering students at Ajou University.",
      "No prior research experience required. You should have finished introductory programming and be willing to learn the rest.",
      "Plan on roughly ten hours a week. Consistent hours beat an intense burst followed by silence.",
      "Email us with your CV attached and a note on what you would like to work on.",
    ],
  },
];

/** Shown as a checklist — what actually matters in an application. */
export const lookingFor = [
  "Curiosity about the problem first and the method second",
  "The patience to debug something for three days and stay interested",
  "Willingness to read a paper properly rather than skim the abstract",
  "An interest in other people being able to use what you build",
];

/** What to include in a first email. */
export const applicationChecklist = [
  "A short paragraph on what you want to work on, and why this lab in particular",
  "Your CV, including coursework and projects relevant to the above",
  "Your transcript, if you are applying for a graduate position",
  "A link to code you have written, if you have any you are happy to show",
];
