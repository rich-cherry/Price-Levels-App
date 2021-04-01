import { useState } from 'react';
import { Card, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from 'store-js';
import { ProductList } from '../components/ProductList';

const Index = () => {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get('ids');

  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set('ids', idsFromResources)
    console.log(`this is product ids`, store.get('ids'));
  }

  return (
    <Card>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => setModal({ open: false })}
        onSelection={(resources) => handleSelection(resources)}
      />
      { emptyState ?
        <Layout>
          <EmptyState
            heading="Price Levels By Customer Tag"
            action={{
              content: 'Create Price Level',
              onAction: () => setModal({ open: true })
            }}
            secondaryAction={{ content: 'Learn more', url: 'https://help.shopify.com' }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>Create different price levels for customers based on customer tag.</p>
          </EmptyState>
        </Layout>
        :
        <ProductList />
      }
    </Card>
  )
};

export default Index;
