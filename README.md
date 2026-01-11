# devops-home-assignment
This repository includes:
- A Node.js (Express) API with `GET /status`
- A custom GitHub Action that calls the API and updates this README
- A GitHub Actions workflow that runs end-to-end and commits the README update back to the repo

## Run locally


```bash
npm install
npm start
```
Then open:

- http://localhost:3000/status

## Run the workflow (GitHub Actions)

1. Go to Actions
2. Select Call API and Update README
3. Click Run workflow

    The workflow will:
    - Start the API in the runner
    - Call /status
    - Generate a Markdown status summary
    - Update the section below
    - Commit & push the updated README back to the repository

<!-- API_STATUS_START -->

## API Status
- Status: ok
- Service: devops-home-assignment
- Timestamp: 2026-01-11T12:01:51.862Z

<!-- API_STATUS_END -->
