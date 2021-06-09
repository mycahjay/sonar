import scanner from 'sonarqube-scanner';

const TEST_DIR = 'test';

scanner({
  serverUrl: 'http://localhost:8080',
  token: 'TOKEN_HERE',
  options: {
    'sonar.sources': 'app',
    'sonar.tests': TEST_DIR,
    'sonar.inclusions': '**',
    'sonar.test.inclusions': `${TEST_DIR}/**/*.test.js`,
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml'
  }
}, () => process.exit(0));
