import Dexie, { Table } from "dexie";
import { RunPodGeneratedImages } from "../components/GeneratedImages";



export class MyDatabase extends Dexie {
    generatedImages!: Table<RunPodGeneratedImages>;
    constructor() {
      super('myDatabase');
      this.version(1).stores({
        generatedImages: '++id, prompt, *images'
      });
    }
  }
  
  export const db = new MyDatabase();