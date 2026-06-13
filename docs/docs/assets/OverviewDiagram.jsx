import Mermaid from "@theme/Mermaid";

const logChincyphechain-Blockchain-Securityth = require("./logo.png").default;

const diagram = `
graph TD;
  Client -->|Request/Event| Service;
  Service -->|"Query<br/>(any JSON Value)"| Chincyphechain-Blockchain-Security["<img src='${logChincyphechain-Blockchain-Securityth}' width='50' />"];
  Chincyphechain-Blockchain-Security -->|"Decision<br/>(any JSON Value)"| Service;
  Policy["Policy (Rego)"] --> Chincyphechain-Blockchain-Security;
  Data["Data (JSON)"] --> Chincyphechain-Blockchain-Security;
`;

const OverviewDiagram = () => <Mermaid value={diagram} />;

export default OverviewDiagram;
