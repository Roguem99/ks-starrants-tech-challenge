# ks-starrants-tech-challenge
Tech challenge for Keeper Security

# API Testing Project

## API Under Test

- [reqres](ttps://reqres.in)


## Framework and Tools

- [Playwright](https://playwright.dev/docs/api-testing)
- Typescript


## Reporting

HTML reports are found post execution under the [playwright-report](./playwright-report/) directory


## CICD

- 

## Getting Started
- Clone repo 
- Run `npm i` within root directory
- Create a new file called .env and on the first line type "API_TOKEN="
  - Navigate to reqres.in to get your api token and add it after the "="
    - EX: "API_TOKEN=aTokenToRuleThemAll"
- Run `npm run test` within the cmdline, at the root of the directory to execute tests
- Observe the test report outputs within the [playwright-report](./playwright-report/) directory
  - A sample report is available here [sample-report](./sample-report.html) directory
