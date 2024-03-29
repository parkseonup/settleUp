import { Dispatch, FocusEvent, useEffect, useRef, useState } from 'react';
import AmountInput from './AmountInput';
import DeleteButton from './DeleteButton';
import NameInput from './NameInput';
import AddButton from './AddButton';
import SubPlaceField from './SubPlaceField';
import { PlaceItem } from '../../../apis/data';
import { colors } from '../../../styles/variables/colors';
import { Action } from '../../Write/useCreationReducer.type';

interface Props {
  data: PlaceItem;
  disabledDelete?: boolean;
  dispatch: Dispatch<Action>;
}

export default function PlaceField({ data, disabledDelete, dispatch }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const toggleFocus = (e: FocusEvent, force?: boolean) => {
    if (!containerRef.current) return;
    if (containerRef.current.contains(e.relatedTarget)) return;

    setIsActive(force ?? !isActive);
  };

  useEffect(() => {
    if (titleInputRef.current) titleInputRef.current.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      css={{
        padding: '0 16px',
        border: `1px solid ${isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY}`,
        borderRadius: '24px',
      }}
      onFocus={(e) => toggleFocus(e, true)}
      onBlur={(e) => toggleFocus(e, false)}
    >
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '72px 1fr 60px',
          gap: '16px',
          alignItems: 'center',
          height: '48px',
        }}
      >
        <NameInput
          ref={titleInputRef}
          id={`placeTitle-${data.id}`}
          value={data.name}
          placeholder="장소명"
          onChange={(e) =>
            dispatch({
              type: 'changePlaceName',
              data: { ...data, name: e.target.value },
            })
          }
          required={true}
        />
        <AmountInput
          id={`placeAmount-${data.id}`}
          amount={data.amount}
          insideStyle={{
            fontSize: '14px',
          }}
          onChange={(amount) => {
            dispatch({
              type: 'changePlaceAmount',
              data: { ...data, amount },
            });
          }}
          required={true}
        />

        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '4px',
          }}
        >
          {data.sub.length === 0 ? (
            <AddButton
              isActive={isActive}
              onClick={() => dispatch({ type: 'addSubPlace', id: data.id })}
            />
          ) : null}
          {disabledDelete ? null : (
            <DeleteButton
              isActive={isActive}
              onClick={() => {
                dispatch({ type: 'deletePlace', id: data.id });
              }}
            />
          )}
        </div>
      </div>

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: Object.keys(data.sub).length > 0 ? '16px' : 0,
        }}
      >
        {data.sub.map((subItem, i) => (
          <SubPlaceField
            key={subItem.id}
            data={subItem}
            placeId={data.id}
            disabledDelete={data.sub.length - 1 !== i}
            isActive={isActive}
            setIsActive={setIsActive}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}
