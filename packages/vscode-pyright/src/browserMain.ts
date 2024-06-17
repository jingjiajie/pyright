/*
 * browserMain.ts
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT license.
 *
 * Provides the main entrypoint to the server when running in browser.
 */

import { PyrightServer } from 'pyright-internal/server';

import { run } from './browserServer';

function main() {
    run((conn) => new PyrightServer(conn, 1));
}
main();
