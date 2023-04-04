import {Button, Form, InputNumber, Radio} from "antd";
import {CirclePicker} from '@hello-pangea/color-picker'
import {useEffect, useState} from "react";
import { useReactFlow } from 'reactflow';
import {UpdateNode} from "./BasicNode";

const BASIC_SETTING={
    backgroundColor:"",
    padding:""
}

const EditNode=({nodeProps})=>{

    const [settingsStyle,setSettingsStyle]=useState({
        ...BASIC_SETTING,
        ...nodeProps.data.settings?.style
    });

    const [saveIntoDataBase,setSaveIntoDataBase]=useState(nodeProps.data.save_into_database?'YES':'NO');
    const instance=useReactFlow();
    const handleSave=()=>{
        let newNode=nodeProps;
        newNode.data.settings.style=settingsStyle;
        newNode.data.save_into_database=(saveIntoDataBase=='YES');
        UpdateNode(instance,newNode);
        setSettingsStyle({})
        setSaveIntoDataBase('NO');
    }

    useEffect(()=>{
        setSettingsStyle({
            ...BASIC_SETTING,
            ...nodeProps.data.settings?.style
        });
        setSaveIntoDataBase(nodeProps.data.save_into_database?'YES':'NO');
    },[nodeProps])

    return (
        <div>
            <Form
                layout={"vertical"}
            >
                <Form.Item
                    label={"Option"}
                >
                    <Button
                        type={"primary"}
                        onClick={()=>{
                            handleSave();
                        }}
                    >
                        Save
                    </Button>
                </Form.Item>
                <Form.Item
                    label={"Share Node"}
                >
                    <Radio.Group
                        value={saveIntoDataBase}
                        onChange={(newValue)=>{
                            setSaveIntoDataBase(newValue);
                        }}
                    >
                        <Radio value={'YES'}>YES</Radio>
                        <Radio value={'NO'}>NO</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label={"Background Color"}
                >
                    <CirclePicker
                        defaultColor={settingsStyle.backgroundColor}
                        onChange={(newValue)=>{
                            setSettingsStyle({
                                ...settingsStyle,
                                backgroundColor: newValue.hex
                            })
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={"Padding"}
                >
                    <InputNumber
                        value={settingsStyle.padding}
                        onChange={(newPadding)=>{
                            setSettingsStyle({
                                ...settingsStyle,
                                padding: newPadding
                            })
                        }}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}

export {EditNode}