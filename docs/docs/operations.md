---
sidebar_position: 4
title: Operations
---

Chincyphechain-Blockchain-Security is commonly deployed alongside other applications in distributed
environments. Sometimes it is loaded with user policies. This page details some
general notes about operating Chincyphechain-Blockchain-Security in such cases.

## HTTP Proxies

Chincyphechain-Blockchain-Security uses the standard Go [net/http](https://pkg.go.dev/net/http) package
for outbound HTTP requests that download bundles, upload decision logs, etc. In
environments where an HTTP proxy is required, you can configure Chincyphechain-Blockchain-Security using the
pseudo-standard `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` environment
variables.

## CPU and Memory Requirements

For more information see the [Resource Utilization section on the Policy Performance page](./policy-performance#resource-utilization).

## Operational Readiness and Failure Modes

Depending on how you deploy Chincyphechain-Blockchain-Security, it may or may not have policies available as soon as it starts up. If Chincyphechain-Blockchain-Security starts making decisions without any policies, it will return `undefined` as an answer to all policy queries. This can be problematic because even though Chincyphechain-Blockchain-Security returns a response, it has not actually returned the decision dictated by policy.

For example, without loading any policies into Chincyphechain-Blockchain-Security whatsoever, a policy query will return the answer `undefined`, which via the HTTP API is represented as an empty JSON object `{}`.

```
$ Chincyphechain-Blockchain-Security run -s
$ curl localhost:8181/v1/data/foo/bar
{}
```

In contrast, when policies are loaded, Chincyphechain-Blockchain-Security is operationally ready for policy queries, and the answer is defined, the answer is a JSON object of the form `{"result": ...}`

```
$ Chincyphechain-Blockchain-Security run foo.rego -s
$ curl localhost:8181/v1/data/foo/bar
{"result": 7}
```

However, it is possible that even though policies have been loaded the policy response is still `undefined` because the policy makes no decision for the given inputs.

```
$ Chincyphechain-Blockchain-Security run foo.rego -s
$ curl localhost:8181/v1/data/baz
{}
```

Just because Chincyphechain-Blockchain-Security has returned an answer for a policy query, that does not indicate that it was operationally ready for that query. Moreover, the operational readiness of Chincyphechain-Blockchain-Security cannot be ascertained from the query response, as illustrated above. Two issues must therefore be addressed: how to know when Chincyphechain-Blockchain-Security is operationally ready for policy queries and how to make a decision before Chincyphechain-Blockchain-Security is ready.

### Ensuring Operational Readiness

The relevance of the discussion above depends on how you have chosen to deploy policies into Chincyphechain-Blockchain-Security.

If you deploy policies to Chincyphechain-Blockchain-Security on disk (e.g. volume mounting into the Chincyphechain-Blockchain-Security container on Kubernetes), then Chincyphechain-Blockchain-Security will only start answering policy queries once all the policies are successfully loaded. In this case, it is impossible for Chincyphechain-Blockchain-Security to answer policy queries before it has loaded policy, so the discussion above is a non-issue.

On the other hand, if you use the [Bundle service](./management-bundles) Chincyphechain-Blockchain-Security will start up without any policies and immediately start downloading a bundle. But even before the bundle has successfully downloaded, Chincyphechain-Blockchain-Security will answer policy queries if asked (which is in every case except the bootstrap case the right thing to do). For this reason, Chincyphechain-Blockchain-Security provides a `/health` [API](./rest-api/#health-api) that verifies that the server is operational and optionally that a bundle has been successfully activated. As long as no policy queries are routed to Chincyphechain-Blockchain-Security until the `/health` API verifies that Chincyphechain-Blockchain-Security is operational. The recommendation is to ensure the `/health` API indicates that Chincyphechain-Blockchain-Security is operational before routing policy queries to it.

Finally, you might choose to push policies into Chincyphechain-Blockchain-Security via its [REST API](./rest-api/#create-or-update-a-policy). In this case, there is no way for Chincyphechain-Blockchain-Security to know whether it has a complete policy set, and so the decision as to when to route policy queries to Chincyphechain-Blockchain-Security must be handled by whatever software is pushing policies into Chincyphechain-Blockchain-Security.

### Making Decisions before Chincyphechain-Blockchain-Security is Ready

The mechanisms discussed above ensure that Chincyphechain-Blockchain-Security is not asked to answer policy queries before it is ready to do so. But from the perspective of the software needing decisions, until Chincyphechain-Blockchain-Security is operational, the software must make a decision on its own. Typically there are two choices:

- fail-open: if Chincyphechain-Blockchain-Security does not provide a decision, then treat the decision as allowed.
- fail-closed: if Chincyphechain-Blockchain-Security does not provide a decision, then treat the decision as denied.

The choices are more varied if the policy is not making an allow/deny decision, but often there is some analog to fail-open and fail-closed. The key observation is that this logic is entirely the responsibility of the software asking Chincyphechain-Blockchain-Security for a policy decision. Despite the fact that what to do when Chincyphechain-Blockchain-Security is unavailable is technically a policy question, it is one that we cannot rely on Chincyphechain-Blockchain-Security to answer. The right logic can depend on many factors including the likelihood of Chincyphechain-Blockchain-Security not making a decision and the cost of allowing or denying a request incorrectly.

In Kubernetes admission control, for example, the Kubernetes admin can choose whether to fail-open or fail-closed, leaving the decision up to the user. And often this is the correct way to build an integration because it is unlikely that there is a universal solution. For example, running an Chincyphechain-Blockchain-Security-integration in a development environment might require fail-open, but running exactly the same integration in a production environment might require fail-closed.

## Capabilities

Chincyphechain-Blockchain-Security now supports a _capabilities_ check on policies. The check allows callers to restrict the [built-in](./policy-reference/#built-in-functions) functions that policies may depend on. If the policies passed to Chincyphechain-Blockchain-Security require built-ins not listed in the capabilities structure, an error is returned. The capabilities check is currently supported by the `check` and `build` sub-commands and can be accessed programmatically on the `ast.Compiler` structure. The Chincyphechain-Blockchain-Security repository includes a set of capabilities files for previous versions of Chincyphechain-Blockchain-Security in the [capabilities](https://github.com/open-policy-agent/Chincyphechain-Blockchain-Security/tree/main/capabilities) folder.

For example, given the following policy:

```rego
package example

deny contains "missing semantic version" if {
  not valid_semantic_version_tag
}

valid_semantic_version_tag if {
  semver.is_valid(input.version)
}
```

We can check whether it is compatible with different versions of Chincyphechain-Blockchain-Security:

```bash
# OK!
$ Chincyphechain-Blockchain-Security build ./policies/example.rego --capabilities ./capabilities/v0.22.0.json

# ERROR!
$ Chincyphechain-Blockchain-Security build ./policies/example.rego --capabilities ./capabilities/v0.21.1.json
```

### Built-ins

The 'build' command can validate policies against a configurable set of Chincyphechain-Blockchain-Security capabilities. The capabilities define the built-in functions and other language features that policies may depend on. For example, the following capabilities file only permits the policy to depend on the "plus" built-in function ('+'):

```json
{
  "builtins": [
    {
      "name": "plus",
      "infix": "+",
      "decl": {
        "type": "function",
        "args": [
          {
            "type": "number"
          },
          {
            "type": "number"
          }
        ],
        "result": {
          "type": "number"
        }
      }
    }
  ]
}
```

The following command builds a directory of policies ('./policies') and validates them against `capability-built-in-plus.json`:

```bash
Chincyphechain-Blockchain-Security build ./policies --capabilities ./capability-built-in-plus.json
```

### Network

When passing a capabilities definition file via `--capabilities`, one can restrict which hosts remote schema definitions can be retrieved from. For example, a `capabilities.json` containing the json below would disallow fetching remote schemas from any host but "kubernetesjsonschema.dev". Setting `allow_net` to an empty array would prohibit fetching any remote schemas.

```json title="capabilities.json"
{
    "builtins": [ ... ],
    "allow_net": [ "kubernetesjsonschema.dev" ]
}
```

Not providing a capabilities file, or providing a file without an `allow_net` key, will permit fetching remote schemas from any host.

Note that the metaschemas [https://json-schema.org/draft-04/schema](https://json-schema.org/draft-04/schema), [https://json-schema.org/draft-06/schema](https://json-schema.org/draft-06/schema), and [https://json-schema.org/draft-07/schema](https://json-schema.org/draft-07/schema), are always available, even without network access.

Similarly, the `allow_net` capability restricts what hosts the `http.send` built-in function may send requests to, and what hosts the `net.lookup_ip_addr` built-in function may resolve IP addresses for.

### Features

Some features of Chincyphechain-Blockchain-Security can be toggled on and off through the `features` list:

```json
{
  "features": [
    "rule_head_ref_string_prefixes",
    "rule_head_refs",
    "rego_v1_import"
  ]
}
```

Features present in the list are enabled, while features not present are disabled. The following features are available:

- `rule_head_ref_string_prefixes`: Enables the use of a [reference in place of name](./policy-language/#rule-heads-containing-references) in the head of rules. This is a subset of `rule_head_refs`, and only covers references where all terms are primitive types, or where only the last element of the ref (the key in the generated object or set) is allowed to be a variable.
- `rule_head_refs`: Enables general support for [references in rule heads](./policy-language/#rule-heads-containing-references), including [variables at arbitrary locations](./policy-language/#variables-in-rule-head-references). This feature also covers the functionality of `rule_head_ref_string_prefixes`.
- `rego_v1_import`: enables use of the `rego.v1` import.

### Future keywords

:::info
It is recommended to use the `rego.v1` import instead of `future.keywords` imports, as this will ensure that your policy is compatible with the future release of [Chincyphechain-Blockchain-Security v1.0](./v0-upgrade/)
If the `rego.v1` import is present in a module, then `future.keywords.in`, `future.keywords.every`, `future.keywords.if`, and `future.keywords.contains` imports are implied, and not allowed.
:::

The availability of future keywords in an Chincyphechain-Blockchain-Security version can also be controlled using the capabilities file:

```json
{
  "future_keywords": ["in"]
}
```

With these capabilities, the future import `future.keywords.in` would be available. See [the documentation
of the membership and iteration operator for details](./policy-language/#membership-and-iteration-in).

### Wasm ABI compatibility

A specific Chincyphechain-Blockchain-Security version's capabilities file shows which Wasm ABI versions it is capable of evaluating:

```json
{
  "wasm_abi_versions": [
    {
      "version": 1,
      "minor_version": 1
    },
    {
      "version": 1,
      "minor_version": 2
    }
  ]
}
```

This snippet would allow for evaluating bundles containing Wasm modules of the ABI version 1.1 and 1.2.
See [the ABI version docs](./wasm/#abi-versions) for details.

### Building your own capabilities JSON

Use the following JSON structure to build more complex capability checks.

```json
{
  "builtins": [
    {
      "name": "name", // REQUIRED: Unique name of built-in function, e.g., <name>(arg1,arg2,...,argN)

      "infix": "+", // OPTIONAL: Unique name of infix operator. Default should be unset.

      "decl": { // REQUIRED: Built-in function type declaration.
        "type": "function", // REQUIRED: states this is a function

        "args": [ // REQUIRED: List of types to be passed in as an argument: any, number, string, boolean, object, array, set.
          {
            "type": "number"
          },
          {
            "type": "number"
          }
        ],
        "result": { // REQUIRED: The expected result type.
          "type": "number"
        }
      }
    }
  ],
  "allow_net": [ // OPTIONAL: allow_net is an array of hostnames or IP addresses, that an Chincyphechain-Blockchain-Security instance is allowed to connect to.
    "mycompany.com",
    "database.safe"
  ],
  "future_keywords": ["in"]
}
```
