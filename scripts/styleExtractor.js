/**
 * Vue Component Style Extractor and Refactor Script (Updated for @use)
 *
 * This script finds all .vue files, extracts the content of ANY <style> block,
 * saves it to a separate .scss file in an output directory, or migrates pre-existing
 * @import directives to @use if the style block contains no actual styles.
 */
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// --- CONFIGURATION LOADING ---

// Default Configuration (using camelCase)
const DEFAULT_CONFIG = {
  // Root directory to search for .vue files (relative to this script's location)
  sourceDir: '../src/components',
  // Directory where the extracted .scss files will be saved (relative to this script's location)
  outputDir: '../src/styles/components',
  // IMPORTANT: Define the import path alias used in the replacement.
  styleAliasRoot: '@/styles/components',
  // Name of the config file to load
  configFile: 'styleExtractor.config.json',
  // Array of component file names (e.g., 'BaseLayout.vue') to exclude from processing.
  excludeFiles: [],
}

let CONFIG = { ...DEFAULT_CONFIG } // Start with defaults

/**
 * Loads configuration from a JSON file and merges it with defaults.
 */
function loadConfig() {
  const appRoot = process.env.PWD
  const configPath = path.resolve(appRoot, CONFIG.configFile)
  console.log(`Lookingfor config ${configPath}`)

  if (fs.existsSync(configPath)) {
    try {
      console.log(`Reading config ${configPath}`)
      const fileContent = fs.readFileSync(configPath, 'utf8')
      const userConfig = JSON.parse(fileContent)

      // Function to convert SNAKE_CASE/kebab-case/TitleCase keys from JSON to camelCase
      const toCamelCase = (str) => {
        return str.replace(/([-_]\w)/g, (match) => match[1].toUpperCase())
      }

      // Convert userConfig keys to camelCase for merge
      const processedUserConfig = Object.keys(userConfig).reduce((acc, key) => {
        acc[toCamelCase(key)] = userConfig[key]
        return acc
      }, {})

      // Merge user config with defaults, explicitly handling the array to ensure integrity
      CONFIG = {
        ...DEFAULT_CONFIG,
        ...processedUserConfig,
        excludeFiles: Array.isArray(processedUserConfig.excludeFiles)
          ? processedUserConfig.excludeFiles
          : DEFAULT_CONFIG.excludeFiles,
      }

      console.log(`Loaded configuration from: ${CONFIG.configFile}`)
    } catch (error) {
      console.error(
        `[ERROR] Failed to load or parse config file ${CONFIG.configFile}. Using default configuration. Error: ${error.message}`,
      )
    }
  } else {
    console.log(`Configuration file ${CONFIG.configFile} not found. Using default configuration.`)
  }

  // Resolve relative paths based on the script's location (using new camelCase names)
  CONFIG.sourceDirFull = path.resolve(__dirname, CONFIG.sourceDir)
  CONFIG.outputDirFull = path.resolve(__dirname, CONFIG.outputDir)
}

// --- CONSTANTS (now based on CONFIG) ---

// Regex to find ANY <style> block
// Captures 1: Full opening tag (e.g., <style scoped>)
// Captures 2: The raw attributes string (e.g., scoped lang="css")
// Captures 3: The style content
// Captures 4: The closing tag (</style>)
const STYLE_REGEX = /(<style\s*([^>]*?)>)\s*([\s\S]*?)\s*(<\/style>)/i

// --- UTILITIES ---

/**
 * Recursively finds all files with a given extension in a directory.
 */
function walkDir(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      walkDir(filePath, ext, fileList)
    } else if (file.endsWith(ext)) {
      fileList.push(filePath)
    }
  })
  return fileList
}

/**
 * Processes a single .vue file: extracts styles, saves new SCSS, and refactors component.
 * @param {string} filePath Path to the .vue file.
 */
