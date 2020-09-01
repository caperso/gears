import React, { useEffect, useState } from 'react';
import ImagePreview from '../../image-preview';
import Gallery from '../index';

const fakeUnits: any[] = [];
const GalleryDemo = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const data = require('./data.json');
  }, []);

  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);
  const handleClick = (unit: any) => {
    setUrl(unit.url);
    setShow(true);
  };

  return (
    <>
      <Gallery units={fakeUnits} limit={9} onClick={handleClick} defaultGray={0.3} style={{ height: `70vh` }} />
      <ImagePreview url={url} visible={show} onClose={() => setShow(false)} operatorBar="default" />
    </>
  );
};

export default () => <GalleryDemo />;
