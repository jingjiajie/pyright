/*
 * fakeFileSystem.ts
 *
 * simulate real fs access.
 */

import { ConsoleInterface } from 'pyright-internal/common/console';
import { FileSystem } from 'pyright-internal/common/fileSystem';
import { directoryExists, getDirectoryPath } from 'pyright-internal/common/pathUtils';
import { TestFileSystem } from 'pyright-internal/tests/harness/vfs/filesystem';

import { FileWatcherProvider } from 'pyright-internal/common/fileWatcher';
import { UriEx } from 'pyright-internal/common/uri/uriUtils';
import { typeShed } from './typeShed';

export function createFromRealFileSystem(
    console?: ConsoleInterface,
    fileWatcherProvider?: FileWatcherProvider
): FileSystem {
    const fs = new TestFileSystem(false, { cwd: '/' });

    // install builtin types
    for (const entry of typeShed) {
        const dir = getDirectoryPath(entry.filePath);
        if (!directoryExists(fs, dir)) {
            fs.mkdirpSync(dir);
        }
        fs.writeFileSync(UriEx.parse(entry.filePath), entry.content);
    }

    return fs;
}
