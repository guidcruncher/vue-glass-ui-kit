import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'
import * as diff from 'diff'

const scssCommentRegex: RegExp = /(\/\/.*)|(\/\*(?:(?!\!|\n)[\s\S])*?\*\/)/g

const jsTsCommentRegex: RegExp = /(\/\/.*)|(\/\*[\s\S]*?\*\/)/g

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let acceptAll: boolean = false

function writeFile(filePath: string, newContent: string): void {
  try {
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`✅ File SAVED: ${filePath}`)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`❌ Error writing file ${filePath}: ${message}`)
  }
}

function confirmAndWrite(
  filePath: string,
  originalContent: string,
  newContent: string,
): Promise<void> {
  return new Promise((resolve) => {
    if (originalContent === newContent) {
      console.log(`- No changes needed for: ${filePath}`)
      return resolve()
    }

    if (acceptAll) {
      console.log(`(Auto-Accept) Applying changes to: ${filePath}`)
      writeFile(filePath, newContent)
      return resolve()
    }

    console.log(
      `\n================================================================================`,
    )
    console.log(`Changes detected for: **${filePath}**`)
    console.log(`--------------------------------------------------------------------------------`)

    const differences: string = diff.createPatch(
      path.basename(filePath),
      originalContent,
      newContent,
    )

    console.log(differences.split('\n').slice(4).join('\n'))

    console.log(
      `\n--------------------------------------------------------------------------------`,
    )

    rl.question('Apply these changes? (y/n/a for accept all/q for quit): ', (answer: string) => {
      const lowerAnswer = answer.toLowerCase()

      if (lowerAnswer === 'y') {
        writeFile(filePath, newContent)
        resolve()
      } else if (lowerAnswer === 'a') {
        acceptAll = true
        console.log('➡️ ACCEPT ALL enabled. Remaining files will be processed automatically.')
        writeFile(filePath, newContent)
        resolve()
      } else if (lowerAnswer === 'q') {
        console.log('🛑 Script quit by user.')
        rl.close()
        process.exit(0)
      } else {
        console.log(`⏭️ File SKIPPED: ${filePath}`)
        resolve()
      }
    })
  })
}

function findFiles(dir: string, extensions: string[]): string[] {
  let results: string[] = []
  const files: string[] = fs.readdirSync(dir)

  for (const file of files) {
    const filePath: string = path.join(dir, file)
    const stat: fs.Stats = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (file !== 'node_modules') {
        results = results.concat(findFiles(filePath, extensions))
      }
    } else if (extensions.includes(path.extname(file))) {
      results.push(filePath)
    }
  }
  return results
}

async function processFile(filePath: string, regex: RegExp): Promise<void> {
  try {
    const originalContent: string = fs.readFileSync(filePath, 'utf8')

    const newContent: string = originalContent.replace(
      regex,
      (match: string, p1: string, p2: string) => {
        if (p1) return ''

        if (p2) return ''
        return ''
      },
    )

    await confirmAndWrite(filePath, originalContent, newContent)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`❌ Error reading file ${filePath}: ${message}`)
  }
}

async function processVueFile(filePath: string): Promise<void> {
  try {
    const originalContent: string = fs.readFileSync(filePath, 'utf8')

    const scriptBlockRegex: RegExp = /(<script[^>]*>)([\s\S]*?)(<\/script>)/g

    const updatedContent: string = originalContent.replace(
      scriptBlockRegex,
      (match: string, openTag: string, scriptContent: string, closeTag: string) => {
        const cleanedScriptContent: string = scriptContent.replace(jsTsCommentRegex, '')
        return `${openTag}${cleanedScriptContent}${closeTag}`
      },
    )

    await confirmAndWrite(filePath, originalContent, updatedContent)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`❌ Error processing .vue file ${filePath}: ${message}`)
  }
}

async function main(): Promise<void> {
  console.log('--- Starting Interactive Comment Removal Script (TypeScript) ---')
  const targetDir: string = path.resolve(process.cwd())
  const excludedFilename: string = 'remove-comments-confirm.ts'

  const scssFiles: string[] = findFiles(targetDir, ['.scss'])
  let jsTsFiles: string[] = findFiles(targetDir, ['.vue', '.ts'])

  jsTsFiles = jsTsFiles.filter((filePath) => {
    const isExcluded = path.basename(filePath) === excludedFilename
    if (isExcluded) {
      console.log(`\n🔒 Excluding script file from processing: ${filePath}`)
    }
    return !isExcluded
  })

  console.log('\nProcessing .scss files...')
  for (const file of scssFiles) {
    await processFile(file, scssCommentRegex)
  }

  console.log('\nProcessing .vue and .ts files...')
  for (const file of jsTsFiles) {
    const ext: string = path.extname(file)
    if (ext === '.ts') {
      await processFile(file, jsTsCommentRegex)
    } else if (ext === '.vue') {
      await processVueFile(file)
    }
  }

  if (!rl.closed) {
    rl.close()
  }
  console.log('\n--- Interactive Comment Removal Complete ---')
}

main()
