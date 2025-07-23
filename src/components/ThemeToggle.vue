<template>
    <v-btn icon class="" role="switch" :aria-checked="isDark.toString()" @click="toggleTheme">
        <v-icon aria-hidden="true" class="transition-all" :class="{
            'scale-100 opacity-100': !isDark,
            'scale-0 opacity-0': isDark,
        }">
            mdi-weather-sunny
        </v-icon>

        <v-icon aria-hidden="true" class="transition-all" :class="{
            'scale-100 opacity-100': isDark,
            'scale-0 opacity-0': !isDark,
        }">
            mdi-moon-waning-crescent
        </v-icon>
    </v-btn>
</template>

<script setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

// Detect dark mode based on current theme
const isDark = computed(() => theme.global.current.value.dark);

// Toggle between light and dark themes
function toggleTheme() {
    theme.global.name.value = isDark.value ? 'customLightTheme' : 'customDarkTheme';
    localStorage.setItem('theme', isDark.value ? 'light' : 'dark');
}

// Initialize theme based on saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    theme.global.name.value = 'customDarkTheme';
} else if (savedTheme === 'light') {
    theme.global.name.value = 'customLightTheme';
}
</script>
