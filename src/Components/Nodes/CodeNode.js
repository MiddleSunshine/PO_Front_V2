import {useCallback, useState} from "react";
import {NodeResizer} from "@reactflow/node-resizer";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {NodeToolbar} from "reactflow";
import {Button, Form, Modal, Select} from "antd";
import ReactCodeMirror from "@uiw/react-codemirror";
import {useReactFlow} from 'reactflow';
import {GetNodeStyle, UpdateNode} from "./BasicNode";
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SUPPORT_LANUAGE=[
    { value: 'oneC (1c)', label: 'ONEC (1C)' },
    { value: 'abnf', label: 'ABNF' },
    { value: 'accesslog', label: 'ACCESSLOG' },
    { value: 'actionscript', label: 'ACTIONSCRIPT' },
    { value: 'ada', label: 'ADA' },
    { value: 'angelscript', label: 'ANGELSCRIPT' },
    { value: 'apache', label: 'APACHE' },
    { value: 'applescript', label: 'APPLESCRIPT' },
    { value: 'arcade', label: 'ARCADE' },
    { value: 'arduino', label: 'ARDUINO' },
    { value: 'armasm', label: 'ARMASM' },
    { value: 'asciidoc', label: 'ASCIIDOC' },
    { value: 'aspectj', label: 'ASPECTJ' },
    { value: 'autohotkey', label: 'AUTOHOTKEY' },
    { value: 'autoit', label: 'AUTOIT' },
    { value: 'avrasm', label: 'AVRASM' },
    { value: 'awk', label: 'AWK' },
    { value: 'axapta', label: 'AXAPTA' },
    { value: 'bash', label: 'BASH' },
    { value: 'basic', label: 'BASIC' },
    { value: 'bnf', label: 'BNF' },
    { value: 'brainfuck', label: 'BRAINFUCK' },
    { value: 'cLike (c-like)', label: 'CLIKE (C-LIKE)' },
    { value: 'c', label: 'C' },
    { value: 'cal', label: 'CAL' },
    { value: 'capnproto', label: 'CAPNPROTO' },
    { value: 'ceylon', label: 'CEYLON' },
    { value: 'clean', label: 'CLEAN' },
    { value: 'clojureRepl (clojure-repl)', label: 'CLOJUREREPL (CLOJURE-REPL)' },
    { value: 'clojure', label: 'CLOJURE' },
    { value: 'cmake', label: 'CMAKE' },
    { value: 'coffeescript', label: 'COFFEESCRIPT' },
    { value: 'coq', label: 'COQ' },
    { value: 'cos', label: 'COS' },
    { value: 'cpp', label: 'CPP' },
    { value: 'crmsh', label: 'CRMSH' },
    { value: 'crystal', label: 'CRYSTAL' },
    { value: 'csharp', label: 'CSHARP' },
    { value: 'csp', label: 'CSP' },
    { value: 'css', label: 'CSS' },
    { value: 'd', label: 'D' },
    { value: 'dart', label: 'DART' },
    { value: 'delphi', label: 'DELPHI' },
    { value: 'diff', label: 'DIFF' },
    { value: 'django', label: 'DJANGO' },
    { value: 'dns', label: 'DNS' },
    { value: 'dockerfile', label: 'DOCKERFILE' },
    { value: 'dos', label: 'DOS' },
    { value: 'dsconfig', label: 'DSCONFIG' },
    { value: 'dts', label: 'DTS' },
    { value: 'dust', label: 'DUST' },
    { value: 'ebnf', label: 'EBNF' },
    { value: 'elixir', label: 'ELIXIR' },
    { value: 'elm', label: 'ELM' },
    { value: 'erb', label: 'ERB' },
    { value: 'erlangRepl (erlang-repl)', label: 'ERLANGREPL (ERLANG-REPL)' },
    { value: 'erlang', label: 'ERLANG' },
    { value: 'excel', label: 'EXCEL' },
    { value: 'fix', label: 'FIX' },
    { value: 'flix', label: 'FLIX' },
    { value: 'fortran', label: 'FORTRAN' },
    { value: 'fsharp', label: 'FSHARP' },
    { value: 'gams', label: 'GAMS' },
    { value: 'gauss', label: 'GAUSS' },
    { value: 'gcode', label: 'GCODE' },
    { value: 'gherkin', label: 'GHERKIN' },
    { value: 'glsl', label: 'GLSL' },
    { value: 'gml', label: 'GML' },
    { value: 'go', label: 'GO' },
    { value: 'golo', label: 'GOLO' },
    { value: 'gradle', label: 'GRADLE' },
    { value: 'groovy', label: 'GROOVY' },
    { value: 'haml', label: 'HAML' },
    { value: 'handlebars', label: 'HANDLEBARS' },
    { value: 'haskell', label: 'HASKELL' },
    { value: 'haxe', label: 'HAXE' },
    { value: 'hsp', label: 'HSP' },
    { value: 'htmlbars', label: 'HTMLBARS' },
    { value: 'http', label: 'HTTP' },
    { value: 'hy', label: 'HY' },
    { value: 'inform7', label: 'INFORM7' },
    { value: 'ini', label: 'INI' },
    { value: 'irpf90', label: 'IRPF90' },
    { value: 'isbl', label: 'ISBL' },
    { value: 'java', label: 'JAVA' },
    { value: 'javascript', label: 'JAVASCRIPT' },
    { value: 'jbossCli (jboss-cli)', label: 'JBOSSCLI (JBOSS-CLI)' },
    { value: 'json', label: 'JSON' },
    { value: 'juliaRepl (julia-repl)', label: 'JULIAREPL (JULIA-REPL)' },
    { value: 'julia', label: 'JULIA' },
    { value: 'kotlin', label: 'KOTLIN' },
    { value: 'lasso', label: 'LASSO' },
    { value: 'latex', label: 'LATEX' },
    { value: 'ldif', label: 'LDIF' },
    { value: 'leaf', label: 'LEAF' },
    { value: 'less', label: 'LESS' },
    { value: 'lisp', label: 'LISP' },
    { value: 'livecodeserver', label: 'LIVECODESERVER' },
    { value: 'livescript', label: 'LIVESCRIPT' },
    { value: 'llvm', label: 'LLVM' },
    { value: 'lsl', label: 'LSL' },
    { value: 'lua', label: 'LUA' },
    { value: 'makefile', label: 'MAKEFILE' },
    { value: 'markdown', label: 'MARKDOWN' },
    { value: 'mathematica', label: 'MATHEMATICA' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'maxima', label: 'MAXIMA' },
    { value: 'mel', label: 'MEL' },
    { value: 'mercury', label: 'MERCURY' },
    { value: 'mipsasm', label: 'MIPSASM' },
    { value: 'mizar', label: 'MIZAR' },
    { value: 'mojolicious', label: 'MOJOLICIOUS' },
    { value: 'monkey', label: 'MONKEY' },
    { value: 'moonscript', label: 'MOONSCRIPT' },
    { value: 'n1ql', label: 'N1QL' },
    { value: 'nginx', label: 'NGINX' },
    { value: 'nim', label: 'NIM' },
    { value: 'nix', label: 'NIX' },
    { value: 'nodeRepl (node-repl)', label: 'NODEREPL (NODE-REPL)' },
    { value: 'nsis', label: 'NSIS' },
    { value: 'objectivec', label: 'OBJECTIVEC' },
    { value: 'ocaml', label: 'OCAML' },
    { value: 'openscad', label: 'OPENSCAD' },
    { value: 'oxygene', label: 'OXYGENE' },
    { value: 'parser3', label: 'PARSER3' },
    { value: 'perl', label: 'PERL' },
    { value: 'pf', label: 'PF' },
    { value: 'pgsql', label: 'PGSQL' },
    { value: 'phpTemplate (php-template)', label: 'PHPTEMPLATE (PHP-TEMPLATE)' },
    { value: 'php', label: 'PHP' },
    { value: 'plaintext', label: 'PLAINTEXT' },
    { value: 'pony', label: 'PONY' },
    { value: 'powershell', label: 'POWERSHELL' },
    { value: 'processing', label: 'PROCESSING' },
    { value: 'profile', label: 'PROFILE' },
    { value: 'prolog', label: 'PROLOG' },
    { value: 'properties', label: 'PROPERTIES' },
    { value: 'protobuf', label: 'PROTOBUF' },
    { value: 'puppet', label: 'PUPPET' },
    { value: 'purebasic', label: 'PUREBASIC' },
    { value: 'pythonRepl (python-repl)', label: 'PYTHONREPL (PYTHON-REPL)' },
    { value: 'python', label: 'PYTHON' },
    { value: 'q', label: 'Q' },
    { value: 'qml', label: 'QML' },
    { value: 'r', label: 'R' },
    { value: 'reasonml', label: 'REASONML' },
    { value: 'rib', label: 'RIB' },
    { value: 'roboconf', label: 'ROBOCONF' },
    { value: 'routeros', label: 'ROUTEROS' },
    { value: 'rsl', label: 'RSL' },
    { value: 'ruby', label: 'RUBY' },
    { value: 'ruleslanguage', label: 'RULESLANGUAGE' },
    { value: 'rust', label: 'RUST' },
    { value: 'sas', label: 'SAS' },
    { value: 'scala', label: 'SCALA' },
    { value: 'scheme', label: 'SCHEME' },
    { value: 'scilab', label: 'SCILAB' },
    { value: 'scss', label: 'SCSS' },
    { value: 'shell', label: 'SHELL' },
    { value: 'smali', label: 'SMALI' },
    { value: 'smalltalk', label: 'SMALLTALK' },
    { value: 'sml', label: 'SML' },
    { value: 'sqf', label: 'SQF' },
    { value: 'sql', label: 'SQL' },
    { value: 'sqlMore (sql_more)', label: 'SQLMORE (SQL_MORE)' },
    { value: 'stan', label: 'STAN' },
    { value: 'stata', label: 'STATA' },
    { value: 'step21', label: 'STEP21' },
    { value: 'stylus', label: 'STYLUS' },
    { value: 'subunit', label: 'SUBUNIT' },
    { value: 'swift', label: 'SWIFT' },
    { value: 'taggerscript', label: 'TAGGERSCRIPT' },
    { value: 'tap', label: 'TAP' },
    { value: 'tcl', label: 'TCL' },
    { value: 'thrift', label: 'THRIFT' },
    { value: 'tp', label: 'TP' },
    { value: 'twig', label: 'TWIG' },
    { value: 'typescript', label: 'TYPESCRIPT' },
    { value: 'vala', label: 'VALA' },
    { value: 'vbnet', label: 'VBNET' },
    { value: 'vbscriptHtml (vbscript-html)', label: 'VBSCRIPTHTML (VBSCRIPT-HTML)' },
    { value: 'vbscript', label: 'VBSCRIPT' },
    { value: 'verilog', label: 'VERILOG' },
    { value: 'vhdl', label: 'VHDL' },
    { value: 'vim', label: 'VIM' },
    { value: 'x86asm', label: 'X86ASM' },
    { value: 'xl', label: 'XL' },
    { value: 'xml', label: 'XML' },
    { value: 'xquery', label: 'XQUERY' },
    { value: 'yaml', label: 'YAML' },
    { value: 'zephir', label: 'ZEPHIR' }
];

