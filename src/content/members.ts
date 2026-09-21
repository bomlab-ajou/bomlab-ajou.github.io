/* ---------------------------------------------------------------------------
 * PEOPLE
 *
 * The lab opened in fall 2026, so the PI is currently the only entry. As
 * students join, add them here — the /members page builds its sections from
 * this array and skips any group that is still empty, so no layout work is
 * needed. Remember to add each new member's publication name to
 * `site.labAuthors` so their papers show them in bold.
 *
 * Photos go in /public/images/members/ and are referenced as
 * "/images/members/<filename>". Square images around 600x600 look best.
 * A member without a photo falls back to their initials.
 * ------------------------------------------------------------------------- */

export type MemberRole = "pi" | "postdoc" | "phd" | "ms" | "undergrad" | "staff";

export type Member = {
  id: string;
  name: string;
  /** Optional Korean name, shown small next to the English one. */
  koreanName?: string;
  role: MemberRole;
  /** Free-text title, e.g. "Ph.D. Student (3rd year)". Falls back to the role label. */
  title?: string;
  photo?: string;
  email?: string;
  interests?: string[];
  /** Short paragraphs, only rendered for the PI. */
  bio?: string[];
  links?: {
    scholar?: string;
    github?: string;
    website?: string;
    cv?: string;
    linkedin?: string;
    orcid?: string;
  };
};

export const roleLabels: Record<MemberRole, string> = {
  pi: "Principal Investigator",
  postdoc: "Postdoctoral Researcher",
  phd: "Ph.D. Student",
  ms: "M.S. Student",
  undergrad: "Undergraduate Researcher",
  staff: "Research Staff",
};

/** Section order on /members. Empty groups are skipped automatically. */
export const roleOrder: MemberRole[] = ["pi", "postdoc", "phd", "ms", "undergrad", "staff"];

export const roleGroupTitles: Record<MemberRole, string> = {
  pi: "Principal Investigator",
  postdoc: "Postdoctoral Researchers",
  phd: "Ph.D. Students",
  ms: "M.S. Students",
  undergrad: "Undergraduate Researchers",
  staff: "Research Staff",
};

export const members: Member[] = [
  {
    id: "seong-hyeon-park",
    name: "Seong Hyeon Park",
    koreanName: "박성현",
    role: "pi",
    title: "Assistant Professor",
    email: "seonghyp@ajou.ac.kr",
    photo: "/images/members/seong-hyeon-park.jpg",
    interests: [
      "robot learning",
      "dexterous manipulation",
      "3D/4D reconstruction",
      "video motion estimation",
    ],
    bio: [
      "Seong Hyeon Park is an Assistant Professor in the Department of Software and Computer Engineering at Ajou University, where he started the Body, Object, and Motion Lab in fall 2026. He received his Ph.D. from KAIST and was previously a Visiting Scholar at the Global AI Frontier Lab, New York University.",
      "His research is on efficient algorithms for robot learning and high-dimensional computer vision: dexterous, high-degree-of-freedom robotic hand policies, 3D and 4D reconstruction, and video motion estimation.",
    ],
    links: {
      website: "https://www.shpark.org",
      scholar: "https://scholar.google.com/citations?user=ZRKX9B0AAAAJ",
      cv: "https://drive.google.com/file/d/1wAH7WgDpHRXWq_06AnKwenALYglJlyzK/view?usp=sharing",
    },
  },
];

export type Alumnus = {
  name: string;
  /** e.g. "Ph.D. 2025" or "M.S. 2023" */
  degree: string;
  thesis?: string;
  /** Where they are now. */
  now?: string;
  link?: string;
};

/** No graduates yet — the section is hidden until this array has entries. */
export const alumni: Alumnus[] = [];
