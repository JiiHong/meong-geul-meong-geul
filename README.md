# 🐶 멍글멍글
![멍글멍글](https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/c9261818-9617-4e69-901b-9bcf8ccaf752)

### 🗓 개발 기간
2024.03.26 ~ 2024.05.27 </br></br>
배포 URL: https://www.meong-geul.com/

# 📌 프로젝트 소개
### 🗒️ 프로젝트 주제
반려견에 관한 정보를 공유하는 커뮤니티입니다.

### 💭 기획 배경
최근 반려견을 키우는 사람들이 급증, 현대 사회에서 반려견은 단순한 애완동물을 넘어 가족의 일원으로 자리 잡고 있습니다.<br>
이에 따라 반려견의 건강 관리, 훈련, 영양 등 다양한 정보에 대한 필요성이 높아지고 있습니다.<br>
또한, 기존의 반려견 관련 사이트의 인터페이스 등으로 인해 정보를 얻고 교류하는 데 어려움이 있습니다.<br>
이러한 문제를 해결하고자 `사용자 친화적인 새로운 커뮤니티`를 기획하게 되었습니다.<br>

# 🛠️ 기술 스택

- <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/> <img src="https://img.shields.io/badge/typeScript-3178C6?style=for-the-badge&logo=typeScript&logoColor=white" alt="TypeScript"/> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
- <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white" alt="React Query"/>
- <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>

### ✅ Next.js 선택 이유
- SSR, SSG 등 하이브리드 렌더링을 통해 **`초기 로딩 속도`** 개선
- **`SEO 최적화`** 를 통해 더 많은 사용자들에게 사이트를 노출하여 정보 전달
- Image 컴포넌트의 webp 변환, priority 등의 기능을 활용하여 **`이미지 최적화`**

# 📈 성능 최적화
- [Header 리팩토링](https://velog.io/@jiihong/Next.js-%EB%A9%8D%EA%B8%80%EB%A9%8D%EA%B8%80-Header-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)
- [메인 배너 Image 최적화](https://velog.io/@jiihong/Next.js-%EB%A9%8D%EA%B8%80%EB%A9%8D%EA%B8%80-%EB%B0%B0%EB%84%88-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)
  
# 🖥️ 화면 구성
![화면 구성](https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/d2853aa4-16ef-4384-878e-5126009a5caf)


# ✨ 서비스 소개
### ✏️ 게시판
- 자유게시판, 질문게시판, 정보게시판
- 각 게시판에는 인기 글, 페이지네이션, 글쓰기 버튼 존재
<table>
  <tr>
    <td>
      <h2>📱 Mobile</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/bf5eb178-e83b-44b5-865d-253eb613d282" alt="모바일 게시판" style="width: 300px; height: 600px" />
    </td>
    <td>
      <h2>🖥️ Desktop</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/7d56c3fb-8786-443a-9d7a-ab7da345ede2" alt="데스크탑 게시판" style="width: 500px; height: 600px" />
    </td>
  </tr>
</table>

### ✏️ 인기 글
- 추천 많은 순서대로 5개의 글 제공
<table>
  <tr>
    <td>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/773a00a5-7636-4779-af41-051d9b17c86d" alt="모바일 게시판" />
    </td>
  </tr>
</table>

### ✏️ 게시판 글쓰기
- 사진은 1장까지 자유롭게 첨부 가능 (정보게시판은 사진 필수)
<table>
  <tr>
    <td>
      <h2>📱 Mobile</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/9d0105ae-a41b-41bb-977a-8fcb02d35e79" alt="모바일 글쓰기" style="width: 400px; height: 600px" />
    </td>
    <td>
      <h2>🖥️ Desktop</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/10c4bc14-af98-471a-a2a1-7bf7c9a580d2" alt="데스크탑 글쓰기" style="width: 600px; height: 600px" />
    </td>
  </tr>
</table>

### ✏️ 글 상세 페이지 (글 삭제, 댓글 작성, 댓글 삭제, 추천)
- 닷닷닷 버튼 눌러서 글 삭제 버튼 클릭 가능
- 댓글(대댓글 가능) 작성
- 댓글 삭제는 하위 댓글이 달려있지 않을 때만 가능
- 추천은 게시물당 1번만 가능
<table>
  <tr>
    <td>
      <h2>📱 Mobile</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/21002a86-fd5d-4c9c-b575-825bd2e51c50" alt="모바일상세 페이지" style="width: 350px; height: 600px" />
    </td>
    <td>
      <h2>🖥️ Desktop</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/ef67ea5c-9a85-4431-9c6e-0d95081bafc8" alt="데스크탑 상세 페이지" style="width: 600px; height: 600px" />
    </td>
  </tr>
</table>

### ✏️ 프로필 이미지, 닉네임 수정
- 프로필 이미지 변경
- 닉네임 변경 (닉네임 변경 시 중복체크)
<table>
  <tr>
    <td>
      <h2>📱 Mobile</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/29606961-f03b-44fb-995d-cbf3fe26c348" alt="모바일프로필" style="width: 350px; height: 400px" />
    </td>
    <td>
      <h2>🖥️ Desktop</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/6310f8fa-39be-402a-94d5-1a074be766e5" alt="데스크탑 프로필" style="width: 800px; height: 400px" />
    </td>
  </tr>
</table>

### ✏️ 내가 쓴 글, 댓글 단 글, 추천한 글 보기
<table>
  <tr>
    <td>
      <h2>📱 Mobile</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/9d837b16-318b-4730-b3e3-ff38367aedf0" alt="모바일프로필" style="width: 350px; height: 400px" />
    </td>
    <td>
      <h2>🖥️ Desktop</h2>
      <img src="https://github.com/JiiHong/meong-geul-meong-geul/assets/102526510/7c5dc632-02cd-4b89-8fa1-b2b99d19208c" alt="데스크탑 프로필" style="width: 800px; height: 400px" />
    </td>
  </tr>
</table>
