import {useState} from "react";
import {Button, Col, Input, Row} from "antd";


const DirectoryNode=(nodeProps)=>{
    const [nodeData,setNodeData]=useState(nodeProps.node_data);
    return (
        <div>
            {
                nodeData?.nodes.map((n)=>{
                    return (
                        <Row>
                            <Col
                                offset={n.node_data.offset}
                                span={1}
                            >

                            </Col>
                            <Col span={23-n.node_data.offset}>
                                <Input
                                    value={n.data.Title}
                                    addonAfter={()=>{
                                        return (
                                            <div>
                                                <Button
                                                    size={"small"}
                                                    type={"link"}
                                                >
                                                </Button>
                                                <Button
                                                    type={"link"}
                                                    size={"small"}
                                                >

                                                </Button>
                                            </div>
                                        )
                                    }}
                                    addonBefore={()=>{
                                        return (
                                            <div>
                                                <Button
                                                    type={"link"}
                                                    size={"small"}
                                                >
                                                </Button>
                                                <Button
                                                    type={"link"}
                                                    size={"small"}
                                                >
                                                </Button>
                                            </div>
                                        )
                                    }}
                                />
                            </Col>
                        </Row>
                    )
                })
            }
        </div>
    )
}

export {
    DirectoryNode
}

/**
 * nodeProps={
 *     node_data:{
 *         nodes:[
 *             {
 *                 node_data:{
 *                     offset:""
 *                 },
 *                 data:{
 *                     Title:""
 *                 }
 *             }
 *         ]
 *     },
 *     data:{}
 * }
 *
 */

