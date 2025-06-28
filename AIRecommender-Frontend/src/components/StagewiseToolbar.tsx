import { StagewiseToolbar as StagewiseToolbarComponent } from '@stagewise/toolbar-react';
import { createRoot } from 'react-dom/client';

const stagewiseConfig = {
  plugins: []
};

export function StagewiseToolbar() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!document.getElementById('stagewise-toolbar-root')) {
    const toolbarRoot = document.createElement('div');
    toolbarRoot.id = 'stagewise-toolbar-root';
    document.body.appendChild(toolbarRoot);

    const root = createRoot(toolbarRoot);
    root.render(<StagewiseToolbarComponent config={stagewiseConfig} />);
  }

  return null;
} 