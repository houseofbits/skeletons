<template>
  <ViewerGeneric v-if="selectedModel" :model="selectedModel" :key="fileUploadCounter"/>

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
    Upload
  </div>

  <ul class="loaded-models-list">
    <li v-for="model in loadedModels" :key="model" @click="selectModel(model)">{{ model }}</li>
  </ul>
</template>

<script setup lang="ts">
import ViewerGeneric from "@src/components/ViewerGeneric.vue";
import { ref } from "vue";
import ScenePreloadService, { type Models } from "@src/services/ScenePreloadService";

const allowedExtensions = [
  "fbx",
  "glb",
];

const accept = allowedExtensions.map(ext => `.${ext}`).join(",");

const fileInput = ref<HTMLInputElement | null>(null);
const dragover = ref<boolean>(false);
let fileUploadCounter = 0;
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
  addFiles(e.dataTransfer.files);
}

function onFileChange(e: Event): void {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
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
}

function selectModel(modelKey: string) {
  selectedModel.value = modelKey;
  fileUploadCounter++;
}

function formatSize(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
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
  background: rgba(255,255,255,0.3);
}

.loaded-models-list {
  position: absolute;
  top: 240px;
  left: 0;
  color: #ffffff;
  margin: 0;
  padding: 0;
  margin-left: 10px;

  & li{
    cursor: pointer;
    margin-top: 8px;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
