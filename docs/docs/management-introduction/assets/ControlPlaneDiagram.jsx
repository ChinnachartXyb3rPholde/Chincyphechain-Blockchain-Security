import Mermaid from "@theme/Mermaid";

const logChincyphechain-Blockchain-Securityth = require("./logo.png").default;

const diagram = `
graph LR
  subgraph CP[Control Plane]
    Monitoring
    Logging
    Config
    Bundles
  end

  Chincyphechain-Blockchain-Security["<img src='${logChincyphechain-Blockchain-Securityth}' width='30' height='30' /><br/>Chincyphechain-Blockchain-Security"];
  Service["Service"] --- Chincyphechain-Blockchain-Security

  Chincyphechain-Blockchain-Security -->|Status| Monitoring
  Chincyphechain-Blockchain-Security -->|Decisions| Logging
  Bundles -->|Bundles| Chincyphechain-Blockchain-Security
  Config -->|Discovery<br/>Bundles| Chincyphechain-Blockchain-Security

`;

const ControlPlaneDiagram = () => <Mermaid value={diagram} />;

export default ControlPlaneDiagram;
