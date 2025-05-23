# ks-starrants-tech-challenge
Tech challenge for Keeper Security

## API Under Test

- [reqres](https://reqres.in)

## Test Strategy
The intent behind these tests were to evaluate the postive and negative paths of the api through user querying, editing and creating. Areas which were unable to be covered were performance and response time tracking.

## Framework and Tools

- [Playwright](https://playwright.dev/docs/api-testing)
- Typescript


## Reporting

HTML reports are found post execution under the [playwright-report](./playwright-report/) directory


## CICD

- [Repo Actions](https://github.com/Roguem99/ks-starrants-tech-challenge/actions)

## Getting Started
- Clone repo 
- Run `npm i` within root directory
- Create a new file called .env and on the first line type "API_TOKEN="
  - Navigate to reqres.in to get your api token and add it after the "="
    - EX: "API_TOKEN=aTokenToRuleThemAll"
- Run `npm run test` within the cmdline, at the root of the directory to execute tests
- Observe the test report outputs within the [playwright-report](./playwright-report/) directory
  - A sample report is available here [sample-report](./sample-report.html) directory
