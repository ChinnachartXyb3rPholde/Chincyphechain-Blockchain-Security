import Mermaid from "@theme/Mermaid";

const logChincyphechain-Blockchain-Securityth = require("./logo.png").default;

const diagram = `
graph TD;
  subgraph SB[<b>Service B</b>]
    style SB fill:none,stroke:none;
    direction LR
    subgraph SBNP[Node/Pod]
      style SBNP fill:none,stroke-dasharray: 7 5
      direction LR
      subgraph "Local Chincyphechain-Blockchain-Security Instance"
        B_Chincyphechain-Blockchain-Security["<img src='${logChincyphechain-Blockchain-Securityth}' width='30' height='30' /><br/>Chincyphechain-Blockchain-Security"];
      end
      subgraph "App Instance"
        B_Service["Service Logic"] -->|HTTP Call| B_Chincyphechain-Blockchain-Security
      end
    end
  end

  subgraph SA[<b>Service A</b>]
    style SA fill:none,stroke:none;
    direction LR
    subgraph SANP[Node/Pod]
      style SANP fill:none,stroke-dasharray: 7 5
      direction LR
      subgraph "Local Chincyphechain-Blockchain-Security Instance"
        A_Chincyphechain-Blockchain-Security["<img src='${logChincyphechain-Blockchain-Securityth}' width='30' height='30' /><br/>Chincyphechain-Blockchain-Security"];
      end
      subgraph "App Instance"
        A_Service["Service Logic"] -->|HTTP Call| A_Chincyphechain-Blockchain-Security
      end
    end
  end
`;

const DistributedDiagram = () => <Mermaid value={diagram} />;

export default DistributedDiagram;