function processVueFile(filePath) {
  const componentName = path.basename(filePath, '.vue')
  const scssFileName = `${componentName}.scss`
  // Use the resolved full path from the configuration
  const scssFilePath = path.join(CONFIG.outputDirFull, scssFileName)

  // Check for exclusion (using new camelCase name)
  const fileName = path.basename(filePath)
  if (CONFIG.excludeFiles.includes(fileName)) {
    console.log(`[EXCLUDE] Skipping file listed in excludeFiles: ${fileName}`)
    return
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8')
    const match = content.match(STYLE_REGEX)

    if (!match) {
      console.log(`[SKIP] No style block found in: ${componentName}`)
      return
    }

    // Destructure regex captures
    const [fullBlock, , attributesStr, styleContent, closingTag] = match
    const trimmedContent = styleContent.trim()

    // 1. CHECK FOR DIRECTIVE-ONLY CONTENT
    const lines = trimmedContent.split('\n')
    const nonDirectiveLines = lines.filter((line) => {
      const cleanedLine = line.trim()
      if (cleanedLine.length === 0) return false // Ignore empty lines

      // Ignore lines that are SASS directives (@use or @import)
      if (cleanedLine.startsWith('@use')) return false
      if (cleanedLine.startsWith('@import')) return false

      // Ignore comments
      if (cleanedLine.startsWith('//')) return false
      if (cleanedLine.startsWith('/*') && cleanedLine.endsWith('*/')) return false

      return true // Keep any line that contains actual style rules or variables
    })

    // 2. SCENARIO A: Style block contains only directives (@import, @use, comments)
    if (nonDirectiveLines.length === 0 && trimmedContent.length > 0) {
      // Check if it contains @import directives that need migration
      const importRegexTest = /@import\s+("([^"]+)"|'([^']+)')/i

      if (importRegexTest.test(trimmedContent)) {
        console.log(
          `[MIGRATE] Migrating @import to @use in directive-only block for: ${componentName}.vue`,
        )

        // a. Clean up the existing attributes string: remove lang/type attributes
        let cleanedAttributes = attributesStr
          .replace(/\s*(lang|type)=["']([^"']+)["']\s*/gi, ' ')
          .trim()

        // b. Create the new <style> block opening tag (ensuring lang="scss")
        const styleAttributes = cleanedAttributes ? ` ${cleanedAttributes}` : ''
        const newOpeningTag = `<style lang="scss"${styleAttributes}>`

        // c. Replace all @import "path" with @use "clean_path" as *;
        // Group 1: The full path in quotes
        // Group 2/3: The path without quotes
        const importRegexReplace = /@import\s+("([^"]+)"|'([^']+)')\s*;/gi

        let newDirectiveContent = trimmedContent.replace(
          importRegexReplace,
          (match, p1, p2, p3) => {
            const path = p2 || p3 // The captured path

            // Transformation logic to adhere to modern SASS rules
            let usePath = path
              .replace(/\.(scss|sass)$/i, '') // Remove extension
              .replace(/\/([_])([^\/]+)$/, '/$2') // Remove underscore for partial (e.g., /_vars -> /vars)
              .replace(/^([_])/, '') // Remove leading underscore if it's a root partial

            // Append as * to maintain global access to mixins/variables (mimicking @import behavior)
            return `@use "${usePath}" as *;`
          },
        )

        // 4. Create the new full style block
        const newStyleBlock = `${newOpeningTag}\n` + `${newDirectiveContent}\n` + `${closingTag}`

        // 5. Replace the old block in the Vue file content
        const newContent = content.replace(fullBlock, newStyleBlock)

        // 6. Overwrite the original .vue file
        fs.writeFileSync(filePath, newContent, 'utf8')
        console.log(
          `[REFAC] Migrated @import to @use in ${componentName}.vue (directive-only block).`,
        )

        return // Stop here, migration is complete.
      } else {
        // If it only contained @use (or no @import), skip.
        console.log(
          `[SKIP] Style block in ${componentName}.vue contains only @use/comments. Skipping extraction/migration.`,
        )
        return
      }
    }

    // 3. SCENARIO B: Style block contains actual styles (Original refactoring logic)

    // Extract and Save SCSS Content
    fs.writeFileSync(scssFilePath, trimmedContent, 'utf8')
    console.log(`[SAVED] Extracted styles to: ${scssFileName}`)

    // Determine the new @use path (Uses configured alias)
    // The path alias should point to the file without the .scss extension
    const usePath = `${CONFIG.styleAliasRoot}/${componentName}` // Using new camelCase name

    // Clean up the existing attributes string: remove lang/type attributes
    let cleanedAttributes = attributesStr
      .replace(/\s*(lang|type)=["']([^"']+)["']\s*/gi, ' ')
      .trim()

    // Create the new <style> block, ensuring lang="scss" is present
    // and preserving other attributes (like 'scoped')
    const styleAttributes = cleanedAttributes ? ` ${cleanedAttributes}` : ''
    const newOpeningTag = `<style lang="scss"${styleAttributes}>`

    // Using @use for modern Sass style inclusion.
    const newStyleContent = `${newOpeningTag}\n` + `  @use "${usePath}" as *;\n` + `${closingTag}`

    // Replace the old block in the Vue file content
    const newContent = content.replace(fullBlock, newStyleContent)

    // Overwrite the original .vue file
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`[REFAC] Refactored ${componentName}.vue to use @use (lang="scss").`)
  } catch (error) {
    console.error(`[ERROR] Processing ${componentName}.vue:`, error.message)
  }
}

// --- MAIN EXECUTION ---

function main() {
  console.log('--- Starting Vue Style Extraction and Refactoring ---')

  // 1. Load the configuration
  loadConfig()

  // 2. Ensure output directory exists (Uses resolved full path)
  if (!fs.existsSync(CONFIG.outputDirFull)) {
    // Using new camelCase name
    fs.mkdirSync(CONFIG.outputDirFull, { recursive: true }) // Using new camelCase name
    console.log(`Created output directory: ${CONFIG.outputDirFull}`) // Using new camelCase name
  }

  // 3. Find all target files (Uses resolved full path)
  const vueFiles = walkDir(CONFIG.sourceDirFull, '.vue') // Using new camelCase name

  if (vueFiles.length === 0) {
    console.log(`No .vue files found in: ${CONFIG.sourceDirFull}`) // Using new camelCase name
    return
  }

  console.log(`Found ${vueFiles.length} Vue files to process.`)
  if (CONFIG.excludeFiles.length > 0) {
    // Using new camelCase name
    console.log(`Excluding the following files: ${CONFIG.excludeFiles.join(', ')}`) // Using new camelCase name
  }

  // 4. Process each file
  vueFiles.forEach(processVueFile)

  console.log('--- Script Finished Successfully ---')
}

// Execute the main function
main()
