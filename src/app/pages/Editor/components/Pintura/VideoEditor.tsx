import {
  // editor
  locale_en_gb,
  createDefaultImageReader,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  LocaleString,
} from '@pqina/pintura';
import '@pqina/pintura/pintura.css';
import {
  LocaleCollection,
  plugin_trim,
  plugin_trim_locale_en_gb,
} from '@pqina/pintura-video';
import '@pqina/pintura-video/pinturavideo.css';
import { PinturaEditorModal } from '@pqina/react-pintura';

setPlugins(plugin_trim, plugin_crop, plugin_finetune, plugin_filter);

const editorDefaults = {
  enableAutoDestroy: true,
  imageReader: createDefaultImageReader({
    request: {
      credentials: 'include',
    },
  }),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  trimEnableSplit: false,
  finetuneOptions: [
    [
      'brightness',
      (locale: LocaleCollection) => locale.finetuneLabelBrightness,
    ],
    ['contrast', (locale: LocaleCollection) => locale.finetuneLabelContrast],
    [
      'saturation',
      (locale: LocaleCollection) => locale.finetuneLabelSaturation,
    ],
    ['exposure', (locale: LocaleCollection) => locale.finetuneLabelExposure],
    [
      'temperature',
      (locale: LocaleCollection) => locale.finetuneLabelTemperature,
    ],
    ['gamma', (locale: LocaleCollection) => locale.finetuneLabelGamma],
    ['clarity', (locale: LocaleCollection) => locale.finetuneLabelClarity],
  ] as [string, LocaleString][],
  locale: {
    ...locale_en_gb,
    ...plugin_trim_locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_filter_locale_en_gb,

    cropIcon:
      '<path d="M19 19.75H9.9c-4.33 0-5.65-1.32-5.65-5.65V5c0-.41.34-.75.75-.75h9.1c4.33 0 5.65 1.32 5.65 5.65V19c0 .41-.34.75-.75.75Zm-13.25-14v8.35c0 3.49.66 4.15 4.15 4.15h8.35V9.9c0-3.49-.66-4.15-4.15-4.15H5.75Z"></path><path d="M5 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75Z"></path><path d="M5 5.75H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75ZM19 22.75c-.41 0-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75Z"></path><path d="M22 19.75h-3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75Z"></path>',
    finetuneIcon:
      '<path d="M19 22V11M19 7V2M12 22v-5M12 13V2M5 22V11M5 7V2M3 11h4M17 11h4M10 13h4" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>',
    filterIcon:
      '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" d="M14 16c0 1.77-.77 3.37-2 4.46A5.93 5.93 0 018 22c-3.31 0-6-2.69-6-6 0-2.76 1.88-5.1 4.42-5.79a6.019 6.019 0 004 3.58c.5.14 1.03.21 1.58.21s1.08-.07 1.58-.21c.27.68.42 1.43.42 2.21z"></path><path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 8a5.993 5.993 0 01-4.42 5.79c-.5.14-1.03.21-1.58.21s-1.08-.07-1.58-.21A5.993 5.993 0 016 8c0-3.31 2.69-6 6-6s6 2.69 6 6z"></path><path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M22 16c0 3.31-2.69 6-6 6a5.93 5.93 0 01-4-1.54c1.23-1.09 2-2.69 2-4.46 0-.78-.15-1.53-.42-2.21 1.83-.5 3.31-1.84 4-3.58C20.12 10.9 22 13.24 22 16z"></path>',
    annotateIcon:
      '<path d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18" stroke="currentColor" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>',
    stickerIcon:
      '<path d="M21.93 12.86c-.02.19-.05.37-.1.55A5.96 5.96 0 0 0 17.97 12c-3.31 0-6 2.69-6 6 0 1.47.53 2.82 1.41 3.86-.18.05-.36.08-.55.1-.85.08-1.72.04-2.62-.11-4.11-.7-7.42-4.03-8.1-8.15A10.01 10.01 0 0 1 13.67 2.14c4.12.68 7.45 3.99 8.15 8.1.15.9.19 1.77.11 2.62Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21.83 13.41c-.14.49-.4.93-.77 1.3l-6.38 6.38c-.37.37-.81.63-1.3.77A5.96 5.96 0 0 1 11.97 18c0-3.31 2.69-6 6-6 1.47 0 2.82.53 3.86 1.41Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    redactIcon:
      '<path stroke="currentColor" fill="none" stroke-miterlimit="10" stroke-width="1.5" d="M12.61 2.21a.991.991 0 00-1.22 0C9.49 3.66 3.88 8.39 3.91 13.9c0 4.46 3.63 8.1 8.1 8.1s8.1-3.63 8.1-8.09c.01-5.43-5.61-10.24-7.5-11.7z"></path><path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2v20M12 18.96l7.7-3.74M12 13.96l7.37-3.58M12 8.96l5.03-2.45"></path>',
    frameIcon:
      '<path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    resizeIcon:
      '<path d="M2 9.98V9c0-5 2-7 7-7h6c5 0 7 2 7 7v6c0 5-2 7-7 7h-1" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="m13 11 5.01-5.02H14M18.01 5.98v4.01M11 16.15v2.7C11 21.1 10.1 22 7.85 22h-2.7C2.9 22 2 21.1 2 18.85v-2.7C2 13.9 2.9 13 5.15 13h2.7c2.25 0 3.15.9 3.15 3.15Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconToolSharpie:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.81 3.94c-1.54 3.84-5.4 9.06-8.63 11.65l-1.97 1.58c-.25.18-.5.34-.78.45 0-.18-.01-.38-.04-.57-.11-.84-.49-1.62-1.16-2.29-.68-.68-1.51-1.08-2.36-1.19-.2-.01-.4-.03-.6-.01.11-.31.28-.6.49-.84l1.56-1.97c2.58-3.23 7.82-7.11 11.65-8.64.59-.22 1.16-.06 1.52.31.38.37.56.94.32 1.52z"></path><path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.43 17.62c0 1.1-.42 2.15-1.21 2.95-.61.61-1.44 1.03-2.43 1.16L4.33 22c-1.34.15-2.49-.99-2.33-2.35l.27-2.46c.24-2.19 2.07-3.59 4.01-3.63.2-.01.41 0 .6.01.85.11 1.68.5 2.36 1.19.67.67 1.05 1.45 1.16 2.29.01.19.03.38.03.57zM14.24 14.47c0-2.61-2.12-4.73-4.73-4.73"></path>',

    shapeIconToolEraser:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 22h12M2.91 17.58l3.51 3.51a3 3 0 004.24 0l10.43-10.43a3 3 0 000-4.24l-3.51-3.51a3 3 0 00-4.24 0L2.91 13.34a3 3 0 000 4.24zM7.12 9.13l7.75 7.75M3.52 17.66L9.17 12M6.34 20.49L12 14.83"></path>',
    shapeIconToolPath:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.75 22.5h2.52c.96 0 1.58-.68 1.4-1.51l-.41-1.81h-4.5l-.41 1.81c-.18.78.5 1.51 1.4 1.51zM14.26 19.17l1.73-1.54c.97-.86 1.01-1.46.24-2.43l-3.05-3.87c-.64-.81-1.69-.81-2.33 0L7.8 15.2c-.77.97-.77 1.6.24 2.43l1.73 1.54M12.01 11.12v2.53"></path><g><path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12.52 5h-1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h1c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1zM3.27 14.17h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1zM20.73 14.17h-1c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h1c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1zM10.52 3.56c-3.81.45-6.77 3.68-6.77 7.61M20.25 11.17c0-3.92-2.94-7.14-6.73-7.61"></path></g>',
    shapeIconToolRectangle:
      '<path d="M9.3 21h5.4c4.5 0 6.3-1.8 6.3-6.3V9.3C21 4.8 19.2 3 14.7 3H9.3C4.8 3 3 4.8 3 9.3v5.4C3 19.2 4.8 21 9.3 21Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconToolEllipse:
      '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconToolArrow:
      '<path d="M21 9V3H15" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 3L3 21" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    shapeIconToolText:
      '<path d="M2.67 7.17V5.35c0-1.15.93-2.07 2.07-2.07h14.52c1.15 0 2.07.93 2.07 2.07v1.82M12 20.72V4.11M8.06 20.72h7.88" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconToolMove:
      '<path d="m20.96 17.84-1.63.55c-.45.15-.81.5-.96.96l-.55 1.63c-.47 1.41-2.45 1.38-2.89-.03L13.08 15c-.36-1.18.73-2.28 1.9-1.91l5.96 1.85c1.4.44 1.42 2.43.02 2.9Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconButtonSelectSticker:
      '<path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.67 18.95l4.93-3.31c.79-.53 1.93-.47 2.64.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0L22 13.9" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconButtonRemove:
      '<path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconButtonDuplicate:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10c2.29 0 3.43 1.14 3.43 3.43"></path><path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.57 22H14c-2.29 0-3.43-1.14-3.43-3.43v-7.14C10.57 9.14 11.71 8 14 8h4.57C20.86 8 22 9.14 22 11.43v7.14c0 2.29-1.14 3.43-3.43 3.43zM14.87 15h3.26M16.5 16.63v-3.26"></path>',
    shapeIconButtonFlipHorizontal:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M20.5 14.99l-5.01 5.02M3.5 14.99h17M3.5 9.01l5.01-5.02M20.5 9.01h-17"></path>',
    shapeIconButtonFlipVertical:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M20.5 14.99l-5.01 5.02M3.5 14.99h17M3.5 9.01l5.01-5.02M20.5 9.01h-17"></path>',
    shapeIconButtonMoveToFront:
      '<path d="M10.4498 6.71997L6.72974 3L3.00977 6.71997" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.72949 21V3" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.5498 17.28L17.2698 21L20.9898 17.28" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.2695 3V21" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',

    shapeIconTextAlignLeft:
      '<path d="M3 4.5h18M3 9.5h9.47M3 14.5h18M3 19.5h9.47" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconTextAlignCenter:
      '<path d="M3 4.5h18M7.26 9.5h9.48M3 14.5h18M7.26 19.5h9.48" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    shapeIconTextAlignRight:
      '<path d="M3 4.5h18M11.53 9.5H21M3 14.5h18M11.53 19.5H21" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',

    iconButtonRevert:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.55 21.67C18.84 20.54 22 16.64 22 12c0-5.52-4.44-10-10-10C5.33 2 2 7.56 2 7.56m0 0V3m0 4.56H6.44"></path><path stroke="currentColor" fill="none" stroke-dasharray="3 3" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2 12c0 5.52 4.48 10 10 10"></path>',
    iconButtonUndo:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M7.13 18.31h8c2.76 0 5-2.24 5-5s-2.24-5-5-5h-11"></path><path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.43 10.81L3.87 8.25l2.56-2.56"></path>',
    iconButtonRedo:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M16.87 18.31h-8c-2.76 0-5-2.24-5-5s2.24-5 5-5h11"></path><path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.57 10.81l2.56-2.56-2.56-2.56"></path>',

    cropIconButtonRotateLeft:
      '<path d="M7.25 22h4.5C15.5 22 17 20.5 17 16.75v-4.5C17 8.5 15.5 7 11.75 7h-4.5C3.5 7 2 8.5 2 12.25v4.5C2 20.5 3.5 22 7.25 22ZM22 9c0-3.87-3.13-7-7-7l1.05 1.75" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    cropIconButtonRotateRight:
      '<path d="M16.75 22h-4.5C8.5 22 7 20.5 7 16.75v-4.5C7 8.5 8.5 7 12.25 7h4.5C20.5 7 22 8.5 22 12.25v4.5C22 20.5 20.5 22 16.75 22ZM2 9c0-3.87 3.13-7 7-7L7.95 3.75" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>',
    cropIconButtonFlipVertical:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M20.5 14.99l-5.01 5.02M3.5 14.99h17M3.5 9.01l5.01-5.02M20.5 9.01h-17"></path>',
    cropIconButtonFlipHorizontal:
      '<path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M20.5 14.99l-5.01 5.02M3.5 14.99h17M3.5 9.01l5.01-5.02M20.5 9.01h-17"></path>',

    labelButtonExport: 'Save',
  },
};

interface ImageEditorProps {
  image: string;
  onProcess: (url: File, imageState: any, store: any, src: any) => void;
  onClose: () => void;
  onError: (err: any) => void;
}

const VideoEditor = ({
  image,
  onProcess,
  onClose,
  onError,
}: ImageEditorProps) => {
  return (
    <div>
      <PinturaEditorModal
        {...editorDefaults}
        src={image}
        onProcess={({ dest, imageState, store, src }) =>
          onProcess(dest, imageState, store, src)
        }
        onHide={onClose}
        onLoaderror={onError}
      />
    </div>
  );
};

export default VideoEditor;
