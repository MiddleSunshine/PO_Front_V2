import { Button, Divider, Form, InputNumber, Radio } from "antd";
import { CirclePicker, CompactPicker } from '@hello-pangea/color-picker'
import { useEffect, useState } from "react";
import { useReactFlow } from 'reactflow';
import { UpdateNode } from "./BasicNode";

const BASIC_SETTING = {
    backgroundColor: "",
    padding: "",
    maxHeight: 0,
    overflow: "auto",
    color: "black",
    fontSize: ""
}

const EditNode = ({ nodeProps }) => {

    const [settingsStyle, setSettingsStyle] = useState({
        ...BASIC_SETTING,
        ...nodeProps.data.settings?.style
    });

    const [saveIntoDataBase, setSaveIntoDataBase] = useState(nodeProps.data.save_into_database ? 'YES' : 'NO');
    const instance = useReactFlow();
    const handleSave = () => {
        let newNode = nodeProps;
        let newNodeSettingStyle = settingsStyle;
        if ((newNodeSettingStyle.maxHeight - 0) <= 0) {
            delete newNodeSettingStyle.maxHeight;
        }
        newNode.data.settings.style = newNodeSettingStyle;
        newNode.data.save_into_database = (saveIntoDataBase == 'YES');
        UpdateNode(instance, newNode);
        setSettingsStyle({})
        setSaveIntoDataBase('NO');
    }

    useEffect(() => {
        setSettingsStyle({
            ...BASIC_SETTING,
            ...nodeProps.data.settings?.style
        });
        setSaveIntoDataBase(nodeProps.data.save_into_database ? 'YES' : 'NO');
    }, [nodeProps])

    return (
        <div>
            <Form
                layout={"vertical"}
            >
                <Divider>
                    <Button
                        type={"primary"}
                        onClick={() => {
                            handleSave();
                        }}
                    >
                        Save
                    </Button>
                </Divider>
                <Form.Item
                    label={"Share Node"}
                >
                    <Radio.Group
                        value={saveIntoDataBase}
                        onChange={(event) => {
                            setSaveIntoDataBase(event.target.value);
                        }}
                    >
                        <Radio value={'YES'}>YES</Radio>
                        <Radio value={'NO'}>NO</Radio>
                    </Radio.Group>
                </Form.Item>
                <Divider>
                    <h5>Font</h5>
                </Divider>
                <Form.Item
                    label={"Font Color"}
                >
                    <CompactPicker
                        defaultColor={settingsStyle?.color}
                        onChange={(newValue) => {
                            setSettingsStyle({
                                ...settingsStyle,
                                color: newValue.hex
                            })
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={"Font Size"}
                >
                    <InputNumber
                        defaultValue={setSettingsStyle?.fontSize}
                        onChange={(newFontSize) => {
                            setSettingsStyle({
                                ...settingsStyle,
                                fontSize: newFontSize
                            })
                        }}
                        addonAfter="px"
                    />
                </Form.Item>
                <Divider>
                    <h5>Background</h5>
                </Divider>
                <Form.Item
                    label={"Background Color"}
                >
                    <CirclePicker
                        defaultColor={settingsStyle.backgroundColor}
                        onChange={(newValue) => {
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
                        onChange={(newPadding) => {
                            setSettingsStyle({
                                ...settingsStyle,
                                padding: newPadding
                            })
                        }}
                        addonAfter="px"
                    />
                </Form.Item>
                <Form.Item
                    label={"Max Height"}
                >
                    <InputNumber
                        value={settingsStyle.maxHeight}
                        onChange={(newValue) => {
                            if (!newValue) {
                                newValue = 0;
                            }
                            setSettingsStyle({
                                ...settingsStyle,
                                maxHeight: newValue
                            })
                        }}
                        addonAfter="px"
                    />
                </Form.Item>
                <Form.Item
                    label={"Over Size"}
                >
                    <Radio.Group
                        value={settingsStyle.overflow}
                        onChange={(event) => {
                            setSettingsStyle({
                                ...settingsStyle,
                                overflow: event.target.value
                            });
                        }}
                    >
                        <Radio value={"auto"}>Auto</Radio>
                        <Radio value={"scroll"}>Scroll</Radio>
                        <Radio value={"hidden"}>Hidden</Radio>
                        <Radio value={"visible"}>Visible</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </div>
    )
}

export { EditNode }