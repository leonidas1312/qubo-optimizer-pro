interface FileUploadSectionProps {
  quboFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadSection = ({ quboFile, onFileChange }: FileUploadSectionProps) => {
  return (
    <div className="mb-8">
      <label className="block text-lg font-medium mb-2">
        Upload QUBO Matrix (.npy file)
      </label>
      <div className="flex items-center">
        <input
          type="file"
          accept=".npy"
          onChange={onFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {quboFile && (
          <span className="ml-4 text-sm text-muted-foreground">
            Selected file: {quboFile.name}
          </span>
        )}
      </div>
    </div>
  );
};