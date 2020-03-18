## API

| 参数               | 是否必须 | 类型                               | 默认值 | 说明                                                            |
| :----------------- | :------- | :--------------------------------- | :----- | :-------------------------------------------------------------- |
| url                | true     | string                             | ''     | 图片地址                                                        |
| visible            | true     | boolean                            | false  | 可视状态                                                        |
| onClose            | true     | () => void;                        | null   | 关闭时候的回调                                                  |
| simpleMode         | false    | boolean                            | true   | 简单模式, 当为 true 时, 不接受 operator 和 fixedOnScreen        |
| operator           | true     | 'default' \| null \| OperatorProps | null;  | 控制条, null 则生成简易模式, 'default' 则生成默认操作栏         |
| fixedOnScreen      | false    | boolean                            | true   | 是否在整个全屏遮罩固定, 简易模式下(operator = null) 必定为 true |
| getImageLoadedSize | false    | (state: BaseImageProps) => void;   | null   | 图片加载成功后返回图片的加载尺寸                                |