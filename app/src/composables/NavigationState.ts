import { ref } from "vue";

const selectedNavTile = ref<number | null>(null);
const shouldShowNavGroup = ref<boolean>(false);
const selectedNavGroup = ref<number | null>(null);
const title = ref<string | null>(null);
const isAnimationActive = ref<boolean>(false);
const animationTitle = ref<string | null>(null);

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
        if (isAnimationActive.value && animationTitle.value) {
            return animationTitle.value;
        }

        return title;
    }

    function resetNavigationState() {
        selectedNavTile.value = null;
        selectedNavGroup.value = null;
        title.value = null;
        isAnimationActive.value = false;
        animationTitle.value = null;
    }

    function areNavTilesView() {
        if (shouldShowNavGroup.value && !selectedNavGroup.value) {
            return false;
        }
        return !selectedNavTile.value;
    }

    function setAnimationActive(animTitle: string) {
        isAnimationActive.value = true;
        animationTitle.value = animTitle;
    }

    function resetAnimationActive() {
        isAnimationActive.value = false;    
        animationTitle.value = null;
    }

    return {
        selectedNavTile,
        setSelectedNavTile,
        isNavTileSelected,
        shouldShowNavGroup,
        selectedNavGroup,
        setTitle,
        getTitle,
        resetNavigationState,
        areNavTilesView,
        isAnimationActive,
        animationTitle,
        setAnimationActive,
        resetAnimationActive,
    };
};