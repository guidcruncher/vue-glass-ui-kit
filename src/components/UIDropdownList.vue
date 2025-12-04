<template>
  <div
    ref="dropdownRef"
    class="relative inline-block"
    :style="{ width: computedWidth }"
    
    /* NOTE: The .dark class must now be applied to this div (or a parent) 
      by external logic to enable dark mode styling. 
    */ 
  >
    <div
      @click="toggleDropdown"
      :style="{ width: computedWidth }"
      class="
        dropdown-control
        p-2
        rounded-xl
        cursor-pointer
        flex
        justify-between
        items-center
        shadow-sm
        font-semibold
        transition
        duration-150
        ease-in-out
      "
      :class="{ 'control-open': isDropdownOpen }"
    >
      <span class="text-primary-text">
        {{ selectedItemDisplay }}
      </span>
      <svg
        :class="{ 'rotate-180': isDropdownOpen }"
        class="w-4 h-4 text-icon-color transform transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>

    <Transition name="fade-slide">
      <div
        v-if="isDropdownOpen"
        class="
          absolute
          mt-2
          z-10
          dropdown-list
          rounded-xl
          shadow-2xl
          overflow-hidden
        "
        :style="{
          width: computedWidth,
          maxHeight: computedHeight,
          overflowY: 'auto',
        }"
      >
        <ul class="divide-y divide-list-separator">
          <li
            v-for="(item, index) in items"
            :key="index"
            @click="selectItem(item)"
            class="
              list-item
              p-3
              cursor-pointer
              transition-colors
              duration-150
              ease-in-out
            "
            :class="{
              'list-item-selected': item === modelValue,
            }"
          >
            {{ item }}
            <span v-if="item === modelValue" class="float-right text-lg">
              ✓
            </span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// --- PROPS and EMITS ---
const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    default: null,
  },
  items: {
    type: Array,
    required: true,
    validator: (arr) => arr.every(item => typeof item === 'string' || typeof item === 'number'),
  },
  width: {
    type: [String, Number],
    default: '250px',
  },
  dropdownHeight: {
    type: [String, Number],
    default: '300px',
  },
  placeholder: {
    type: String,
    default: 'Select an item',
  }
});

const emit = defineEmits(['update:modelValue']);

// --- STATE ---
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

// --- COMPUTED PROPERTIES ---
const computedWidth = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width;
});

const computedHeight = computed(() => {
  return typeof props.dropdownHeight === 'number' ? `${props.dropdownHeight}px` : props.dropdownHeight;
});

const selectedItemDisplay = computed(() => {
    return props.modelValue !== null && props.items.includes(props.modelValue)
        ? props.modelValue
        : props.placeholder;
});

// --- METHODS ---
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectItem = (item) => {
  emit('update:modelValue', item);
  isDropdownOpen.value = false;
};

// --- OUTSIDE CLICK LOGIC ---
const handleClickOutside = (event) => {
  if (isDropdownOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-control {
  background-color: var(--control-bg);
  border: 2px solid var(--control-border);
  color: var(--primary-text);
}

.control-open {
  border-color: var(--control-border-active);
}

.dropdown-list {
  background-color: var(--list-bg);
  border: 1px solid var(--list-border);
}

.list-item {
  color: var(--primary-text);
}

.list-item:hover {
  background-color: var(--list-hover-bg);
}

.list-item-selected {
  background-color: var(--selected-bg);
  color: var(--selected-text);
}

.list-item-selected:hover {
  background-color: var(--selected-hover-bg);
}

/* Custom transition for a subtle slide/fade effect */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
