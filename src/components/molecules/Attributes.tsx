import { IAttribute } from 'src/domain/interface';
import { Attribute } from '../atoms/Attribute';
import { Maybe } from 'src/utils/utility';

interface AttributesProps {
  attributes: Maybe<IAttribute[]>;
}

export function Attributes({ attributes }: AttributesProps) {
  return (
    <div className='flex flex-wrap gap-2 mb-4'>
      {attributes &&
        attributes.map((attribute, index) => (
          <Attribute
            key={index}
            traitType={attribute.trait_type}
            value={attribute.value}
          />
        ))}
    </div>
  );
}
