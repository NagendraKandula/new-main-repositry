// pages/Publish.tsx
import React, { useState } from 'react'; // ✅ Import useState
import styles from '../styles/Publish.module.css';
import ChannelSelector from './ChannelSelector';
import ContentEditor from './ContentEditor';
import DynamicPreview from './DynamicPreview';

export default function Publish() {
  // ✅ State lives INSIDE the component
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Create and publish</h1>
      </div>

      {/* Left panel: ChannelSelector + ContentEditor */}
      <div className={styles.editorPreviewContainer}>
        <div className={styles.leftPanel}>
          <ChannelSelector />
          <ContentEditor 
            content={content}
            onContentChange={setContent}
            files={files}
            onFilesChange={setFiles}
          />
        </div>
        <div className={styles.previewWrapper}>
          <DynamicPreview
            selectedPlatforms={['Facebook', 'Twitter']}
            content={content}
            mediaFiles={files}
            onPublish={() => console.log('Publish clicked')}
            onSaveDraft={() => console.log('Save Draft clicked')}
            onSchedule={() => console.log('Schedule clicked')}
          />
        </div>
      </div>
    </div>
  );
}