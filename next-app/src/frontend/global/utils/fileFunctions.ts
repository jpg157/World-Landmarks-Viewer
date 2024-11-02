import * as fs from 'fs';
import * as path from 'path';

export async function getFileList(routeFromRoot: string = ''): Promise<string[]> {

  const fileList = await fs.promises.readdir(path.join(process.cwd(), routeFromRoot));

  return fileList;
}
