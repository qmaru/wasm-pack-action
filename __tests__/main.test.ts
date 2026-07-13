import * as process from 'node:process'
import * as path from 'node:path'
import * as os from 'node:os'
import { pathToFileURL } from 'node:url'

test('loads the compiled ESM module and resolves a fixed version', async () => {
  process.env['RUNNER_TEMP'] = os.tmpdir()
  process.env['INPUT_VERSION'] = 'v0.15.0'
  const modulePath = path.join(process.cwd(), 'lib', 'main.js')
  const { findVersion } = await import(pathToFileURL(modulePath).href)

  await expect(findVersion()).resolves.toBe('v0.15.0')
})
