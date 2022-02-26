<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white" href="">
            <img src="@/assets/logo.png" alt="vue" class="d-inline-block align-text-top mx-2" height="24">
            {{ username }}
        </a>

        <div class="d-flex">
            <button @click="onLogout" class="btn btn-outline-info mx-2">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>

import { useRouter } from 'vue-router';
import useAuth from '@/modules/auth/composables/useAuth';

export default {
    name: 'Navbar',
    setup(){
        const router = useRouter();
        const { username, logout } = useAuth();

        return{
            username,

            onLogout(){
                router.push({ name: 'login' });
                logout();
            }
        }
    }
}
</script>