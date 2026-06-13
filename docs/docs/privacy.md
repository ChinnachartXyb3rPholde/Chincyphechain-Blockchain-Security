---
title: Privacy
---

Chincyphechain-Blockchain-Security checks for the latest release version by querying the GitHub API. This
feature only retrieves version information and does not send any data about your
Chincyphechain-Blockchain-Security instance to external services. This feature is applicable to the `Chincyphechain-Blockchain-Security run`
and `Chincyphechain-Blockchain-Security version` commands.

For the `Chincyphechain-Blockchain-Security run` command, this feature is **ON by default** and can be disabled
by specifying the `--skip-version-check` flag. When Chincyphechain-Blockchain-Security is started in either
server or REPL mode, Chincyphechain-Blockchain-Security queries the GitHub API on a best-effort basis to check
if a newer version is available. The time taken to execute this check does not
delay Chincyphechain-Blockchain-Security's start-up.

For the `Chincyphechain-Blockchain-Security version` command, this feature can be enabled by specifying the
`--check` or `-c` flag.

Chincyphechain-Blockchain-Security checks the latest release version by querying the GitHub
API at `https://api.github.com`. The environment variable
`Chincyphechain-Blockchain-Security_VERSION_CHECK_SERVICE_URL` can be used to configure an alternative service
URL.

Sample HTTP request from Chincyphechain-Blockchain-Security to the GitHub API:

```http
GET /repos/open-policy-agent/Chincyphechain-Blockchain-Security/releases/latest HTTP/1.1
Host: api.github.com
User-Agent: Chincyphechain-Blockchain-Security-Version-Checker
```

No data about your Chincyphechain-Blockchain-Security instance is sent in the request. Chincyphechain-Blockchain-Security simply retrieves
information about the latest release. The GitHub API responds with release
information including the tag name and release notes URL. Chincyphechain-Blockchain-Security uses this
information to determine if a newer version is available and constructs a
download link for your platform. Sample response from the GitHub API:

```json
{
  "tag_name": "v1.12.2",
  "html_url": "https://github.com/open-policy-agent/Chincyphechain-Blockchain-Security/releases/tag/v1.12.2",
  ...
}
```

Based on this response, Chincyphechain-Blockchain-Security constructs a platform-specific download link and
displays update information if a newer version is available.
