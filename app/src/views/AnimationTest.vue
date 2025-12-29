<template>
  <template v-for="model in loadedModels" :key="'model-' + model">
    <ViewerGeneric v-show="model === selectedModel" :model="model" />
  </template>

  <div
    class="dropzone"
    :class="{ dragover }"
    @click="openFileDialog"
    @dragenter.prevent
    @dragover.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    @drop.prevent="onDrop"
  >
    <input
      ref="fileInput"
      type="file"
      hidden
      multiple
      :accept="accept"
      @change="onFileChange"
    />
    <div v-if="loading" class="dot-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div v-else>Upload</div>
  </div>

  <ul class="loaded-models-list">
    <li v-for="model in loadedModels" :key="model" @click="selectModel(model)">
      {{ model }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import ViewerGeneric from "@src/components/ViewerGeneric.vue";
import { ref } from "vue";
import ScenePreloadService from "@src/services/ScenePreloadService";

const allowedExtensions = ["fbx", "glb"];

const accept = allowedExtensions.map((ext) => `.${ext}`).join(",");

const fileInput = ref<HTMLInputElement | null>(null);
const dragover = ref<boolean>(false);
const loading = ref<boolean>(false);
const selectedModel = ref<string | null>(null);
const loadedModels = ref<string[]>([]);

function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

function openFileDialog(): void {
  fileInput.value?.click();
}

function onDrop(e: DragEvent): void {
  dragover.value = false;
  if (!e.dataTransfer) return;

  loading.value = true;
  addFiles(e.dataTransfer.files);
}

function onFileChange(e: Event): void {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;

  loading.value = true;
  addFiles(target.files);
}

async function addFiles(fileList: FileList): Promise<void> {
  for (const file of Array.from(fileList)) {
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (!ext || !allowedExtensions.includes(ext)) {
      console.warn(`Rejected file: ${file.name}`);
      continue;
    }

    const buffer = await fileToArrayBuffer(file);

    const modelKey = file.name;
    await ScenePreloadService.loadAssetFromData(ext, modelKey, buffer);
    loadedModels.value.push(modelKey);

    selectModel(modelKey);

    break;
  }

  loading.value = false;
}

function selectModel(modelKey: string) {
  selectedModel.value = modelKey;
}
</script>

<style scoped lang="scss">
.dropzone {
  position: absolute;
  border: 2px dashed #ffffff;
  top: 120px;
  left: 10px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.dropzone.dragover {
  background: rgba(255, 255, 255, 0.3);
}

.loaded-models-list {
  position: absolute;
  top: 240px;
  left: 0;
  color: #ffffff;
  margin: 0;
  padding: 0;
  margin-left: 10px;

  & li {
    cursor: pointer;
    margin-top: 8px;
    &:hover {
      text-decoration: underline;
    }
  }
}

.dot-loader {
  display: flex;
  gap: 8px; /* space between dots */
  justify-content: center;
  align-items: center;
  height: 50px;
}

.dot-loader span {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}

.dot-loader span:nth-child(1) {
  animation-delay: 0s;
}

.dot-loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.dot-loader span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.6;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
