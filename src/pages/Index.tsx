import { Link } from "react-router-dom";
import { ImageGenerator } from "@/components/ImageGenerator";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <Link to="/help">
            <Button variant="outline" size="sm">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </Link>
        </div>
        <ImageGenerator />
      </div>
    </div>
  );
};

export default Index;
