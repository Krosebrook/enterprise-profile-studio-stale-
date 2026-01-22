import { get, set, del, keys, clear, createStore } from 'idb-keyval';

// Create custom stores for different data types
const documentsStore = createStore('int-os-documents', 'documents');
const personasStore = createStore('int-os-personas', 'personas');
const preferencesStore = createStore('int-os-preferences', 'preferences');
const syncQueueStore = createStore('int-os-sync-queue', 'queue');

// Types for offline data
export interface OfflineDocument {
  id: string;
  title: string;
  content: string;
  slug: string;
  category?: string;
  tags?: string[];
  updatedAt: string;
  synced: boolean;
}

export interface OfflinePersona {
  id: string;
  name: string;
  department?: string;
  jobTitle?: string;
  skills?: string[];
  updatedAt: string;
  synced: boolean;
}

export interface SyncQueueItem {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: 'document' | 'persona' | 'profile';
  data: Record<string, unknown>;
  createdAt: string;
  retryCount: number;
}

// Generic offline storage utilities
export const offlineStorage = {
  // Documents
  async saveDocument(doc: OfflineDocument): Promise<void> {
    await set(doc.id, { ...doc, updatedAt: new Date().toISOString() }, documentsStore);
  },

  async getDocument(id: string): Promise<OfflineDocument | undefined> {
    return get(id, documentsStore);
  },

  async getAllDocuments(): Promise<OfflineDocument[]> {
    const allKeys = await keys(documentsStore);
    const docs = await Promise.all(allKeys.map(key => get(key, documentsStore)));
    return docs.filter(Boolean) as OfflineDocument[];
  },

  async deleteDocument(id: string): Promise<void> {
    await del(id, documentsStore);
  },

  async clearDocuments(): Promise<void> {
    await clear(documentsStore);
  },

  // Personas
  async savePersona(persona: OfflinePersona): Promise<void> {
    await set(persona.id, { ...persona, updatedAt: new Date().toISOString() }, personasStore);
  },

  async getPersona(id: string): Promise<OfflinePersona | undefined> {
    return get(id, personasStore);
  },

  async getAllPersonas(): Promise<OfflinePersona[]> {
    const allKeys = await keys(personasStore);
    const personas = await Promise.all(allKeys.map(key => get(key, personasStore)));
    return personas.filter(Boolean) as OfflinePersona[];
  },

  async deletePersona(id: string): Promise<void> {
    await del(id, personasStore);
  },

  // Preferences
  async setPreference<T>(key: string, value: T): Promise<void> {
    await set(key, value, preferencesStore);
  },

  async getPreference<T>(key: string): Promise<T | undefined> {
    return get(key, preferencesStore);
  },

  async removePreference(key: string): Promise<void> {
    await del(key, preferencesStore);
  },

  // Sync Queue for offline mutations
  async addToSyncQueue(item: Omit<SyncQueueItem, 'id' | 'createdAt' | 'retryCount'>): Promise<void> {
    const queueItem: SyncQueueItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      retryCount: 0
    };
    await set(queueItem.id, queueItem, syncQueueStore);
  },

  async getSyncQueue(): Promise<SyncQueueItem[]> {
    const allKeys = await keys(syncQueueStore);
    const items = await Promise.all(allKeys.map(key => get(key, syncQueueStore)));
    return (items.filter(Boolean) as SyncQueueItem[]).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  },

  async removeSyncQueueItem(id: string): Promise<void> {
    await del(id, syncQueueStore);
  },

  async updateSyncQueueItem(id: string, updates: Partial<SyncQueueItem>): Promise<void> {
    const item = await get(id, syncQueueStore) as SyncQueueItem | undefined;
    if (item) {
      await set(id, { ...item, ...updates }, syncQueueStore);
    }
  },

  async clearSyncQueue(): Promise<void> {
    await clear(syncQueueStore);
  }
};

// Export/Download functionality
export const downloadManager = {
  async downloadAsJSON(data: unknown, filename: string): Promise<void> {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  async downloadAsMarkdown(content: string, filename: string): Promise<void> {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.md') ? filename : `${filename}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  async downloadBlob(blob: Blob, filename: string): Promise<void> {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

// Import/Upload functionality
export const uploadManager = {
  async readAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  },

  async readAsJSON<T>(file: File): Promise<T> {
    const text = await this.readAsText(file);
    return JSON.parse(text) as T;
  },

  async readAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  },

  async readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  }
};

// Local storage utilities with fallback
export const localStorageManager = {
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage is not available:', e);
    }
  },

  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('LocalStorage is not available:', e);
      return defaultValue;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('LocalStorage is not available:', e);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('LocalStorage is not available:', e);
    }
  }
};
