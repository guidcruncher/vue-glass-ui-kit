<template>
  <Container v-background-image="'/465552.webp'">
    <template #header>
      <GlassNavBar title="Glass UI Component Showcase">
        <template #left-action>
          <GlassButton @click="collapsed = !collapsed">
            <i v-if="!collapsed" class="fa-solid fa-arrow-left-long" />
            <i v-if="collapsed" class="fa-solid fa-arrow-right-long" />
          </GlassButton>
        </template>
        <template #right-action>
          <GlassThemeChooser mode="compact" />
        </template>
      </GlassNavBar>
    </template>
    <template #menubar>
      <MenuBar :menus="appMenus" @menu-action="handleMenuAction" />
    </template>

    <template #body>
      <SplitViewContainer :collapsed="collapsed" initial-width="250px" :min-width="150" collapsible>
        <template #primary class="split-view-sidebar">
          <GlassVStack :spacing="0" alignment="start">
            <h3>Component Groups</h3>
            <GlassListItem
              v-for="group in componentGroups"
              :key="group.id"
              :title="group.label"
              interactive
              :class="{ 'list-item-selected': selectedGroup === group.id }"
              @click="selectedGroup = group.id"
            >
              <template #leading>{{ group.icon }}</template>
            </GlassListItem>
          </GlassVStack>
        </template>

        <template #secondary>
          <GlassVStack :spacing="30" alignment="left" class="showcase-content">
            <GlassCard class="group-card" v-show="selectedGroup === 'inputs'">
              <template #header><h3>Inputs & Forms</h3></template>
              <GlassVStack :spacing="20" alignment="start">
                <GlassInput v-model="inputValue" placeholder="Standard Text Input" />
                <GlassValidatedInput
                  v-model="validatedInput"
                  placeholder="Validated Input"
                  :errorMessage="validatedInput.length < 5 ? 'Minimum 5 characters required' : ''"
                />
                <PasswordInput
                  v-model="confirmPassword"
                  label="Confirm Password"
                  placeholder="Repeat your password"
                  :show-toggle="true"
                  :complexity-rules="customRules"
                />
                <GlassTextarea v-model="textareaValue" placeholder="Multiline Textarea" :rows="3" />
                <GlassCheckbox v-model="isChecked">I agree to the Glass Terms</GlassCheckbox>
                <div class="control-row">
                  <GlassToggle v-model="isToggled" />
                  <span>{{ isToggled ? 'ON' : 'OFF' }}</span>
                </div>
                <GlassDropdown
                  v-model="dropdownValue"
                  :options="dropdownOptions"
                  placeholder="Select an Option"
                />
                <GlassSearchableDropdown
                  v-model="searchableDropdownValue"
                  :options="dropdownOptions"
                  placeholder="Search or Select"
                />
                <GlassDatePicker v-model="datePickerValue" />
                <LinearPicker startValue="1950" endValue="2026" v-model="linearPickerValue" />
                {{ linearPickerValue }}
              </GlassVStack>
            </GlassCard>

            <GlassCard class="group-card" v-show="selectedGroup === 'controls'">
              <template #header><h3>Controls & Selection</h3></template>
              <GlassVStack :spacing="20" alignment="start">
                <GlassHStack :spacing="16" alignment="center">
                  <ImageButton
                    size="64"
                    imageurl="https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/apple-retro.svg"
                  />
                </GlassHStack>
                <GlassHStack :spacing="16" alignment="center">
                  <GlassButton @click="showToast('Default button clicked!')"
                    >Default Button</GlassButton
                  >
                  <GlassButton variant="accent" @click="modalOpen = true">Show Dialog</GlassButton>
                  <GlassButton variant="accent" @click="alertVisible = true"
                    >Accent Button</GlassButton
                  >
                </GlassHStack>
                <GlassHStack :spacing="30" alignment="center">
                  <GlassButton variant="selected" @click="alertVisible = true"
                    >Selected Button</GlassButton
                  >
                  <GlassButton variant="destructive" @click="alertVisible = true"
                    >Destructive Button</GlassButton
                  >

                  <GlassButton disabled>Disabled</GlassButton>
                </GlassHStack>
                <GlassHStack :spacing="16" alignment="center">
                  <label>Quantity:</label>
                  <GlassStepper v-model="stepperValue" :min="0" :max="10" />
                  <GlassBadge variant="success">{{ stepperValue }}</GlassBadge>
                </GlassHStack>
                <GlassSegmentedControl
                  v-model="segmentedControlValue"
                  :options="segmentedOptions"
                />
                <GlassSlider v-model="simpleSliderValue" :min="0" :max="500" :step="10" />
              </GlassVStack>
            </GlassCard>

            <GlassCard class="group-card" v-show="selectedGroup === 'data'">
              <template #header><h3>Data & Indicators</h3></template>
              <GlassVStack :spacing="20" alignment="start">
                <div class="indicator-row">
                  <h4>Progress Bar ({{ progressValue }}%)</h4>
                  <GlassProgressBar :progress="progressValue" />
                </div>

                <GlassHStack :spacing="30" alignment="center">
                  <GlassProgressRing :progress="progressValue" :size="70" :stroke-width="6">
                    <span class="ring-text">{{ progressValue }}%</span>
                  </GlassProgressRing>

                  <GlassActivityIndicator :size="40" />

                  <GlassBadge variant="danger">New (10)</GlassBadge>
                  <GlassBadge variant="standard">Draft</GlassBadge>
                </GlassHStack>

                <GlassHStack :spacing="30" alignment="start">
                  <GlassDigitalClock
                    timezone="Europe/London"
                    :format12-hour="false"
                    :show-timezone="false"
                  />
                </GlassHStack>
                <GlassHStack :spacing="30" alignment="start">
                  <GlassAnalogClock size="100" timezone="America/Los_Angeles" />
                  <GlassAnalogClock size="200" timezone="Europe/London" />
                </GlassHStack>
                <GlassHStack :spacing="30" alignment="start">
                  <FlipClock />
                </GlassHStack>
              </GlassVStack>
            </GlassCard>

            <GlassCard class="group-card" v-show="selectedGroup === 'layout'">
              <template #header><h3>Layout, Navigation & Utility</h3></template>
              <GlassVStack :spacing="10" alignment="start">
                <GlassCalendar v-model="calendarDate" />

                <GlassThemeChooser />

                <GlassTabBar v-model="tabBarValue" :items="tabBarItems" />

                <GlassPanel class="list-panel">
                  <GlassListItem
                    title="User Profile"
                    subtitle="Edit your personal details"
                    @click="showToast('List item clicked!')"
                  >
                    <template #leading>👤</template>
                  </GlassListItem>
                  <GlassListItem title="Privacy Settings" interactive>
                    <template #leading>🔒</template>
                  </GlassListItem>
                </GlassPanel>

                <GlassScrollContainer height="100px">
                  <p v-for="i in 5" :key="i">Scrollable content line #{{ i }} inside GlassPanel.</p>
                </GlassScrollContainer>
              </GlassVStack>
            </GlassCard>

            <GlassCard class="group-card" v-show="selectedGroup === 'panels'">
              <template #header><h3>Content Panels & Widgets</h3></template>
              <GlassHStack :spacing="10" alignment="start">
                <ContentPanel
                  background="linear-gradient(135deg, #6e8efb, #a777e3)"
                  :border-radius="15"
                >
                  <template #header> Panel Header (Gradient) </template>

                  <p>
                    This is the main body content. The overall panel has a purple-to-blue gradient
                    background.
                  </p>
                  <template #footer>
                    <button class="footer-button">Action</button>
                  </template>
                </ContentPanel>

                <ContentPanel
                  background="url(https://www.wanderlustchloe.com/wp-content/uploads/2020/01/Durdle-Door-12-683x1024.jpg)"
                  :border-radius="5"
                  color="#ffffff"
                >
                  <template #header>Panel Header (Image)</template>
                  <p>
                    This panel uses an image URL for its background. The glassmorphic effect in the
                    footer is even more noticeable with an image background!
                  </p>
                  <template #footer>
                    <small>Powered by Vue 3</small>
                  </template>
                </ContentPanel>
              </GlassHStack>
              <WidgetPanel></WidgetPanel>
            </GlassCard>

            <GlassCard class="group-card" v-show="selectedGroup === 'media'">
              <template #header><h3>Folders & Media</h3></template>
              <AppFolder v-model="appleApps" />
              <GlassImage
                :src="imageSource"
                width="400px"
                height="250px"
                alt="Mountain landscape behind frosted glass"
                @click="imageSourceView = true"
              />
            </GlassCard>

            <ImageViewer
              v-model:visible="imageSourceView"
              :url="imageSource"
              title="Durdle Door, Dorset"
              info="High-resolution vertical landscape photo."
              :initial-fit-mode="true"
            />

            <GlassCard class="group-card" v-show="selectedGroup === 'grids'">
              <template #header><h3>Grids & Layouts</h3></template>
              <ResponsiveGrid>
                <ResponsiveGridCell>
                  <h3>Item 1: Simple Content</h3>
                  <p>This content is written directly inside the ResponsiveGridCell tag.</p>
                </ResponsiveGridCell>
                <ResponsiveGridCell>
                  <h3>Item 2: Custom Layout</h3>
                  <p>You can put any HTML or Vue component inside this slot.</p>
                </ResponsiveGridCell>
                <ResponsiveGridCell>
                  <h3>Item 3: Fully Manual</h3>
                  <p>The grid container handles the wrapping automatically.</p>
                </ResponsiveGridCell>
                <ResponsiveGridCell>
                  <h3>Item 4: Flexibility</h3>
                  <p>This approach provides maximum control to the user of the component.</p>
                </ResponsiveGridCell>
                <ResponsiveGridCell>
                  <h3>Item 5: Last Item</h3>
                  <p>It will wrap to the next line when the screen is too narrow.</p>
                </ResponsiveGridCell>
              </ResponsiveGrid>

              <GridContainer>
                <h1>CSS Grid Layout Example</h1>
                <GridRow>
                  <GridCol :col="12" :col-md="6" :col-lg="4">
                    <div class="box">Item 1 (4/12 Large)</div>
                  </GridCol>
                  <GridCol :col="12" :col-md="6" :col-lg="4">
                    <div class="box">Item 2 (4/12 Large)</div>
                  </GridCol>
                  <GridCol :col="12" :col-md="12" :col-lg="4">
                    <div class="box">Item 3 (4/12 Large)</div>
                  </GridCol>
                </GridRow>
              </GridContainer>
            </GlassCard>
          </GlassVStack>
        </template>
      </SplitViewContainer>

      <GlassToast ref="toastRef" />
      <GlassAlert
        :visible="alertVisible"
        title="Action Required"
        message="This modal is triggered by the Accent Button."
        buttonText="Close"
        @close="alertVisible = false"
      />

      <GlassModal v-model:isVisible="modalOpen" width="700px" height="300px">
        <template #header>
          <span class="modal-title">System Preferences</span>
        </template>
        <template #body>
          <p>
            This is the main content area. You can put forms, data tables, or long-form text here.
            The body area is automatically scrollable.
          </p>
          <label for="theme-select">Select Theme:</label>
          <select id="theme-select">
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </template>
        <template #footer>
          <GlassButton @click="saveSettings" variant="accent">Apply Changes</GlassButton>
          &nbsp;
          <GlassButton @click="modalOpen = false" variant="accent">Close</GlassButton>
        </template>
      </GlassModal>
    </template>
  </Container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- New State for Split View Navigation ---
