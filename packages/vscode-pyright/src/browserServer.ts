/*
 * browserServer.ts
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT license.
 *
 * Implements utilities for starting the language server in a web worker environment.
 */

import { Connection } from 'vscode-languageserver';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser';

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

export function run(runServer: (connection: Connection) => void) {
    runServer(createConnection(messageReader, messageWriter));
}
