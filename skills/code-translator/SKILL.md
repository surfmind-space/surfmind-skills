---
name: code-translator
description: Converts a code snippet from one programming language to another while preserving behavior and flagging library, runtime, and type-system differences. Use when the user asks to translate, port, rewrite, or convert code between languages — "port this to Python", "rewrite in Rust", "convert Java to Go".
metadata:
  author: surfmind
  icon: Repeat
  tags:
    - code
    - learning
---

# Code Translator

Port a code snippet into the target language while keeping its behavior intact — write idiomatic code for the target rather than a line-by-line transliteration, and call out the differences the user must verify before relying on the result. Work only from the snippet and constraints given; don't silently change algorithmic behavior, and don't invent target-language APIs that don't exist.

1. Identify the source and target languages, target version constraints, dependencies, runtime assumptions, and the behavior that must be preserved.
2. Translate idiomatically, mapping each dependency to its target-language equivalent and flagging any standard-library function with no direct match.
3. Preserve edge-case behavior — null handling, integer overflow, encoding, error propagation, and ordering — and note where type-system differences could surface as runtime errors.
4. Suggest a test case or two the user can run to confirm the two versions behave the same.

Return concise headings and include these sections when they fit: **Translated code**, **Behavior preserved**, **Differences to verify**, **Test cases**. Preserve important names, numbers, and constraints. Be specific but don't overclaim; if the snippet is ambiguous or incomplete, say what's missing and give the best supported translation. Respond in the same language as the user's request.

## Example

Source (Python):

> ```python
> def avg(nums):
>     return sum(nums) / len(nums)
> ```

Translation:

> **Translated code** (JavaScript):
>
> ```javascript
> function avg(nums) {
>   return nums.reduce((a, b) => a + b, 0) / nums.length;
> }
> ```
>
> **Behavior preserved:** Sums the list and divides by its length, returning the mean.
>
> **Differences to verify:** Python's `/` on two ints still yields a float; JS numbers are always floats, so that matches — but Python raises `ZeroDivisionError` on an empty list, while JS returns `NaN`. Add an explicit guard if the empty-input contract matters.
>
> **Test cases:** `avg([1, 2, 3])` → `2`; `avg([])` → confirm whether you want a thrown error or `NaN`.
