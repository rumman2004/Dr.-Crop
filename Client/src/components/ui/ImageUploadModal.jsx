import { ImageUp, Loader2, RotateCcw, UploadCloud, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { analyzeCropImage } from "../../api/cropApi";
import { useAuth } from "../../context/AuthContext";
import AnalysisResult from "../analysis/AnalysisResult";
import Button from "./Button";
import Card from "./Card";

export default function ImageUploadModal({ onComplete }) {
  const { user, updateUser } = useAuth();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const previewUrl = useMemo(() => {
    if (!file) {
      return "";
    }

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const selectFile = (selectedFile) => {
    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Upload a JPG, PNG, or WEBP crop image.");
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setError("");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Choose a crop image first.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await analyzeCropImage(file);
      setResult(response);
      if (updateUser && user) {
        updateUser({ credits: user.credits - 1 });
      }
      onComplete?.(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-5">
      <Card className="glass-panel p-4 sm:p-5">
        <input
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(event) => selectFile(event.target.files?.[0])}
          ref={inputRef}
          type="file"
        />

        <div
          className={`flex min-h-80 flex-col items-center justify-center rounded-[1.5rem] border border-dashed p-5 text-center transition ${
            isDragging
              ? "border-black bg-[#F5F5F2]"
              : "border-black/20 bg-white/70"
          }`}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="w-full">
              <div className="relative overflow-hidden rounded-[1.25rem]">
                <img
                  alt="Selected crop preview"
                  className="h-80 w-full object-cover"
                  src={previewUrl}
                />
                <button
                  aria-label="Remove selected image"
                  className="absolute right-3 top-3 rounded-full bg-white/95 p-2 text-black shadow"
                  onClick={reset}
                  type="button"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 truncate text-sm font-medium text-[#6F6F6F]">
                {file.name}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 rounded-full bg-black p-4 text-white">
                <ImageUp aria-hidden="true" className="h-8 w-8" />
              </div>
              <h2 className="font-display text-4xl text-black">
                Scan a crop image
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#6F6F6F]">
                Clear leaf, fruit, stem, or whole-plant photos work best.
              </p>
              <Button
                className="mt-5"
                onClick={() => inputRef.current?.click()}
                variant="secondary"
              >
                <UploadCloud aria-hidden="true" className="h-4 w-4" />
                Select image
              </Button>
            </>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-black/10 bg-[#F5F5F2] p-4 text-sm text-black">
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button
            className="w-full sm:w-auto"
            disabled={!file || isLoading}
            onClick={handleAnalyze}
            size="lg"
          >
            {isLoading ? (
              <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            ) : (
              <UploadCloud aria-hidden="true" className="h-5 w-5" />
            )}
            {isLoading ? "Analyzing" : "Analyze crop"}
          </Button>
          <Button
            className="w-full sm:w-auto"
            disabled={isLoading}
            onClick={reset}
            size="lg"
            variant="ghost"
          >
            <RotateCcw aria-hidden="true" className="h-5 w-5" />
            Reset
          </Button>
        </div>
      </Card>

      {result?.analysis && (
        <AnalysisResult analysis={result.analysis} scan={result.scan} />
      )}
    </div>
  );
}
