import * as core from '@actions/core'
import * as io from '@actions/io'
import * as tc from '@actions/tool-cache'
import * as os from 'node:os'
import * as path from 'node:path'
import * as process from 'node:process'
import { fileURLToPath } from 'node:url'
import { HttpClient } from '@actions/http-client'

const c = new HttpClient('wasm-pack-action')

export async function findVersionLatest(): Promise<string> {
  core.info('Searching the latest version of wasm-pack ...')
  const response = await c.get(
    'https://api.github.com/repos/rustwasm/wasm-pack/releases/latest'
  )
  const body = await response.readBody()
  return Promise.resolve(JSON.parse(body).tag_name || 'v0.15.0')
}

export async function findVersion(): Promise<string> {
  const version: string = core.getInput('version')
  if (version === 'latest' || version === null || version === undefined) {
    return await findVersionLatest()
  }
  return Promise.resolve(version)
}

export async function run(): Promise<void> {
  const tempFolder = path.join(os.tmpdir(), 'setup-wasm-pack')
  await io.mkdirP(tempFolder)

  try {
    const version = await findVersion()
    core.info(`Installing wasm-pack ${version} ...`)
    const platform = process.env['PLATFORM'] || process.platform
    core.debug(platform)

    let ext = ''
    let arch = ''
    switch (platform) {
      case 'win32':
        ext = '.exe'
        arch = 'x86_64-pc-windows-msvc'
        break
      case 'darwin':
        arch = 'x86_64-apple-darwin'
        break
      case 'linux':
        arch = 'x86_64-unknown-linux-musl'
        break
      default:
        core.setFailed(`Unsupported platform: ${platform}`)
        return
    }
    const archive = `wasm-pack-${version}-${arch}`
    const url = `https://github.com/rustwasm/wasm-pack/releases/download/${version}/${archive}.tar.gz`
    core.info(`Downloading wasm-pack from ${url} ...`)
    const downloadArchive = await tc.downloadTool(url)
    core.info(`Extracting wasm-pack to ${tempFolder} ...`)
    const extractedFolder = await tc.extractTar(downloadArchive, tempFolder)
    const execFolder = path.join(os.homedir(), '.cargo', 'bin')
    await io.mkdirP(execFolder)
    const exec = `wasm-pack${ext}`
    const execPath = path.join(execFolder, exec)
    await io.mv(path.join(extractedFolder, archive, exec), execPath)
    await io.rmRF(path.join(extractedFolder, archive))
    core.info(`Installed wasm-pack to ${execPath} 🎉`)
  } catch (error: any) {
    core.setFailed(error.message)
  } finally {
    io.rmRF(tempFolder)
  }
}

if (
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1])
) {
  run().then(
    () => core.info('Done'),
    (err) => core.error(err)
  )
}
