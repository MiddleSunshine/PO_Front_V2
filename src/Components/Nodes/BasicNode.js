import { useReactFlow } from 'reactflow';
import { requestAPI } from "../../config/function";
import { message } from "antd";

const BASIC_NODE_DATA = {
    data: {},
    node_data: {},
    settings: {
        style: {}
    },
    save_into_database: false
}

const GetNodeStyle = (node, warningStyle = false) => {
    let style = {
        ...node.data?.settings?.style,
        width: node.width,
        height: node.height
    };
    if (node?.data?.save_into_database) {
        style.borderTop = "4px solid #62DBC8";
        style.borderRadius = "5px";
    }
    if (warningStyle) {
        style.border = "2px solid red";
        // style.padding = "5px";
    }
    // if (node.selected){
    //     style.backgroundColor="#ff5722";
    // }
    return style;
}

const SearchHistoryNodeAsync = (searchKeyword, type = '') => {
    if (!searchKeyword) {
        message.warning("Please input the keyword");
        return "";
    }
    return requestAPI('index.php?action=NodeController&method=SearchNode', {
        method: "post",
        body: JSON.stringify({
            keyword: searchKeyword,
            type: type
        })
    });
}

const CreateNodeAsync = (type, name, node_id, node_data = {}) => {
    return requestAPI("index.php?action=NodeController&method=CreateNode", {
        method: "post",
        body: JSON.stringify({
            data: {
                Type: type,
                Name: name,
                node_id: node_id
            },
            node_data: node_data
        })
    })
}

const GetNodeDetailAsync = (ID) => {
    return requestAPI(`index.php?action=NodeController&method=GetNodeDetail&ID=${ID}`);
}

const UpdateNodeAsync = (data, node_data) => {
    return requestAPI("index.php?action=NodeController&method=UpdateNode", {
        method: "post",
        body: JSON.stringify({
            data: data,
            node_data: node_data
        })
    });
}

const UpdateNode = (instance, node) => {
    let newNodes = instance.getNodes();
    newNodes.map((n) => {
        if (n.id == node.id) {
            return Object.assign(n, node);
        }
        return n;
    });
    instance.setNodes(newNodes)
    message.info("Synced");
}

const SaveWhiteBoard = (IsDraft, id, settings, nodes, edges, successMessage = 'Save Success') => {
    requestAPI("index.php?action=WhiteBordController&method=StoreWhiteBord&ID=" + id, {
        method: "post",
        body: JSON.stringify({
            IsDraft: IsDraft,
            Data: {
                settings: settings,
                data: {
                    nodes: nodes,
                    edges: edges
                }
            }
        })
    })
        .then((res) => {
            if (res.Status == 1) {
                message.success(successMessage)
            } else {
                message.warning(res.Message);
            }
        })
}

const nextPosition = (preLocation, position) => {
    let nextLocation = preLocation;
    switch (position) {
        case 'Left':
            switch (preLocation) {
                case 'left':
                    nextLocation = 'bottom';
                    break;
                case 'right':
                    nextLocation = 'top';
                    break;
                case 'top':
                    nextLocation = 'left';
                    break;
                case 'bottom':
                    nextLocation = 'right';
                    break;
            }
            break;
        case 'Right':
            switch (preLocation) {
                case 'left':
                    nextLocation = 'top';
                    break;
                case 'right':
                    nextLocation = 'bottom';
                    break;
                case 'top':
                    nextLocation = 'right';
                    break;
                case 'bottom':
                    nextLocation = 'bottom';
                    break;
            }
            break;
    }
    return nextLocation;
}

export {
    BASIC_NODE_DATA,
    UpdateNode,
    CreateNodeAsync,
    UpdateNodeAsync,
    GetNodeDetailAsync,
    SearchHistoryNodeAsync,
    GetNodeStyle,
    SaveWhiteBoard
}
