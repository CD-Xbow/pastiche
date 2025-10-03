import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ImageDisplayProps {
  imageUrl: string | null;
  isGenerating: boolean;
}

export const ImageDisplay = ({ imageUrl, isGenerating }: ImageDisplayProps) => {
  const handleCopyToClipboard = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      console.error('Copy error:', error);
      toast.error("Failed to copy image");
    }
  };

  const handleDownload = (format: 'jpg' | 'png') => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Image downloaded as ${format.toUpperCase()}`);
  };

  return (
    <Card className="p-6 bg-gradient-card border-border space-y-4">
      <div className="aspect-square rounded-lg bg-muted/20 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-center p-8">
            <Sparkles className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              {isGenerating ? "Generating..." : "Your image will appear here"}
            </p>
          </div>
        )}
      </div>

      {imageUrl && (
        <div className="flex gap-2">
          <Button
            onClick={handleCopyToClipboard}
            variant="outline"
            className="flex-1 border-border"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button
            onClick={() => handleDownload('jpg')}
            variant="outline"
            className="flex-1 border-border"
          >
            <Download className="mr-2 h-4 w-4" />
            JPG
          </Button>
          <Button
            onClick={() => handleDownload('png')}
            variant="outline"
            className="flex-1 border-border"
          >
            <Download className="mr-2 h-4 w-4" />
            PNG
          </Button>
        </div>
      )}
    </Card>
  );
};
