import { initNavigation } from "./components/navigation";
import { initGridSizePicker } from "./components/gridSizePicker";
import { initMosaicGrid } from "./components/mosaicGrid";
import { initSearch } from "./components/search";
import { initSave } from "./components/save";
import { renderCollection } from "./components/collections";

initNavigation();
initGridSizePicker();
initMosaicGrid(4);
initSearch();
initSave();
renderCollection();