import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { offlineStorage, downloadManager, uploadManager, localStorageManager } from '@/lib/pwa/offline-storage';

// Mock idb-keyval
vi.mock('idb-keyval', () => ({
  get: vi.fn(),
  set: vi.fn(),
  del: vi.fn(),
  keys: vi.fn(),
  clear: vi.fn(),
  createStore: vi.fn(() => ({}))
}));

describe('localStorageManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should set and get a string value', () => {
    localStorageManager.set('testKey', 'testValue');
    expect(localStorageManager.get('testKey')).toBe('testValue');
  });

  it('should set and get an object value', () => {
    const testObj = { name: 'test', value: 123 };
    localStorageManager.set('testObj', testObj);
    expect(localStorageManager.get('testObj')).toEqual(testObj);
  });

  it('should return default value when key does not exist', () => {
    expect(localStorageManager.get('nonexistent', 'default')).toBe('default');
  });

  it('should remove a value', () => {
    localStorageManager.set('toRemove', 'value');
    localStorageManager.remove('toRemove');
    expect(localStorageManager.get('toRemove')).toBeUndefined();
  });

  it('should clear all values', () => {
    localStorageManager.set('key1', 'value1');
    localStorageManager.set('key2', 'value2');
    localStorageManager.clear();
    expect(localStorageManager.get('key1')).toBeUndefined();
    expect(localStorageManager.get('key2')).toBeUndefined();
  });
});

describe('downloadManager', () => {
  let mockCreateElement: ReturnType<typeof vi.spyOn>;
  let mockAppendChild: ReturnType<typeof vi.spyOn>;
  let mockRemoveChild: ReturnType<typeof vi.spyOn>;
  let mockCreateObjectURL: ReturnType<typeof vi.spyOn>;
  let mockRevokeObjectURL: ReturnType<typeof vi.spyOn>;
  let mockAnchor: { href: string; download: string; click: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockAnchor = { href: '', download: '', click: vi.fn() };
    mockCreateElement = vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any);
    mockAppendChild = vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor as any);
    mockRemoveChild = vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockAnchor as any);
    mockCreateObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-url');
    mockRevokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should download JSON data', async () => {
    const testData = { foo: 'bar' };
    await downloadManager.downloadAsJSON(testData, 'test.json');

    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockAnchor.download).toBe('test.json');
    expect(mockAnchor.click).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:test-url');
  });

  it('should download Markdown content', async () => {
    await downloadManager.downloadAsMarkdown('# Test', 'test');

    expect(mockAnchor.download).toBe('test.md');
    expect(mockAnchor.click).toHaveBeenCalled();
  });

  it('should add .md extension if missing', async () => {
    await downloadManager.downloadAsMarkdown('# Test', 'document');
    expect(mockAnchor.download).toBe('document.md');
  });
});

describe('uploadManager', () => {
  it('should read file as text', async () => {
    const content = 'Hello, World!';
    const file = new File([content], 'test.txt', { type: 'text/plain' });
    
    const result = await uploadManager.readAsText(file);
    expect(result).toBe(content);
  });

  it('should read file as JSON', async () => {
    const data = { test: 'value' };
    const file = new File([JSON.stringify(data)], 'test.json', { type: 'application/json' });
    
    const result = await uploadManager.readAsJSON(file);
    expect(result).toEqual(data);
  });

  it('should read file as DataURL', async () => {
    const content = 'test content';
    const file = new File([content], 'test.txt', { type: 'text/plain' });
    
    const result = await uploadManager.readAsDataURL(file);
    expect(result).toContain('data:text/plain;base64,');
  });
});