const componentGroups = [
  { id: 'inputs', label: 'Inputs & Forms', icon: '⌨️' },
  { id: 'controls', label: 'Controls & Selection', icon: '🖱️' },
  { id: 'data', label: 'Data & Indicators', icon: '📊' },
  { id: 'layout', label: 'Layout, Nav & Utility', icon: '🧭' },
  { id: 'panels', label: 'Content Panels & Widgets', icon: '🖼️' },
  { id: 'media', label: 'Folders & Media', icon: '📂' },
  { id: 'grids', label: 'Grids & Layouts', icon: '📐' },
]
const selectedGroup = ref('inputs') // Start on the first group
// ------------------------------------------
const collapsed = ref(false)
const imageSourceView = ref(false)
const imageSource =
  'https://images.squarespace-cdn.com/content/v1/6494678b67b42e6fd1a6de8b/1688568948629-ZCWIHO2GYSVDRJW2DVWD/UK23-480+Strawberry+Moon%2C+Durdle+Door%2C+Dorset.jpg'

const appleApps = ref([
  {
    name: 'App Store',
    icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/app-store.svg',
    color: '#EF4444',
  },
  { name: 'Cloud', icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/icloud.svg' },
  { name: 'Apple', icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/apple-retro.svg' },
  {
    name: 'Apple Containers',
    icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/png/apple-containers.png',
  },
  {
    name: 'Apple HomeKit',
    icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/apple-homekit.svg',
  },
  {
    name: 'Apple Kusic',
    icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/apple-music.svg',
  },
  { name: 'Apple TV', icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/apple-tv.svg' },
  { name: 'Safari', icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/safari.svg' },
  {
    name: 'Apple PodCasts',
    icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons@master/svg/apple-podcasts.svg',
    color: '#F59E0B',
  },
])

const appMenus = [
  { id: 'finder', label: 'Finder', items: ['About Finder', 'Preferences', 'Empty Trash'] },
  {
    id: 'file',
    label: 'File',
    items: ['New Finder Window', 'New Folder', 'Get Info', 'Move to Trash'],
  },
  { id: 'view', label: 'View', items: ['as Icons', 'as List', 'as Gallery', 'Show Sidebar'] },
  { id: 'help', label: 'Help', items: ['Finder Help', 'Search'] },
]

const handleMenuAction = (payload) => {
  console.log(`[App.vue] Executing action for: ${payload.menuLabel} -> ${payload.itemText}`)

  if (payload.itemText === 'Empty Trash') {
    alert('Trash is now empty.')
  }
}

const inputValue = ref('Initial Text')
const confirmPassword = ref('')
const validatedInput = ref('Valid')
const textareaValue = ref('This is multiline text')
const isChecked = ref(true)
const isToggled = ref(false)
const dropdownValue = ref('opt2')
const searchableDropdownValue = ref(null)
const datePickerValue = ref(new Date())
const linearPickerValue = ref(2000)

const dropdownOptions = [
  { label: 'Option One', value: 'opt1' },
  { label: 'Option Two', value: 'opt2' },
  { label: 'Option Three', value: 'opt3' },
]

const stepperValue = ref(5)
const segmentedControlValue = ref('seg1')
const simpleSliderValue = ref(250)

const segmentedOptions = [
  { label: 'Seg 1', value: 'seg1' },
  { label: 'Seg 2', value: 'seg2' },
  { label: 'Seg 3', value: 'seg3' },
]

const progressValue = ref(65)
let progressInterval: number

onMounted(() => {
  progressInterval = window.setInterval(() => {
    progressValue.value = (progressValue.value + 1) % 101
    if (progressValue.value === 0) progressValue.value = 1
  }, 100)
})

onUnmounted(() => {
  clearInterval(progressInterval)
})

const tabBarValue = ref('home')
const calendarDate = ref(new Date())

const tabBarItems = [
  { label: 'Home', value: 'home' },
  { label: 'Data', value: 'data' },
  { label: 'Map', value: 'map' },
]

const alertVisible = ref(false)
const modalOpen = ref(false)
const toastRef = ref(null)

const showToast = (message: string) => {
  toastRef.value?.show(message)
}

const saveSettings = () => {
  showToast('Settings Saved!')
  modalOpen.value = false
}
</script>

<style scoped>
.showcase-content {
  padding: 16px;
}

/* Custom style for the selected item in the sidebar */
.list-item-selected {
  background-color: var(--glass-accent-light-20); /* Slightly highlight the selected item */
}
</style>
