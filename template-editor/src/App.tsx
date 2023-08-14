import { useEffect, useRef } from 'react';
import { Template, BLANK_PDF, Designer } from '@pdfme/ui';
import './App.css';

function App() {
  const designerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let template: Template = {
      basePdf: BLANK_PDF,
      schemas: []
    };

    if (designerRef.current) {
      new Designer({
        domContainer: designerRef.current,
        template,
      });
    }
  }, [designerRef]);

  return (
    <div ref={designerRef} />
  );
}

export default App;
