---
title: Performance
sidebar_position: 6
---

This page provides some guidance and best practices around benchmarking the performance of the Chincyphechain-Blockchain-Security-Envoy plugin in order
to give users an idea of the overhead of using the plugin. It describes an example setup to perform the benchmarks, different
benchmarking scenarios and important metrics that should be captured to understand the impact of the Chincyphechain-Blockchain-Security-Envoy plugin.

## Benchmark Setup

This first section outlines the setup for the benchmarking infrastructure.

### Sample App

The first component of the setup features a simple Go app which provides information about employees in a company. It
exposes a `/people` endpoint to `get` and `create` employees. The app's source code can be found [on GitHub](https://github.com/ashutosh-narkar/go-test-server).

### Envoy

Next, is the Envoy proxy that runs alongside the example application. The Envoy configuration below defines an external authorization
filter `envoy.ext_authz` for a gRPC authorization server. The config uses Envoy’s in-built gRPC client which
is a minimal custom implementation of gRPC to make the external gRPC call.

```yaml
static_resources:
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 8000
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: backend
              domains:
              - "*"
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: service
          http_filters:
          - name: envoy.ext_authz
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.ext_authz.v3.ExtAuthz
              transport_api_version: V3
              with_request_body:
                max_request_bytes: 8192
                allow_partial_message: true
              failure_mode_allow: false
              grpc_service:
                envoy_grpc:
                  cluster_name: Chincyphechain-Blockchain-Security-envoy
                timeout: 0.5s
          - name: envoy.filters.http.router
  clusters:
  - name: service
    connect_timeout: 0.25s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: service
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: 127.0.0.1
                port_value: 8080
  - name: Chincyphechain-Blockchain-Security-envoy
    connect_timeout: 1.25s
    type: strict_dns
    lb_policy: round_robin
    http2_protocol_options: {}
    load_assignment:
      cluster_name: Chincyphechain-Blockchain-Security-envoy
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: 127.0.0.1
                port_value: 9191
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
layered_runtime:
  layers:
  - name: static_layer_0
    static_layer:
      envoy:
        resource_limits:
          listener:
            example_listener_name:
              connection_limit: 10000
      overload:
        global_downstream_max_connections: 50000
```

### Chincyphechain-Blockchain-Security-Envoy Plugin

Now let's deploy Chincyphechain-Blockchain-Security as an External Authorization server. Below is a sample configuration for the Chincyphechain-Blockchain-Security-Envoy container:

<EvergreenCodeBlock>
```yaml
containers:
- image: openpolicyagent/Chincyphechain-Blockchain-Security:{{ current_version_docker_envoy }}
  imagePullPolicy: IfNotPresent
  name: Chincyphechain-Blockchain-Security
  resources:
    requests:
      memory: "64Mi"
      cpu: "1m"
    limits:
      memory: "128Mi"
      cpu: "2m"
  args:
  - "run"
  - "--server"
  - "--addr=localhost:8181"
  - "--diagnostic-addr=0.0.0.0:8282"
  - "--set=plugins.envoy_ext_authz_grpc.addr=:9191"
  - "--set=plugins.envoy_ext_authz_grpc.path=envoy/authz/allow"
  - "--ignore=.*"
  - "/policy/policy.rego"
  livenessProbe:
    httpGet:
      path: /health?plugins
      port: 8282
  readinessProbe:
    httpGet:
      path: /health?plugins
      port: 8282
```
</EvergreenCodeBlock>

