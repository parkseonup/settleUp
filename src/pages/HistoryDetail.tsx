import { useLoaderData, useNavigate } from 'react-router-dom';
import PageLayout from '../components/common/pageLayout/PageLayout';
import { PlaceInfo, Settlement } from '../types/Settlement';
import ButtonWrapper from '../components/common/Button/ButtonWrapper';
import Button from '../components/common/Button/Button';
import { useRef } from 'react';
import ShareButton from '../components/Result/ShareButton';
import ResultMain from '../components/Result/ResultMain';
import ResultContextProvider from '../components/Result/ResultContext';

export interface PersonalAmountData {
  [key: PlaceInfo['participants'][number]]: PlaceInfo['amount'];
}

// NOTE: 개별 정산 목록 ui (Result랑 유사)
export default function HistoryDetail() {
  const navigate = useNavigate();
  const captureElementRef = useRef<HTMLElement>(null);
  const { data } = useLoaderData() as { data: Settlement };

  const onClickEdit = () => {
    navigate('/create', { state: data });
  };

  return (
    <PageLayout title="정산 내역" mode="point">
      <ResultContextProvider value={data}>
        <ResultMain ref={captureElementRef} />
        <ButtonWrapper>
          <ShareButton captureElement={captureElementRef.current} />
          <Button onClick={onClickEdit}>정산 수정하기</Button>
        </ButtonWrapper>
      </ResultContextProvider>
    </PageLayout>
  );
}
