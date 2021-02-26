---
title: Image-Preview
toc: menu
---

## Overview

|                   |                                            |
| :---------------- | :----------------------------------------- |
| import name       | ImagePreview                               |
| description       | View a image with some interactive actions |
| feature: basic    | scale, drag, rotate, free-rotate           |
| feature: upcoming | custom operation toolbar                   |
| feature: future   | measure, simple drawing, save              |

## Demo

<code src="../../src/components/maintaining/image-preview/demo/demo-simple.tsx" />

<code src="../../src/components/maintaining/image-preview/demo/demo-custom-operation.tsx" />

<code src="../../src/components/maintaining/image-preview/demo/demo-custom-toolbar.tsx" />

<code src="../../src/components/maintaining/image-preview/demo/demo-unfixed.tsx" />

## API

| prop name          | required | type                                  | default | description                                      |
| :----------------- | :------- | :------------------------------------ | :------ | :----------------------------------------------- |
| url                | true     | string                                | ''      | url image                                        |
| visible            | true     | boolean                               | false   | whether component is visible or not              |
| onClose            | true     | () => void;                           | null    | call the function when closed                    |
| simpleMode         | false    | boolean                               | true    | no operation toolbar, only zoom.                 |
| operatorBar        | true     | 'default' \| null \| OperatorBarProps | null;   | operations that controls image's state           |
| fixedOnScreen      | false    | boolean                               | true    | whether fixed on a full screen mask              |
| getImageLoadedSize | false    | (state: BaseImageProps) => void;      | null    | when image loaded call function with size params |

## details

| prop name   | further description                                                                          |
| :---------- | :------------------------------------------------------------------------------------------- |
| simpleMode  | when true: fixedOnScreen is settled as true, operatorBar is settled as null                  |
| operatorBar | when 'default': generate default operations, when OperatorBarProps: receives array of string |

## types

| type name        | description                      |
| :--------------- | :------------------------------- |
| OperatorBarProps | currently please check it on ide |
| BaseImageProps   | currently please check it on ide |
