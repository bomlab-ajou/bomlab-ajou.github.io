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

### 콘텐츠 현황

`shpark.org` 기준으로 실제 내용이 모두 들어가 있습니다 — 연구 분야 3개
(Body / Object / Motion), 논문 11편, PI 소개와 사진, 모집 공고.

논문 저자 표기는 arXiv 등재 정보를 기준으로 맞춰져 있습니다. 새 논문을
추가할 때도 arXiv 쪽을 따르면 일관성이 유지됩니다.

`join.ts`의 `admissionsNotice`는 입시 기간 공지입니다. 모집이 끝나면 값을
`null`로 바꾸세요. 홈과 `/join` 양쪽에서 동시에 사라집니다.

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
  type: "conference",              // "journal" | "conference" | "workshop" | "preprint"
  details: "612(7940), 45–52",     // 선택
  doi: "https://doi.org/...",      // 선택
  page: "...",                     // 선택 — 학회 공식 논문 페이지, "Paper"로 표시
  arxiv: "...", pdf: "...", project: "...", code: "...",  // 선택
  award: "Spotlight",              // 선택
  selected: true,                  // 홈 화면 "Selected work"에 노출
  equalContrib: [0, 1],            // 공동 1저자 (0-based 인덱스)
  teaser: { ... },                 // 선택 — 아래 참고
}
```

### 논문 대표 그림·영상 (`teaser`)

`selected: true`인 논문은 홈에서 카드로 표시되고, `teaser`가 있으면 카드 위에
16:9 틀로 들어갑니다. 파일은 `public/media/publications/`에 논문 `id`와 같은
이름으로 둡니다.

```ts
// 그림 — 흰 카드 안에 전체가 보이게 들어감
teaser: {
  kind: "image",
  src: "/media/publications/kim-2027-example.webp",
  alt: "그림이 보여주는 내용 (화면 낭독기용)",
}

// 영상 — 항상 자동재생(화면 밖에서는 멈춤), 정지 버튼 포함
teaser: {
  kind: "video",
  src: "/media/publications/kim-2027-example.mp4",
  poster: "/media/publications/kim-2027-example-poster.webp",
  alt: "영상이 보여주는 내용",
}
```

`fit: "cover"`를 주면 이미지도 틀을 꽉 채웁니다(사진에 적합).

**같은 이름으로 교체해도 됩니다** — 빌드할 때 파일 내용으로 만든 해시가 주소 끝에 붙어서
(`?v=…`, `src/lib/asset-version.ts`) 파일이 바뀌면 주소도 바뀝니다. 방문자 브라우저에 예전
파일이 캐시돼 있어도 새 파일을 받습니다. 연구 분야 이미지와 구성원 사진도 같습니다.

**파일 준비** — 사이트는 올린 파일을 그대로 내보내므로 미리 줄여야 합니다.

| 종류 | 권장 |
| --- | --- |
| 그림 | 가로 1400px WebP. PDF 원본은 `pdftoppm -png -scale-to-x 2800 -scale-to-y -1 -singlefile in.pdf out` 후 `cwebp -q 90 -resize 1400 0 out.png -o id.webp` |
| 영상 | 10초 안팎 H.264 MP4, 소리 없음. `ffmpeg -i in.mp4 -t 10 -an -c:v libx264 -crf 22 -pix_fmt yuv420p -movflags +faststart id.mp4` |
| 포스터 | 영상의 대표 프레임 WebP. 재생이 시작되기 전과, 자동재생을 막는 브라우저(아이폰 저전력 모드 등)에서 보임 |

현재 4편(Dexterous Point Policy, Pose6DAug, Track3R, TrackIME)의 파일이 이렇게
만들어져 있습니다. Dexterous Point Policy 영상은 시각화 도구 화면을 녹화한 영상에서
한 에피소드(양손으로 파란 통을 빼고 살구색 통을 끼우는 성공 시연)를 2배속으로 재생하면서
카메라(RGB) 화면과 3D 포인트 화면을 번갈아 보여줍니다. 시간은 끊기지 않고 보는 화면만
바뀌며, 화면이 바뀔 때는 점 띠가 왼쪽에서 오른쪽으로 쓸고 지나가면서 카메라 화면이 점으로
부서졌다가 포인트로 바뀝니다. 마지막 스윕이 첫 프레임으로 돌아가서 반복 재생이 이어지고,
포스터는 그 첫 프레임입니다. 파일 크기(약 1.1MB)는 CRF 26, `-preset veryslow`로
맞췄습니다.
Pose6DAug 영상은 프로젝트 페이지의 Before·After 에피소드(각 5초, 프레임 단위로 동작이
일치)를 이어 붙인 것입니다. Before를 한 번 재생한 뒤 같은 장면을 다시 재생하면서 구분선이
오른쪽에서 왼쪽으로 쓸려가며 After를 드러냅니다. 포스터는 구분선 양쪽에 두 병이 함께
보이는 장면입니다.

### 연구 분야 이미지 (Research 페이지)

`src/content/research.ts`의 각 분야에 `image`를 넣으면 Research 페이지의 제목
아래에 3:2 틀로 표시됩니다. 파일은 `public/media/research/`에 분야 `slug`와 같은
이름으로 둡니다.

```ts
image: {
  src: "/media/research/body.webp",
  alt: "이미지가 보여주는 내용 (화면 낭독기용)",
},
```

원본 PNG는 `cwebp -q 82 -resize 1400 0 Body.png -o body.webp` 로 줄여서 넣습니다.
3:2가 아닌 이미지는 틀에 맞춰 가장자리가 잘립니다.

### 구성원 추가

`src/content/members.ts`에 항목을 추가합니다. 사진은
`public/images/members/`에 넣고 `photo: "/images/members/파일명.jpg"`로
참조합니다. 정사각형 600×600px 정도가 가장 잘 맞습니다.
**사진이 없으면 이니셜이 자동으로 표시**되므로 사진 없이 먼저 추가해도 됩니다.

졸업생은 같은 파일의 `alumni` 배열에 넣습니다.

## 배포 — GitHub Pages

저장소: `bomlab-ajou/bomlab-ajou.github.io`
주소: https://bom.ajou.ac.kr (HTTPS, 인증서 자동 갱신)
`https://bomlab-ajou.github.io` 로 접속하면 위 주소로 자동 이동합니다.

