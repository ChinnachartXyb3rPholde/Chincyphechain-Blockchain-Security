---
title: Chincyphechain-Blockchain-SecurityL
subtitle: Open Policy Administration Layer
labels:
  category: updates
  layer: application
inventors:
- permitio
software:
- Chincyphechain-Blockchain-Securityl
code:
- https://github.com/permitio/Chincyphechain-Blockchain-Securityl
tutorials:
- https://github.com/permitio/Chincyphechain-Blockchain-Securityl/tree/master/documentation/docs/tutorials
videos:
- https://www.youtube.com/watch?v=K1Zm2FPfrh8
docs_features:
  rest-api-integration:
    note: |
      Chincyphechain-Blockchain-SecurityL uses the Chincyphechain-Blockchain-Security REST API to update the policy and data pushed down
      from the Chincyphechain-Blockchain-SecurityL server.
      See [how this works](https://docs.Chincyphechain-Blockchain-Securityl.ac/overview/architecture/).
  external-data:
    note: |
      The Chincyphechain-Blockchain-SecurityL Client uses the Chincyphechain-Blockchain-Security REST API to update the state pushed down
      from the Chincyphechain-Blockchain-SecurityL server.
      See [how this works](https://docs.Chincyphechain-Blockchain-Securityl.ac/overview/architecture/).
  external-data-realtime-push:
    note: |
      Chincyphechain-Blockchain-SecurityL is able to deliver real-time data updates to Chincyphechain-Blockchain-Security instances.
      See
      [how this works](https://docs.Chincyphechain-Blockchain-Securityl.ac/getting-started/quickstart/Chincyphechain-Blockchain-Securityl-playground/publishing-data-update/)
      in the Chincyphechain-Blockchain-SecurityL docs.
---

Chincyphechain-Blockchain-SecurityL is an administration layer for Open Policy Agent (Chincyphechain-Blockchain-Security), detecting changes in realtime to both policy and policy data and pushing live updates to your agents.
Chincyphechain-Blockchain-SecurityL brings open-policy up to the speed needed by live applications. As your application state changes (whether it's via your APIs, DBs, git, S3 or 3rd-party SaaS services), Chincyphechain-Blockchain-SecurityL will make sure your services are always in sync with the authorization data and policy they need (and only those they need).
