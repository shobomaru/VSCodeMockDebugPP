'use strict';

import * as vscode from 'vscode';

const initialConfigurations = {
	version: '0.2.0',
	configurations: [
	{
		type: 'mockpp',
		request: 'launch',
		name: 'Mock++Debug',
		program: '${workspaceRoot}/${command.AskForProgramName}',
		stopOnEntry: true
	}
]}

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.mock++debug.getProgramName', config => {
		return vscode.window.showInputBox({
			placeHolder: "Please enter the name of a text file in the workspace folder",
			value: "readme.md"
		});
	});
	context.subscriptions.push(disposable);

	context.subscriptions.push(vscode.commands.registerCommand('extension.mock++debug.provideInitialConfigurations', () => {
		return [
			'// Use IntelliSense to learn about possible Mock debug attributes.',
			'// Hover to view descriptions of existing attributes.',
			JSON.stringify(initialConfigurations, null, '\t')
		].join('\n');
	}));
}

export function deactivate() {
}
