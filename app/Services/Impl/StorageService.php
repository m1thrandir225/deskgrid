<?php

namespace App\Services\Impl;

use App\Services\IStorageService;
use Illuminate\Support\Facades\Storage;
use ILluminate\Support\Str;
use League\Flysystem\UnableToCheckFileExistence;

class StorageService implements IStorageService
{
    public function __construct(
        protected ?string $disk = null,
        protected string $basePath = ''
    ) {
        $this->disk = $disk ?? config('filesystems.default');
    }

    public function uploadFile($file, ?string $path = null, ?string $fileName = null): string
    {
        $fullPath = $this->fullPath($path);

        if (is_string($file)) {
            $fileName = $fileName ?: Str::random(40);
            Storage::disk($this->disk)->put("{$fullPath}/{$fileName}", $file);
        } else {
            $fileName = $fileName ?: $file->getClientOriginalName();
            $file->storeAs($fullPath, $fileName, ['disk' => $this->disk]);
        }

        return "{$fullPath}/{$fileName}";
    }

    public function deleteFile(string $filePath): string
    {
        $fullPath = $this->fullPath($filePath);

        if (!$this->fileExists($fullPath)) {
            throw new \Exception("File not found: {$fullPath}");
        }

        Storage::disk($this->disk)->delete($fullPath);

        return "File deleted: {$fullPath}";
    }

    public function fileExists(string $filePath): bool
    {
        $fullPath = $this->fullPath($filePath);

        try {
            return Storage::disk($this->disk)->exists($fullPath);
        } catch (UnableToCheckFileExistence $e) {
            return false;
        }
    }

    public function replaceFile(string $oldPath, $newFile, ?string $newName = null): string
    {
        $fullOldPath = $this->fullPath($oldPath);

        if (!$this->fileExists($fullOldPath)) {
            throw new \Exception("File not found: {$fullOldPath}");
        }

        $newPath = $this->uploadFile($newFile, dirname($fullOldPath), $newName);
        $this->deleteFile($fullOldPath);

        return $newPath;
    }


    protected function fullPath(?string $path = null): string
    {
        return $this->basePath.($path ? '/'.ltrim($path, '/') : '');
    }
}
