<template>
    <div class="h-screen w-screen flex flex-col justify-center text-center items-center">
        <div>
            <ProgressSpinner
                style="width: 60px; height: 60px"
                strokeWidth="8"
                fill="transparent"
                animationDuration=".5s"
                aria-label="Custom ProgressSpinner"
            />
        </div>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Este es un proceso automático, por favor no recargue la página.
        </p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import FullScreeenLoader from '~/components/common/FullScreeenLoader.vue';

definePageMeta({
    layout: 'blank',
});

const router = useRouter();
const { $oidcClient } = useNuxtApp();

let user = null;

onMounted(async () => {
    try {
        const authStore = useAuthStore();
        const userService = await $oidcClient.signinRedirectCallback();
        authStore.login(userService.access_token, userService.expires_in);

        router.push('/');
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Login',
            message: error,
        });
    }
});
</script>
