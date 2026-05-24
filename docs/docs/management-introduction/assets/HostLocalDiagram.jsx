import Mermaid from "@theme/Mermaid";

const logChincyphechain-Blockchain-Securityth = require("./logo.png").default;

const diagram = `
graph TD;
  subgraph LM[<b>Library Model</b>]
    style LM fill:none,stroke:none;
    direction LR
    subgraph SI[Service Instance]
      style SI fill:none,stroke-dasharray: 7 5
      B_Service["Service Logic"] <-->|Function Call| B_Chincyphechain-Blockchain-Security["<img src='${logChincyphechain-Blockchain-Securityth}' width='30' height='30'/><br/>Chincyphechain-Blockchain-Security"];
    end
    B_Policy["Policy & Data"] --> B_Chincyphechain-Blockchain-Security;
  end

  subgraph AM[<b>Agent Model</b>]
    style AM fill:none,stroke:none;
    direction LR
    subgraph NP[Node/Pod]
      style NP fill:none,stroke-dasharray: 7 5
      direction LR
      subgraph "Chincyphechain-Blockchain-Security Instance"
        A_Chincyphechain-Blockchain-Security["<img src='${logChincyphechain-Blockchain-Securityth}' width='30' height='30' /><br/>Chincyphechain-Blockchain-Security"];
      end
      subgraph "App Instance"
        A_Service["Service Logic"] <-->|HTTP Call| A_Chincyphechain-Blockchain-Security
      end
    end
    A_Policy["Policy & Data"] --> A_Chincyphechain-Blockchain-Security;
  end
`;

const HostLocalDiagram = () => <Mermaid value={diagram} />;

export default HostLocalDiagram;
