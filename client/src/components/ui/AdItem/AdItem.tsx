import type { IAd } from '../../../core/api/ads/ads.types.ts';
import { Label, Text } from '@gravity-ui/uikit';
import style from './AdItem.module.css';

function AdItem(props: IAd) {
  return (
    <div className={style.root}>
      <div className={style.leftBlock}>
        <div className={style.image} style={{ backgroundImage: `url(${props.images[0]})` }}></div>

        <div className={style.info}>
          <Text variant="body-3" color={props.priority === 'urgent' ? 'danger' : 'primary'}>
            {props.title}
          </Text>
          <Text variant="body-3" style={{ fontWeight: 600 }}>
            {props.price}₽
          </Text>
          <Text variant="body-1">
            {new Date(props.createdAt).toLocaleString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Text>
        </div>
      </div>

      <div className={style.rightBlock}>
        <Label theme={props.priority === 'urgent' ? 'danger' : 'normal'}>
          {props.priority === 'urgent' ? 'Срочный' : 'Обычный'}
        </Label>

        <Label>{props.category}</Label>
        <Label theme="utility">{props.status}</Label>
      </div>
    </div>
  );
}

export default AdItem;
