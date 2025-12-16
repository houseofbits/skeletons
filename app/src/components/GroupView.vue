<template>
    <NavGroupTile :is-active="true" :left="0" title="Ribas" subtitle="un krūšu kauls" @click="selectGroup(1)">
        <BasicViewer asset="jackal" :class="getRClass(0)" class="absolute"
            :camera-position="{ x: 26.903458858152014, y: 0.3085318542698676, z: -27.36639027167504 }"
            :camera-target="{ x: 8.329575215343231, y: 13.173785743333053, z: -5.2308977119308535 }"
            :activate="groupActive" />
        <BasicViewer asset="pigeon" :class="getRClass(1)" class="absolute"
            :camera-position="{ x: 4.4580939803813795, y: 25.75063958437643, z: -39.25179420740434 }"
            :camera-target="{ x: -4.246580397727152, y: 23.819852393092976, z: -3.4532860112530055 }"
            :activate="groupActive" />
        <BasicViewer asset="lizard" :class="getRClass(2)" class="absolute"
            :camera-position="{ x: -5.639261487553518, y: 19.191457253881836, z: 16.373194778067493 }"
            :camera-target="{ x: -3.7909641487743815, y: 7.194239715447379, z: 0.5600004309309914 }"
            :activate="groupActive" />
    </NavGroupTile>
    <NavGroupTile :is-active="true" :left="1" title="Ekstremitātes" subtitle="un to joslas" @click="selectGroup(2)">
        <BasicViewer asset="lizard" :class="getLClass(0)" class="absolute"
            :camera-position="{ x: -1.0265327612726427, y: 23.761390748385598, z: -9.678987672285142 }"
            :camera-target="{ x: -12.875120663489653, y: 3.582766461181922, z: -5.366454357791101 }"
            :activate="groupActive" />
        <BasicViewer asset="frog" :class="getLClass(1)" class="absolute"
            :camera-position="{ x: 60.11466692319426, y: 118.24839386147517, z: -37.417388280344674 }"
            :camera-target="{ x: 13.317509842977977, y: 7.7212291813095755, z: -4.649666125992658 }"
            :activate="groupActive" />
        <BasicViewer asset="pigeon" :class="getLClass(2)" class="absolute"
            :camera-position="{ x: 27.619932349375823, y: 33.71093331991348, z: -22.290164942360967 }"
            :camera-target="{ x: 8.88389381095182, y: 12.378028387594796, z: -3.770871584460137 }"
            :activate="groupActive" />            
            
    </NavGroupTile>
</template>

<script setup lang="ts">
import BasicViewer from "@src/components/BasicViewer.vue";
import { useNavigationState } from "@src/composables/NavigationState";
import { computed, ref } from "vue";
import NavGroupTile from "@src/components/NavGroupTile.vue";

const { setSelectedNavTile, shouldShowNavGroup, selectedNavGroup } = useNavigationState();

function selectGroup(group: number) {
      selectedNavGroup.value = group;
      setSelectedNavTile(null);
}

shouldShowNavGroup.value = true;
selectedNavGroup.value = null;

const groupActive = computed(() => selectedNavGroup.value === null);

const prevActiveIndexR = ref(0);
const activeIndexR = ref(1);
const prevActiveIndexL = ref(0);
const activeIndexL = ref(1);

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLClass(index: number) {
    if (prevActiveIndexL.value === index) {
        return ['fade-from'];
    }

    if (activeIndexL.value === index) {
        return ['fade-to'];
    }

    return ['inactive'];
}

function getRClass(index: number) {
    if (prevActiveIndexR.value === index) {
        return ['fade-from'];
    }

    if (activeIndexR.value === index) {
        return ['fade-to'];
    }

    return ['inactive'];
}

function transitionR() {
    const prev = activeIndexR.value;
    while(prev == activeIndexR.value) {
        activeIndexR.value = randomInt(0, 2);
    }
    prevActiveIndexR.value = prev;
}

function transitionL() {
    const prev = activeIndexL.value;
    while(prev == activeIndexL.value) {
        activeIndexL.value = randomInt(0, 2);
    }
    prevActiveIndexL.value = prev;
}

function transition() {
    if (randomInt(0, 1) > 0) {
        transitionL();
    } else {
        transitionR();
    }
}

setInterval(transition, 8000);

</script>

<style scoped lang="scss">
.absolute {
    position: absolute;
    top: 0px;
    left: 0px;
}

.inactive {
    display: none;
    opacity: 0;
}

.fade-from {
    z-index: 1;
    opacity: 0;
    transition: opacity 1.5s linear;
    display: block;
}

.fade-to {
    z-index: 0;
    opacity: 1;
    display: block;
}
</style>
