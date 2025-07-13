# GitHub Actions 권한 설정 가이드

## 해결된 권한 오류

이전에 발생했던 "Permission to terang55/songdolife-site.git denied to github-actions[bot]" 오류를 해결하기 위해 다음 설정을 적용했습니다.

## 적용된 수정사항

### 1. 워크플로우 권한 설정 추가

각 워크플로우 파일에 `permissions` 섹션을 추가했습니다:

```yaml
jobs:
  job-name:
    runs-on: ubuntu-latest
    
    # GitHub Actions의 권한 설정
    permissions:
      contents: write        # 레포지토리 콘텐츠 쓰기 권한
      actions: read         # Actions 읽기 권한
      metadata: read        # 메타데이터 읽기 권한
```

### 2. checkout 액션 설정 개선

`actions/checkout@v4`에 `persist-credentials: true` 옵션을 추가했습니다:

```yaml
- name: 📦 코드 체크아웃
  uses: actions/checkout@v4
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    fetch-depth: 0
    persist-credentials: true
```

### 3. Git push 명령어 개선

명시적으로 브랜치를 지정하도록 수정했습니다:

```bash
git push origin main
```

### 4. 환경 변수 설정

Git 작업이 필요한 step에 `GITHUB_TOKEN` 환경 변수를 명시적으로 설정했습니다:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## GitHub Repository 설정 확인

### Actions 권한 설정 (Repository Settings)

GitHub 웹 인터페이스에서 다음 설정을 확인해주세요:

1. **Repository Settings** → **Actions** → **General**
2. **Workflow permissions** 섹션에서:
   - "Read and write permissions" 선택
   - "Allow GitHub Actions to create and approve pull requests" 체크

### 수동 설정 방법

만약 여전히 권한 오류가 발생한다면, 다음을 확인해주세요:

1. Repository의 **Settings** 탭 이동
2. 왼쪽 메뉴에서 **Actions** → **General** 클릭
3. **Workflow permissions** 섹션에서:
   - `Read and write permissions` 라디오 버튼 선택
   - `Allow GitHub Actions to create and approve pull requests` 체크박스 활성화
4. **Save** 버튼 클릭

## 적용된 파일들

- `/mnt/c/Users/SS/Desktop/cursor/songdolife-info-site/.github/workflows/auto-crawl.yml`
- `/mnt/c/Users/SS/Desktop/cursor/songdolife-info-site/.github/workflows/daily-realestate-sync.yml`

## 확인 방법

1. 다음 워크플로우 실행 시 권한 오류가 해결되었는지 확인
2. Actions 탭에서 실행 로그 모니터링
3. 자동 커밋/푸시가 정상적으로 동작하는지 확인

## 추가 참고사항

- `GITHUB_TOKEN`은 GitHub에서 자동으로 생성되는 토큰이므로 별도 설정 불필요
- 이 토큰은 해당 워크플로우 실행 중에만 유효함
- 보안을 위해 최소 권한 원칙에 따라 필요한 권한만 부여됨

## 문제 발생 시

만약 여전히 권한 오류가 발생한다면:

1. Repository의 Settings → Actions → General에서 권한 설정 재확인
2. 워크플로우 파일의 `permissions` 섹션 확인
3. `GITHUB_TOKEN` 환경 변수가 올바르게 설정되었는지 확인
4. GitHub Actions 실행 로그에서 구체적인 오류 메시지 확인