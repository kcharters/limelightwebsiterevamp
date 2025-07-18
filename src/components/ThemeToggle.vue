<template>
    <button
        class="sticky top-0 flex h-8 w-8 items-center justify-center rounded-lg drop-shadow-[0px_1.5px_1.5px_rgba(0,0,0,0.175)] hover:text-accent-two"
        type="button" role="switch" :aria-checked="isDark.toString()" @click="toggleTheme">
        <span class="sr-only">Dark Theme</span>

        <!-- Sun icon (shown in light mode) -->
        <Icon aria-hidden="true" name="solar:sun-bold"
            class="absolute start-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-all" :class="{
                'scale-100 opacity-100': !isDark,
                'scale-0 opacity-0': isDark,
            }" />

        <!-- Moon icon (shown in dark mode) -->
        <Icon aria-hidden="true" name="solar:moon-bold"
            class="absolute start-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-all" :class="{
                'scale-100 opacity-100': isDark,
                'scale-0 opacity-0': !isDark,
            }" />
    </button>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';


const isDark = ref(false);

function getIsDark() {
    return document.documentElement.classList.contains('dark');
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    isDark.value = !isDark.value;
    setTheme(isDark.value ? 'dark' : 'light');

    // Dispatch custom event (optional)
    const themeChangeEvent = new CustomEvent('theme-change', {
        detail: { theme: isDark.value ? 'dark' : 'light' },
    });
    document.dispatchEvent(themeChangeEvent);
}

onMounted(() => {
    // Init from local storage or system preference
    const saved = localStorage.getItem('theme');
    isDark.value =
        saved === 'dark' ||
        (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
});
</script>
