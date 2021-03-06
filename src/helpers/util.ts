import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';

export function isMultiRoots(): boolean {
  const folders = vscode.workspace.workspaceFolders;

  return (folders && folders.length > 1) ? true : false;
}

export function pathResolve(filePath: string) {
  if (isMultiRoots()) {
    return filePath;
  }

  const folders = vscode.workspace.workspaceFolders;
  if (folders && folders.length) {
    return path.resolve(folders[0].uri.fsPath, filePath);
  }
}


/**
 * Retrieve the relative folder path
 * @param value 
 */
export function getRelativeFolderPath(value: string): string {
  const wsFolder =  vscode.workspace.rootPath || "";
  let relativePath = value.replace(wsFolder, "");
  if (os.platform().startsWith('win')) {
    relativePath = relativePath.replace(/\\/g, '/');
  }
  return relativePath;
}


/**
 * Retrieve the absolute folder path
 * @param value 
 */
export function getAbsoluteFolderPath(value: string): string {
  const wsFolder = vscode.workspace.rootPath || "";
  return path.join(wsFolder, value);
} 