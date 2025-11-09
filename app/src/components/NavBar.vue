<template>
    <nav>
        <div class="back-button" v-if="selectedNavTile" @click="selectedNavTile = null">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0002 16.6673L7.3335 12.0007L12.0002 7.33398" stroke="white" stroke-width="1.33333"
                    stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.6668 12H7.3335" stroke="white" stroke-width="1.33333" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <div>Atpakaļ</div>
        </div>
        <div v-else class="logo">
            <div class="logo-box" />
            Logo
        </div>

        <div class="right-button">
            <div class="navbar-text-link">
                Pieskaries lai izzinātu
            </div>

            <svg width="22" height="27" viewBox="0 0 22 27" fill="none">
                <path
                    d="M10.2077 26.1537C9.53411 26.1537 8.89733 26.0118 8.29733 25.728C7.69733 25.4442 7.19567 25.0366 6.79234 24.505L0 15.7073L0.492333 15.182C0.825667 14.8264 1.22433 14.6128 1.68833 14.541C2.15233 14.469 2.58689 14.557 2.992 14.805L6.241 16.5487V6C6.241 5.71667 6.33689 5.47911 6.52867 5.28733C6.72022 5.09578 6.95778 5 7.24133 5C7.52489 5 7.76578 5.09578 7.964 5.28733C8.16222 5.47911 8.26133 5.71667 8.26133 6V20.0793L4.25867 17.8997L8.41767 23.3203C8.63656 23.5954 8.90322 23.8031 9.21767 23.9433C9.53233 24.0836 9.86233 24.1537 10.2077 24.1537H16.7663C17.6023 24.1537 18.3136 23.8627 18.9 23.2807C19.4862 22.6984 19.7793 21.9894 19.7793 21.1537V16.128C19.7793 15.6702 19.6246 15.2866 19.315 14.977C19.0052 14.6674 18.6216 14.5127 18.164 14.5127H11.441V12.5127H18.164C19.1682 12.5127 20.0218 12.8641 20.7247 13.567C21.4278 14.2701 21.7793 15.1238 21.7793 16.128V21.1527C21.7793 22.5344 21.2884 23.7134 20.3067 24.6897C19.3251 25.6657 18.145 26.1537 16.7663 26.1537H10.2077ZM2.05133 9C1.788 8.55378 1.58711 8.07667 1.44867 7.56867C1.31022 7.06067 1.241 6.53778 1.241 6C1.241 4.33489 1.82478 2.91867 2.99233 1.75133C4.15967 0.583777 5.57589 0 7.241 0C8.90589 0 10.3221 0.583777 11.4897 1.75133C12.657 2.91867 13.2407 4.33433 13.2407 5.99833C13.2407 6.53944 13.1714 7.06344 13.033 7.57033C12.8946 8.07722 12.6938 8.55378 12.4307 9L10.7077 8C10.8854 7.68889 11.0188 7.37222 11.1077 7.05C11.1966 6.72778 11.241 6.37778 11.241 6C11.241 4.88889 10.8521 3.94444 10.0743 3.16667C9.29656 2.38889 8.35211 2 7.241 2C6.12989 2 5.18545 2.38889 4.40767 3.16667C3.62989 3.94444 3.241 4.88889 3.241 6C3.241 6.37778 3.28544 6.72778 3.37433 7.05C3.46322 7.37222 3.59656 7.68889 3.77433 8L2.05133 9Z"
                    fill="white" fill-opacity="0.6" />
            </svg>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useNavigationState } from '../composables/NavigationState';

const { selectedNavTile } = useNavigationState();


</script>

<style lang="scss" scoped>
nav {
    position: absolute;
    border-radius: 8px;
    top: 24px;
    left: 16px;
    right: 16px;
    height: 60px;
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.27);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(15.9px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 12px;
    z-index: 20;

    & .right-button {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        margin-right: 8px;
    }

    & .back-button {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        margin-right: 8px;
        font-size: 20px;
    }

    & .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 24px;
        color: rgba($color: #fff, $alpha: 0.6);

        &-box {
            width: 48px;
            height: 48px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
        }
    }
}
</style>