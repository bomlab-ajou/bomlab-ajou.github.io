/* ---------------------------------------------------------------------------
 * SITE CONFIGURATION
 *
 * Every value here is live on the site. `contact.office` and `contact.phone`
 * are optional — leave either blank and that line is dropped from the address
 * block rather than rendering empty.
 * ------------------------------------------------------------------------- */

export const site = {
  /** Shows a "draft content" banner site-wide. */
  draft: false,

  /** Short name used in the header wordmark and page titles. */
  name: "BOM Lab",

  /** The lab's expanded name. */
  fullName: "Body, Object, and Motion Lab",

  /** One line that answers "what does this lab do?" — shown in the hero. */
  tagline: "Machines that understand bodies, objects, and the motion between them.",

  /** Used for <meta name="description"> and social previews. */
  description:
    "The Body, Object, and Motion Lab at Ajou University builds efficient algorithms for robot learning and high-dimensional computer vision — dexterous hand policies, 3D and 4D reconstruction, and video motion estimation.",

  university: "Ajou University",
  department: "Department of Software and Computer Engineering",

  url: "https://bom.ajou.ac.kr",

  /** Shown in the hero and on the join page while the lab is forming. */
  recruiting: {
    active: true,
    label: "Now recruiting graduate and undergraduate students",
  },

  contact: {
    email: "seonghyp@ajou.ac.kr",
    /** Building and room number — fill in when known. */
    /** Optional; prepended to the address block in the footer and on /join. */
    office: "Paldal Hall 808",
    /** Optional; omitted from the site entirely when blank. */
    phone: "",
    /** Street address only — the department and university are printed separately. */
    address: [
      "Ajou University, 206 World cup-ro",
      "Yeongtong-gu, Suwon 16499, Republic of Korea",
    ],
    mapUrl: "https://maps.google.com/?q=Ajou+University",
  },

  links: {
    scholar: "https://scholar.google.com/citations?user=ZRKX9B0AAAAJ",
    github: "",
    linkedin: "https://www.linkedin.com/in/seonghyp",
  },

  /**
   * Author strings that belong to this lab. Any author in `publications.ts`
   * matching one of these is emphasized in the publication list. Add each
   * student's name here as they join and publish.
   */
  labAuthors: ["Seong Hyeon Park"],
} as const;

export type Site = typeof site;
