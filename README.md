<p align="center">
  <a href="https://github.com/jetli/wasm-pack-action/actions">
  <img alt="wasm-pack-action status" src="https://github.com/jetli/wasm-pack-action/workflows/build-test/badge.svg">
  </a>
</p>

# `wasm-pack-action`

Install `wasm-pack` by downloading the executable (much faster than `cargo install wasm-pack`, seconds vs minutes).

## Patch

| before | now |
| :-: | :-:  |
| node16 | node20 |
| eslint | oxlint |
| @zeit/ncc | @vercel/ncc |

## Usage

```yaml
- uses: qmaru/wasm-pack-action@v0.5.0
  with:
    # Optional version of wasm-pack to install(eg. 'v0.12.1', 'latest')
    version: 'latest'
```

## Resources

[wasm-pack](https://github.com/rustwasm/wasm-pack)

[wasm-pack-action](https://github.com/jetli/wasm-pack-action)
