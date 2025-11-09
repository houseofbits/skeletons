import { ref } from "vue";

const selectedNavTile = ref<number | null>(null);

export function useNavigationState() {
    function setSelectedNavTile(index: number | null) {
        selectedNavTile.value = index;
    }

    function isNavTileSelected(index: number): boolean {
        return selectedNavTile.value === index;
    }   

    return {
        selectedNavTile,
        setSelectedNavTile,
        isNavTileSelected
    };
};