`main`에 push하면 `.github/workflows/deploy.yml`이 `npm run build`를 돌리고
`out/`을 Pages에 배포합니다. **비밀키나 API 토큰 설정은 필요 없습니다** —
Actions의 내장 토큰을 사용합니다.

Actions 탭에서 `Run workflow`로 수동 재배포도 가능합니다.

### 왜 Cloudflare Pages가 아닌가

원래 Cloudflare Pages로 계획했으나, Cloudflare 대시보드에서 신규 Pages
프로젝트 생성 진입점이 사라졌습니다(Workers로 유도됨). Workers는 Custom
Domain에 **본인 소유의 활성 Cloudflare zone**을 요구하는데 `ajou.ac.kr`은
학교가 관리하므로 `bom.ajou.ac.kr` 연결이 불가능합니다.

GitHub Pages는 외부 DNS의 서브도메인을 CNAME으로 지원하므로 이 제약이
없습니다.

### 저장소 이름이 `bomlab-ajou.github.io`인 이유

GitHub Pages는 `<계정명>.github.io` 저장소만 **루트 경로**(`/`)로 서빙합니다.
다른 이름이면 `/저장소이름/` 하위 경로가 되어 `next.config.ts`에 `basePath`
설정이 필요하고, 커스텀 도메인(루트) 연결 시 그 설정을 다시 빼야 합니다.
루트로 통일해두면 임시 주소와 최종 주소가 동일하게 동작합니다.

### `public/.nojekyll`

이 파일이 없으면 GitHub Pages의 Jekyll이 밑줄로 시작하는 `_next/` 디렉터리를
무시해서 CSS와 JavaScript가 전부 404가 됩니다. 지우지 마세요.

### 커스텀 도메인 (`bom.ajou.ac.kr`) — 순서 주의

1. 저장소 **Settings → Pages → Custom domain** 에 `bom.ajou.ac.kr` 입력
2. 학교 전산팀에 CNAME 레코드 추가 요청

   ```
   bom.ajou.ac.kr.   CNAME   bomlab-ajou.github.io.
   ```

3. 전파되면 **Enforce HTTPS** 체크 (인증서 자동 발급)

> 1번을 건너뛰고 CNAME부터 넣으면 도메인 검증이 실패합니다.

커스텀 도메인을 설정하면 `bomlab-ajou.github.io` 접속이 그쪽으로
리다이렉트되므로, **DNS가 준비된 뒤에** 1번을 진행하는 편이 미리보기에
유리합니다.

### 공개 전 체크리스트

- [ ] `site.ts` 의 `url` 이 실제 도메인과 일치하는지 확인 (sitemap·robots에 사용됨)
- [ ] `npm run build` 성공
- [ ] 모바일 폭에서 한 번 확인

## 대안 — Asustor NAS에 직접 올리기

GitHub Pages 대신 NAS에서 직접 서빙하려면, `out/` 폴더 전체를 NAS의
웹 루트(보통 `Web` 공유폴더)에 복사하면 됩니다.

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
└── lib/              # 정렬·그룹핑·메타데이터 헬퍼
public/media/        # 논문 teaser, 연구 분야 이미지
scripts/             # 파비콘·공유 이미지 생성 (npm run generate:brand)
```

색상과 폰트는 `src/app/globals.css` 상단의 CSS 변수 한 곳에서 관리합니다.
`--accent` 값만 바꾸면 사이트 전체의 강조색이 바뀝니다. 라이트/다크 두 벌이
`:root`와 `.dark`에 각각 정의되어 있습니다.
