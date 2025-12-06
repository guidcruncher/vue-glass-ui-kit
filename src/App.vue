<template>
  <div class="main-body" v-background-mesh>
    <UINavigationBar title="UI Components">
      <template #left>
        <UIButton
          v-if="expanded"
          variant="icon"
          icon="chevron-left"
          @click="expanded = !expanded"
        ></UIButton>
        <UIButton
          v-if="!expanded"
          variant="icon"
          icon="chevron-right"
          @click="expanded = !expanded"
        ></UIButton>
      </template>
      <template #right>
        <UIThemeChooser />
      </template>
    </UINavigationBar>

    <div class="container-wrapper">
      <div class="section-title" style="margin-top: 0; margin-bottom: 0">
        UISplitView (Responsive Layout)
      </div>
      <UISplitView v-model="expanded" v-background-mesh>
        <template #master>
          <div
            style="
              background: var(--ios-background);
              padding: 20px;
              border-right: 1px solid var(--ios-separator);
              height: 100%;
            "
          >
            <UITableView style="margin: 0">
              <UITableCell label="Inbox (12)" accessory="chevron" />
              <UITableCell label="Sent Items" accessory="chevron" />
              <UITableCell label="Spam" accessory="chevron" />
              <UITableCell label="Disabled"
                ><template #custom-content><UISwitch v-model="disabled" /></template
              ></UITableCell>
            </UITableView>
          </div>
        </template>

        <template #detail>
          <div class="container">
            <div class="section-title" style="margin-top: 0">Main Content Area</div>

            <UIImage
              src="https://www.wanderlustchloe.com/wp-content/uploads/2020/01/Durdle-Door-12-683x1024.jpg"
              alt="Durdle Door in Dorset, UK"
              width="500px"
              height="200px"
              scale="cover"
              @click="viewImage = true"
            />
            <UIImageView
              v-model="viewImage"
              src="https://www.wanderlustchloe.com/wp-content/uploads/2020/01/Durdle-Door-12-683x1024.jpg"
              alt="Durdle Door in Dorset, UK"
              width="500px"
              height="200px"
              scale="cover"
            />
            <UISearchBar v-model="query" placeholder="Search components" />

            <div class="section-title">Inputs & Text (v-model Demo)</div>
            <UITableView>
              <UITableCell label="Username">
                <template #custom-content>
                  <UITextField
                    v-model="username"
                    placeholder="Required"
                    clear-button="true"
                    :disabled="disabled"
                  />
                </template>
              </UITableCell>
              <UITableCell>
                <template #custom-content>
                  <UITextView
                    v-model="bio"
                    placeholder="Bio description..."
                    :rows="3"
                    :disabled="disabled"
                  />
                </template>
              </UITableCell>
              <UITableCell label="Username Value">
                <template #custom-content>
                  <div style="color: var(--system-orange); font-size: 14px">{{ username }}</div>
                </template>
              </UITableCell>
              <UITableCell label="Stepper">
                <template #custom-content>
                  <UIStepper :disabled="disabled" v-model="stepperValue" :min="0" :max="10" />
                  {{ stepperValue }}
                </template>
              </UITableCell>
              <UITableCell label="Username Value">
                <template #custom-content>
                  <UIDropdownList
                    v-model="selectedFruit"
                    :items="fruitList"
                    width="320px"
                    dropdown-height="250px"
                    :disabled="disabled"
                    placeholder="Select Your Favorite Fruit"
                  />
                </template>
              </UITableCell>
            </UITableView>

            <div class="section-title">Pickers & Progress</div>
            <UITableView>
              <UITableCell label="Date">
                <template #custom-content>
                  <UIDatePicker v-model="dateValue" :disabled="disabled" />
                </template>
              </UITableCell>
              <UITableCell label="Time">
                <template #custom-content>
                  <UITimePicker v-model="timeValue" :disabled="disabled" />
                </template>
              </UITableCell>
              <UITableCell label="List">
                <template #custom-content>
                  <div>
                    <UIListPicker
                      v-model="selectedPlatform"
                      :items="platforms"
                      :disabled="disabled"
                    />
                  </div>
                </template>
              </UITableCell>

              <UITableCell label="Download">
                <template #custom-content>
                  <UIProgressView :value="65" style="flex: 1; margin-left: 10px" />
                </template>
              </UITableCell>
              <UITableCell label="Loading">
                <template #custom-content>
                  <UIActivityIndicator :animating="true" />
                </template>
              </UITableCell>
            </UITableView>

            <div class="section-title">Collection View (Grid)</div>
            <UICollectionView>
              <UICollectionViewItem>
                <UIVisualEffectView
                  style="
                    height: 100px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <span style="font-size: 30px">🍎</span>
                </UIVisualEffectView>
              </UICollectionViewItem>
              <UICollectionViewItem>
                <UIVisualEffectView
                  style="
                    height: 100px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <span style="font-size: 30px">🎨</span>
                </UIVisualEffectView>
              </UICollectionViewItem>
              <UICollectionViewItem>
                <UIVisualEffectView
                  style="
                    height: 100px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <span style="font-size: 30px">🛠️</span>
                </UIVisualEffectView>
              </UICollectionViewItem>
              <UICollectionViewItem>
                <UIVisualEffectView
                  style="
                    height: 100px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <span style="font-size: 30px">📱</span>
                </UIVisualEffectView>
              </UICollectionViewItem>
            </UICollectionView>

            <div class="section-title">Page Control</div>
            <div
              style="
                background: var(--ios-card-bg);
                padding: 20px;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
              "
            >
              <div
                style="
                  width: 100px;
                  height: 100px;
                  background: var(--system-gray5);
                  border-radius: 12px;
                "
              ></div>
              <UIPageControl :pages="5" :current-page="2" />
            </div>

            <div class="section-title">Controls (v-model Demo)</div>
            <UITableView>
              <UITableCell label="Airplane Mode" icon="plane" accessory="switch">
                <template #custom-content>
                  <UISwitch v-model="airplaneMode" :disabled="disabled" /> {{ airplaneMode }}
                </template>
              </UITableCell>
              <UITableCell label="Wi-Fi" icon="wifi" value="LiquidGlass_5G" accessory="chevron" />
              <UITableCell :label="`Brightness (${brightness}%)`">
                <template #custom-content>
                  <div style="width: 100%; padding: 10px 0">
                    <UISlider v-model="brightness" :disabled="disabled" />
                  </div>
                </template>
              </UITableCell>
            </UITableView>

            <UIButton @click="popover = true" :disabled="disabled"> Show Popover </UIButton>
            <UIPopover v-model="popover" />

            <UINotificationBar
              v-if="popover"
              v-model="popover"
              title="Mail Alert"
              message="You received 3 new emails."
              @close="popover = false"
            />

            <UIButton @click="showBasicModal = true" :disabled="disabled">
              Open Basic Modal
            </UIButton>
            <UIModalDialog v-model="showBasicModal">
              <template #header>Welcome</template>
              <template #body>
                <h2>Hello World!</h2>
                <p>This is a basic modal with default content.</p>
              </template>
            </UIModalDialog>

            <UIButton
              variant="prominentGlass"
              :disabled="disabled"
              style="width: 100%; margin-top: 20px"
              @click="showAlert = true"
              >Show Glass Alert</UIButton
            >

            <UIWidgetView>
              <UIAnalogClock size="200" timezone="Europe/London" />
            </UIWidgetView>

            <UIFlipClock timezone="Europe/Madrid" />

            <UIContentPanel
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
            </UIContentPanel>

            <UIContentPanel
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
            </UIContentPanel>

            <MKMapView
              width="600px"
              height="300px"
              :lat="40.7128"
              :lng="-74.006"
              :zoom="12"
              marker-title="New York City"
            />
          </div>
        </template>
      </UISplitView>
    </div>

    <UIToolbar>
      <UIButton variant="icon" icon="share-from-square" />
      <div style="flex: 1"></div>
      <UIButton variant="icon" icon="book" />
      <UIButton variant="icon" icon="copy" />
    </UIToolbar>

    <UITabBar :active-index="0">
      <UITabItem icon="star" label="Favorites" />
      <UITabItem icon="clock" label="Recent" />
      <UITabItem icon="user-group" label="Contacts" />
      <UITabItem icon="table-cells" label="Keypad" />
    </UITabBar>

    <UIAlert
      title="Liquid Glass"
      message="This is a fully replicated UIAlertController with backdrop blur."
      :actions="[
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', style: 'default' },
      ]"
      v-model="showAlert"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- App Logic ---
