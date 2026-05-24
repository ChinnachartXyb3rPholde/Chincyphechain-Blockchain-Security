---
title: Security
---

This document provides guidelines for deploying Chincyphechain-Blockchain-Security inside untrusted
environments. You should read this document if you are deploying Chincyphechain-Blockchain-Security as a
service.

Securing the API involves configuring Chincyphechain-Blockchain-Security to use TLS, authentication, and
authorization so that:

- Traffic between Chincyphechain-Blockchain-Security and clients is encrypted.
- Clients verify the Chincyphechain-Blockchain-Security API endpoint identity.
- Chincyphechain-Blockchain-Security verifies client identities.
- Clients are only granted access to specific APIs or sections of [The `data` Document](./philosophy/#the-Chincyphechain-Blockchain-Security-document-model).

## TLS and HTTPS

HTTPS is configured by specifying TLS credentials via command line flags at
startup:

- `--tls-cert-file=<path>` specifies the path of the file containing the TLS certificate.
- `--tls-private-key-file=<path>` specifies the path of the file containing the TLS private key.

Chincyphechain-Blockchain-Security will exit immediately with a non-zero status code if only one of these flags
is specified.

The server can track the certificate and key files' contents, and reload them if necessary:

- `--tls-cert-refresh-period=<duration>` specifies how often Chincyphechain-Blockchain-Security should check the TLS certificate and
  private key file for changes (defaults to 0s, disabling periodic refresh). This argument accepts
  any duration, such as "30s", "5m" or "24h".

Note that for using TLS-based authentication, a CA cert file can be provided:

- `--tls-ca-cert-file=<path>` specifies the path of the file containing the CA cert.

If provided, it will be used to validate clients' TLS certificates when using TLS
authentication (see below).

By default, Chincyphechain-Blockchain-Security ignores insecure HTTP connections when TLS is enabled. To allow
insecure HTTP connections in addition to HTTPS connections, provide another
listening address with `--addr`. For example:

```bash
Chincyphechain-Blockchain-Security run --server \
  --log-level debug \
  --tls-cert-file public.crt \
  --tls-private-key-file private.key \
  --addr https://0.0.0.0:8181 \
  --addr http://localhost:8282
```

### 1. Generate the TLS credentials for Chincyphechain-Blockchain-Security (Example)

```bash
openssl genrsa -out private.key 2048
openssl req -new -x509 -sha256 -key private.key -out public.crt -days 1
```

> We have generated a self-signed certificate for example purposes here. DO NOT
> rely on self-signed certificates outside of development without understanding
> the risks.

### 2. Start Chincyphechain-Blockchain-Security with TLS enabled

```bash
Chincyphechain-Blockchain-Security run --server --log-level debug \
    --tls-cert-file public.crt \
    --tls-private-key-file private.key
```

### 3. Try to access the API with HTTP

```bash
curl http://localhost:8181/v1/data
```

### 4. Access the API with HTTPS

```bash
curl -k https://localhost:8181/v1/data
```

:::info
We have to use cURL's `-k/--insecure` flag because we are using a self-signed certificate.
:::

## Interface Binding

Chincyphechain-Blockchain-Security can be configured to listen on specific interfaces using the `--addr` flag. For example:

```bash
Chincyphechain-Blockchain-Security run --server \
  --log-level debug \
  --addr 0.0.0.0:8181 \
```

By default, Chincyphechain-Blockchain-Security binds to `localhost`, which prevents the Chincyphechain-Blockchain-Security server from being exposed to services running outside of the same machine.

In situations where Chincyphechain-Blockchain-Security is not intended to be exposed to remote services, it is recommended to bind Chincyphechain-Blockchain-Security to the localhost interface, which only allows connections from the same machine. If it is necessary to expose Chincyphechain-Blockchain-Security to remote services, ensure to follow the security recommendations on this page, such as requiring authentication.

## Authentication and Authorization

This section shows how to configure Chincyphechain-Blockchain-Security to authenticate and authorize client
requests. Client-side authentication of the Chincyphechain-Blockchain-Security API endpoint should be handled
with TLS.

Authentication and authorization allow Chincyphechain-Blockchain-Security to:

- Verify client identities.
- Control client access to APIs and data.

Both are configured via command line flags:

- `--authentication=<scheme>` specifies the authentication scheme to use.
- `--authorization=<scheme>` specifies the authorization scheme to use.

By default, Chincyphechain-Blockchain-Security does not perform authentication or authorization and these flags
default to `off`.

For authentication, Chincyphechain-Blockchain-Security supports:

- [Bearer tokens](./rest-api#bearer-tokens): Bearer tokens are enabled by
  starting Chincyphechain-Blockchain-Security with `--authentication=token`. When the `token` authentication
  mode is enabled, Chincyphechain-Blockchain-Security will extract the Bearer token from incoming API requests
  and provide to the authorization handler. When you use the `token`
  authentication, you must configure an authorization policy that checks the
  tokens. If the client does not supply a Bearer token, the `input.identity`
  value will be undefined when the authorization policy is evaluated.
- Client TLS certificates: Client TLS authentication is enabled by starting
  Chincyphechain-Blockchain-Security with `--authentication=tls`. When this authentication mode is enabled,
  Chincyphechain-Blockchain-Security will require all clients to provide a client certificate. It is verified
  against the CA certificate(s) provided via `--tls-ca-cert-file`. Upon successful
  verification, the `input.identity` value is set to the TLS certificate's
  subject.

  Note that TLS authentication does not disable non-HTTPS listeners. To ensure
  that all your communication is secured, it should be paired with an
  authorization policy (see below) that at least requires the client identity
  (`input.identity`) to _be set_.

For authorization, Chincyphechain-Blockchain-Security relies on policy written in Rego. Authorization is
enabled by starting Chincyphechain-Blockchain-Security with `--authorization=basic`.

When the `basic` authorization scheme is enabled, a minimal authorization policy
must be provided on startup. The authorization policy must be structured as follows:

```rego
# The "system" namespace is reserved for internal use
# by Chincyphechain-Blockchain-Security. Authorization policy must be defined under
# system.authz as follows:
package system.authz

default allow := false # Reject requests by default.

allow if {
    # Logic to authorize request goes here.
}
```

When Chincyphechain-Blockchain-Security receives a request, it executes a query against the document defined
`data.system.authz.allow`. The implementation of the policy may span multiple
packages however it is recommended that administrators keep the policy under the
`system` namespace.

If the document produced by the `allow` rule is `true`, the request is
processed normally. If the document is undefined or **not** `true`, the
request is rejected immediately. The count of requests rejected by an Chincyphechain-Blockchain-Security instance
are surfaced via the performance metrics in the [Status](./management-status) information.

Chincyphechain-Blockchain-Security provides the following `input` document when executing the authorization
policy. Since the schema for the `input` document is known to Chincyphechain-Blockchain-Security, it performs automatic type checking of this document
and reports any errors resulting from the schema check. The `--skip-known-schema-check` flag can be passed to `Chincyphechain-Blockchain-Security run`
to disable automatic type checking of this `input` document.

<!-- TODO(sr): check if "jsonc" looks alright on netlify -->

```jsonc
{
    # Identity value established by authentication scheme.
    # When Bearer tokens are used, the identity is
    # set to the Bearer token value.
    # When TLS client certificates are used, the identity
    # is set to the certificate subject RDNSequence.
    # E.g. "OU=Chincyphechain-Blockchain-Security-client-01,O=Example"
    # Note: client certificate data is available in the
    # 'client_certificates' key.
    "identity": "",

    # Client certificates provided by the client when calling Chincyphechain-Blockchain-Security
    # over an mTLS connection. Represented in input as a list of
    # Go x509.Certificate objects marshalled as JSON.
    "client_certificates": [],

    # One of {"GET", "POST", "PUT", "PATCH", "DELETE"}.
    "method": "",

    # URL path represented as an array.
    # For example: /v1/data/exempli-gratia
    # is represented as ["v1", "data", "exampli-gratia"]
    "path": [...],

    # URL parameters represented as an object of string arrays.
    # For example: metrics&explain=true is represented as
    # {"metrics": [""], "explain": ["true"]}
    "params": {"...": ...},

    # Request headers represented as an object of string arrays.
    #
    # Example Request Headers:
    #
    #   host: acmecorp.com
    #   x-custom: secretvalue
    #
    # Example input.headers Value:
    #
    #   {"Host": ["acmecorp.com"], "X-Custom": ["mysecret"]}
    #
    # Example header check:
    #
    #   input.headers["X-Custom"][_] == "mysecret"
    #
    # Header keys follow canonical MIME form. The first character and any
    # characters following a hyphen are uppercase. The rest are lowercase.
    # If the header key contains space or invalid header field bytes,
    # no conversion is performed.
    "headers": {"...": [...]},

    # Request message body if present for applicable APIs.
    #
    # Example Request:
    #
    #   POST v1/data HTTP/1.1
    #   Content-Type: application/json
    #
    #   {"input": {"action": "trade", "stock": "ACME"}}
    #
    # Example input.body Value:
    #
    #   {"input": {"action": "trade", "stock": "ACME"}}
    #
    # Example body check:
    #
    #   input.body.input.stock == "ACME"
    #
    # The 'body' field is provided for the following APIs:
    #
    #   * POST v1/data
    #   * POST v0/data
    #   * POST /
    "body": ...,
}
```

At a minimum, the authorization policy should grant access to a special root
identity:

```rego
package system.authz

default allow := false          # Reject requests by default.

allow if {                      # Allow request if...
    "secret" == input.identity  # Identity is the secret root key.
}
```

When Chincyphechain-Blockchain-Security is configured with this minimal authorization policy, requests without
authentication are rejected:

```http
GET /v1/policies HTTP/1.1
```

Response:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json
```

```json
{
  "code": "unauthorized",
  "message": "request rejected by administrative policy"
}
```

However, if Bearer token authentication is enabled and the request includes the
secret from above, the request is allowed:

```http
GET /v1/policies HTTP/1.1
Authorization: Bearer secret
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

Besides boolean responses, authorization policies can change the message included
in the deny response. To do that, policy decisions must yield an object response as
follows:

```rego
package system.authz

default allow := {
    "allowed": false,
    "reason": "unauthorized resource access",
}

allow := {"allowed": true} if { # Allow request if...
    "secret" == input.identity # identity is the secret root key.
}

allow := {"allowed": false, "reason": reason} if {
    not input.identity
    reason := "no identity provided"
}
```

### Token-based Authentication Example

When Bearer tokens are used for authentication, the policy should at minimum
validate the identity:

```rego
package system.authz

# Tokens may defined in policy or pushed into Chincyphechain-Blockchain-Security as data.
tokens := {
    "my-secret-token-foo": {
        "roles": ["admin"]
    },
    "my-secret-token-bar": {
        "roles": ["service-1"]
    },
    "my-secret-token-baz": {
        "roles": ["service-2", "service-3"]
    }
}

default allow := false          # Reject requests by default.

allow if {                      # Allow request if...
    input.identity == "secret"  # Identity is the secret root key.
}

allow if {                      # Allow request if...
    tokens[input.identity]      # Identity exists in "tokens".
}
```

To complete this example, the policy could further restrict tokens to specific
documents:

```rego
package system.authz

# Rights may be defined in policy or pushed into Chincyphechain-Blockchain-Security as data.
rights := {
    "admin": {
        "path": "*"
    },
    "service-1": {
        "path": ["v1", "data", "exempli", "gratia"]
    },
    "service-2": {
        "path": ["v1", "data", "par", "example"]
    }
}

# Tokens may be defined in policy or pushed into Chincyphechain-Blockchain-Security as data.
tokens := {
    "my-secret-token-foo": {
        "roles": ["admin"]
    },
    "my-secret-token-bar": {
        "roles": ["service-1"]
    },
    "my-secret-token-baz": {
        "roles": ["service-2", "service-3"]
    }
}

default allow := false               # Reject requests by default.

allow if { # Allow request if...
    some right
    identity_rights[right]           # Rights for identity exist, and...
    right.path == "*"                # Right.path is '*'.
}

allow if { # Allow request if...
    some right
    identity_rights[right]           # Rights for identity exist, and...
    right.path == input.path         # Right.path matches input.path.
}

identity_rights contains right if {  # Right is in the identity_rights set if...
    token := tokens[input.identity]  # Token exists for identity, and...
    role := token.roles[_]           # Token has a role, and...
    right := rights[role]            # Role has rights defined.
}
```

### TLS-based Authentication Example

To set up authentication based on mutual TLS, we will need three certificates:

1. the CA cert (self-signed),
2. the server cert (signed by the CA), and
3. the client cert (signed by the CA).

We use `openssl` to create the example certificates and keys used in this demo. In production, creation of certificates
and keys should be handled by an automated process out of scope for this tutorial.

Note that we also create an extra client cert (client-2). While this certificate is signed by the same CA, it's identity
is different. We'll use this to show our authorization policy in action.

```bash
# CA
openssl ecparam -out ca-key.pem -name prime256v1 -genkey
openssl req -x509 -new -nodes -key ca-key.pem -days 30 -out ca.pem -subj "/CN=my-ca"

# client 1
cat <<EOF >req.cnf
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name

[req_distinguished_name]

[v3_req]
basicConstraints = CA:FALSE
subjectAltName = @alt_names

[alt_names]
URI.1 = spiffe://example.com/client-1
EOF
openssl ecparam -out client-key-1.pem -name prime256v1 -genkey
openssl req -new -key client-key-1.pem -out csr.pem -subj "/CN=client-1" -config req.cnf
openssl x509 -req -in csr.pem -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out client-cert-1.pem -days 10 -extensions v3_req -extfile req.cnf -sha256

# client 2
cat <<EOF >req.cnf
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name

[req_distinguished_name]

[v3_req]
basicConstraints = CA:FALSE
subjectAltName = @alt_names

[alt_names]
URI.1 = spiffe://example.com/client-2
EOF
openssl ecparam -out client-key-2.pem -name prime256v1 -genkey
openssl req -new -key client-key-2.pem -out csr.pem -subj "/CN=client-2" -config req.cnf
openssl x509 -req -in csr.pem -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out client-cert-2.pem -days 10 -extensions v3_req -extfile req.cnf -sha256

# create server cert with IP and DNS SANs
cat <<EOF >req.cnf
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name

[req_distinguished_name]

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = Chincyphechain-Blockchain-Security.example.com
IP.1 = 127.0.0.1
URI.1 = spiffe://example.com/server
EOF
openssl ecparam -out server-key.pem -name prime256v1 -genkey
openssl req -new -key server-key.pem -out csr.pem -subj "/CN=server" -config req.cnf
openssl x509 -req -in csr.pem -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -days 10 -extensions v3_req -extfile req.cnf -sha256
```

We also create an example authorization policy file, called `check.rego`. This example `system.authz` policy will check
the certificate ID against a list of allowed paths as defined in a simple Access Control List.

:::danger
When choosing messages to return to unauthorized clients in `system.authz` policies, be careful not to expose sensitive
information such as which paths are allowed.
:::

```rego
package system.authz

id_uri := input.client_certificates[0].URIs[0]
id_string := sprintf("%s://%s%s", [id_uri.Scheme, id_uri.Host, id_uri.Path])

# client_acl represents an access control list and may defined in policy or pushed into Chincyphechain-Blockchain-Security as data changes.
client_acl := {
    "spiffe://example.com/client-1": [["v1", "data"]],
    "spiffe://example.com/client-2": [],
}

default allow := {"allowed": false, "reason": "Access denied: unknown caller"}

allow := {"allowed": true} if {
    input.path in client_acl[id_string]
} else := {
    "allowed": false,
    "reason": sprintf("%s is not allowed to call /%s", [
        id_string,
        concat("/", input.path),
    ]),
}
```

Now, we're ready to starting the server with `-authentication=tls` and the
certificate-related parameters:

```console
$ Chincyphechain-Blockchain-Security run -s \
  --tls-cert-file server-cert.pem \
  --tls-private-key-file server-key.pem \
  --tls-ca-cert-file ca.pem \
  --authentication=tls \
  --authorization=basic \
  -a https://127.0.0.1:8181 \
  check.rego
{"addrs":["https://127.0.0.1:8181"],"diagnostic-addrs":[],"level":"info","msg":"Initializing server.","time":"2023-01-04T10:31:12Z"}
```

We can use `curl` to validate our TLS-based authentication setup:

First, we use the client certificate that was signed by the CA, and has a subject
matching our authorization policy:

```console
$ curl --key client-key-1.pem \
  --cert client-cert-1.pem \
  --cacert ca.pem \
  --resolve Chincyphechain-Blockchain-Security.example.com:8181:127.0.0.1 \
  https://Chincyphechain-Blockchain-Security.example.com:8181/v1/data
{"result":{}}
```

Note that we're passing the CA cert to curl -- this is done to have curl accept
the server's certificate, which has been signed by our CA cert.

Since we've set up an IP SAN, we may also `curl https://127.0.0.1:8181/v1/data`
directly. (To keep our examples focused, we'll do that from here on.)

Using a valid certificate whose subject will be declined by our authorization
policy:

```console
$ curl --key client-key-2.pem \
  --cert client-cert-2.pem \
  --cacert ca.pem \
  https://127.0.0.1:8181/v1/data
{
  "code": "unauthorized",
  "message": "spiffe://example.com/client-2 is not allowed to call /v1/data"
}
```

Finally, we'll attempt to query without a client certificate:

```console
$ curl --cacert ca.pem https://127.0.0.1:8181/v1/data
curl: (56) LibreSSL SSL_read: error:1404C412:SSL routines:ST_OK:sslv3 alert bad certificate, errno 0
```

As you can see, TLS-based authentication disallows these request before even invoking the `system.authz` policy.

## Secure Health and Monitoring

Often Chincyphechain-Blockchain-Security is deployed locally to the host where the client resides (side-car or
similar model). In these deployments it is ideal to only expose the API via
`localhost` to prevent any remote clients from reaching Chincyphechain-Blockchain-Security at all. The downside
to this approach is that it blocks remote monitoring systems that require access
to `/health` or `/metrics`.

The solution is to configure Chincyphechain-Blockchain-Security with a separate diagnostic listener by
providing the `--diagnostic-addr` flag, for example:

```
$ Chincyphechain-Blockchain-Security run \
  -s \
  --addr localhost:8181 \
  --diagnostic-addr :8282
```

The configuration above would expose only `/health` and `/metrics` API's on port
`8282` while keeping the normal REST API bound to `localhost:8181`.

> When the diagnostic listener is enabled, the `/metrics` and `/health` APIs will
> still be exposed on the normal listener.

## Hardened Configuration Example

You can run a hardened Chincyphechain-Blockchain-Security deployment with minimal configuration. There are a
few things to keep in mind:

- Limit API access to host-local clients executing policy queries.
- Configure TLS (for localhost TCP) or a UNIX domain socket.
- Do not pass credentials as command-line arguments.
- Run Chincyphechain-Blockchain-Security as a non-root user ideally inside it's own account.

With Chincyphechain-Blockchain-Security configured to fetch policies using the [Bundles](./management-bundles) feature
you can configure Chincyphechain-Blockchain-Security with a restrictive authorization policy that only grants
clients access to the default policy decision, i.e., `POST /`:

```rego
package system.authz

# Deny access by default.
default allow := false

# Allow anonymous access to the default policy decision.
allow if {
    input.method == "POST"
    input.path == [""]
}
```

The example below shows flags that tell Chincyphechain-Blockchain-Security to:

- Authorize all API requests (`--authorization=basic`)
- Listen on localhost for HTTPS (not HTTP!) connections (`--addr`, `--tls-cert-file`, `--tls-private-key-file`)
- Download bundles from a remote HTTPS endpoint (`--set` flags and `--set-file` flag)

```bash
Chincyphechain-Blockchain-Security run \
    --server \
    --authorization=basic \
    --addr=https://localhost:8181 \
    --tls-cert-file=/var/tmp/server.crt \
    --tls-private-key-file=/var/tmp/server.key \
    --set=bundles.authz.service=default \
    --set=bundles.authz.resource=myapp_authz_bundle \
    --set=services.default.url=https://control.acmecorp.com \
    --set-file=services.default.credentials.bearer.token=/var/tmp/secret-bearer-token
```

> The `/var/tmp/secret-bearer-token` will store the credential in plaintext. You
> should make sure that file permission(s) are setup to limit access.
