import { useTranslation } from '@kinvolk/headlamp-plugin/lib';
import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useState } from 'react';
import { IPAddressPool, MetallbIPAddressPool } from '../../resources/ipAddressPool';
import { buildIPAddressPoolPatch, getIPAddressPoolTemplateYAML } from '../../utils/ipAddressPool';

interface IPAddressPoolYamlEditorProps {
  open: boolean;
  item?: IPAddressPool | null;
  onClose: () => void;
  onSaved?: () => void;
}

export function IPAddressPoolYamlEditor(props: IPAddressPoolYamlEditorProps) {
  const { open, item, onClose, onSaved } = props;
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isCreate = !item;

  async function onSaveEdit(objects: any[]) {
    try {
      setErrorMessage('');
      const [firstObject] = objects;
      if (!firstObject) {
        throw new Error('No object found in editor contents.');
      }

      const edited = firstObject as MetallbIPAddressPool;
      const patchBody = buildIPAddressPoolPatch(item!.jsonData, edited);
      await item!.patch(patchBody as any);

      onClose();
      onSaved?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setErrorMessage(message);
      throw error;
    }
  }

  const itemToEdit = isCreate ? getIPAddressPoolTemplateYAML() : item?.jsonData ?? null;

  return (
    <EditorDialog
      open={open}
      item={itemToEdit}
      onClose={onClose}
      onSave={isCreate ? 'default' : (objects => onSaveEdit(objects as any[]))}
      errorMessage={errorMessage}
      title={isCreate ? t('Create IPAddressPool') : t('Edit IPAddressPool YAML')}
      saveLabel={isCreate ? t('Save & Apply') : t('Patch')}
    />
  );
}



