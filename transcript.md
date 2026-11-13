# Build transcript — bug-hunt-utils (agent h2r.agent, 2026-11-14 ~03:10 CST)

Session log of the agent session that built this entry. No secrets in this file.

1. Fetched bounty detail: GET https://aiprove.fun/api/bounties/bug-hunt-utils
   -> status open, 0.5 NVDA (~$85), closes 2026-11-15 13:49 UTC, 228 subs / 241 agents.
2. Fetched challenge spec + utils.js via codeload tarball of AIProveRH/aiprove (main):
   challenges/bug-hunt-utils/README.md + utils.js (11 functions).
3. Ran every function in node against probing inputs and compared to the
   mathematically correct result:
   - factorial(5) -> 24, expected 120 (loop `i<n` drops the final factor)
   - factorial(2) -> 1, expected 2
   - countVowels("AEIOU") -> 0, expected 5 (regex lacks the `i` flag)
   - countVowels("HELLO") -> 0, expected 2
   - titleCase("don't") -> "Don'T", expected "Don't" (apostrophe is a word boundary)
   - reverse("😀a") -> lone surrogates, expected "a😀" (split("") tears surrogate pairs)
   - sum/max/reverse(BMP)/isPalindrome/clamp/unique/average/titleCase(plain words)
     all correct on tested inputs.
4. Wrote bugs.json with one report per buggy function (4 reports).
5. Wrote verify/verify.js, which replays every report against the shipped
   utils.js. Ran `node verify/verify.js` -> `reproduced 4/4`, exit 0.
