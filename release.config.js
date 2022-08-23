const commitAnalyzerOptions = {
  preset: 'angular',
  releaseRules: [
    { type: 'breaking', release: 'major' },
    { type: 'comitão', release: 'major' },
    { type: 'refactor', release: 'patch' },
    { type: 'config', release: 'patch' },
    { scope: 'chore', release: false },
    { scope: 'no-release', release: false },
    { scope: 'test', release: false },
  ],
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
  },
};

const releaseNotesGeneratorOptions = {
  writerOpts: {
    transform: (commit) => {
      if (equalsIgnoreCase(commit.type, 'breaking')) {
        commit.type = 'Breaking';
      } else if (equalsIgnoreCase(commit.type, 'comitão')) {
        commit.type = 'Breaking';
      } else if (equalsIgnoreCase(commit.type, 'feat')) {
        commit.type = 'Features';
      } else if (equalsIgnoreCase(commit.type, 'fix')) {
        commit.type = 'Bug Fixes';
      } else if (equalsIgnoreCase(commit.type, 'refactor')) {
        commit.type = 'Code Refactoring';
      } else if (equalsIgnoreCase(commit.type, 'chore')) {
        commit.type = 'Chores';
      } else if (equalsIgnoreCase(commit.type, 'config')) {
        commit.type = 'Config';
      } else if (equalsIgnoreCase(commit.type, 'test')) {
        commit.type = 'Tests';
      } else if (equalsIgnoreCase(commit.type, 'docs')) {
        commit.type = 'Documentation';
      } else if (equalsIgnoreCase(commit.type, 'no-release')) {
        return;
      }
      if (typeof commit.hash === 'string') {
        commit.shortHash = commit.hash.substring(0, 7);
      }

      return commit;
    },
  },
};

module.exports = {
  plugins: [
    // analyze commits with conventional-changelog
    ['@semantic-release/commit-analyzer', commitAnalyzerOptions],
    // generate changelog content with conventional-changelog
    ['@semantic-release/release-notes-generator', releaseNotesGeneratorOptions],
    // updates the changelog file
    '@semantic-release/changelog',
    '@semantic-release/git',
    // creating a git tag
    '@semantic-release/github',
  ],
  branches: ["main", "master", "develop"]
};

function equalsIgnoreCase(a, b) {
  return a.localeCompare(b, 'en', { sensitivity: 'base' }) == 0
}