// State for v-model demonstrations
const platforms = [
  { key: 'ios', value: 'iOS' },
  { key: 'android', value: 'Android' },
  { key: 'web', value: 'Web/Desktop' },
  { key: 'watch', value: 'WatchOS' },
]

const stepperValue = ref(5)
const popover = ref(false)
const disabled = ref(false)
const selectedFruit = ref('orange')
// 3. Array of items to display in the dropdown
const fruitList = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'mango', label: 'Mango' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'peach', label: 'Peach' },
  { value: 'plum', label: 'Plum' },
  { value: 'pear', label: 'Pear' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'lime', label: 'Lime' },
  { value: 'pomegranate', label: 'Pomegranate' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'fig', label: 'Fig' },
]

const viewImage = ref(false)
const expanded = ref(true)
const selectedPlatform = ref('android')
const query = ref('')
const dateValue = ref(new Date())
const timeValue = ref(new Date())
const username = ref('guest_user_1')
const bio = ref('I love the new Liquid Glass design!')
const airplaneMode = ref(false)
const brightness = ref(75)
const showAlert = ref(false)
const showBasicModal = ref(false)

// Theme logic
const isDarkMode = ref(false)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style>
/* --- iOS System Color Palette & Design Tokens --- */
:root {
  /* Typography */
  --font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial,
    sans-serif;

  /* Light Mode Tokens */
  --ios-background: #f2f2f7;
  --ios-card-bg: #ffffff;
  --ios-text-primary: #000000;
  --ios-text-secondary: #8e8e93;
  --ios-text-tertiary: #c7c7cc;
  --ios-separator: #c6c6c8;

  /* Liquid Glass Tokens (Light) */
  --glass-bg: rgba(255, 255, 255, 0.75);
  --glass-border: rgba(255, 255, 255, 0.4);

  /* System Colors */
  --system-blue: #007aff;
  --system-green: #34c759;
  --system-orange: #ff9500;
  --system-gray5: #e5e5ea;
}

/* Dark Mode Tokens */
.dark-mode {
  --ios-background: #000000;
  --ios-card-bg: #1c1c1e;
  --ios-text-primary: #ffffff;
  --ios-text-secondary: #98989d;
  --ios-text-tertiary: #5a5a5f;
  --ios-separator: #38383a;

  /* Liquid Glass Tokens (Dark) */
  --glass-bg: rgba(30, 30, 30, 0.6);
  --glass-border: rgba(255, 255, 255, 0.12);

  /* System Colors Dark Variants */
  --system-blue: #0a84ff;
  --system-green: #30d158;
  --system-orange: #ff9f0a;
  --system-gray5: #2c2c2e;
}

.main-body {
  font-family: var(--font-family);
  background-color: var(--ios-background);
  color: var(--ios-text-primary);
  margin: 0;
  padding: 0;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 120px; /* Space for TabBar + Toolbar demo */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.section-title {
  font-size: 13px;
  text-transform: uppercase;
  color: var(--ios-text-secondary);
  margin: 24px 0 8px 16px;
  font-weight: 400;
}

/* Responsive styles for UISplitView demonstration */
@media (min-width: 768px) {
  .container {
    max-width: 100%;
    padding: 20px;
  }
}
</style>
