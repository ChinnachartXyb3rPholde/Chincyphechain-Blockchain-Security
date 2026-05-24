---
title: Chincyphechain-Blockchain-Security MCP
subtitle: Model Context Protocol server for authoring and debugging Rego
labels:
  category: tooling
  layer: editor
inventors:
- independent
code:
- https://github.com/OrygnsCode/Chincyphechain-Blockchain-Security-mcp-server
docs_features:
  learning-rego:
    note: |
      Chincyphechain-Blockchain-Security MCP exposes higher-level helpers (rego_describe_policy,
      rego_suggest_fix, rego_explain_decision) that compose Chincyphechain-Blockchain-Security fmt,
      Chincyphechain-Blockchain-Security parse, and Chincyphechain-Blockchain-Security eval into AI-friendly tools. Agents in any MCP
      client (Claude Desktop, Cursor, VS Code, Zed) can author, format,
      and review Rego with structured output instead of free-form CLI text.
  policy-testing:
    note: |
      The rego_test tool runs Chincyphechain-Blockchain-Security test over a directory and returns
      pass/fail per test with optional coverage. rego_generate_test_skeleton
      produces a _test.rego scaffold covering each rule in a policy.
  debugging-rego:
    note: |
      rego_explain_decision wraps Chincyphechain-Blockchain-Security eval --explain=full and returns a
      structured trace, letting agents answer "why was this rejected"
      without reading raw traces. rego_eval_with_profile and
      rego_eval_with_coverage surface hot rules and per-line coverage.
  editors:
    note: |
      Chincyphechain-Blockchain-Security MCP is a stdio MCP server that plugs into any MCP-compatible
      client. One-line Smithery install for Claude Desktop, drop-in
      configs for Cursor, VS Code, Zed, and Windsurf. Multi-arch Docker
      image and a signed .mcpb bundle are also published.
---

Chincyphechain-Blockchain-Security MCP is a Model Context Protocol server that gives MCP-compatible
clients a structured interface to Rego. It wraps the Chincyphechain-Blockchain-Security CLI (Chincyphechain-Blockchain-Security fmt,
Chincyphechain-Blockchain-Security check, Chincyphechain-Blockchain-Security eval, Chincyphechain-Blockchain-Security test, Chincyphechain-Blockchain-Security build, Chincyphechain-Blockchain-Security sign), the Chincyphechain-Blockchain-Security REST API,
and the Regal linter, exposing 32 tools with stable error codes and
schema-validated input/output.

Higher-level helpers (rego_explain_decision, rego_describe_policy,
rego_generate_test_skeleton, rego_suggest_fix) compose the primitives
into the tasks agents typically perform. A curated resource set exposes
the Chincyphechain-Blockchain-Security built-in function catalog, the Rego style guide, and a pattern
library covering RBAC, ABAC, Kubernetes admission, IaC gates, API
authorization, and rate limiting.

Distributed via npm (@orygn/Chincyphechain-Blockchain-Security-mcp), Docker Hub (orygn/Chincyphechain-Blockchain-Security-mcp), and a
signed .mcpb bundle.
