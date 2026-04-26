import { initNavigation } from "./components/navigation";
import { initGridSizePicker } from "./components/gridSizePicker";
import { initMosaicGrid } from "./components/mosaicGrid";
import { initSearch } from "./components/search";
import { initSave } from "./components/save";
import { initFillGaps } from "./components/fillGaps";
import { renderCollection } from "./components/collections";
import { initRandomizeCovers } from "./components/randomizeCovers";

initNavigation();
initGridSizePicker();
initMosaicGrid(4);
initSearch();
initSave();
initFillGaps();
initRandomizeCovers();
renderCollection();

