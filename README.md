# Gear-ware for React

## what is Gear-ware

Gear-ware is a library for React, focus on common but middle-weighted components, like image preview with scale rotate drag, waterfall preview with auto adapt to screen and so on

> for more details visit <gears.caperal.cn>

## install

`npm install gearware`

or

`yarn add gearware`

## documentation

<gears.caperal.cn>

## useage

```tsx
import { ImagePreview } from 'gearware';
import img from 'your_beautiful_world.png';

const ImagePreviewDemo = () => {
    const [show, setShow] = useState<number | null>(-1);

    const close = () => {
        setShow(null);
    };

    return (
        <div>
            <img src={img} alt="your beautiful world" onClick={() => setShow(1)} />
            <ImagePreview url={img} simpleMode={true} visible={show === 1} onClose={close} />
        </div>
    );
};
```

## current available

### ImagePreview

<gears.caperal.cn/comp/image-preview>

## issus

will available when official launched
