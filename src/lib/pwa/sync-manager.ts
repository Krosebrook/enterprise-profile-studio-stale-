import { offlineStorage, SyncQueueItem } from './offline-storage';
import { supabase } from '@/integrations/supabase/client';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

export interface SyncResult {
  success: boolean;
  synced: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}

// Background sync manager for offline mutations
export const syncManager = {
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  listeners: new Set<(online: boolean) => void>(),

  init(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifyListeners(true);
      this.processSyncQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifyListeners(false);
    });

    // Initial check
    this.isOnline = navigator.onLine;
  },

  subscribe(listener: (online: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },

  notifyListeners(online: boolean): void {
    this.listeners.forEach(listener => listener(online));
  },

  async processSyncQueue(): Promise<SyncResult> {
    if (!this.isOnline) {
      return { success: false, synced: 0, failed: 0, errors: [{ id: 'offline', error: 'Device is offline' }] };
    }

    const queue = await offlineStorage.getSyncQueue();
    const result: SyncResult = { success: true, synced: 0, failed: 0, errors: [] };

    for (const item of queue) {
      try {
        await this.processQueueItem(item);
        await offlineStorage.removeSyncQueueItem(item.id);
        result.synced++;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (item.retryCount < MAX_RETRIES) {
          await offlineStorage.updateSyncQueueItem(item.id, {
            retryCount: item.retryCount + 1
          });
          // Exponential backoff
          await new Promise(resolve => 
            setTimeout(resolve, RETRY_DELAY_MS * Math.pow(2, item.retryCount))
          );
        } else {
          result.failed++;
          result.errors.push({ id: item.id, error: errorMessage });
        }
      }
    }

    result.success = result.failed === 0;
    return result;
  },

  async processQueueItem(item: SyncQueueItem): Promise<void> {
    switch (item.entity) {
      case 'document':
        await this.syncDocument(item);
        break;
      case 'persona':
        await this.syncPersona(item);
        break;
      case 'profile':
        await this.syncProfile(item);
        break;
      default:
        throw new Error(`Unknown entity type: ${item.entity}`);
    }
  },

  async syncDocument(item: SyncQueueItem): Promise<void> {
    const { data } = item;
    
    switch (item.type) {
      case 'create':
        const { error: createError } = await supabase
          .from('knowledge_base_documents')
          .insert(data as never);
        if (createError) throw createError;
        break;
        
      case 'update':
        const { error: updateError } = await supabase
          .from('knowledge_base_documents')
          .update(data as never)
          .eq('id', data.id as string);
        if (updateError) throw updateError;
        break;
        
      case 'delete':
        const { error: deleteError } = await supabase
          .from('knowledge_base_documents')
          .delete()
          .eq('id', data.id as string);
        if (deleteError) throw deleteError;
        break;
    }
  },

  async syncPersona(item: SyncQueueItem): Promise<void> {
    const { data } = item;
    
    switch (item.type) {
      case 'create':
        const { error: createError } = await supabase
          .from('employee_personas')
          .insert(data as never);
        if (createError) throw createError;
        break;
        
      case 'update':
        const { error: updateError } = await supabase
          .from('employee_personas')
          .update(data as never)
          .eq('id', data.id as string);
        if (updateError) throw updateError;
        break;
        
      case 'delete':
        const { error: deleteError } = await supabase
          .from('employee_personas')
          .delete()
          .eq('id', data.id as string);
        if (deleteError) throw deleteError;
        break;
    }
  },

  async syncProfile(item: SyncQueueItem): Promise<void> {
    const { data } = item;
    
    switch (item.type) {
      case 'create':
        const { error: createError } = await supabase
          .from('enterprise_profiles')
          .insert(data as never);
        if (createError) throw createError;
        break;
        
      case 'update':
        const { error: updateError } = await supabase
          .from('enterprise_profiles')
          .update(data as never)
          .eq('id', data.id as string);
        if (updateError) throw updateError;
        break;
        
      case 'delete':
        const { error: deleteError } = await supabase
          .from('enterprise_profiles')
          .delete()
          .eq('id', data.id as string);
        if (deleteError) throw deleteError;
        break;
    }
  }
};

// Initialize sync manager
if (typeof window !== 'undefined') {
  syncManager.init();
}