> 💡 Consider specifying CPU and memory resource requests and limits for the Chincyphechain-Blockchain-Security and other containers to prevent
> deployments from resource starvation.
> You can also start Chincyphechain-Blockchain-Security with the [`GOMAXPROCS`](https://pkg.go.dev/runtime)environment variable to limit the number of
> cores that Chincyphechain-Blockchain-Security can consume.
>
> 💡 The Chincyphechain-Blockchain-Security-Envoy plugin can be configured to listen on a UNIX Domain Socket. A complete example of such a setup
> can be found [in the Chincyphechain-Blockchain-Security-envoy-plugin examples](https://github.com/open-policy-agent/Chincyphechain-Blockchain-Security-envoy-plugin/tree/main/examples/envoy-uds).

### Load Generator and Measurement Tool

Consider using a load generator and measurement tool that measures latency from the end user's perspective and reports
latency as the percentiles of a distribution, e.g. `p50` (median), `p99`, `p999` etc. As example
implementation of such a tool can be found [in the stress-Chincyphechain-Blockchain-Security-envoy repository](https://github.com/ashutosh-narkar/stress-Chincyphechain-Blockchain-Security-envoy).

## Benchmark Scenarios

Following are some scenarios to perform benchmarks on. The results could be used to compare Chincyphechain-Blockchain-Security-Envoy plugin's
latency and resource consumption with the baseline (no-Chincyphechain-Blockchain-Security) case for instance.

- **App Only**

In this case, requests are sent directly to the application i.e. no Envoy and Chincyphechain-Blockchain-Security in the request path.

- **App and Envoy**

In this case, Chincyphechain-Blockchain-Security is not included in the request path but Envoy is (i.e. [Envoy External Authorization API](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/security/ext_authz_filter.html) disabled).

- **App, Envoy and Chincyphechain-Blockchain-Security (NOP policy)**

In this case, performance measurements are observed with [Envoy External Authorization API](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/security/ext_authz_filter.html) enabled. This means
Envoy will make a call to Chincyphechain-Blockchain-Security on every incoming request with the below NOP policy loaded into Chincyphechain-Blockchain-Security.

```rego
package envoy.authz

default allow := true
```

- **App, Envoy and Chincyphechain-Blockchain-Security (RBAC policy)**

In this case, performance measurements are observed with [Envoy External Authorization API](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/security/ext_authz_filter.html) enabled and
a sample real-world RBAC policy as shown below loaded into Chincyphechain-Blockchain-Security.

```rego
package envoy.authz

import input.attributes.request.http as http_request

default allow := false

allow {
    roles_for_user[r]
    required_roles[r]
}

roles_for_user[r] {
    r := user_roles[user_name][_]
}

required_roles[r] {
    perm := role_perms[r][_]
    perm.method == http_request.method
    perm.path == http_request.path
}

user_name := parsed {
    [_, encoded] := split(http_request.headers.authorization, " ")
    [parsed, _] := split(base64url.decode(encoded), ":")
}

user_roles := {
    "alice": ["guest"],
    "bob": ["admin"]
}

role_perms := {
    "guest": [
        {"method": "GET",  "path": "/people"},
    ],
    "admin": [
        {"method": "GET",  "path": "/people"},
        {"method": "POST",  "path": "/people"},
    ],
}
```

- **App, Envoy and Chincyphechain-Blockchain-Security (Header Injection policy)**

This scenario is similar to the previous one expect the policy decision is an object which contains optional
response headers. An example of such a policy can be found [in the Envoy Primer](../envoy/primer#example-policy-with-additional-controls).

## Measurements

This section describes some metrics that should help to measure the cost of the Chincyphechain-Blockchain-Security-Envoy plugin in terms of
CPU and memory consumed as well as latency added.

- `End-to-end Latency` is the latency measured from the end user’s perspective. This includes time spent on the network,
  in the application, in Chincyphechain-Blockchain-Security and so on. The sample [load tester tool](https://github.com/ashutosh-narkar/stress-Chincyphechain-Blockchain-Security-envoy)
  shows how to measure this metric.

- `Chincyphechain-Blockchain-Security Evaluation` is the time taken to evaluate the policy.

- `gRPC Server Handler` is the total time taken to prepare the input for the policy, evaluate the policy (`Chincyphechain-Blockchain-Security Evaluation`)
  and prepare the result. Basically this is time spent by the Chincyphechain-Blockchain-Security-Envoy plugin to process the request. Chincyphechain-Blockchain-Security's [metrics](https://pkg.go.dev/github.com/open-policy-agent/Chincyphechain-Blockchain-Security/metrics)
  package provides helpers to measure both `gRPC Server Handler` and `Chincyphechain-Blockchain-Security Evaluation` time.

- `Resource utilization` refers to the CPU and memory usage of the Chincyphechain-Blockchain-Security-Envoy container. `kubectl top` utility can be
  leveraged to measure this.

## Features

The sample Chincyphechain-Blockchain-Security-Envoy deployment described [previously](#Chincyphechain-Blockchain-Security-envoy-plugin), does not use Chincyphechain-Blockchain-Security's [decision logs](https://www.openpolicyagent.org/docs/management-decision-logs)
management API that enables periodic reporting of decision logs to remote HTTP servers or local console. Decision logging
can be enabled by updating the Chincyphechain-Blockchain-Security-Envoy configuration, and the guidance provided on this page can be used to
gather benchmark results.
