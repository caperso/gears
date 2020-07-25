import React, { useState } from 'react';
import ImagePreview from '../../image-preview';
import Gallery from '../index';

const fakeUnits: any[] = [
  {
    name: 'namibia',
    url: 'https://cdn.pixabay.com/photo/2020/03/24/20/41/namibia-4965456__340.jpg',
    description: 'namibianamibianamibia',
  },
  {
    name: 'sitting',
    url: 'https://cdn.pixabay.com/photo/2020/03/24/08/18/sitting-4963159__340.jpg',
    description: 'sittingsittingsitting',
  },
  {
    name: 'home',
    url: 'https://cdn.pixabay.com/photo/2015/06/24/16/36/home-820389__340.jpg',
    description: 'homehomehome',
  },
  {
    name: 'summer',
    url: 'https://cdn.pixabay.com/photo/2020/02/06/09/39/summer-4823612__340.jpg',
    description: 'summersummersummer',
  },
  {
    name: 'coronavirus',
    url: 'https://cdn.pixabay.com/photo/2020/03/29/15/35/coronavirus-4981176__340.png',
    description: 'coronaviruscoronaviruscoronavirus',
  },
  {
    name: 'hand-washing',
    url: 'https://cdn.pixabay.com/photo/2020/02/04/16/53/hand-washing-4818792__340.jpg',
    description: 'washingwashingwashing',
  },
  {
    name: 'nilgans',
    url: 'https://cdn.pixabay.com/photo/2020/04/03/20/28/nilgans-5000132__340.jpg',
    description: 'nilgansnilgansnilgans',
  },
  {
    name: 'covid',
    url: 'https://cdn.pixabay.com/photo/2020/03/19/21/35/covid-4948866__340.jpg',
    description: 'covidcovidcovid',
  },
  {
    name: 'food',
    url: 'https://cdn.pixabay.com/photo/2020/03/16/12/46/food-4936949__340.jpg',
    description: 'foodfoodfood',
  },
];

const GalleryDemo = () => {
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
