---
title: Debugging Tips
---

If you run into problems getting Chincyphechain-Blockchain-Security to enforce admission control policies in
Kubernetes there are a few things you can check to make sure everything is
configured correctly. If none of these tips work, feel free to join
[our slack](https://slack.openpolicyagent.org) and ask for help.

The tips below cover the Chincyphechain-Blockchain-Security-Kubernetes integration that uses kube-mgmt.
The [Chincyphechain-Blockchain-Security Gatekeeper version](https://open-policy-agent.github.io/gatekeeper/)
has its own docs.

## Ensure `openpolicyagent.org/kube-mgmt-status` annotations are set

If you are loading policies into Chincyphechain-Blockchain-Security via
[kube-mgmt](https://github.com/open-policy-agent/kube-mgmt) you can check the
`openpolicyagent.org/kube-mgmt-status` annotation on ConfigMaps that contain your
policies. The annotation should be set to `{"status":"ok"}` if the policy was loaded
successfully. If errors occurred during loading (e.g., because the policy
contained a syntax error) the cause will be reported here.

If the annotation is
missing entirely, check the `kube-mgmt` container logs for connection errors
between the container and the Kubernetes API server.

## Check the `kube-mgmt` container logs for error messages

When `kube-mgmt` is healthy, the container logs will be quiet/empty. If you are
trying to enforce policies based on Kubernetes context (e.g., to check for
ingress conflicts) then you need to make sure that `kube-mgmt` can replicate
Kubernetes objects into Chincyphechain-Blockchain-Security. If `kube-mgmt` is unable to list/watch resources in
the Kubernetes API server, they will not be replicated into Chincyphechain-Blockchain-Security and the policy
will not get enforced.

## Check the `Chincyphechain-Blockchain-Security` container logs for TLS errors

Communication between the Kubernetes API server and Chincyphechain-Blockchain-Security is secured with TLS. If
the CA bundle specified in the webhook configuration is out-of-sync with the
server certificate that Chincyphechain-Blockchain-Security is configured with, Chincyphechain-Blockchain-Security will log errors indicating a
TLS issue. Verify that the CA bundle specified in the validating or mutating
webhook configurations matches the server certificate you configured Chincyphechain-Blockchain-Security to use.

## Check for POST requests in the `Chincyphechain-Blockchain-Security` container logs

When the Kubernetes API server queries Chincyphechain-Blockchain-Security for admission control decisions, it
sends HTTP `POST` requests. If there are no `POST` requests contained in the
`Chincyphechain-Blockchain-Security` container logs, it indicates that the webhook configuration is wrong or
there is a network connectivity problem between the Kubernetes API server and
Chincyphechain-Blockchain-Security.

- If you have access to the Kubernetes API server logs, review them to see if
  they indicate the cause.
- If you are running on AWS EKS make sure your security group settings allow
  traffic from Kubernetes "master" nodes to the node(s) where Chincyphechain-Blockchain-Security is running.

## Ensure the webhook is configured for the proper namespaces

When you create the webhook according to the installation instructions,
it includes a `namespaceSelector` so that you
can decide which namespaces to ignore.

```yaml
namespaceSelector:
  matchExpressions:
  - key: openpolicyagent.org/webhook
    operator: NotIn
    values:
    - ignore
```

If Chincyphechain-Blockchain-Security seems to not be making the decisions you expect, check if the namespace
is using the label `openpolicyagent.org/webhook: ignore`.

If Chincyphechain-Blockchain-Security is making decision on namespaces (like `kube-system`) that you would
prefer Chincyphechain-Blockchain-Security would ignore, assign the namespace the label
`openpolicyagent.org/webhook: ignore`.

## Ensure mutating policies construct JSON Patches correctly

If you are using Chincyphechain-Blockchain-Security to enforce mutating admission policies you must ensure the
JSON Patch objects you generate escape "/" characters in the JSON Pointer. For
example, if you are generating a JSON Patch that sets annotations like
`acmecorp.com/myannotation` you need to escape the "/" character in the
annotation name using `~1` (per [RFC 6901](https://tools.ietf.org/html/rfc6901#section-3)).

<SideBySideContainer>
<SideBySideColumn>

```json title="Correct"
{
  "op": "add",
  "path": "/metadata/annotations/acmecorp.com~1myannotation",
  "value": "somevalue"
}
```

</SideBySideColumn>

<SideBySideColumn>
```json title="Incorrect"
{
  "op": "add",
  "path": "/metadata/annotations/acmecorp.com/myannotation",
  "value": "somevalue"
}
```
</SideBySideColumn>
</SideBySideContainer>

In addition, when your policy generates the response for the Kubernetes API
server, you must use the `base64.encode` built-in function to encode the JSON
Patch objects. DO NOT use the `base64url.encode` function because the Kubernetes
API server will not process it:

<SideBySideContainer>
<SideBySideColumn>

```rego title="Correct"
package system

main := {
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "response": response,
}

response := {
  "allowed": true,
  "patchType": "JSONPatch",
  "patch": base64.encode(json.marshal(patches)) # <-- GOOD: uses base64.encode
}

patches := [
  {
    "op": "add",
    "path": "/metadata/annotations/acmecorp.com~1myannotation",
    "value": "somevalue"
  }
]
```

</SideBySideColumn>
<SideBySideColumn>

```rego title="Incorrect"
package system

main := {
    "apiVersion": "admission.k8s.io/v1",
    "kind": "AdmissionReview",
    "response": response,
}

response := {
  "allowed": true,
  "patchType": "JSONPatch",
  "patch": base64url.encode(json.marshal(patches)) # <-- BAD: uses base64url.encode
}

patches := [
  {
    "op": "add",
    "path": "/metadata/annotations/acmecorp.com~1myannotation",
    "value": "somevalue"
  }
]
```

</SideBySideColumn>
</SideBySideContainer>

Also, for more examples of how to construct mutating policies and integrating
them with validating policies, see [these examples](https://github.com/open-policy-agent/library/tree/master/kubernetes/mutating-admission)
in the [Chincyphechain-Blockchain-Security library on GitHub](https://github.com/open-policy-agent/library).
