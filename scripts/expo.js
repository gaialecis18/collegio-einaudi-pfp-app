#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const minimumNode = [20, 19, 4];

function parseVersion(version) {
  return version.replace(/^v/, '').split('.').map((part) => Number(part));
}

function isSupportedNode(version) {
  const parts = parseVersion(version);

  for (let index = 0; index < minimumNode.length; index += 1) {
    if ((parts[index] || 0) > minimumNode[index]) {
      return true;
    }

    if ((parts[index] || 0) < minimumNode[index]) {
      return false;
    }
  }

  return true;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function canExecute(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function isSameExecutable(left, right) {
  try {
    return fs.realpathSync(left) === fs.realpathSync(right);
  } catch {
    return path.resolve(left) === path.resolve(right);
  }
}

function getNodeVersion(nodePath) {
  const result = spawnSync(nodePath, ['-e', 'process.stdout.write(process.versions.node)'], {
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    return null;
  }

  return result.stdout.trim();
}

function getNodeCandidates() {
  const pathCandidates = (process.env.PATH || '')
    .split(path.delimiter)
    .map((directory) => path.join(directory, 'node'));

  return unique([
    process.env.EXPO_NODE,
    ...pathCandidates,
    '/opt/homebrew/bin/node',
    '/usr/local/bin/node',
  ]).filter((nodePath) => canExecute(nodePath) && !isSameExecutable(nodePath, process.execPath));
}

function findSupportedNode() {
  if (isSupportedNode(process.versions.node)) {
    return process.execPath;
  }

  for (const nodePath of getNodeCandidates()) {
    const version = getNodeVersion(nodePath);

    if (version && isSupportedNode(version)) {
      return nodePath;
    }
  }

  return null;
}

const nodePath = findSupportedNode();

if (!nodePath) {
  console.error(
    `Expo SDK 54 requires Node ${minimumNode.join('.')} or newer. ` +
      `This terminal is using Node ${process.versions.node}. ` +
      'Install/use Node 20, or set EXPO_NODE=/path/to/node before running npm scripts.'
  );
  process.exit(1);
}

const expoCli = require.resolve('expo/bin/cli');
const nodeDirectory = path.dirname(nodePath);
const result = spawnSync(nodePath, [expoCli, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PATH: `${nodeDirectory}${path.delimiter}${process.env.PATH || ''}`,
  },
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(typeof result.status === 'number' ? result.status : 1);
