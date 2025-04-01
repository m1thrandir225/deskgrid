<?php

namespace App\Services;

interface IStorageService
{
    /**
    * Upload a file to storage
    * @param mixed $file The file to upload (can be UploadFile instance or file content)
    * @param string|null $path The path where to store the file
    * @param string|null $fileName Optional custom fileName
    * @return string The full path to the stored file
    */
    public function uploadFile($file, ?string $path = null, ?string $fileName = null): string;

    /**
    * Delete a file from storage
    * @param string $filePath The path to the file
    * @return string Success message
    */
    public function deleteFile(string $filePath): string;

    /**
    * Check if a file exists in storage
    * @param string $filePath The path to the file
    * @return bool
    */
    public function fileExists(string $filePath): bool;

    /**
    * Replace a file in storage
    * @param string $oldFilePath Path to the existing file to replace
    * @param mixed $newFile The new file (UploadFile instance or file content)
    * @param string|null $newFileName Optional new filename
    * @return string The full path to the new file
    */
    public function replaceFile(string $oldFilePath, $newFile, ?string $newFileName = null): string;
}