const CodeNode=(nodeProps)=>{

    const [nodeData,setNodeData]=useState(nodeProps.data.node_data);
    const [editCode,setEditCode]=useState(false);

    const instance=useReactFlow();

    const handleSave=()=>{
        let newNode=nodeProps;
        newNode.data.node_data=nodeData;
        UpdateNode(instance,newNode);
    }



    return (
        <div
            className={"CodeNode"}
            style={GetNodeStyle(nodeProps)}
        >
            <NodeResizer
                isVisible={nodeProps.selected}
            />
            <NodeToolbar>
                <Button
                    type={"primary"}
                    onClick={()=>{
                        setEditCode(true);
                    }}
                >
                    Setting ({nodeData.language})
                </Button>
            </NodeToolbar>
            {
                nodeData.language
                    ?<SyntaxHighlighter
                        language={nodeData.language}
                        showLineNumbers={true}
                        wrapLongLines={true}
                        style={monokaiSublime}
                    >
                        {nodeData.code}
                    </SyntaxHighlighter>
                    :<div>
                        <h3>Coding</h3>
                    </div>
            }
            <Modal
                width={1200}
                open={editCode}
                onCancel={()=>{
                    setEditCode(false);
                }}
                onOk={()=>{
                    setEditCode(false);
                    handleSave();
                }}
            >
                <Form
                    layout={"vertical"}
                >
                    <Form.Item
                        label={"Language"}
                    >
                        <Select
                            options={SUPPORT_LANUAGE}
                            showSearch={true}
                            value={nodeData.language}
                            onChange={(newValue)=>{
                                setNodeData({
                                    ...nodeData,
                                    language:newValue
                                })
                            }}
                            allowClear={true}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"Code"}
                    >
                        <ReactCodeMirror
                            theme={"dark"}
                            value={nodeData.code}
                            onChange={(newCode)=>{
                                setNodeData({
                                    ...nodeData,
                                    code:newCode
                                })
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export {
    CodeNode
}
