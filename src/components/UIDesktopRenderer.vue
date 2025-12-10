<template>
  <div class="desktop-renderer" :style="backgroundStyle">
    <template v-if="desktopConfig && desktopConfig.widgets">
      <div
        v-for="widget in desktopConfig.widgets"
        :key="widget.name"
        class="desktop-item widget-wrapper"
        :style="getGridPlacementStyle(widget)"
      >
        <UIWidgetView>
          <div class="widget-content">
            <h3>{{ widget.name }}</h3>
            <p v-if="widget.source_url" class="widget-source">Source: {{ widget.source_url }}</p>
          </div>
        </UIWidgetView>
      </div>
    </template>

    <template v-if="desktopConfig && desktopConfig.items">
      <div
        v-for="item in desktopConfig.items"
        :key="item.name"
        class="desktop-item icon-wrapper"
        :style="getGridPlacementStyle(item)"
      >
        <UICollectionViewItem>
          <UIAppIconItem
            v-if="item.type === 'icon'"
            :label="item.name"
            :icon="item.icon_image_path"
            @click="handleLaunch(item.launch_url)"
          />

          <UIAppIconItem
            v-else-if="item.type === 'group'"
            :label="item.name"
            :icon="item.group_icon_path"
            @click="openGroupFolder(item)"
          />
        </UICollectionViewItem>
      </div>
    </template>

    <div v-if="activeGroup" class="folder-modal-overlay" @click.self="closeGroupFolder">
      <UIFolderView :width="'600px'" :height="'500px'">
        <template #title>{{ activeGroup.name }}</template>

        <UICollectionView>
          <UIAppIconItem
            v-for="icon in activeGroup.icons"
            :key="icon.name"
            :label="icon.name"
            :icon="icon.icon_image_path"
            @click="handleLaunch(icon.launch_url)"
          />
        </UICollectionView>
      </UIFolderView>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// NOTE: Ensure these components are available in your project structure
import UIAppIconItem from './UIAppIconItem.vue'
import UIFolderView from './UIFolderView.vue'
import UIWidgetView from './UIWidgetView.vue'
import UICollectionViewItem from './UICollectionViewItem.vue'
import UICollectionView from './UICollectionView.vue'

// NOTE: This requires 'js-yaml' to be installed: npm install js-yaml
import YAML from 'js-yaml'

const props = defineProps({
  yamlSource: {
    type: String,
    required: true, // Can be a URL to a YAML file or a raw YAML string
  },
})

// State for the parsed configuration
const desktopConfig = ref(null)

// State for the active group/folder being viewed
const activeGroup = ref(null)

/**
 * COMPUTED: Extracts grid dimensions for dynamic CSS.
 */
const gridRows = computed(() => desktopConfig.value?.grid_definition?.rows || 10)
const gridCols = computed(() => desktopConfig.value?.grid_definition?.cols || 10)

/**
 * COMPUTED PROPERTY: Generates the CSS for the background based on the YAML config.
 */
const backgroundStyle = computed(() => {
  if (!desktopConfig.value || !desktopConfig.value.background) {
    return {}
  }

  const bg = desktopConfig.value.background
  const config = bg.config

  switch (bg.type) {
    case 'image':
      return {
        backgroundImage: `url('${config.image_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    case 'color':
      return {
        backgroundColor: config.color_hex,
      }
    case 'glassmorphic_mesh':
      return {
        backgroundColor: config.mesh_settings?.color_tint_hex || '#333',
      }
    default:
      return {}
  }
})

/**
 * FUNCTION: Fetches and parses the YAML content.
 */
const loadConfig = async () => {
  try {
    let yamlString

    // Check if source is a URL or raw string
    if (props.yamlSource.startsWith('http')) {
      const response = await fetch(props.yamlSource)
      yamlString = await response.text()
    } else {
      yamlString = props.yamlSource
    }

    // Parse the YAML string into a JavaScript object
    const parsed = YAML.load(yamlString)
    desktopConfig.value = parsed.desktop_layout
  } catch (error) {
    console.error('Error loading or parsing YAML configuration:', error)
  }
}

/**
 * FUNCTION: Calculates CSS grid properties for an item based on its grid_position.
 * This is crucial for placing items on the desktop's main grid.
 */
const getGridPlacementStyle = (item) => {
  const { row, col } = item.grid_position
  // Icons/Groups typically span 1x1. Widgets use grid_span.
  const rows = item.grid_span?.rows || 1
  const cols = item.grid_span?.cols || 1

  return {
    gridRowStart: row,
    gridColumnStart: col,
    gridRowEnd: `span ${rows}`,
    gridColumnEnd: `span ${cols}`,
    zIndex: item.type === 'widget' ? 10 : 1,
    // Ensure the container is sized and centered within its allocated grid space
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  }
}

/**
 * HANDLER: Simulates launching a website/app.
 */
const handleLaunch = (url) => {
  console.log('Launching:', url)
  window.open(url, '_blank')
  closeGroupFolder()
}

/**
 * HANDLER: Opens the folder view for a group.
 */
const openGroupFolder = (group) => {
  activeGroup.value = group
}

/**
 * HANDLER: Closes the folder view.
 */
const closeGroupFolder = () => {
  activeGroup.value = null
}

// Load the configuration when the component is mounted
onMounted(loadConfig)
</script>

<style scoped>
/* Define the variables needed by the imported components for theming */
:root {
  /* Placeholder variables based on component usage for a dark/glass theme */
  --glass-bg: rgba(255, 255, 255, 0.2);
  --glass-border: rgba(255, 255, 255, 0.18);
  --color-folder-shadow: rgba(0, 0, 0, 0.25);
  --color-primary-text: #fff;
  --color-cell-shadow: rgba(0, 0, 0, 0.2);
  --color-cell-label: #fff;
  --shadow-base: 0 4px 12px rgba(0, 0, 0, 0.2);
  --shadow-hover: 0 8px 20px rgba(0, 0, 0, 0.3);
  --bg-widget: rgba(0, 0, 0, 0.4);
  --border-color: 1px solid rgba(255, 255, 255, 0.1);
}

.desktop-renderer {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  /* Use CSS Grid for the entire desktop layout, dynamically setting rows/cols */
  display: grid;
  grid-template-rows: repeat(v-bind(gridRows), 1fr);
  grid-template-columns: repeat(v-bind(gridCols), 1fr);
}

/* Ensure icons and widgets respect their allocated grid space */
.desktop-item {
  min-width: 0;
  min-height: 0;
  justify-self: stretch;
  align-self: stretch;
}

/* Ensure the widget view fills its wrapper */
.widget-wrapper > .ui-widget {
  width: 100%;
  height: 100%;
}

.folder-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Darken or blur the background slightly */
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Widget Content Styling */
.widget-content {
  color: var(--color-primary-text);
  text-align: center;
}
.widget-content h3 {
  margin-top: 0;
}
.widget-source {
  font-size: 0.8em;
  opacity: 0.7;
}
</style>
