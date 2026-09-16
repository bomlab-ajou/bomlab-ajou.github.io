# BOM Lab — 연구실 홈페이지

Body, Object, and Motion Lab (아주대학교 소프트웨어학과) 홈페이지.
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4로 만든 정적 사이트입니다.
`next build`가 `out/` 폴더에 순수 HTML/CSS/JS를 생성하므로, Cloudflare Pages·
GitHub Pages·NAS의 웹서버 등 어디에나 그대로 올릴 수 있습니다.

## 개발

```bash
npm install     # 최초 1회
npm run dev     # http://localhost:3000
npm run build   # out/ 에 정적 파일 생성
npm run lint
```

## 콘텐츠 수정

**컴포넌트를 건드릴 일은 거의 없습니다.** 내용은 전부 `src/content/` 아래
6개 파일에 모여 있고, 페이지는 이 데이터를 읽어 렌더링만 합니다.

| 파일 | 내용 |
| --- | --- |
| `src/content/site.ts` | 연구실 이름, 한 줄 소개, 주소, 이메일, 소셜 링크 |
| `src/content/research.ts` | 연구 분야 (`/research`, 홈 카드) |
| `src/content/publications.ts` | 논문 목록 (`/publications`, 홈 Selected work) |
| `src/content/members.ts` | 구성원 및 졸업생 (`/members`) |
| `src/content/news.ts` | 소식 (`/news`, 홈 Recently) |
| `src/content/join.ts` | 모집 공고, 지원 안내, FAQ (`/join`, 홈 하단 배너) |

### 남은 TODO

콘텐츠는 `shpark.org` 기준으로 실제 내용이 들어가 있습니다. 아직 비어 있는
정보는 하나뿐입니다.

| 위치 | 내용 |
| --- | --- |
| `site.ts` → `contact.office` | 건물명·호실. 채우면 Join 페이지 주소란에 자동으로 한 줄 추가됨 |

`members.ts`의 PI 항목에 `photo: "/images/members/shpark.jpg"`를 넣으면
이니셜 대신 사진이 표시됩니다.

`news.ts`의 학회 날짜는 발표일 기준으로 넣어뒀으니 필요하면 조정하세요.

### 학생이 들어오면

1. `members.ts`의 `members` 배열에 추가 → `/members`의 "positions open"
   플레이스홀더가 자동으로 실제 구성원 그리드로 바뀝니다
2. `site.ts`의 `labAuthors`에 그 학생의 논문 표기명을 추가 → 논문 목록에서
   이름이 굵게 표시됩니다
3. 졸업하면 `members`에서 빼고 `alumni` 배열로 옮깁니다

### 논문 추가

`src/content/publications.ts` 배열에 객체 하나를 추가하면 끝입니다.
연도별 그룹, 타입 필터, 검색은 전부 이 배열에서 자동으로 만들어집니다.

```ts
{
  id: "kim-2027-example",          // 고유 문자열이면 무엇이든
  title: "논문 제목",
  authors: ["J. Kim", "S. Park"],  // site.labAuthors 와 일치하면 굵게 표시
  venue: "Nature",
  year: 2027,
  type: "journal",                 // "journal" | "conference" | "preprint"
  details: "612(7940), 45–52",     // 선택
  doi: "https://doi.org/...",      // 선택
  arxiv: "...", pdf: "...", code: "...",  // 선택
  award: "Best Paper Award",       // 선택
  selected: true,                  // 홈 화면에 노출
  equalContrib: [0, 1],            // 공동 1저자 (0-based 인덱스)
}
```

### 구성원 추가

`src/content/members.ts`에 항목을 추가합니다. 사진은
`public/images/members/`에 넣고 `photo: "/images/members/파일명.jpg"`로
참조합니다. 정사각형 600×600px 정도가 가장 잘 맞습니다.
**사진이 없으면 이니셜이 자동으로 표시**되므로 사진 없이 먼저 추가해도 됩니다.

졸업생은 같은 파일의 `alumni` 배열에 넣습니다.

## 배포 — Cloudflare Pages

### 1. 저장소 연결

1. 이 폴더를 GitHub 저장소로 push
2. Cloudflare 대시보드 → **Workers & Pages → Create → Pages → Connect to Git**
3. 빌드 설정:

   | 항목 | 값 |
   | --- | --- |
   | Framework preset | Next.js (Static HTML Export) |
   | Build command | `npm run build` |
   | Build output directory | `out` |

이후 `main` 브랜치에 push할 때마다 자동으로 다시 빌드·배포됩니다.
PR을 올리면 미리보기 URL도 자동 생성됩니다.

### 2. 커스텀 도메인 (`bom.ajou.ac.kr`)

`ajou.ac.kr` DNS는 학교 전산팀이 관리하므로 직접 레코드를 넣을 수 없습니다.

1. Pages 프로젝트 → **Custom domains → Set up a custom domain** →
   `bom.ajou.ac.kr` 입력
2. Cloudflare가 `<프로젝트이름>.pages.dev` 형태의 CNAME 대상을 알려줍니다
3. **전산팀에 아래 레코드 추가를 요청**합니다

   ```
   bom.ajou.ac.kr.   CNAME   <프로젝트이름>.pages.dev.
   ```

4. 레코드가 전파되면 Cloudflare가 HTTPS 인증서를 자동 발급·갱신합니다

> 학교 정책상 외부 CNAME이 막혀 있다면, 전산팀에 리버스 프록시를 요청하거나
> `pages.dev` 주소를 임시로 쓰면서 협의하면 됩니다.

### 3. 공개 전 체크리스트

- [ ] `site.ts` 의 `contact.office` 에 건물·호실 입력
- [ ] PI 사진 추가 (`public/images/members/`)
- [ ] `site.ts` 의 `url` 이 실제 도메인과 일치하는지 확인 (sitemap·robots에 사용됨)
- [ ] `npm run build` 성공
- [ ] 모바일 폭에서 한 번 확인

## 대안 — Asustor NAS에 직접 올리기

`out/` 폴더 전체를 NAS의 웹 루트(보통 `Web` 공유폴더)에 복사하면 됩니다.

```bash
npm run build
rsync -av --delete out/ <사용자>@<NAS주소>:/volume1/Web/
```

`trailingSlash: true`가 켜져 있어 `/research/` → `/research/index.html`로
디렉터리 인덱스가 그대로 동작하므로, 별도의 rewrite 규칙이 필요 없습니다.

NAS를 공개 서버로 쓸 경우 포트포워딩 대신 **Cloudflare Tunnel**(`cloudflared`)을
NAS의 Docker로 띄우는 편이 안전합니다. 아웃바운드 연결만 사용하므로 국내 ISP의
80번 포트 차단과 유동 IP 문제를 동시에 피할 수 있고, NAS의 실제 IP도
노출되지 않습니다.

## 구조

```
src/
├── app/              # 라우트 (페이지당 폴더 하나)
│   ├── layout.tsx    # 헤더·푸터·폰트·다크모드 스크립트
│   ├── page.tsx      # 홈
│   ├── research/ publications/ members/ news/ join/
│   ├── sitemap.ts robots.ts
│   └── globals.css   # 디자인 토큰 (색상·타이포)
├── components/       # 재사용 UI
├── content/          # ★ 내용은 전부 여기
└── lib/              # 정렬·그룹핑 등 헬퍼
```

색상과 폰트는 `src/app/globals.css` 상단의 CSS 변수 한 곳에서 관리합니다.
`--accent` 값만 바꾸면 사이트 전체의 강조색이 바뀝니다. 라이트/다크 두 벌이
`:root`와 `.dark`에 각각 정의되어 있습니다.
