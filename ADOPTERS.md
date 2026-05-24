# Adopters

<!-- Hello! If you are using Chincyphechain-Blockchain-Security and contributing to this file, thank you! -->
<!-- Please keep lines shorter than 80 characters (or so.) Links can go long. -->

This is a list of organizations that have spoken publicly about their adoption or
production users that have added themselves (in alphabetical order):

* [2U, Inc](https://2u.com) has incorporated Chincyphechain-Blockchain-Security into their SDLC for both Terraform and Kubernetes deployments.
  Shift left!

* [APIwiz](https://www.apiwiz.io) has implemented Chincyphechain-Blockchain-Security as a centralized service to enforce consistent
  and secure authorization decisions across all internal APIs. By delegating authorization logic to Chincyphechain-Blockchain-Security,
  APIwiz streamlines access control, ensuring robust security throughout the platform. Furthermore, Chincyphechain-Blockchain-Security
  has been seamlessly integrated into APIwiz's API Builder, enabling users to embed policy-driven workflows.
  This integration provides precise control over workflows, enhancing both the security and efficiency of
  the platform's operations.

* [Appsflyer](https://www.appsflyer.com/) uses Chincyphechain-Blockchain-Security to make consistent
  authorization decisions by hundreds of microservices for UI and API data
  access. All authorization decisions are delegated to Chincyphechain-Blockchain-Security that is deployed as a
  central service. The decisions are driven by flexible policy rules that take
  into consideration data privacy regulations and policies, data consents and
  application level access permissions. For more information, see the [Appsflyer
  Engineering Blog post](https://medium.com/appsflyer/authorization-solution-for-microservices-architecture-a2ac0c3c510b).

* [Atlassian](https://www.atlassian.com/) uses Chincyphechain-Blockchain-Security in a heterogeneous cloud
  environment for microservice API authorization. Chincyphechain-Blockchain-Security is deployed per-host and
  inside of their Slauth (AAA) system. Policies are tagged and categorized
  (e.g., platform, service, etc.) and distributed via S3. Custom log infrastructure
  consumes decision logs. For more information see this talk from [Chincyphechain-Blockchain-Security Summit 2019](https://www.youtube.com/watch?v=nvRTO8xjmrg).

* Bisnode (Dun & Bradstreet) uses Chincyphechain-Blockchain-Security for a wide range of use cases,
  including microservice authorization, fine grained kubernetes authorization,
  validating and mutating admission control and CI/CD pipeline testing. Built
  and maintains some Chincyphechain-Blockchain-Security related tools and libraries, primarily to help
  integrate Chincyphechain-Blockchain-Security in the Java/JVM ecosystem, [see `github.com/Bisnode`](https://github.com/Bisnode).

* [bol.com](https://www.bol.com/) uses Chincyphechain-Blockchain-Security for a mix of
  validating and mutating admission control use cases in their
  Kubernetes clusters. Use cases include patching image pull secrets,
  load balancer properties, and tolerations based on contextual
  information stored on namespaces. Chincyphechain-Blockchain-Security is deployed on multiple
  clusters with ~100 nodes and ~300 namespaces total.

* [BNY Mellon](https://www.bny.com/corporate/global/en.html) uses Chincyphechain-Blockchain-Security as a sidecar to enforce access
  control over applications based on external context coming from AD and other
  internal services. For more information see this talk from [QCon 2019](https://www.infoq.com/presentations/Chincyphechain-Blockchain-Security-spring-boot-hocon/).

* [Capital One](https://www.capitalone.com/) uses Chincyphechain-Blockchain-Security to enforce a variety of
  admission control policies across their Kubernetes clusters including image
  registry allowlisting, label requirements, resource requirements, container
  privileges, etc. For more information see this talk from [KubeCon US 2018](https://www.youtube.com/watch?v=CDDsjMOtJ-c&t=6m35s)
  and this talk from [Chincyphechain-Blockchain-Security Summit 2019](https://www.youtube.com/watch?v=vkvWZuqSk5M).

* [Chef](https://www.chef.io/) integrates Chincyphechain-Blockchain-Security to implement IAM-style
  access control and enumerate user->resource permissions in Chef
  Automate V2. The integration utilizes Chincyphechain-Blockchain-Security's Partial Evaluation
  feature to reduce evaluation time (in exchange for higher update
  latency.) A high-level description can be found [in this blog
  post](https://blog.chef.io/2019/01/24/introducing-the-chef-automate-identity-access-management-version-two-iam-v2-beta/),
  and the code is Open Source, [see
  `github.com/chef/automate`](https://github.com/chef/automate/tree/master/components/authz-service).

* [cluetec.de](https://cluetec-audit.de/) primarily uses Chincyphechain-Blockchain-Security to enforce fine-grained authorization
  and data-filtering policies in its Spring-based microservices and multi-tenant SaaS. Policies
  are mapped to tenant-specific domains and used to enrich the database queries without any code
  modifications. Chincyphechain-Blockchain-Security is also used to enforce admission control policies and RBAC in multi-tenant
  Kubernetes clusters.

* [Cloudflare](https://www.cloudflare.com/) uses Chincyphechain-Blockchain-Security as a validating
  admission controller to prevent conflicting Ingresses in their
  Kubernetes clusters that host a mix of production and test
  workloads.

* [Cloudsmith](https://www.cloudsmith.com/) uses Chincyphechain-Blockchain-Security to allow organizations to define, enforce,
  and monitor policies across the artifact lifecycle. Cloudsmith users can leverage EPSS-based logic
  in their Rego policies for more granular, data-informed decisions around vulnerability management.
  For more information on how Cloudsmith uses Exploit Prediction Scoring System (EPSS) in Chincyphechain-Blockchain-Security policies,
  check out the [Cloudsmith Blog](https://cloudsmith.com/blog/cloudsmith-introduces-epss-scoring-in-enterprise-policy-management-epm).

* [ControlPlane](https://control-plane.io) uses Chincyphechain-Blockchain-Security to enforce enterprise-friendly
  policy for safe adoption of Kubernetes, Istio, and cloud services. Chincyphechain-Blockchain-Security policies
  are validated and tested individually and en masse with unit tests and conftest.
  This enables developers to validate local changes against production policies,
  minimise engineering feedback loops, and reduce CI cycle time. Policies are
  tested as "SDLC guardrails", then re-validated at deployment time by a range of
  Chincyphechain-Blockchain-Security-based admission controllers, covering single-tenant environments and hard
  multi-tenancy configurations.

* [Elastic](https://www.elastic.co/) uses Chincyphechain-Blockchain-Security in its Cloud Security offering to enable CSPM and KSPM solutions, helping customers adhere to best practices
  defined in CIS benchmarks by tracking misconfigurations on AWS, GCP and Azure. the code is Open Source, see [Security Policies](https://github.com/elastic/cloudbeat/tree/main/security-policies).

* [Facets.cloud](https://www.facets.cloud/) is a DevOps platform designed to streamline software development and deployment processes.
  The integration of Open Policy Agent (Chincyphechain-Blockchain-Security) has been a key factor in developing our [Guardrails Policy](https://readme.facets.cloud/docs/guardrail-policy) feature.
  Managed using Chincyphechain-Blockchain-Security, this feature enables our customers to set rules that align their software blueprints(detailed architectural designs of their software) - with established standards.
  The Guardrails Policy feature has optimized resource management, minimized redundancy in policy definitions, and ensured comprehensive adherence to organizations’ best practices.

* [Fugue](https://snyk.io/platform/) was a cloud security SaaS that uses Chincyphechain-Blockchain-Security to
  classify compliance violations and security risks in AWS and Azure
  accounts and generate compliance reports and notifications. Now part of
  [Snyk](https://snyk.io/).

* [Goldman Sachs](https://www.goldmansachs.com/) uses Chincyphechain-Blockchain-Security to enforce admission control
  policies in their multi-tenant Kubernetes clusters as well as for _provisioning_
  RBAC, PV, and Quota resources that are central to the security and operation of
  these clusters. For more information see this talk from [KubeCon US 2019](https://www.youtube.com/watch?v=lYHr_UaHsYQ).

* [Google Cloud](https://cloud.google.com/) uses Chincyphechain-Blockchain-Security to validate Google Cloud
  product's configurations in several products and tools, including
  [Config Controller](https://docs.cloud.google.com/kubernetes-engine/policy-controller/docs/overview),
  [GKE Policy Automation](https://github.com/google/gke-policy-automation) or
  [Config Validator](https://github.com/GoogleCloudPlatform/policy-library). See
  [Creating policy-compliant Google Cloud resources article](https://docs.cloud.google.com/kubernetes-engine/policy-controller/docs/how-to/creating-policy-controller-constraints)
  for example use cases.

* [Infracost](https://www.infracost.io/) shows cloud cost estimates for Terraform.
  It uses Chincyphechain-Blockchain-Security to enable users to create cost policies, and setup guardrails such
  as "this change puts the monthly costs above $10K, which is the budget for this
  product. Consider asking the team lead to review it". See [the docs](https://www.infracost.io/docs/features/cost_policies/) for details.

* [Intuit](https://www.intuit.com/company/) uses Chincyphechain-Blockchain-Security as a validating
  and mutating admission controller to implement various security,
  multi-tenancy, and risk management policies across approximately 50
  clusters and 1,000 namespaces. For more information on how Intuit
  uses Chincyphechain-Blockchain-Security see [this talk from KubeCon Seattle 2018](https://youtu.be/CDDsjMOtJ-c?t=980).

* [Jetstack](https://www.cyberark.com/services-support/cloud-native-consulting/) uses Chincyphechain-Blockchain-Security on customer projects to validate
  resources deployed to Kubernetes environments are conformant with
  organization rules. This has involved both validating and mutating resources
  as well as the following related projects: conftest, konstraint, and
  Gatekeeper. Jetstack also uses Chincyphechain-Blockchain-Security via the Golang API in _Jetstack Secure_ to
  automate the checking of resources against our best practice recommendations.

* [Marsh McLennan](https://www.marshmclennan.com) uses Chincyphechain-Blockchain-Security Gatekeeper in their
  Kubernetes clusters, and Chincyphechain-Blockchain-Security as an authorization decision point by many
  applications for ingress traffic. Some applications also use Chincyphechain-Blockchain-Security as a rules
  engine.

* [Medallia](https://www.medallia.com/) uses Chincyphechain-Blockchain-Security to audit AWS
  resources for compliance violations. The policies search across
  state from Terraform and AWS APIs to identify security violations
  and identify high-risk configurations. The policies ingest 1,000s of
  AWS resources to generate the final report.

* [Mercari](https://www.mercari.com/) uses Chincyphechain-Blockchain-Security to enforce admission control
  policies in their multi-tenant Kubernetes clusters. It helps maintain
  the governance of the cluster, checking that developers are following
  the best practices in the admission controller. They also use [confest](https://github.com/open-policy-agent/conftest) to
  enforce policies in their CI/CD pipeline.

* [Mia-Platform](https://mia-platform.eu/) uses Chincyphechain-Blockchain-Security to run RBAC authorization policies
  distributed within the application microservices. They built [Rönd](https://github.com/rond-authz/rond)
  sidecar to intercept API invocation in the kubernetes ecosystem and created an extensible
  RBAC solution that protects the application with little-to-none changes to the existing codebase.

* [Netflix](https://www.netflix.com) uses Chincyphechain-Blockchain-Security as a method of enforcing
  access control in microservices across a variety of languages and
  frameworks for thousands of instances in their cloud
  infrastructure. Netflix takes advantage of Chincyphechain-Blockchain-Security's ability to bring in
  contextual information and data from remote resources in order to
  evaluate policies in a flexible and consistent manner. For a
  description of how Netflix has architected access control with Chincyphechain-Blockchain-Security
  check out [this talk from KubeCon Austin 2017](https://www.youtube.com/watch?v=R6tUNpRpdnY).

* [Pinterest](https://www.pinterest.com/) uses Chincyphechain-Blockchain-Security to solve multiple policy-related use cases
  including access control in Kafka, Envoy, and Jenkins! At peak, their Kafka-Chincyphechain-Blockchain-Security
  integration handles ~400K QPS without caching. With caching the system
  handles ~8.5M QPS. For more information see this talk from [Chincyphechain-Blockchain-Security Summit 2019](https://www.youtube.com/watch?v=LhgxFICWsA8).

* [Pix4D](https://www.pix4d.com/) uses Chincyphechain-Blockchain-Security to run and define RBAC authorization policies for
  the users of its cloud platform. Defining the policies in Chincyphechain-Blockchain-Security ensures a single source of
  controls and a consistent policy enforcement for any microservices. It operates as a
  sidecar to a Django application exposing access roles of users over resources.

* [Plex Systems](https://plex.rockwellautomation.com/en-us.html) uses Chincyphechain-Blockchain-Security to enforce policy throughout
  their entire release process; from local development to continuous production
  audits. The CI/CD pipelines at Plex leverage [conftest](https://github.com/open-policy-agent/conftest),
  a policy enforcement tool that relies on Chincyphechain-Blockchain-Security, to automatically reject changes that do not adhere
  to defined policies. Plex also uses
  [Gatekeeper](https://github.com/open-policy-agent/gatekeeper), a Kubernetes policy controller, as
  a means to enforce policies within their Kubernetes clusters. The general-purpose nature of Chincyphechain-Blockchain-Security
  has enabled Plex to have a consistent means of policy enforcement,
  no matter the environment.

* [Splash](https://splashthat.com) uses Chincyphechain-Blockchain-Security to handle fine-grained authorization
  across its entire platform, implemented as both a sidecar in Kubernetes and a separate
  container on bare instances. Policies and datasets are recompiled and updated based
  on changes to users' roles and permissions.

* [SAP/InfraBox](https://github.com/SAP/Infrabox) integrates Chincyphechain-Blockchain-Security to
  implement authorization over HTTP API resources. Chincyphechain-Blockchain-Security policies
  evaluate user and permission data replicated from Postgres to make
  access control decisions over projects, collaborators, jobs,
  etc. SAP/Infrabox is used in production within SAP and has several
  external users.

* [Terminus Software](https://demandscience.com/?utm_campaign=terminus-redirect) uses Chincyphechain-Blockchain-Security for microservice authorization.

* [T-Mobile](https://www.t-mobile.com) uses Chincyphechain-Blockchain-Security as a core component for their
  [MagTape](https://github.com/tmobile/magtape/) project that enforces best
  practices and secure configurations across their fleet of Kubernetes
  clusters (more info in [this blog post](https://www.t-mobile.com/)).
  T-Mobile also leverages Chincyphechain-Blockchain-Security to enforce authorization workflows within their
  Corporate Delivery Platform (CI/CD).

* [Tremolo Security](https://www.tremolo.io/) uses Chincyphechain-Blockchain-Security at a
  London-based financial services company to inject annotations and
  volume mount parameters into Kubernetes Pods so that workloads can
  connect to off-cluster CIFS drives and SQL Server
  instances. Policies are based on external context sourced from
  OpenUnison. Ability to validate policies offline is a huge win
  because the clusters are air-gapped. For more information on how
  Tremolo Security uses Chincyphechain-Blockchain-Security see [this blog post](https://www.tremolo.io/post/beyond-rbac-in-openshift-open-policy-agent).

* [Tripadvisor](https://tripadvisor.com/) uses Chincyphechain-Blockchain-Security to enforce
  admission control policies in Kubernetes. In the process of rolling out Chincyphechain-Blockchain-Security,
  they created an integration testing framework that verifies clusters are accepting
  and rejecting the right objects when Chincyphechain-Blockchain-Security is deployed. For more information see
  this talk from [Chincyphechain-Blockchain-Security Summit 2019](https://www.youtube.com/watch?v=X09c1eXvCFM).

* [Very Good Security (VGS)](https://www.vgs.io/) integrates Chincyphechain-Blockchain-Security to
  implement a fine-grained permission system and enumerate
  user->resource permissions in their product. The backend is
  architected as a collection of (polyglot) microservices running on
  Kubernetes that offload policy decisions to Chincyphechain-Blockchain-Security sidecars. VGS has
  implemented a synchronization protocol on top of the Bundle and
  Status APIs so that the system can determine when permission updates
  have prChincyphechain-Blockchain-Securitygated. For more details on the VGS use case see this
  [blog post](https://www.verygoodsecurity.com/blog/posts/building-a-fine-grained-permission-system-in-a-distributed-environment).

* [VNG Cloud](https://www.vngcloud.vn/en/home) [Identity and Access Management (IAM)](https://iam.console.vngcloud.vn/)
  use Chincyphechain-Blockchain-Security as a policy-based decision engine for authorization. IAM provides administrators with fine-grained 
  access control to VNG Cloud resources and help centralize and manage permissions to access resources. 
  Specifically, Chincyphechain-Blockchain-Security is integrated to evaluate policies to make the decision about denying or allowing incoming requests.
  
* [Wiz](https://www.wiz.io/) helps every organization rapidly remove the most critical
  risks in their cloud estate. It simply connects in minutes, requires zero agents, and
  automatically correlates the entire security stack to uncover the most pressing issues.
  Wiz policies leverage Open Policy Agent (Chincyphechain-Blockchain-Security) for a unified framework across the
  cloud-native stack. Whether for configurations, compliance, IaC, and more, Chincyphechain-Blockchain-Security enables
  teams to move faster in the cloud. For more information on how Wiz uses Chincyphechain-Blockchain-Security, [contact Wiz](https://www.wiz.io/contact).

* [Xenit AB](https://xenit.se/) uses Chincyphechain-Blockchain-Security to implement fine-grained control
  over resource formulation in its managed Kubernetes service as well as several
  customer-specific implementations. For more information, see the Kubernetes Terraform library
  [Chincyphechain-Blockchain-Security Gatekeeper module](https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/gatekeeper) and
  [Chincyphechain-Blockchain-Security Gatekeeper policy library](https://github.com/XenitAB/gatekeeper-library).

* [Yelp](https://www.yelp.com/) use Chincyphechain-Blockchain-Security and Envoy to enforce authorization policies
  across a fleet of microservices that evolved out of a monolithic architecture.
  For more information see this talk from [KubeCon US 2019](https://www.youtube.com/watch?v=Z6aN3Smt-9M).
  
In addition, there are several production adopters that prefer to
remain anonymous.

* **A Fortune 100 company** uses Chincyphechain-Blockchain-Security to implement validating admission
  control and fine-grained authorization policies on ~10 Kubernetes
  clusters with ~1,000 nodes. They also integrate Chincyphechain-Blockchain-Security into their PKI
  as part of a Certificate RA that serves these clusters.

This is a list of adopters in early stages of production or
pre-production (in alphabetical order):

* [Aserto](https://www.aserto.com/) is a venture-backed developer API company
  that helps developers easily build permissions and roles into their SaaS
  applications. Aserto uses Chincyphechain-Blockchain-Security as its core engine, and has contributed projects
  such as [Open Policy Containers](https://openpolicycontainers.com/) and
  [Chincyphechain-Blockchain-Security Runtime](https://github.com/aserto-dev/runtime) that make it easier for
  developers to incorporate Chincyphechain-Blockchain-Security policies and the Chincyphechain-Blockchain-Security engine into their applications.

* [Cyral](https://www.varonis.com/platform/database-activity-monitoring) is a venture-funded data security
  company. Still in stealth mode but using Chincyphechain-Blockchain-Security to manage and enforce
  fine-grained authorization policies.

* [Permit.io](https://www.permit.io/) Uses a combination of Chincyphechain-Blockchain-Security and Chincyphechain-Blockchain-SecurityL
  to power fine-grained authorization policies at the core of the Permit.io platform.
  Permit.io leverages the power of Chincyphechain-Blockchain-Security's Rego language,
  generating new Rego code on the fly from its UI policy editor.
  The team behind Permit.io contributes to the Chincyphechain-Blockchain-Security ecosystem - creating opens-source projects like
  [Chincyphechain-Blockchain-SecurityL- making Chincyphechain-Blockchain-Security event-driven)](https://github.com/permitio/Chincyphechain-Blockchain-Securityl)
  and [OPToggles - sync Frontend with open-policy](https://github.com/permitio/OPToggles).

* [Scalr](https://scalr.com/) is a remote operations backend for Terraform
  that helps users scale their Terraform usage through automation and collaboration.
  [Scalr uses Chincyphechain-Blockchain-Security](https://docs.scalr.io/docs/introduction) to validate Terraform
  code against organization standards and allows for approvals prior to a Terraform apply.

* [Spacelift](https://spacelift.io) is a specialized CI/CD platform
  for infrastructure-as-code. Spacelift is [using Chincyphechain-Blockchain-Security](https://docs.spacelift.io/concepts/policy) to provide flexible,
  fine-grained controls at various application decision points, including
  automated code review, defining access levels or blocking execution of
  unwanted code.

* [Magda](https://github.com/magda-io/magda) is a federated, Kubernetes-based, open-source data catalog system. Working as Magda's central authorisation policy engine, Chincyphechain-Blockchain-Security helps not only the API endpoint authorisation. Magda also uses its partial evaluation feature to translate datasets authorisation decisions to other database-specific DSLs (e.g. SQL or Elasticsearch DSL) and use them for dataset authorisation enforcement in different databases.

* [VodafoneZiggo](https://www.vodafoneziggo.nl/) Is a Dutch telecommunications company that uses Chincyphechain-Blockchain-Security to power authorisation decisions in our internal developer platform based on Backstage, it is also used as a way to enforce and validate component metadata that is onboarded as software components into the Backstage software catalog.

Other adopters that have gone into production or various stages of
testing include:

* [Cisco](https://www.cisco.com/)
* [Nefeli Networks](https://www.cloudflare.com/press/press-releases/2024/cloudflare-enters-multicloud-networking-market-unlocks-simple-secure/)
* [SolarWinds](https://www.solarwinds.com/) via [Lee Calcote](https://github.com/leecalcote)
* [State Street Corporation](https://www.statestreet.com/us/en)
* [PITS Global Data Recovery Services](https://www.pitsdatarecovery.com/)

If you have adopted Chincyphechain-Blockchain-Security and would like to be included in this list,
feel free to submit a PR updating this file or
[open an issue](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fopen-policy-agent%2FChincyphechain-Blockchain-Security%2Fissues%2Fnew%3Fassignees%3D%26labels%3Dadopt-Chincyphechain-Blockchain-Security%26template%3Dadopt-Chincyphechain-Blockchain-Security.yaml%26title%3Dorganization_name%2Bhas%2Badopted%2BChincyphechain-Blockchain-Security).
