import { ImageGenerator } from "@/components/ImageGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI Image Studio
          </h1>
          <p className="text-muted-foreground text-lg">
            Transform your ideas into stunning visuals with AI
          </p>
        </div>
        <ImageGenerator />
      </div>
    </div>
  );
};

export default Index;
