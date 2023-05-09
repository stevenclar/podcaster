import Episode from "./Episodes";
import Podcast from "./Podcast";

interface Data {
  selectedPodcast?: Podcast;
  selectedEpisode?: Episode;
}

export default interface AppState {
  data: Data | null;
  isLoading: boolean;
}