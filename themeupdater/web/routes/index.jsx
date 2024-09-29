// File: web/routes/index.jsx
import React, { useState } from 'react';
import { api } from '../api';
import { Card, Button, TextField, Toast, Spinner, Page } from '@shopify/polaris';
import { rewriteThemeCode } from '../openai'; // Ensure this path is correct
import { useGadget } from '@gadgetinc/react-shopify-app-bridge';

function Index() {
  const [themeCode, setThemeCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, content: '' });

  const { isAuthenticated } = useGadget();

  if (!isAuthenticated) {
    return <Spinner accessibilityLabel="Loading spinner" size="large" />;
  }

  const handleDuplicate = async () => {
    setLoading(true);
    try {
      await api.shopifyTheme.create({ themeCode }); // Adjust parameters as needed
      setToast({ show: true, content: 'Theme duplicated successfully' });
    } catch (error) {
      console.error("Error duplicating theme:", error);
      setToast({ show: true, content: 'Error duplicating theme' });
    }
    setLoading(false);
  };

  const handleAudit = async () => {
    setLoading(true);
    try {
      const cleanedCode = await rewriteThemeCode(themeCode);
      setThemeCode(cleanedCode);
      setToast({ show: true, content: 'Theme audited and cleaned successfully' });
    } catch (error) {
      console.error("Error auditing theme:", error);
      setToast({ show: true, content: 'Error auditing theme' });
    }
    setLoading(false);
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      await api.shopifyTheme.publish({ themeCode }); // Adjust parameters as needed
      setToast({ show: true, content: 'Theme published successfully' });
    } catch (error) {
      console.error("Error publishing theme:", error);
      setToast({ show: true, content: 'Error publishing theme' });
    }
    setLoading(false);
  };

  return (
    <Page title="Theme Management">
      {toast.show && <Toast content={toast.content} onDismiss={() => setToast({ show: false, content: '' })} />}
      
      <Card sectioned>
        <TextField
          label="Theme Code"
          value={themeCode}
          onChange={(value) => setThemeCode(value)}
          multiline={8}
        />
        <Button primary onClick={handleDuplicate} loading={loading} disabled={loading}>
          Duplicate Theme
        </Button>
        <Button onClick={handleAudit} loading={loading} disabled={loading}>
          Audit Theme
        </Button>
        <Button onClick={handlePublish} loading={loading} disabled={loading}>
          Publish Theme
        </Button>
      </Card>
    </Page>
  );
}

export default Index;