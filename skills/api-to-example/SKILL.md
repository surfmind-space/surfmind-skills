---
name: api-to-example
description: Turns REST API documentation into a runnable curl, fetch, or code example with required headers, request body, and placeholders for secrets. Use when the user wants to generate a request from API docs, an endpoint, or a Swagger/OpenAPI spec — "give me a curl for this", "show a fetch example", "how do I call this API".
metadata:
  author: surfmind
  icon: Code
  tags:
    - code
    - learning
---

# API to Example

Turn the documented API endpoint into the smallest runnable example the user can paste and run — curl, fetch, or a language-specific snippet — complete with the required headers, request body shape, and placeholders for every secret. Work only from what the docs show; don't invent undocumented fields or claim a parameter is required when the docs don't say so.

1. Extract the endpoint, method, auth scheme, required headers, parameters, request body schema, and the success response shape from the visible docs or OpenAPI/Swagger spec.
2. Build the minimal example that would actually succeed, using placeholders like `$API_KEY` or `<account-id>` for secrets and private values.
3. Verify the example carries every required header and parameter the docs list before presenting it; note any required field the docs leave unspecified.
4. Add the expected response and the one or two errors a caller is most likely to hit (bad auth, missing field).

Return concise headings and include these sections when they fit: **Runnable example**, **Required inputs**, **Expected response**, **Common mistakes**. Preserve exact endpoint paths, header names, and field names. Be specific but don't overclaim; never include real secrets, and if the docs are incomplete, say what's missing and give the best supported example. Respond in the same language as the user's request.

## Example

Docs (an endpoint that creates a charge):

> `POST /v1/charges` — requires `Authorization: Bearer <key>`. Body: `amount` (integer, required), `currency` (string, required), `description` (string, optional).

Example:

> **Runnable example** (curl):
>
> ```bash
> curl https://api.example.com/v1/charges \
>   -H "Authorization: Bearer $API_KEY" \
>   -H "Content-Type: application/json" \
>   -d '{"amount": 2000, "currency": "usd", "description": "Test charge"}'
> ```
>
> **Required inputs:** `$API_KEY` (secret bearer token); `amount` in the smallest currency unit; a supported `currency` code.
>
> **Expected response:** `200` with the created charge object, including its `id` and `status`.
>
> **Common mistakes:** Omitting `Content-Type: application/json` (the body is ignored); sending `amount` as a decimal instead of an integer; a stale key returns `401`.
