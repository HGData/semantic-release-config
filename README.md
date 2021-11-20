# semantic-release-config
A common [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) configuration for use across engineering.

## Usage
An example within GitHub Actions:
```yaml
steps:
- name: Checkout
  uses: actions/checkout@v2

- name: Semantic release
  uses: hgdata/semantic-release-action@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    extends: |
      @hgdata/semantic-release-config
```
