import { Link, useLocation, useParams } from 'react-router-dom';
import type { IAd } from '../../core/api/ads/ads.types.ts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button, Card, Icon, Modal, Text, TextInput } from '@gravity-ui/uikit';
import CharacteristicsTable from './CharacteristicsTable.tsx';
import { ArrowRotateLeft, CheckShape, ChevronLeft, ChevronRight, Star, XmarkShape, } from '@gravity-ui/icons';
import { useEffect, useState } from 'react';
import { CategoryRadioWithOther } from '../../components/ui/CategoryRadioWithOther/CategoryRadioWithOther.tsx';
import Lottie from 'lottie-react';
import notFound from '../../assets/lottie/notFound.json';
import { api } from '../../main.tsx';
import { getLabel } from '../../core/utils/get-label.tsx';

function ItemPage() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const preState = location.state as IAd | null;

  const [state, setState] = useState<IAd | null>(preState);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openRequestChangesModal, setOpenRequestChangesModal] = useState(false);

  const [reason, setReason] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [_isLoading, setIsLoading] = useState(!preState); //TODO: если время останется не забыть сделать загрузку
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!id) {
      setError(true);
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);

        const data = await api.ads.getByID(Number(id));

        setState(data);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);
  const handleSubmitApprove = async () => {
    const data = await api.ads.approve(state?.id!);
    setState(data.ad);
  };

  const handleSubmitReject = async () => {
    const data = await api.ads.reject(state?.id!, {
      reason: getLabel(moderationReasons, reason),
      comment: comment,
    });
    setState(data.ad);
    setReason('');
    setComment('');
    handleCloseModals();
  };

  const handleSubmitRequestChanges = async () => {
    const data = await api.ads.requestChanges(state?.id!, {
      reason: getLabel(moderationReasons, reason),
      comment: comment,
    });
    setState(data.ad);
    setReason('');
    setComment('');
    handleCloseModals();
  };

  const handleCloseModals = () => {
    setReason('');
    setComment('');
    setOpenRejectModal(false);
    setOpenRequestChangesModal(false);
  };

  const moderationReasons = [
    { value: '1', content: 'Запрещённый товар' },
    { value: '2', content: 'Неверная категория' },
    { value: '3', content: 'Некорректное описание' },
    { value: '4', content: 'Проблемы с фото' },
    { value: '5', content: 'Подозрение на мошенничество' },
  ];

  const isEmpty = state?.moderationHistory && state?.moderationHistory.length === 0;
  return (
    <>
      {!error ? (
        <main
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 24,
            alignItems: 'flex-start',
          }}
        >
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to={'/list'}>
                <Button>Назад к списку</Button>
              </Link>
              <Link to={`/item/${Number(id!) - 1}`}>
                <Button>
                  <Icon data={ChevronLeft} />
                </Button>
              </Link>
              <Link to={`/item/${Number(id!) + 1}`}>
                <Button>
                  <Icon data={ChevronRight} />
                </Button>
              </Link>
            </div>
            <Text variant={'display-1'} style={{ fontWeight: '700', margin: '12px 0' }}>
              {state?.title}
            </Text>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={3}
              slidesPerView={1}
              style={{ width: '100%', aspectRatio: '3 / 2', borderRadius: 8, overflow: 'hidden' }}
            >
              {state?.images.map((src) => (
                <SwiperSlide key={src}>
                  <img
                    src={src}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Card
              view={'filled'}
              style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 12px' }}
            >
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Text variant={'body-3'} style={{ fontWeight: '600' }}>
                  {state?.seller.name} | ID: {state?.seller.id}
                </Text>

                <Text
                  variant={'body-3'}
                  color={'brand'}
                  style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  {state?.seller.rating} <Star />
                </Text>
              </div>
              <Text variant={'body-1'}>Количество объявлений: {state?.seller.totalAds}</Text>
              <Text variant={'body-1'}>
                Дата регистрации:{' '}
                {new Date(state?.seller.registeredAt!).toLocaleString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </Text>
            </Card>
            <Text variant={'body-3'} style={{ fontWeight: '600' }}>
              Характеристики
            </Text>
            <CharacteristicsTable characteristics={state?.characteristics} />
            <Text variant={'body-3'} style={{ fontWeight: '600' }}>
              Подробное описание
            </Text>
            <div style={{ width: '100%' }}>
              <Text variant={'body-1'}>{state?.description}</Text>
            </div>
          </section>

          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <Text variant={'display-1'} style={{ fontWeight: '700', margin: '12px 0' }}>
              История модерации
            </Text>
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 8 }}
            >
              <Button
                size={'xl'}
                style={{ background: 'var(--g-color-base-positive-medium)', borderRadius: 12 }}
                width={'max'}
                onClick={handleSubmitApprove}
              >
                <Icon data={CheckShape} />
                Одобрить
              </Button>
              <Button
                size={'xl'}
                style={{ background: 'var(--g-color-base-danger-medium)', borderRadius: 12 }}
                width={'max'}
                onClick={() => setOpenRejectModal(true)}
              >
                <Icon data={XmarkShape} />
                Отклонить
              </Button>
              <Button
                size={'xl'}
                style={{ background: 'var(--g-color-base-warning-medium)', borderRadius: 12 }}
                width={'max'}
                onClick={() => setOpenRequestChangesModal(true)}
              >
                <Icon data={ArrowRotateLeft} />
                Доработка
              </Button>
            </div>
            {state?.moderationHistory.map((item) => (
              <Card
                view={'filled'}
                theme={
                  item.action === 'approved'
                    ? 'success'
                    : item.action === 'requestChanges'
                      ? 'warning'
                      : 'danger'
                } //TODO: не оч читаемо, но пусть будет
                style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '18px 12px' }}
              >
                <Text variant={'body-3'} style={{ fontWeight: '600' }}>
                  {item.moderatorName} | ID: {item.moderatorId}
                </Text>
                <Text variant={'body-1'}>Решение модерации: {item.action}</Text>
                {item.reason ? <Text variant={'body-1'}>Правило: {item.reason}</Text> : <></>}
                {item.comment ? (
                  <Text variant={'body-1'}>Комментарий модерации: {item.comment}</Text>
                ) : (
                  <></>
                )}
              </Card>
            ))}
            {isEmpty && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <Lottie animationData={notFound} style={{ width: 200, height: 200 }} />
                <Text variant={'header-1'} color={'hint'}>
                  Истории модерации не найдено
                </Text>
              </div>
            )}
          </section>

          <Modal open={openRequestChangesModal} onClose={handleCloseModals}>
            <div
              style={{
                padding: '18px 12px',
                width: '100vw',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              <Text variant="header-1">Отправить на доработку</Text>

              <CategoryRadioWithOther options={moderationReasons} onChange={setReason} />

              <TextInput
                size="xl"
                placeholder="Комментарий (почему-то в тз его не было....)"
                value={comment}
                onUpdate={(val) => setComment(val)}
              />

              <Button
                view="action"
                size="xl"
                onClick={handleSubmitRequestChanges}
                disabled={!reason}
              >
                <Text color="inverted-primary" variant="body-2">
                  Отправить
                </Text>
              </Button>
            </div>
          </Modal>
          <Modal open={openRejectModal} onClose={handleCloseModals}>
            <div
              style={{
                padding: '18px 12px',
                width: '100vw',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              <Text variant="header-1">Отклонение</Text>

              <CategoryRadioWithOther options={moderationReasons} onChange={setReason} />

              <TextInput
                size="xl"
                placeholder="Комментарий (почему-то в тз его не было....)"
                value={comment}
                onUpdate={(val) => setComment(val)}
              />

              <Button view="action" size="xl" onClick={handleSubmitReject} disabled={!reason}>
                <Text color="inverted-primary" variant="body-2">
                  Отправить
                </Text>
              </Button>
            </div>
          </Modal>
        </main>
      ) : (
        <main style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Lottie animationData={notFound} style={{ width: 200, height: 200 }} />
            <Text variant={'header-1'} color={'hint'}>
              Объявления не найдено!
            </Text>
          </div>
        </main>
      )}
    </>
  );
}

export default ItemPage;
