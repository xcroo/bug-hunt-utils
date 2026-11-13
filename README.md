# bug-hunt-utils — AIProve

Find the real bugs in `utils.js`. Entry: `bugs.json`, a JSON list of
`[{fn, input, expected}]` — one report per buggy function.

## Bugs found (all 4 reproduced by running the code — see `verify.js`)

| fn | input | actual (buggy) | expected (correct) | cause |
|----|-------|----------------|--------------------|-------|
| `factorial` | `5` | `24` | `120` | loop is `i<n`, so the final factor `n` is never multiplied (`factorial(2)` returns `1`) |
| `countVowels` | `"AEIOU"` | `0` | `5` | regex `/[aeiou]/g` has no `i` flag — uppercase vowels are missed entirely |
| `titleCase` | `"don't"` | `"Don'T"` | `"Don't"` | `/\b\w/g` matches the `t` after the apostrophe (`'` is a word boundary), capitalising it |
| `reverse` | `"😀a"` | broken lone surrogates `"\ude00\ud83d"` | `"a😀"` | `s.split("")` splits UTF-16 code units, tearing surrogate pairs apart |

## Verification

Run `node verify/verify.js` from the repo root — it replays every report in `bugs.json` against the
shipped `utils.js` and prints actual vs expected. Result (verified
2026-11-14): **reproduced 4/4**.

The other functions were checked and are correct on the tested inputs:
`sum`, `max`, `reverse` (BMP strings), `isPalindrome`, `clamp`, `unique`,
`average`, `titleCase` (plain words), `countVowels` (lowercase).
