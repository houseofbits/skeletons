import { ref } from "vue";

const selectedNavTile = ref<number | null>(null);
const shouldShowNavGroup = ref<boolean>(false);
const selectedNavGroup = ref<number | null>(null);
const title = ref<string | null>(null);

export function useNavigationState() {
    function setSelectedNavTile(index: number | null) {
        selectedNavTile.value = index;
    }

    function isNavTileSelected(index: number): boolean {
        return selectedNavTile.value === index;
    }

    function setTitle(value: string | null) {
        title.value = value;
    }

    function getTitle() {
        return title;
    }

    function resetNavigationState() {
        selectedNavTile.value = null;
        selectedNavGroup.value = null;
        title.value = null;
    }

    return {
        selectedNavTile,
        setSelectedNavTile,
        isNavTileSelected,
        shouldShowNavGroup,
        selectedNavGroup,
        setTitle,
        getTitle,
        resetNavigationState
    };
};