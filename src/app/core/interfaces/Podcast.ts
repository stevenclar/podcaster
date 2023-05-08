import Episode from "./Episodes";

export default interface Podcast {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  episodes?: Episode[];
}