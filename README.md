# `wasm-pack-action`

[![wasm-pack-action status](https://github.com/qmaru/wasm-pack-action/workflows/build-test/badge.svg)](https://github.com/qmaru/wasm-pack-action/actions)

Install `wasm-pack` by downloading the executable (much faster than `cargo install wasm-pack`, seconds vs minutes).

## Patch

| before | now |
| :-: | :-: |
| node16 | node24 |
| eslint | oxlint |
| @zeit/ncc | @vercel/ncc |

## Usage

```yaml
- uses: qmaru/wasm-pack-action@v0.6.0
  with:
    # Optional version of wasm-pack to install(eg. 'v0.15.0', 'latest')
    version: 'latest'
```

## Resources

[wasm-pack](https://github.com/rustwasm/wasm-pack)

[wasm-pack-action](https://github.com/jetli/wasm-pack-action)
