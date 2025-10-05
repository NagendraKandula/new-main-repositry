import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { 
  Upload, 
  FolderOpen, 
  Cloud, 
  HardDrive,
  Camera,
  ImageIcon,
  Video,
  FileImage,
  Loader2,
  Check,
  X
} from "lucide-react";

interface FileUploadMenuProps {
  onFileUpload: (files: FileList) => void;
  triggerText?: string;
  triggerIcon?: React.ReactNode;
  className?: string;
}

interface CloudFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  thumbnail: string;
  source: 'drive' | 'dropbox' | 'onedrive' | 'icloud';
  selected?: boolean;
}

// Mock cloud files for demonstration
const mockCloudFiles: CloudFile[] = [
  {
    id: 'drive_1',
    name: 'vacation-photos-2024.jpg',
    type: 'image',
    size: '3.2 MB',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
    source: 'drive'
  },
  {
    id: 'drive_2',
    name: 'product-demo.mp4',
    type: 'video',
    size: '12.8 MB',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop',
    source: 'drive'
  },
  {
    id: 'dropbox_1',
    name: 'team-meeting-notes.jpg',
    type: 'image',
    size: '1.8 MB',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
    source: 'dropbox'
  },
  {
    id: 'onedrive_1',
    name: 'brand-assets-final.jpg',
    type: 'image',
    size: '4.1 MB',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=150&h=150&fit=crop',
    source: 'onedrive'
  }
];

export function FileUploadMenu({ 
  onFileUpload, 
  triggerText = "Add Files", 
  triggerIcon = <Upload className="h-4 w-4 mr-2" />, 
  className 
}: FileUploadMenuProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [cloudFiles, setCloudFiles] = useState<CloudFile[]>(mockCloudFiles);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLocalUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
      setOpen(false);
      e.target.value = '';
    }
  };

  const handleCloudFileToggle = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleCloudUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    setLoading(true);
    
    // Simulate cloud file download/processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Convert selected cloud files to File objects (mock)
    const selectedCloudFiles = cloudFiles.filter(file => selectedFiles.includes(file.id));
    
    // Create mock FileList from cloud files
    const mockFiles = await Promise.all(
      selectedCloudFiles.map(async (cloudFile) => {
        const response = await fetch(cloudFile.thumbnail);
        const blob = await response.blob();
        return new File([blob], cloudFile.name, { type: cloudFile.type === 'image' ? 'image/jpeg' : 'video/mp4' });
      })
    );

    // Create a mock FileList
    const dt = new DataTransfer();
    mockFiles.forEach(file => dt.items.add(file));
    
    onFileUpload(dt.files);
    
    setLoading(false);
    setOpen(false);
    setSelectedFiles([]);
    toast.success(`${selectedCloudFiles.length} file(s) imported from cloud`);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'drive': return '📁';
      case 'dropbox': return '📦';
      case 'onedrive': return '☁️';
      case 'icloud': return '☁️';
      default: return '📁';
    }
  };

  const getSourceName = (source: string) => {
    switch (source) {
      case 'drive': return 'Google Drive';
      case 'dropbox': return 'Dropbox';
      case 'onedrive': return 'OneDrive';
      case 'icloud': return 'iCloud';
      default: return 'Cloud Storage';
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className={className}
        onClick={() => setOpen(true)}
      >
        {triggerIcon}
        {triggerText}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Add Media Files</DialogTitle>
            <DialogDescription>
              Upload files from your device, cloud storage, or capture new media
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="local" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="local" className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                Local Files
              </TabsTrigger>
              <TabsTrigger value="cloud" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Cloud Storage
              </TabsTrigger>
              <TabsTrigger value="camera" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Camera
              </TabsTrigger>
            </TabsList>

            {/* Local Files Upload */}
            <TabsContent value="local" className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2">Choose files from your device</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select multiple images, videos, or GIFs to upload
                </p>
                
                <div className="space-y-3">
                  <Button onClick={handleLocalUpload} className="w-full max-w-xs">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Images
                    </span>
                    <span className="flex items-center">
                      <Video className="h-4 w-4 mr-1" />
                      Videos
                    </span>
                    <span className="flex items-center">
                      <FileImage className="h-4 w-4 mr-1" />
                      GIFs
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
                <div>
                  <Badge variant="secondary">Max 25MB</Badge>
                  <p className="mt-1">File size limit</p>
                </div>
                <div>
                  <Badge variant="secondary">10 files</Badge>
                  <p className="mt-1">Upload limit</p>
                </div>
                <div>
                  <Badge variant="secondary">Instant</Badge>
                  <p className="mt-1">Upload speed</p>
                </div>
              </div>
            </TabsContent>

            {/* Cloud Storage */}
            <TabsContent value="cloud" className="space-y-4">
              <div className="grid grid-cols-4 gap-3 mb-6">
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-2xl mb-1">📁</span>
                  <span className="text-xs">Google Drive</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-2xl mb-1">📦</span>
                  <span className="text-xs">Dropbox</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-2xl mb-1">☁️</span>
                  <span className="text-xs">OneDrive</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-2xl mb-1">☁️</span>
                  <span className="text-xs">iCloud</span>
                </Button>
              </div>

              <div className="border rounded-lg p-4 max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h4>Recent Files</h4>
                  <Badge variant="secondary">
                    {selectedFiles.length} selected
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {cloudFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`relative border rounded-lg p-3 cursor-pointer transition-all hover:border-blue-300 ${
                        selectedFiles.includes(file.id) 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                          : 'border-border'
                      }`}
                      onClick={() => handleCloudFileToggle(file.id)}
                    >
                      {selectedFiles.includes(file.id) && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}

                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded bg-muted flex-shrink-0 overflow-hidden">
                          <img 
                            src={file.thumbnail} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="text-xs">
                              {getSourceIcon(file.source)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {getSourceName(file.source)}
                            </span>
                          </div>
                          
                          <p className="text-sm truncate">{file.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {file.size}
                            </span>
                            <Badge variant="outline" className="text-xs h-4">
                              {file.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedFiles.length > 0 && (
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedFiles([])}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Selection
                    </Button>
                    
                    <Button 
                      onClick={handleCloudUpload}
                      disabled={loading}
                      size="sm"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Cloud className="h-4 w-4 mr-2" />
                      )}
                      Import {selectedFiles.length} file(s)
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Camera/Screenshot */}
            <TabsContent value="camera" className="space-y-4">
              <div className="text-center py-8">
                <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2">Capture Media</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Take photos or record videos directly
                </p>
                
                <div className="space-y-3 max-w-xs mx-auto">
                  <Button variant="outline" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Video className="h-4 w-4 mr-2" />
                    Record Video
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <FileImage className="h-4 w-4 mr-2" />
                    Screen Capture
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Hidden file input for local upload */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </>
  );
}