/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin, ResSplitPlugin } from 'built-in';
import { WxgamePlugin } from './wxgame/wxgame';
import { CustomPlugin } from './CustomPlugin';
import * as defaultConfig from './config';
import { ResPlugin } from './resPlugin';

const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    // 压缩插件
                    new UglifyPlugin([
                        {
                            // 需要被压缩的文件
                            sources: [
                                "libs/modules/egret/egret.js",
                                "libs/modules/eui/eui.js",
                                "libs/modules/assetsmanager/assetsmanager.js",
                                "libs/modules/tween/tween.js",
                                "libs/modules/dragonBones/dragonBones.js",
                                "libs/modules/game/game.js",
                                "libs/modules/jszip/jszip.js",
                                "libs/modules/socket/socket.js",
                                "libs/modules/crypto-js/crypto-js.js",
                                "libs/modules/jsencrypt/jsencrypt.js",
                                "libs/modules/buffer/buffer.js",
                                "libs/modules/sproto/sproto.js",
                                "libs/modules/greensock/greensock.js",
                                "libs/modules/particle/particle.js",
                            ],
                            // 压缩后的文件
                            target: "lib.min.js"
                        }
                    ]),
                    // 压缩插件
                    new UglifyPlugin([
                        {
                            // 需要被压缩的文件
                            sources: [
                                "main.js",
                            ],
                            // 压缩后的文件
                            target: "main.min.js"
                        }
                    ]),
                    new ResPlugin(),
                    new ResSplitPlugin({
                        matchers: [
                            { from: "resource/**", to: `../${projectName}_wxgame_remote` }
                        ]
                    }),
                    new ManifestPlugin({ output: 'manifest.js' }),
                    new CustomPlugin()
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    new ManifestPlugin({ output: 'manifest.js' })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
